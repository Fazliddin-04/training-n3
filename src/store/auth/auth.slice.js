import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    name: 'Mahmud',
    phone: '+998900265560',
    crm: 'iiko',
    username: 'mahmud',
    shipper_user_id: '5b3e4247-c349-430d-a12e-4323ebcff704',
    branch_id: null,
    country: 'UZB',
    role_id: '6b7d9baa-cfeb-4d11-8299-74279ff8ea02',
    is_blocked: false,
    branch_name: '',
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2dyZWdhdG9yX2lkIjoiIiwiZXhwIjoxNzAzNDMxODUwLCJpYXQiOjE3MDIxMzU4NTAsImlzcyI6InVzZXIiLCJzaGlwcGVyX2lkIjoiZDRiMTY1OGYtMzI3MS00OTczLTg1OTEtOThhODI5MzlhNjY0Iiwic3ViIjoiNWIzZTQyNDctYzM0OS00MzBkLWExMmUtNDMyM2ViY2ZmNzA0IiwidXNlcl9yb2xlX2lkIjoiNmI3ZDliYWEtY2ZlYi00ZDExLTgyOTktNzQyNzlmZjhlYTAyIiwidXNlcl90eXBlX2lkIjoiMmExZWZkNGEtZDUyNy00Y2MyLWFkZmEtYTc1NDYwMjFmMGY2In0.iTLTtN-0Ev79tllJqxGHAKhoDC0R4stM_aW9YMOY5uw',
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2dyZWdhdG9yX2lkIjoiIiwiZXhwIjoxNzA0NzI3ODUwLCJpYXQiOjE3MDIxMzU4NTAsImlzcyI6InVzZXIiLCJzaGlwcGVyX2lkIjoiZDRiMTY1OGYtMzI3MS00OTczLTg1OTEtOThhODI5MzlhNjY0Iiwic3ViIjoiNWIzZTQyNDctYzM0OS00MzBkLWExMmUtNDMyM2ViY2ZmNzA0IiwidXNlcl9yb2xlX2lkIjoiNmI3ZDliYWEtY2ZlYi00ZDExLTgyOTktNzQyNzlmZjhlYTAyIiwidXNlcl90eXBlX2lkIjoiMmExZWZkNGEtZDUyNy00Y2MyLWFkZmEtYTc1NDYwMjFmMGY2In0.qucx8JysQhDaMz94LzinqAxRtv5r8-Snp2yQP-spGLA',
    shipper_id: 'd4b1658f-3271-4973-8591-98a82939a664',
    default_region_id: null,
    procces_only_paid: true,
  },
  isLoading: false,
}

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clear: () => initialState,
    login: (state, { payload }) => {
      state.user = payload
    },
    logout: (state) => {
      state.user = null
    },
    setLoader: (state, { payload }) => {
      state.isLoading = payload
    },
    refreshTokens: (state, { payload }) => {
      state.auth.access_token = payload.access_token
      state.auth.refresh_token = payload.refresh_token
    },
  },
})
