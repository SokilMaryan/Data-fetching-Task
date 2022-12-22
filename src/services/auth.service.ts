class AuthService {
  // auth/v1/token?grant_type=password
  login (payload: ILoginPayload) {
    return useHttp.post('auth/v1/token?grant_type=password', payload)
  }

  // auth/v1/signup
  register (payload: ILoginPayload) {
    return useHttp.post('auth/v1/signup', payload)
  }

  // auth/v1/logout
  logout () {
    return useHttp.post('auth/v1/logou')
  }

  // auth/v1/token?grant_type=refresh_token / { refresh_token: "the-refresh-token" }
  refreshToken () {
    return useHttp.post('auth/v1/token?grant_type=refresh_token')
  }
}

export const authService = new AuthService()
