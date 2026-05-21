import React from 'react';
import './Modal.css';
import Button from '../Button/Button';

export default function Modal({ open, title, subtitle, children, onClose, footer }) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="modal__backdrop" onClick={onClose} aria-label="Close modal" />
      <div className="modal__dialog">
        <div className="modal__header">
          <div>
            <h3>{title}</h3>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="modal__body">{children}</div>
        {footer ? <div className="modal__footer">{footer}</div> : null}
      </div>
    </div>
  );
}
