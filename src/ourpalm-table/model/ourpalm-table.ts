import {OurpalmTableColumn} from "./ourpalm-table-column";

export interface Page {
    total: number;
    rows: any[];
}

/**
 * 表属性
 */
export class OurpalmTable {
    /** 表格列属性 */
    columns?: OurpalmTableColumn[];
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

    loadData: Function;
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
        // this = table;
        let table = Object.assign({}, {
            columns: [],
            pagination: true,
            singleSelect: false,
            serverSort: true,
            pageList: [10, 20, 30, 40, 50],
            defaultPageSize: 10,
            skipPage: true,
            cacheKey: '',
            cachePageSize: false,
            cacheColumns: false,
            pagePosition: 'bottom',
            loadData: (table: OurpalmTable, callback) => {
            }
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
    }

    onLoadSuccess(page: Page) {
        console.info(this);
        this.total = page.total;
        this.rows = page.rows;
        this.allPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : (Math.floor(this.total / this.pageSize) + 1);
        this.start = (this.currentPage - 1) * this.pageSize + 1;
        this.end = this.start + this.rows.length;
        this.__tmpCurrentPage = this.currentPage;
    }

    //获取显示的列信息
    getDisplayedColumns() {

    }

    //获取显示的行信息
    getDisplayedRows() {

    }

    //获取选中的行信息
    getSelectedRows() {

    }

    //获取排序的列信息
    getSortColumns() {

    }

    //获取表格的实时信息
    getOptions() {

    }

    firstPage() {
        this.currentPage = 1;
        this.invokeLoadData();
    }

    prePage() {
        this.currentPage--;
        this.invokeLoadData();
    }

    nextPage() {
        this.currentPage++;
        this.invokeLoadData();
    }

    lastPage() {
        this.currentPage = this.allPage;
        this.invokeLoadData();
    }

    refresh() {
        this.invokeLoadData();
    }

    changePageSize(pageSize: number) {
        this.currentPage = 1;
        this.pageSize = pageSize;
        this.invokeLoadData();
    }

    gotoSkipPage(page: number) {
        this.currentPage = page;
        this.invokeLoadData();
    }

    invokeLoadData() {
        this.loadData(this, this.onLoadSuccess.bind(this));
    }
}