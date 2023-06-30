import { ICard } from "interfaces/card"

function getTotal(cards: ICard[]) {
    const sum:number  = cards!.reduce((accumulator, currentValue) =>  accumulator + currentValue.price!, 0)

    return sum
}

export default getTotal