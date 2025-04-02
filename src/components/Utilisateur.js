export default class Utilisateur {
    constructor() {
      this.scores = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
      };
    }
  
    appliquer(impact) {
      for (let key in impact) {
        if (this.scores.hasOwnProperty(key)) {
          this.scores[key] += impact[key];
        }
      }
    }
  
    getMBTI() {
      return (this.scores.E >= this.scores.I ? 'E' : 'I') +
             (this.scores.S >= this.scores.N ? 'S' : 'N') +
             (this.scores.T >= this.scores.F ? 'T' : 'F') +
             (this.scores.J >= this.scores.P ? 'J' : 'P');
    }
  
    reset() {
      for (let key in this.scores) {
        this.scores[key] = 0;
      }
    }
  }
  