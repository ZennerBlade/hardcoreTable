import { Column, ColumnOrderState, flexRender, Header, Table } from '@tanstack/react-table';
import { FC } from 'react';
import { data } from './data';
import { useDrag, useDrop } from 'react-dnd';
import { tableStyle } from './styles';

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

  console.log('header ', header);

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
        maxWidth: tableStyle.minCellWidth,
        width: header.id === 'select' ? '22px' : '',
        opacity: isDragging ? 0.5 : 1,
      }}
      ref={dropRef}
      key={header.id}
    >
      {header.isPlaceholder ? null : (
        <div ref={previewRef} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            ref={dragRef}
            className="overflowEllipse"
            onClick={header.column.getToggleSortingHandler()}
            style={{
              cursor: header.column.getCanSort() ? 'pointer' : '',
              width: '100%',
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
    </th>
  );
};

export default DraggableColumnHeader;
