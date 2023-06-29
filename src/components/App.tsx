import React from 'react'
import { useMemo, useState } from 'react'
import { styled } from 'styled-components'

import { ICard } from 'interfaces/card'

import CardList from './CardList'
import SearchModal from './SearchModal'
import getTotal from 'utils'


const AppContainer = styled.div`text-align: center;`
const CardLists = styled.div`
	display: flex;
	justify-content: center;`


const App = () => {
	
	const [myCards, setMyCards] = useState<ICard[]>([])
	const [theirCards, setTheirCards] = useState<ICard[]>([])
	const [modalArgs, setModalArgs] = useState<{onAdd: (card: ICard) => void} | undefined>(undefined)

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
						setModalArgs({onAdd: (card) => setMyCards((cards) => [...cards, {...card}])})
					}} disabled={modalArgs!==undefined}>Add Cards</button>
				</div>
				<div>{evaluation ? 'Fair' : 'Unfair'}</div>
				<div id='their-cards'>
					<h2>Their Cards</h2>
					<CardList cards={ theirCards } />
					<button onClick={() => { 
						setModalArgs({onAdd: (card) => setTheirCards((cards) => [...cards, {...card}])})
					}} disabled={modalArgs!==undefined}>Add Cards</button>
				</div>
			</CardLists>
			{(modalArgs !== undefined ? <SearchModal {...modalArgs} onClose={() => { setModalArgs(undefined)} }/>
			: null)}
		</AppContainer>
	)
}

export default App