import { OurpalmTableColumn } from "./ourpalm-table-column";
export interface Page {
    total: number;
    rows: any[];
}
/**
 * 表属性
 */
export declare class OurpalmTable {
    /** 表格列属性 */
    columns?: OurpalmTableColumn[];
    /** 是否显示分页控件 */
    pagination?: boolean;
    /** 是否限制只能选中一行 */
    singleSelect?: boolean;
    /** 是否要服务器排序 */
    serverSort?: boolean;
    /** 在设置分页属性的时候 初始化页面大小选择列表 */
    pageList?: number[];
    /** 在设置分页属性的时候初始化页面大小 */
    defaultPageSize?: number;
    /** 在设置分页属性的时候是否允许用户跳转页面 */
    skipPage?: boolean;
    /** 客户端存储table信息是对应存放在localStorage中的key */
    cacheKey?: string;
    /** 是否在客户端存储table的页大小,刷新的时候页大小不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-pageSize */
    cachePageSize?: boolean;
    /** 是否在客户端存在table的列隐藏信息,刷新的时候列的隐藏信息不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-columns */
    cacheColumns?: boolean;
    /** 分页条在那里显示可取值 'bottom', 'top', 'both' */
    pagePosition?: string;
    /** 加载数据成功回调 */
    loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {};
    /** 是否打开自定义列表项 */
    openSettings: boolean;
    /** 分页信息 */
    start: number;
    end: number;
    total: number;
    rows: any[];
    currentPage: number;
    pageSize: number;
    allPage: number;
    __tmpCurrentPage: number;
    constructor(optable: Object | OurpalmTable);
    onLoadSuccess(page: Page): void;
    getDisplayedColumns(): any[];
    getDisplayedRows(): any[];
    getSelectedRows(): any[];
    getSortColumns(): void;
    getOptions(): {
        currentPage: number;
        pageSize: number;
        pagination: boolean;
        singleSelect: boolean;
        serverSort: boolean;
        pageList: any[];
        defaultPageSize: number;
        skipPage: boolean;
        cacheKey: string;
        cachePageSize: boolean;
        cacheColumns: boolean;
        pagePosition: string;
    };
    changeColumns(columns: OurpalmTableColumn[]): void;
    firstPage(): void;
    prePage(): void;
    nextPage(): void;
    lastPage(): void;
    refresh(): void;
    changePageSize(pageSize: number): void;
    gotoSkipPage(page: number): void;
    invokeLoadData(): void;
}
