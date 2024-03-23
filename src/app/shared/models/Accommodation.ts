export interface Accommodation {
  id? : number,
  name? : string,
  type? : string,
  address? : string,
  imageName?: string,
  tripCount?: number
}

export class CAccommodation implements Accommodation {
  constructor(
    id? : number,
    name? : string,
    type? : string,
    address? : string,
    imageName?: string,
    tripCount?: number
  ){}
}
