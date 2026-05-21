import React, { useState } from 'react';
import './QuickActionButton.css';
import { PlusIcon } from '../Icons';
import { quickActions } from '../../services/mockData';
import Button from '../Button/Button';
import { useAppContext } from '../../contexts/AppContext';

export default function QuickActionButton() {
  const { openQuickAction } = useAppContext();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="quick-action">
      {expanded ? (
        <div className="quick-action__menu">
          {quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className="quick-action__item"
              onClick={() => openQuickAction(action)}
            >
              <strong>{action.label}</strong>
              <span>{action.description}</span>
            </button>
          ))}
        </div>
      ) : null}
      <Button className="quick-action__fab" onClick={() => setExpanded((value) => !value)} icon={<PlusIcon size={18} />}>
        {expanded ? 'Close' : 'Quick'}
      </Button>
    </div>
  );
}
