export class PriceCalculatorService {
  calculateMenuPrice(pricePerPerson: number, min_people: number, nb_peoples: number) {
    const reduction = 0.9
    let menuPrice = pricePerPerson * nb_peoples

    if (nb_peoples >= min_people + 5) {
      menuPrice = menuPrice * reduction
    }

    return menuPrice
  }
}
