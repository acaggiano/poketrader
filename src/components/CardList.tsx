import React, { useMemo } from 'react'

import CardDetails from './CardDetails'

import { ICard } from 'interfaces/card'

type CardListProps = {
    cards: ICard[] | undefined
}

const CardList = ({cards}: CardListProps) => {

  const sum  = useMemo(() => cards!.reduce((accumulator, currentValue) =>  accumulator + currentValue.price!, 0), [cards]) 
  
  return (
        <div>
          {(cards??[]).map((c: ICard, i: number) => 
            <div key={i} >
              <CardDetails card={c} includePrice={true} />
            </div>
          )}
          <p>Total: ${(sum).toFixed(2)}</p>
        </div>
  )
}

export default CardList