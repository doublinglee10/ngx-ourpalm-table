import {Component} from "@angular/core";
import {ngfor_page2_rows} from "./ngfor-data/page2.data";
import {ngfor_page1_rows} from "./ngfor-data/page1.data";
import {ngfor_columns} from "./ngfor-data/columns.data";

@Component({
    selector: '',
    template: `
        <h1>V3</h1>
        <button class="btn btn-primary btn-xs" (click)="page1()">page1</button>
        <button class="btn btn-primary btn-xs" (click)="page2()">page2</button>

        <div class="container">
            <div class="row">
                <div class="table-responsive">
                    <ourpalm-table
                            [columns]="columns"
                            [rows]="rows">
                    </ourpalm-table>
                </div>
            </div>
        </div>
    `
})
export class OurpalmTableV3Component {

    rows: any[];

    columns: any[];

    ngOnInit() {
        this.columns = ngfor_columns;
    }

    page1() {
        this.rows = ngfor_page1_rows;
    }

    page2() {
        this.rows = ngfor_page2_rows;
    }

    ngDoCheck() {
        console.time("check");
        console.log('check start');
    }

    ngAfterViewChecked() {
        console.timeEnd("check");
        console.log('check end');
    }
}