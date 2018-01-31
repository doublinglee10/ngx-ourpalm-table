import {OurpalmTableColumn} from "./ourpalm-table-column";
import {TemplateRef} from "@angular/core";
import {ContextMenu} from "glowworm";
import {OurpalmTableRow} from "./ourpalm-table-row";

export interface Page {
    currentPage?: number;
    pageSize?: number;
    total: number;
    rows: any[];
}

export type RowViewShowType = 'rowView' | 'column' | 'both' ;

export interface RowView {
    renderRow(rowIndex: number, rowData: any): string;
}

/**
 * 表属性
 */
export class OurpalmTable {
    /** 用户配置的原始的列信息 */
    originalColumns?: OurpalmTableColumn[] = [];

    /** 表格的class */
    tableClass: string = 'table table-bordered table-striped table-hover text-center';
    /** check all rows */
    checkAllRows: boolean;
    /** 初始化table的时候是否自动加载数据 */
    autoLoadData?: boolean = true;
    /** 表格列属性 */
    private _columns?: OurpalmTableColumn[] = [];
    /** 是否显示分页控件 */
    pagination?: boolean = true;
    /** 是否限制只能选中一行 */
    singleSelect?: boolean = false;
    /** 是否要服务器排序 */
    serverSort?: boolean = true;
    /** 是否允许多列排序 */
    multiSort?: boolean = true;
    /** 在设置分页属性的时候 初始化页面大小选择列表 */
    pageList?: number[] = [10, 20, 30, 40, 50];
    /** 在设置分页属性的时候是否允许用户跳转页面 */
    skipPage?: boolean = true;
    /** 客户端存储table信息是对应存放在localStorage中的key */
    private _cacheKey?: string = '';
    /** 是否在客户端存储table的页大小,刷新的时候页大小不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-pageSize */
    private _cachePageSize?: boolean = false;
    /** 是否在客户端存在table的列隐藏信息,刷新的时候列的隐藏信息不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-columns */
    private _cacheColumns?: boolean = false;
    /** 分页条在那里显示可取值 'bottom', 'top', 'both' */
    pagePosition?: 'bottom' | 'top' | 'both' = 'bottom';
    /** 是否显示刷新按钮*/
    showRefreshBtn?: boolean = true;
    /** 是否显示设置按钮*/
    showSettingBtn?: boolean = true;
    /** 勾选时选中 */
    checkOnSelect?: boolean = true;
    /** 选中时勾选 */
    selectOnCheck?: boolean = true;
    /** 按住ctrl时为多选 */
    ctrlSelect?: boolean = false;
    /** 行上下文菜单 */
    rowMenus: ContextMenu[];
    /** 自定义行渲染*/
    rowView?: RowView;
    /** 自定义行渲染模板*/
    rowViewTemplate?: TemplateRef<any>;
    /** 自定义行渲染模式 */
    rowViewShowType: RowViewShowType = 'column';

    /** 加载数据成功回调 */
    loadData: (table: OurpalmTable, callback: (page: Page) => void) => {} = () => {
        return null;
    };
    /** 用户点击一行的时候触发 */
    onClickRow: (rowIndex: number, rowData: any) => {};
    /** 用户双击一行的时候触发 */
    onDbClickRow: (rowIndex: number, rowData: any) => {};
    /** 用户点击单元格的时候触发 */
    onClickCell: (rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn) => {};
    /** 用户双击单元格的时候触发 */
    onDbClickCell: (rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn) => {};
    /** 用户选择头部checkbox时触发 */
    onHeaderCheckBoxChange: () => void;
    /** 用户选择列表行checkbox时触发 */
    onRowCheckBoxChange: (rowData, rowIndex) => void;
    /** ngFor trackBy row */
    trackByFun: (rowIndex, rowData) => string = (rowIndex, rowData) => rowIndex;

    /** 是否打开自定义列表项 */
    openSettings: boolean = false;

    /** 分页信息 */
    total: number = 0; //总共记录数
    _rows: any[] = []; //当前页数据
    _currentPage: number = 1; //当前第几页
    _pageSize: number = 10; //当前页大小
    /** 表格数据 */
    tableRows: OurpalmTableRow[] = [];

