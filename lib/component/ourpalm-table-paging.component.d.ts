import { OnInit } from "@angular/core";
import { OurpalmTable } from "../model/ourpalm-table";
import { OurpalmTableComponent } from "./ourpalm-table.component";
export declare class OurpalmTablePagingComponent implements OnInit {
    table: OurpalmTable;
    tableComponent: OurpalmTableComponent;
    ngOnInit(): void;
    changePageSize(): void;
    saveCachePageSize(): void;
    firstPage(): void;
    prePage(): void;
    nextPage(): void;
    lastPage(): void;
    refresh(): void;
    focusout(): void;
    keyEnterEvent(event: any): void;
}
