import React, { useState, useEffect } from 'react';
import './Topbar.css';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';
import { BellIcon, ChevronDownIcon, PlusIcon, UserIcon } from '../Icons';
import { useAppContext } from '../../contexts/AppContext';

export default function Topbar() {
  const { unreadCount, setIsNotificationPanelOpen, openQuickAction } = useAppContext();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = stored ? stored === 'dark' : true;
    setIsDark(prefersDark);
    if (prefersDark) document.body.classList.add('theme-dark');
    else document.body.classList.remove('theme-dark');
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    if (next) document.body.classList.add('theme-dark');
    else document.body.classList.remove('theme-dark');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <header className="topbar">
      <div className="topbar__search">
        <SearchBar />
      </div>
      <div className="topbar__meta">
        <div className="topbar__date">
          <span>Current Date</span>
          <strong>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
        </div>

        <button className="topbar__icon-button" type="button" onClick={() => setIsNotificationPanelOpen(true)} aria-label="Open notifications">
          <BellIcon />
          {unreadCount > 0 ? <span className="topbar__badge">{unreadCount}</span> : null}
        </button>

        <div className="topbar__profile-wrap">
          <button className="topbar__profile" type="button" onClick={() => setProfileOpen((value) => !value)}>
            <span className="topbar__avatar"><UserIcon size={16} /></span>
            <span className="topbar__profile-copy">
              <strong>Rahul Sharma</strong>
              <span>Operations Head</span>
            </span>
            <ChevronDownIcon size={16} />
          </button>
          {profileOpen ? (
            <div className="topbar__dropdown">
              <button type="button">Profile</button>
              <button type="button">Preferences</button>
              <button type="button">Sign out</button>
            </div>
          ) : null}
        </div>

        <button className="topbar__icon-button" type="button" onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? '🌙' : '☀️'}
        </button>

        <Button icon={<PlusIcon size={16} />} onClick={() => openQuickAction('lead')}>
          Quick Action
        </Button>
      </div>
    </header>
  );
}
