#!/usr/bin/env bash
# install.sh — DataShuttle CLI installer
#
# Detects OS and architecture, downloads the latest (or specified) release
# from GitHub, verifies the SHA256 checksum, and installs to /usr/local/bin.
#
# Usage:
#   curl -fsSL https://datashuttle.ai/install.sh | bash
#   curl -fsSL ... | bash -s -- --version v0.1.0
#   curl -fsSL ... | bash -s -- --install-dir ~/.local/bin
#
# Environment variables:
#   DATASHUTTLE_VERSION   — override version (e.g. v0.1.0)
#   DATASHUTTLE_INSTALL_DIR — override install directory (default: /usr/local/bin)

set -euo pipefail

REPO="datashuttle-ai/datashuttle"
BASE_URL="https://github.com/${REPO}/releases"
INSTALL_DIR="${DATASHUTTLE_INSTALL_DIR:-/usr/local/bin}"
VERSION="${DATASHUTTLE_VERSION:-}"

# ── Helpers ──────────────────────────────────────────────────────────────────

info()  { printf '\033[1;34m==>\033[0m %s\n' "$*"; }
warn()  { printf '\033[1;33mWarning:\033[0m %s\n' "$*" >&2; }
error() { printf '\033[1;31mError:\033[0m %s\n' "$*" >&2; exit 1; }

need_cmd() {
    if ! command -v "$1" >/dev/null 2>&1; then
        error "required command '$1' not found. Please install it and retry."
    fi
}

# ── Parse arguments ──────────────────────────────────────────────────────────

while [[ $# -gt 0 ]]; do
    case "$1" in
        --version)   VERSION="$2"; shift 2 ;;
        --install-dir) INSTALL_DIR="$2"; shift 2 ;;
        --systemd) INSTALL_SYSTEMD=1; shift ;;
        --client-only) CLIENT_ONLY=1; shift ;;
        --help|-h)
            echo "Usage: install.sh [--version VERSION] [--install-dir DIR] [--systemd] [--client-only]"
            echo ""
            echo "  --systemd       Also install a systemd unit at"
            echo "                  /etc/systemd/system/datashuttle.service,"
            echo "                  create a 'datashuttle' system user, and"
            echo "                  pre-create /etc/datashuttle + /var/lib/datashuttle."
            echo "                  The unit is NOT enabled — run"
            echo "                  \`systemctl enable --now datashuttle\` after"
            echo "                  running \`datashuttle setup --quickstart\`."
            echo ""
            echo "  --client-only   Install ONLY the thin ~15-25 MB"
            echo "                  \`datashuttle-client\` binary for developer"
            echo "                  workstations — no server, no connector"
            echo "                  drivers. Set DS_SERVER to point at a"
            echo "                  remote daemon. Incompatible with --systemd."
            exit 0
            ;;
        *) error "unknown option: $1" ;;
    esac
done
INSTALL_SYSTEMD="${INSTALL_SYSTEMD:-0}"
CLIENT_ONLY="${CLIENT_ONLY:-0}"

if [[ "$CLIENT_ONLY" == "1" && "$INSTALL_SYSTEMD" == "1" ]]; then
    error "--client-only and --systemd are incompatible; the thin client is not a server."
fi

# ── Detect platform ─────────────────────────────────────────────────────────

detect_platform() {
    local os arch stem

    os="$(uname -s)"
    arch="$(uname -m)"

    case "$os" in
        Linux)  os="linux" ;;
        Darwin) os="macos" ;;
        *)      error "unsupported OS: $os" ;;
    esac

    case "$arch" in
        x86_64|amd64)   arch="amd64" ;;
        aarch64|arm64)  arch="arm64" ;;
        *)              error "unsupported architecture: $arch" ;;
    esac

    # #816 — the thin client ships under a distinct artifact name so
    # the release workflow can upload both binaries separately and
    # we avoid accidentally installing the ~125 MB server when the
    # user asked for the dev client.
    if [[ "${CLIENT_ONLY:-0}" == "1" ]]; then
        stem="datashuttle-client"
    else
        stem="datashuttle"
    fi

    echo "${stem}-${os}-${arch}"
}

# ── Resolve version ─────────────────────────────────────────────────────────

