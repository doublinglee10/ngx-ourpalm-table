import { OnInit } from "@angular/core";
import { OurpalmTable } from "../model/ourpalm-table";
export declare class OurpalmTableHeaderComponent implements OnInit {
    table: OurpalmTable;
    checkAll: boolean;
    ngOnInit(): void;
    onCheckBoxChange(): void;
}
