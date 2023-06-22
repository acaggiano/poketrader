import React from 'react'

type Props = {
  query: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function SearchBar({query, onChange}: Props) {
  
  return(
    <div>
      <input value={query} onChange={ onChange }></input>
    </div>
  )
}

export default SearchBar