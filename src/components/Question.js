export default class Question {
    constructor(id, texte, scoreSiDaccord = {}, scoreSiPasDaccord = {}) {
      this.id = id;
      this.texte = texte;
      this.scoreSiDaccord = scoreSiDaccord;
      this.scoreSiPasDaccord = scoreSiPasDaccord;
    }
  
    getImpact(answerType) {
      return answerType === 'agree' ? this.scoreSiDaccord : this.scoreSiPasDaccord;
    }
  }
  