import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    QueryList,
    TemplateRef,
    ViewChild
} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";
import {OurpalmTableStaticColumnComponent} from "./ourpalm-table-static-column.component";

@Component({
    selector: 'ourpalm-table',
    styleUrls: ['ourpalm-table.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
        <table #el class="table table-bordered table-striped table-hover text-center">
            <thead>
                <ng-container *ngIf="table.pagination && table.pagePosition != 'bottom' ">
                    <tr class="ourpalm-table-pageing" ourpalm-table-paging [table]="table"></tr>
                </ng-container>
                <tr ourpalm-table-header [table]="table"></tr>
            </thead>
            <tbody>
                <!--动态列-->
                <ng-container *ngIf="dynamicColumn">
                    <tr *ngFor="let row of table.rows; trackBy: table?.trackByFun; let i = index;"
                        (dblclick)="table.onDbClickRow(i, row)"
                        (click)="table.onClickRow(i, row)">
                        <ng-container *ngFor="let column of table.columns; let j = index">
                            <td ourpalm-table-dynamic-column
                                [table]="table"
                                [row]="row"
                                [column]="column"
                                [index]="i"
                                [class.hidden]="!column.show"
                                (dblclick)="table.onDbClickCell(i, j, row, column)"
                                (click)="table.onClickCell(i, j, row, column)"
                                [ngStyle]="column.ngStyle(i,j,row)">
                            </td>
                        </ng-container>
                    </tr>
                </ng-container>
                <!--静态列-->
                <ng-container *ngIf="!dynamicColumn">
                    <tr *ngFor="let row of table.rows; trackBy: table?.trackByFun ; let i = index;"
                        (dblclick)="table.onDbClickRow(i, row)"
                        (click)="table.onClickRow(i, row)">
                        <td *ngFor="let col of table.columns; let j = index"
                            [class.hidden]="!col.show"
                            (dblclick)="table.onDbClickCell(i, j, row, col)"
                            (click)="table.onClickCell(i, j, row, col)"
                            [ngStyle]="col.ngStyle(i,j,row)">
                            <ourpalm-table-columnTemplateRenderer [table]="table"
                                                                  [column]="col"
                                                                  [row]="row"
                                                                  [index]="i">
                            </ourpalm-table-columnTemplateRenderer>
                        </td>
                    </tr>
                </ng-container>
            </tbody>
            <tfoot>
                <ng-container *ngIf="table.pagination && table.pagePosition != 'top' ">
                    <tr class="ourpalm-table-pageing" ourpalm-table-paging [table]="table" [tableComponent]="this"></tr>
                </ng-container>
            </tfoot>
        </table>
    `
})
export class OurpalmTableComponent implements AfterContentInit, AfterViewInit, OnDestroy {

    @ViewChild('el') el: ElementRef;

    //是否是动态列，默认为声明式
    dynamicColumn: boolean = false;

    @Input()
    table: OurpalmTable;

    @ContentChildren(OurpalmTableStaticColumnComponent)
    private columnDirs: QueryList<OurpalmTableStaticColumnComponent>;

    @ContentChild(TemplateRef)
    private template: TemplateRef<any>;

    private $table: any;

    constructor(private zone: NgZone) {
    }

    ngAfterViewInit(): void {
        this.table && this.table.setTableComponent(this);

        if (this.table.fixTop) {
            this.zone.runOutsideAngular(() => {
                this.$table = $(this.el.nativeElement);
                this.$table.floatThead({
                    responsiveContainer: function ($table) {
                        return $table.closest('.table-responsive');
                    },
                    zIndex: this.table.theadZIndex,
                    top: this.table.distanceTop
                });

                $(window).resize(() => {
                    this.$table.floatThead('reflow');
                });
            });
        }
    }

    reflowTable() {
        this.$table && this.$table.floatThead('reflow');
    }

    ngOnDestroy(): void {
    }

    ngAfterContentInit(): void {
        //声明式列，不支持动态列特性
        if (this.columnDirs.toArray().length > 0) {
            this.dynamicColumn = false;
            let columns = this.columnDirs.toArray().map((columnDir: OurpalmTableStaticColumnComponent) => Object.assign(columnDir.column, {__template__: columnDir.template}));
            this.table.__columns = this.table.columns.map(col => Object.assign({}, col));
            this.table.changeColumns(columns);
        } else {
            this.dynamicColumn = true;
        }
        //加载数据
        if (this.table.autoLoadData) {
            this.table.invokeLoadData();
        }
    }
}