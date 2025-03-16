import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../index'

const loggedInUser = (state: RootState) => state.user

export const selectIsLoggedIn = createSelector([loggedInUser], user => {
  return user.isLoggedIn
})

export const selectUserId = createSelector([loggedInUser], user => {
  return user.userId!
})
export const selectUserRole = createSelector([loggedInUser], user => {
  return user.role
})
