import React, { useMemo } from 'react'

import CardDetails from 'components/CardDetails'

import { ICard } from 'interfaces/card'
import getTotal from 'utils/getTotal'
import { styled } from 'styled-components'

type CardListProps = {
    cards: ICard[] | undefined,
    title: string
}

const CardListContainer = styled.div`
  padding: 20px;
  min-width: 400px;`

const CardList = ({cards, title}: CardListProps) => {

  const sum  = useMemo(() => getTotal(cards!), [cards]) 
  
  return (
        <CardListContainer>
          <h2>{title}</h2>
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