import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { data } from './data';
import { columns } from './column';
import { tableStyle } from './styles';
import { useState } from 'react';

const Table = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(
    'Selected Rows - ',
    table.getSelectedRowModel(),
    table.getSelectedRowModel().flatRows.map((row) => row.original)
  );

  return (
    <table style={tableStyle.table}>
      <thead style={tableStyle.header}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                style={{
                  maxWidth: tableStyle.minCellWidth,
                  width: header.id === 'select' ? '22px' : '',
                }}
                key={header.id}
              >
                {header.isPlaceholder ? null : (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div
                      className="overflowEllipse"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        cursor: header.column.getCanSort() ? 'pointer' : '',
                        width: '100%',
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                    <span>
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </span>
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody style={tableStyle.body}>
        {table.getRowModel().rows.map((row) => (
          <tr
            className={row.original.style ?? ''}
            style={
              table.getSelectedRowModel().rowsById[row.id] ? tableStyle.selectedRow : undefined
            }
            key={row.id}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={
                  `${cell.column.id}_cell_style` in row.original
                    ? row.original[
                        `${cell.column.id}_cell_style` as keyof typeof row.original
                      ]?.toString()
                    : ''
                }
                style={{ maxWidth: tableStyle.minCellWidth }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
