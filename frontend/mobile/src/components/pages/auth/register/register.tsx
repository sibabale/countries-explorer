// [ COMPONENTS > PAGES > AUTH > REGISTER ] ########################################################

// 1.1. EXTERNAL DEPENDENCIES ......................................................................

import React, { useState } from 'react'
import {
  Alert,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

// 1.1. END ........................................................................................

// 1.2. INTERNAL DEPENDENCIES ......................................................................
import {
  Label,
  Input,
  Title,
  Footer,
  LoginText,
  ErrorText,
  Container,
  FooterText,
  LogoContainer,
  InputContainer,
  RegisterButton,
  RegisterButtonText,
} from './register.styles'
import { setHasRegistered } from '../../../../redux/slices/user'
// 1.2. END ........................................................................................

// 1.3. IMAGES .....................................................................................
// 1.3. END ........................................................................................

// 1.4. DATA .......................................................................................
// 1.4. END ........................................................................................

// 1.5. TYPES ......................................................................................
// 1.5. END ........................................................................................

// 1.5. COMPONENT ..................................................................................

const Register = () => {
  // 1.5.1. HOOKS & API CALLS ....................................................................

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()
  const dispatch = useDispatch()
  // 1.5.1. END ..................................................................................

  // 1.5.2. FUNCTIONS & LOCAL VARIABLES ..........................................................

  const handleRegister = async () => {
    let isValid = true

    // Reset errors
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

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

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password')
      isValid = false
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      isValid = false
    }

    if (isValid) {
      setIsLoading(true)

      try {
        const response = await fetch('http://192.168.1.100:3000/api/auth/register', {
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
          throw new Error(data.error || 'Registration failed')
        }

        dispatch(setHasRegistered(true))

        Alert.alert('Success', 'Registration successful! You can now log in.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login' as never),
          },
        ])
      } catch (error) {
        Alert.alert(
          'Registration Failed',
          error instanceof Error ? error.message : 'An unknown error occurred'
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLoginPress = () => {
    navigation.navigate('Login' as never)
  }
  // 1.5.2. END ..................................................................................

  // 1.5.3. RENDER ...............................................................................

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Container>
            <LogoContainer>
              {/* <Logo source={require('../../../../assets/logo.png')} /> */}
            </LogoContainer>

            <Title>Create Account</Title>

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

            <InputContainer>
              <Label>Confirm Password</Label>
              <Input
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              {confirmPasswordError ? <ErrorText>{confirmPasswordError}</ErrorText> : null}
            </InputContainer>

            <RegisterButton
              onPress={handleRegister}
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              <RegisterButtonText>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </RegisterButtonText>
            </RegisterButton>

            <Footer>
              <FooterText>Already have an account?</FooterText>
              <TouchableOpacity onPress={handleLoginPress}>
                <LoginText>Log In</LoginText>
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

export default Register

// END FILE ########################################################################################
