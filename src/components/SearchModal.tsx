import React from 'react'

import { useState } from 'react'
import { useDebounce } from 'hooks/useDebounce'

import { ICard } from 'interfaces/card'
import { useGetCards } from 'utils/useGetCards'

import SearchBar from 'components/SearchBar'
import SearchResults from 'components/SearchResults'
import { styled } from 'styled-components'

const SearchContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    top: 0;
    left: 0
    z-index: 100;
    overflow-x: hidden;
    background-color: rgba(0,0,0,.5);
    height: 100vh;
    width: 100vw;`

const SearchTools = styled.div`
margin: 10px auto auto auto;
background-color: white;
padding: 20px;
border-radius: 10px;
min-width: 25vw;`

const SearchBarWrapper = styled.div`
position: relative;`

const CloseButton = styled.button`
display: inline-block; 
position: absolute;
right: 0`



type SearchModalProps = {
    onAdd: (card: ICard) => void
    onClose: () => void
}

export default function SearchModal({onAdd, onClose}: SearchModalProps) {

    const [searchInput, setSearchInput] = useState('')
    const debouncedQuery = useDebounce(searchInput)
    const cards = useGetCards(debouncedQuery)
   
  return (
    <SearchContainer>
        <SearchTools>
            <SearchBarWrapper>
                <SearchBar query={ searchInput } onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value) } />   
                <CloseButton onClick={() => { onClose() }}>X</CloseButton>
            </SearchBarWrapper>
            {cards.isLoading ? <p>LOADING...</p> :
            <SearchResults cards={ cards.data } error={cards.error?.message} onSubmit={ (card: ICard, reversePrice: boolean) => { 
                onAdd({...card, price: reversePrice?card.tcgplayer?.prices?.reverseHolofoil?.market:card.price}) 
            }} />}	
        </SearchTools>		
	</SearchContainer>
  )
}