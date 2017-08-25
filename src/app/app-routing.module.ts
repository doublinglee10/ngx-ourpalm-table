import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DynamicTableComponent} from "./dynamic-table.component";

const routes: Routes = [
    {
        path: 'dynamic-table',
        component: DynamicTableComponent
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
