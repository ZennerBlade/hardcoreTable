import { Person } from './data';
import { createColumnHelper } from '@tanstack/react-table';
import Checkbox from './Checkbox';

const columnHelper = createColumnHelper<Person>();

export const columns = [
  columnHelper.accessor('select', {
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
    enableSorting: false,
    size: 50,
  }),
  columnHelper.accessor('firstName', { id: 'firstName' }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
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
];
