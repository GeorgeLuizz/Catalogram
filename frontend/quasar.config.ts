// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers';

export default defineConfig((/* ctx */) => {
  return {
    boot: ['axios'],
    css: ['app.scss'],
    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],
    build: {
      target: {
        browser: 'baseline-widely-available',
        node: 'node22',
      },
      typescript: {
        strict: true,
        vueShim: true,
      },
      vueRouterMode: 'hash',
      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            vueTsc: true,
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },
    devServer: {
      open: true, // opens browser window automatically
    },
    framework: {
      config: {
        notify: { position: 'bottom' }
      },
      iconSet: 'material-icons',
      plugins: [],
    },
    animations: [],
    ssr: {
      prodPort: 3000, // The default port that the production server should use
       middlewares: [
        'render', // keep this as last one
      ],
      pwa: false,
    },
    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
    },

  
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },
    capacitor: {
      hideSplashscreen: true,
    },
    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager', // 'packager' or 'builder'
      packager: {

      },
      builder: {
        appId: 'catalogram-frontend',
      },
    },
    bex: {
      extraScripts: [],
    },
  };
});
