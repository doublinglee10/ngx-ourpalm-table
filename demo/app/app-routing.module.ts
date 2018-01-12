import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DynamicTableComponent} from "./components/dynamic-table.component";
import {StaticTableComponent} from "./components/static-table.component";
import {StringRowTableComponent} from "./components/string-row.component";
import {ObjectRowTableComponent} from "./components/object-row.component";
import {CardViewComponent} from "./components/card-view.component";
import {NgForDemoComponent} from "./components/ngfor-demo.component";
import {OurpalmTableV3Component} from "./components/ourpalm-table-v3.component";
import {AddRowComponent} from "./components/addrow.table.component";

const routes: Routes = [
    {
        path: 'dynamic-table',
        component: DynamicTableComponent
    },
    {
        path: 'static-table',
        component: StaticTableComponent
    },
    {
        path: 'string-row-table',
        component: StringRowTableComponent
    },
    {
        path: 'object-row-table',
        component: ObjectRowTableComponent
    },
    {
        path: 'card-view-table',
        component: CardViewComponent
    },
    {
        path: 'ngfor',
        component: NgForDemoComponent
    },
    {
        path: 'v3',
        component: OurpalmTableV3Component
    },
    {
        path: 'addrow',
        component: AddRowComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
