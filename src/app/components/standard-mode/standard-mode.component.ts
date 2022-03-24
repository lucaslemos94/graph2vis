import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Neo4jService } from 'src/app/services/neo4j.service';

@Component({
  selector: "app-standard-mode",
  templateUrl: "./standard-mode.component.html",
  styleUrls: ["./standard-mode.component.css"],
})
export class StandardModeComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private neo4jService: Neo4jService
  ) {}

  form: any;
  nodes: any[] = [];
  relationships: any = [];

  ngOnInit(): void {
    this.buildForm()

    this.loadData().then((result) => {
      this.nodes = result.nodes;
      this.relationships = result.relationships;
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      nodes: [[null], Validators.required],
      relationships: [[null], Validators.required],
    })
  }

  async loadData() {
    const nodes = await this.neo4jService.getLabelNodes()
    const relationships = await this.neo4jService.getRelationships()
    return { nodes: nodes, relationships: relationships }
  }

  openStandartGraphComponent() {
    this.router.navigate(["standartgraph", this.form.value])
  }
}
