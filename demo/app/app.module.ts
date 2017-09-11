import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {DynamicTableComponent} from "./dynamic-table.component";
import {StaticTableComponent} from "./static-table.component";
import {OurpalmTableModule} from "../../src/ourpalm-table.module";
import {TableConfig} from "../../src/model/table.config";
import {StringRowTableComponent} from "./string-row.component";

@NgModule({
    declarations: [
        AppComponent,
        DynamicTableComponent,
        StaticTableComponent,
        StringRowTableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OurpalmTableModule.forRoot()
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

    constructor(private tableConfig: TableConfig) {
        this.tableConfig.config = {
            pageSize: 50,
            pageList: [50, 100, 200]
        }
    }
}
