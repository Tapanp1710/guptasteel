import React, { useMemo, useState } from 'react';
import './DataTable.css';
import Button from '../Button/Button';
import { ArrowDownIcon, ArrowUpIcon, FilterIcon, SearchIcon, MoreIcon } from '../Icons';
import StatusBadge from '../StatusBadge/StatusBadge';

function getCellValue(row, column) {
  if (typeof column.accessor === 'function') {
    return column.accessor(row);
  }
  return row[column.accessor];
}

function isStatusField(column) {
  const accessor = typeof column.accessor === 'string' ? column.accessor.toLowerCase() : '';
  const header = column.header.toLowerCase();
  return column.statusBadge || accessor.includes('status') || header.includes('status') || header.includes('stage');
}

export default function DataTable({ title, subtitle, rows = [], columns = [], filters = [], pageSize = 5, searchQuery = '', rowActions = [] }) {
  const [sortKey, setSortKey] = useState(columns.find((column) => column.sortable)?.accessor || null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  const searchValue = searchQuery || localSearch;

  const filteredRows = useMemo(() => {
    const searchTerm = searchValue.toLowerCase().trim();
    return rows.filter((row) => {
      const matchesSearch = !searchTerm || Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm));
      const matchesFilter = activeFilter === 'All' || Object.values(row).some((value) => String(value).toLowerCase() === activeFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }, [rows, searchValue, activeFilter]);

  const sortedRows = useMemo(() => {
    if (!sortKey) {
      return filteredRows;
    }

    return [...filteredRows].sort((left, right) => {
      const leftValue = String(getCellValue(left, columns.find((column) => column.accessor === sortKey) || { accessor: sortKey }) || '');
      const rightValue = String(getCellValue(right, columns.find((column) => column.accessor === sortKey) || { accessor: sortKey }) || '');
      const result = leftValue.localeCompare(rightValue, undefined, { numeric: true, sensitivity: 'base' });
      return sortDirection === 'asc' ? result : -result;
    });
  }, [columns, filteredRows, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const paginatedRows = sortedRows.slice((page - 1) * pageSize, page * pageSize);

  function handleSort(column) {
    if (!column.sortable) {
      return;
    }

    if (sortKey === column.accessor) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(column.accessor);
    setSortDirection('asc');
  }

  return (
    <div className="data-table-card">
      <div className="data-table-card__header">
        <div>
          <h3 className="h3">{title}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <div className="data-table-card__tools">
          <label className="data-table-card__search">
            <SearchIcon size={16} />
            <input value={searchValue} onChange={(event) => setLocalSearch(event.target.value)} placeholder="Search table" />
          </label>
          {filters.length > 0 ? (
            <div className="data-table-card__filters">
              <FilterIcon size={16} />
              <select value={activeFilter} onChange={(event) => setActiveFilter(event.target.value)}>
                <option value="All">All</option>
                {filters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      </div>

      <div className="data-table-card__table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.header} onClick={() => handleSort(column)} className={column.sortable ? 'sortable' : ''}>
                  <span>{column.header}</span>
                  {column.sortable ? (
                    <span className="sort-icon">{sortKey === column.accessor && sortDirection === 'desc' ? <ArrowDownIcon size={14} /> : <ArrowUpIcon size={14} />}</span>
                  ) : null}
                </th>
              ))}
              {rowActions.length > 0 ? <th className="actions-column">Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => {
                  const value = getCellValue(row, column);
                  return <td key={column.header}>{column.render ? column.render(value, row) : isStatusField(column) ? <StatusBadge status={value} /> : value}</td>;
                })}
                {rowActions.length > 0 ? (
                  <td>
                    <div className="data-table-card__actions">
                      {rowActions.slice(0, 2).map((action) => (
                        <button key={action.label} type="button" onClick={() => action.onClick(row)}>{action.label}</button>
                      ))}
                      {rowActions.length > 2 ? (
                        <button type="button" className="data-table-card__more"><MoreIcon size={16} /></button>
                      ) : null}
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data-table-card__footer">
        <span>
          Showing {paginatedRows.length} of {sortedRows.length} records
        </span>
        <div className="data-table-card__pagination">
          <Button size="sm" variant="ghost" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button size="sm" variant="ghost" disabled={page === totalPages} onClick={() => setPage((current) => current + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
