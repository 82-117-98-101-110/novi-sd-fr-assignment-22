import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {

    // this is the default value below

    --font-family-a: 'DMSans';

    /* UI Font sizes / Content font sizes are available in the Article component */
    --font-size-base: 16px;

    --font-size-default: var(--font-size-20);
    --font-size-05: 0.625rem; /* 10px Caption */
    --font-size-10: 0.75rem; /* 12px Caption */
    --font-size-20: 1rem; /* 16px Body */
    --font-size-30: 1.25rem; /* 20px */
    --font-size-40: 1.563rem; /* 25px Heading */
    --font-size-50: 1.875rem; /* 30px Heading */
    --font-size-60: 3.75rem; /* 60px Title */

    /* Line-height */
    --line-height-default: var(--line-height-10);
    --line-height-10: 1;
    --line-height-20: 1.25em;
    --line-height-30: 1.5em;

    /* Letter spacing */
    --letter-spacing-default: 2px;

    /* Font weight */
    --font-weight-default: var(--font-weight-20);
    --font-weight-10: 300;
    --font-weight-20: 400;
    --font-weight-30: 500;
    --font-weight-40: 700;

    /* Spacing system */
    --space-default: var(--space-40);
    --space-10: 0.25rem; /* 4px */
    --space-20: 0.5rem; /* 8px */
    --space-30: 0.75rem; /* 12px */
    --space-40: 1rem; /* 16px */
    --space-50: 1.5rem; /* 24px */
    --space-60: 2rem; /* 32px */


    /* Primary */
    --color-primary-purpleBlue-default: var(--color-primary-purpleBlue-500);
    --color-primary-purpleBlue-500: #4318FF;
    --color-primary-purpleBlue-700: #2200B7;
    
    
    /* Secondary */
    --color-secondary-primary-black: #000000;
    --color-secondary-primary-white: #ffffff;
    
    --color-secondary-primary-grey-500: #E0E5F2;
    --color-secondary-primary-grey-300: #F4F7FE;
    --color-secondary-primary-darkGrey-500: #8F9BBA;
    --color-secondary-primary-darkGrey-300: #C9D4EA;

    

    /* Success and positive colors */
    --color-success: #01B574;

    /* Error and negative colors */
    --color-error: #E31A1A;

    /* Warning colors */
    --color-warning: #FFB547;
    
    
    
    
    /* Rounded borders */
    --effect-rounded-default: var(--effect-rounded-10);
    --effect-rounded-10: 5px;
    --effect-rounded-10: 10px;
    --effect-rounded-40: 40px;

    /* Shadows */
    --effect-shadow-default: var(--effect-shadow-10);
    --effect-shadow-10: 0px 18px 40px rgba(112, 144, 176, 0.12);

  }


`;

//TODO styles: check what is used below.
export const BaseStyles = createGlobalStyle`


  html {
    color: var(--color-neutral-100);
    font-family: var(--font-family-a);
    font-weight: var(--font-weight-default);
    font-size: var(--font-size-base);
    -webkit-text-size-adjust: 100%;
    height: 100%;
  }

  body {
    background-color: var(--color-neutral-10);
    height: 100%;
    margin: 0;
    line-height: var(--line-height-default);
  }

  /*------------------------------------*\
  #BASE-TYPE
\*------------------------------------*/

  /*
 * Headings / Resets to default body text style
 */
  h1,
  h2,
  legend,
  h3,
  h4,
  h5,
  h6 {
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: var(--space-stack-default);
  }

  /*
 * Paragraphs
 */
  p {
    margin: var(--space-stack-default);
    line-height: var(--line-height-30);
  }

  /*
 * Links
 */
  a {
    color: var(--color-primary-50);
    cursor: pointer;
    text-decoration: none;

    &:visited {
      /* color: var(--color-neutral-50); */
    }

    &:hover {
      color: var(--color-primary-70);
    }
  }


  //TODO styles input: move these to the input component?
  /*
  * Input
  */
  select,
  textarea,
  input[type=text],
  input[type=number],
  input[type=password],
  input[type=lastname],
  input[type=firstname],
  input[type=search],
  input[type=email],
  input[type=tel],
  input[type=url] {
    background-color: var(--color-secondary-primary-grey-300);
    border: 0px solid var(--color-secondary-primary-darkGrey-500);
    //border-radius: var(--effect-rounded-10);
    color: #8F9BBA;
    //display: block;
    font-family: var(--font-family-a);
    font-size: var(--font-size-20);
    padding: 2px 15px;
    //margin: 0;
    //padding: var(--space-20) var(--space-30);
    //vertical-align: baseline;
    //max-width: 270px;

    &:focus {
      border: 1px solid var(--color-secondary-primary-darkGrey-500);
      outline: 0;
      background-color: #ffffff;
      color: #000000;
    }

    &:invalid {
      background-color: var(--color-secondary-primary-grey-300);
      border: 0px solid var(--color-secondary-primary-darkGrey-500);
      color: #8F9BBA;
    }

  }
  select{
    display: block;
    box-sizing: border-box;
    /*padding: 2px 15px;*/
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    /*margin-bottom: 20px;*/
    /*margin-top: 2px;*/
    width: 270px;
    height: 46px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.531474px;
    color: #000000;
   
    
  }

  textarea{
    max-width: 240px;
  }

  


  /* Disabled */
  input:disabled {
    background: var(--color-neutral-10);
    color: var(--color-neutral-50);
  }

`;
