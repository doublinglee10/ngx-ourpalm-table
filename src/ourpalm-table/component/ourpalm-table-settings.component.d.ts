import { OnInit } from "@angular/core";
import { OurpalmTable } from "../model/ourpalm-table";
import { OurpalmTableColumn } from "../model/ourpalm-table-column";
export declare class OurpalmTableSettingsComponent implements OnInit {
    table: OurpalmTable;
    ngOnInit(): void;
    close(): void;
    toggleColumn(col: OurpalmTableColumn): void;
}
