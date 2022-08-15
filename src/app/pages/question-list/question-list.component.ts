import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../shared/services/question.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  activeUser: any;
  multipleAnswers: any = [];
  disabled: boolean = true;

  answerForm: FormGroup;

  constructor(public questionService: QuestionService,
              private _formBuilder: FormBuilder,
              public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.activeUser = user;
    });
    this.answerForm = this._formBuilder.group({
      singleAnswer: this._formBuilder.control(''),
      multipleAnswers: this._formBuilder.array([]),
      openAnswer: this._formBuilder.control('')
    });
  }

  ngOnInit(): void {
    let data: any = [];
    this.questionService.getQuestions().subscribe(res => {
      res.map(el => {
        return data.push(el.payload.doc.data())
      });

      this.questionService.questions = data;

      for (let q of this.questionService.questions) {
        if (q.type === 'Multiple choice') {
          for (let opt of q.options) {
            this.FormAnswers.push(this._formBuilder.control(''));
          }
        }
      }

      this.questionService.answeredQuestions =
        this.questionService.questions.filter((el: any) => el.answered.includes(this.activeUser.id));
      this.questionService.unansweredQuestions =
        this.questionService.questions.filter((el: any) => !el.answered.includes(this.activeUser.id)).reverse();
    });
  }

  get FormAnswers() {
    return this.answerForm.controls['multipleAnswers'] as FormArray;
  }

  toggleCheckbox(event: any) {
    if (event.checked) {
      this.multipleAnswers.push(event.source.value);
    } else {
      this.multipleAnswers.splice(this.multipleAnswers.indexOf(event.source.value), 1);
    }
  }

  checkValidity(event: any, button: any, question: any) {
    switch (question.type){
      case "Single choice":
        button.disabled = !event.source.checked;
        return;
      case "Multiple choice":
        button.disabled = this.multipleAnswers.length === 0;
        return;
      case "Open answer":
        button.disabled = !event;
        return;
    }
  }

  confirmAnswer(question: any) {
    switch (question.type) {
      case 'Single choice':
        this.questionService.confirmAnswer(question, this.answerForm.value.singleAnswer);
        return;
      case 'Multiple choice':
        this.questionService.confirmAnswer(question, this.multipleAnswers);
        return;
      case 'Open answer':
        this.questionService.confirmAnswer(question, this.answerForm.value.openAnswer);
        return;
    }
  }

  removeAnswer(question: any) {
    this.multipleAnswers = [];
    this.questionService.removeAnswer(question);
  }
}
