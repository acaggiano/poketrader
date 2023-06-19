import React from 'react'

type Props = {

}

const HoloType = () => {
  return (
    <div>
        <label htmlFor='holotype'><input name='holotype' type='radio' value='holo'/>holo</label>
        <label htmlFor='holotype'><input name='holotype' type='radio' value='normal'/>normal</label>
        <label htmlFor='holotype'><input name='holotype' type='radio' value='reverse'/>reverse</label>
        <button onClick={() => { /* add card to selectedCards and get price info */}}> Add Card</button>
    </div>
  )
}

export default HoloType