import css from 'styled-jsx/css'

export default css`
  .hero {
    width: 100%;
    color: #333;
  }
  .title {
    margin: 0;
    padding-top: 80px;
    line-height: 1.15;
    font-size: 48px;
  }
  
  .title,
  .description {
    text-align: center;
    width: 100%;
  }

  a {
    display: block;
  }

  .page {
    padding: 72px 0;
  }

  @media screen and (max-width: 768px) {
    .title {
      padding-top: 20px;
      font-size: 36px;
    }
  }
`
