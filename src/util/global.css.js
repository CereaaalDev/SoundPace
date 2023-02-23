import { createGlobalStyle } from "styled-components";
import { COLORS } from "./Colors";
import { FONTSIZE } from "./FontSizes";

export default createGlobalStyle`

/* @link https://utopia.fyi/type/calculator?c=320,18,1.2,1500,18,1.25,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12 */

:root {
  --step--2: clamp(0.72rem, calc(0.80rem + -0.08vw), 0.78rem);
  --step--1: clamp(0.90rem, calc(0.95rem + -0.05vw), 0.94rem);
  --step-0: clamp(1.13rem, calc(1.13rem + 0.00vw), 1.13rem);
  --step-1: clamp(1.35rem, calc(1.33rem + 0.08vw), 1.41rem);
  --step-2: clamp(1.62rem, calc(1.58rem + 0.19vw), 1.76rem);
  --step-3: clamp(1.94rem, calc(1.87rem + 0.34vw), 2.20rem);
  --step-4: clamp(2.33rem, calc(2.22rem + 0.56vw), 2.75rem);
  --step-5: clamp(2.80rem, calc(2.63rem + 0.86vw), 3.43rem);
}

body {
    /* background-color:  #333f48; */
    background-color: #D9D9D9;
    color: black;
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
}

h1{
  font-size: var(--step-5);
  line-height: 65px;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

h2{
  font-size: var(--step-4);
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
h3{
  font-size: var(--step-3);
  font-weight : 600;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
h4{
  font-size: var(--step-2);
  font-weight: 400;
  margin-top: 1rem;
  margin-bottom: 5rem;
  font-family: 'Raleway', sans-serif;
  line-height: 32px;
}
h5{
  font-size: var(--step-1);
  font-weight: 400;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${COLORS.primary};
  font-weight: 600;
    
}
h6{
  font-size: var(--step-0);
  line-height: 28px;
  font-weight: 400;
  margin-bottom: 1rem;
  font-family: 'Raleway', sans-serif;
}
p{
  font-size: var(--step-0);
  font-family: 'Raleway', sans-serif;
  line-height: 28px;
}

`;
