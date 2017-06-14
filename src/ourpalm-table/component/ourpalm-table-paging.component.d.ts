import { OnInit } from "@angular/core";
import { OurpalmTable } from "../model/ourpalm-table";
export declare class OurpalmTablePagingComponent implements OnInit {
    table: OurpalmTable;
    ngOnInit(): void;
    changePageSize(): void;
    firstPage(): void;
    prePage(): void;
    nextPage(): void;
    lastPage(): void;
    refresh(): void;
    settings(): void;
    focusout(): void;
    keyEnterEvent(event: any): void;
}
