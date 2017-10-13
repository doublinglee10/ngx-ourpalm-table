import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DragulaModule} from "ng2-dragula";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {GwContextMenuModule} from "glowworm/lib/context-menu";
import {TableConfig} from "./model/table.config";
import {OurpalmTableComponent} from "./component/ourpalm-table.component";
import {OurpalmTableBodyComponent} from "./component/body/ourpalm-table-body.component";
import {OurpalmTableBodyCellComponent} from "./component/body/ourpalm-table-body-cell.component";
import {OurpalmTableBodyRowViewComponent} from "./component/body/ourpalm-table-body-rowview.component";
import {OurpalmTableHeaderComponent} from "./component/header/ourpalm-table-header.component";
import {OurpalmTableHeaderCellComponent} from "./component/header/ourpalm-table-header-cell.component";
import {OurpalmTableColumnComponent} from "./component/body/ourpalm-table-column.component";
import {OurpalmTableRowViewComponent} from "./component/body/ourpalm-table-rowview.component";
import {OurpalmTablePagingComponent} from "./component/footer/ourpalm-table-footer-paging.component";
import {OurpalmTableContainerComponent} from "./component/ourpalm-table-container.component";
import {
    ColumnSettingsLeftFilter,
    ColumnSettingsRightFilter,
    OurpalmTableSettingComponent
} from "./component/footer/ourpalm-table-footer-setting.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragulaModule,
        GwContextMenuModule.forRoot()
    ],
    declarations: [
        OurpalmTableBodyComponent,
        OurpalmTableBodyCellComponent,
        OurpalmTableBodyRowViewComponent,
        OurpalmTableColumnComponent,
        OurpalmTableRowViewComponent,
        OurpalmTableHeaderComponent,
        OurpalmTablePagingComponent,
        OurpalmTableHeaderCellComponent,
        OurpalmTableComponent,
        OurpalmTableContainerComponent,
        OurpalmTableSettingComponent,
        ColumnSettingsLeftFilter,
        ColumnSettingsRightFilter
    ],
    exports: [
        OurpalmTableComponent,
        OurpalmTableColumnComponent,
        OurpalmTableRowViewComponent,
        OurpalmTableContainerComponent,
        ColumnSettingsLeftFilter,
        ColumnSettingsRightFilter
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
