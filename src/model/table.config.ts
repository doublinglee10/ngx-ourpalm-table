import {Injectable} from "@angular/core";
import {OurpalmTable} from "./ourpalm-table";

@Injectable()
export class TableConfig {

    config: OurpalmTable | Object;

    create(table: OurpalmTable | Object): OurpalmTable {
        return new OurpalmTable(Object.assign({}, this.config, table));
    }
}