import { Column, ColumnOrderState, flexRender, Header, Table } from '@tanstack/react-table';
import { FC } from 'react';
import { data } from './data';
import { useDrag, useDrop } from 'react-dnd';

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

const DraggableColumnHeader: FC<{
  header: Header<typeof data[0], unknown>;
  table: Table<typeof data[0]>;
}> = ({ header, table }) => {
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
      }}
      ref={dropRef}
      key={header.id}
    >
      {header.isPlaceholder ? null : (
        <div
          ref={previewRef}
          style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
          // style={{ display: 'flex', justifyContent: 'space-between', width: 'inherit' }}
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
              asc: '🔼',
              desc: '🔽',
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
