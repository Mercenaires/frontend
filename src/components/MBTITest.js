import React, { useState, useEffect } from 'react';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';
import { motion } from 'framer-motion';

const questions = [
    "Vous vous faites fréquemment de nouveaux amis.",
    "Les idées complexes et novatrices vous enthousiasment plus que les idées simples et directes.",
    "Vous vous laissez en général plus facilement convaincre par des émotions qui vous touchent que par des arguments factuels.",
    "Vos espaces de vie et de travail sont propres et organisés.",
    "Vous restez généralement calme, même sous une forte pression.",
    "Vous trouvez l’idée de réseauter ou de vous promouvoir auprès d’étrangers très intimidante.",
    "Vous priorisez et planifiez les tâches de manière efficace, les accomplissant souvent bien avant la date limite.",
    "Les histoires et les émotions des gens vous parlent plus fort que les chiffres ou les données.",
    "Vous aimez recourir à des outils de gestion tels que les calendriers et les listes.",
    "Même une petite erreur peut vous faire douter de vos capacités et de vos connaissances.",
    "Vous n’avez aucun mal à aller vers quelqu’un que vous trouvez intéressant et à entamer une conversation.",
    "Vous n’aimez pas particulièrement les discussions portant sur les différentes interprétations des œuvres créatives.",
    "Vous accordez la priorité aux faits plutôt qu’aux sentiments des gens lorsque vous déterminez une ligne de conduite.",
    "Vous laissez souvent la journée se dérouler sans aucun programme.",
    "Vous vous souciez rarement de faire bonne impression auprès des gens que vous rencontrez.",
    "Vous appréciez participer à des activités en équipe.",
    "Vous aimez expérimenter des approches nouvelles et non testées.",
    "Vous attachez plus d’importance à la sensibilité qu’à l’honnêteté.",
    "Vous êtes en quête permanente de nouvelles expériences et de nouveaux domaines de connaissances à approfondir.",
    "Vous avez tendance à vous inquiéter que les choses aillent de mal en pis.",
    "Vous appréciez davantage les passe-temps ou les activités solitaires que ceux et celles en groupe.",
    "Vous ne vous voyez pas exercer un métier d’écrivain(e) de fiction.",
    "Vous préconisez des décisions efficaces, même si cela implique de faire abstraction de certains aspects émotionnels.",
    "Vous préférez vous acquitter de vos tâches avant de vous détendre.",
    "En cas de désaccord, vous privilégiez la défense de votre point de vue au détriment des sentiments d’autrui.",
    "Vous attendez généralement que les autres se présentent en premier lors des réunions sociales.",
    "Votre humeur peut changer très rapidement.",
    "Vous ne vous laissez pas facilement influencer par des arguments émotionnels.",
    "Vous vous retrouvez souvent à faire les choses à la dernière minute.",
    "Vous aimez débattre de dilemmes éthiques.",
    "Vous préférez généralement être entouré que seul.",
    "Vous vous lassez ou perdez tout intérêt lorsque la discussion devient très théorique.",
    "En cas de conflit entre les faits et les sentiments, vous suivez généralement votre cœur.",
    "Vous avez du mal à maintenir un planning de travail ou d’études cohérent.",
    "Vous remettez rarement en question les choix que vous avez faits.",
    "Vos amis vous décriraient comme étant enjoué(e) et extraverti(e).",
    "Vous êtes attiré(e) par diverses formes d’expression créative, comme l’écriture.",
    "Vous fondez généralement vos choix sur des faits objectifs et non pas sur des sentiments.",
    "Vous aimez dresser une liste de choses à faire au quotidien.",
    "Vous manquez rarement de confiance en vous.",
    "Vous évitez de passer des appels téléphoniques.",
    "Vous aimez découvrir des idées et des points de vue qui ne vous sont pas familiers.",
    "Vous avez une facilité à établir des liens avec des personnes que vous venez de rencontrer.",
    "Si vos projets viennent à être compromis, votre priorité absolue est de reprendre le fil au plus vite.",
    "Vous êtes encore préoccupé par des erreurs que vous avez commises il y a longtemps.",
    "Vous n’aimez pas trop discuter de théories quant à l’avenir du monde.",
    "Vos émotions vous contrôlent plus que vous ne les contrôlez.",
    "Lorsque vous prenez des décisions, vous vous souciez davantage de ce que peuvent ressentir les personnes concernées plutôt que de ce qui est le plus logique ou plus efficace.",
    "Votre style de travail personnel s’apparente davantage à des explosions d’énergie spontanées qu’à des d’efforts organisés et cohérents.",
    "Lorsque quelqu’un vous tient en haute estime, vous vous demandez combien de temps il vous faudra pour le décevoir.",
    "Vous adoreriez avoir un emploi vous obligeant à travailler seul la plupart du temps.",
    "Vous estimez que la réflexion sur des questions philosophiques abstraites est une perte de temps.",
    "Vous vous sentez plus attiré(e) par les lieux à l’atmosphère animée que par les lieux calmes et intimes.",
    "Si une décision vous semble juste, vous agissez souvent sans nécessiter davantage de preuves.",
    "Vous vous sentez souvent submergé.",
    "Vous terminez les choses méthodiquement sans brûler les étapes.",
    "Vous préférez les tâches qui nécessitent de trouver des solutions créatives plutôt que de suivre des étapes concrètes.",
    "Vous vous fiez davantage à votre intuition émotionnelle qu’à votre raisonnement logique au moment de faire un choix.",
    "Vous avez du mal à respecter les délais.",
    "Vous êtes confiant dans le fait que les choses vont s‘arranger pour vous."
  ];

