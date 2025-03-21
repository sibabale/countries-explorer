// [ COMPONENTS > ATOMS > LOADER ] #################################################################

// 1.1. EXTERNAL DEPENDENCIES ......................................................................
import React from 'react'
import { ActivityIndicator } from 'react-native'
// 1.1. END ........................................................................................

// 1.2. INTERNAL DEPENDENCIES ......................................................................
import { LoadingContainer } from './loader.styles'
// 1.2. END ........................................................................................

// 1.3. IMAGES .....................................................................................
// 1.3. END ........................................................................................

// 1.4. DATA .......................................................................................
// 1.4. END ........................................................................................

// 1.5. TYPES ......................................................................................
// 1.5. END ........................................................................................

// 1.5. COMPONENT ..................................................................................

const Loader = () => {
  // 1.5.1. HOOKS & API CALLS ......................................................................

  // 1.5.1. END ....................................................................................

  // 1.5.2. FUNCTIONS & LOCAL VARIABLES ............................................................

  // 1.5.2. END ....................................................................................

  // 1.5.3. RENDER .................................................................................

  return (
    <LoadingContainer>
      <ActivityIndicator size="large" color="#0000ff" testID="loader" />
    </LoadingContainer>
  )

  // 1.5.3. RENDER .................................................................................
}

// 1.5. END ........................................................................................

export default React.memo(Loader)

// END FILE ########################################################################################
