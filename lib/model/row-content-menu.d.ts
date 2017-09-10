export declare type BooleanResolver = () => boolean;
export declare type BooleanOrResolver = boolean | BooleanResolver;
export declare class RowContextMenu {
    text: string;
    iconCls?: string;
    separator?: boolean;
    show?: BooleanOrResolver;
    onclick?: any;
    submenus?: RowContextMenu[];
    constructor(menu: RowContextMenu);
}
