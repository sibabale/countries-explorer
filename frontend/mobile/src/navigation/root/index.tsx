// [ NAVIGATION > ROOT ] ###########################################################################

// 1.1. EXTERNAL DEPENDENCIES ......................................................................
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// 1.1. END ........................................................................................

// 1.2. INTERNAL DEPENDENCIES ......................................................................
import Main from '../../navigation/stacks/main'
import AuthScreens from '../../navigation/stacks/auth'
import { RootState } from '../../redux/index'
import { commonScreenOptions } from '../../utils/logic/screenOptions'
// 1.2. END ........................................................................................

// 1.3. IMAGES .....................................................................................
// 1.3. END ........................................................................................

// 1.4. DATA .......................................................................................
// 1.4. END ........................................................................................

// 1.5. TYPES ......................................................................................
// 1.5. END ........................................................................................

// 1.6. COMPONENT ..................................................................................

const Root: React.FC = () => {
  // 1.5.1. HOOKS & API CALLS ....................................................................

  const Stack = createNativeStackNavigator()
  const { isLoggedIn, hasRegistered } = useSelector((state: RootState) => state.user)

  // 1.5.1. END ..................................................................................

  // 1.5.2. FUNCTIONS & LOCAL VARIABLES ..........................................................
  // 1.5.2. END ..................................................................................

  console.log('isLoggedIn: ', isLoggedIn)

  // 1.5.3. RENDER ...............................................................................

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Main" options={commonScreenOptions()} component={Main} />
            </>
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthScreens}
              initialParams={{ initialRoute: hasRegistered ? 'Login' : 'Register' }}
              options={commonScreenOptions()}
            />
          )}
        </Stack.Navigator>
      </View>
    </SafeAreaProvider>
  )
  // 1.5.3. END ..................................................................................
}
// 1.6. END ........................................................................................

export default Root

// END FILE ########################################################################################
