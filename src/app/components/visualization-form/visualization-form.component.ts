import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: "app-visualization-form",
  templateUrl: "./visualization-form.component.html",
  styleUrls: ["./visualization-form.component.css"],
})
export class VisualizationFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) {}

  form: any;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      query: [null],
      enableCustomSettings: false,
      basedOn: [null],
      label: [null],
      size: [null],
      valueColor: [null],
    });
  }

  openGraphComponent() {
    this.router.navigate(["graph", this.form.value]);
  }

  getQueryTooltip() {
    return `For better results, inform label in nodes and relationships.\nEx: MATCH (a)-[r]-(b) RETURN a,r,b`;
  }

  getBasedOnTooltip() {
    return `Property: Property values of nodes and relationships.\nCustom: Own values.`;
  }

  getNodeLabelTooltip() {
    return `Label of shown node. Based on an existing node property.\nEx: 'id', 'name'.`;
  }

  getSizeTooltip() {
    return `Size of shown node. Can be based on node property or custom value.\nEx: 'degree', '1'.`;
  }

  getColorTooltip() {
    return `Color of shown node. Can be based on node property or custom value.\nEx: 'community', 'red' , '#FF0000'.`;
  }
}