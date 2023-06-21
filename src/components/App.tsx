import React from 'react'
import axios from 'axios'

import { useState, useMemo } from 'react'

import SearchBar from './SearchBar'
import CardList from './CardList'
import SearchResults from './SearchResults'
import { ICard } from 'interfaces/card'


const App = () => {
    
    const [searchInput, setSearchInput] = useState('')
    const [searchCards, setSearchCards] = useState<ICard[]>([])
    const [selectedCards, setSelectedCards] = useState<ICard[]>([]) 

    function handleSearchChange(e: React.ChangeEvent) {
        let element = e.target as HTMLInputElement
        setSearchInput(element.value)
    }

    const getCards = async (searchQuery: string) => {
        try {
            const baseURL = 'https://api.pokemontcg.io/v2/cards?q=name:'
            const _results = (await axios.get(baseURL + searchQuery))
            console.log(_results)
            
            const results: ICard[] = _results.data.data.map((c: ICard) => ({...c, price: c.tcgplayer?.prices?.normal?.market || c.tcgplayer?.prices?.holofoil?.market }))

            setSearchCards(results)
        }
        catch (error) {
            console.log(error)
        }
    }

    const sum  = useMemo(() => selectedCards.reduce((accumulator, currentValue) =>  accumulator + currentValue.price!, 0), [selectedCards]) 

    
  return (
    <div className='App'>  
        <CardList cards={ selectedCards } />
        <p>Total: ${(sum).toFixed(2)}</p>
        <SearchBar query={ searchInput } onChange={ handleSearchChange }/>
        <button onClick={() => {  getCards(searchInput) }}>Search</button>
        <SearchResults cards={ searchCards } onSubmit= { (card: ICard, reversePrice: boolean) => { 

            setSelectedCards(cards => [...cards, {...card, price: reversePrice?card.tcgplayer?.prices?.reverseHolofoil?.market:card.price}]) 

        }} />
    </div>
  )
}

export default App