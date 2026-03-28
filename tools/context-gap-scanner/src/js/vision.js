// Vision mockup screens — enterprise product pipeline
// Static hardcoded data showing what the full product would look like

export function renderVision(container) {
  container.innerHTML = `
    <div class="vision">
      <div class="vision__header mt-xl">
        <h2>What Comes Next</h2>
        <p class="text-muted mt-sm">You've discovered the gaps. Here's how an enterprise fills them at scale.</p>
      </div>

      <!-- Screen 1: Demand Pipeline -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--info">01</span>
          <span class="text-mono">DEMAND PIPELINE</span>
        </div>
        <div class="vision__pipeline">
          <div class="pipeline-stage">
            <div class="pipeline-stage__header">
              <span class="text-mono text-muted">INPUT</span>
            </div>
            <div class="pipeline-stage__body">
              <div class="pipeline-item">50 Jira tickets</div>
              <div class="pipeline-item">32 resolved incidents</div>
              <div class="pipeline-item">15 support conversations</div>
            </div>
            <div class="pipeline-stage__count text-mono">97 items</div>
          </div>

          <div class="pipeline-arrow">&rarr;</div>

          <div class="pipeline-stage">
            <div class="pipeline-stage__header">
              <span class="text-mono text-muted">EXTRACT</span>
            </div>
            <div class="pipeline-stage__body">
              <div class="pipeline-extract-line"><span class="text-muted">TICKET-2891:</span> "needs payment-engine retry config"</div>
              <div class="pipeline-extract-line"><span class="text-muted">TICKET-2847:</span> "needs GKE node repair behavior"</div>
              <div class="pipeline-extract-line"><span class="text-muted">INC-0042:</span> "needs cache stampede runbook"</div>
              <div class="pipeline-extract-line text-muted">... 94 more demands extracted</div>
            </div>
            <div class="pipeline-stage__count text-mono">97 demands</div>
          </div>

          <div class="pipeline-arrow">&rarr;</div>

          <div class="pipeline-stage">
            <div class="pipeline-stage__header">
              <span class="text-mono text-muted">CONSOLIDATE</span>
            </div>
            <div class="pipeline-stage__body">
              <div class="pipeline-consolidated">
                <span class="badge badge--danger">8 critical</span>
                <span class="badge badge--warning">12 high</span>
                <span class="badge badge--info">3 medium</span>
              </div>
              <div class="pipeline-extract-line text-muted mt-sm">74 duplicates merged</div>
              <div class="pipeline-extract-line text-muted">Cross-referenced with existing KB</div>
            </div>
            <div class="pipeline-stage__count text-mono">23 unique gaps</div>
          </div>
        </div>
      </div>

      <!-- Screen 2: Curation Workspace -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--info">02</span>
          <span class="text-mono">CURATION WORKSPACE</span>
        </div>
        <div class="vision__kanban">
          <div class="kanban-column">
            <div class="kanban-column__header">
              <span class="text-mono">BACKLOG</span>
              <span class="kanban-count">8</span>
            </div>
            <div class="kanban-card kanban-card--critical">
              <div class="kanban-card__type badge badge--danger">CRITICAL</div>
              <div class="kanban-card__title">Payment engine retry config</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">system</span>
                <span class="text-muted">Unassigned</span>
              </div>
            </div>
            <div class="kanban-card kanban-card--critical">
              <div class="kanban-card__type badge badge--danger">CRITICAL</div>
              <div class="kanban-card__title">Split-brain reconciliation procedure</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">tribal</span>
                <span class="text-muted">Unassigned</span>
              </div>
            </div>
            <div class="kanban-card kanban-card--high">
              <div class="kanban-card__type badge badge--warning">HIGH</div>
              <div class="kanban-card__title">Notification backpressure behavior</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">system</span>
                <span class="text-muted">Unassigned</span>
              </div>
            </div>
            <div class="kanban-more text-mono text-muted">+5 more</div>
          </div>

          <div class="kanban-column">
            <div class="kanban-column__header">
              <span class="text-mono">IN CURATION</span>
              <span class="kanban-count">3</span>
            </div>
            <div class="kanban-card kanban-card--critical">
              <div class="kanban-card__type badge badge--danger">CRITICAL</div>
              <div class="kanban-card__title">GKE node auto-repair behavior</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">platform</span>
                <span class="text-accent">Sarah M.</span>
              </div>
              <div class="kanban-card__progress">
                <div class="progress-bar" style="height: 4px;">
                  <div class="progress-bar__fill progress-bar__fill--accent" style="width: 60%;"></div>
                </div>
              </div>
            </div>
            <div class="kanban-card kanban-card--high">
              <div class="kanban-card__type badge badge--warning">HIGH</div>
              <div class="kanban-card__title">Fraud scorer feature store schema</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">data_model</span>
                <span class="text-accent">ML Team</span>
              </div>
              <div class="kanban-card__progress">
                <div class="progress-bar" style="height: 4px;">
                  <div class="progress-bar__fill progress-bar__fill--accent" style="width: 30%;"></div>
                </div>
              </div>
            </div>
            <div class="kanban-more text-mono text-muted">+1 more</div>
          </div>

          <div class="kanban-column">
            <div class="kanban-column__header">
              <span class="text-mono">IN REVIEW</span>
              <span class="kanban-count">2</span>
            </div>
            <div class="kanban-card kanban-card--high">
              <div class="kanban-card__type badge badge--warning">HIGH</div>
              <div class="kanban-card__title">Redis cache stampede mitigation</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">jargon_tech</span>
                <span class="text-accent">PR #47</span>
              </div>
            </div>
            <div class="kanban-card">
              <div class="kanban-card__type badge badge--info">MEDIUM</div>
              <div class="kanban-card__title">Warehouse sync sleep workaround</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">tribal</span>
                <span class="text-accent">PR #48</span>
              </div>
            </div>
          </div>

          <div class="kanban-column">
            <div class="kanban-column__header">
              <span class="text-mono">PUBLISHED</span>
              <span class="kanban-count">10</span>
            </div>
            <div class="kanban-card kanban-card--done">
              <div class="kanban-card__title text-muted">Order gateway circuit breaker</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">system</span>
                <span class="text-success">Live</span>
              </div>
            </div>
            <div class="kanban-card kanban-card--done">
              <div class="kanban-card__title text-muted">Region failover procedure</div>
              <div class="kanban-card__meta">
                <span class="text-mono text-muted">process</span>
                <span class="text-success">Live</span>
              </div>
            </div>
            <div class="kanban-more text-mono text-muted">+8 more</div>
          </div>
        </div>
      </div>

      <!-- Screen 3: Coverage Heatmap -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--info">03</span>
          <span class="text-mono">KNOWLEDGE COVERAGE</span>
        </div>
        <div class="vision__heatmap">
          <div class="heatmap-grid">
            <div class="heatmap-corner"></div>
            <div class="heatmap-col-header text-mono">Order Mgmt</div>
            <div class="heatmap-col-header text-mono">Payments</div>
            <div class="heatmap-col-header text-mono">Fulfillment</div>
            <div class="heatmap-col-header text-mono">Platform</div>

            <div class="heatmap-row-header text-mono">Systems</div>
            <div class="heatmap-cell heatmap-cell--high">85%</div>
            <div class="heatmap-cell heatmap-cell--high">78%</div>
            <div class="heatmap-cell heatmap-cell--medium">52%</div>
            <div class="heatmap-cell heatmap-cell--high">71%</div>

            <div class="heatmap-row-header text-mono">Processes</div>
            <div class="heatmap-cell heatmap-cell--medium">61%</div>
            <div class="heatmap-cell heatmap-cell--medium">45%</div>
            <div class="heatmap-cell heatmap-cell--low">28%</div>
            <div class="heatmap-cell heatmap-cell--medium">55%</div>

            <div class="heatmap-row-header text-mono">Integrations</div>
            <div class="heatmap-cell heatmap-cell--medium">48%</div>
            <div class="heatmap-cell heatmap-cell--high">72%</div>
            <div class="heatmap-cell heatmap-cell--low">31%</div>
            <div class="heatmap-cell heatmap-cell--medium">40%</div>

            <div class="heatmap-row-header text-mono">Data Models</div>
            <div class="heatmap-cell heatmap-cell--high">90%</div>
            <div class="heatmap-cell heatmap-cell--high">82%</div>
            <div class="heatmap-cell heatmap-cell--medium">65%</div>
            <div class="heatmap-cell heatmap-cell--high">75%</div>

            <div class="heatmap-row-header text-mono">Tribal Knowledge</div>
            <div class="heatmap-cell heatmap-cell--low">15%</div>
            <div class="heatmap-cell heatmap-cell--critical">8%</div>
            <div class="heatmap-cell heatmap-cell--critical">5%</div>
            <div class="heatmap-cell heatmap-cell--low">12%</div>

            <div class="heatmap-row-header text-mono">Terminology</div>
            <div class="heatmap-cell heatmap-cell--medium">55%</div>
            <div class="heatmap-cell heatmap-cell--medium">60%</div>
            <div class="heatmap-cell heatmap-cell--low">35%</div>
            <div class="heatmap-cell heatmap-cell--medium">50%</div>
          </div>
          <div class="heatmap-legend mt-md">
            <span class="heatmap-legend__item"><span class="heatmap-swatch heatmap-swatch--critical"></span> 0-15%</span>
            <span class="heatmap-legend__item"><span class="heatmap-swatch heatmap-swatch--low"></span> 16-35%</span>
            <span class="heatmap-legend__item"><span class="heatmap-swatch heatmap-swatch--medium"></span> 36-70%</span>
            <span class="heatmap-legend__item"><span class="heatmap-swatch heatmap-swatch--high"></span> 71-100%</span>
          </div>
          <p class="text-muted mt-md" style="font-size: var(--font-size-sm);">Tribal knowledge is critically low across all domains. Fulfillment has the widest gaps overall. This is your quarterly report to leadership.</p>
        </div>
      </div>

      <!-- Screen 4: Agent Performance -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--info">04</span>
          <span class="text-mono">AGENT PERFORMANCE</span>
        </div>
        <div class="vision__performance">
          <div class="perf-metrics">
            <div class="perf-metric">
              <div class="perf-metric__value text-mono score--danger">12%</div>
              <div class="perf-metric__label text-muted">Accuracy<br>Day 1</div>
            </div>
            <div class="perf-metric__arrow">&rarr;</div>
            <div class="perf-metric">
              <div class="perf-metric__value text-mono score--warning">54%</div>
              <div class="perf-metric__label text-muted">Accuracy<br>Cycle 10</div>
            </div>
            <div class="perf-metric__arrow">&rarr;</div>
            <div class="perf-metric">
              <div class="perf-metric__value text-mono score--success">87%</div>
              <div class="perf-metric__label text-muted">Accuracy<br>Cycle 20</div>
            </div>
          </div>

          <div class="perf-convergence mt-lg">
            <div class="perf-convergence__header flex justify-between">
              <span class="text-mono text-muted">CONVERGENCE CURVE</span>
              <span class="text-mono text-muted">20 cycles</span>
            </div>
            <div class="convergence-chart">
              <div class="convergence-bars">
                ${[8,6,5,7,4,3,4,2,2,1,2,1,1,1,0,1,0,0,1,0].map((v, i) => `
                  <div class="convergence-bar" style="--height: ${v * 10}%" title="Cycle ${i+1}: ${v} new entities">
                    <div class="convergence-bar__fill"></div>
                    <div class="convergence-bar__label text-mono">${i+1}</div>
                  </div>
                `).join('')}
              </div>
              <div class="convergence-annotation">
                <span class="text-muted" style="font-size: var(--font-size-xs);">New entities per cycle &darr; — knowledge base converging</span>
              </div>
            </div>
          </div>

          <div class="perf-stats mt-lg">
            <div class="perf-stat">
              <span class="text-mono text-accent">46</span>
              <span class="text-muted">entities curated</span>
            </div>
            <div class="perf-stat">
              <span class="text-mono text-accent">63%</span>
              <span class="text-muted">entity reuse rate</span>
            </div>
            <div class="perf-stat">
              <span class="text-mono text-accent">4.2x</span>
              <span class="text-muted">faster incident resolution</span>
            </div>
            <div class="perf-stat">
              <span class="text-mono text-accent">-73%</span>
              <span class="text-muted">escalation rate</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Screen 5: Context Lake -->
      <div class="vision__screen mt-xl">
        <div class="vision__screen-label">
          <span class="badge badge--info">05</span>
          <span class="text-mono">CONTEXT LAKE</span>
        </div>
        <div class="vision__lake">
          <div class="lake-browser">
            <div class="lake-sidebar">
              <div class="lake-folder">
                <span class="text-mono lake-folder__name">domain-knowledge/</span>
                <div class="lake-folder__children">
                  <div class="lake-item lake-item--active">
                    <span class="text-mono">entities/systems/</span>
                    <span class="lake-count">12</span>
                  </div>
                  <div class="lake-item">
                    <span class="text-mono">entities/processes/</span>
                    <span class="lake-count">8</span>
                  </div>
                  <div class="lake-item">
                    <span class="text-mono">entities/jargon-tech/</span>
                    <span class="lake-count">15</span>
                  </div>
                  <div class="lake-item">
                    <span class="text-mono">entities/data-models/</span>
                    <span class="lake-count">6</span>
                  </div>
                  <div class="lake-item">
                    <span class="text-mono">entities/integrations/</span>
                    <span class="lake-count">5</span>
                  </div>
                  <div class="lake-item lake-item--warning">
                    <span class="text-mono">entities/tribal/</span>
                    <span class="lake-count">3</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="lake-content">
              <div class="lake-entity">
                <div class="lake-entity__header">
                  <span class="text-mono text-accent">payment-engine.md</span>
                  <div class="lake-entity__badges">
                    <span class="badge badge--success">FRESH</span>
                    <span class="text-mono text-muted" style="font-size: var(--font-size-xs);">Updated 2d ago</span>
                  </div>
                </div>
                <div class="lake-entity__frontmatter">
                  <code>type: system</code>
                  <code>status: active</code>
                  <code>owned_by: team-bravo</code>
                  <code>related: [stripe-adapter, fraud-scorer, ledger-db]</code>
                  <code>freshness: 0.94</code>
                </div>
                <div class="lake-entity__trail">
                  <span class="text-mono text-muted" style="font-size: var(--font-size-xs);">AUDIT TRAIL</span>
                  <div class="lake-trail-item">
                    <span class="text-muted">Mar 28</span>
                    <span>Sarah M. updated retry configuration section</span>
                    <span class="text-accent">PR #47</span>
                  </div>
                  <div class="lake-trail-item">
                    <span class="text-muted">Mar 15</span>
                    <span>DDC Cycle #12 — added circuit breaker thresholds</span>
                    <span class="text-accent">PR #38</span>
                  </div>
                  <div class="lake-trail-item">
                    <span class="text-muted">Mar 02</span>
                    <span>Initial curation from demand extraction</span>
                    <span class="text-accent">PR #21</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="vision__cta card mt-xl">
        <p class="text-mono text-strong" style="font-size: var(--font-size-lg);">Context engineering for the enterprise.</p>
        <p class="text-muted mt-sm">The scanner shows you the gaps. The platform fills them — systematically, governed, at scale. No more tribal knowledge trapped in people's heads.</p>
        <div class="flex gap-md mt-lg flex-wrap">
          <a href="https://arxiv.org/abs/2603.14057" class="btn btn--primary" target="_blank" rel="noopener">Read the research</a>
          <button class="btn btn--secondary" onclick="window.location.reload()">Scan another domain</button>
        </div>
      </div>
    </div>
  `;
}
