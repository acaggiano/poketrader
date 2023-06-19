import React from 'react'
import { useState } from 'react';

import CardDetails from './CardDetails';

import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { ICard } from '../interfaces/card';

type Props = {
    cards: ICard[] | undefined
}

const CardList = ({cards}: Props) => {
  return (
    <div>
      <div>
        <div>
          {cards?.map(c => 
              <CardDetails card={c} />
          )}
        </div>
        
      </div>
    </div>
  )
}

export default CardList