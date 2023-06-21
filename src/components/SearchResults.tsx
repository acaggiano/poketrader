import React from 'react'
import CardDetails from './CardDetails'
import { ICard } from 'interfaces/card'

type SearchResultsProps = {
    cards: ICard[],
    onSubmit: (card: ICard, reversePrice: boolean) => void
}

const SearchResults = ({ cards , onSubmit }: SearchResultsProps) => {

    if (cards) {
        return (
            <div>
                <h2>Search Results</h2>
                <div>
                {(cards??[]).map(c => 
                    <div key={c.id}>
                        <CardDetails card={c} includePrice={false} />
                        <button onClick={ () => { onSubmit(c, false) }}>Add</button>
                        {c.tcgplayer?.prices?.reverseHolofoil?.market ? (<button onClick={ () => { onSubmit(c, true) }}>Add Reverse</button>): null}
                    </div>
                )}
                </div>
                
            </div>
        )
    }

    else return null
}

export default SearchResults