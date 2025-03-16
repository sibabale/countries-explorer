// [ COMPONENTS > PAGES > AUTH > LOGIN > STYLES ] ##################################################

// 1.1. EXTERNAL DEPENDENCIES ......................................................................
import styled from 'styled-components/native'
// 1.1. END ........................................................................................

// 1.2. INTERNAL DEPENDENCIES ......................................................................
// 1.2. END ........................................................................................

// 1.3. IMAGES .....................................................................................
// 1.3. END ........................................................................................

// 1.4. DATA .......................................................................................
export const Colors = {
  white: '#FFFFFF',
  text: '#333333',
  error: '#EF4444',
  border: '#E5E7EB',
  primary: '#4285F4',
  background: '#F9FAFB',
}
// 1.4. END ........................................................................................

// 1.5. STYLES .....................................................................................
export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
  padding: 20px;
  justify-content: center;
`

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 40px;
`

export const Logo = styled.Image`
  width: 120px;
  height: 120px;
  resize-mode: contain;
`

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.primary};
  margin-bottom: 30px;
  text-align: center;
`

export const InputContainer = styled.View`
  margin-bottom: 20px;
`

export const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${Colors.text};
`

export const Input = styled.TextInput`
  background-color: ${Colors.white};
  border-radius: 8px;
  padding: 15px;
  border-width: 1px;
  border-color: ${Colors.border};
  font-size: 16px;
`

export const ForgotPassword = styled.Text`
  align-self: flex-end;
  margin-bottom: 20px;
  color: ${Colors.primary};
`

export const LoginButton = styled.TouchableOpacity`
  background-color: ${Colors.primary};
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  margin-top: 10px;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
`

export const LoginButtonText = styled.Text`
  color: ${Colors.white};
  font-size: 16px;
  font-weight: bold;
`

export const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`

export const FooterText = styled.Text`
  color: ${Colors.text};
  font-size: 14px;
`

export const SignupText = styled.Text`
  color: ${Colors.primary};
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
`

export const ErrorText = styled.Text`
  color: ${Colors.error};
  font-size: 14px;
  margin-top: 5px;
`
// 1.5. END ........................................................................................

// END FILE ########################################################################################
