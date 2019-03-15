import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MaskEvent } from 'projects/input-mask/src/lib/common-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  form: FormGroup;
  dateMask: string = '99/99/9999';
  phoneMask: string = '(999) 999-9999'
  einMask: string = '99-9999999';
  ccMask: string = '9999 9999 9999 9999';
  invoiceMask: string = "INV-9999 S";

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.form = this.fb.group({
      phoneNumber: new FormControl(null, Validators.required)
    });

  }

  valueFormatted(event: MaskEvent) {
    console.log('Formatted value: ', event.value);
    console.log('Clean value: ', event.cleanValue);
  }
}
