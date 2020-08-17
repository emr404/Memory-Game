const cards = document.querySelectorAll('.card');
const points = document.querySelector('.points');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

checkForMatch = () => {
    let matchFound = firstCard.dataset.value === secondCard.dataset.value;
    matchFound ? disableMatchedCards() : unflipCards();
    matchFound ? points.innerHTML++ : 0;
}

disableMatchedCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}
unflipCards = () => {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        resetBoard();
    }, 1500);
}
resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(shuffleCards = () => {
    cards.forEach(cards => {
        let randomPosition = Math.floor(Math.random() * 12);
        cards.style.order = randomPosition;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));