    constructor(table?: OurpalmTable | any) {
        Object.assign(this, table);
    }

    get cacheKey() {
        return this._cacheKey;
    }

    set cacheKey(cacheKey: string) {
        this._cacheKey = cacheKey;
        this._reloadCachePageSize();
        this._reloadCacheColumns();
    }

    get cachePageSize() {
        return this._cachePageSize;
    }

    set cachePageSize(cachePageSize: boolean) {
        this._cachePageSize = cachePageSize;
        this._reloadCachePageSize();
    }

    get cacheColumns() {
        return this._cacheColumns;
    }

    set cacheColumns(cacheColumns: boolean) {
        this._cacheColumns = cacheColumns;
        this._reloadCacheColumns();
    }

    get columns() {
        return this._columns;
    }

    set columns(columns: OurpalmTableColumn[]) {
        this.originalColumns = columns.map(column => new OurpalmTableColumn(column));
        this._columns = columns.map(column => Object.assign(column, new OurpalmTableColumn(column)));
        this._reloadCacheColumns();
    }

    private _reloadCachePageSize() {
        if (this.cacheKey && this.cachePageSize && window.localStorage) {
            let pageSize = window.localStorage.getItem(`ngx-ourpalm-table-${this.cacheKey}-pagesize`);
            if (pageSize && Number(pageSize) != this.pageSize) {
                this.pageSize = Number(pageSize);
            }
        }
    }

    private _reloadCacheColumns() {
        if (this.cacheKey && this.cacheColumns && window.localStorage) {
            let cache = window.localStorage.getItem(`ngx-ourpalm-table-${this.cacheKey}-columns`);
            if (cache) {
                let cachedColumns: any[] = JSON.parse(cache);
                let tmpColumns = [];
                cachedColumns.forEach(((cachedColumn: OurpalmTableColumn) => {
                    this.columns.forEach((tableColumn: OurpalmTableColumn) => {
                        if (cachedColumn.field == tableColumn.field) {
                            tmpColumns.push(Object.assign(tableColumn, cachedColumn));
                        }
                    });
                }));
                this._columns = tmpColumns;
            }
        }
    }

    onLoadSuccess(_page: Page) {
        Promise.resolve().then(() => {
            let page: Page = {
                currentPage: _page.currentPage,
                pageSize: _page.pageSize,
                total: _page.total,
                rows: [...(_page.rows || [])]
            };

            this.pageSize = page.pageSize || this.pageSize;
            this.total = page.total;
            this.rows = page.rows;
            this.currentPage = page.currentPage || this.currentPage;
        });
    }

    get rows() {
        return this._rows;
    }

    set rows(rows: any[]) {
        rows = rows || [];
        this._rows = rows;

        let getPreTableRow = (row) => {
            let rows = this.tableRows.filter(tableRow => tableRow.data === row);
            return rows.length > 0 ? rows[0] : null;
        };

        let __rows: OurpalmTableRow[] = rows.map((row: any, index: number) => {
            let tableRow = getPreTableRow(row);
            if (tableRow) {
                tableRow.index = index;
            }
            return tableRow || {
                    index: index,
                    selected: false,
                    checked: false,
                    data: row
                };
        });
        this.tableRows = __rows;
    }

    get currentPage() {
        return this._currentPage;
    }

    set currentPage(currentPage: number) {
        if (this._currentPage != currentPage) {
            this._currentPage = currentPage;
        }
    }

    get pageSize() {
        return this._pageSize;
    }

    set pageSize(pageSize: number) {
        if (this._pageSize != pageSize) {
            this._pageSize = pageSize;
        }
    }

    /**
     * 总共多少页
     */
    get allPage(): number {
        return Math.max(Math.ceil(this.total / this.pageSize), 0);
    }

    /**
     * 开始位置
     */
    get start(): number {
        if (this.allPage > 0)
            return (this.currentPage - 1) * this.pageSize + 1;
        return 0;
    }

    /**
     * 结束位置
     */
    get end(): number {
        if (this.allPage > 0)
            return this.start + this.rows.length - 1;
        return 0;
    }

