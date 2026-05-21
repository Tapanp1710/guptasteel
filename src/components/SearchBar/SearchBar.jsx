import React from 'react';
import './SearchBar.css';
import { SearchIcon } from '../Icons';
import { useAppContext } from '../../contexts/AppContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useAppContext();

  return (
    <label className="search-bar">
      <SearchIcon size={18} className="search-bar__icon" />
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search customer, lead, PO, vehicle..."
        aria-label="Global search"
      />
    </label>
  );
}
