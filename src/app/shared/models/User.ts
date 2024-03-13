export interface User {
  id? : number,
  username? : string,
  name? : string,
  familyName? : string,
  email? : string,
  identityDocument? : string,
  identityNumber? : string,
  password? : string,
  authorities? : string[],
}

export class CUser implements User {
  constructor(
    public id?: number,
    public username?: string,
    public name?: string,
    public familyName?: string,
    public email?: string,
    public identityDocument?: string,
    public identityNumber?: string,
    password?: string,
    public authorities?: string[],
  ) {}
}
