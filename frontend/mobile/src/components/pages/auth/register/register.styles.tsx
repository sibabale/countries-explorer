// [ COMPONENTS > PAGES > AUTH > REGISTER > STYLES ] ###############################################

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
  padding: 20px;
  justify-content: center;
`

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 40px;
`

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #4285f4;
  margin-bottom: 30px;
  text-align: center;
`

export const InputContainer = styled.View`
  margin-bottom: 20px;
`

export const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: #333333;
`

export const Input = styled.TextInput`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  border-width: 1px;
  border-color: #e5e7eb;
  font-size: 16px;
`

export const RegisterButton = styled.TouchableOpacity`
  background-color: #4285f4;
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  margin-top: 10px;
`

export const RegisterButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`

export const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`

export const FooterText = styled.Text`
  color: #333333;
  font-size: 14px;
`

export const LoginText = styled.Text`
  color: #4285f4;
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
`

export const ErrorText = styled.Text`
  color: #ef4444;
  font-size: 14px;
  margin-top: 5px;
`
// 1.6. END ........................................................................................

// END FILE ########################################################################################
