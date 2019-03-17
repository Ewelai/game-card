const cards = document.querySelectorAll('.memory-card');
let flippedCard = false, firstCard, secondCard;
let lockCards = false;

(function orderRandom() {

  cards.forEach((card) => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
  
})();

function flipCard() {
  if(lockCards) return;
  if(this === firstCard) return;

  this.classList.toggle('flip');

  if(!flippedCard) {
    flippedCard = true;
    firstCard = this;
  } else {
    flippedCard = false;
    secondCard = this;
    checkCards();
  }
}

function checkCards() {
  let statusMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if(statusMatch) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  } else {
    lockCards = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      lockCards = false;
    }, 1000); 
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));