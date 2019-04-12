import css from 'styled-jsx/css'

export default css`
  .center {
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
  }

  .infoArea {
    max-width: 500px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 16px 8px rgba(0, 0, 0, 0.2);
  }

  .hero {
    padding: 10px;
    color: #333;
  }

  img {
    width: 100%;
    text-align: center;
  }

  .title,
  .description {
    text-align: center;
    width: 100%;
  }
`
