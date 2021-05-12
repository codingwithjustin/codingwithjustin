import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential
} from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useAnalytics } from './analytics'

export const useSignIn = () => {
  const auth = getAuth()
  const [error, setError] = useState()

  const { logEvent } = useAnalytics()

  const loginHandler = async (promise: Promise<UserCredential>) => {
    try {
      const result = await promise
      result.user.email
      logEvent('login', { email: result.user.email })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setError(err)
    }
  }

  const google = () => {
    const googleProvider = new GoogleAuthProvider()
    const p = signInWithPopup(auth, googleProvider)
    loginHandler(p)
  }

  const github = () => {
    const githubProvider = new GithubAuthProvider()
    const p = signInWithPopup(auth, githubProvider)
    loginHandler(p)
  }

  return { error, setError, google, github }
}

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    return getAuth().onAuthStateChanged(
      u => setUser(u),
      e => setError(e)
    )
  }, [])

  const isLoggedIn = user != null
  const signOut = () => getAuth().signOut()

  return { user, isLoggedIn, error, signOut }
}
