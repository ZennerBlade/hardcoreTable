import { CSSProperties } from 'react';

const table: CSSProperties = {
  textAlign: 'left',
  width: '100%',
  borderSpacing: 0,
};

const header: CSSProperties = {
  background: '#145DA0',
  position: 'sticky',
  top: '0px',
};

const columnHeader: CSSProperties = {
  border: '1px solid black',
};

const body: CSSProperties = {
  background: '#0C2D48',
};

const selectedRow: CSSProperties = {
  backgroundColor: '#B1D4E05A',
};

const row: CSSProperties = {
  borderBottom: '1px solid black',
};

export const tableStyle = {
  table,
  header,
  columnHeader,
  body,
  selectedRow,
  row,
};
