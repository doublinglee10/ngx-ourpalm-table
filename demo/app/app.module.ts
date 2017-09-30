import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {DynamicTableComponent} from "./components/dynamic-table.component";
import {StaticTableComponent} from "./components/static-table.component";
import {OurpalmTableModule} from "../../src/ourpalm-table.module";
import {TableConfig} from "../../src/model/table.config";
import {StringRowTableComponent} from "./components/string-row.component";
import {ObjectRowTableComponent} from "./components/object-row.component";
import {CardViewComponent} from "./components/card-view.component";
import {HttpModule} from "@angular/http";
import {NgForDemoComponent} from "./components/ngfor-demo.component";
import {OurpalmTableV3Component} from "./components/ourpalm-table-v3.component";

@NgModule({
    declarations: [
        AppComponent,
        DynamicTableComponent,
        StaticTableComponent,
        StringRowTableComponent,
        ObjectRowTableComponent,
        CardViewComponent,
        NgForDemoComponent,
        OurpalmTableV3Component
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
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
