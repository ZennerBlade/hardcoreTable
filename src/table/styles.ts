import { CSSProperties } from 'react';

const table: CSSProperties = {
  border: '1px solid lightgray',
  textAlign: 'left',
  width: '100%',
};

const header: CSSProperties = {
  background: 'red',
};

const body: CSSProperties = {
  background: 'purple',
};

const selectedRow: CSSProperties = {
  backgroundColor: 'rgba(46, 210, 102, 0.6)',
};

const minCellWidth = '20px';

export const tableStyle = {
  table,
  header,
  body,
  selectedRow,
  minCellWidth,
};
