// [ COMPONENTS > PAGES > DETAILS ] ##############################################################

// 1.1. EXTERNAL DEPENDENCIES ......................................................................

import { useRoute } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
// 1.1. END ........................................................................................

// 1.2. INTERNAL DEPENDENCIES ......................................................................
import {
  Header,
  Container,
  ErrorText,
  DetailRow,
  BorderTag,
  FlagImage,
  BackButton,
  HeaderTitle,
  DetailLabel,
  DetailValue,
  SectionTitle,
  DetailSection,
  BorderTagText,
  BackButtonText,
  FlagContainer,
  ErrorContainer,
  BordersContainer,
  LoadingContainer,
} from './details.styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 1.2. END ........................................................................................

// 1.3. IMAGES .....................................................................................
// 1.3. END ........................................................................................

// 1.4. DATA .......................................................................................
// 1.4. END ........................................................................................

// 1.5. TYPES ......................................................................................
interface RouteParams {
  name: string
}

interface Country {
  id: string
  name: string
  capital: string
  region: string
  subregion?: string
  population?: number
  area?: number
  currencies?: { [key: string]: { name: string; symbol: string } }
  languages?: { [key: string]: string }
  flag?: string
  borders?: string[]
}
// 1.5. END ........................................................................................

// 1.5. COMPONENT ..................................................................................

const CountryDetailPage = ({ navigation }: { navigation: any }) => {
  // 1.5.1. HOOKS & API CALLS ....................................................................
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const route = useRoute()
  const { name } = route.params as RouteParams

  const API_GATEWAY_URL = process.env.EXPO_PUBLIC_API_GATEWAY_URL
  const FALLBACK_API_URL = process.env.EXPO_PUBLIC_FALLBACK_API_URL

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true)
        const token = await AsyncStorage.getItem('token')
        const response = await fetch(`${API_GATEWAY_URL}/countries/search`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
          }),
        })

        if (!response.ok) {
          throw new Error('Country not found')
        }

        const data = await response.json()
        const countryData = data[0]

        setCountry({
          id: countryData.cca3,
          name: countryData.name.common,
          capital: countryData.capital?.[0] || 'N/A',
          region: countryData.region,
          subregion: countryData.subregion,
          population: countryData.population,
          area: countryData.area,
          currencies: countryData.currencies,
          languages: countryData.languages,
          flag: countryData.flags?.png,
          borders: countryData.borders,
        })

        setLoading(false)
      } catch (error) {
        console.error('Error fetching country details:', error)
        setError('Failed to load country details')
        setLoading(false)
      }
    }

    if (name) {
      fetchCountryDetails()
    }
  }, [name])

  const handleBackPress = () => {
    navigation.goBack()
  }

  const formatNumber = (num?: number) => {
    if (num === undefined) return 'N/A'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const renderCurrencies = () => {
    if (!country?.currencies) return 'N/A'

    return Object.entries(country.currencies)
      .map(([code, currency]) => `${currency.name} (${currency.symbol})`)
      .join(', ')
  }

  const renderLanguages = () => {
    if (!country?.languages) return 'N/A'

    return Object.values(country.languages).join(', ')
  }

  // 1.5.1. END ..................................................................................

  // 1.5.2. FUNCTIONS & LOCAL VARIABLES ..........................................................
  // 1.5.2. END ..................................................................................

  // 1.5.3. RENDER ...............................................................................

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#0000ff" />
        </LoadingContainer>
      </Container>
    )
  }

  if (error || !country) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>{error || 'Country not found'}</ErrorText>
          <BackButton onPress={handleBackPress}>
            <BackButtonText>Go Back</BackButtonText>
          </BackButton>
        </ErrorContainer>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBackPress}>
          <BackButtonText>← Back</BackButtonText>
        </BackButton>
        <HeaderTitle>{country.name}</HeaderTitle>
      </Header>

      <ScrollView>
        {country.flag && (
          <FlagContainer>
            <FlagImage source={{ uri: country.flag }} resizeMode="cover" />
          </FlagContainer>
        )}

        <DetailSection>
          <SectionTitle>General Information</SectionTitle>
          <DetailRow>
            <DetailLabel>Capital:</DetailLabel>
            <DetailValue>{country.capital}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Region:</DetailLabel>
            <DetailValue>{country.region}</DetailValue>
          </DetailRow>
          {country.subregion && (
            <DetailRow>
              <DetailLabel>Subregion:</DetailLabel>
              <DetailValue>{country.subregion}</DetailValue>
            </DetailRow>
          )}
          <DetailRow>
            <DetailLabel>Population:</DetailLabel>
            <DetailValue>{formatNumber(country.population)}</DetailValue>
          </DetailRow>
          {country.area && (
            <DetailRow>
              <DetailLabel>Area:</DetailLabel>
              <DetailValue>{formatNumber(country.area)} km²</DetailValue>
            </DetailRow>
          )}
        </DetailSection>

        <DetailSection>
          <SectionTitle>Languages & Currencies</SectionTitle>
          <DetailRow>
            <DetailLabel>Languages:</DetailLabel>
            <DetailValue>{renderLanguages()}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Currencies:</DetailLabel>
            <DetailValue>{renderCurrencies()}</DetailValue>
          </DetailRow>
        </DetailSection>

        {country.borders && country.borders.length > 0 && (
          <DetailSection>
            <SectionTitle>Bordering Countries</SectionTitle>
            <BordersContainer>
              {country.borders.map(border => (
                <BorderTag key={border}>
                  <BorderTagText>{border}</BorderTagText>
                </BorderTag>
              ))}
            </BordersContainer>
          </DetailSection>
        )}
      </ScrollView>
    </Container>
  )

  // 1.5.3. RENDER ...............................................................................
}

// 1.5. END ........................................................................................

export default CountryDetailPage

// END FILE ########################################################################################
