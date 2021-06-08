export class CreditCard {
  constructor(public id: number, public name: string, public number: string, public cvc: string, public expiryDate: Date) {

  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      number: this.number,
      cvc: this.cvc,
      expiry_date: this.expiryDate,
    }
  }

  fromJSON(data): CreditCard {
    return new CreditCard(data.id, data.name, data.number, data.cvc, new Date(data.expiry_date));
  }
}
