import React from 'react';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import App from './components/App';
import './App.css';

const queryClient = new QueryClient()

function MainApp() {

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </main>
  );

}

const Modal = (props: { modal: boolean, unSetModal: Function }) => {

  
  return(
    <div id='modal'>
      <label>
        <input type='radio' value='holo'/>Holographic
      </label>
      <label>
        <input type='radio' value='normal'/>Normal
      </label>
      <label>
        <input type='radio' value='reverse'/>Reverse Holo
      </label>
      <button onClick={() => props.unSetModal}>Close</button>
    </div>
  )
}

// const SearchBar = () => {

// }

// const SearchResult = () => {

//   // <div key={c.id}>
//   //   <p className='search-result'>{c.name}, {c.set.name} {c.number}/{c.set.total}</p> 
//   //   <label htmlFor={'holotype-'+ c.id}><input name={'holotype-'+ c.id} type='radio' value='holo' checked={holoType === 'holo'} onChange={() => setHoloType('holo')}/>holo</label>
//   //   <label htmlFor={'holotype-'+ c.id}><input name={'holotype-'+ c.id} type='radio' value='normal' checked={holoType === 'normal'} onChange={() => setHoloType('normal')}/>normal</label>
//   //   <label htmlFor={'holotype-'+ c.id}><input name={'holotype-'+ c.id} type='radio' value='reverse' checked={holoType === 'reverse'} onChange={() => setHoloType('reverse')}/>reverse</label>
//   //   <button onClick={() => {setSelectedCards([...selectedCards, c]); getPrice(c)}}>Add Card</button>
//   // </div>
//   return(
//     <div>
      
//     </div>
//   )
// }



// const CardList = () => { 

//   const [searchCards, setSearchCards] = useState<PokemonTCG.Card[]>([]);
//   const [selectedCards, setSelectedCards] = useState<PokemonTCG.Card[]>([]);
  
//   const [holoType, setHoloType] = useState('normal');
//   const [price, setPrice] = useState(0);
//   const [total, setTotal] = useState(0);
//   //const [evaluation, setEvaluation] = useState('')

//   const getPrice = (card: PokemonTCG.Card) => {
//     if(holoType === 'holo')
//       setPrice(Number(card.tcgplayer?.prices.holofoil?.market))
//     else if(holoType === 'normal') 
//       setPrice(Number(card.tcgplayer?.prices.normal?.market))
//     else if(holoType === 'reverse')
//       setPrice(Number(card.tcgplayer?.prices.reverseHolofoil?.market))
//     else 
//       setPrice(0)
//   }

//   return (
//     <div>
      
      


//       <div>
//         <h2>Search Results</h2>
//         <div>
//           {searchCards.map(c => 
//               <div key={c.id}>
//                 <p className='search-result'>{c.name}, {c.set.name} {c.number}/{c.set.total}</p> 
//                 <label htmlFor={'holotype-'+ c.id}><input name={'holotype-'+ c.id} type='radio' value='holo' checked={holoType === 'holo'} onChange={() => setHoloType('holo')}/>holo</label>
//                 <label htmlFor={'holotype-'+ c.id}><input name={'holotype-'+ c.id} type='radio' value='normal' checked={holoType === 'normal'} onChange={() => setHoloType('normal')}/>normal</label>
//                 <label htmlFor={'holotype-'+ c.id}><input name={'holotype-'+ c.id} type='radio' value='reverse' checked={holoType === 'reverse'} onChange={() => setHoloType('reverse')}/>reverse</label>
//                 <button onClick={() => {setSelectedCards([...selectedCards, c]); getPrice(c)}}>Add Card</button>
//               </div>
//           )}
//         </div>
        
//       </div>
//     </div>
//   )
// }



export default MainApp;
