import { useState } from 'react'
import axios from 'axios'

const useFetchData = url => {
  const [ res, setRes ] = useState({ data: null, error: null, isLoading: false });
  // You POST method here
  const callAPI = (payload) => {
    console.log(payload)
    setRes(prevState => ({ ...prevState, isLoading: true }))
    axios.post(url, payload).then(res => {
      setRes({ data: res.data, isLoading: false, error: null })
    }).catch((error) => {
      setRes({ data: null, isLoading: false, error })
    })
  }

  return [ res, callAPI ]
}

export default useFetchData