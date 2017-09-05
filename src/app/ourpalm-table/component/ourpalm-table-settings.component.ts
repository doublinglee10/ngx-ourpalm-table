import {
    ChangeDetectionStrategy,
    Component,
    Injectable,
    Input,
    NgZone,
    OnInit,
    Pipe,
    PipeTransform
} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTableComponent} from "./ourpalm-table.component";

@Component({
    selector: 'ourpalm-table-settings',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
                                <span>备选列</span>
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
                                    <ul [dragula]="'setting-columns'" [dragulaModel]="rcolumns">
                                        <li *ngFor="let col of rcolumns | rcolumnFilter:rmodel; let i = index;">
                                            <label>
                                                <input type="checkbox" [(ngModel)]="col.__rshow__">
                                                <span>{{col.header}}</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="btn-group btn-group-sm" style="float:right;">
                                    <button type="button" class="btn btn-default" (click)="resetColumn()">还原</button>
                                    <button type="button" class="btn btn-default" (click)="saveColumn()">保存</button>
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

    @Input() table: OurpalmTable;
    @Input() tableComponent: OurpalmTableComponent;
    @Input() columns: OurpalmTableColumn[] = [];

    tempcolumns: OurpalmTableColumn[] = [];
    lcolumns: OurpalmTableColumn[] = [];
    rcolumns: OurpalmTableColumn[] = [];

    constructor(private ngZone: NgZone) {
    }

    ngOnInit(): void {
        this.tempcolumns = [...this.columns.map(column => Object.assign({}, column))];
        this.lcolumns = [...this.tempcolumns.filter((column: OurpalmTableColumn) => !column.show)];
        this.rcolumns = [...this.tempcolumns.filter((column: OurpalmTableColumn) => column.show)];
    }

    showColumn() {
        this.lcolumns.filter((column: any) => column.__lshow__).forEach((column) => {
            column.show = true;
            delete column.__lshow__;
            delete column.__rshow__;
        });

        this.lcolumns = [...this.tempcolumns.filter((column: OurpalmTableColumn) => !column.show)];
        this.rcolumns = [...this.tempcolumns.filter((column: OurpalmTableColumn) => column.show)];
    }

    hideColumn() {
        this.rcolumns.filter((column: any) => column.__rshow__).forEach((column) => {
            column.show = false;
            delete column.__lshow__;
            delete column.__rshow__;
        });

        this.lcolumns = [...this.tempcolumns.filter((column: OurpalmTableColumn) => !column.show)];
        this.rcolumns = [...this.tempcolumns.filter((column: OurpalmTableColumn) => column.show)];
    }

    resetColumn() {
        this.tempcolumns = [...this.table.__columns.map(column => Object.assign({}, column))];
        this.lcolumns = [...this.tempcolumns.filter((column: OurpalmTableColumn) => !column.show)];
        this.rcolumns = [...this.tempcolumns.filter((column: OurpalmTableColumn) => column.show)];
    }

    saveColumn() {
        this.close();
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.ngZone.run(() => {
                    let columns = [...this.rcolumns, ...this.lcolumns].map((column) => {
                        delete column.__lshow__;
                        delete column.__rshow__;
                        return Object.assign({}, column);
                    });

                    if (this.table.cacheKey && this.table.cacheColumns && window.localStorage) {
                        let columnArr: Array<any> = [];
                        this.table.columns.forEach((column: OurpalmTableColumn) => {
                            columnArr.push({field: column.field, show: column.show});
                        });
                        window.localStorage.setItem(`ngx-ourpalm-table-${this.table.cacheKey}-columns`, JSON.stringify(columnArr));
                    }
                    this.table.columns = columns;
                    this.table.reflowTable();
                });
            });
        });
    }

    close() {
        this.table.openSettings = false;
    }
}


@Pipe({
    name: 'lcolumnFilter',
    pure: true
})
@Injectable()
export class ColumnSettingsLeftFilter implements PipeTransform {
    transform(columns: OurpalmTableColumn[], name: string): OurpalmTableColumn[] {
        return !name ? columns : columns.filter(column => column.header.includes(name));
    }
}


@Pipe({
    name: 'rcolumnFilter',
    pure: true
})
@Injectable()
export class ColumnSettingsRightFilter implements PipeTransform {
    transform(columns: OurpalmTableColumn[], name: string): OurpalmTableColumn[] {
        return name ? columns.filter(column => column.header.includes(name)) : columns;
    }
}