const questions = [
    {
        question: "Qual é o tema principal do poema 'Navio Negreiro'?",
        options: {
            a: "As aventuras de navegantes",
            b: "A celebração da liberdade dos escravizados",
            c: "A abolição da escravatura",
            d: "As tradições africanas"
        },
        answer: "c",
        image: "img/img1.jpg"
    },
    {
        question: "Quem é o autor do poema 'Navio Negreiro'?",
        options: {
            a: "Castro Alves",
            b: "Machado de Assis",
            c: "José de Alencar",
            d: "Carlos Drummond de Andrade"
        },
        answer: "a",
        image: "img/img2.jpg"
    },
    {
        question: "Qual a importância do poema 'Navio Negreiro' na literatura brasileira?",
        options: {
            a: "Retrata a vida dos escravizados",
            b: "Critica a opressão colonial",
            c: "Explora a cultura afro-brasileira",
            d: "Denuncia a escravidão"
        },
        answer: "d",
        image: "img/img3.jpg"
    },
    {
        question: "Qual sentimento o autor expressa em relação à escravidão?",
        options: {
            a: "Tristeza e indignação",
            b: "Esperança de mudança",
            c: "Reflexão e resignação",
            d: "Esperança de liberdade"
        },
        answer: "a",
        image: "img/img4.jpg"
    },
    {
        question: "O que o autor critica em 'Navio Negreiro'?",
        options: {
            a: "A desigualdade social",
            b: "As injustiças sociais enfrentadas pelos escravizados",
            c: "A opressão e sofrimento dos escravizados",
            d: "As condições de vida dos imigrantes"
        },
        answer: "c",
        image: "img/img5.jpg"
    },
    {
        question: "Qual é a estrutura poética do 'Navio Negreiro'?",
        options: {
           "a": "Um poema de versos livres",
            "b": "Soneto com rimas complexas",
            "c": "Lira com estrofes intercaladas",
            "d": "Uma balada popular"
        },
        answer: "c",
        image: "img/img6.jpg"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').style.display = 'none';
    document.getElementById('result').textContent = ''; // Limpa resultado
    document.getElementById('next-button').style.display = 'none'; // Esconder botão "Próxima Pergunta"
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;

    // Atualiza a imagem da pergunta
    const questionImage = document.getElementById('question-img');
    questionImage.src = question.image; // Define a imagem
    questionImage.alt = question.question; // Define o texto alternativo

    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = ''; // Limpa opções anteriores

    for (const option in question.options) {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = `${option.toUpperCase()}) ${question.options[option]}`;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    }
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];

    if (selectedOption === question.answer) {
        score++;
        document.getElementById('result').textContent = 'Correto!';
    } else {
        document.getElementById('result').textContent = `Incorreto! A resposta correta é ${question.answer.toUpperCase()}.`;
    }

    document.getElementById('score-value').textContent = score;
    document.getElementById('next-button').style.display = 'block'; // Mostrar botão "Próxima Pergunta"
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById('result').textContent = ''; // Limpa resultado ao ir para próxima pergunta
        document.getElementById('next-button').style.display = 'none'; // Esconder botão
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('quiz').innerHTML = `
        <h2>Quiz Finalizado!</h2>
        <p>Sua pontuação final é: ${score} de ${questions.length}</p>
    `;
}

document.addEventListener('DOMContentLoaded', startQuiz);
