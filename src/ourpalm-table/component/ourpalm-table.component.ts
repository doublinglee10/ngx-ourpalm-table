import {Component, Input, AfterContentInit, ContentChildren, QueryList, TemplateRef, ContentChild} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";
import {OurpalmTableStaticColumnComponent} from "./ourpalm-table-static-column.component";


@Component({
    selector: 'ourpalm-table',
    styleUrls: ['./ourpalm-table.component.css'],
    template: `
        <table class="table table-bordered table-striped table-hover text-center">
            <thead>
                <ng-container *ngIf="table.pagination && table.pagePosition != 'bottom' ">
                    <tr class="ourpalm-table-pageing" ourpalm-table-paging [table]="table"></tr>
                </ng-container>
                <tr ourpalm-table-header [table]="table"></tr>
            </thead>
            <tbody>
                <!--动态列-->
                <ng-container *ngIf="dynamicColumn"> 
                    <tr *ngFor="let row of table.rows; let i = index;">
                        <ng-container *ngFor="let column of table.columns">
                            <td ourpalm-table-dynamic-column [table]="table" [row]="row" [column]="column" [index]="i" [class.hidden]="!column.show"></td>
                        </ng-container>
                    </tr>
                </ng-container>
                <!--静态列-->
                <ng-container *ngIf="!dynamicColumn">
                    <!--<ng-content selector="tr"></ng-content>-->
                    <tr *ngFor="let row of table.rows; let i = index;">
                        <!--<template [ngTemplateOutlet]="template" [ngOutletContext]="{}"></template>    -->
                        
                        <td *ngFor="let col of columnDirs" [class.hidden]="!col.column.show">
                            <ourpalm-table-columnTemplateRenderer [table]="table" [columnDir]="col" [row]="row" [index]="i"></ourpalm-table-columnTemplateRenderer>
                        </td>
                    </tr>
                </ng-container>
            </tbody>
            <tfoot>
                <ng-container *ngIf="table.pagination && table.pagePosition != 'top' ">
                    <tr class="ourpalm-table-pageing" ourpalm-table-paging [table]="table"></tr>
                </ng-container>
                <ourpalm-table-settings [table]="table"></ourpalm-table-settings>
            </tfoot>
        </table>
    `
})
export class OurpalmTableComponent implements AfterContentInit {

    //是否是动态列，默认为声明式
    dynamicColumn: boolean = false;

    @Input()
    table: OurpalmTable;

    @ContentChildren(OurpalmTableStaticColumnComponent)
    private columnDirs: QueryList<OurpalmTableStaticColumnComponent>;

    @ContentChild(TemplateRef)
    private template: TemplateRef<any>;

    ngAfterContentInit(): void {
        //声明式列，不支持动态列特性
        if (this.table.columns.length == 0) {
            this.dynamicColumn = false;
            this.table.columns = this.columnDirs.toArray().map((columnDir: OurpalmTableStaticColumnComponent) => columnDir.column);
        } else {
            this.dynamicColumn = true;
        }
        this.reloadCacheColumns();
        this.reloadCachePageSize();
        //加载数据
        this.table.invokeLoadData();
    }

    private reloadCacheColumns() {
        if (this.table.cacheKey && this.table.cacheColumns && window.localStorage) {
            let cache: any = window.localStorage.getItem(`ngx-ourpalm-table-${this.table.cacheKey}`);
            if (cache) {
                cache = JSON.parse(cache);
                let columns: any[] = cache.columns;
                columns.forEach(column => {
                    if (column) {

                    }
                });
            }
        }
    }

    private reloadCachePageSize() {
        if (this.table.cacheKey && this.table.cachePageSize && window.localStorage) {
            let cache: any = window.localStorage.getItem(`ngx-ourpalm-table-${this.table.cacheKey}`);
            if (cache) {
                cache = JSON.parse(cache);
                this.table.defaultPageSize = +cache.pageSize;
            }
        }
    }

}