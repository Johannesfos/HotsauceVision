export type AppUser = {
  id: string
  email: string
  token: string
}

export const mapUserData = (user: any): AppUser => {
  const { uid, email, xa } = user
  return {
    id: uid,
    email,
    token: xa,
  }
}
