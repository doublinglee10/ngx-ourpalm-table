import {OnInit, Component, Input} from "@angular/core";
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
export class OurpalmTableSettingsComponent implements OnInit {

    @Input()
    table: OurpalmTable;

    ngOnInit(): void {
        // console.warn(this.table);
    }

    close() {
        this.table.openSettings = false;
    }

    toggleColumn(col: OurpalmTableColumn) {
        col.show = !col.show;
        // this.table.rows.forEach((row: any) => )
    }

}