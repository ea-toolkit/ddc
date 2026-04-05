// Vision mockup screens — enterprise KB migration platform
// "Monolith to microservices, but for knowledge bases"
// Static hardcoded data showing the full product pipeline

export function renderVision(container) {
  container.innerHTML = `
    <div class="vision">
      <div class="vision__header mt-xl">
        <div class="vision__tagline">
          <span class="text-mono text-accent" style="font-size: var(--font-size-xs); letter-spacing: 0.15em;">THE PLATFORM</span>
          <h2>Monolith to Microservices,<br>But for Your Knowledge Base</h2>
          <p class="text-muted mt-sm">Your enterprise KB is a monolith — scattered across SharePoint, Confluence, GitHub, Jira, and people's heads. Same data, migrated to a modern, structured, AI-ready context lake.</p>
        </div>
      </div>

      <!-- Screen 0: Inputs / Connect -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--accent">CONNECT</span>
          <span class="text-mono">DATA SOURCES</span>
        </div>
        <div class="vision__inputs">
          <div class="input-sources">
            <div class="source-card source-card--connected">
              <div class="source-card__icon text-mono">JIRA</div>
              <div class="source-card__info">
                <div class="source-card__name">Jira — Work Items</div>
                <div class="source-card__detail text-muted">847 tickets across 6 teams</div>
                <div class="source-card__detail text-muted">Last synced: 2h ago</div>
              </div>
              <span class="badge badge--success">CONNECTED</span>
            </div>
            <div class="source-card source-card--connected">
              <div class="source-card__icon text-mono">SP</div>
              <div class="source-card__info">
                <div class="source-card__name">SharePoint — Documents</div>
                <div class="source-card__detail text-muted">10.2 GB across 340 files (PDF, DOCX, PPTX)</div>
                <div class="source-card__detail text-muted">Last synced: 6h ago</div>
              </div>
              <span class="badge badge--success">CONNECTED</span>
            </div>
            <div class="source-card source-card--connected">
              <div class="source-card__icon text-mono">CF</div>
              <div class="source-card__info">
                <div class="source-card__name">Confluence — Product & Data Docs</div>
                <div class="source-card__detail text-muted">1,247 pages across 23 spaces</div>
                <div class="source-card__detail text-muted">Last synced: 1h ago</div>
              </div>
              <span class="badge badge--success">CONNECTED</span>
            </div>
            <div class="source-card source-card--connected">
              <div class="source-card__icon text-mono">GH</div>
              <div class="source-card__info">
                <div class="source-card__name">GitHub — Engineering Repos</div>
                <div class="source-card__detail text-muted">156 repos, READMEs + ADRs + API specs</div>
                <div class="source-card__detail text-muted">Last synced: 30m ago</div>
              </div>
              <span class="badge badge--success">CONNECTED</span>
            </div>
            <div class="source-card">
              <div class="source-card__icon text-mono text-muted">SL</div>
              <div class="source-card__info">
                <div class="source-card__name text-muted">Slack — Conversations</div>
                <div class="source-card__detail text-muted">Coming soon</div>
              </div>
              <span class="badge" style="opacity: 0.4;">PLANNED</span>
            </div>
          </div>
          <div class="input-meta mt-lg">
            <div class="input-meta__item">
              <div class="input-meta__header">
                <span class="text-mono text-muted">DOMAIN DESCRIPTION</span>
                <span class="badge badge--success">PROVIDED</span>
              </div>
              <p class="text-muted" style="font-size: var(--font-size-sm);">E-commerce operations domain — 180 people, 5 product teams, 80+ systems, 250+ sync/async APIs. Handles order processing, payment orchestration, fulfillment coordination, and customer service across multiple regions.</p>
            </div>
            <div class="input-meta__item mt-md">
              <div class="input-meta__header">
                <span class="text-mono text-muted">META MODEL</span>
                <span class="badge badge--success">UPLOADED</span>
              </div>
              <p class="text-muted" style="font-size: var(--font-size-sm);">enterprise-meta-model.drawio — 13 entity types, relationship mapping. Used to structure the target knowledge base.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Screen 1: Per-Ticket Demand Extraction (Step 1) -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--info">STEP 1</span>
          <span class="text-mono">DEMAND EXTRACTION</span>
          <span class="text-muted" style="font-size: var(--font-size-xs); margin-left: auto;">Automated — runs per ticket</span>
        </div>
        <p class="text-muted mb-md" style="font-size: var(--font-size-sm);">Each Jira ticket is analyzed as if by a new joiner with only the domain description and meta model. The agent searches the connected KB, classifies what it finds, and produces a demand checklist.</p>

        <div class="ticket-analysis">
          <div class="ticket-card">
            <div class="ticket-card__header">
              <span class="text-mono text-accent">APIS-2891</span>
              <span class="text-muted">Publish API contracts to partner portal</span>
            </div>
            <div class="ticket-card__demands">
              <div class="demand-item demand-item--found-clean">
                <span class="demand-status">FOUND &mdash; CLEAN</span>
                <span class="demand-text">"Partner portal" = ExternalPartnerGateway service</span>
                <span class="demand-source text-muted">GitHub: partner-gateway/README.md</span>
              </div>
              <div class="demand-item demand-item--found-stale">
                <span class="demand-status">FOUND &mdash; STALE</span>
                <span class="demand-text">API contract format documented but refers to v2 (current is v4)</span>
                <span class="demand-source text-muted">Confluence: API Standards / updated 18 months ago</span>
              </div>
              <div class="demand-item demand-item--found-incomplete">
                <span class="demand-status">FOUND &mdash; INCOMPLETE</span>
                <span class="demand-text">Publishing workflow exists but missing approval steps</span>
                <span class="demand-source text-muted">SharePoint: Integration Playbook.pptx / slide 14</span>
              </div>
              <div class="demand-item demand-item--missing">
                <span class="demand-status">NOT FOUND</span>
                <span class="demand-text">Which teams are "partners"? What access levels exist?</span>
                <span class="demand-source text-muted">Likely tribal knowledge</span>
              </div>
            </div>
          </div>

          <div class="ticket-card mt-md">
            <div class="ticket-card__header">
              <span class="text-mono text-accent">DLVR-1044</span>
              <span class="text-muted">Add refund policy override to merchant dashboard</span>
            </div>
            <div class="ticket-card__demands">
              <div class="demand-item demand-item--missing">
                <span class="demand-status">NOT FOUND</span>
                <span class="demand-text">What is a "refund policy override"? No definition anywhere.</span>
                <span class="demand-source text-muted">Tribal knowledge — business concept</span>
              </div>
              <div class="demand-item demand-item--found-stale">
                <span class="demand-status">FOUND &mdash; STALE</span>
                <span class="demand-text">Billing service architecture doc exists but pre-dates migration</span>
                <span class="demand-source text-muted">Confluence: Billing Overview / updated 2 years ago</span>
              </div>
              <div class="demand-item demand-item--found-incomplete">
                <span class="demand-status">FOUND &mdash; INCOMPLETE</span>
                <span class="demand-text">"The app" referenced in 12 tickets — which app? No system mapping.</span>
                <span class="demand-source text-muted">Jira: context mentions "customer app" and "installer app" interchangeably</span>
              </div>
              <div class="demand-item demand-item--missing">
                <span class="demand-status">NOT FOUND</span>
                <span class="demand-text">Planned vs active billing — what's the business rule?</span>
                <span class="demand-source text-muted">Tribal knowledge — business process</span>
              </div>
            </div>
          </div>

          <div class="ticket-progress mt-md">
            <div class="flex justify-between items-center mb-sm">
              <span class="text-mono text-muted" style="font-size: var(--font-size-xs);">BATCH PROGRESS</span>
              <span class="text-mono text-accent" style="font-size: var(--font-size-xs);">47 / 50 tickets analyzed</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar__fill progress-bar__fill--accent" style="width: 94%;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Screen 2: Consolidated Analysis (Step 2) -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--warning">STEP 2</span>
          <span class="text-mono">CONSOLIDATED ANALYSIS</span>
          <span class="text-muted" style="font-size: var(--font-size-xs); margin-left: auto;">User-triggered — review before proceeding</span>
        </div>
        <p class="text-muted mb-md" style="font-size: var(--font-size-sm);">All 50 demand checklists merged, deduplicated, and classified. This is your KB health report — what's usable, what needs work, and what doesn't exist.</p>

        <!-- Data Quality Heatmap -->
        <div class="quality-heatmap">
          <div class="quality-heatmap__header mb-md">
            <span class="text-mono">KNOWLEDGE BASE HEALTH</span>
          </div>
          <div class="quality-grid">
            <div class="quality-corner"></div>
            <div class="quality-col text-mono">Clean</div>
            <div class="quality-col text-mono">Stale</div>
            <div class="quality-col text-mono">Incomplete</div>
            <div class="quality-col text-mono">Missing</div>
            <div class="quality-col text-mono">Tribal</div>

            <div class="quality-row text-mono">Systems</div>
            <div class="quality-cell quality-cell--clean">34</div>
            <div class="quality-cell quality-cell--stale">12</div>
            <div class="quality-cell quality-cell--incomplete">8</div>
            <div class="quality-cell quality-cell--missing">3</div>
            <div class="quality-cell quality-cell--tribal">7</div>

            <div class="quality-row text-mono">APIs</div>
            <div class="quality-cell quality-cell--clean">89</div>
            <div class="quality-cell quality-cell--stale">47</div>
            <div class="quality-cell quality-cell--incomplete">23</div>
            <div class="quality-cell quality-cell--missing">11</div>
            <div class="quality-cell quality-cell--tribal">2</div>

            <div class="quality-row text-mono">Processes</div>
            <div class="quality-cell quality-cell--clean">8</div>
            <div class="quality-cell quality-cell--stale">5</div>
            <div class="quality-cell quality-cell--incomplete">12</div>
            <div class="quality-cell quality-cell--missing">15</div>
            <div class="quality-cell quality-cell--tribal">19</div>

            <div class="quality-row text-mono">Terminology</div>
            <div class="quality-cell quality-cell--clean">22</div>
            <div class="quality-cell quality-cell--stale">3</div>
            <div class="quality-cell quality-cell--incomplete">6</div>
            <div class="quality-cell quality-cell--missing">28</div>
            <div class="quality-cell quality-cell--tribal">31</div>

            <div class="quality-row text-mono">Data Models</div>
            <div class="quality-cell quality-cell--clean">45</div>
            <div class="quality-cell quality-cell--stale">18</div>
            <div class="quality-cell quality-cell--incomplete">9</div>
            <div class="quality-cell quality-cell--missing">4</div>
            <div class="quality-cell quality-cell--tribal">1</div>

            <div class="quality-row text-mono">Decisions</div>
            <div class="quality-cell quality-cell--clean">3</div>
            <div class="quality-cell quality-cell--stale">7</div>
            <div class="quality-cell quality-cell--incomplete">4</div>
            <div class="quality-cell quality-cell--missing">21</div>
            <div class="quality-cell quality-cell--tribal">14</div>
          </div>
          <div class="quality-legend mt-md">
            <span class="quality-legend__item"><span class="quality-swatch quality-swatch--clean"></span> Clean — current, reliable, usable as-is</span>
            <span class="quality-legend__item"><span class="quality-swatch quality-swatch--stale"></span> Stale — exists but outdated (last modified 6+ months ago)</span>
            <span class="quality-legend__item"><span class="quality-swatch quality-swatch--incomplete"></span> Incomplete — partial info, needs enrichment</span>
            <span class="quality-legend__item"><span class="quality-swatch quality-swatch--missing"></span> Missing — referenced but not documented anywhere</span>
            <span class="quality-legend__item"><span class="quality-swatch quality-swatch--tribal"></span> Tribal — exists only in people's heads</span>
          </div>
        </div>

        <!-- Consolidated Demand Summary -->
        <div class="consolidated-summary mt-xl">
          <div class="summary-stats">
            <div class="summary-stat">
              <span class="summary-stat__value text-mono">50</span>
              <span class="summary-stat__label">tickets analyzed</span>
            </div>
            <div class="summary-stat">
              <span class="summary-stat__value text-mono">217</span>
              <span class="summary-stat__label">demands extracted</span>
            </div>
            <div class="summary-stat">
              <span class="summary-stat__value text-mono">83</span>
              <span class="summary-stat__label">unique after dedup</span>
            </div>
            <div class="summary-stat">
              <span class="summary-stat__value text-mono text-danger">74</span>
              <span class="summary-stat__label">tribal knowledge items</span>
            </div>
          </div>
          <div class="summary-insight mt-md card">
            <p class="text-mono text-muted" style="font-size: var(--font-size-xs);">KEY FINDING</p>
            <p class="mt-sm"><strong>62% of process knowledge and 71% of business terminology is either missing or tribal.</strong> The existing KB covers systems and data models well (SharePoint + GitHub), but operational knowledge — how things actually work, why decisions were made, what the workarounds are — lives in people's heads. This is your onboarding bottleneck.</p>
          </div>
        </div>
      </div>

      <!-- Screen 3: Curation Workspace -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--info">03</span>
          <span class="text-mono">CURATION WORKSPACE</span>
        </div>
        <p class="text-muted mb-md" style="font-size: var(--font-size-sm);">Prioritized curation tasks generated from the consolidated analysis. Domain experts pick items, curate knowledge, submit for review. Clean data gets auto-migrated; tribal knowledge needs human input.</p>
        <div class="vision__kanban">
          <div class="kanban-column">
            <div class="kanban-column__header">
              <span class="text-mono">BACKLOG</span>
              <span class="kanban-count">31</span>
            </div>
            <div class="kanban-card kanban-card--critical">
              <div class="kanban-card__type badge badge--danger">TRIBAL</div>
              <div class="kanban-card__title">"Refund override" business definition</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">terminology</span>
                <span class="text-muted">Needs: Business Analyst</span>
              </div>
            </div>
            <div class="kanban-card kanban-card--critical">
              <div class="kanban-card__type badge badge--danger">TRIBAL</div>
              <div class="kanban-card__title">Vendor API authentication flow</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">process</span>
                <span class="text-muted">Needs: Integration Lead</span>
              </div>
            </div>
            <div class="kanban-card kanban-card--high">
              <div class="kanban-card__type badge badge--warning">STALE</div>
              <div class="kanban-card__title">API contract v4 format (v2 docs exist)</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">api</span>
                <span class="text-muted">Auto-migrate + verify</span>
              </div>
            </div>
            <div class="kanban-more text-mono text-muted">+28 more</div>
          </div>

          <div class="kanban-column">
            <div class="kanban-column__header">
              <span class="text-mono">IN CURATION</span>
              <span class="kanban-count">5</span>
            </div>
            <div class="kanban-card kanban-card--critical">
              <div class="kanban-card__type badge badge--danger">TRIBAL</div>
              <div class="kanban-card__title">Payment gateway fallback logic</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">process</span>
                <span class="text-accent">Marcus L.</span>
              </div>
              <div class="kanban-card__progress">
                <div class="progress-bar" style="height: 4px;">
                  <div class="progress-bar__fill progress-bar__fill--accent" style="width: 45%;"></div>
                </div>
              </div>
            </div>
            <div class="kanban-card kanban-card--high">
              <div class="kanban-card__type badge badge--warning">STALE</div>
              <div class="kanban-card__title">Rate limit configuration rules</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">system</span>
                <span class="text-accent">Auto-migrating...</span>
              </div>
              <div class="kanban-card__progress">
                <div class="progress-bar" style="height: 4px;">
                  <div class="progress-bar__fill progress-bar__fill--success" style="width: 80%;"></div>
                </div>
              </div>
            </div>
            <div class="kanban-more text-mono text-muted">+3 more</div>
          </div>

          <div class="kanban-column">
            <div class="kanban-column__header">
              <span class="text-mono">IN REVIEW</span>
              <span class="kanban-count">3</span>
            </div>
            <div class="kanban-card kanban-card--high">
              <div class="kanban-card__type badge badge--success">MIGRATED</div>
              <div class="kanban-card__title">Order processing service entity</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">system</span>
                <span class="text-accent">PR #127</span>
              </div>
            </div>
            <div class="kanban-card">
              <div class="kanban-card__type badge badge--success">CURATED</div>
              <div class="kanban-card__title">Service booking lifecycle process</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">process</span>
                <span class="text-accent">PR #128</span>
              </div>
            </div>
            <div class="kanban-more text-mono text-muted">+1 more</div>
          </div>

          <div class="kanban-column">
            <div class="kanban-column__header">
              <span class="text-mono">IN CONTEXT LAKE</span>
              <span class="kanban-count">44</span>
            </div>
            <div class="kanban-card kanban-card--done">
              <div class="kanban-card__title text-muted">Order capture API (auto-migrated)</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">system</span>
                <span class="text-success">Live</span>
              </div>
            </div>
            <div class="kanban-card kanban-card--done">
              <div class="kanban-card__title text-muted">Region-specific pricing rules</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">process</span>
                <span class="text-success">Live</span>
              </div>
            </div>
            <div class="kanban-more text-mono text-muted">+42 more</div>
          </div>
        </div>
      </div>

      <!-- Screen 4: Context Lake — The Target -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--info">04</span>
          <span class="text-mono">CONTEXT LAKE</span>
          <span class="text-muted" style="font-size: var(--font-size-xs); margin-left: auto;">Structured, versioned, AI-ready</span>
        </div>
        <p class="text-muted mb-md" style="font-size: var(--font-size-sm);">Clean data auto-migrated into structured entities. Tribal knowledge curated by humans. All governed via Git — PRs, reviews, version history. The meta model ensures relationships are preserved.</p>
        <div class="vision__lake">
          <div class="lake-browser">
            <div class="lake-sidebar">
              <div class="lake-folder">
                <span class="text-mono lake-folder__name">context-lake/</span>
                <div class="lake-folder__children">
                  <div class="lake-item lake-item--active">
                    <span class="text-mono">systems/</span>
                    <span class="lake-count">34 <span class="text-success">&#x2191;12</span></span>
                  </div>
                  <div class="lake-item">
                    <span class="text-mono">apis/</span>
                    <span class="lake-count">89 <span class="text-success">&#x2191;23</span></span>
                  </div>
                  <div class="lake-item">
                    <span class="text-mono">processes/</span>
                    <span class="lake-count">20 <span class="text-success">&#x2191;20</span></span>
                  </div>
                  <div class="lake-item lake-item--warning">
                    <span class="text-mono">jargon-business/</span>
                    <span class="lake-count">22 <span class="text-warning">needs 31</span></span>
                  </div>
                  <div class="lake-item">
                    <span class="text-mono">data-models/</span>
                    <span class="lake-count">45 <span class="text-success">&#x2191;9</span></span>
                  </div>
                  <div class="lake-item">
                    <span class="text-mono">decisions/</span>
                    <span class="lake-count">10 <span class="text-warning">needs 21</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="lake-content">
              <div class="lake-entity">
                <div class="lake-entity__header">
                  <span class="text-mono text-accent">order-processing-service.md</span>
                  <div class="lake-entity__badges">
                    <span class="badge badge--success">AUTO-MIGRATED</span>
                    <span class="badge">HUMAN-VERIFIED</span>
                    <span class="text-mono text-muted" style="font-size: var(--font-size-xs);">Freshness: 0.97</span>
                  </div>
                </div>
                <div class="lake-entity__frontmatter">
                  <code>type: system</code>
                  <code>id: order-processing-service</code>
                  <code>status: active</code>
                  <code>owned_by: platform-team</code>
                  <code>related_systems: [payment-gateway, inventory-service, notification-service]</code>
                  <code>source: confluence/platform-arch + github/order-service/README</code>
                  <code>freshness_score: 0.97</code>
                  <code>last_verified: 2026-03-28</code>
                </div>
                <div class="lake-entity__trail">
                  <span class="text-mono text-muted" style="font-size: var(--font-size-xs);">MIGRATION TRAIL</span>
                  <div class="lake-trail-item">
                    <span class="text-muted">Step 1</span>
                    <span>Extracted from Confluence: Platform Architecture Space</span>
                    <span class="badge badge--info" style="font-size: 9px;">AUTO</span>
                  </div>
                  <div class="lake-trail-item">
                    <span class="text-muted">Step 2</span>
                    <span>Enriched with GitHub README + API spec</span>
                    <span class="badge badge--info" style="font-size: 9px;">AUTO</span>
                  </div>
                  <div class="lake-trail-item">
                    <span class="text-muted">Step 3</span>
                    <span>Tribal knowledge added: payment gateway fallback logic</span>
                    <span class="badge badge--warning" style="font-size: 9px;">HUMAN</span>
                  </div>
                  <div class="lake-trail-item">
                    <span class="text-muted">Step 4</span>
                    <span>Verified by Marcus L. — merged via PR #127</span>
                    <span class="badge badge--success" style="font-size: 9px;">REVIEWED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Screen 5: Agent Performance / ROI -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--info">05</span>
          <span class="text-mono">AGENT PERFORMANCE</span>
        </div>
        <div class="vision__performance">
          <div class="perf-metrics">
            <div class="perf-metric">
              <div class="perf-metric__value text-mono score--danger">12%</div>
              <div class="perf-metric__label text-muted">Accuracy<br>Legacy KB</div>
            </div>
            <div class="perf-metric__arrow">&rarr;</div>
            <div class="perf-metric">
              <div class="perf-metric__value text-mono score--warning">54%</div>
              <div class="perf-metric__label text-muted">Accuracy<br>After Migration</div>
            </div>
            <div class="perf-metric__arrow">&rarr;</div>
            <div class="perf-metric">
              <div class="perf-metric__value text-mono score--success">87%</div>
              <div class="perf-metric__label text-muted">Accuracy<br>After Tribal Curation</div>
            </div>
          </div>

          <div class="perf-convergence mt-lg">
            <div class="perf-convergence__header flex justify-between">
              <span class="text-mono text-muted">KB MIGRATION PROGRESS</span>
              <span class="text-mono text-muted">Week 1 → Week 8</span>
            </div>
            <div class="convergence-chart">
              <div class="convergence-bars">
                ${[45,52,58,62,71,76,80,83].map((v, i) => `
                  <div class="convergence-bar" style="--height: ${v}%" title="Week ${i+1}: ${v}% migrated">
                    <div class="convergence-bar__fill"></div>
                    <div class="convergence-bar__label text-mono">W${i+1}</div>
                  </div>
                `).join('')}
              </div>
              <div class="convergence-annotation">
                <span class="text-muted" style="font-size: var(--font-size-xs);">% of knowledge migrated to context lake &uarr; — auto-migration handles bulk, tribal knowledge is the long tail</span>
              </div>
            </div>
          </div>

          <div class="perf-stats mt-lg">
            <div class="perf-stat">
              <span class="text-mono text-accent">83%</span>
              <span class="text-muted">KB migrated</span>
            </div>
            <div class="perf-stat">
              <span class="text-mono text-accent">6 weeks</span>
              <span class="text-muted">vs 6 months manual</span>
            </div>
            <div class="perf-stat">
              <span class="text-mono text-accent">4.2x</span>
              <span class="text-muted">agent task accuracy</span>
            </div>
            <div class="perf-stat">
              <span class="text-mono text-accent">-68%</span>
              <span class="text-muted">onboarding time</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="vision__cta card mt-xl">
        <p class="text-mono text-accent" style="font-size: var(--font-size-xs); letter-spacing: 0.15em;">THE VISION</p>
        <p class="text-strong mt-sm" style="font-size: var(--font-size-lg);">Your enterprise KB is a monolith.<br>It's time to migrate.</p>
        <p class="text-muted mt-sm">Same knowledge. Modern structure. AI-ready. Human-governed. Built on proven frameworks from information theory, neuroscience, and machine learning. No more tribal knowledge trapped in people's heads.</p>
        <div class="flex gap-md mt-lg flex-wrap">
          <a href="https://arxiv.org/abs/2603.14057" class="btn btn--primary" target="_blank" rel="noopener">Read the research</a>
          <button class="btn btn--secondary" onclick="window.location.reload()">Scan another domain</button>
        </div>
      </div>
    </div>
  `;
}
