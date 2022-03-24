import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Neo4jService } from 'src/app/services/neo4j.service';

@Component({
  selector: 'app-conection-form',
  templateUrl: './conection-form.component.html',
  styleUrls: ['./conection-form.component.css']
})
export class ConectionFormComponent implements OnInit {

  constructor(private fb:FormBuilder,private snackBar:MatSnackBar,private neo4j: Neo4jService,private router:Router,private dataService:DataService) { }

  form:any;
  spinner:Boolean = false
  hide:Boolean = true

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm():void{
    this.form = this.fb.group({
      address:[null],
      username:[null],
      password:[null],
      name:[null]
      // encrypted:[false],
    });
  }

  async connectNeo4j(form:any){

    try {

      this.spinner = true;
  
      const verifyConnectivity =  await this.neo4j.verifyConnectivity(form);
  
      const verifySession = await this.neo4j.verifySession(form);
      
      if (verifyConnectivity && verifySession){
              this.spinner = false;
              this.snackBar.open('Successfully Connected!','X',{duration:3000,
                panelClass: ['green-snackbar']});
              this.dataService.saveForm(form);
              this.router.navigate(['visualizationinfo'])
              
      }
   } catch (error) {
              this.spinner =false
              this.snackBar.open(error + '\n' + 'Check your access credentials.','X',{duration:3000,
               panelClass: ['red-snackbar']})    
    }
  
  }
}
