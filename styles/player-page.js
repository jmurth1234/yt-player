import css from 'styled-jsx/css'

export default css`
  .center {
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: row;
  }

  .playerArea,
  .relatedArea {
    margin: 40px;
    max-width: 500px;
    display: flex;
    flex: 1 1 50%;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
  }

  .infoArea {
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

  .controls {
    width: 100%;
    max-width: 500px;

    margin: 40px;

    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
  }

  .sliderContainer {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
    padding: 10px;
  }

  .sliderContainer label {
    font-weight: bold;
  }

  .buttons {
    margin-bottom: 40px;
  }

  button {
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 0px 16px 8px rgba(0, 0, 0, 0.2);
    border: 0;
  }

  .primary {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  .songContainer {
    width: 100%;
  }
  .songContainer:hover {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
  }
`
