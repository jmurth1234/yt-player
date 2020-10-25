import React, { Fragment, useContext, useMemo, useState } from 'react'
import { container, field } from '../styles/form'
import { row } from '../styles/shared'

import useNetwork from '../lib/use-network'
import audioContext from '../lib/audio-context'
import getAudioUrl from '../lib/audio-url'
import Song from './song'

function Field({ id, label, children, ...props }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="inlineField">
        <input id={id} type="text" {...props} />
        {children}
      </div>
      <style jsx>{field}</style>
    </div>
  )
}

function YouTubeForm() {
  const urlApi = useNetwork('/api/info')
  const searchApi = useNetwork('/api/search')

  const isLoading = urlApi.isLoading || searchApi.isLoading
  const error = urlApi.error || searchApi.error

  const url = getAudioUrl(urlApi.data)

  const audio = useContext(audioContext)
  const [youtubeRequest, setRequest] = useState<String>()

  useMemo(() => {
    if (!url) {
      return
    }

    audio.setNowPlaying({ ...urlApi.data, url })
  }, [url])

  const onSubmit = (e) => {
    e.preventDefault()

    if (youtubeRequest.startsWith('http')) {
      urlApi.callAPI({ url: youtubeRequest })
    } else {
      searchApi.callAPI({ search: youtubeRequest })
    }
  }

  const onChange = (e) => {
    setRequest(e.target.value)
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit} className="row">
        <Field
          id="youtubeRequest"
          label="URL or Search Terms"
          onInput={onChange}
          value={youtubeRequest}
        >
          <button type="submit">Submit</button>
        </Field>
      </form>

      {isLoading && <div className="row">Loading...</div>}

      {!isLoading && error && (
        <div className="">
          <h2>Could not get video</h2>
          <p>{error.message}</p>
        </div>
      )}

      {searchApi.data && searchApi.data.length && (
        <div className="row">
          {searchApi.data.map((video, i) => (
            <span className="songContainer" key={i}>
              <Song
                video={video}
                replace={false}
                onClick={() => urlApi.callAPI({ url: video.id })}
              />
            </span>
          ))}
        </div>
      )}

      <style jsx>{row}</style>
      <style jsx>{container}</style>
    </Fragment>
  )
}

export default YouTubeForm
