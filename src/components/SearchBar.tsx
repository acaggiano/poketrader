import React from 'react'

type Props = {
  query: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function SearchBar({query, onChange}: Props) {
  
  return(
    <input value={query} onChange={ onChange }></input>
  )
}

export default SearchBar