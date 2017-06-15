import {Component, Input} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";


@Component({
    selector: 'ourpalm-table-settings',
    styleUrls: ['./ourpalm-table-settings.component.css'],
    template: `
        <div *ngIf="table.openSettings">
            <div class="ourpalm-mask"></div>
            <div class="ourpalm-dialog">
                <div class="modal-content ourpalm-table-settings">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="close()"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">自定义列表项</h4> 
                    </div>
                    <div class="modal-body">
                        <label class="checkbox-inline" *ngFor="let col of table.columns">
                            <input type="checkbox" [(ngModel)]="col.show" (click)="toggleColumn(col)"><span>{{col.header}}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class OurpalmTableSettingsComponent {

    @Input()
    table: OurpalmTable;

    private close() {
        this.table.openSettings = false;
    }

    private toggleColumn(col: OurpalmTableColumn) {
        col.show = !col.show;
        this.saveCacheColumns();
    }

    private saveCacheColumns() {
        if (this.table.cacheKey && this.table.cacheColumns && window.localStorage) {
            let columnObj: Object = {};
            this.table.columns.forEach((column: OurpalmTableColumn) => {
                columnObj[column.field] = column.show;
            });
            window.localStorage.setItem(`ngx-ourpalm-table-${this.table.cacheKey}-columns`, JSON.stringify(columnObj));
        }
    }
}