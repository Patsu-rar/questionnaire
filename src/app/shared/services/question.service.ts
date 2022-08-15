import {Injectable} from '@angular/core';
import {Question} from "../models/question";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  activeUser: any;
  activeQuestion: any;
  questions: any;

  answeredQuestions: any;
  unansweredQuestions: any;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.activeUser = user;
    });
  }

  createQuestion(question: Question) {
    question.id = this.afs.createId();
    return this.afs.collection('Questions').doc(question.id).set(question);
  }

  getQuestions() {
    return this.afs.collection('Questions').snapshotChanges();
  }

  deleteQuestion(question: Question) {
    return this.afs.collection('Questions').doc(question.id).delete();
  }

  getUserQuestions() {
    this.afAuth.authState.subscribe(user => {
      this.activeUser = user;
    });
    return this.questions.filter((el: any) => el.created_by === this.activeUser.uid);
  }

  getUserAnswer(question: any) {
    this.afAuth.authState.subscribe(user => {
      this.activeUser = user;
    });

    const index = question.answered.indexOf(this.activeUser.id);

    return question.userAnswers[index];
  }

  confirmAnswer(question: any, answer: any) {
    let activeQuestion = this.questions.filter((el: any) => el.id === question.id)[0];
    activeQuestion.answered.push(this.activeUser.id);
    activeQuestion.userAnswers.push(answer);

    this.answeredQuestions = this.questions.filter((el: any) => el.answered.includes(this.activeUser.id));
    this.unansweredQuestions = this.questions.filter((el: any) => !el.answered.includes(this.activeUser.id)).reverse();
  }

  removeAnswer(question: any) {
    let activeQuestion = this.questions.filter((el: any) => el.id === question.id)[0];
    const user = activeQuestion.answered.indexOf(this.activeUser.id);
    activeQuestion.answered.splice(user, 1);
    activeQuestion.userAnswers.splice(user, 1);

    this.answeredQuestions = this.questions.filter((el: any) => el.answered.includes(this.activeUser.id));
    this.unansweredQuestions = this.questions.filter((el: any) => !el.answered.includes(this.activeUser.id)).reverse();
  }

  setEditedQuestion(question: any) {
    return this.activeQuestion = question;
  }

  getEditedQuestion() {
    return this.activeQuestion;
  }
}
