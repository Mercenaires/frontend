import React, { useState, useEffect } from 'react';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';
import { motion } from 'framer-motion';
import MBTIEngine from './MBTIEngine';
import questionData from '../assets/mapped_questions_mbti_clean.json';

const questionsPerPage = 5;

function MbtiTest() {
  const [engine, setEngine] = useState(null);
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const e = new MBTIEngine(questionData);
    setEngine(e);
    setAnswers(Array(e.getTotalQuestions()).fill(null));
  }, []);

  if (!engine) return <div className="text-white text-center mt-10">Chargement...</div>;

  const startIndex = page * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = engine.getQuestionsPerPage(page, questionsPerPage);

  const handleChange = (index, value) => {
    const globalIndex = startIndex + index;
    const newAnswers = [...answers];
    newAnswers[globalIndex] = value;
    setAnswers(newAnswers);
    engine.appliquerReponse(globalIndex, value);
  };

  const handleNext = () => {
    if (endIndex >= engine.getTotalQuestions()) {
      setResult(engine.getResult());
    } else {
      setPage(page + 1);
    }
  };

  const isPageValid = currentQuestions.every((_, index) => answers[startIndex + index] !== null);

  return (
    <div className="relative p-6 min-h-screen bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-40 blur-3xl z-0" />

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

      <p className="text-center italic mb-4 text-gray-400 relative z-10">
        “Connais-toi toi-même.” – Socrate
      </p>

      <h1 className="text-4xl font-bold text-center mb-6 relative z-10">Test MBTI</h1>
          {/* Barre de progression */}
        <div className="w-full max-w-3xl mx-auto mb-6 relative z-10">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(answers.filter(a => a !== null).length / engine.getTotalQuestions()) * 100}%`
              }}
            ></div>
          </div>
          <p className="text-sm text-center mt-2">
            {answers.filter(a => a !== null).length}/{engine.getTotalQuestions()} répondues
          </p>
        </div>

      <form className="space-y-6 max-w-3xl mx-auto relative z-10">
        {currentQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 dark:bg-gray-100 p-4 rounded-lg shadow-lg hover:scale-[1.01] transition"
          >
            <p className="mb-2 text-white dark:text-black">{question.texte}</p>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded shadow ${
                  answers[startIndex + index] === 'agree'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 dark:bg-gray-300 text-white dark:text-black'
                }`}
                onClick={() => handleChange(index, 'agree')}
              >
                👍 D'accord
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded shadow ${
                  answers[startIndex + index] === 'disagree'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-700 dark:bg-gray-300 text-white dark:text-black'
                }`}
                onClick={() => handleChange(index, 'disagree')}
              >
                👎 Pas d'accord
              </button>
            </div>
          </motion.div>
        ))}

        <div className="text-center">
          <button
            type="button"
            className={`mt-8 px-6 py-3 rounded text-white font-semibold shadow-lg hover:scale-105 transition ${
              isPageValid
                ? 'bg-gradient-to-r from-blue-400 to-pink-500'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
            disabled={!isPageValid}
            onClick={handleNext}
          >
            {endIndex >= engine.getTotalQuestions() ? 'Soumettre' : 'Suivant'}
          </button>
        </div>
      </form>

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
