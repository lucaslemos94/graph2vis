import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Neo4jService } from 'src/app/services/neo4j.service';

@Component({
  selector: 'app-standart-graph',
  templateUrl: './standart-graph.component.html',
  styleUrls: ['./standart-graph.component.css']
})
export class StandartGraphComponent implements OnInit {

  constructor(private route: ActivatedRoute,private neo4jService:Neo4jService) { }
  
  form:any;

  ngOnInit(): void {

    this.getGraphData().then((result)=>{
      console.log(result);
      
    })

    
  }


  async getGraphData(){
    let result;

    this.route.paramMap.subscribe(params =>{
    
       result = params
   
    })

    const finalResult = await this.neo4jService.standartQuery(result)

    return finalResult;

  }




}
