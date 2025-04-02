import Question from './Question';
import Utilisateur from './Utilisateur';

export default class MBTIEngine {
  constructor(questionData) {
    this.questions = questionData.map((q, index) =>
      new Question(
        `q${index + 1}`,
        q.texte,
        q.scoreSiDaccord,
        q.scoreSiPasDaccord
      )
    );
    this.utilisateur = new Utilisateur();
  }

  getQuestion(index) {
    return this.questions[index];
  }

  getQuestionsPerPage(page, pageSize) {
    const start = page * pageSize;
    const end = start + pageSize;
    return this.questions.slice(start, end);
  }

  appliquerReponse(index, answerType) {
    const question = this.getQuestion(index);
    const impact = question.getImpact(answerType);
    this.utilisateur.appliquer(impact);
  }

  getResult() {
    return this.utilisateur.getMBTI();
  }

  reset() {
    this.utilisateur.reset();
  }

  getTotalQuestions() {
    return this.questions.length;
  }
}
