import React, { Fragment, useContext, useMemo, useState } from 'react'
import { container, field } from '../styles/form'
import { row } from '../styles/shared'

import useNetwork from '../lib/use-network'
import audioContext from '../lib/audio-context'
import getAudioUrl from '../lib/audio-url'

function Field({ id, label, error, children, ...props }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="inlineField">
        <input id={id} type="text" {...props} />
        {children}
      </div>
      {error && <div>{error}</div>}
      <style jsx>{field}</style>
    </div>
  )
}

function YouTubeForm() {
  const { error, data, isLoading, callAPI } = useNetwork('/api/info')
  const url = getAudioUrl(data)

  const audio = useContext(audioContext)
  const [youtubeUrl, setUrl] = useState()

  useMemo(() => {
    if (!url) {
      return
    }

    audio.setNowPlaying({ ...data, url })
  }, [url])

  const onSubmit = e => {
    e.preventDefault()
    callAPI({ url: youtubeUrl })
  }

  const onChange = e => {
    setUrl(e.target.value)
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit} className="row">
        <Field
          id="youtubeUrl"
          label="Youtube URL"
          onInput={onChange}
          value={youtubeUrl}
        >
          <button type="submit">Submit</button>
        </Field>
      </form>

      {isLoading && <div className="row">Loading...</div>}

      {!isLoading && error && (
        <div className="row error">
          <h2>Could not get video</h2>
          <p>{error.message}</p>
        </div>
      )}

      <style jsx>{row}</style>
      <style jsx>{container}</style>
    </Fragment>
  )
}

export default YouTubeForm
