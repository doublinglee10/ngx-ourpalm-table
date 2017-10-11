import {OurpalmTable} from "../model/ourpalm-table";

export function onHeaderCheckBoxChange(table: OurpalmTable) {
    if (!table.singleSelect) {
        table.rows = table.rows.map((row: any) => {
            return {...row, ...{__checked__: table.checkAllRows}}
        });
    } else if (!table.checkAllRows) {
        table.rows = table.rows.map((row: any) => {
            return {...row, ...{__checked__: false}}
        });
    }

    if (table.checkOnSelect) {
        table.rows = table.rows.map((row: any) => {
            if (row.__checked__ != row.__selected__)
                return {...row, ...{__selected__: !!row.__checked__}};
            return row;
        });
    }
}