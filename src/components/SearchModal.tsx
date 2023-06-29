import React from 'react'
import axios from 'axios'

import { useState } from 'react'

import { ICard } from 'interfaces/card'

import SearchBar from './SearchBar'
import SearchResults from './SearchResults'


type Props = {
    onAdd: (card: ICard) => void
    onClose: any
}

export default function SearchModal({onAdd, onClose}: Props) {

    const [searchInput, setSearchInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [searchCards, setSearchCards] = useState<ICard[]>([])
    const [error, setError] = useState<any>()

    function handleSearchChange(e: React.ChangeEvent) {
		let element = e.target as HTMLInputElement
		setSearchInput(element.value)
	}

    const getCards = async (searchQuery: string) => {
		setSearchCards([])
		try {
			setIsLoading(true)
			const baseURL = 'https://api.pokemontcg.io/v2/cards?q=name:'
			const _results = (await axios.get(baseURL + searchQuery))
			if ((!Array.isArray(_results.data.data)) || (_results.data.data).length > 0) {
				const results: ICard[] = _results.data.data.map((c: ICard) => ({...c, price: c.tcgplayer?.prices?.normal?.market || c.tcgplayer?.prices?.holofoil?.market }))
				setSearchCards(results)
			}
			else {
				if (searchQuery.toLowerCase() === 'klingklang')
					setError('Silly Danny')
				else
					setError('No Results Found')
			}
				
		}
		catch (responseError) {
			let errorMessage = 'Something went wrong. Please Try Again.'
			if (responseError instanceof Error)
				errorMessage = responseError.message

			setError(errorMessage)
			
		}
		finally {
			setIsLoading(false)
		}
		
	}
  return (
    <div id='search-modal'>
        <SearchBar query={ searchInput } onChange={ handleSearchChange }/>
        <button onClick={() => {  getCards(searchInput) }}>Search</button>
        <button onClick={() => { onClose() }}>Close Search</button>
        {isLoading ? <p>LOADING...</p> :
        <SearchResults cards={ searchCards } error={error} onSubmit={ (card: ICard, reversePrice: boolean) => { 
            onAdd({...card, price: reversePrice?card.tcgplayer?.prices?.reverseHolofoil?.market:card.price}) 
        }} />}			
	</div>
  )
}