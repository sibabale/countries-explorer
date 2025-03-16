// [ COMPONENTS > PAGES > HOME  ] ##################################################################

// 1.1. EXTERNAL DEPENDENCIES ......................................................................
import styled from 'styled-components/native'

// 1.1. END ........................................................................................

// 1.2. INTERNAL DEPENDENCIES ......................................................................

// 1.2. END ........................................................................................

// 1.3. IMAGES .....................................................................................
// 1.3. END ........................................................................................

// 1.4. DATA .......................................................................................
// 1.4. END ........................................................................................

// 1.5. FUNCTIONS ..................................................................................
// 1.5. END ........................................................................................

// 1.6. STYLES .....................................................................................

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`

export const SearchContainer = styled.View`
  padding: 16px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`

export const SearchInput = styled.TextInput`
  height: 48px;
  padding: 0 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
  font-size: 16px;
`

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const CountryCard = styled.TouchableOpacity`
  background-color: #ffffff;
  margin: 8px 16px;
  padding: 16px;
  border-radius: 8px;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`

export const CountryName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`

export const CountryInfo = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 4px;
`

export const EmptyStateContainer = styled.View`
  padding: 32px;
  align-items: center;
`

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: #666666;
`

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333333;
`

export const ProfileButton = styled.TouchableOpacity`
  padding: 8px;
`
// 1.6. END ........................................................................................

// END FILE ########################################################################################
