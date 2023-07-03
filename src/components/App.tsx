import React from 'react'
import { useMemo, useState } from 'react'
import { styled } from 'styled-components'

import { ICard } from 'interfaces/card'

import CardList from 'components/CardList'
import SearchModal from 'components/SearchModal'
import getTotal from 'utils/getTotal'


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

	const evaluation = useMemo(() => (myTotal * .90 <= theirTotal && theirTotal <= myTotal * 1.1) || (theirTotal * .90 <= myTotal && myTotal <= theirTotal * 1.10), [myTotal, theirTotal])

	return (
		<AppContainer>  
			<h1>PokeTrader</h1>
			<CardLists>
				<div id='my-cards'>
					<CardList cards={ myCards } title='My Cards' />
					<button onClick={() => { 
						setModalArgs({onAdd: (card) => setMyCards((cards) => [...cards, {...card}])})
					}} disabled={modalArgs!==undefined}>Add Cards</button>
				</div>
				<div>{evaluation ? 'Fair' + String.fromCodePoint(128077) : 'Unfair' + String.fromCodePoint(128078)}</div>
				<div id='their-cards'>
					<CardList cards={ theirCards } title='Their Cards'/>
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