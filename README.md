# Tesonet FrontEnd developer task

## Basic instructions

To run the project in development mode with live reload:

`npm start`

To build a production bundle:

`npm build`

To run test:

`npm run test`

To lint the project:

`npm run lint`

To verify TypeScript types:

`npm run types`

To run the production bundle size analyzer:

`npm run analyze`

## Design and motivation

Since using Redux was part of the task and using it just to store the list did
not sound fun at all, I have decided to use thunk and connected router to handle
all app side effects. Helping to separate the presentation layer from other concerns.


## Stack Notes

Bundler: Webpack,
Transpiler: Babel,
Styles: Styled Components
State Management: Redux + Redux Toolkit
Side Effects: Thunk + Connected React Router
REST: Axios
Tests: react-testing-library

## TODO
* Custom Scrollbar
* Add font to the bundle
* Review
* Improve Styled components theme to have proper Types 
