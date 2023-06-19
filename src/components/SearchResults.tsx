import React, { useEffect } from 'react'
import CardDetails from './CardDetails'
import HoloType from './HoloType'
import { ICard } from '../interfaces/card'

type Props = {
    cards: ICard[],
    onSubmit: any
}

const SearchResults = ({ cards , onSubmit }: Props) => {
    if (cards) {
        return (
            <div>
                <h2>Search Results</h2>
                <div>
                {cards?.map(c => 
                    <div key={c.id}>
                    <CardDetails card={c}/>
                    <button onClick={ () => {onSubmit(c) }}>Add</button>
                    </div>
                )}
                </div>
                
            </div>
        )
    }

    else return <div></div>
}

export default SearchResults