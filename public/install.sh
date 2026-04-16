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
        --help|-h)
            echo "Usage: install.sh [--version VERSION] [--install-dir DIR]"
            exit 0
            ;;
        *) error "unknown option: $1" ;;
    esac
done

# ── Detect platform ─────────────────────────────────────────────────────────

detect_platform() {
    local os arch

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

    echo "datashuttle-${os}-${arch}"
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

    # Install
    if [[ -w "$INSTALL_DIR" ]]; then
        mv "${tmpdir}/datashuttle" "${INSTALL_DIR}/datashuttle"
    else
        info "Installing to ${INSTALL_DIR} (requires sudo)..."
        sudo mv "${tmpdir}/datashuttle" "${INSTALL_DIR}/datashuttle"
    fi
    chmod +x "${INSTALL_DIR}/datashuttle"
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
    info "datashuttle installed to ${INSTALL_DIR}/datashuttle"
    info "Run 'datashuttle --version' to verify."

    # Check if install dir is in PATH
    if ! echo "$PATH" | tr ':' '\n' | grep -qx "$INSTALL_DIR"; then
        warn "${INSTALL_DIR} is not in your PATH. Add it with:"
        echo "  export PATH=\"${INSTALL_DIR}:\$PATH\""
    fi
}

main
