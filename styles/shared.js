import css from 'styled-jsx/css'

export const shadow = 'box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)'

export const fixedBar = css`
  .fixedBar {
    position: fixed;
    width: 100%;
  }

  .top {
    top: 0;
  }

  .bottom {
    bottom: 0;
  }
`

export const row = css`
  .row {
    max-width: 880px;
    margin: 80px auto 40px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  @media screen and (max-width: 768px) {
    .row {
      margin: 40px auto 20px;
    }
  }
`

const bodyCss = `
  overflow: hidden;
  height: 100%;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
`

export const nav = css`
  :global(*) {
    box-sizing: border-box;
  }
  :global(html) {
    ${bodyCss}
  }
  :global(body) {
    ${bodyCss}
  }
  :global(#__next) {
    ${bodyCss}
  }

  :global(.fa-sm) {
    height: 50%;
    line-height: 0.75em;
  }

  nav {
    text-align: center;
    background-color: #2887a2;
    display: flex;
    height: 72px;
    transition: all 0.2s ease;
    ${shadow}
  }

  .player {
    background-color: rgba(255, 255, 255, 0);
    background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    box-shadow: none;
  }

  ul {
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;
  }

  .left {
    flex: 1 1 100%;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a, span {
    color: rgb(241, 241, 241);
    text-decoration: none;
    padding: 0 15px;
    font-size: 13px;
    font-weight: bold;
  }
`
