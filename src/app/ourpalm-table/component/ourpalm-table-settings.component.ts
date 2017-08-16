import {Component, Injectable, Input, OnInit, Pipe, PipeTransform} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTableComponent} from "./ourpalm-table.component";

@Component({
    selector: 'ourpalm-table-settings',
    styleUrls: ['ourpalm-table-settings.component.css'],
    template: `
        <div>
            <div class="ourpalm-mask"></div>
            <div class="ourpalm-dialog">
                <div class="modal-content ourpalm-table-settings">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="close()">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">自定义列表项</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-5">
                                <span>所有列</span>
                                <div class="col-con">
                                    <input type="text" placeholder="输入值..." [(ngModel)]="lmodel">
                                    <ul>
                                        <li *ngFor="let col of lcolumns | lcolumnFilter:lmodel">
                                            <label>
                                                <input type="checkbox" [(ngModel)]="col.__lshow__">
                                                <span>{{col.header}}</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-2" style="padding:0px;margin:0px;text-align:center;">
                                <div style="margin-top:130px;margin-bottom:10px;">
                                    <button type="button" class="btn btn-default btn-sm" (click)="showColumn()"><i
                                            class="fa fa-long-arrow-right"></i></button>
                                </div>
                                <button type="button" class="btn btn-default btn-sm" (click)="hideColumn()"><i
                                        class="fa fa-long-arrow-left"></i></button>
                            </div>
                            <div class="col-md-5">
                                <span>已选列</span>
                                <div class="col-con">
                                    <input type="text" placeholder="输入值..." [(ngModel)]="rmodel">
                                    <ul dnd-sortable-container [sortableData]="rcolumns">
                                        <li *ngFor="let col of rcolumns | rcolumnFilter:rmodel; let i = index;"
                                            dnd-sortable [sortableIndex]="i">
                                            <label>
                                                <input type="checkbox" [(ngModel)]="col.__rshow__">
                                                <span dnd-sortable-handle>{{col.header}}</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="btn-group btn-group-sm" style="float:right;">
                                    <button type="button" class="btn btn-default" data-toggle="tooltip" title="还原"
                                            (click)="resetColumn()">还原
                                    </button>
                                    <button type="button" class="btn btn-default" data-toggle="tooltip" title="保存"
                                            (click)="saveColumn()">保存
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class OurpalmTableSettingsComponent implements OnInit {

    lmodel: string;
    rmodel: string;

    @Input()
    table: OurpalmTable;
    @Input()
    tableComponent: OurpalmTableComponent;

    columns: OurpalmTableColumn[] = [];

    lcolumns: OurpalmTableColumn[] = [];
    rcolumns: OurpalmTableColumn[] = [];

    ngOnInit(): void {
        this.lcolumns = [...this.table.columns.map(column => Object.assign({}, column))];
        this.rcolumns = [...this.lcolumns.filter((column: OurpalmTableColumn) => column.show)];
    }

    existsColumn(column: any, columns: any[]): boolean {
        for (let i = 0; i < columns.length; i++) {
            let col = columns[i];
            if (col.field == column.field) return true;
        }
        return false;
    }

    showColumn() {
        let addcolumns: any[] = this.lcolumns.filter((column: any) => column.__lshow__);
        addcolumns.forEach((col1: any) => {
            if (!this.existsColumn(col1, this.rcolumns)) {
                let column = {...col1};
                delete column.__lshow__;
                delete column.__rshow__;
                console.log(column);
                this.rcolumns.push(column);
            }
        });
    }

    hideColumn() {
        this.rcolumns = this.rcolumns.filter((column: any) => !column.__rshow__);
    }

    resetColumn() {
        let columns: any[] = this.table.__columns.map(column => Object.assign({}, column));
        this.rcolumns = [...columns.filter((column: any) => column.show)];
    }

    saveColumn() {
        let tmpColumns = [];
        this.rcolumns.forEach((col: any) => {
            tmpColumns.push({...col, ...{show: true}})
        });
        this.table.columns.forEach((col1: any) => {
            if (!this.existsColumn(col1, this.rcolumns)) {
                tmpColumns.push({...col1, ...{show: false}})
            }
        });

        this.table.columns.splice(0);
        tmpColumns.forEach(col => {
            this.table.columns.push(col);
        });

        if (this.table.cacheKey && this.table.cacheColumns && window.localStorage) {
            let columnArr: Array<any> = [];
            this.table.columns.forEach((column: OurpalmTableColumn) => {
                columnArr.push({field: column.field, show: column.show});
            });
            window.localStorage.setItem(`ngx-ourpalm-table-${this.table.cacheKey}-columns`, JSON.stringify(columnArr));
        }
        this.tableComponent.reflowTable();
        this.close();
    }

    close() {
        this.table.openSettings = false;
    }
}


@Pipe({
    name: 'lcolumnFilter',
    pure: false
})
@Injectable()
export class ColumnSettingsLeftFilter implements PipeTransform {
    transform(columns: OurpalmTableColumn[], name: string): any {
        return !name ? columns : columns.filter(column => column.header.includes(name));
    }
}


@Pipe({
    name: 'rcolumnFilter',
    pure: false
})
@Injectable()
export class ColumnSettingsRightFilter implements PipeTransform {
    transform(columns: OurpalmTableColumn[], name: string): any {
        return name ? columns.filter(column => column.header.includes(name)) : columns;
    }
}