import { ITableFn } from '../App';

export function ShowHideTableColumn(tableFn: ITableFn) {
  console.log(tableFn);
  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <div>Toggle All</div>
        <input
          style={{ width: 'fit-content', margin: 0 }}
          {...{
            type: 'checkbox',
            checked: tableFn.isAllColumnVisible,
            onChange: tableFn.toggleAllColumnsVisibilityHandler,
          }}
        />
      </div>
      {tableFn.getAllLeafColumns.map((column) => {
        return (
          <div
            key={column.id}
            style={{
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            {column.id}
            <input
              style={{ width: 'fit-content', margin: 0 }}
              {...{
                type: 'checkbox',
                checked: column.getIsVisible(),
                onChange: column.getToggleVisibilityHandler(),
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
