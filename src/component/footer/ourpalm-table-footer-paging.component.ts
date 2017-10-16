import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";

@Component({
    selector: '[ourpalm-table-paging]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <td colspan="10000">
            <span class="page-left">
                <select class="form-control input-sm"
                        [(ngModel)]="_pageSize"
                        (change)="_changePageSize()">
                    <option *ngFor="let val of pageList" [value]="val">{{val}}</option>
                </select>
                <button class="glyphicon glyphicon-step-backward ourpalm-table-pager"
                        (click)="_jumpPage(_firstPage)"
                        [disabled]="_currentPage <= 1">
                </button>
                <button class="glyphicon glyphicon-backward ourpalm-table-pager"
                        (click)="_jumpPage(_currentPage - 1)"
                        [disabled]="_currentPage <= 1">
                </button>
                第
                <input type="number" min="1" max="{{_lastPage}}"
                       [readonly]="!skipPage"
                       [ngModel]="currentPage"
                       (ngModelChange)="_changeCurrentPage($event)"
                       class="form-control input-sm"/>
                页,共{{_lastPage}}页
                <button class="glyphicon glyphicon-forward ourpalm-table-pager"
                        (click)="_jumpPage(_currentPage + 1)"
                        [disabled]="_currentPage == _lastPage || _lastPage == 0">
                </button>
                <button class="glyphicon glyphicon-step-forward ourpalm-table-pager"
                        (click)="_jumpPage(_lastPage)"
                        [disabled]="_currentPage == _lastPage || _lastPage == 0">
                </button>
                <button *ngIf="showRefreshBtn" class="glyphicon glyphicon-refresh ourpalm-table-pager"
                        (click)="onRefresh.emit(_currentPage)">
                </button>
                <button *ngIf="showSettingBtn" class="glyphicon glyphicon-cog ourpalm-table-pager"
                        (click)="openSettingsChange.emit(true)"></button>
            </span>
            <span class="page-right">显示{{_start}}-{{_end}}条记录,共{{_total}}条记录</span>
        </td>
    `
})
export class OurpalmTablePagingComponent {

    _currentPage: number = 1;
    _pageSize: number = 10;
    _total: number = 0;
    _firstPage: number = 1;
    _lastPage: number = 0;
    _start: number = 0;
    _end: number = 0;
    _rows: number = 0;

    /** 在设置分页属性的时候 初始化页面大小选择列表 */
    @Input() pageList: number[] = [10, 20, 30, 40, 50];
    /** 在设置分页属性的时候是否允许用户跳转页面 */
    @Input() skipPage: boolean = true;
    /** 是否显示刷新按钮*/
    @Input() showRefreshBtn: boolean = true;

    /** 分页触发加载数据事件 */
    @Output() onChange: EventEmitter<void> = new EventEmitter<void>();
    /** 刷新事件 */
    @Output() onRefresh: EventEmitter<number> = new EventEmitter();

    /** currentPage 双向绑定 */
    @Output() currentPageChange: EventEmitter<number> = new EventEmitter();
    /** pageSize 双向绑定 */
    @Output() pageSizeChange: EventEmitter<number> = new EventEmitter();

    /** 是否显示设置按钮*/
    @Input() showSettingBtn: boolean = true;
    /** 是否打开自定义列表项 */
    @Input() openSettings: boolean = false;
    /** 是否打开自定义列表项 -- 双向绑定 */
    @Output() openSettingsChange: EventEmitter<boolean> = new EventEmitter();

    get currentPage() {
        return this._currentPage;
    }

    @Input()
    set currentPage(value: number) {
        if (this._currentPage === value) {
            return;
        }
        if (value > this._lastPage || value < this._firstPage) {
            return;
        }
        this._currentPage = Number(value);
    }

    @Input()
    get pageSize() {
        return this._pageSize;
    }

    set pageSize(value: number) {
        if (this._pageSize === value) {
            return;
        }
        if (value <= 0) {
            return;
        }
        this._pageSize = Number(value);
        this.onChange.emit();
        this._buildPages();
    }

    get total() {
        return this._total;
    }

    @Input()
    set total(value: number) {
        if (this._total === value) {
            return;
        }
        this._total = value;
        this._buildPages();
    }

    get rows() {
        return this._rows;
    }

    @Input() set rows(rows: number) {
        this._rows = rows;
        this._buildPages();
    }

    private _buildPages() {
        this._lastPage = Math.ceil(this._total / this._pageSize);
        if (this._rows > 0) {
            this._start = (this._currentPage - 1) * this._pageSize + 1;
            this._end = this._start + this.rows - 1;
        } else {
            this._start = 0;
            this._end = 0;
        }
    }

    _jumpPage(index: number) {
        if (index < this._firstPage) {
            this.currentPage = this._firstPage;
        } else if (index > this._lastPage) {
            this.currentPage = this._lastPage;
        } else {
            this.currentPage = index;
        }
        this._buildPages();
        this.currentPageChange.emit(this._currentPage);
        this.onChange.emit();
    }

    _changePageSize() {
        this.currentPage = this._firstPage;
        this._buildPages();
        this.pageSizeChange.emit(this._pageSize);
        this.currentPageChange.emit(this._firstPage);
        this.onChange.emit();
    }

    _changeCurrentPage(index: number) {
        this.currentPage = index;
        this.currentPageChange.emit(this._currentPage);
        this.onChange.emit();
    }
}
