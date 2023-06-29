import React, { useMemo } from 'react'

import CardDetails from './CardDetails'

import { ICard } from 'interfaces/card'
import getTotal from 'utils'
import { styled } from 'styled-components'

type CardListProps = {
    cards: ICard[] | undefined
}

const CardListContainer = styled.div`
  padding: 20px;
  min-width: 400px;`

const CardList = ({cards}: CardListProps) => {

  const sum  = useMemo(() => getTotal(cards!), [cards]) 
  
  return (
        <CardListContainer>
          {(cards??[]).map((c: ICard, i: number) => 
            <div key={i} >
              <CardDetails card={c} includePrice={true} />
            </div>
          )}
          <p>Total: ${(sum).toFixed(2)}</p>
        </CardListContainer>
  )
}

export default CardList