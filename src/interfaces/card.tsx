export interface IAPICard {
    id?: string,
    name?: string,
    set?: { name?: string, total?: number },
    number?: number,
    tcgplayer?: { prices?: { holofoil?: {market?: number}, normal?: {market?: number}, reverseHolofoil?: {market?: number}} }
}

export interface ICard extends IAPICard {
    price?: number
}