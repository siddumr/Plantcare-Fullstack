import React, { useState } from 'react';
import '../HomePage-CSS/PlantQuiz.css'; // For styling

const PlantQuiz = () => {
  const questions = [
    {
      question: "How do you prefer to spend your free time?",
      options: ["Relaxing indoors", "Going for a walk", "Taking care of a garden", "Exploring new places"],
    },
    {
      question: "What’s your home environment like?",
      options: ["Bright and sunny", "Cozy and shaded", "Lots of greenery", "Minimalistic"],
    },
    {
      question: "How often do you want to take care of your plant?",
      options: ["Low maintenance", "Occasionally", "I love taking care of plants regularly", "Only when needed"],
    },
    {
      question: "What's your personality?",
      options: ["Laid-back", "Adventurous", "Creative", "Quiet"],
    },
  ];

  const plantSuggestions = {
    "Relaxing indoors": "Snake Plant",
    "Going for a walk": "Aloe Vera",
    "Taking care of a garden": "Fern",
    "Exploring new places": "Cactus",
    "Cozy and shaded": "ZZ Plant",
    "Lots of greenery": "Spider Plant",
    "Low maintenance": "Succulent",
    "Occasionally": "Peace Lily",
    "I love taking care of plants regularly": "Orchid",
    "Only when needed": "Pothos",
    "Laid-back": "Jade Plant",
    "Adventurous": "Bamboo",
    "Creative": "Bonsai Tree",
    "Quiet": "English Ivy",
  };

  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null)); // Initialize with null for each question
  const [result, setResult] = useState(null);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);

    // Move to the next question or show the result
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Finalize the result
      const plant = plantSuggestions[updatedAnswers[0]]; // Use the first answer to find the plant
      setResult(plant);
    }
  };

  return (
    <div className="quiz-container">
      <h2 id="quiz_head">What Plant Suits Your Personality !!!</h2>
      {result ? (
        <div className="result">
          <h3>Your Ideal Plant:</h3>
          <p className="result-answer">{result}</p>
          <p>Explore more plants in our app!</p>
        </div>
      ) : (
        <div className="quiz-question">
          <h3>{questions[currentQuestion].question}</h3>
          <div className="quiz-options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="quiz-option"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantQuiz;
