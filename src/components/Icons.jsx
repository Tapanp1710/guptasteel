import React from 'react';

function createIcon(paths) {
  return function Icon({ size = 20, className = '' }) {
    return (
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        {paths.map((path, index) => (
          <path key={index} d={path.d} stroke={path.stroke || 'currentColor'} strokeWidth={path.strokeWidth || 1.8} strokeLinecap="round" strokeLinejoin="round" fill={path.fill || 'none'} />
        ))}
      </svg>
    );
  };
}

export const DashboardIcon = createIcon([{ d: 'M4 11.5h7V4H4v7.5Z' }, { d: 'M13 20h7v-9h-7v9Z' }, { d: 'M13 4h7v4h-7V4Z' }, { d: 'M4 16h7v4H4v-4Z' }]);
export const CustomersIcon = createIcon([{ d: 'M8 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z' }, { d: 'M2.5 20a5.5 5.5 0 0 1 11 0' }, { d: 'M16 8h6' }, { d: 'M19 5v6' }]);
export const TasksIcon = createIcon([{ d: 'M5 5h14v14H5z' }, { d: 'm8 12 2 2 4-5' }, { d: 'M8 8h8' }]);
export const DealsIcon = createIcon([{ d: 'M4 18V6' }, { d: 'M8 18V10' }, { d: 'M12 18V8' }, { d: 'M16 18v-4' }, { d: 'M20 18V5' }]);
export const LeadsIcon = createIcon([{ d: 'M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z' }, { d: 'M5 20a7 7 0 0 1 14 0' }, { d: 'M17 8h4' }, { d: 'M19 6v4' }]);
export const FollowUpsIcon = createIcon([{ d: 'M12 3v9l6 3' }, { d: 'M21 12a9 9 0 1 1-3.35-6.95' }]);
export const InquiryIcon = createIcon([{ d: 'M4 6h16v12H4z' }, { d: 'M8 10h8' }, { d: 'M8 14h5' }]);
export const QuotationIcon = createIcon([{ d: 'M6 3h9l5 5v13H6z' }, { d: 'M15 3v5h5' }, { d: 'M9 12h6' }, { d: 'M9 16h4' }]);
export const PurchaseOrdersIcon = createIcon([{ d: 'M6 4h12v16H6z' }, { d: 'M9 8h6' }, { d: 'M9 12h6' }, { d: 'M9 16h6' }]);
export const DispatchIcon = createIcon([{ d: 'M4 15h11' }, { d: 'M15 7h3l2 3v5h-2' }, { d: 'M7 18a2 2 0 1 0 0 .01' }, { d: 'M18 18a2 2 0 1 0 0 .01' }]);
export const VehiclesIcon = createIcon([{ d: 'M3 14h18' }, { d: 'M5 14l2-5h10l2 5' }, { d: 'M7 18a2 2 0 1 0 0 .01' }, { d: 'M17 18a2 2 0 1 0 0 .01' }]);
export const InvoicesIcon = createIcon([{ d: 'M7 4h10v16H7z' }, { d: 'M9 8h6' }, { d: 'M9 12h6' }, { d: 'M9 16h4' }]);
export const PaymentsIcon = createIcon([{ d: 'M4 7h16v10H4z' }, { d: 'M8 12h8' }, { d: 'M11 9l3 3-3 3' }]);
export const ReportsIcon = createIcon([{ d: 'M5 19h14' }, { d: 'M7 16V9' }, { d: 'M12 16V6' }, { d: 'M17 16v-5' }]);
export const SettingsIcon = createIcon([{ d: 'M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5Z' }, { d: 'M19.4 15a7.96 7.96 0 0 0 .1-1 7.96 7.96 0 0 0-.1-1l2.1-1.6-2-3.4-2.5 1a8.9 8.9 0 0 0-1.7-1l-.4-2.7h-4l-.4 2.7a8.9 8.9 0 0 0-1.7 1l-2.5-1-2 3.4L4.6 13a7.96 7.96 0 0 0-.1 1 7.96 7.96 0 0 0 .1 1l-2.1 1.6 2 3.4 2.5-1a8.9 8.9 0 0 0 1.7 1l.4 2.7h4l.4-2.7a8.9 8.9 0 0 0 1.7-1l2.5 1 2-3.4Z' }]);
export const SearchIcon = createIcon([{ d: 'M10.5 18a7.5 7.5 0 1 1 7.5-7.5 7.5 7.5 0 0 1-7.5 7.5Z' }, { d: 'M16.5 16.5 21 21' }]);
export const BellIcon = createIcon([{ d: 'M6 17h12l-1.4-2.2a3.5 3.5 0 0 1-.6-2V10a4 4 0 0 0-8 0v2.8a3.5 3.5 0 0 1-.6 2L6 17Z' }, { d: 'M10 19a2 2 0 0 0 4 0' }]);
export const ChevronDownIcon = createIcon([{ d: 'm7 10 5 5 5-5' }]);
export const PlusIcon = createIcon([{ d: 'M12 5v14' }, { d: 'M5 12h14' }]);
export const MoreIcon = createIcon([{ d: 'M5 12h.01' }, { d: 'M12 12h.01' }, { d: 'M19 12h.01' }]);
export const FilterIcon = createIcon([{ d: 'M4 6h16l-6 7v5l-4 2v-7z' }]);
export const ArrowUpIcon = createIcon([{ d: 'M12 19V5' }, { d: 'm5 12 7-7 7 7' }]);
export const ArrowDownIcon = createIcon([{ d: 'M12 5v14' }, { d: 'm5 12 7 7 7-7' }]);
export const CheckIcon = createIcon([{ d: 'm5 12 4 4 10-10' }]);
export const ClockIcon = createIcon([{ d: 'M12 7v5l3 2' }, { d: 'M21 12a9 9 0 1 1-9-9' }]);
export const TruckIcon = createIcon([{ d: 'M3 7h11v8H3z' }, { d: 'M14 10h4l3 3v2h-7z' }, { d: 'M7 18a2 2 0 1 0 0 .01' }, { d: 'M18 18a2 2 0 1 0 0 .01' }]);
export const UserIcon = createIcon([{ d: 'M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z' }, { d: 'M5 20a7 7 0 0 1 14 0' }]);
export const LogoutIcon = createIcon([{ d: 'M10 7V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-2' }, { d: 'm15 12H3' }, { d: 'm6 9-3 3 3 3' }]);
export const SparkIcon = createIcon([{ d: 'M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z' }]);
