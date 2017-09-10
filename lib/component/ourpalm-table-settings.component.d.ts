import { NgZone, OnInit, PipeTransform } from "@angular/core";
import { OurpalmTable } from "../model/ourpalm-table";
import { OurpalmTableColumn } from "../model/ourpalm-table-column";
import { OurpalmTableComponent } from "./ourpalm-table.component";
export declare class OurpalmTableSettingsComponent implements OnInit {
    private ngZone;
    lmodel: string;
    rmodel: string;
    table: OurpalmTable;
    tableComponent: OurpalmTableComponent;
    columns: OurpalmTableColumn[];
    tempcolumns: OurpalmTableColumn[];
    lcolumns: OurpalmTableColumn[];
    rcolumns: OurpalmTableColumn[];
    constructor(ngZone: NgZone);
    ngOnInit(): void;
    showColumn(): void;
    hideColumn(): void;
    resetColumn(): void;
    saveColumn(): void;
    close(): void;
    private getTableColumn(field);
}
export declare class ColumnSettingsLeftFilter implements PipeTransform {
    transform(columns: OurpalmTableColumn[], name: string): OurpalmTableColumn[];
}
export declare class ColumnSettingsRightFilter implements PipeTransform {
    transform(columns: OurpalmTableColumn[], name: string): OurpalmTableColumn[];
}
