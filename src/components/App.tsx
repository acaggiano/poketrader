import React, { useMemo } from 'react'
import axios from 'axios'

import { useState } from 'react'

import SearchBar from './SearchBar'
import CardList from './CardList'
import SearchResults from './SearchResults'
import { ICard } from 'interfaces/card'
import getTotal from 'utils'
import { styled } from 'styled-components'

const AppContainer = styled.div`text-align: center;`
const CardLists = styled.div`
	display: flex;
	justify-content: center;`


const App = () => {
	
	const [searchInput, setSearchInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [searchCards, setSearchCards] = useState<ICard[]>([])
	const [searchOpen, setSearchOpen] = useState(false)
	const [myCards, setMyCards] = useState<ICard[]>([])
	const [theirCards, setTheirCards] = useState<ICard[]>([])
	const [error, setError] = useState<any>()
	const [whoseCards, setWhoseCards] = useState<'mine' | 'theirs'>()

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

	const myTotal = useMemo(() => getTotal(myCards), [myCards])
	const theirTotal = useMemo(() => getTotal(theirCards), [theirCards])

	const evaluation = useMemo(() => (myTotal * .95 <= theirTotal && theirTotal <= myTotal * 1.05) || (theirTotal * .95 <= myTotal && myTotal <= theirTotal * 1.05), [myTotal, theirTotal])

	return (
		<AppContainer>  
			<h1>PokeTrader</h1>
			<CardLists>
				<div id='my-cards'>
					<h2>My Cards</h2>
					<CardList cards={ myCards } />
					<button onClick={() => { 
						setWhoseCards('mine')
						setSearchInput('')
						setSearchCards([])
						setSearchOpen(true)
					}} disabled={searchOpen}>Add Cards</button>
				</div>
				<div>{evaluation ? 'Fair' : 'Unfair'}</div>
				<div id='their-cards'>
					<h2>Their Cards</h2>
					<CardList cards={ theirCards } />
					<button onClick={() => {
						setWhoseCards('theirs')
						setSearchInput('')
						setSearchCards([])
						setSearchOpen(true)
					}} disabled={searchOpen}>Add Cards</button>
				</div>
			</CardLists>
			{(searchOpen ? 
			<div id='search-modal'>
				<SearchBar query={ searchInput } onChange={ handleSearchChange }/>
				<button onClick={() => {  getCards(searchInput) }}>Search</button>
				<button onClick={() => {
					setSearchOpen(false)
					setSearchInput('')
					setSearchCards([])

				}}>Close Search</button>
				{isLoading ? <p>LOADING...</p> :
				<SearchResults cards={ searchCards } error={error} onSubmit= { (card: ICard, reversePrice: boolean) => { 
					if (whoseCards === 'mine')
						setMyCards(cards => [...cards, {...card, price: reversePrice?card.tcgplayer?.prices?.reverseHolofoil?.market:card.price}]) 
					else if (whoseCards === 'theirs')
						setTheirCards(cards => [...cards, {...card, price: reversePrice?card.tcgplayer?.prices?.reverseHolofoil?.market:card.price}]) 

				}} />}
				
			</div>: null)}
		</AppContainer>
	)
}

export default App