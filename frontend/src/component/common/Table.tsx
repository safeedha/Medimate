

import React from 'react';

type TableColumn<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  getRowClassName?: (row: T) => string;
  rowRefById?: (row: T) => React.RefObject<HTMLTableRowElement>|null ; 
};

function Table<T extends {}>({
  columns,
  data,
  getRowClassName,
  rowRefById,
}: TableProps<T>) {
  return (
    <table className="w-full table-auto text-sm text-left text-gray-700">
      <thead className="bg-gray-100 text-gray-600 font-semibold uppercase text-xs">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="px-4 py-3">{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={(row as any)._id ?? i}
            ref={rowRefById ? (rowRefById(row) as any) : undefined}
            className={getRowClassName ? getRowClassName(row) : ''}
          >
            {columns.map((col, j) => (
              <td key={j} className="px-4 py-2">
                {col.accessor(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
