import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {OurpalmTableModule} from "./ourpalm-table";
import {AppRoutingModule} from "./app-routing.module";
import {DynamicTableComponent} from "./dynamic-table.component";

@NgModule({
    declarations: [
        AppComponent,
        DynamicTableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OurpalmTableModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
