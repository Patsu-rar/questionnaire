import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../shared/services/question.service";

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {
  questions: any;

  constructor(public questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(res => {
      this.questionService.questions = res.map((el: any) => {
        const data = el.payload.doc.data();
        data.id = el.payload.doc.id;
        return data;
      });

      this.questions = this.questionService.getUserQuestions();
    });
  }

  deleteQuestion(question: any) {
    this.questionService.deleteQuestion(question).then(() => {
      this.questionService.getQuestions().subscribe(res => {
        this.questionService.questions = res.map((el: any) => {
          const data = el.payload.doc.data();
          data.id = el.payload.doc.id;
          return data;
        });

        this.questions = this.questionService.getUserQuestions();
      });
    });
  }

  editQuestion(question: any) {
    this.questionService.setEditedQuestion(question);
  }
}
