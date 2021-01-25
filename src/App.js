import { useState, useCallback, useEffect } from "react";
import { ThemeProvider } from "styled-components";


import Card from "./Card";
import Modal from "./Modal";
import theme from "./theme";
import {
  Bet,
  Body,
  Button,
  ButtonWrapper,
  CardCover,
  CardsWrapper,
  ControlPanel,
  GameBox,
  GameField,
  GlobalStyle,
  Label,
  Money,
  Statistic,
  Points
} from "./ui";
import { isEmpty, shuffle } from "./utils";


const buttonList = {
  gamePlay: {
    start: 'Start game',
    restart: 'Play again',
  },
  gameProccess: [
    {
      title: 'Hit',
      label: 'hit',
    },
    {
      title: 'Double',
      label: 'double',
    },
    {
      title: 'Stand',
      label: 'stand',
    },
  ]
}

const getPoints = (j) => {
  if (j > 10 && j < 14) return 10
  if (j === 14) return 11
  return j
}


const generateDeck = () => {
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

const useStartingDistribution = (deck) => {
  const playingDeck = [...deck]
  const dealer = playingDeck.splice(-1)
  const player = playingDeck.splice(-2)
  return {
    playingDeck,
    dealer,
    player
  }
}

const getNextCard = (deck) => {
  const playingDeck = [...deck]
  const nextCard = playingDeck.pop()

  return {
    playingDeck,
    nextCard
  }
}

const updateScore = (cards) => {
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



const winPoints = 21;
const minBet = 5;
const startedMoney = 100;


function App() {

  const defaultState = {
    credit: startedMoney,
    bet: minBet,
    gameStarted: false,
    gameOver: false,
    deck: [],
    playerCards: [],
    dealerCards: [],
    disabled: false,
    playerPoints: 0,
    dealerPoints: 0,
    mode: 'player',
  }

  const defaultUIState = {
    open: false,
    message: null
  }

  const [state, setState] = useState(defaultState)
  const [modal, setModal] = useState(defaultUIState)

  const setBtnDisabled = () => setState((prev) => ({ ...prev, disabled: true }));
  const showModal = (message) => setModal({ open: true, message });
  const hideModal = () => setModal(defaultUIState);

  const setGameOver = () => setState((prev) => ({ ...prev, gameOver: true, disabled: true }))
  const setMode = (mode) => setState((prev) => ({ ...prev, mode }));

  const setBet = (multiple = 1) => setState((prev) => {
    const bet = multiple * minBet;
    return {
      ...prev,
      bet: prev.bet + bet,
      credit: prev.credit - bet,
    }
  })

  const addPrize = (type = 'win') => setState((prev) => {
    const prize = type === 'win' ? prev.credit + prev.bet * 2 : prev.credit + prev.bet
    return {
      ...prev,
      bet: 0,
      credit: prize
    }
  })

  const { playingDeck, dealer, player } = useStartingDistribution(generateDeck())

  const startHandler = () => {
    setState((prev) => ({
      ...prev,
      bet: minBet,
      credit: prev.credit - minBet,
      deck: playingDeck,
      playerCards: player,
      dealerCards: dealer,
      gameStarted: true,
    }))
  }

  const restartHandler = () => {
    setState((prev) => ({
      ...prev,
      bet: minBet,
      playerCards: [],
      dealerCards: [],
      gameOver: false,
      gameStarted: false,
      disabled: false,
      mode: 'player'
    }))
  }

  const makeMove = useCallback((whom) => {
    const who = `${whom}Cards`;

    setState((prev) => {
      const { playingDeck, nextCard } = getNextCard(prev.deck);
      const personDeck = [...prev[who], nextCard];

      return {
        ...prev,
        deck: playingDeck,
        [who]: personDeck
      }
    })
  }, [])

  const actions = {
    hit: () => {
      makeMove('player')
      setBet()
    },
    double: () => {
      makeMove('player')
      setBet(2)
    },
    stand: () => {
      setBtnDisabled();
      setMode('dealer');
    }
  }

  const setActionHandler = (gameAction) => () => actions[gameAction]()

  useEffect(() => {
    setState((prev) => {
      const playerPoints = updateScore(prev.playerCards);
      const dealerPoints = updateScore(prev.dealerCards);

      return {
        ...prev,
        playerPoints,
        dealerPoints
      }
    })
  }, [state.playerCards, state.dealerCards])

  useEffect(() => {
    if (state.gameOver) {
      if (state.dealerPoints > winPoints) {
        showModal('You win')
        addPrize()
      }
      else if (state.playerPoints > winPoints) {
        showModal('You lose')
      }
      else if (state.playerPoints > state.dealerPoints && state.playerPoints <= winPoints) {
        showModal('You win')
        addPrize()
      }
      else if (state.playerPoints === state.dealerPoints) {
        showModal('Drow')
        addPrize('drow')
      }
      else {
        showModal('You lose')
      }

    }
  }, [state.gameOver, state.dealerPoints, state.playerPoints])

  useEffect(() => {
    const dealerMove = () => {
      setTimeout(() => {
        makeMove('dealer')
      }, 1000)
    }
    if (state.mode === 'player' && state.playerPoints > winPoints) setGameOver()
    if (state.mode === 'dealer') {
      if (state.dealerPoints > state.playerPoints) {
        setGameOver()
      }
      else {
        dealerMove()
      }
    }
  }, [state.dealerPoints, state.playerPoints, state.mode, makeMove])

  const ShowControls = () => {
    const isStarted = state.gameStarted

    return (
      <ButtonWrapper>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={isStarted ? () => restartHandler() : () => startHandler()}
        >
          {isStarted ? buttonList.gamePlay.restart : buttonList.gamePlay.start}
        </Button>
        { state.gameStarted && buttonList.gameProccess.map((button, index) => {
          return (
            <Button
              key={index}
              disabled={state.disabled}
              onClick={setActionHandler(button.label)}
            >
              {button.title}
            </Button>
          )
        })}
      </ButtonWrapper>
    )
  }

  const showCards = (cards, whom) => {
    if (!isEmpty(cards)) return cards.map((card, index) => {

      return (
        <Card
          key={index}
          top={whom === 'dealer'}
          bgp={card.background}
          points={card.points}
          left={index * 30}
          layer={10 + index}
        />
      )
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Body>
        <Modal message={modal.message} open={modal.open} hideAction={hideModal} />
        <GameBox>
          <GameField>
            <Points top>Points: <span>{state.dealerPoints}</span></Points>
            {showCards(state.dealerCards, 'dealer')}
            <Label top>Dealer Hand</Label>

            <Points bottom>Points: <span>{state.playerPoints}</span></Points>
            {showCards(state.playerCards, 'player')}
            <Label bottom>Player Hand</Label>

            <CardsWrapper>
              <CardCover src="images/cover.png" />
            </CardsWrapper>
          </GameField>

          <ControlPanel>
            <Statistic>
              <Money>${state.credit}</Money>
              <Bet>{state.gameStarted && `$${state.bet}`}</Bet>
            </Statistic>
            {ShowControls()}
          </ControlPanel>
        </GameBox>
      </Body>
    </ThemeProvider>
  );
}

export default App;
