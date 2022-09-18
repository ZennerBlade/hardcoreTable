export const columnOrderGenerator = (columns: any) => {
  let subColArr: string[] = [];
  columns.map((column: any) => {
    if (column.columns) {
      subColArr = subColArr.concat(column.columns.map((subCol: any) => subCol.id) as string[]);
    } else {
      subColArr.push(column.id as string);
    }
  });
  return subColArr;
};
