import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'eg-ngfor',
    template: `
        <h1>NgFor</h1>
        <button class="btn btn-primary btn-xs" (click)="initData(100,20)">100,20</button>
        <button class="btn btn-primary btn-xs" (click)="initData(100,50)">100,50</button>
        <button class="btn btn-primary btn-xs" (click)="initData(200,20)">200,20</button>
        <button class="btn btn-primary btn-xs" (click)="initData(200,50)">200,50</button>
        <button class="btn btn-primary btn-xs" (click)="initData(500,20)">500,20</button>
        <button class="btn btn-primary btn-xs" (click)="initData(1000,20)">1000,20</button>
        <button class="btn btn-primary btn-xs" (click)="initData(2000,20)">2000,20</button>
        <button class="btn btn-primary btn-xs" (click)="initData(10000,20)">10000,20</button>

        <div class="table-container">
            <table>
                <tr *ngFor="let row of rows">
                    <td *ngFor="let column of row">
                        {{column}}
                    </td>
                </tr>
            </table>
        </div>
    `,
    styles: [`
        table, tr, td {
            border: 1px solid deeppink;
        }

        .table-container {
            width: 100%;
            margin-bottom: 50px;
            overflow: auto;
        }
    `]
})
export class NgForDemoComponent implements OnInit {

    rows: any[];


    ngOnInit() {
        this.initData(100, 20);
    }

    initData(rows: number, columns: number) {
        let _data = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < columns; j++) {
                row.push(`row-${i}-column-${j}`);
                // row[`row-${i}-column-${j}`] = `row-${i}-column-${j}`;
            }
            _data.push(row);
        }

        this.rows = [..._data];
    }

    ngDoCheck() {
        console.log('check');
    }
}