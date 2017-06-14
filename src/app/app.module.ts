import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {OurpalmTableModule} from "../ourpalm-table";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        OurpalmTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
