import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OurpalmTableComponent} from "./component/ourpalm-table.component";
import {OurpalmTableHeaderComponent} from "./component/ourpalm-table-header.component";
import {FormsModule} from "@angular/forms";
import {OurpalmTablePagingComponent} from "./component/ourpalm-table-paging.component";
import {OurpalmTableDynamicColumnComponent} from "./component/ourpalm-table-dynamic-column.component";
import {
    OurpalmTableColumnTemplateRenderer,
    OurpalmTableStaticColumnComponent
} from "./component/ourpalm-table-static-column.component";
import {
    ColumnSettingsLeftFilter,
    ColumnSettingsRightFilter,
    OurpalmTableSettingsComponent
} from "./component/ourpalm-table-settings.component";
import {DragulaModule} from "ng2-dragula";
import {OurpalmTableRowComponent} from "./component/ourpalm-table-rows.component";
import {DynamicEventDirective} from "./component/dynamic-event.directive";
import {TableConfig} from "./model/table.config";
import {SafeHtmlPipe} from "./component/safe-html.pipe";
import {SimpleNgFor} from "./component/simple-ngfor.directive";
import {OurpalmTableRowViewComponent} from "./component/ourpalm-table-rowview.component";
import {GwContextMenuModule} from "glowworm/lib/context-menu";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragulaModule,
        GwContextMenuModule.forRoot()
    ],
    declarations: [
        OurpalmTableComponent,
        OurpalmTableDynamicColumnComponent,
        OurpalmTableStaticColumnComponent,
        OurpalmTableHeaderComponent,
        OurpalmTableSettingsComponent,
        OurpalmTableRowComponent,
        DynamicEventDirective,
        OurpalmTablePagingComponent,
        OurpalmTableColumnTemplateRenderer,
        ColumnSettingsLeftFilter,
        ColumnSettingsRightFilter,
        SafeHtmlPipe,
        SimpleNgFor,
        OurpalmTableRowViewComponent
    ],
    exports: [
        OurpalmTableComponent,
        OurpalmTableStaticColumnComponent,
        SafeHtmlPipe,
        SimpleNgFor,
        OurpalmTableRowViewComponent
    ]
})
export class OurpalmTableModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: OurpalmTableModule,
            providers: [TableConfig]
        };
    }

}
