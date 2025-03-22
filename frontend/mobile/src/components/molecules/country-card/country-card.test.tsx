import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import CountryCard, { ICountryProps } from './country-card'

const testProps: ICountryProps = {
  name: 'Test Country',
  capital: 'Test Capital',
  region: 'Test Region',
  onPress: jest.fn(),
}

describe('<CountryCard />', () => {
  test('renders with correct props', () => {
    const { getByText } = render(<CountryCard {...testProps} />)

    // Check if the name, capital, and region are rendered correctly
    expect(getByText('Test Country')).toBeTruthy()
    expect(getByText('Region: Test Region')).toBeTruthy()
    expect(getByText('Capital: Test Capital')).toBeTruthy()
  })

  test('calls onPress when pressed', () => {
    const { getByText } = render(<CountryCard {...testProps} />)

    // Simulate a press event
    fireEvent.press(getByText('Test Country'))

    // Check if the onPress function was called
    expect(testProps.onPress).toHaveBeenCalled()
  })
})
