import React, { useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

import { useState } from 'react'

import SearchBar from './SearchBar'
import CardList from './CardList'
import CardDetails from './CardDetails'
import SearchResults from './SearchResults'
import HoloType from './HoloType'
import { ICard } from '../interfaces/card'




type Props = {}

const App = ({}: Props) => {
    
    const [searchInput, setSearchInput] = useState('')
    const [searchCards, setSearchCards] = useState<ICard[]>([])
    const [selectedCards, setSelectedCards] = useState<ICard[]>([])  
    const [holoType, setHoloType] = useState('normal')
    const [price, setPrice] = useState(0)
    const [total, setTotal] = useState(0)

    function handleSearchChange(e: React.ChangeEvent) {
        let element = e.target as HTMLInputElement
        setSearchInput(element.value)
    }

    function handleAddCard(card: {}) {
        console.log(card)
        
        const updateCards = [...selectedCards, card ]

        setSelectedCards(updateCards)
    }

    const getCards = async (searchQuery: string) => {
        try {
            const baseURL = 'https://api.pokemontcg.io/v2/cards?q=name:'
            const results = await axios.get(baseURL + searchQuery)
            setSearchCards(results.data.data)
        }
        catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='App'>  
        <CardList cards={ selectedCards }/>
        <SearchBar query={ searchInput } onChange={ handleSearchChange }/>
        <button onClick={() => {  getCards(searchInput) }}>Search</button>
        <SearchResults cards={ searchCards } onSubmit= { handleAddCard } />
    </div>
  )
}

export default App