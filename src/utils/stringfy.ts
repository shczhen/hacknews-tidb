import _ from 'lodash';
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
    ...row.map((r) => header.map((h) => _.toString(r[h]))),
  ];
  return table(tableData, config);
}
