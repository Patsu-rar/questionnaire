export interface Question {
  id: string,
  text: string,
  type: string,
  options: Array<string> | null,
  answer: string | string[] | null,
  answered: Array<number>,
  userAnswers: Array<string | Array<string>>,
  created_by: string,
  created: string
}
