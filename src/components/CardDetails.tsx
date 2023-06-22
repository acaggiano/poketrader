import React from 'react'

import { ICard } from 'interfaces/card'

type CardDetailsProps = {
    card: ICard,
    includePrice: boolean
}

const CardDetails = ({ card, includePrice }: CardDetailsProps) => {

    if (includePrice) 
        return <p className='card-details'>{card.name}, {card.set?.name} {card.number}/{card.set?.total} Price: ${ (card.price??0).toFixed(2) } </p> 
        
    return <p className='card-details'>{card.name}, {card.set?.name} {card.number}/{card.set?.total}</p>

}

export default CardDetails