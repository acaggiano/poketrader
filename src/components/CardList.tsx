import React from 'react'
import { useState } from 'react';

import CardDetails from './CardDetails';

import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { ICard } from 'interfaces/card';

type CardListProps = {
    cards: ICard[] | undefined
}

const CardList = ({cards}: CardListProps) => {
  return (
        <div>
          {(cards??[]).map((c: ICard, i: number) => 
              <CardDetails  key={i} card={c} />
          )}
        </div>
  )
}

export default CardList