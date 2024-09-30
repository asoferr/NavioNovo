const gameBoard = document.getElementById('gameBoard');
const attemptsDisplay = document.querySelector('.attempts-display'); // Seleciona o elemento de exibição de tentativas
const attemptsMessage = document.createElement('div'); // Mensagem de tentativas
const gameOverMessage = document.createElement('div');
const cardValues = [
    'img/img7.jpg', 'img/img7.jpg',
    'img/img8.jpg', 'img/img8.jpg',
    'img/img9.jpg', 'img/img9.jpg',
    'img/img10.jpg', 'img/img10.jpg',
    'img/img11.jpg', 'img/img11.jpg',
    'img/img12.jpg', 'img/img12.jpg',
    'img/img13.jpg', 'img/img13.jpg',
    'img/img14.jpg', 'img/img14.jpg'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let attempts = 30; // Número de tentativas permitidas

// Exibe o número de tentativas restantes
function updateAttemptsDisplay() {
    attemptsDisplay.textContent = `Tentativas restantes: ${attempts}`;
}

// Embaralha o array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Cria uma nova carta
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    const img = document.createElement('img');
    img.src = value; // Usando o valor da imagem
    img.alt = '';
    img.classList.add('hidden'); // Classe para esconder a imagem inicialmente

    card.appendChild(img);
    card.addEventListener('click', flipCard);
    return card;
}

// Vira a carta e verifica correspondências
function flipCard() {
    if (lockBoard || this === firstCard) return;

    const img = this.querySelector('img');
    img.classList.remove('hidden'); // Mostra a imagem
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    attempts--; // Reduz o número de tentativas restantes
    updateAttemptsDisplay(); // Atualiza a exibição de tentativas

    checkForMatch();
}

// Verifica se as cartas viradas são um par
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matches += 2;
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    } else {
        if (attempts <= 0) {
            setTimeout(() => {
                gameOverMessage.textContent = 'Você ficou sem tentativas! Game Over.';
                gameOverMessage.classList.add('game-over');
                document.body.appendChild(gameOverMessage);
            }, 500);
            disableAllCards();
        } else {
            setTimeout(() => {
                const firstImg = firstCard.querySelector('img');
                const secondImg = secondCard.querySelector('img');
                firstImg.classList.add('hidden'); // Esconde a imagem
                secondImg.classList.add('hidden'); // Esconde a imagem
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
    }
}

// Desativa todas as cartas
function disableAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.removeEventListener('click', flipCard));
}

// Reseta o estado das cartas
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
    if (matches === cardValues.length) {
        setTimeout(() => {
            const winMessage = document.createElement('div');
            winMessage.textContent = 'Você ganhou!';
            winMessage.classList.add('game-over');
            document.body.appendChild(winMessage);
        }, 500);
    }
}

// Configura o jogo inicial
function setupGame() {
    const shuffledValues = shuffle([...cardValues]);
    shuffledValues.forEach(value => {
        gameBoard.appendChild(createCard(value));
    });

    attemptsDisplay.classList.add('attempts-display');
    document.body.insertBefore(attemptsDisplay, gameBoard);
    updateAttemptsDisplay(); // Mostra o número inicial de tentativas
}

setupGame();
