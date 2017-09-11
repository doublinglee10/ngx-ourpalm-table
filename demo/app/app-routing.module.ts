import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DynamicTableComponent} from "./dynamic-table.component";
import {StaticTableComponent} from "./static-table.component";
import {StringRowTableComponent} from "./string-row.component";

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
