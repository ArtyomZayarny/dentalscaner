import React from 'react';

interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
}

export default function List<T>({
  data,
  renderItem,
  className = '',
  emptyMessage = 'No items found',
  emptyIcon,
}: ListProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {data.map((item, index) => (
        <div key={index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
