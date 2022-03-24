import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectionFormComponent } from './components/conection-form/conection-form.component';
import { GraphComponent } from './components/graph/graph.component';
import { VisualizationFormComponent } from './components/visualization-form/visualization-form.component';

const routes: Routes = [
 
  // {path:'',component:VisualizationFormComponent},
  {path:'',component:ConectionFormComponent},
  {path:'connectionForm',component:ConectionFormComponent},
  {path:'visualizationinfo',component:VisualizationFormComponent},
  {path:'graph',component:GraphComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
