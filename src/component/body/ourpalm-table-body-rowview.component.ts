import {ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation} from "@angular/core";
import {RowView} from "../../model/ourpalm-table";

@Component({
    selector: 'ourpalm-table-body-rowview',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-container *ngIf="template">
            <ng-template [ngTemplateOutlet]="template"
                         [ngOutletContext]="{'$row': row, '$index': rowIndex}">
            </ng-template>
        </ng-container>
        <ng-container *ngIf="!template">
            {{ (rowView?.renderRow(rowIndex, row) || '') | safeHtml }}
        </ng-container>
    `
})
export class OurpalmTableBodyRowViewComponent {

    @Input() row: any;
    @Input() rowIndex: number;

    @Input() rowView: RowView;
    @Input() template: TemplateRef<any>;
}