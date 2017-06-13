import {Component, Input, AfterContentInit, ContentChildren, QueryList, OnInit} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";
import {OurpalmTableColumnDirective} from "../directive/ourpalm-table-column.directive";


@Component({
    selector: 'ourpalm-table',
    styleUrls: ['./ourpalm-table.component.css'],
    template: `
        <table class="table table-bordered table-striped table-hover text-center">
            <thead>
                <ng-container *ngIf="table.pagePosition != 'bottom' ">
                    <tr class="ourpalm-table-pageing" ourpalm-table-paging [table]="table"></tr>
                </ng-container>
                <tr ourpalm-table-header [table]="table"></tr>
            </thead>
            <tbody>
                <!--动态列-->
                <ng-container *ngIf="dynamicColumn"> 
                    <tr *ngFor="let row of table.rows; let i = index;">
                        <ng-container *ngFor="let column of table.columns">
                            <td ourpalm-table-column [row]="row" [column]="column" [index]="i" [class.hidden]="!column.show"></td>
                        </ng-container>
                    </tr>
                </ng-container>
                <!--静态列-->
                <ng-container *ngIf="!dynamicColumn">
                    <ng-content selector="tr"></ng-content>
                    <!--<tr *ngFor="let $row of table.rows; let i = index;">-->
                        <!--<ng-template ngFor [ngForOf]="columnDirs">-->
                            <!--<ng-content></ng-content>-->
                        <!--</ng-template>-->
                    <!--</tr>-->
                </ng-container>
            </tbody>
            <tfoot>
                <ng-container *ngIf="table.pagePosition != 'top' ">
                    <tr class="ourpalm-table-pageing" ourpalm-table-paging [table]="table"></tr>
                </ng-container>
                <ourpalm-table-settings [table]="table"></ourpalm-table-settings>
            </tfoot>
            <ng-container [class.hidden]="true">
                <ng-content selector="thead"></ng-content>
            </ng-container>
        </table>
    `
})
export class OurpalmTableComponent implements AfterContentInit, OnInit {

    //是否是动态列，默认为声明式
    dynamicColumn: boolean = false;

    @Input()
    table: OurpalmTable;

    @ContentChildren(OurpalmTableColumnDirective)
    private columnDirs: QueryList<OurpalmTableColumnDirective>;

    ngOnInit(): void {
        // console.warn(this.table);
    }

    ngAfterContentInit(): void {
        console.info(this.columnDirs.toArray().length);
        //声明式列，不支持动态列特性
        if (this.table.columns.length == 0) {
            this.dynamicColumn = false;
            this.table.columns = this.columnDirs.toArray().map((columnDir: OurpalmTableColumnDirective) => columnDir.column);
        } else {
            this.dynamicColumn = true;
        }

        console.log('this.dynamicColumn', this.dynamicColumn);
        //加载数据
        this.table.invokeLoadData();
    }

    log(row, column) {
        console.log(row, column);
    }

}