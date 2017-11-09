import {Component} from '@angular/core';
import {Employee} from '../models/employee.model';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages = [];
  model = new Employee('', '', true, '', 'default');
  hasPrimaryLanguageError = false;
  minDate = new Date('October 12 2017');
  startDate: Date;
  startTime: Date;
  onOffSwitch = "Off";
  radioModel = "Hello";
  postRating = 5;

  hover(value) {
    console.log("hover: " + value);
  }

  leave(value) {
    console.log("leave: " + value);
  }

  constructor(private formPoster: FormPoster) {
    this.formPoster.getLanguages()
      .subscribe(
        data => this.languages = data.languages,
        err => console.log('get error: ', err)
      );
  }

  submitForm(form: NgForm) {
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if(this.hasPrimaryLanguageError) {
      return;
    }
    this.formPoster.postEmployeeForm(this.model)
      .subscribe (
        data => console.log('success:', data),
        err => console.log('error:', err)
      )
  }

  validatePrimaryLanguage(value) {
    if ( value === 'default') {
      this.hasPrimaryLanguageError = true;
    } else {
        this.hasPrimaryLanguageError = false;
    }
  }
}
