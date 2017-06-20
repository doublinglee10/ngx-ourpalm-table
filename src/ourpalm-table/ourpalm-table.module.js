"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ourpalm_table_component_1 = require("./component/ourpalm-table.component");
var ourpalm_table_header_component_1 = require("./component/ourpalm-table-header.component");
var forms_1 = require("@angular/forms");
var ourpalm_table_paging_component_1 = require("./component/ourpalm-table-paging.component");
var ourpalm_table_dynamic_column_component_1 = require("./component/ourpalm-table-dynamic-column.component");
var ourpalm_table_static_column_component_1 = require("./component/ourpalm-table-static-column.component");
var ourpalm_table_settings_component_1 = require("./component/ourpalm-table-settings.component");
var ng2_dnd_1 = require("ng2-dnd");
var OurpalmTableModule = (function () {
    function OurpalmTableModule() {
    }
    return OurpalmTableModule;
}());
OurpalmTableModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            ng2_dnd_1.DndModule.forRoot()
        ],
        declarations: [
            ourpalm_table_component_1.OurpalmTableComponent,
            ourpalm_table_dynamic_column_component_1.OurpalmTableDynamicColumnComponent,
            ourpalm_table_static_column_component_1.OurpalmTableStaticColumnComponent,
            ourpalm_table_header_component_1.OurpalmTableHeaderComponent,
            ourpalm_table_settings_component_1.OurpalmTableSettingsComponent,
            ourpalm_table_paging_component_1.OurpalmTablePagingComponent,
            ourpalm_table_static_column_component_1.OurpalmTableColumnTemplateRenderer,
            ourpalm_table_settings_component_1.ColumnSettingsLeftFilter,
            ourpalm_table_settings_component_1.ColumnSettingsRightFilter
        ],
        exports: [
            ourpalm_table_component_1.OurpalmTableComponent,
            ourpalm_table_static_column_component_1.OurpalmTableStaticColumnComponent
        ],
        providers: []
    })
], OurpalmTableModule);
exports.OurpalmTableModule = OurpalmTableModule;
