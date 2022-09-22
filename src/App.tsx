import { Column } from '@tanstack/react-table';
import { useState } from 'react';
import './App.css';
import { ShowHideTableColumn } from './userSide/ShowHideTableColumn';
import { data, Person } from './userSide/data';
import Table from './table/Table';
import { tableOptions } from './userSide/tableOptions';

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

      <Table<Person>
        data={data}
        tableOptions={tableOptions}
        tableVisibility={(param) => setTableFn(param)}
      />
    </div>
  );
}

export default App;
