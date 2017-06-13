import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OurpalmTableComponent} from "./component/ourpalm-table.component";
import {OurpalmTableColumnDirective} from "./directive/ourpalm-table-column.directive";
import {OurpalmTableHeaderComponent} from "./component/ourpalm-table-header.component";
import {FormsModule} from "@angular/forms";
import {OurpalmTableColumnComponent} from "./component/ourpalm-table-column.component";
import {OurpalmTablePagingComponent} from "./component/ourpalm-table-paging.component";
import {OurpalmTableSettingsComponent} from "./component/ourpalm-table-settings.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        OurpalmTableComponent,
        OurpalmTableColumnComponent,
        OurpalmTableColumnDirective,
        OurpalmTableHeaderComponent,
        OurpalmTableSettingsComponent,
        OurpalmTablePagingComponent
    ],
    exports: [
        OurpalmTableComponent,
        OurpalmTableColumnDirective
    ]
})
export class OurpalmTableModule {
}