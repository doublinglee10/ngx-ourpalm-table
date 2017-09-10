import { uuid } from "./uuid";
var OurpalmTableColumn = (function () {
    function OurpalmTableColumn(optcolumn) {
        this.header = '';
        this.field = '';
        this.sort = false;
        this.sortOrder = null;
        this.rownumbers = false;
        this.show = true;
        this.checkbox = false;
        this.disabledContextMenu = false;
        this.formatter = function (value, row) { return value; };
        this.sorter = function (column, row1, row2) {
            return row1[column.field] - row2[column.field];
        };
        this.__uuid__ = uuid();
        Object.assign(this, optcolumn);
    }
    return OurpalmTableColumn;
}());
export { OurpalmTableColumn };
//# sourceMappingURL=ourpalm-table-column.js.map