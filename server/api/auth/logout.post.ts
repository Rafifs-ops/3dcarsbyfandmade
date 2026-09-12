export default defineEventHandler((event) => {
  deleteCookie(event, 'access_token', { path: '/' })
  deleteCookie(event, 'refresh_token', { path: '/' })

  return {
    success: true,
    message: 'Logout berhasil',
    isLogin: false,
    user: null
  }
})
