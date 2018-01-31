import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {TableConfig} from "./model/table.config";
import {OurpalmTableBodyComponent} from "./component/body/ourpalm-table-body.component";
import {OurpalmTableBodyCellComponent} from "./component/body/ourpalm-table-body-cell.component";
import {OurpalmTableBodyRowViewComponent} from "./component/body/ourpalm-table-body-rowview.component";
import {OurpalmTableHeaderComponent} from "./component/header/ourpalm-table-header.component";
import {OurpalmTableHeaderCellComponent} from "./component/header/ourpalm-table-header-cell.component";
import {OurpalmTableColumnComponent} from "./component/body/ourpalm-table-column.component";
import {OurpalmTableRowViewComponent} from "./component/body/ourpalm-table-rowview.component";
import {OurpalmTablePagingComponent} from "./component/footer/ourpalm-table-footer-paging.component";
import {OurpalmTableComponent} from "./component/ourpalm-table.component";
import {
    ColumnSettingsLeftFilter,
    ColumnSettingsRightFilter,
    OurpalmTableSettingComponent
} from "./component/footer/ourpalm-table-footer-setting.component";
import {OurpalmTableWrapperComponent} from "./component/ourpalm-table-wrapper.component";
import {SafeHtmlPipe} from "./utils/safe-html.pipe";
import {OurpalmTableBodyCheckboxCellComponent} from "./component/body/ourpalm-table-body-checkboxcell.component";
import {OurpalmTableHeaderCheckboxCellComponent} from "./component/header/ourpalm-table-header-checkboxcell.component";
import {GwContextMenuModule} from "glowworm";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // DragulaModule,
        GwContextMenuModule.forRoot()
    ],
    declarations: [
        OurpalmTableBodyComponent,
        OurpalmTableBodyCellComponent,
        OurpalmTableBodyCheckboxCellComponent,
        OurpalmTableBodyRowViewComponent,
        OurpalmTableColumnComponent,
        OurpalmTableRowViewComponent,
        OurpalmTableHeaderComponent,
        OurpalmTablePagingComponent,
        OurpalmTableHeaderCellComponent,
        OurpalmTableHeaderCheckboxCellComponent,
        OurpalmTableWrapperComponent,
        OurpalmTableComponent,
        OurpalmTableSettingComponent,
        ColumnSettingsLeftFilter,
        ColumnSettingsRightFilter,
        SafeHtmlPipe
    ],
    exports: [
        OurpalmTableWrapperComponent,
        OurpalmTableColumnComponent,
        OurpalmTableRowViewComponent,
        OurpalmTableComponent,
        ColumnSettingsLeftFilter,
        ColumnSettingsRightFilter,
        SafeHtmlPipe
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
