import {Component} from "@angular/core";
import {OurpalmTable} from "../../../src/model/ourpalm-table";

@Component({
    selector: 'addrow',
    template: `
        <div style="z-index:1;width:800px;margin:0 50px;">
            <button (click)="preAddRows(1)">头部添加一行</button>
            <button (click)="preAddRows(3)">头部添加三行</button>
            <button (click)="preAddRows(5)">头部添加五行</button>
            <button (click)="preAddRows(10)">头部添加十行</button>
        </div>
        <div style="z-index:1;width:800px;margin:0 50px;">
            <button (click)="addRows(1)">尾部添加一行</button>
            <button (click)="addRows(3)">尾部添加三行</button>
            <button (click)="addRows(5)">尾部添加五行</button>
            <button (click)="addRows(10)">尾部添加十行</button>
        </div>
        <div #container class="table-responsive" style="margin:10px 50px;">
            <ourpalm-table [table]="table"></ourpalm-table>
        </div>
    `
})
export class AddRowComponent {

    table: OurpalmTable;

    constructor() {
        this.table = new OurpalmTable({
            columns: [{
                field: 'checkbox',
                header: '全选',
                checkbox: true
            }, {
                field: 'rownumbers',
                header: '序号',
                rownumbers: true
            }, {
                field: 'field1',
                header: '随机数'
            }]
        });
    }

    addRows(number) {
        let rows = [];
        for (let i = 0; i < number; i++) {
            rows.push({
                'field1': this.randomStr()
            });
        }
        this.table.rows = [...this.table.rows, ...rows];
    }

    preAddRows(number) {
        let rows = [];
        for (let i = 0; i < number; i++) {
            rows.push({
                'field1': this.randomStr()
            });
        }
        this.table.rows = [...rows, ...this.table.rows];
    }

    randomStr() {
        return Math.random().toString(36).substring(2, 15);
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