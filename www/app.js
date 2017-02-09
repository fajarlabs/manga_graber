// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "menu.html",
      controller: 'AppCtrl'
    })

    /* lihat situs manga paling populer */
    .state('app.lihat_terpopuler', {
      url: "/lihat_terpopuler",
      views: {
        'menuContent' :{
          templateUrl: "lihat_terpopuler.html",
          controller: 'LihatTerpopulerCtrl'
        }
      }
    })

    /* menampilkan semua episode manga di situs yang di pilih */
    .state('app.semua_episode', {
      url: "/semua_episode/:title/:url_situs",
      views: {
        'menuContent' :{
          templateUrl: "semua_episode.html",
          controller: 'SemuaEpisodeCtrl'
        }
      }
    })

    /* menampilkan daftar manga yang ada di situs tersebut */
    .state('app.lihat_situs', {
      url: "/lihat_situs/:title/:url_situs",
      views: {
        'menuContent' :{
          templateUrl: "lihat_situs.html",
          controller: 'LihatSitusCtrl'
        }
      }
    })

    /* baca manga */
    .state('app.baca_manga', {
      url: "/baca_manga/:title/:url_situs",
      views: {
        'menuContent' :{
          templateUrl: "baca_manga.html",
          controller: 'BacaMangaCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/lihat_terpopuler');
});
