import React, { useMemo, useState } from 'react'
import CardDetails from 'components/CardDetails'
import { ICard } from 'interfaces/card'
import Pagination from 'components/Pagination'

type SearchResultsProps = {
    cards: ICard[] | undefined,
    error: any,
    onSubmit: (card: ICard, reversePrice: boolean) => void
}

let PageSize = 10

const SearchResults = ({ cards , onSubmit, error }: SearchResultsProps) => {

    const [currentPage, setCurrentPage] = useState<number>(1)

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        return cards !== undefined ? cards.slice(firstPageIndex, lastPageIndex) : []
      }, [currentPage, cards])

    if (currentTableData.length > 0) {
        return (
            <div>
                <h2>Search Results</h2>
                <div>
                {(currentTableData??[]).map(c => 
                    <div key={c.id}>
                        <CardDetails card={c} includePrice={false} />
                        {c.tcgplayer?.prices?.holofoil?.market || c.tcgplayer?.prices?.normal?.market ? (<button onClick={ () => { onSubmit(c, false) }}>Add</button>) : (<p>price not found</p>)}
                        
                        {c.tcgplayer?.prices?.reverseHolofoil?.market ? (<button onClick={ () => { onSubmit(c, true) }}>Add Reverse</button>): null}
                    </div>
                )}
                </div>
                <Pagination
                currentPage={currentPage}
                totalCount={cards!.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
                />
            </div>
            

        )
    }

    else if (error) return <p>{error}</p>

       
    else return <div>No Result Found</div>
}

export default SearchResults