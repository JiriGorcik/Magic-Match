import React from "react"

const Card = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
      if(!disabled) {
        handleChoice(card)
      }
    }

  return (
    <div className="card relative">
      <div className={flipped ? "flipped" : ""}>
        <img
          src={card.src}
          className="front w-full block border-2 border-solid border-white rounded-md"
          alt="card front"
        />
        <img
          src="/img/cover.png"
          className="back w-full block border-2 border-solid border-white rounded-md"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  )
}

export default Card
