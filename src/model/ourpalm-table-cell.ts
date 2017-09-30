import {OurpalmTableColumn} from "./ourpalm-table-column";
import {OurpalmTableRow} from "./ourpalm-table-row";

/**
 * 单元格属性
 */
export class OurpalmTableCell {
    /** 当前单元格索引 */
    index: number;
    /** 当前行定义 */
    row: OurpalmTableRow;
    /** 当前列定义 */
    column: OurpalmTableColumn;
}