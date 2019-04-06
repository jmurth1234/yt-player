import css from 'styled-jsx/css'

export const container = css`
  .row {
    max-width: 880px;
    margin: 80px auto 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .card {
    flex-direction: row;
  }

  img {
    flex: 0 1 auto;
    margin-right: 20px;
  }

  .cardTitle {
    flex: 1 1 100%;
  }

  audio {
    width: 100%;
  }
`

export const field = css`
  input {
    flex: 1 1 100%;
    padding: 16px;
    text-align: left;
    text-decoration: none;
    font-size: 18px;
    color: #434343;
    border: 1px solid #9b9b9b;
  }

  button {
    flex: 0 0 auto;
  }

  .inlineField {
    display: flex;
    flex-direction: row;
  }
`