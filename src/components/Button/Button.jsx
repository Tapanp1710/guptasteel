import React from 'react';
import './Button.css';

export default function Button({ children, variant = 'primary', size = 'md', type = 'button', onClick, className = '', disabled = false, icon, title }) {
  return (
    <button
      type={type}
      className={`ui-button ui-button--${variant} ui-button--${size} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {icon ? <span className="ui-button__icon">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