    /**
     * @deprecated
     * 获取表格的实时信息
     */
    getOptions() {
        return {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            pagination: this.pagination,
            singleSelect: this.singleSelect,
            serverSort: this.serverSort,
            pageList: [].concat(this.pageList),
            skipPage: this.skipPage,
            cacheKey: this.cacheKey,
            cachePageSize: this.cachePageSize,
            cacheColumns: this.cacheColumns,
            pagePosition: this.pagePosition,
        }
    }

    /*获取显示的列信息*/
    getDisplayedColumns() {
        let columns = [];
        this.columns.forEach((column: OurpalmTableColumn) => {
            column.show && columns.push(Object.assign({}, column));
        });
        return columns;
    }

    /*获取显示的行信息,用于前端分页*/
    getDisplayedRows() {
        return this.rows.map(row => Object.assign({}, row));
    }

    /*获取选中的行信息*/
    getSelectedRows() {
        return this.tableRows.filter((row) => row.selected).map((row) => Object.assign({}, row.data));
    }

    /*获取勾选中的行信息*/
    getCheckedRows() {
        return this.tableRows.filter((row) => row.checked).map((row) => Object.assign({}, row.data));
    }

    /*获取排序的列信息*/
    getSortColumns() {
        return this.columns.filter(column => column.sort).map(col => Object.assign({}, col));
    }

    /**
     * 修改列定义,支持动态列,不会触发重新加载数据
     * @param columns 要修改的列定义
     * @param localStorageType 是从localStorage中恢复列定义，还是将列定义放到localStorage中
     */
    changeColumns(columns: OurpalmTableColumn[]) {
        this.columns = columns;
    }

    changePageSize(pageSize: number) {
        this.pageSize = pageSize;
        this._currentPage = 1;
        this.invokeLoadData();
    }

    /*跳转到第一页，触发重新加载数据*/
    firstPage() {
        this.currentPage = 1;
        this.invokeLoadData();
    }

    /*跳转到上一页，触发重新加载数据*/
    prePage() {
        this.currentPage--;
        this.invokeLoadData();
    }

    /*跳转到下一页，触发重新加载数据*/
    nextPage() {
        this.currentPage++;
        this.invokeLoadData();
    }

    /*跳转到末一页，触发重新加载数据*/
    lastPage() {
        this.currentPage = this.allPage;
        this.invokeLoadData();
    }

    /*刷新当前页，触发重新加载数据*/
    refresh() {
        this.invokeLoadData();
    }

    /*跳转到N页，触发重新加载数据*/
    gotoSkipPage(page: number) {
        this.currentPage = page;
        this.invokeLoadData();
    }

    /*加载完成时，可通过该方法设置PageData*/
    setPageData(page: Page) {
        this.onLoadSuccess(page);
    }

    /*重新配置table属性，触发重新加载数据*/
    setOptions(table: OurpalmTable | any) {
        Object.assign(this, table);
        if (this.autoLoadData) {
            this.invokeLoadData();
        }
    }

    /*勾选当前页中的所有行*/
    checkAll() {
        this.tableRows = this.tableRows.map((row: OurpalmTableRow) => {
            return Object.assign({}, row, {checked: true});
        });
    }

    /*取消勾选当前页中的所有行*/
    uncheckAll() {
        this.tableRows = this.tableRows.map((row: OurpalmTableRow) => {
            return Object.assign({}, row, {checked: false});
        });
    }

    /*勾选一行，行索引从0开始，传入行索引*/
    checkRow(index: number) {
        this.tableRows = this.tableRows.map((row: OurpalmTableRow, _index: number) => {
            if (index === _index) {
                if (this.checkOnSelect) {
                    return Object.assign({}, row, {checked: true, selected: true});
                } else {
                    return Object.assign({}, row, {checked: true});
                }
            }
            return row;
        });
    }

    /*取消勾选一行，行索引从0开始，传入行索*/
    uncheckRow(index: number) {
        this.tableRows = this.tableRows.map((row: OurpalmTableRow, _index: number) => {
            if (index === _index) {
                if (this.checkOnSelect) {
                    return Object.assign({}, row, {checked: false, selected: false});
                } else {
                    return Object.assign({}, row, {checked: false});
                }
            }
            return row;
        });
    }

    openSetting() {
        this.openSettings = true;
    }

    invokeLoadData() {
        this.loadData(this, this.onLoadSuccess.bind(this));
    }
}
