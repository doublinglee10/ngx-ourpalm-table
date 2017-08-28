import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {OurpalmTableModule} from "./ourpalm-table";
import {AppRoutingModule} from "./app-routing.module";
import {DynamicTableComponent} from "./dynamic-table.component";
import {TableConfig} from "./ourpalm-table/model/table.config";

@NgModule({
    declarations: [
        AppComponent,
        DynamicTableComponent
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
