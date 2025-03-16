// [ COMPONENTS > PAGES > DETAILS ] ##############################################################

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

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  text-align: center;
  margin-right: 40px;
`

export const BackButton = styled.TouchableOpacity`
  padding: 8px;
`

export const BackButtonText = styled.Text`
  color: #0066cc;
  font-size: 16px;
`

export const FlagContainer = styled.View`
  width: 100%;
  height: 200px;
  overflow: hidden;
`

export const FlagImage = styled.Image`
  width: 100%;
  height: 100%;
`

export const DetailSection = styled.View`
  margin: 16px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333333;
`

export const DetailRow = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`

export const DetailLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  width: 40%;
  color: #555555;
`

export const DetailValue = styled.Text`
  font-size: 16px;
  flex: 1;
  color: #333333;
`

export const BordersContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export const BorderTag = styled.View`
  background-color: #e0e0e0;
  padding: 8px 12px;
  border-radius: 16px;
  margin-right: 8px;
  margin-bottom: 8px;
`

export const BorderTagText = styled.Text`
  font-size: 14px;
  color: #333333;
`

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const ErrorText = styled.Text`
  font-size: 16px;
  color: #ff3b30;
  margin-bottom: 20px;
  text-align: center;
`

// 1.6. END ........................................................................................

// END FILE ########################################################################################
