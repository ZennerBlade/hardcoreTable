import { Column } from '@tanstack/react-table';
import { useState } from 'react';
import './App.css';
import { ShowHideTableColumn } from './userSide/ShowHideTableColumn';
import { Person } from './userSide/data';
import Table from './table/Table';

export interface ITableFn {
  isAllColumnVisible: boolean;
  toggleAllColumnsVisibilityHandler: (e: unknown) => void;
  getAllLeafColumns: Column<Person, unknown>[];
}

function App() {
  const [tableFn, setTableFn] = useState<ITableFn | undefined>();

  return (
    <div className="App">
      {tableFn && ShowHideTableColumn(tableFn)}

      <div style={{ overflow: 'auto', height: '300px' }}>
        <Table tableVisibility={(param) => setTableFn(param)} />
      </div>
    </div>
  );
}

export default App;
