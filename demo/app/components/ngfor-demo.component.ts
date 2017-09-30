import {Component, OnInit} from "@angular/core";
import {ngfor_columns} from "./ngfor-data/columns.data";
import {ngfor_page1_rows} from "./ngfor-data/page1.data";
import {ngfor_page2_rows} from "./ngfor-data/page2.data";

@Component({
    selector: 'eg-ngfor',
    template: `
        <h1>NgFor</h1>
        <button class="btn btn-primary btn-xs" (click)="page1()">page1</button>
        <button class="btn btn-primary btn-xs" (click)="page2()">page2</button>

        <div class="container">
            <div class="row">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th *ngFor="let column of columns">
                                    {{ column.header }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let row of rows; let i = index;" (click)="log()" (dblclick)="log()">
                                <td (click)="log()" (dblclick)="log()">
                                    {{i + 1}}
                                </td>
                                <td *ngFor="let column of columns" (click)="log()" (dblclick)="log()">
                                    {{ row[column.field] }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
})
export class NgForDemoComponent implements OnInit {

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

    log() {

    }
}