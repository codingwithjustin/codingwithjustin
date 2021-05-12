import {
  getFirestore,
  DocumentReference,
  getDoc,
  onSnapshot,
  DocumentData,
  Query,
  getDocs
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

const db = getFirestore()

export const useFireStore = () => {
  return db
}

const useEqual = <T>(value: T, isEqual: (a: T, b: T) => boolean) => {
  const [ref, setRef] = useState(value)
  useEffect(() => {
    if (!isEqual(value, ref)) setRef(value)
  }, [isEqual, value, ref])
  return ref
}

export const useDocument = <T = DocumentData>(ref?: DocumentReference) => {
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<T | undefined>()

  const refState = useEqual(ref, (a, b) => a?.id === b?.id)

  useEffect(() => {
    if (refState == null) return
    setLoading(true)
    return onSnapshot<T>(
      refState,
      doc => {
        setLoading(false)
        setValue(doc.data())
      },
      setError
    )
  }, [refState])

  return { value, error, loading }
}

export const useDocumentOnce = <T = DocumentData>(ref?: DocumentReference) => {
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<T | undefined>()

  const refState = useEqual(ref, (a, b) => a?.id === b?.id)
  useEffect(() => {
    if (refState == null) return
    setLoading(true)
    getDoc<T>(refState)
      .then(d => {
        setLoading(false)
        setValue(d.data())
      })
      .catch(setError)
  }, [refState])

  return { value, error, loading }
}

export const useCollection = <T = DocumentData>(query?: Query) => {
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<T[] | undefined>()

  const queryState = useEqual(query, (a, b) => a?.type === b?.type)

  useEffect(() => {
    if (queryState == null) return
    setLoading(true)
    return onSnapshot<T>(
      queryState,
      ({ docs }) => {
        setLoading(false)
        setValue(docs.map(d => d.data()))
      },
      setError
    )
  }, [queryState])

  return { value, error, loading }
}

export const useCollectionOnce = <T = DocumentData>(query?: Query) => {
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<T[] | undefined>()

  const queryState = useEqual(query, (a, b) => a?.type === b?.type)
  useEffect(() => {
    if (queryState == null) return
    setLoading(true)
    getDocs<T>(queryState)
      .then(({ docs }) => {
        setValue(docs.map(d => d.data()))
        setLoading(false)
      })
      .catch(setError)
  }, [queryState])

  return { value, error, loading }
}
