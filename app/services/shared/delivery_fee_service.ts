type OsrmResponse = {
  routes: [{ distance: number }]
}

export class DeliveryFeeService {
  async calculateDistance(longitude: number, latitude: number) {
    const bordeauxLongitude = -0.56997
    const bordeauxLatitude = 44.84151

    const response = await fetch(
      `http://router.project-osrm.org/route/v1/car/${bordeauxLongitude},${bordeauxLatitude};${longitude},${latitude}`
    )
    const data = (await response.json()) as OsrmResponse
    const distanceBetween: number = data.routes[0].distance
    return distanceBetween
  }

  calculateFees(distanceMeters: number, zipCode: string) {
    const zipCodesFree = ['33000', '33100', '33200', '33300', '33800']
    const valideZipCode = zipCodesFree.find((zip) => zip === zipCode)

    if (valideZipCode) return 0

    return 5 + (distanceMeters / 1000) * 0.59
  }
}
