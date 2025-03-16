// [ COMPONENTS > PAGES > HOME ] ###################################################################

// 1.1. EXTERNAL DEPENDENCIES ......................................................................

import { Alert } from 'react-native'
import { logout } from '../../../redux/slices/user'
import { useState, useEffect } from 'react'
import { Dispatch } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'

// 1.1. END ........................................................................................

// 1.2. INTERNAL DEPENDENCIES ......................................................................
import {
  Container,
  SearchInput,
  CountryCard,
  CountryName,
  HeaderTitle,
  CountryInfo,
  EmptyStateText,
  SearchContainer,
  HeaderContainer,
  LoadingContainer,
  EmptyStateContainer,
} from './home.styles'
import LogoutIcon from '../../atoms/icons/logout'
// 1.2. END ........................................................................................

// 1.3. IMAGES .....................................................................................
// 1.3. END ........................................................................................

// 1.4. DATA .......................................................................................
// 1.4. END ........................................................................................

// 1.5. TYPES ......................................................................................

interface Country {
  id: string
  name: string
  flag?: string
  capital: string
  region: string
}
// 1.5. END ........................................................................................

// 1.5. COMPONENT ..................................................................................

const HomePage = ({ navigation }: { navigation: any }) => {
  // 1.5.1. HOOKS & API CALLS ....................................................................
  const API_GATEWAY_URL = process.env.EXPO_PUBLIC_API_GATEWAY_URL
  const FALLBACK_API_URL = process.env.EXPO_PUBLIC_FALLBACK_API_URL

  const [countries, setCountries] = useState<Country[]>([])
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        let data
        let response
        let formattedData

        try {
          console.log('Attempting to fetch from API gateway...')
          const token = await AsyncStorage.getItem('token')
          response = await fetch(`${API_GATEWAY_URL}/countries`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })

          if (!response.ok) {
            throw new Error('API gateway request failed')
          }

          data = await response.json()

          formattedData = data.map((country: any) => ({
            id: country.id || country.code,
            name: country.name,
            capital: country.capital || 'N/A',
            region: country.region || 'N/A',
            flag: country.flag,
          }))

          console.log('Successfully fetched from API gateway')
        } catch (error) {
          console.log('API gateway fetch failed, using fallback API... ', error)
          response = await fetch(FALLBACK_API_URL)
          data = await response.json()

          formattedData = data.map((country: any) => ({
            id: country.cca3,
            name: country.name.common,
            capital: country.capital?.[0] || 'N/A',
            region: country.region,
            flag: country.flags?.png,
          }))

          console.log('Successfully fetched from fallback API')
        }

        setCountries(formattedData)
        setFilteredCountries(formattedData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching countries from both sources:', error)
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCountries(countries)
    } else {
      const filtered = countries.filter(
        country =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.region.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredCountries(filtered)
    }
  }, [searchQuery, countries])

  const handleCountryPress = (country: Country) => {
    navigation.navigate('CountryDetails', { name: country.name })
  }

  // 1.5.1. END ..................................................................................

  // 1.5.2. FUNCTIONS & LOCAL VARIABLES ..........................................................
  const logoutUser = (dispatch: Dispatch, callback?: () => void) => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(logout())
          if (callback) callback()
        },
        style: 'destructive',
      },
    ])
  }

  const handleLogout = () => {
    logoutUser(dispatch)
  }
  // 1.5.2. END ..................................................................................

  // 1.5.3. RENDER ...............................................................................

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Countries Explorer</HeaderTitle>
        <TouchableOpacity onPress={handleLogout}>
          <LogoutIcon />
        </TouchableOpacity>
      </HeaderContainer>

      <SearchContainer>
        <SearchInput
          placeholder="Search countries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </SearchContainer>

      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#0000ff" />
        </LoadingContainer>
      ) : (
        <ScrollView>
          {filteredCountries.length > 0 ? (
            filteredCountries.map(country => (
              <CountryCard key={country.id} onPress={() => handleCountryPress(country)}>
                <CountryName>{country.name}</CountryName>
                <CountryInfo>Capital: {country.capital}</CountryInfo>
                <CountryInfo>Region: {country.region}</CountryInfo>
              </CountryCard>
            ))
          ) : (
            <EmptyStateContainer>
              <EmptyStateText>No countries found</EmptyStateText>
            </EmptyStateContainer>
          )}
        </ScrollView>
      )}
    </Container>
  )

  // 1.5.3. RENDER ...............................................................................
}

// 1.5. END ........................................................................................

export default HomePage

// END FILE ########################################################################################
