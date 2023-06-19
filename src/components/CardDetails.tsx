import React from 'react'

import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { ICard } from '../interfaces/card'

type Props = {
    card: ICard
}


const CardDetails = ({ card }: Props) => {
  return (
    <div key={card.id}>
        <p className='card-details'>{card.name}, {card.set?.name} {card.number}/{card.set?.total}</p> 
    </div>
  )
}

export default CardDetails