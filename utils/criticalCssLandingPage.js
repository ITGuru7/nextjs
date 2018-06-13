export default `.jss16 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.jss17 {
  margin: 0;
  box-sizing: border-box;
}
.jss19 {
  flex-direction: column;
}
.jss24 {
  align-items: center;
}
.jss33 {
  justify-content: center;
}
.jss42 {
  flex-grow: 1;
  max-width: 100%;
  flex-basis: 0;
}
@media (min-width: 0px) and (max-width: 599.95px) {
  .jss1 {
    display: none;
  }
}
@media (min-width: 600px) and (max-width: 959.95px) {
  .jss4 {
    display: none;
  }
}
@media (min-width: 960px) and (max-width: 1279.95px) {
  .jss7 {
    display: none;
  }
}
@media (min-width: 1280px) and (max-width: 1919.95px) {
  .jss10 {
    display: none;
  }
}
@media (min-width: 1920px) {
  .jss13 {
    display: none;
  }
}
.jss107 {
  margin: 0;
  display: block;
}
.jss112 {
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.5rem;
  font-weight: 400;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.35417em;
}
.jss114 {
  color: rgba(0, 0, 0, 0.87);
  font-size: 1rem;
  font-weight: 400;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5em;
}
.jss115 {
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
  font-weight: 500;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.71429em;
}
.jss116 {
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
  font-weight: 400;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.46429em;
}
.jss119 {
  text-align: left;
}
.jss121 {
  text-align: right;
}
.jss124 {
  margin-bottom: 0.35em;
}
.jss127 {
  color: #424242;
}
.jss128 {
  color: #0e8ab0;
}
@font-face {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  src: local("Roboto Light"), local("Roboto-Light"),
    url(/static/fonts/roboto-v18-latin-300.woff2) format("woff2"),
    url(/static/fonts/roboto-v18-latin-300.woff) format("woff");
}
@font-face {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url(/static/fonts/roboto-v18-latin-regular.woff2) format("woff2"),
    url(/static/fonts/roboto-v18-latin-regular.woff) format("woff");
}
@font-face {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  src: local("Roboto Medium"), local("Roboto-Medium"),
    url(/static/fonts/roboto-v18-latin-500.woff2) format("woff2"),
    url(/static/fonts/roboto-v18-latin-500.woff) format("woff");
}
body {
  margin: 0;
  padding: 0;
  background-color: #fff;
}
html * {
  font-family: Roboto, sans-serif;
}
*,
::after,
::before {
  box-sizing: inherit;
}
a {
  text-decoration: none;
}
a:visited {
  color: #0e8ab0;
}
html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
input {
  outline: 0;
  border: 1px solid #0e8ab0;
}
@media (max-width: 600px) {
  .ais-SearchBox-input {
    border-radius: 0 !important;
    border: 1px solid #d2d2d2 !important;
    height: 40px !important;
    padding-left: 0.3rem !important;
    padding-right: 0.3rem !important;
    width: 100% !important;
  }
}
@media (min-width: 601px) and (max-width: 959px) {
  .ais-SearchBox-input {
    border-radius: 0 !important;
    border: 1px solid #d2d2d2 !important;
    height: 40px !important;
    padding-left: 0.3rem !important;
    padding-right: 0.3rem !important;
    width: 100% !important;
  }
}
.ais-SearchBox-input:focus {
  border: 1px solid #0e8ab0 !important;
}
@media (min-width: 960px) {
  .ais-SearchBox-input {
    border-radius: 0 !important;
    border: 1px solid #d2d2d2 !important;
    height: 34px !important;
    padding-left: 0.3rem !important;
    padding-right: 0.3rem !important;
    width: 500px !important;
    border-right: #0e8ab0;
  }
}
.ais-SearchBox-input::-ms-clear,
.ais-SearchBox-input::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}
.ais-SearchBox-input::-webkit-search-cancel-button,
.ais-SearchBox-input::-webkit-search-decoration,
.ais-SearchBox-input::-webkit-search-results-button,
.ais-SearchBox-input::-webkit-search-results-decoration {
  display: none;
}
[class^="ais-"] {
  font-size: 1rem;
  box-sizing: border-box;
}
.ais-SearchBox-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0.3rem 1.7rem;
  width: 100%;
  position: relative;
  background-color: #fff;
  border: 1px solid #c4c8d8;
  border-radius: 5px;
}
.ais-SearchBox-input::-webkit-input-placeholder {
  color: #a5aed1;
}
.ais-SearchBox-input::-moz-placeholder {
  color: #a5aed1;
}
.ais-SearchBox-input:-ms-input-placeholder {
  color: #a5aed1;
}
.ais-SearchBox-input:-moz-placeholder {
  color: #a5aed1;
}
@media (max-width: 600px) {
  ._34ek51 {
    width: 200px !important;
  }
}
@media (min-width: 601px) {
  ._34ek51 {
    width: 250px !important;
  }
}
`;
