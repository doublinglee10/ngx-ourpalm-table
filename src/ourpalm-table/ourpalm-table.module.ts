import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OurpalmTableComponent} from "./component/ourpalm-table.component";
import {OurpalmTableHeaderComponent} from "./component/ourpalm-table-header.component";
import {FormsModule} from "@angular/forms";
import {OurpalmTablePagingComponent} from "./component/ourpalm-table-paging.component";
import {OurpalmTableSettingsComponent} from "./component/ourpalm-table-settings.component";
import {OurpalmTableDynamicColumnComponent} from "./component/ourpalm-table-dynamic-column.component";
import {
    OurpalmTableStaticColumnComponent,
    OurpalmTableColumnTemplateRenderer
} from "./component/ourpalm-table-static-column.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        OurpalmTableComponent,
        OurpalmTableDynamicColumnComponent,
        OurpalmTableStaticColumnComponent,
        OurpalmTableHeaderComponent,
        OurpalmTableSettingsComponent,
        OurpalmTablePagingComponent,
        OurpalmTableColumnTemplateRenderer
    ],
    exports: [
        OurpalmTableComponent,
        OurpalmTableStaticColumnComponent
    ]
})
export class OurpalmTableModule {
}