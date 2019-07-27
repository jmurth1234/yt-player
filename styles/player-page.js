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
    max-height: calc(100vh - 72px);
    margin: 40px;
    margin-top: 72px;

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

  .secondary {
    padding: 10px;
  }

  .songContainer {
    width: 100%;
  }

  .songContainer:hover {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
  }

  .relatedArea {
    display: flex;
    flex-direction: column;
  }

  .relatedHeader {
    display: flex;
    width: 100%;
    padding-left: 10px;
    flex: 1 1 auto;
  }

  .relatedBody {
    min-height: 0;
    flex: 1 1 auto;
    overflow: auto;
  }

  .relatedHeader h3 {
    flex: 1 1 100%;
  }

  .secondary {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    .center {
      overflow: none;
      display: flex;
      flex-direction: row;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: flex-start;
    }

    .playerArea {
      margin: 0 auto;
    }

    .playerArea,
    .relatedArea {
      margin: 0;
      margin-top: 72px;
      max-width: 100vw;
      display: flex;
      flex: 1 1 100vw;
      justify-content: center;
      align-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
    }

    .relatedArea {
      position: fixed;
      left: 100vw;
      transition: all 0.2s ease;
    }

    .on-screen {
      left: 0;
    }

    .controls {
      margin: 10px;
    }

    .buttons {
      margin-bottom: 10px;
    }
    .secondary {
      display: block;
    }
  }
`
