import { ColumnDef } from '@tanstack/react-table';
import Checkbox from '../table/Checkbox';
import { ITableOptions } from '../table/Table';
import { Person } from './data';

const columns: ColumnDef<Person>[] = [
  {
    id: 'select',
    accessorKey: 'select',
    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
    size: 50,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <i style={{ color: 'yellow' }}>Name</i>,
    columns: [
      {
        id: 'firstName',
        accessorKey: 'firstName',
      },
      {
        id: 'lastName',
        accessorKey: 'lastName',
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
      },
    ],
  },
  {
    id: 'misc',
    accessorKey: 'misc',
    header: 'Misc',
    columns: [
      {
        id: 'age',
        accessorKey: 'age',
        header: 'Age',
      },
      {
        id: 'visits',
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
      },
      {
        id: 'progress',
        accessorKey: 'progress',
        header: 'Profile Progress',
      },
    ],
  },
];

export const tableOptions: ITableOptions<Person> = {
  fitContainer: true,
  tableHeight: '300px',
  columns,
};
