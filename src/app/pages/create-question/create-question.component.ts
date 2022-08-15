import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {QuestionService} from "../../shared/services/question.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  types: string[] = ['Single choice', 'Multiple choice', 'Open answer'];
  selectedType: string = this.types[0];
  items: any = [];
  singleAnswer: string = '';
  multipleAnswers: string[] = [];
  currentButton: any;

  questionForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private questionService: QuestionService,
              private afAuth: AngularFireAuth) {
    this.questionForm = this._formBuilder.group({
      question: this._formBuilder.control('', [Validators.required]),
      type: this._formBuilder.control(this.selectedType, [Validators.required]),
      options: this._formBuilder.array([])
    });
  }

  ngOnInit(): void {
    if (this.selectedType !== 'Open answer') {
      for (let i = 0; i < 2; i++) {
        this.FormOptions.push(this._formBuilder.control(''));
        this.items.push(this._formBuilder.control(''));
      }
    }
  }

  get FormOptions() {
    return this.questionForm.get('options') as FormArray;
  }

  addOption() {
    if (this.currentButton) {
      this.currentButton.checked = false;
    }
    this.FormOptions.push(this._formBuilder.control(''));
    this.items.push(this._formBuilder.control(''));
  }

  deleteOption(index: number) {
    this.items.splice(index, 1);
    this.FormOptions.removeAt(index);
  }

  clearList() {
    this.FormOptions.clear();
    this.items = [this._formBuilder.control(''),this._formBuilder.control('')];
    for (let i = 0; i < 2; i++) {
      this.FormOptions.push(this._formBuilder.control(''));
    }
  }

  toggleState(button: any) {
    this.currentButton = button;
    button.checked = true;

    if (button.value !== '') {
      this.singleAnswer = button.value;
    }
  }

  toggleCheckbox(button: any) {
    if (button.checked === false && button.value !== '') {
      this.multipleAnswers.push(button.value);
    } else {
      let index = this.multipleAnswers.indexOf(button.value);
      this.multipleAnswers.splice(index, 1);
    }
  }

  createQuestion() {
    if (this.questionForm.invalid){
      return;
    }

    let activeUser: any;

    this.afAuth.authState.subscribe(user => {
      activeUser = user;

      let answer, options;

      if (this.questionForm.value.type === 'Single choice') {
        options = this.questionForm.value.options;
        answer = this.singleAnswer;
      } else if (this.questionForm.value.type === 'Multiple choice'){
        options = this.questionForm.value.options.slice(0, -2);
        answer = this.multipleAnswers;
      } else {
        answer = '';
        options = [];
      }

      let question = {
        id: '',
        text: this.questionForm.value.question,
        type: this.questionForm.value.type,
        options: options,
        answer: answer,
        answered: [],
        userAnswers: [],
        created_by: activeUser.uid,
        created: new Date(Date.now()).toDateString()
      }
      console.log(question);
      this.questionService.createQuestion(question).then(() => {
        this.router.navigate(['/management']);
      });
    });
  }
}
