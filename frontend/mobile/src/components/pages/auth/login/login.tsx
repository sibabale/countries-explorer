// [ COMPONENTS > PAGES > AUTH > LOGIN ] ###########################################################

// 1.1. EXTERNAL DEPENDENCIES ......................................................................
import { useState } from 'react'
import {
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
// 1.1. END ........................................................................................

// 1.2. INTERNAL DEPENDENCIES ......................................................................
import {
  Title,
  Label,
  Input,
  Footer,
  Container,
  ErrorText,
  FooterText,
  SignupText,
  LoginButton,
  ForgotPassword,
  InputContainer,
  LoginButtonText,
} from './login.styles'
import { login } from '../../../../redux/slices/user'
// 1.2. END ........................................................................................

// 1.3. IMAGES .....................................................................................
// 1.3. END ........................................................................................

// 1.4. DATA .......................................................................................
// 1.4. END ........................................................................................

// 1.5. TYPES ......................................................................................
// 1.5. END ........................................................................................

// 1.5. COMPONENT ..................................................................................

const LoginScreen = ({ navigation }: { navigation: any }) => {
  // 1.5.1. HOOKS & API CALLS ....................................................................
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  // 1.5.1. END ..................................................................................

  // 1.5.2. FUNCTIONS & LOCAL VARIABLES ..........................................................

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async () => {
    let isValid = true

    setEmailError('')
    setPasswordError('')

    if (!email) {
      setEmailError('Email is required')
      isValid = false
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email')
      isValid = false
    }

    if (!password) {
      setPasswordError('Password is required')
      isValid = false
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      isValid = false
    }

    if (isValid) {
      setIsLoading(true)

      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_GATEWAY_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Invalid credentials')
        }

        console.log('Login successful:', data)

        await AsyncStorage.setItem('token', data.token)

        dispatch(
          login({
            email: email,
            userId: data.userId || data.id || '1',
            role: data.role || 'USER',
          })
        )
      } catch (error) {
        console.error('Login error:', error)

        // Handle different types of errors
        if (error instanceof Error) {
          if (error.message.includes('credentials') || error.message.includes('Invalid')) {
            setEmailError('Invalid email or password')
            setPasswordError('Invalid email or password')
          } else if (error.message.includes('network') || error.message.includes('connect')) {
            setEmailError('Network error. Please check your connection.')
          } else {
            setEmailError(error.message)
          }
        } else {
          setEmailError('An unknown error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSignUp = () => {
    // Navigate to sign up screen
    navigation.navigate('Register')
  }

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    // navigation.navigate('ForgotPassword');
  }

  // 1.5.3. RENDER ...............................................................................
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Container>
            <Title>Welcome Back</Title>

            <InputContainer>
              <Label>Email</Label>
              <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {emailError ? <ErrorText>{emailError}</ErrorText> : null}
            </InputContainer>

            <InputContainer>
              <Label>Password</Label>
              <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {passwordError ? <ErrorText>{passwordError}</ErrorText> : null}
            </InputContainer>

            <TouchableOpacity onPress={handleForgotPassword}>
              <ForgotPassword>Forgot Password?</ForgotPassword>
            </TouchableOpacity>

            <LoginButton onPress={handleLogin} disabled={isLoading}>
              <LoginButtonText>{isLoading ? 'Logging in...' : 'Log In'}</LoginButtonText>
            </LoginButton>

            <Footer>
              <FooterText>Don't have an account?</FooterText>
              <TouchableOpacity onPress={handleSignUp}>
                <SignupText>Sign Up</SignupText>
              </TouchableOpacity>
            </Footer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )

  // 1.5.3. RENDER ...............................................................................
}

// 1.5. END ........................................................................................

export default LoginScreen

// END FILE ########################################################################################
