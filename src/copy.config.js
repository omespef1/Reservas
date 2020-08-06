//Archivo para definir qué recuros quedarán en la carpeta build  o www cuando se compile
//El archivo original se encuentra dentro de node_modules\@ionic\app-scripts\config\copy.config.js  ... 
//Se debe reeemplazar por este en  caso de que se re instalen los node_modules o cuando se usa una máquina de trabajo nueva
module.exports = {

  includePaths: [
    'node_modules/ionic-angular/themes',
    'node_modules/ionicons/dist/css',
    'node_modules/ionic-angular/fonts',
    'node_modules/bootstrap/scss',
  ],
    copyAssets: {
      src: ['{{SRC}}/assets/**/*'],
      dest: '{{WWW}}/assets'
    },
    copyIndexContent: {
      src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js','{{SRC}}/web.html'],
      dest: '{{WWW}}'
    },
    copyFonts: {
      src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
      dest: '{{WWW}}/assets/fonts'
    },
    copyPolyfills: {
      src: [`{{ROOT}}/node_modules/ionic-angular/polyfills/${process.env.IONIC_POLYFILL_FILE_NAME}`],
      dest: '{{BUILD}}'
    },
    copySwToolbox: {
      src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
      dest: '{{BUILD}}'
    }
  }
  