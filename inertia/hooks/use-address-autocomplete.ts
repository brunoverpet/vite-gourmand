import { useState, useEffect } from 'react'

export type AddressSuggestion = {
  fulltext: string
  x: number
  y: number
  city: string
  zipcode: string
}

export type CitySuggestion = {
  fulltext: string
  city: string
  zipcode: string
}

export function useAddressAutocomplete(initialAddress = '', initialCity = '') {
  const [address, setAddress] = useState(initialAddress)
  const [city, setCity] = useState(initialCity)
  const [zipcode, setZipcode] = useState('')
  const [longitude, setLongitude] = useState<number | null>(null)
  const [latitude, setLatitude] = useState<number | null>(null)
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([])

  useEffect(() => {
    if (!initialAddress) return
    const query = initialCity ? `${initialAddress} ${initialCity}` : initialAddress
    fetch(
      `https://data.geopf.fr/geocodage/completion/?text=${encodeURIComponent(query)}&terr=METROPOLE&maximumResponses=1`
    )
      .then((r) => r.json())
      .then((data) => {
        const first: AddressSuggestion | undefined = data.results?.[0]
        if (!first) return
        setLongitude(first.x)
        setLatitude(first.y)
        setZipcode(first.zipcode)
        if (!initialCity) setCity(first.city)
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchSuggestions(value: string) {
    if (value.length < 3) {
      setSuggestions([])
      return
    }
    const zipcodeParam = zipcode ? `&zipcode=${zipcode}` : ''
    const response = await fetch(
      `https://data.geopf.fr/geocodage/completion/?text=${encodeURIComponent(value)}&terr=METROPOLE&maximumResponses=10${zipcodeParam}`
    )
    const data = await response.json()
    setSuggestions(data.results ?? [])
  }

  async function fetchCitySuggestions(value: string) {
    if (value.length < 3) {
      setCitySuggestions([])
      return
    }
    const response = await fetch(
      `https://data.geopf.fr/geocodage/completion/?text=${encodeURIComponent(value)}&type=PositionOfInterest&terr=METROPOLE&maximumResponses=8`
    )
    const data = await response.json()
    setCitySuggestions(data.results ?? [])
  }

  function selectAddress(suggestion: AddressSuggestion) {
    setAddress(suggestion.fulltext ?? '')
    setCity(suggestion.city ?? '')
    setZipcode(suggestion.zipcode ?? '')
    setLongitude(suggestion.x)
    setLatitude(suggestion.y)
    setSuggestions([])
  }

  function selectCity(suggestion: CitySuggestion) {
    const cityName = suggestion.city?.trim() || suggestion.fulltext.split(',')[0].trim()
    setCity(cityName)
    setZipcode(suggestion.zipcode ?? '')
    setCitySuggestions([])
  }

  return {
    address,
    setAddress,
    city,
    setCity,
    zipcode,
    setZipcode,
    longitude,
    latitude,
    suggestions,
    citySuggestions,
    fetchSuggestions,
    fetchCitySuggestions,
    selectAddress,
    selectCity,
  }
}
