import React from 'react'
import CardDetails from './CardDetails'
import { ICard } from 'interfaces/card'

type SearchResultsProps = {
    cards: ICard[],
    error: any,
    onSubmit: (card: ICard, reversePrice: boolean) => void
}

const SearchResults = ({ cards , onSubmit, error }: SearchResultsProps) => {

    if (cards.length > 0) {
        return (
            <div>
                <h2>Search Results</h2>
                <div>
                {(cards??[]).map(c => 
                    <div key={c.id}>
                        <CardDetails card={c} includePrice={false} />
                        {c.tcgplayer?.prices?.holofoil?.market || c.tcgplayer?.prices?.normal?.market ? (<button onClick={ () => { onSubmit(c, false) }}>Add</button>) : (<p>price not found</p>)}
                        
                        {c.tcgplayer?.prices?.reverseHolofoil?.market ? (<button onClick={ () => { onSubmit(c, true) }}>Add Reverse</button>): null}
                    </div>
                )}
                </div>
                
            </div>
        )
    }

    else if (error) return <p>{error}</p>

       
    else return null
}

export default SearchResults