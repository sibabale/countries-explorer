import React from 'react'
import { render } from '@testing-library/react-native'
import EmptyState from './empty-state'

describe('<EmptyState />', () => {
  test('renders with correct text', () => {
    const testText = 'No data available'
    const { getByText } = render(<EmptyState text={testText} />)

    expect(getByText(testText)).toBeTruthy()
  })
})
