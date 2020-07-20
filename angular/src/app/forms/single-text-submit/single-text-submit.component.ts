import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-single-text-submit',
  templateUrl: './single-text-submit.component.html',
  styleUrls: ['./single-text-submit.component.css']
})
export class SingleTextSubmitComponent implements OnInit {

  form: FormGroup;
  @Output() submitForm = new EventEmitter();


  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl()
    });
  }

  onFormSubmit() {
    console.log(this.form);

    let name: string = this.form.get('name').value;

    this.submitForm.emit({ name });

  }

}
