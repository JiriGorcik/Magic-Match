import React, { useEffect, useState } from "react"
import Card from "./components/Card"

const cardImages = [
  { src: "./helmet-1.png", matched: false },  
  { src: "./potion-1.png", matched: false },
  { src: "./ring-1.png", matched: false },
  { src: "./scroll-1.png", matched: false },
  { src: "./shield-1.png", matched: false },
  { src: "./sword-1.png", matched: false },
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // hadle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected card
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })

        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <div className="max-w-[860px]">
        <h1 className="font-bold mt-10 text-4xl">Magic Match</h1>
        <button
          onClick={shuffleCards}
          className="bg-none border-[2px] border-solid border-white py-[6px] px-3 text-white font-bold cursor-pointer text-lg hover:bg-[#c23866] hover:text-white mt-5"
        >
          New Game
        </button>

        <div className="mt-10 grid grid-cols-4 gap-5">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <p className="mt-5">Turns: {turns}</p>
    </div>
  )
}

export default App
