# Webpack Frontend Starterkit (Forked from [wbkd/webpack-starter](https://github.com/wbkd/webpack-starter))

A lightweight foundation for your next webpack based frontend project.


### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

### Features:

* ES6 Support
* Typescript Support
* Prettier
* Handlebars
* ImageMin
* PostCSS Support
* PostCSS SASS variables Support
* Linting via eslint
* Linting via stylelint with [@ittinc/stylelint](https://www.npmjs.com/package/@ittinc/stylelint)

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.
