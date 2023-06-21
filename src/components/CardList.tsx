import React from 'react'

import CardDetails from './CardDetails'

import { ICard } from 'interfaces/card'

type CardListProps = {
    cards: ICard[] | undefined
}



const CardList = ({cards}: CardListProps) => {
  
  return (
        <div>
          {(cards??[]).map((c: ICard, i: number) => 
            <div key={i} >
              <CardDetails card={c} includePrice={true} />
            </div>
          )}
        </div>
  )
}

export default CardList