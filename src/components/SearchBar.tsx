import React from 'react'

type Props = {
  query: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function SearchBar({query, onChange}: Props) {
  
  return(
    <input placeholder='Search Card Name' value={query} onChange={ onChange }></input>
  )
}

export default SearchBar