import { Person } from '../userSide/data';
import { createColumnHelper } from '@tanstack/react-table';
import Checkbox from './Checkbox';

const columnHelper = createColumnHelper<Person>();

export const columns = [
  columnHelper.display({
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
    id: 'select',
    size: 50,
  }),
  columnHelper.group({
    header: () => <i style={{ color: 'yellow' }}>Name</i>,
    id: 'name',
    columns: [
      columnHelper.accessor('firstName', { id: 'firstName' }),
      columnHelper.accessor('lastName', {
        id: 'lastName',
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Misc',
    id: 'misc',
    columns: [
      columnHelper.accessor('age', {
        header: 'Age',
        id: 'age',
      }),
      columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
        id: 'visits',
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        id: 'status',
      }),
      columnHelper.accessor('progress', {
        header: 'Profile Progress',
        id: 'progress',
      }),
    ],
  }),
];
