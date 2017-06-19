import {Component, Input, PipeTransform, Injectable, Pipe, OnInit} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";

@Component({
    selector: 'ourpalm-table-settings',
    styleUrls: ['./ourpalm-table-settings.component.css'],
    template: `
        <div>
            <div class="ourpalm-mask"></div>
            <div class="ourpalm-dialog">
                <div class="modal-content ourpalm-table-settings">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="close()"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">自定义列表项</h4> 
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-5">
                                <span>所有列</span>
                                <div class="col-con">
                                    <input type="text" placeholder="输入值..." [(ngModel)]="lmodel">
                                    <ul>
                                        <li *ngFor="let col of columns | lcolumnFilter:lmodel">
                                            <input type="checkbox" [(ngModel)]="col.__lshow__">
                                            <span>{{col.header}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-2" style="padding:0px;margin:0px;text-align:center;">
                                <div style="margin-top:130px;margin-bottom:10px;">
                                    <button type="button" class="btn btn-default btn-sm" (click)="showColumn()"><i class="fa fa-long-arrow-right"></i></button>
                                </div>
                                <button type="button" class="btn btn-default btn-sm" (click)="hideColumn()"><i class="fa fa-long-arrow-left"></i></button>
                            </div>
                            <div class="col-md-5">
                                <span>已选列</span>
                                <div class="col-con">
                                    <input type="text" placeholder="输入值..." [(ngModel)]="rmodel">
                                    <ul dnd-sortable-container [sortableData]="columns"> 
                                        <li *ngFor="let col of columns | rcolumnFilter:rmodel; let i = index;" dnd-sortable [sortableIndex]="i">
                                            <input type="checkbox" [(ngModel)]="col.__rshow__">
                                            <span>{{col.header}}</span>                      
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="btn-group btn-group-sm" style="float:right;">
                                    <button type="button" class="btn btn-default" data-toggle="tooltip" title="还原" (click)="resetColumn()">还原</button>
                                    <button type="button" class="btn btn-default" data-toggle="tooltip" title="保存" (click)="saveColumn()">保存</button>
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

    columns: OurpalmTableColumn[] = [];

    ngOnInit(): void {
        this.columns = this.table.columns.map(column => Object.assign({}, column));
        this.columns.filter((column: any) => column.show).map((column: any) => column.__fshow__ = true);
        this.columns.map((column: any) => column.__lshow__ = column.__rshow__ = false);
    }

    private showColumn() {
        this.columns.filter((column: any) => column.__lshow__).map((column: any) => column.__fshow__ = true);
    }

    private hideColumn() {
        this.columns.filter((column: any) => column.__rshow__).map((column: any) => column.__fshow__ = false);
    }

    private resetColumn() {
        this.columns = this.table.__columns.map(column => Object.assign({}, column));
        this.columns.filter((column: any) => column.show).map((column: any) => column.__fshow__ = true);
        this.columns.map((column: any) => column.__lshow__ = column.__rshow__ = false);
    }

    private saveColumn() {
        this.table.columns = this.columns.map(column => Object.assign({}, column));
        this.table.columns.map((column: any) => Object.assign(column, {show: false})).filter((column: any) => column.__fshow__).map((column: any) => column.show = true);
        if (this.table.cacheKey && this.table.cacheColumns && window.localStorage) {
            let columnArr: Array<any> = [];
            this.table.columns.forEach((column: OurpalmTableColumn) => {
                columnArr.push({field: column.field, show: column.show});
            });
            window.localStorage.setItem(`ngx-ourpalm-table-${this.table.cacheKey}-columns`, JSON.stringify(columnArr));
        }
    }

    private close() {
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
        return !name ? columns : columns.filter(column => column.header.startsWith(name));
    }
}


@Pipe({
    name: 'rcolumnFilter',
    pure: false
})
@Injectable()
export class ColumnSettingsRightFilter implements PipeTransform {
    transform(columns: OurpalmTableColumn[], name: string): any {
        return name ? columns.filter((col: any) => col.__fshow__).filter(column => column.header.startsWith(name)) : columns.filter((col: any) => col.__fshow__);
    }
}