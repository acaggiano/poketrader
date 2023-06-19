import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

type Props = {
  query: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function SearchBar({query, onChange}: Props) {
  
  return(
    <div>
      <input value={query} onChange={ onChange }></input>
    </div>
  )
}

export default SearchBar