import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Injectable,
    Input,
    OnDestroy,
    Output,
    Pipe,
    PipeTransform,
    ViewEncapsulation
} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";
import {DragulaService} from "ng-dragula";

let dragula_key_index: number = 0;

@Component({
    selector: 'ourpalm-table-setting',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div>
            <div class="ourpalm-mask"></div>
            <div class="ourpalm-dialog">
                <div class="modal-content ourpalm-table-settings">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                (click)="closeSettings()">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">自定义列表项</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="column-items">
                                <span>备选列</span>
                                <div class="col-con">
                                    <input type="text" placeholder="输入值..." [(ngModel)]="lmodel">
                                    <ul>
                                        <li *ngFor="let col of lcolumns | lcolumnFilter:lmodel">
                                            <label>
                                                <input type="checkbox" [(ngModel)]="col.lchecked">
                                                <span>{{col.column.header}}</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div style="padding:0px;margin:0px;text-align:center;width:100px;float:left;">
                                <div style="margin-top:130px;margin-bottom:10px;">
                                    <button type="button" class="btn btn-default btn-sm" (click)="showColumns()">
                                        <i class="glyphicon glyphicon-arrow-right"></i>
                                    </button>
                                </div>
                                <button type="button" class="btn btn-default btn-sm" (click)="hideColumns()">
                                    <i class="glyphicon glyphicon-arrow-left"></i>
                                </button>
                            </div>
                            <div class="column-items">
                                <span>已选列</span>
                                <div class="col-con">
                                    <input type="text" placeholder="输入值..." [(ngModel)]="rmodel">
                                    <ul [dragula]="dragula_key" [dragulaModel]="rcolumns">
                                        <li *ngFor="let col of rcolumns | rcolumnFilter:rmodel; let i = index;">
                                            <label>
                                                <input type="checkbox" [(ngModel)]="col.rchecked">
                                                <span>{{col.column.header}}</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="btn-group btn-group-sm" style="float:right;">
                                    <button type="button" class="btn btn-default" (click)="resetColumns()">还原</button>
                                    <button type="button" class="btn btn-default" (click)="saveColumns()">保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class OurpalmTableSettingComponent implements OnDestroy {

    /** 表格列属性 */
    @Input() originalColumns: OurpalmTableColumn[];
    /** 双向绑定 */
    private _columns: OurpalmTableColumn[] = [];
    @Output() columnsChange: EventEmitter<OurpalmTableColumn[]> = new EventEmitter();

    /** 双向绑定 */
    @Input() openSettings: boolean;
    @Output() openSettingsChange: EventEmitter<boolean> = new EventEmitter();

    dragula_key: string = `ourpalm-table-setting-columns-${++dragula_key_index}`;

    lmodel: string;
    rmodel: string;

    tempcolumns: SettingColumn[] = [];
    lcolumns: SettingColumn[] = [];
    rcolumns: SettingColumn[] = [];

    constructor(private dragulaService: DragulaService,
                private changeDetectorRef: ChangeDetectorRef) {
    }

    get columns() {
        return this._columns;
    }

    @Input() set columns(columns: OurpalmTableColumn[]) {
        this._columns = columns;
        this.tempcolumns = [...columns.map((column: OurpalmTableColumn) => {
            return {
                lchecked: false,
                rchecked: false,
                right: column.show,
                column: new OurpalmTableColumn(column)
            }
        })];
        this.lcolumns = [...this.tempcolumns.filter((col: SettingColumn) => !col.right)];
        this.rcolumns = [...this.tempcolumns.filter((col: SettingColumn) => col.right)];
    }

    showColumns() {
        this.lcolumns.filter((col: SettingColumn) => col.lchecked).forEach((col: SettingColumn) => {
            col.right = true;
            col.lchecked = false;
            col.rchecked = false;
        });
        this.lcolumns = [...this.tempcolumns.filter((col: SettingColumn) => !col.right)];
        this.rcolumns = [...this.tempcolumns.filter((col: SettingColumn) => col.right)];
    }

    hideColumns() {
        this.rcolumns.filter((col: SettingColumn) => col.rchecked).forEach((col) => {
            col.right = false;
            col.lchecked = false;
            col.rchecked = false;
        });
        this.lcolumns = [...this.tempcolumns.filter((col: SettingColumn) => !col.right)];
        this.rcolumns = [...this.tempcolumns.filter((col: SettingColumn) => col.right)];
    }

    resetColumns() {
        this.columns = this.originalColumns.map((col) => {
            return Object.assign(this._getOriginalColumn(col.field), col);
        });
        this.changeDetectorRef.markForCheck();
    }

    saveColumns() {
        let columns: OurpalmTableColumn[] = [...this.lcolumns, ...this.rcolumns]
            .map((col: SettingColumn) => {
                col.column.show = col.right;
                return col.column;
            }).map((col: OurpalmTableColumn) => {
                return Object.assign(this._getOriginalColumn(col.field), col);
            });
        this.columnsChange.emit(columns);
        this.closeSettings();
    }

    closeSettings() {
        this.openSettings = false;
        this.openSettingsChange.emit(false);
    }

    ngOnDestroy() {
        this.dragulaService.destroy(this.dragula_key);
    }

    private _getOriginalColumn(field: string): OurpalmTableColumn {
        for (let i = 0; i < this.columns.length; i++) {
            let column = this.columns[i];
            if (column.field === field) {
                return column;
            }
        }
    }
}

export interface SettingColumn {
    lchecked: boolean;
    rchecked: boolean;
    right: boolean;
    column: OurpalmTableColumn;
}

@Pipe({
    name: 'lcolumnFilter',
    pure: true
})
@Injectable()
export class ColumnSettingsLeftFilter implements PipeTransform {
    transform(columns: SettingColumn[], name: string): SettingColumn[] {
        return !name ? columns : columns.filter(column => column.column.header.includes(name));
    }
}

@Pipe({
    name: 'rcolumnFilter',
    pure: true
})
@Injectable()
export class ColumnSettingsRightFilter implements PipeTransform {
    transform(columns: SettingColumn[], name: string): SettingColumn[] {
        return name ? columns.filter(column => column.column.header.includes(name)) : columns;
    }
}