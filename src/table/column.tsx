import { Person } from './data';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Checkbox from './Checkbox';

// export const columns: ColumnDef<Person>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <Checkbox
//         {...{
//           checked: table.getIsAllRowsSelected(),
//           indeterminate: table.getIsSomeRowsSelected(),
//           onChange: table.getToggleAllRowsSelectedHandler(),
//         }}
//       />
//     ),
// cell: ({ row }) => (
//   <Checkbox
//     {...{
//       checked: row.getIsSelected(),
//       indeterminate: row.getIsSomeSelected(),
//       onChange: row.getToggleSelectedHandler(),
//     }}
//   />
// ),
//   },
//   {
//     id: 'firstName',
//     header: 'firstName',
//   },
//   {
//     id: 'lastName',
//     header: () => <span>Last Name</span>,
//     cell: (info) => <i>{info.getValue<string | number>()}</i>,
//   },
//   {
//     id: 'age',
//     header: 'Age',
//   },
//   {
//     id: 'visits',
//     header: () => <span>Visits</span>,
//   },
//   {
//     id: 'status',
//     header: 'Status',
//   },
//   {
//     id: 'progress',
//     header: 'Profile Progress',
//   },
// ];

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
    enableSorting: false,
  }),
  columnHelper.accessor('firstName', {}),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor('age', {
    header: 'Age',
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
  }),
];

{
  /* <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      /> */
}
