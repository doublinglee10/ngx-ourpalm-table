import {Component} from "@angular/core";
import {OurpalmTable, Page} from "../../../src/model/ourpalm-table";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

@Component({
    selector: 'card-view',
    template: `
        <ourpalm-table [table]="table">
            <ourpalm-table-column
                    [column]="{header: 'Select', field: 'checkAll', checkbox: true}"></ourpalm-table-column>
            <ourpalm-table-column
                    [column]="{header: 'Number', field: 'number', rownumbers: true}"></ourpalm-table-column>
            <ourpalm-table-column [column]="{header: 'ID', field: 'ID'}">
                <ng-template let-row="$row">
                    {{row.ID}}
                </ng-template>
            </ourpalm-table-column>
            <ourpalm-table-column [column]="{header: 'Price', field: 'Price', sort: true}">
                <ng-template let-row="$row">
                    {{row.Price}}
                </ng-template>
            </ourpalm-table-column>
            <ourpalm-table-column [column]="{header: 'Cost', field: 'Cost'}">
                <ng-template let-row="$row">
                    {{row.Cost}}
                </ng-template>
            </ourpalm-table-column>
            <ourpalm-table-column [column]="{header: 'Url', field: 'Url'}">
                <ng-template let-row="$row">
                    {{row.Url}}
                </ng-template>
            </ourpalm-table-column>
            <ourpalm-table-column [column]="{header: 'Other', field: 'Other'}">
                <ng-template let-row="$row">
                    {{row.Other}}
                </ng-template>
            </ourpalm-table-column>
            <ourpalm-table-rowview>
                <ng-template let-row="$row" let-index="$index">
                    <div>
                        <div style="display:inline-block;float:left;"><img [src]="row.Url"></div>
                        <div style="text-align:left;padding-left:10px;display:inline-block;overflow:auto;">
                            <p>ID：{{row.ID}}</p>
                            <p>Price：{{row.Price}}</p>
                            <p>Cost：{{row.Cost}}</p>
                            <p style="overflow:auto">Other：{{row.Other}}</p>
                        </div>
                    </div>
                </ng-template>
            </ourpalm-table-rowview>
        </ourpalm-table>

    `
})
export class CardViewComponent {

    table: OurpalmTable;

    constructor(private http: Http) {
        this.table = new OurpalmTable({
            rowViewShowType: 'both',
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {
                this.http
                    .get('http://rapapi.org/mockjsdata/3828/ngx-ourpalm-table/cardview.do')
                    .map((response) => response.json())
                    .subscribe((result) => {
                        console.log(result);
                        callback({
                            total: result.data.length,
                            rows: result.data
                        });
                    });
            }
        });
    }
}