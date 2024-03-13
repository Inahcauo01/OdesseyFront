export interface Accommodation {
  id? : number,
  name? : string,
  type? : string,
  address? : string,
  imageName?: string
}

export class CAccommodation implements Accommodation {
  constructor(
    id? : number,
    name? : string,
    type? : string,
    address? : string,
    imageName?: string
  ){}
}
