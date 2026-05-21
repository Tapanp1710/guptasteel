import React, { useState } from 'react';
import './ModulePage.css';
import Card from '../Card/Card';
import Button from '../Button/Button';
import StatusBadge from '../StatusBadge/StatusBadge';
import DataTable from '../Tables/DataTable';
import Charts from '../Charts/Charts';
import ActivityTimeline from '../ActivityTimeline/ActivityTimeline';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import useAutoSave from '../../hooks/useAutoSave';
import { PlusIcon } from '../Icons';

export default function ModulePage({ config }) {
  const [formState, setFormState] = useState(config.form?.initialValues || {});
  const autoSave = useAutoSave(config.form ? formState : config.autosaveSeed);
  const workflowItems = (config.workflow || []).map((item) => {
    const rows = config.table?.rows || [];
    const normalizedLabel = String(item.label || '').trim().toLowerCase();
    const matchingRows = rows.filter((row) => {
      const rowState = String(row.status || row.stage || row.delivery || row.payment || row.ledger || '').trim().toLowerCase();
      return rowState === normalizedLabel || rowState.includes(normalizedLabel);
    }).length;

    return {
      ...item,
      activityCount: item.count ?? (matchingRows > 0 ? matchingRows : item.value),
    };
  });

  return (
    <div className="module-page page-shell">
      <section className="module-page__hero">
        <div>
          <p className="kicker">{config.kicker}</p>
          <h1 className="h1">{config.title}</h1>
          <p className="module-page__subtitle">{config.subtitle}</p>
        </div>
        <div className="module-page__hero-actions">
          {config.primaryAction ? <Button icon={<PlusIcon size={16} />}>{config.primaryAction}</Button> : null}
          <div className="module-page__autosave">{autoSave.statusLabel}</div>
        </div>
      </section>

      {workflowItems.length ? (
        <section className="module-page__workflow card-shell">
          <div className="module-page__workflow-head">
            <div>
              <p className="kicker">Stage Activity</p>
              <h2 className="h2">Number of activities in each stage</h2>
            </div>
            <span className="module-page__workflow-note">Compact summary, no extra clutter</span>
          </div>
          <div className="module-page__workflow-steps">
            {workflowItems.map((item) => (
              <div key={item.label} className="module-page__workflow-step">
                <strong>{item.activityCount}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid grid-4">
        {config.stats.map((stat) => (
          <Card key={stat.label} title={stat.label} tone="soft">
            <div className="module-page__stat">
              <strong>{stat.value}</strong>
              <span>{stat.change}</span>
            </div>
          </Card>
        ))}
      </section>

      <section className="module-page__content grid">
        <div className="module-page__columns">
          <div className="module-page__left">
            <Card title={config.panelTitle} subtitle={config.panelSubtitle}>
              <div className="module-page__feature-list">
                {config.features.map((feature) => (
                  <div key={feature} className="module-page__feature-item">
                    <span />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </Card>

            {config.table ? (
              <DataTable
                title={config.table.title}
                subtitle={config.table.subtitle}
                rows={config.table.rows}
                columns={config.table.columns}
                filters={config.table.filters || []}
                rowActions={config.table.rowActions || []}
                pageSize={config.table.pageSize || 5}
              />
            ) : null}
          </div>

          <div className="module-page__right">
            <Card title="Workflow Snapshot" subtitle="Status and progression at a glance" tone="soft">
              <div className="module-page__snapshot">
                {config.workflow.map((item) => (
                  <div key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </Card>

            {config.charts ? <Charts charts={config.charts} /> : null}

            <ActivityTimeline items={config.timeline} title={config.timelineTitle || 'Recent Activity'} subtitle={config.timelineSubtitle || 'Latest operational movement'} />

            {config.form ? (
              <Card title={config.form.title} subtitle={config.form.subtitle}>
                <div className="module-page__form-shell">
                  <div className="module-page__form-grid">
                    {config.form.fields.map((field) => (
                      <label key={field.name} className="module-page__field">
                        <span>{field.label}</span>
                        {field.type === 'textarea' ? (
                          <textarea
                            rows={field.rows || 4}
                            value={formState[field.name] || ''}
                            onChange={(event) => setFormState((current) => ({ ...current, [field.name]: event.target.value }))}
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <input
                            value={formState[field.name] || ''}
                            onChange={(event) => setFormState((current) => ({ ...current, [field.name]: event.target.value }))}
                            placeholder={field.placeholder}
                          />
                        )}
                      </label>
                    ))}
                  </div>
                  <div className="module-page__form-foot">
                    <StatusBadge status={autoSave.isSaved ? 'Completed' : 'Pending'} />
                    <span>{autoSave.statusLabel}</span>
                    <Button variant="secondary" size="sm">Export Draft</Button>
                  </div>
                </div>
              </Card>
            ) : null}
          </div>
        </div>
      </section>

      {config.loading ? <LoadingSkeleton rows={3} /> : null}
    </div>
  );
}
