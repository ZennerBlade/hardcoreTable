import { CellContext } from '@tanstack/react-table';
import { Person } from '../userSide/data';

interface IColumnData {
  id: string;
  cell?: (info: CellContext<Person, string>) => JSX.Element;
  header?: (() => JSX.Element) | string;
}

export const columnData: IColumnData[] = [
  {
    id: 'firstName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  },
  {
    id: 'age',
    header: 'Age',
  },
  {
    id: 'Vists',
    header: () => <span>Visits</span>,
  },
];
