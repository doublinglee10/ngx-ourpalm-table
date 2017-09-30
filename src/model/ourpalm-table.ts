import {OurpalmTableColumn} from "./ourpalm-table-column";
import {OurpalmTableComponent} from "../component/ourpalm-table.component";
import {TemplateRef} from "@angular/core";
import {ContextMenu} from "glowworm/lib/context-menu";

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
    __columns?: OurpalmTableColumn[] = [];

    /** 表格的class */
    tableClass: string = 'table table-bordered table-striped table-hover text-center';
    /** 初始化table的时候是否自动加载数据 */
    autoLoadData?: boolean = true;
    /** 表格列属性 */
    columns?: OurpalmTableColumn[] = [];
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
    cacheKey?: string = '';
    /** 是否在客户端存储table的页大小,刷新的时候页大小不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-pageSize */
    cachePageSize?: boolean = false;
    /** 是否在客户端存在table的列隐藏信息,刷新的时候列的隐藏信息不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-columns */
    cacheColumns?: boolean = false;
    /** 分页条在那里显示可取值 'bottom', 'top', 'both' */
    pagePosition?: 'bottom' | 'top' | 'both' = 'bottom';
    /** 是否显示刷新按钮*/
    showRefreshBtn?: boolean = true;
    /** 是否显示设置按钮*/
    showSettingBtn?: boolean = true;
    /** 是否固定到顶部,依赖jquery*/
    enabledFloatThead?: boolean = false;
    /** 固定到顶部的距离,单位像素*/
    floatTheadConfig?: any = {
        zIndex: 10,
        responsiveContainer: function ($table) {
            return $table.closest('.table-responsive');
        }
    };
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
    rowViewShowType: RowViewShowType = 'rowView';

    /** 加载数据成功回调 */
    loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {} = () => {
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
    rows: any[] = []; //当前页数据
    currentPage: number = 1; //当前第几页
    pageSize: number = 10; //当前页大小

    tmpCurrentPage?: number = 0;

    private tableComponent?: OurpalmTableComponent;

    constructor(table?: OurpalmTable | any) {
        Object.assign(this, table);
        if (table && table.columns) {
            this.__columns = this.columns.map(column => new OurpalmTableColumn(column));
            this.columns = this.columns.map((column) => new OurpalmTableColumn(column));
        }
        if (table && table.rowMenus) {
            this.rowMenus = this._deepCloneMenus(this.rowMenus);
        }
        if (table && table.floatTheadConfig) {
            Object.assign(this.floatTheadConfig, table.floatTheadConfig);
        }

        if (this.columns && this.columns.length > 0) {
            //如果不是静态列，就触发。因为静态列这会还没有设置上，设置静态列的时候也会触发 reloadCacheColumns
            this.reloadCacheColumns();
        }

        this.reloadCachePageSize();
        this.reflowTable();
    }

    reflowTable() {
        // this.tableComponent && this.tableComponent.reflowTable(); TODO
    }

    onLoadSuccess(_page: Page) {
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
        this.tmpCurrentPage = this.allPage > 0 ? (page.currentPage || this.currentPage) : 0;
        this.reflowTable();
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

    /*获取显示的列信息*/
    getDisplayedColumns() {
        let columns = [];
        this.columns.forEach((column: OurpalmTableColumn) => {
            column.show && columns.push(Object.assign({}, column));
        });
        return columns;
    }

    /*获取显示的行信息*/
    getDisplayedRows() {
        return this.rows.map(row => Object.assign({}, row));
    }

    /*获取选中的行信息*/
    getSelectedRows() {
        return this.rows.filter(row => row.__selected__).map(row => Object.assign({}, row));
    }

    /*获取勾选中的行信息*/
    getCheckedRows() {
        return this.rows.filter(row => row.__checked__).map(row => Object.assign({}, row));
    }

    /*获取排序的列信息*/
    getSortColumns() {
        return this.columns.filter(column => column.sort).map(col => Object.assign({}, col));
    }

    /*获取表格的实时信息*/
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

    /*修改列定义,支持动态列,不会触发重新加载数据*/
    changeColumns(columns: OurpalmTableColumn[]) {
        this.columns = columns.map(column => new OurpalmTableColumn(column));
        this.__columns = columns.map(column => new OurpalmTableColumn(column));
        // this.reflowTable();

        this.reloadCacheColumns();
        this.reloadCachePageSize();
        this.reflowTable();
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

    /*修改页大小，触发重新加载数据*/
    changePageSize(pageSize: number) {
        this.currentPage = 1;
        this.pageSize = pageSize;
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
        if (table && table.columns) {
            this.__columns = this.columns.map(column => new OurpalmTableColumn(column));
            this.columns = this.columns.map((column) => new OurpalmTableColumn(column));
        }
        if (table && table.rowMenus) {
            this.rowMenus = this._deepCloneMenus(this.rowMenus);
        }
        if (table && table.floatTheadConfig) {
            Object.assign(this.floatTheadConfig, table.floatTheadConfig);
        }

        if (this.autoLoadData) {
            this.invokeLoadData();
        }

        this.reloadCacheColumns();
        this.reloadCachePageSize();
        this.reflowTable();
    }

    /*勾选当前页中的所有行*/
    checkAll() {
        this.rows.forEach((row: any) => {
            row.__checked__ = true;
        });
    }

    /*取消勾选当前页中的所有行*/
    uncheckAll() {
        this.rows.forEach((row: any) => {
            row.__checked__ = false;
        });
    }

    /*勾选一行，行索引从0开始，传入行索引*/
    checkRow(index: number) {
        let row = this.rows[index];
        if (row) {
            row.__checked__ = true;
        }
    }

    /*取消勾选一行，行索引从0开始，传入行索*/
    uncheckRow(index: number) {
        let row = this.rows[index];
        if (row) {
            row.__checked__ = false;
        }
    }

    openSetting() {
        this.openSettings = true;
    }

    invokeLoadData() {
        this.loadData(this, this.onLoadSuccess.bind(this));
    }

    setTableComponent(tableComponent: OurpalmTableComponent) {
        this.tableComponent = tableComponent;
    }

    reloadCacheColumns() {
        if (this.cacheKey && this.cacheColumns && window.localStorage) {
            let cache = window.localStorage.getItem(`ngx-ourpalm-table-${this.cacheKey}-columns`);
            if (cache) {
                let columnArr: Array<any> = JSON.parse(cache);
                if (columnArr.length == this.columns.length) {
                    let tmpColumns = [];
                    columnArr.forEach((col1 => {
                        this.columns.forEach(col2 => {
                            if (col1.field == col2.field) {
                                tmpColumns.push(Object.assign(col2, col1));
                            }
                        });
                    }));
                    this.columns.splice(0);
                    tmpColumns.forEach(col => {
                        this.columns.push(col);
                    });
                } else {
                    window.localStorage.removeItem(`ngx-ourpalm-table-${this.cacheKey}-columns`);
                }
            }
        }
    }

    reloadCachePageSize() {
        if (this.cacheKey && this.cachePageSize && window.localStorage) {
            let pageSize = window.localStorage.getItem(`ngx-ourpalm-table-${this.cacheKey}-pagesize`);
            if (pageSize) {
                this.pageSize = +pageSize;
            }
        }
    }

    private _deepCloneMenus(menus: ContextMenu[]): ContextMenu[] {
        if (!menus) return;

        function deepCloneMenu(menu: ContextMenu): ContextMenu {
            if (menu.submenus) {
                menu.submenus = menu.submenus.map((submenu) => deepCloneMenu(submenu));
            }
            return new ContextMenu(menu);
        }

        return menus.map(menu => deepCloneMenu(menu));
    }
}
