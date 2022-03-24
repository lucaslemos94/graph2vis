import { Component, OnInit } from '@angular/core';
import centrality from 'ngraph.centrality';
import graph from 'ngraph.graph';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-centralities',
  templateUrl: './centralities.component.html',
  styleUrls: ['./centralities.component.css']
})
export class CentralitiesComponent implements OnInit {

  constructor(private dataService:DataService) { }
  
 
  result:any;

  ngOnInit(): void {

     const retrived  = this.dataService.retrieveObj()
     const ngprah = graph()


    retrived.links.forEach((link:any)=>{
      console.log(link);
      
      ngprah.addLink(String(link.source.id),String(link.target.id))
    })


    this.result = centrality.degree(ngprah)


    console.log(this.result);
    

    // this.result = centrality.degree(this.graph)
      
        // graph.links.forEach((link:any) =>{
        //   const g = nGraph.createGraph();
        //   nGraph.addLink(link.start,link.end)
        // })

        // var degreeCentrality = nGraph.degree(this.g);
        // console.log(degreeCentrality);
    
    
    

    // const  g = graph();

    // const result = centrality.degree(g)

    // console.log(result);

    
    



  }

}
