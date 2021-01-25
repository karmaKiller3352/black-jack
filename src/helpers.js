export const shuffle = (arr) => arr.sort(() =>  Math.random() - 0.5);

export const isEmpty = (arr) => !(arr && arr.length)

export const getPoints = (j) => {
  if (j > 10 && j < 14) return 10
  if (j === 14) return 11
  return j
}


export const generateDeck = () => {
  const suitCount = 4;
  const cardCount = 14;
  const deck = [];
  let positionY = 0;
  for (let i = 0; i < suitCount; i++) {
    let positionX = 0;
    for (let j = 2; j <= cardCount; j++) {
      const isAce = j === 14;
      deck.push({
        points: getPoints(j),
        background: `${positionX}px ${positionY}px`,
        isAce
      })
      positionX -= 115;
    }
    positionY -= 165;
  }
  return shuffle(deck)
}

export const useStartingDistribution = (deck) => {
  const playingDeck = [...deck]
  const dealer = playingDeck.splice(-1)
  const player = playingDeck.splice(-2)
  return {
    playingDeck,
    dealer,
    player
  }
}

export const getNextCard = (deck) => {
  const playingDeck = [...deck]
  const nextCard = playingDeck.pop()

  return {
    playingDeck,
    nextCard
  }
}

export const updateScore = (cards) => {
  let isAce = false;
  let aceCount = 0;
  let preTotal = cards.reduce((acc, card) => {
    if (card.isAce) {
      aceCount += 1;
      isAce = true;
    }
    return acc + card.points
  }, 0)
  if (isAce) {
    for (let i = 1; i <= aceCount; i++) {
      preTotal -= preTotal > 21 ? 10 : 0
    }
  }
  return preTotal
}

