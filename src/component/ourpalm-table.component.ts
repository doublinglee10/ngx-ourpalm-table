import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    QueryList,
    ViewChild
} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";
import {OurpalmTableStaticColumnComponent} from "./ourpalm-table-static-column.component";

@Component({
    selector: 'ourpalm-table',
    styleUrls: ['./ourpalm-table.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
        <table #el class="table table-bordered table-striped table-hover text-center" [ngClass]="table.customClass">
            <thead>
                <ng-container *ngIf="table.pagination && table.pagePosition != 'bottom' ">
                    <tr class="ourpalm-table-pageing" ourpalm-table-paging [table]="table"></tr>
                </ng-container>
                <tr ourpalm-table-header [table]="table" [columns]="table.columns"></tr>
            </thead>
            <tbody ourpalm-table-rows [table]="table" [rows]="table.rows" [dynamicColumn]="dynamicColumn"
                   [columns]="table.columns">
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

    private $table: any;

    constructor(private zone: NgZone) {
    }

    ngAfterViewInit(): void {
        this.table && this.table.setTableComponent(this);

        if (this.table.enabledFloatThead) {
            this.zone.runOutsideAngular(() => {
                this.$table = $(this.el.nativeElement);
                this.$table.floatThead({...this.table.floatTheadConfig});
            });
        }
    }

    reflowTable() {
        this.table.enabledFloatThead && this.$table.floatThead('reflow');
    }

    ngOnDestroy(): void {
        if (this.table.enabledFloatThead) {
            this.$table.floatThead('destroy');
        }
    }

    ngAfterContentInit(): void {
        //声明式列，不支持动态列特性
        if (this.columnDirs.toArray().length > 0) {
            this.dynamicColumn = false;
            let columns = this.columnDirs.toArray().map((columnDir: OurpalmTableStaticColumnComponent) => Object.assign(columnDir.column, {template: columnDir.template}));
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