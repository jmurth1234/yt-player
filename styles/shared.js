import css from 'styled-jsx/css'

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
export const nav = css`
  :global(*) { box-sizing: border-box; }
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  nav {
    text-align: center;
    background-color: #2887A2;
    padding: 4px 16px;
    display: flex;
  }
  ul {
    display: flex;
    justify-content: space-between;
    padding: 0;
  }

  .left {
    flex: 1 1 100%;
  }
  li {
    display: flex;
    padding: 6px 8px;
  }
  a {
    color: rgb(241,241,241);
    text-decoration: none;
    font-size: 13px;
  }
`
