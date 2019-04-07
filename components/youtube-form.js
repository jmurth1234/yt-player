import React, { Fragment, useMemo } from 'react'
import { container, field } from '../styles/form'
import { row } from '../styles/shared'

import useFormal from "@kevinwolf/formal-web"
import useNetwork from "../lib/use-network"
import * as yup from "yup"

const schema = yup.object().shape({
  url: yup.string().url().required()
})

function Field({ id, label, error, children, ...props }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className='inlineField'>
        <input id={id} type="text" {...props} />
        {children}
      </div>
      {error && <div>{error}</div>}
      <style jsx>{field}</style>
    </div>
  );
}

function YouTubeForm() {
  const [ res, sendRequest ] = useNetwork('/api/info')
  const formal = useFormal({}, {
    schema,
    onSubmit: sendRequest
  })

  return (
    <Fragment>
      <form {...formal.getFormProps()} className="row">
        <Field label="Youtube URL" {...formal.getFieldProps("url")} >
          <button {...formal.getSubmitButtonProps()} type="submit">
            Submit
          </button>
        </Field>
      </form>

      {res.isLoading && <div className='row'>Loading...</div>}

      {!res.isLoading && res.error && (
        <div className='row error'>
          <h2>Could not stream URL</h2>
          <p>{res.error}</p>
        </div>
      )}

      {!res.isLoading && res.data && (
        <Fragment>
          <div className='row card'>
            <img src={res.data.thumb} />
            <div className='cardTitle'>
              <h2>{res.data.title}</h2>
              <p><a href={res.data.channelUrl}>{res.data.channelName}</a></p>
            </div>
          </div>
          <audio className='row' autoPlay controls preload='none'>
            <source src={`/api/stream-youtube/${res.data.id}`} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        </Fragment>
      )}
      <style jsx>{row}</style>
      <style jsx>{container}</style>
    </Fragment>
  )
}

export default YouTubeForm