import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTable} from "../model/ourpalm-table";

export function sortColumns(column: OurpalmTableColumn, table: OurpalmTable) {
    switch (column.sortOrder) {
        case 'asc':
            column.sortOrder = 'desc';
            break;
        case 'desc':
            column.sortOrder = 'asc';
            break;
        default:
            column.sortOrder = 'asc';
            break;
    }

    if (!table.multiSort) {
        table.columns = table.columns.map((_column) => {
            if (_column.field != column.field) {
                if (_column.sortOrder != null) {
                    return Object.assign({}, _column, {sortOrder: null});
                }
            }
            return _column;
        });
    } else {
        table.columns = table.columns.map((_column) => {
            if (_column.field != column.field) {
                return _column;
            }
            return Object.assign({}, column);
        });
    }

    if (table.serverSort) {
        table.invokeLoadData();
    } else {
        table.rows.sort((row1, row2) => {
            switch (column.sortOrder) {
                case 'asc':
                    return column.sorter(column, row1, row2);
                case 'desc':
                default:
                    return -column.sorter(column, row1, row2);
            }
        });
        table.rows = [...table.rows];
    }
}