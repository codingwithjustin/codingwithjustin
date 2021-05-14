import { doc, DocumentReference, getFirestore } from '@firebase/firestore'
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
import { useDocument } from './firestore'
import { User as UserDocument } from '@shared/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { useRouter } from 'next/router'
const setCustomUserClaims = httpsCallable<unknown, { refetch: boolean }>(
  getFunctions(),
  'userCustomClaims'
)

export const useSignIn = () => {
  const auth = getAuth()
  const [error, setError] = useState()

  const { logEvent } = useAnalytics()

  const loginHandler = async (promise: Promise<UserCredential>) => {
    try {
      const { user } = await promise
      logEvent('login', { email: user.email })

      const { data } = await setCustomUserClaims()
      if (data.refetch) await auth.currentUser?.getIdToken(true)
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
  const [claims, setClaims] = useState<{ admin?: boolean } | null>()
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    return getAuth().onAuthStateChanged(
      u => setUser(u),
      e => setError(e)
    )
  }, [])

  useEffect(() => {
    user
      ? user.getIdTokenResult().then(s => setClaims(s.claims as any))
      : setClaims(null)
  }, [user])

  const isLoggedIn = user != null
  const signOut = () => getAuth().signOut()
  const isAdmin = !!claims?.admin
  return { user, isLoggedIn, isAdmin, error, claims, signOut }
}

export const useUserData = () => {
  const { user } = useAuthState()
  const [docRef, setDocRef] = useState<DocumentReference>()
  useEffect(
    () => setDocRef(user ? doc(getFirestore(), 'users', user.uid) : undefined),
    [user]
  )
  const { value } = useDocument<UserDocument>(docRef)
  return value
}

export const useAdminRedirect = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const user = getAuth().currentUser
    if (user == null) router.push('/')
    user?.getIdTokenResult().then(r => {
      if (!r.claims.admin) {
        router.push('/')
        return
      }
      setLoading(false)
    })
  }, [router])
  return loading
}
