# VIVIENDO DIFERENCIA
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

## Generate icon fonts
Check the documentation of the grunt plugin:
- https://github.com/sapegin/grunt-webfont/blob/master/Readme.md

Important!: You need to install `fontforge` in your OS because is the engine that we are using to generate the icons. http://fontforge.github.io/en-US/downloads/mac-dl/  or
```
brew install fontforge
```

After install this package execute:
Add new icons: `static/svg/svg-icon`
```
npm run generate-icons-font 
```
