import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';

 
@Component({
  selector: 'app-select-check-all',
  templateUrl: "./select-check-all.component.html",
  styleUrls: ['./select-check-all.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectCheckAllComponent {
  @Input() model: FormControl | undefined;
  @Input() values : any[]=[];
  @Input() text = 'Select All'; 
 
  isChecked(): boolean {
    return this.model?.value && this.values.length
      && this.model?.value.length === this.values.length;
  }
 
  isIndeterminate(): boolean {
    return this.model?.value && this.values.length && this.model?.value.length
     && this.model?.value.length < this.values.length;
  }
 
  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      const result = this.values.map(v => v);
      this.model?.setValue(result);
    } else {
      this.model?.setValue([]);
    }
  }
}
