import cookie from 'cookie' // <- npm install @types/cookie

export const getUserFromCookie = (req: any) => {
  try {
    const theCookie = cookie.parse(req.headers.cookie)
    const user = JSON.parse(theCookie.auth)

    if (!user) {
      throw Error('You are not authenticated')
    }

    return user
  } catch (error) {
    console.warn(error)
    throw Error('Failed to parse cookie')
  }
}
