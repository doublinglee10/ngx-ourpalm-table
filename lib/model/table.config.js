import { Injectable } from "@angular/core";
import { OurpalmTable } from "./ourpalm-table";
var TableConfig = (function () {
    function TableConfig() {
    }
    TableConfig.prototype.create = function (table) {
        return new OurpalmTable(Object.assign({}, this.config, table));
    };
    return TableConfig;
}());
export { TableConfig };
TableConfig.decorators = [
    { type: Injectable },
];
TableConfig.ctorParameters = function () { return []; };
//# sourceMappingURL=table.config.js.map