import {OnInit, Component, Input} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";


@Component({
    selector: '[ourpalm-table-header]',
    templateUrl: './ourpalm-table-header.component.html'
})
export class OurpalmTableHeaderComponent implements OnInit {

    @Input()
    table: OurpalmTable;

    checkAll: boolean = false;

    ngOnInit(): void {
    }

    toggleCheckBox() {
        this.checkAll = !this.checkAll;
        this.table.rows.forEach((row: any) => row.__checked__ = this.checkAll);
    }

}