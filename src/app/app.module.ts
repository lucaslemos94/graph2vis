import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConectionFormComponent } from './components/conection-form/conection-form.component';
import { VisualizationFormComponent } from './components/visualization-form/visualization-form.component';
import { GraphComponent } from './components/graph/graph.component';


import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog'; 
import { DialogComponent } from './components/dialog/dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatTabsModule} from '@angular/material/tabs';
import { StandardModeComponent } from './components/standard-mode/standard-mode.component';
import { SelectCheckAllComponent } from './select-check-all/select-check-all.component';
import { StandartGraphComponent } from './components/standart-graph/standart-graph.component';
import { CentralitiesComponent } from './components/centralities/centralities.component';




@NgModule({
  declarations: [
    AppComponent,
    ConectionFormComponent,
    VisualizationFormComponent,
    GraphComponent,
    DialogComponent,
    StandardModeComponent,
    SelectCheckAllComponent,
    StandartGraphComponent,
    CentralitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatTabsModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
