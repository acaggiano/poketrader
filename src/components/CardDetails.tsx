import React from 'react'

import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { ICard } from 'interfaces/card'

type CardDetailsProps = {
    card: ICard
}


const CardDetails = ({ card }: CardDetailsProps) => {
  return (
    <div>
        <p className='card-details'>{card.name}, {card.set?.name} {card.number}/{card.set?.total}</p> 
    </div>
  )
}

export default CardDetails