import { AfterContentInit, AfterViewInit, ElementRef, NgZone, OnDestroy } from "@angular/core";
import { OurpalmTable } from "../model/ourpalm-table";
export declare class OurpalmTableComponent implements AfterContentInit, AfterViewInit, OnDestroy {
    private zone;
    el: ElementRef;
    dynamicColumn: boolean;
    table: OurpalmTable;
    private columnDirs;
    private $table;
    constructor(zone: NgZone);
    ngAfterViewInit(): void;
    reflowTable(): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
}
