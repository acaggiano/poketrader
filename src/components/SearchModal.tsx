import React from 'react'

import { useState } from 'react'
import { useDebounce } from 'hooks/useDebounce'

import { ICard } from 'interfaces/card'
import { useGetCards } from 'utils/useGetCards'

import SearchBar from 'components/SearchBar'
import SearchResults from 'components/SearchResults'



type SearchModalProps = {
    onAdd: (card: ICard) => void
    onClose: () => void
}

export default function SearchModal({onAdd, onClose}: SearchModalProps) {

    const [searchInput, setSearchInput] = useState('')
    const debouncedQuery = useDebounce(searchInput)
    const cards = useGetCards(debouncedQuery)
   
  return (
    <div id='search-modal'>
        <SearchBar query={ searchInput } onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value) }/>
        <button onClick={() => {  cards.refetch() }}>Search</button>
        <button onClick={() => { onClose() }}>Close Search</button>
        {cards.isLoading ? <p>LOADING...</p> :
        <SearchResults cards={ cards.data } error={cards.error?.message} onSubmit={ (card: ICard, reversePrice: boolean) => { 
            onAdd({...card, price: reversePrice?card.tcgplayer?.prices?.reverseHolofoil?.market:card.price}) 
        }} />}			
	</div>
  )
}