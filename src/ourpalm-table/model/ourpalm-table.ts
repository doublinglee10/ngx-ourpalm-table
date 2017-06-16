import {OurpalmTableColumn} from "./ourpalm-table-column";

export interface Page {
    currentPage?: number;
    pageSize?: number;
    total: number;
    rows: any[];
}

/**
 * 表属性
 */
export class OurpalmTable {
    /** 表格列属性 */
    columns?: OurpalmTableColumn[] = [];
    /** 是否显示分页控件 */
    pagination?: boolean = true;
    /** 是否限制只能选中一行 */
    singleSelect?: boolean = false;
    /** 是否要服务器排序 */
    serverSort?: boolean = true;
    /** 在设置分页属性的时候 初始化页面大小选择列表 */
    pageList?: number[] = [10, 20, 30, 40, 50];
    /** 在设置分页属性的时候初始化页面大小 */
    defaultPageSize?: number = 10;
    /** 在设置分页属性的时候是否允许用户跳转页面 */
    skipPage?: boolean = true;
    /** 客户端存储table信息是对应存放在localStorage中的key */
    cacheKey?: string = '';
    /** 是否在客户端存储table的页大小,刷新的时候页大小不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-pageSize */
    cachePageSize?: boolean = false;
    /** 是否在客户端存在table的列隐藏信息,刷新的时候列的隐藏信息不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-columns */
    cacheColumns?: boolean = false;
    /** 分页条在那里显示可取值 'bottom', 'top', 'both' */
    pagePosition?: string = 'bottom';

    /** 加载数据成功回调 */
    loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {};
    /** 用户点击一行的时候触发 */
    onClickRow: (rowIndex: number, rowData: any) => {};
    /** 用户双击一行的时候触发 */
    onDbClickRow: (rowIndex: number, rowData: any) => {};
    /** 用户点击单元格的时候触发 */
    onClickCell: (rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn) => {};
    /** 用户双击单元格的时候触发 */
    onDbClickCell: (rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn) => {};

    /** 是否打开自定义列表项 */
    openSettings: boolean = false;

    /** 分页信息 */
    start: number = 0; //开始位置
    end: number = 0; //结束位置
    total: number = 0; //总共记录数
    rows: any[] = []; //当前页数据
    currentPage: number = 1; //当前第几页
    pageSize: number = 10; //当前页大小
    allPage: number = 0; //总共多少页

    __tmpCurrentPage: number;

    constructor(optable: Object | OurpalmTable) {
        this.changeOptions(optable);
    }

    onLoadSuccess(page: Page) {
        this.pageSize = page.pageSize || this.pageSize;
        this.defaultPageSize = this.pageSize;
        this.currentPage = page.currentPage || this.currentPage;
        this.total = page.total;
        this.rows = page.rows;
        this.allPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : (Math.floor(this.total / this.pageSize) + 1);
        this.start = (this.currentPage - 1) * this.pageSize + 1;
        this.end = this.start + this.rows.length;
        this.__tmpCurrentPage = this.currentPage;
    }

    /*获取显示的列信息*/
    getDisplayedColumns() {
        let columns = [];
        this.columns.forEach((column: OurpalmTableColumn) => {
            if (column.show) {
                columns.push(Object.assign({},));
            }
        });
        return columns;
    }

    /*获取显示的行信息*/
    getDisplayedRows() {
        return this.rows.map(row => Object.assign({}, row));
    }

    /*获取选中的行信息*/
    getSelectedRows() {
        return this.rows.filter(row => row.__checked__).map(row => Object.assign({}, row));
    }

    /*获取排序的列信息*/
    getSortColumns() {

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
            defaultPageSize: this.defaultPageSize,
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
    setOptions(optable: Object | OurpalmTable) {
        this.changeOptions(optable);
        this.invokeLoadData();
    }

    private changeOptions(optable: Object | OurpalmTable) {
        let table = Object.assign({}, {
            columns: this.columns,
            pagination: this.pagination,
            singleSelect: this.singleSelect,
            serverSort: this.serverSort,
            pageList: this.pageList,
            defaultPageSize: this.defaultPageSize,
            skipPage: this.skipPage,
            cacheKey: this.cacheKey,
            cachePageSize: this.cachePageSize,
            cacheColumns: this.cacheColumns,
            pagePosition: this.pagePosition,
            loadData: this.loadData,
            onClickRow: this.onClickRow,
            onDbClickRow: this.onDbClickRow,
            onClickCell: this.onClickCell,
            onDbClickCell: this.onDbClickCell,
            currentPage: this.currentPage
        }, optable);

        this.columns = table.columns.map(column => new OurpalmTableColumn(column));
        this.pagination = table.pagination;
        this.singleSelect = table.singleSelect;
        this.serverSort = table.serverSort;
        this.pageList = table.pageList;
        this.pageSize = table.defaultPageSize;
        this.defaultPageSize = table.defaultPageSize;
        this.skipPage = table.skipPage;
        this.cacheKey = table.cacheKey;
        this.cachePageSize = table.cachePageSize;
        this.cacheColumns = table.cacheColumns;
        this.pagePosition = table.pagePosition;
        this.loadData = table.loadData;
        this.onClickRow = table.onClickRow;
        this.onDbClickRow = table.onDbClickRow;
        this.onClickCell = table.onClickCell;
        this.onDbClickCell = table.onDbClickCell;
        this.currentPage = table.currentPage;
    }

    invokeLoadData() {
        console.info(this.loadData);
        this.loadData(this, this.onLoadSuccess.bind(this));
    }
}