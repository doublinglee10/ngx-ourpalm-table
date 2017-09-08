export type BooleanResolver = () => boolean;
export type BooleanOrResolver = boolean | BooleanResolver;

/**
 * 右键弹出菜单配置
 */
export class RowContextMenu {
    /** 菜单名字 */
    text: string;
    /** 菜单icon */
    iconCls?: string;
    /** 分割线 */
    separator?: boolean = false;
    /** 是否显示 */
    show?: BooleanOrResolver = true;
    /** 点击事件 */
    onclick?: any;
    /** 子菜单 */
    submenus?: RowContextMenu[];

    constructor(menu: RowContextMenu) {
        Object.assign(this, menu);
    }
}