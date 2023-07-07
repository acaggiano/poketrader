import React from 'react'

import { ICard } from 'interfaces/card'
import { styled } from 'styled-components'

type CardDetailsProps = {
    card: ICard,
    includePrice: boolean
}

const CardDetailContainer = styled.p`
    text-align: left;
    span {
        
        float: right;
    }`

const CardDetails = ({ card, includePrice }: CardDetailsProps) => {

    if (includePrice) 
        return <CardDetailContainer className='card-details'>{card.name}, {card.set?.name} {card.number}/{card.set?.total} <span>Price: ${ (card.price??0).toFixed(2) }</span> </CardDetailContainer> 
        
    return <CardDetailContainer className='card-details'>{card.name}, {card.set?.name} {card.number}/{card.set?.total}</CardDetailContainer>

}

export default CardDetails