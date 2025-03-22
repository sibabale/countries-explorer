import React from 'react'
import { render } from '@testing-library/react-native'
import Loader from './loader'

describe('<Loader />', () => {
  test('renders an ActivityIndicator', () => {
    const { getByTestId } = render(<Loader />)

    expect(getByTestId('loader')).toBeTruthy()
  })
})
