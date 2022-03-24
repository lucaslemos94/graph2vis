import { Component, OnInit, ViewChild } from "@angular/core";
import ForceGraph3D from "3d-force-graph";
import { ActivatedRoute, Router } from "@angular/router";
import { Neo4jService } from "src/app/services/neo4j.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import * as dat from "dat.gui";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"],
})
export class GraphComponent implements OnInit {
  controllerOne: any;
  controllerTwo: any;

  constructor(
    private route: ActivatedRoute,
    private neo4jService: Neo4jService,
    public dialog: MatDialog,
    private router: Router,
    private dataService:DataService
  ) {}

   
  form: any;

  finalGraphData: any;

  gui: any;

  rawGraphData = {
    nodes: <any>[],
    edges: <any>[],
  };

  public screenWidth: any;

  public screenHeight: any;

  @ViewChild("fullScreen") divRef: any;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    this.screenHeight = window.innerHeight;

    this.route.paramMap.subscribe((params) => {
      this.form = params;
    });

    this.getGraphData()
      .then((result: { records: any[] }) => {
        if (this.form.get("enableCustomSettings") == "true") {
          if (this.form.get("basedOn") == "property") {
            result.records.forEach((record) => {
              record.keys.forEach((key: any) => {
                if (!record.get(key).hasOwnProperty("start")) {
                  let id = record.get(key).identity;
                  let label = record.get(key).properties[this.form.get("label")]
                    ? record.get(key).properties[this.form.get("label")]
                    : record.get(key).labels[0];
                  let size = record.get(key).properties[this.form.get("size")]
                    ? record.get(key).properties[this.form.get("size")]
                    : 5;
                  let color = record.get(key).properties[
                    this.form.get("valueColor")
                  ]
                    ? record.get(key).properties[this.form.get("valueColor")]
                    : 1;
                    let properties = record.get(key).properties;

                  this.rawGraphData.nodes.push({
                    id: id,
                    label: label,
                    size: size,
                    group: color,
                    properties:properties
                    
                  });
                } else
                  this.rawGraphData.edges.push({
                    id: record.get(key).identity,
                    source: record.get(key).start,
                    target: record.get(key).end,
                  });
              });
            });
          } else if (this.form.get("basedOn") == "custom") {
            result.records.forEach((record) => {
              record.keys.forEach((key: any) => {
                if (!record.get(key).hasOwnProperty("start")) {
                  let id = record.get(key).identity;
                  let label = record.get(key).properties[this.form.get("label")]
                    ? record.get(key).properties[this.form.get("label")]
                    : record.get(key).labels[0];
                  let size = this.form.get("size");
                  let color = this.form.get("valueColor");
                  let properties = record.get(key).properties;

                  this.rawGraphData.nodes.push({
                    id: id,
                    label: label,
                    size: size,
                    color: color,
                    properties:properties
                  });
                } else
                  this.rawGraphData.edges.push({
                    id: record.get(key).identity,
                    source: record.get(key).start,
                    target: record.get(key).end,
                  });
              });
            });
          }
        } else if (this.form.get("enableCustomSettings") == "false") {
          result.records.forEach((record) => {
            record.keys.forEach((key: any) => {
              if (!record.get(key).hasOwnProperty("start")) {

                let id = record.get(key).identity;
                let label = record.get(key).labels[0];
                let size = 5;
                let properties = record.get(key).properties;

                this.rawGraphData.nodes.push({
                  id: id,
                  label: label,
                  size: size,
                  properties: properties,
                });
              } else {
                this.rawGraphData.edges.push({
                  id: record.get(key).identity,
                  source: record.get(key).start,
                  target: record.get(key).end,
                });
              }
            });
          });

          

        }
      })
      .catch((error: any) => {
        console.log("ENTROU AQUI", error);

        this.dialog.open(DialogComponent, { disableClose: true });
      })
      .then(() => {

        const graph = {
          nodes: this.getUnique(this.rawGraphData.nodes, "id"),
          links: this.rawGraphData.edges,
        };


        const copiedGraph = JSON.parse(JSON.stringify(graph));
        this.dataService.saveObj(copiedGraph)


        


        if (this.form.get("enableCustomSettings") == "true") {
          if (this.form.get("basedOn") == "property")
            this.drawBasedOnProperty(graph);
          else if (this.form.get("basedOn") == "custom")
            this.drawBasedOnCustom(graph);
        } else if (this.form.get("enableCustomSettings") == "false")
        this.dataService.saveObj(graph);
          this.drawDefault(graph);


          
      });
  }

  async getGraphData() {
    let result: any;
    let query: any;

    this.route.paramMap.subscribe((params) => {
      query = params.get("query");
    });

    result = await this.neo4jService.runQuery(query);

    return result;
  }

  drawBasedOnProperty(gData: any) {
    this.finalGraphData = ForceGraph3D()(document.getElementById("viz")!)
      .graphData(gData)
      .nodeLabel("label")
      .nodeVal("size")
      .nodeAutoColorBy("group")
      .width(window.innerWidth)
      .height(window.innerHeight)
      .nodeLabel(
        (node: any) =>
          `<mat-card><center>${node.label} </center></br> ${JSON.stringify(node.properties)} <mat-card>`
      );



    this.buildGUI();
  }

  drawBasedOnCustom(gData: any) {
    this.finalGraphData = ForceGraph3D()(document.getElementById("viz")!)
      .graphData(gData)
      .nodeLabel("label")
      .nodeVal("size")
      .nodeColor("color")
      .width(window.innerWidth)
      .height(window.innerHeight)
      .nodeLabel(
        (node: any) =>
          `<mat-card><center>${node.label} </center></br> ${JSON.stringify(node.properties)} <mat-card>`
      );


    this.buildGUI();
  }

  drawDefault(gData: any) {


    this.finalGraphData = ForceGraph3D()(document.getElementById("viz")!)
      .graphData(gData)
      .nodeVal("size")
      .nodeColor("color")
      .width(window.innerWidth)
      .height(window.innerHeight)
      .nodeLabel(
        (node: any) =>
          `<mat-card><center>${node.label} </center></br> ${JSON.stringify(node.properties)} <mat-card>`
      )

    this.buildGUI();


  }

  getUnique(arr: any, comp: any) {
    // store the comparison  values in array
    const unique = arr
      .map((e: { [x: string]: any }) => e[comp])

      // store the indexes of the unique objects
      .map(
        (e: any, i: any, final: string | any[]) => final.indexOf(e) === i && i
      )

      // eliminate the false indexes & return unique objects
      .filter((e: string | number) => arr[e])
      .map((e: string | number) => arr[e]);

    return unique;
  }

  buildGUI() {
    //Define GUI
    const Settings = () => {
      return { LinkDistance: 0 };
      // const redDistance = 20;
      // const greenDistance = 20;
    };

    const settings = Settings();

    this.gui = new dat.GUI({ autoPlace: false });
    this.controllerTwo = this.gui.add(settings, "LinkDistance", 0, 1000);

    const linkForce = this.finalGraphData
      .d3Force("link")
      .distance((link: { color: any }) => settings.LinkDistance);

    const updateLinkDistance = () => {
      linkForce.distance((link: { color: any }) => settings.LinkDistance);
      this.finalGraphData.numDimensions(3); // Re-heat simulation
    };

    var customContainer = document.getElementById("my-gui-container")!;
    customContainer.appendChild(this.gui.domElement);

    this.controllerTwo.onChange(() => {
      updateLinkDistance();
    });
  }

  backVisualizationInfo() {
    this.router.navigate(["visualizationinfo"]);
  }

  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    const elem = this.divRef.nativeElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  resizeGraph() {
    if (this.finalGraphData) {
      var height = document.getElementById("3d-graph")!.clientHeight;
      var width = document.getElementById("3d-graph")!.clientWidth;

      this.finalGraphData.width(width);
      this.finalGraphData.height(height);
      this.finalGraphData.controls().handleResize();
    }
  }

  ngOnDestroy() {
    if (this.finalGraphData! + undefined) this.finalGraphData._destructor();

    this.gui.destroy();
  }
}