resolve_version() {
    if [[ -n "$VERSION" ]]; then
        # Strip leading 'v' for consistency, then add it back.
        VERSION="${VERSION#v}"
        echo "v${VERSION}"
        return
    fi

    need_cmd curl

    info "Resolving latest release..."
    local latest
    latest="$(curl -fsSL -o /dev/null -w '%{redirect_url}' "${BASE_URL}/latest" 2>/dev/null || true)"
    if [[ -z "$latest" ]]; then
        error "could not determine latest release. Set --version explicitly."
    fi
    # Extract tag from redirect URL: .../releases/tag/v0.1.0 → v0.1.0
    echo "${latest##*/}"
}

# ── Download and verify ─────────────────────────────────────────────────────

download_and_verify() {
    local artifact="$1" tag="$2" tmpdir
    tmpdir="$(mktemp -d)"
    trap 'rm -rf "$tmpdir"' EXIT

    local archive="${artifact}.tar.gz"
    local checksum_file="${archive}.sha256"
    local download_url="${BASE_URL}/download/${tag}/${archive}"
    local checksum_url="${BASE_URL}/download/${tag}/${checksum_file}"

    info "Downloading ${archive} (${tag})..."
    curl -fSL --progress-bar -o "${tmpdir}/${archive}" "$download_url" \
        || error "download failed. Check that release ${tag} exists at:\n  ${download_url}"

    info "Downloading checksum..."
    curl -fsSL -o "${tmpdir}/${checksum_file}" "$checksum_url" \
        || error "checksum download failed. Verify release at:\n  ${checksum_url}"

    info "Verifying SHA256 checksum..."
    local expected actual
    expected="$(awk '{print $1}' "${tmpdir}/${checksum_file}")"

    if command -v sha256sum >/dev/null 2>&1; then
        actual="$(sha256sum "${tmpdir}/${archive}" | awk '{print $1}')"
    elif command -v shasum >/dev/null 2>&1; then
        actual="$(shasum -a 256 "${tmpdir}/${archive}" | awk '{print $1}')"
    else
        error "neither sha256sum nor shasum found — cannot verify checksum"
    fi

    if [[ "$expected" != "$actual" ]]; then
        error "checksum mismatch!\n  expected: ${expected}\n  actual:   ${actual}\nThe download may be corrupted. Try again."
    fi
    info "Checksum verified ✓"

    info "Extracting..."
    tar xzf "${tmpdir}/${archive}" -C "${tmpdir}"

    # Binary name inside the tarball matches the crate that produced
    # it — `datashuttle-client` for the thin build, `datashuttle` for
    # the full binary. The heavy tarball also carries `datashuttled`
    # (the daemon alias); we install it alongside `datashuttle`.
    local bin_name
    if [[ "${CLIENT_ONLY:-0}" == "1" ]]; then
        bin_name="datashuttle-client"
    else
        bin_name="datashuttle"
    fi

    # Install
    if [[ -w "$INSTALL_DIR" ]]; then
        mv "${tmpdir}/${bin_name}" "${INSTALL_DIR}/${bin_name}"
        if [[ "${CLIENT_ONLY:-0}" != "1" && -f "${tmpdir}/datashuttled" ]]; then
            mv "${tmpdir}/datashuttled" "${INSTALL_DIR}/datashuttled"
            chmod +x "${INSTALL_DIR}/datashuttled"
        fi
    else
        info "Installing to ${INSTALL_DIR} (requires sudo)..."
        sudo mv "${tmpdir}/${bin_name}" "${INSTALL_DIR}/${bin_name}"
        if [[ "${CLIENT_ONLY:-0}" != "1" && -f "${tmpdir}/datashuttled" ]]; then
            sudo mv "${tmpdir}/datashuttled" "${INSTALL_DIR}/datashuttled"
            sudo chmod +x "${INSTALL_DIR}/datashuttled"
        fi
    fi
    chmod +x "${INSTALL_DIR}/${bin_name}" 2>/dev/null || sudo chmod +x "${INSTALL_DIR}/${bin_name}"
}

# ── systemd unit installation (#806) ─────────────────────────────────────────

