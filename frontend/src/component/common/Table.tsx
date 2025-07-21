import React from "react";

interface TableProps<T> {
  columns: Array<{ header: string; accessor: (item: T) => React.ReactNode }>;
  data: T[];
  getRowClassName?: (item: T, idx: number) => string;
  rowRefById?: (item: T) => React.RefObject<HTMLTableRowElement|null>;   
}

export default function Table<T extends { _id?: string }>({
  columns,
  data,
  getRowClassName,
  rowRefById,
}: TableProps<T>) {
  return (
    <table className="min-w-full border text-left border-gray-200 rounded-md shadow text-sm">
      <thead className="bg-blue-50">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="px-3 py-2 border">{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr
            key={item._id || idx}
            ref={rowRefById ? rowRefById(item) : undefined}
            className={getRowClassName ? getRowClassName(item, idx) : ""}
          >
            {columns.map((col, cidx) => (
              <td key={cidx} className="px-3 py-2 border">
                {col.accessor(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
