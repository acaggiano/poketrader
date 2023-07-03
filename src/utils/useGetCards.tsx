import axios, { AxiosError }from 'axios'
import { ICard } from 'interfaces/card'
import { useQuery } from 'react-query'

export const useGetCards = (searchQuery: string) => {

    const _get = async (query: string) => {
        const _results = (await axios.get(`https://api.pokemontcg.io/v2/cards?q=name:"*${encodeURIComponent(query)}*"`)).data.data

        const results: ICard[] = _results.map((c: ICard) => ({...c, price: c.tcgplayer?.prices?.normal?.market || c.tcgplayer?.prices?.holofoil?.market }))

        return results
    }

    const query = useQuery(['getCards', searchQuery], () => _get(searchQuery), {
        onError: (err: AxiosError) => err,
        enabled: !!searchQuery,
        staleTime: Infinity,
        cacheTime: Infinity
    })

    return query
    
}

