import React, { useEffect } from 'react'
import CardDetails from './CardDetails'
import HoloType from './HoloType'
import { ICard } from 'interfaces/card'

type SearchResultsProps = {
    cards: ICard[],
    onSubmit: (card: ICard) => void
}

const SearchResults = ({ cards , onSubmit }: SearchResultsProps) => {
    if (cards) {
        return (
            <div>
                <h2>Search Results</h2>
                <div>
                {(cards??[]).map(c => 
                    <div key={c.id}>
                        <CardDetails card={c}/>
                        <button onClick={ () => { onSubmit(c) }}>Add</button>
                    </div>
                )}
                </div>
                
            </div>
        )
    }

    else return null
}

export default SearchResults