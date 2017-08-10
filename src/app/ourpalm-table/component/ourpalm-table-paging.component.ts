import {Component, Input, OnInit} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";

@Component({
    selector: '[ourpalm-table-paging]',
    styleUrls: ['ourpalm-table-paging.component.css'],
    template: `
        <td *ngIf="table.pagination" [attr.colspan]="table.columns.length">
            <span class="page-left">
                <select class="form-control input-sm" [(ngModel)]="table.defaultPageSize" (change)="changePageSize()">
                    <option *ngFor="let val of table.pageList" [value]="val">{{val}}</option>
                </select>
                <button class="glyphicon glyphicon-step-backward ourpalm-table-pager" (click)="firstPage()"
                        [disabled]="table.currentPage <= 1"></button>
                <button class="glyphicon glyphicon-backward ourpalm-table-pager" (click)="prePage()"
                        [disabled]="table.currentPage <= 1"></button>
                第
                <input type="number" [(ngModel)]="table.tmpCurrentPage" min="1" max="{{table.allPage}}"
                       (focusout)="focusout()" (keydown)="keyEnterEvent($event)" [readonly]="!table.skipPage"
                       class="form-control input-sm">
                页,共{{table.allPage}}页
                <button class="glyphicon glyphicon-forward ourpalm-table-pager" (click)="nextPage()"
                        [disabled]="table.currentPage == table.allPage || table.allPage == 0"></button>
                <button class="glyphicon glyphicon-step-forward ourpalm-table-pager" (click)="lastPage()"
                        [disabled]="table.currentPage == table.allPage || table.allPage == 0"></button>
                <button *ngIf="table.showRefreshBtn" class="glyphicon glyphicon-refresh ourpalm-table-pager" (click)="refresh()"></button>
                <button *ngIf="table.showSettingBtn" class="glyphicon glyphicon-cog ourpalm-table-pager" (click)="table.openSetting()"></button>
            </span>
            <span class="page-right">显示{{table.start}}-{{table.end}}条记录,共{{table.total}}条记录</span>

            <div *ngIf="table?.openSettings">
                <ourpalm-table-settings [table]="table"></ourpalm-table-settings>
            </div>
        </td>
    `
})
export class OurpalmTablePagingComponent implements OnInit {

    @Input()
    table: OurpalmTable;

    ngOnInit(): void {
        // this.table.tmpCurrentPage = this.table.currentPage > 1 ? this.table.currentPage : 0;
    }

    changePageSize() {
        this.table.defaultPageSize = +this.table.defaultPageSize;
        this.table.changePageSize(this.table.defaultPageSize);
        this.saveCachePageSize();
    }

    saveCachePageSize() {
        if (this.table.cacheKey && this.table.cachePageSize && window.localStorage) {
            window.localStorage.setItem(`ngx-ourpalm-table-${this.table.cacheKey}-pagesize`, `${this.table.defaultPageSize}`);
        }
    }

    firstPage() {
        this.table.firstPage();
    }

    prePage() {
        this.table.prePage();
    }

    nextPage() {
        this.table.nextPage();
    }

    lastPage() {
        this.table.lastPage();
    }

    refresh() {
        this.table.refresh();
    }

    focusout() {
        this.table.tmpCurrentPage = this.table.currentPage;
    }

    keyEnterEvent(event) {
        if (event.keyCode == 13 && this.table.skipPage) {
            if (this.table.tmpCurrentPage && this.table.tmpCurrentPage >= 1 && this.table.tmpCurrentPage <= this.table.allPage) {
                this.table.gotoSkipPage(this.table.tmpCurrentPage);
            }
        }
    }
}