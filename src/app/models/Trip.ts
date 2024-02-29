export interface Trip {
  id? : number,
  departureDate? : Date,
  duration? : number,
  cost? : number,
  status? : string,
  seats? : number,
  accommodation? : string,
  city? : string,
  country? : string,
  title? : string,
  description? : string,
}

export class CTrip implements Trip {
  constructor(
    id? : number,
    departureDate? : Date,
    duration? : number,
    cost? : number,
    status? : string,
    seats? : number,
    accommodation? : string,
    city? : string,
    country? : string,
    title? : string,
    description? : string,
  ){}
}
