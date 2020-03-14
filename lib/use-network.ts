import { useState } from 'react'
import axios from 'axios'

interface State<T> {
  data: T
  error: Error
  isLoading: boolean
}

function useFetchData<T = any>(url: string) {
  const [res, setRes] = useState<State<T>>({ data: null, error: null, isLoading: false })
  const callAPI = async (payload: any, complete = () => {}) => {
    setRes(prevState => ({ ...prevState, isLoading: true }))
    axios
      .post(url, payload)
      .then(res => {
        setRes({ data: res.data, isLoading: false, error: null })
        complete()
      })
      .catch(error => {
        setRes({ data: null, isLoading: false, error })
        complete()
      })
  }

  return { ...res, callAPI }
}

export default useFetchData
