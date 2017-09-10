import { OnInit } from "@angular/core";
import { OurpalmTable } from "../model/ourpalm-table";
import { OurpalmTableColumn } from "../model/ourpalm-table-column";
export declare class OurpalmTableHeaderComponent implements OnInit {
    table: OurpalmTable;
    columns: OurpalmTableColumn[];
    checkAll: boolean;
    ngOnInit(): void;
    private onCheckBoxChange();
    private sortColumn(column);
}
