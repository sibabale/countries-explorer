// [ COMPONENTS > PAGES > HOME ] #####################################################################

// 1.1. EXTERNAL DEPENDENCIES ........................................................................
import { Alert } from 'react-native'
import { logout } from '../../../redux/slices/user'
import { useState, useEffect } from 'react'
import { Dispatch } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
// 1.1. END ........................................................................................

// 1.2. INTERNAL DEPENDENCIES ......................................................................
import Loader from '../../atoms/loader/loader'
import LogoutIcon from '../../atoms/icons/logout'
import EmptyState from '../../molecules/empty-state/empty-state'
import CountryCard from '../../molecules/country-card/country-card'
import SearchInput from '../../atoms/search-input/search-input'
import { Container, HeaderTitle, HeaderContainer } from './home.styles'
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

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [countries, setCountries] = useState<Country[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true)
      let gatewayFailed = false
      let data
      const token = await AsyncStorage.getItem('token')

      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_GATEWAY_URL}/api/countries`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('API gateway request failed')
        }

        const countries = await response.json()
        data = countries.data

        console.log('Successfully fetched from API gateway')
      } catch (error) {
        console.error('API gateway fetch failed:', error)
        gatewayFailed = true
        setLoading(false)
      }

      if (gatewayFailed) {
        try {
          const response = await fetch(`${process.env.EXPO_PUBLIC_FALLBACK_API_URL}/all`)
          const countries = await response.json()
          data = countries[0]
          console.log('Successfully fetched from fallback API')
        } catch (error) {
          console.error('Error fetching from fallback API:', error)
          setLoading(false)
          return
        }
      }

      const formattedData = data.map((country: any) => ({
        id: country.cca3,
        name: country.name.common,
        capital: country.capital?.[0] || 'N/A',
        region: country.region,
        flag: country.flags?.png,
      }))

      setCountries(formattedData)
      setFilteredCountries(formattedData)
      setLoading(false)
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

      <SearchInput
        value={searchQuery}
        placeholder="Search countries..."
        onChangeText={setSearchQuery}
        clearButtonMode="while-editing"
      />

      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <CountryCard
                key={index}
                name={country.name}
                capital={country.capital}
                region={country.region}
                onPress={() => handleCountryPress(country)}
              />
            ))
          ) : (
            <EmptyState text="No countries found" />
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