install_systemd_unit() {
    if [[ ! -d /etc/systemd/system ]]; then
        warn "systemd not detected on this host (/etc/systemd/system missing) — skipping --systemd."
        return
    fi
    info "Installing systemd unit..."
    # Create the system user if it doesn't exist. `--system` + nologin
    # shell so the account can't be used for interactive login.
    if ! id datashuttle >/dev/null 2>&1; then
        sudo useradd --system --no-create-home --shell /usr/sbin/nologin datashuttle \
            || error "failed to create 'datashuttle' system user"
        info "Created system user: datashuttle"
    fi
    sudo install -d -o datashuttle -g datashuttle -m 0750 /etc/datashuttle /var/lib/datashuttle

    local unit_src_url="https://raw.githubusercontent.com/${REPO}/main/packaging/systemd/datashuttle.service"
    local unit_dst="/etc/systemd/system/datashuttle.service"
    # Use the bundled unit file from the tarball if present (air-gapped
    # / offline installs), otherwise fetch from the release branch.
    if [[ -n "${tmpdir:-}" && -f "${tmpdir}/packaging/systemd/datashuttle.service" ]]; then
        sudo install -m 0644 "${tmpdir}/packaging/systemd/datashuttle.service" "$unit_dst"
    else
        sudo curl -fsSL -o "$unit_dst" "$unit_src_url" \
            || error "failed to fetch systemd unit from $unit_src_url"
    fi
    sudo chmod 0644 "$unit_dst"
    sudo systemctl daemon-reload
    info "systemd unit installed at $unit_dst (not enabled — run \`systemctl enable --now datashuttle\` after setup)"
}

# ── Main ─────────────────────────────────────────────────────────────────────

main() {
    need_cmd curl
    need_cmd tar
    need_cmd uname

    local artifact tag

    artifact="$(detect_platform)"
    tag="$(resolve_version)"

    info "Platform: ${artifact}"
    info "Version:  ${tag}"
    info "Install:  ${INSTALL_DIR}"
    echo ""

    download_and_verify "$artifact" "$tag"

    echo ""
    if [[ "$CLIENT_ONLY" == "1" ]]; then
        info "datashuttle-client installed to ${INSTALL_DIR}/datashuttle-client"
        info "Run 'datashuttle-client --version' to verify."
    else
        info "datashuttle installed to ${INSTALL_DIR}/datashuttle"
        if [[ -x "${INSTALL_DIR}/datashuttled" ]]; then
            info "datashuttled (daemon alias) installed to ${INSTALL_DIR}/datashuttled"
        fi
        info "Run 'datashuttle --version' to verify."
    fi

    # Check if install dir is in PATH
    if ! echo "$PATH" | tr ':' '\n' | grep -qx "$INSTALL_DIR"; then
        warn "${INSTALL_DIR} is not in your PATH. Add it with:"
        echo "  export PATH=\"${INSTALL_DIR}:\$PATH\""
    fi

    # #806 — optional systemd integration. Opt-in via --systemd; keeps
    # the fast-curl path unchanged for trial/dev operators.
    if [[ "$INSTALL_SYSTEMD" == "1" ]]; then
        install_systemd_unit
    fi

    # #816 — client-only installs don't need setup/start hints; the
    # client talks to a remote daemon.
    if [[ "$CLIENT_ONLY" == "1" ]]; then
        echo ""
        info "Next steps — point the client at a daemon:"
        echo ""
        echo "  export DS_SERVER=https://datashuttle.example.com"
        echo "  datashuttle-client status"
        echo "  datashuttle-client shuttle list"
        echo ""
        info "Full client guide: https://docs.datashuttle.ai/installation/binary.html#thin-client-vs-full-daemon"
        return
    fi

    # #804 — next-step hint. Pre-fix the install script ended on
    # "Run 'datashuttle --version' to verify" and the operator had no
    # idea what to do next. `datashuttle start` alone fails because
    # there is no config file on disk; the actual happy path is
    # `setup --quickstart` first to bootstrap an admin account, then
    # `start`.
    echo ""
    info "Next steps — bootstrap a local install (run as root or with sudo):"
    echo ""
    echo "  # 1. create persistent config + state directories"
    echo "  sudo mkdir -p /etc/datashuttle /var/lib/datashuttle"
    echo ""
    echo "  # 2. generate config + admin user (password printed once to stdout)"
    echo "  sudo datashuttle setup --quickstart \\"
    echo "    --config   /etc/datashuttle/datashuttle.yaml \\"
    echo "    --data-dir /var/lib/datashuttle"
    echo ""
    echo "  # 3. start the server"
    echo "  sudo datashuttle start --config /etc/datashuttle/datashuttle.yaml"
    echo ""
    info "Full quickstart: https://docs.datashuttle.ai/quickstart.html"
}

main
