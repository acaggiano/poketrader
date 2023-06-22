import React from 'react'
import axios from 'axios'

import { useState } from 'react'

import SearchBar from './SearchBar'
import CardList from './CardList'
import SearchResults from './SearchResults'
import { ICard } from 'interfaces/card'


const App = () => {
    
    const [searchInput, setSearchInput] = useState('')
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
    }

    

  return (
    <div className='App'>  
        <h1>PokeTrader</h1>
        <div id='card-lists'>
            <div id='my-cards' className='card-block'>
                <h2>My Cards</h2>
                <CardList cards={ myCards } />
                <button onClick={() => { 
                    setWhoseCards('mine')
                    setSearchInput('')
                    setSearchCards([])
                    setSearchOpen(true)
                }} disabled={searchOpen}>Add Cards</button>
            </div>
            <div id='their-cards' className='card-block'>
                <h2>Their Cards</h2>
                <CardList cards={ theirCards } />
                <button onClick={() => {
                    setWhoseCards('theirs')
                    setSearchInput('')
                    setSearchCards([])
                    setSearchOpen(true)
                }} disabled={searchOpen}>Add Cards</button>
            </div>
        </div>
        {(searchOpen ? 
        <div>
            <SearchBar query={ searchInput } onChange={ handleSearchChange }/>
            <button onClick={() => {  getCards(searchInput) }}>Search</button>
            <button onClick={() => {
                setSearchOpen(false)
                setSearchInput('')
                setSearchCards([])

            }}>Close Search</button>
            <SearchResults cards={ searchCards } error={error} onSubmit= { (card: ICard, reversePrice: boolean) => { 
                if (whoseCards === 'mine')
                    setMyCards(cards => [...cards, {...card, price: reversePrice?card.tcgplayer?.prices?.reverseHolofoil?.market:card.price}]) 
                else if (whoseCards === 'theirs')
                    setTheirCards(cards => [...cards, {...card, price: reversePrice?card.tcgplayer?.prices?.reverseHolofoil?.market:card.price}]) 

            }} />
            
        </div>: null)}
    </div>
  )
}

export default App