import css from 'styled-jsx/css'

const shadow = 'box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)'

export const container = css`
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

  button {
    flex: 0 0 auto;
    border: 0;
    background-color: #cc181e; 
    color: #fff;
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
    border-radius: 4px;
    border: 0;
    transition: all 0.2s ease-in;
  }

  .inlineField {
    display: flex;
    flex-direction: row;
    border: 1px solid #9b9b9b;
    border-radius: 4px;
    transition: all 0.2s ease-in;
  }

  label {
    font-weight: bold;
    margin-bottom: 4px;
    display: block;  
  }

  .inlineField:hover, input:focus {
    ${ shadow };
  }
`