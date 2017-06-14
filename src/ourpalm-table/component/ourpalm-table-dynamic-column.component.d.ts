import { OnInit } from "@angular/core";
import { OurpalmTableColumn } from "../model/ourpalm-table-column";
import { OurpalmTable } from "../model/ourpalm-table";
export declare class OurpalmTableDynamicColumnComponent implements OnInit {
    column: OurpalmTableColumn;
    index: number;
    row: any;
    table: OurpalmTable;
    ngOnInit(): void;
    private value();
    private onCheckBoxChange();
}
