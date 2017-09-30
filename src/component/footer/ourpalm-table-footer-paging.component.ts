import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: '[ourpalm-table-paging]',
    template: `
        <div>
            <span class="page-left">
                <select class="form-control input-sm"
                        [(ngModel)]="pageSize" (change)="changePageSize()">
                    <option *ngFor="let val of pageList" [value]="val">{{val}}</option>
                </select>
                <button class="glyphicon glyphicon-step-backward ourpalm-table-pager"
                        (click)="firstPage()"
                        [disabled]="table.currentPage <= 1">
                </button>
                <button class="glyphicon glyphicon-backward ourpalm-table-pager"
                        (click)="prePage()"
                        [disabled]="table.currentPage <= 1">
                </button>
                第
                <input type="number" min="1" max="{{table.allPage}}"
                       [readonly]="!table.skipPage"
                       [(ngModel)]="table.tmpCurrentPage"
                       (focusout)="focusout()"
                       (keydown)="keyEnterEvent($event)"
                       class="form-control input-sm"/>
                页,共{{table.allPage}}页
                <button class="glyphicon glyphicon-forward ourpalm-table-pager" (click)="nextPage()"
                        [disabled]="table.currentPage == table.allPage || table.allPage == 0">
                </button>
                <button class="glyphicon glyphicon-step-forward ourpalm-table-pager" (click)="lastPage()"
                        [disabled]="table.currentPage == table.allPage || table.allPage == 0">
                </button>
                <button *ngIf="showRefreshBtn" class="glyphicon glyphicon-refresh ourpalm-table-pager"
                        (click)="onRefresh.emit(pageIndex)">
                </button>
            </span>
            <span class="page-right">显示{{table.start}}-{{table.end}}条记录,共{{table.total}}条记录</span>
        </div>
    `
})
export class OurpalmTablePagingComponent {

    _pageIndex: number = 1;
    _pageSize: number = 10;
    _total: number;
    _firstIndex: number = 1;
    _lastIndex: number = Infinity;

    /** 在设置分页属性的时候 初始化页面大小选择列表 */
    @Input() pageList: number[] = [10, 20, 30, 40, 50];
    /** 在设置分页属性的时候是否允许用户跳转页面 */
    @Input() skipPage: boolean = true;
    /** 是否显示刷新按钮*/
    @Input() showRefreshBtn: boolean = true;

    @Output() onPageIndexChange: EventEmitter<number> = new EventEmitter();
    @Output() onPageSizeChange: EventEmitter<number> = new EventEmitter();
    @Output() onRefresh: EventEmitter<number> = new EventEmitter();

    @Input() set pageIndex(value: number) {
        if (this._pageIndex === value) {
            return;
        }
        if (value > this._lastIndex || value < this._firstIndex) {
            return;
        }
        this._pageIndex = Number(value);
        this._buildPages();
    }

    get pageIndex() {
        return this._pageIndex;
    }

    @Input() set pageSize(value: number) {
        if (value === this._pageSize) {
            return;
        }
        this._pageSize = Number(value);
        this.onPageSizeChange.emit(this._pageSize);
        this._buildPages();
    }

    get pageSize() {
        return this._pageSize;
    }

    private _buildPages() {

    }
}
