/**
 * 表行属性
 */
export interface OurpalmTableRow {
    /** 当前行索引 */
    index: number;
    /** 是否选中当前行 */
    selected: boolean;
    /** 是否勾选当前行 */
    checked: boolean;
    /** 当前行数据 */
    data: any;
}