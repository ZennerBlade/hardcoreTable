import {
  Column,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { data } from './data';
import { columns } from './column';
import { tableStyle } from './styles';
import { useEffect, useState } from 'react';
import DraggableColumnHeader from './DraggableColumnHeader';

interface ITable<T> {
  tableVisibility: (param: {
    isAllColumnVisible: boolean;
    toggleAllColumnsVisibilityHandler: (event: unknown) => void;
    getAllLeafColumns: Column<T, unknown>[];
  }) => void;
}

const Table = ({ tableVisibility }: ITable<typeof data[0]>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string) //must start out with populated columnOrder so we can splice
  );

  console.log('Col odr ', columns);

  useEffect(() => {
    tableVisibility({
      isAllColumnVisible: table.getIsAllColumnsVisible(),
      toggleAllColumnsVisibilityHandler: table.getToggleAllColumnsVisibilityHandler(),
      getAllLeafColumns: table.getAllLeafColumns(),
    });
  }, [columnVisibility]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      columnOrder,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
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
              <DraggableColumnHeader key={header.id} header={header} table={table} />
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
