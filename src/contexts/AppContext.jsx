import React, { createContext, useContext, useMemo, useState } from 'react';
import { notifications as seedNotifications, quickActions } from '../services/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notificationItems, setNotificationItems] = useState(seedNotifications);
  const [quickAction, setQuickAction] = useState(null);

  const unreadCount = notificationItems.filter((item) => !item.read).length;

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      isNotificationPanelOpen,
      setIsNotificationPanelOpen,
      notificationItems,
      unreadCount,
      setNotificationItems,
      quickAction,
      setQuickAction,
      openQuickAction: (action) => {
        if (typeof action === 'string') {
          setQuickAction(quickActions.find((item) => item.id === action) || { id: action, label: 'Quick Action', description: 'Create a new business record.' });
          return;
        }

        setQuickAction(action);
      },
      closeQuickAction: () => setQuickAction(null),
      markNotificationRead: (id) => {
        setNotificationItems((items) =>
          items.map((item) => (item.id === id ? { ...item, read: true } : item)),
        );
      },
      markAllNotificationsRead: () => {
        setNotificationItems((items) => items.map((item) => ({ ...item, read: true })));
      },
    }),
    [isNotificationPanelOpen, notificationItems, quickAction, searchQuery, unreadCount],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
