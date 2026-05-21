import React from 'react';
import './Timeline.css';

export default function Timeline({ steps = [], activeIndex = 0 }) {
  return (
    <div className="workflow-timeline" aria-label="Workflow timeline">
      {steps.map((step, index) => (
        <div key={step} className={`workflow-timeline__step ${index <= activeIndex ? 'is-active' : ''}`}>
          <span className="workflow-timeline__dot" />
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}
