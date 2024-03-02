let currentQuestionIndex = 0;

async function fetchData() {
 try {
     const response = await fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple');
     const data = await response.json();
     const questionsContainer = document.getElementById('questionsContainer');

     // Clear the container to ensure it's empty before adding questions
     questionsContainer.innerHTML = '';

     // Function to display a specific question
     function displayQuestion(index) {
         const question = data.results[index];
         if (!question) return; // If there's no question, do nothing

         questionsContainer.innerHTML = ''; // Clear the container

         const questionElement = document.createElement('div');
         questionElement.innerHTML = `<h2>${question.question}</h2>`;

         const choicesElement = document.createElement('form');
         choicesElement.id = `questionForm-${index}`;
         // Combine all answers (correct and incorrect) into one array
         const allAnswers = [...question.incorrect_answers, question.correct_answer];
         // Shuffle the combined array
         const shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random());
         shuffledAnswers.forEach((answer, answerIndex) => {
             const choiceElement = document.createElement('div');
             const radioInput = document.createElement('input');
             radioInput.type = 'radio';
             radioInput.name = `question-${index}`;
             radioInput.id = `answer-${index}-${answerIndex}`;
             radioInput.value = answer;
             const label = document.createElement('label');
             label.htmlFor = `answer-${index}-${answerIndex}`;
             label.textContent = answer;
             choiceElement.appendChild(radioInput);
             choiceElement.appendChild(label);
             choicesElement.appendChild(choiceElement);
         });

         const submitButton = document.createElement('button');
         submitButton.textContent = 'Submit';
         submitButton.addEventListener('click', () => {
             // Handle submission logic here
             // For now, just move to the next question
             currentQuestionIndex++;
             displayQuestion(currentQuestionIndex);
         });

         questionElement.appendChild(choicesElement);
         questionElement.appendChild(submitButton);
         questionsContainer.appendChild(questionElement);
     }

     // Display the first question
     displayQuestion(currentQuestionIndex);
 } catch (error) {
     console.error('Error fetching data:', error);
 }
}

fetchData();