import { table, getBorderCharacters } from 'table';

export function row2string(row: { [x: string]: any }[]) {
  if (!row.length) {
    return '';
  }
  const header = Object.keys(row[0]);
  const config = {
    border: getBorderCharacters(`ramac`),
  };
  const tableData = [
    header,
    ...row.map((r) => header.map((h) => r[h] ? r[h].toString() : '')),
  ];
  return table(tableData, config);
}
