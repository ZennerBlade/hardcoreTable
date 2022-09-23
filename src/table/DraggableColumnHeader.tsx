import { Column, ColumnOrderState, flexRender, Header, Table } from '@tanstack/react-table';
import { data } from '../userSide/data';
import { useDrag, useDrop } from 'react-dnd';
import { ITableOptions } from './Table';
import { tableOptions } from '../userSide/tableOptions';
import { ITableStyles } from './styles';

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

interface IDraggableColumnHeaderProps<T> {
  header: Header<T, unknown>;
  table: Table<T>;
  tableOptions: ITableOptions<T>;
  tableStyle: Partial<ITableStyles>;
}

const DraggableColumnHeader = <T,>({
  header,
  table,
  tableStyle,
}: IDraggableColumnHeaderProps<T>) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<typeof data[0]>) => {
      const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder);
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });

  return (
    <th
      style={{
        maxWidth: header.getSize(),
        width: header.getSize(),
        opacity: isDragging ? 0.5 : 1,
        position: 'relative',
        ...tableStyle.columnHeader,
      }}
      ref={dropRef}
      key={header.id}
      colSpan={header.colSpan}
    >
      {header.isPlaceholder ? null : (
        <div
          ref={previewRef}
          style={{
            display: 'flex',
            justifyContent: tableStyle?.table?.textAlign ?? 'space-between',
            width: tableOptions.fitContainer ? '100%' : 'inherit',
          }}
        >
          <div
            ref={dragRef}
            className="overflowEllipse"
            onClick={header.column.getToggleSortingHandler()}
            style={{
              cursor: header.column.getCanSort() ? 'pointer' : '',
            }}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
          <span>
            {{
              asc: tableOptions.sortIcons?.ascending ?? '🔼',
              desc: tableOptions.sortIcons?.descending ?? '🔽',
            }[header.column.getIsSorted() as string] ?? null}
          </span>
        </div>
      )}
      <div
        {...{
          onMouseDown: header.getResizeHandler(),
          onTouchStart: header.getResizeHandler(),
          className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
        }}
      />
    </th>
  );
};

export default DraggableColumnHeader;
