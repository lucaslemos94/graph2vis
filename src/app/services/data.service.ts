import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  obj:any;
  form:any;

  saveObj(obj:any){
    this.obj =  obj;
  }

  retrieveObj(){
    return this.obj;
  }

  saveForm(form:any){
    this.form =  form;
  }

  retrieveForm(){
    return this.form;
  }
}

