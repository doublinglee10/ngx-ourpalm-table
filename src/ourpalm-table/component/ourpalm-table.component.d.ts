import { AfterContentInit } from "@angular/core";
import { OurpalmTable } from "../model/ourpalm-table";
export declare class OurpalmTableComponent implements AfterContentInit {
    dynamicColumn: boolean;
    table: OurpalmTable;
    private columnDirs;
    private template;
    ngAfterContentInit(): void;
}
