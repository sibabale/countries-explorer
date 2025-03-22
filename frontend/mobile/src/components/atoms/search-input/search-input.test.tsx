import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import SearchInput from './search-input'

describe('<SearchInput />', () => {
  const mockOnChangeText = jest.fn()

  test('renders with correct props', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        value="Test"
        placeholder="Search..."
        onChangeText={mockOnChangeText}
        clearButtonMode="while-editing"
      />
    )

    // Check if the placeholder is rendered correctly
    expect(getByPlaceholderText('Search...')).toBeTruthy()
  })

  test('calls onChangeText when text changes', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        value=""
        placeholder="Search..."
        onChangeText={mockOnChangeText}
        clearButtonMode="while-editing"
      />
    )

    const input = getByPlaceholderText('Search...')
    fireEvent.changeText(input, 'New text')

    // Check if the onChangeText function was called
    expect(mockOnChangeText).toHaveBeenCalledWith('New text')
  })
})
