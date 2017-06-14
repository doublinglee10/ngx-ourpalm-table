import {Component} from "@angular/core";
import {OurpalmTable, Page} from "../ourpalm-table/model/ourpalm-table";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    table: OurpalmTable;

    constructor() {
        this.table = new OurpalmTable({
            // columns: [{
            //     header: '全选',
            //     checkbox: true
            // }, {
            //     header: '序号',
            //     rownumbers: true
            // },{
            //     header: '姓名',
            //     field: 'name'
            // },{
            //     header: '年龄',
            //     field: 'age'
            // }],
            pagePosition: 'bottom',
            defaultPageSize: 10,
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {

                var start = (table.currentPage - 1) * table.pageSize + 1;
                var end = start + table.pageSize;
                end = end > 86 ? 86 : end;
                //构造服务器假数据
                var rows = [];
                for (; start < end; start++) {
                    rows.push({
                        name: `zhangsan${start}`,
                        age: start,
                        email: `zhangsan${start}@163.com`
                    });
                }

                setTimeout(function () {
                    callback({
                        total: 86,
                        rows: rows
                    });
                }, 300);
            }
        });
    }

    log(data) {
        console.log(data);
    }
}
