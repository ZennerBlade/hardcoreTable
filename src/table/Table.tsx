import {
  Column,
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ITableStyles, tableStyle } from './styles';
import { useEffect, useState } from 'react';
import DraggableColumnHeader from './DraggableColumnHeader';
import { columnOrderGenerator } from './columnOrderGenerator';

export interface ITableOptions<T> {
  sortIcons?: {
    ascending: string | JSX.Element;
    descending: string | JSX.Element;
  };
  styles?: ITableStyles;
  fitContainer?: boolean;
  tableHeight?: string;
  columns: ColumnDef<T, unknown>[];
}

interface ITableProps<T> {
  tableVisibility: (param: {
    isAllColumnVisible: boolean;
    toggleAllColumnsVisibilityHandler: (event: unknown) => void;
    getAllLeafColumns: Column<T, unknown>[];
  }) => void;
  tableOptions: ITableOptions<T>;
  data: T[];
}

const Table = <T,>({ tableVisibility, tableOptions, data }: ITableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(() =>
    columnOrderGenerator(tableOptions.columns)
  );

  console.log('Col odr ', tableOptions.columns);

  useEffect(() => {
    tableVisibility({
      isAllColumnVisible: table.getIsAllColumnsVisible(),
      toggleAllColumnsVisibilityHandler: table.getToggleAllColumnsVisibilityHandler(),
      getAllLeafColumns: table.getAllLeafColumns(),
    });
  }, [columnVisibility, columnOrder]);

  const table = useReactTable({
    data,
    columns: tableOptions.columns,
    columnResizeMode: 'onChange',
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
    <div style={{ overflow: 'auto', height: tableOptions.tableHeight ?? '' }}>
      <table style={tableStyle.table}>
        <thead style={tableStyle.header}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <DraggableColumnHeader<T>
                  key={header.id}
                  header={header}
                  table={table}
                  tableOptions={tableOptions}
                />
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={tableStyle.body}>
          {table.getRowModel().rows.map((row) => (
            <tr
              className={row.original['style' as keyof unknown] ?? ''}
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
                  style={{ maxWidth: 0, ...tableStyle.row }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
