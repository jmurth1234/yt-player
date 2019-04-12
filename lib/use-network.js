import { useState } from 'react'
import axios from 'axios'

const useFetchData = url => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false })
  const callAPI = (payload, complete = () => {}) => {
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

  return [res, callAPI]
}

export default useFetchData