function MbtiTest() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const agreeCount = answers.filter((a) => a === 'agree').length;
    const type = agreeCount > questions.length / 2 ? "ENFP" : "ISTJ";
    setResult(type);
  };

  const progress = (answers.filter(Boolean).length / questions.length) * 100;

  return (
    <div className="relative p-6 min-h-screen bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 overflow-hidden">
      {/* Background animé */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-40 blur-3xl z-0" />

      {/* Bouton dark mode */}
      <div className="relative z-10 flex justify-end mb-4">
        <button
          className="text-2xl focus:outline-none transition duration-300 ease-in-out hover:rotate-12"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <BiSolidSun className="text-yellow-500" />
          ) : (
            <BiSolidMoon className="text-blue-500" />
          )}
        </button>
      </div>

      {/* Citation */}
      <p className="text-center italic mb-4 text-gray-400 relative z-10">
        “Connais-toi toi-même.” – Socrate
      </p>

      <h1 className="text-4xl font-bold text-center mb-6 relative z-10">Test MBTI</h1>

      {/* Barre de progression */}
      <div className="w-full max-w-3xl mx-auto mb-6 relative z-10">
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-center mt-2">{Math.round(progress)}% complété</p>
      </div>

      {/* Formulaire */}
      <form className="space-y-6 max-w-3xl mx-auto relative z-10">
        {questions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className="bg-gray-900 dark:bg-gray-100 p-4 rounded-lg shadow-lg hover:scale-[1.01] transition"
          >
            <p className="mb-2 text-white dark:text-black">{question}</p>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded shadow text-white ${
                  answers[index] === 'agree' ? 'bg-green-500' : 'bg-gray-700 dark:bg-gray-300 text-white dark:text-black'
                }`}
                onClick={() => handleChange(index, 'agree')}
              >
                👍 D'accord
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded shadow text-white ${
                  answers[index] === 'disagree' ? 'bg-red-500' : 'bg-gray-700 dark:bg-gray-300 text-white dark:text-black'
                }`}
                onClick={() => handleChange(index, 'disagree')}
              >
                👎 Pas d'accord
              </button>
            </div>
          </motion.div>
        ))}

        {/* Soumettre */}
        <div className="text-center">
          <button
            type="button"
            className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-400 to-pink-500 rounded text-white font-semibold shadow-lg hover:scale-105 transition"
            onClick={handleSubmit}
          >
            Soumettre le test
          </button>
        </div>
      </form>

      {/* Résultat */}
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-10 mx-auto max-w-md p-6 rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center relative z-10"
        >
          <h2 className="text-3xl font-bold mb-2">Votre type MBTI</h2>
          <p className="text-5xl font-extrabold">{result}</p>
        </motion.div>
      )}
    </div>
  );
}

export default MbtiTest;
