const wordsWithHints = {
    'escravidao': 'Trabalho forçado sem liberdade.',
    'trafico': 'Transporte ilegal de pessoas ou bens.',
    'carga humana': 'Transporte ilegal de pessoas.',
    'direitos humanos': 'Direitos básicos que pertencem a todos os seres humanos.',
    'aboliçao': 'Fim da escravidão em um determinado país.'
};

let chosenWord;
let guessedLetters;
let wrongLetters;
let attempts;
let displayWord;
let hint;

function startGame() {
    const wordKeys = Object.keys(wordsWithHints);
    chosenWord = wordKeys[Math.floor(Math.random() * wordKeys.length)];
    hint = wordsWithHints[chosenWord];
    guessedLetters = [];
    wrongLetters = [];
    attempts = 15;
    displayWord = chosenWord.split('').map(letter => '_').join(' ');
    
    // Atualiza a interface
    document.getElementById('word').textContent = displayWord;
    document.getElementById('attemptsLeft').textContent = attempts;
    document.getElementById('message').textContent = '';
    document.getElementById('letterInput').value = '';
    document.getElementById('newRoundButton').style.display = 'none';
    document.getElementById('wrongLettersList').textContent = '';
    document.getElementById('score').style.display = 'none'; // Esconder a pontuação
    document.getElementById('hint').textContent = 'Dica: ' + hint; // Adicione esta linha
}

function guessLetter() {
    const input = document.getElementById('letterInput');
    const letter = input.value.toLowerCase();
    input.value = '';

    if (letter === '' || guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;

    if (chosenWord.includes(letter)) {
        guessedLetters.push(letter);
        displayWord = chosenWord.split('').map((l) => 
            guessedLetters.includes(l) ? l : '_'
        ).join(' ');
        document.getElementById('word').textContent = displayWord;

        if (!displayWord.includes('_')) {
            document.getElementById('message').textContent = 'Você ganhou!';
            document.getElementById('newRoundButton').style.display = 'block';
            return;
        }
    } else {
        attempts--;
        wrongLetters.push(letter);
        document.getElementById('attemptsLeft').textContent = attempts;
        document.getElementById('wrongLettersList').textContent = wrongLetters.join(', ');

        // Atualizar o desenho do boneco da forca
        updateHangman();

        if (attempts === 0) {
            document.getElementById('message').textContent = 'Você perdeu! A palavra era ' + chosenWord;
            document.getElementById('newRoundButton').style.display = 'block';
            return;
        }
    }
}

function updateHangman() {
    if (attempts < 15) document.getElementById('head').style.display = 'block';
    if (attempts < 12) document.getElementById('arms').style.display = 'block';
    if (attempts < 9) document.getElementById('body').style.display = 'block';
    if (attempts < 6) document.getElementById('legs').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', startGame);
