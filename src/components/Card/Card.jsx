import React from 'react';
import './Card.css';

export default function Card({ children, title, subtitle, className = '', action, tone = 'default' }) {
  return (
    <section className={`ui-card ui-card--${tone} ${className}`.trim()}>
      {(title || subtitle || action) && (
        <div className="ui-card__header">
          <div>
            {title ? <h3 className="ui-card__title">{title}</h3> : null}
            {subtitle ? <p className="ui-card__subtitle">{subtitle}</p> : null}
          </div>
          {action ? <div className="ui-card__action">{action}</div> : null}
        </div>
      )}
      <div className="ui-card__body">{children}</div>
    </section>
  );
}
