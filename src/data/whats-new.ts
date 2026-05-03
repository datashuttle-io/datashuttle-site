/// Hand-curated "what's new" cards for #629. Update on every release
/// that ships a headline capability. Drives /whats-new; chronological
/// release log is /changelog.

export interface FeatureCard {
  title: string
  badge: string
  description: string
  snippet?: string
  /// `#anchor` to the relevant section in /changelog; enables click-through.
  changelogAnchor?: string
}

export const CARDS: FeatureCard[] = [
  {
    title: 'Iceberg V3 deletion vectors',
    badge: 'Iceberg V3',
    description:
      'Default ON since v0.1.0-alpha. 5-10× more space-efficient than V2 position-deletes, and readers that don\'t understand V3 fall back gracefully via metadata negotiation.',
    snippet: `CREATE SHUTTLE my_cdc
  SOURCE postgres('...')
  TARGET iceberg(format_version = 3, deletion_mode = 'vectors');`,
  },
  {
    title: 'Crash-safe exactly-once snapshots',
    badge: '#461',
    description:
      'The Iceberg catalog is the single source of truth for committed state. Wipe the local checkpoint dir mid-flight, restart, and DataShuttle re-converges from the catalog without re-reading committed source data or duplicating rows downstream.',
  },
  {
    title: 'Iceberg commit batching',
    badge: '#457',
    description:
      'Gather-and-commit lets you trade latency for catalog-write frequency. Defaults: 30-second window or 1,000 files or 512 MB — whichever hits first. Drops catalog churn 10-100× on high-throughput shuttles.',
    snippet: `options:
  commit_batch_interval: 30s
  commit_batch_files: 1000
  commit_batch_bytes: 512MB`,
  },
  {
    title: 'Lineage DAG visualization',
    badge: '#235',
    description:
      'Interactive React Flow graph rendering source → shuttle → Iceberg-table dependency chains. Click a node to see per-snapshot provenance; downstream-impact views surface which shuttles a schema change will ripple through.',
  },
  {
    title: 'Resource pools',
    badge: '#254',
    description:
      'shared / dedicated / elastic isolation via cgroups v2. Pin noisy-neighbour shuttles to a capped CPU slice; reserve RAM for the latency-sensitive ones. All from a YAML stanza, no k8s required.',
    snippet: `resource_pools:
  etl_heavy:
    kind: dedicated
    cpu_cores: 4
    memory_gib: 8`,
  },
  {
    title: 'Native Kafka consumer',
    badge: '#340',
    description:
      'rdkafka-backed consumer groups with proper rebalance + offset-commit semantics. Handles broker failover cleanly. The pure-Rust fallback (apache-avro + custom wire code) stays available for environments where rdkafka\'s C deps are a problem.',
  },
  {
    title: 'Tamper-evident audit log',
    badge: 'SEC',
    description:
      'Every admin action is chained via Ed25519 signatures. `datashuttle audit verify` walks the chain and rejects any event whose predecessor hash mismatches — so a single tampered row breaks verification for every row that followed.',
    snippet: `$ datashuttle audit verify
✓ 12,430 events verified; chain intact
✓ signing key fingerprint: 79e118489474046e`,
  },
  {
    title: 'Connector auth catalogue',
    badge: '#372',
    description:
      'Drop-in auth shims for OAuth2 (refresh-token rotation), Google Service Account JWT, Snowflake key-pair, AWS SigV4, and plain API keys. Wire once in connection config; the connector just calls `auth.sign(request)`.',
  },
]
