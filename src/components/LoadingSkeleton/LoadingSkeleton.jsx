import React from 'react';
import './LoadingSkeleton.css';

export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="loading-skeleton" aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="loading-skeleton__row">
          <span className="loading-skeleton__line loading-skeleton__line--lg" />
          <span className="loading-skeleton__line" />
          <span className="loading-skeleton__line loading-skeleton__line--sm" />
        </div>
      ))}
    </div>
  );
}
