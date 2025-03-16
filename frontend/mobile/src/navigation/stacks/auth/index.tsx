// [ NAVIGATION > STACKS > AUTH  ] #################################################################

// 1.1. EXTERNAL DEPENDENCIES ......................................................................
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// 1.1. END ........................................................................................

// 1.2. INTERNAL DEPENDENCIES ......................................................................
import LoginPage from '../../../components/pages/auth/login/login'
import RegisterPage from '../../../components/pages/auth/register/register'
import { commonScreenOptions } from '../../../utils/logic/screenOptions'
// 1.2. END ........................................................................................

// 1.3. IMAGES .....................................................................................
// 1.3. END ........................................................................................

// 1.4. DATA .......................................................................................
// 1.4. END ........................................................................................

// 1.5. GLOBALS ....................................................................................
// 1.5.END .........................................................................................

// 1.5. COMPONENT ..................................................................................

type AuthStackParamList = {
  OTP: { userValue: string }
  Login: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthScreens = () => {
  // 1.5.1. HOOKS & API CALLS ....................................................................
  // 1.5.1. END ..................................................................................

  // 1.5.2. FUNCTIONS & LOCAL VARIABLES

  // 1.5.2. END ..................................................................................

  // 1.5.3. RENDER ...............................................................................

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={commonScreenOptions()} component={LoginPage} />
      <Stack.Screen name="Register" options={commonScreenOptions()} component={RegisterPage} />
    </Stack.Navigator>
  )

  // 1.5.3. RENDER
}

// 1.5. END ....................................................................

export default AuthScreens

// END FILE ####################################################################
