function countJSON(data) {
	var count = 0;
	Object.keys(data).forEach(function (key) {
	    count++;
	});

	return count;
}

/* service curl */
var base_url = "http://mangagraber.fajarlabs.com/mangaku.php";

angular.module('starter.controllers', ['ionic','jett.ionic.filter.bar'])

.controller('AppCtrl', function($scope, $http, $ionicLoading) {

	$scope.doRefresh = function() {
		$http.get(base_url+'?action=getAllSites').
		success(function(data, status, headers, config) {
			$scope.all_sites = data;
			$scope.hideLoading();
			$scope.$broadcast('scroll.refreshComplete'); /* hide refresh */
		}).error(function(data, status, headers, config) { /* do something */ 
			$scope.hideLoading();
			$scope.$broadcast('scroll.refreshComplete'); /* hide refresh */
		});
	};

   $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };

   $scope.showLoading();

	$http.get(base_url+'?action=getAllSites').
	success(function(data, status, headers, config) {
		$scope.all_sites = data;
		$scope.hideLoading();
	}).error(function(data, status, headers, config) { /* do something */ 
		$scope.hideLoading();
	});
})

.controller('LihatTerpopulerCtrl', function($scope,$http,$stateParams, $ionicLoading ) { 

	$scope.doRefresh = function() {
		$http.get(base_url+'?action=getPopularSites').
		success(function(data, status, headers, config) {
			$scope.daftar_terpopuler = data;
			$scope.hideLoading();
			$scope.$broadcast('scroll.refreshComplete'); /* hide refresh */
		}).error(function(data, status, headers, config) { /* do something */
			$scope.hideLoading(); 
			$scope.$broadcast('scroll.refreshComplete'); /* hide refresh */
		});
	};

   $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };

   $scope.showLoading();

	$http.get(base_url+'?action=getPopularSites').
	success(function(data, status, headers, config) {
		$scope.daftar_terpopuler = data;
		$scope.hideLoading();
	}).error(function(data, status, headers, config) { /* do something */
		$scope.hideLoading(); 
	});
})

.controller('SemuaEpisodeCtrl', function($scope,$http,$stateParams,$ionicPopup, $timeout, $ionicLoading, $ionicHistory,$ionicSideMenuDelegate, $ionicFilterBar) { 

	$scope.showFilterBar = function () {
      filterBar = $ionicFilterBar.show({
        items: $scope.semua_episode,
        update: function (filteredItems) {
          $scope.semua_episode = filteredItems
        }
        //filterProperties : 'first_name'
      });
    }

	$scope.doRefresh = function() {
		$http.get(base_url+'?action=getMangaAllEpisode&site='+$stateParams.url_situs).
		success(function(data, status, headers, config) {
			$scope.semua_episode = data;
			$scope.hideLoading();
			$scope.$broadcast('scroll.refreshComplete'); /* hide refresh */
		}).error(function(data, status, headers, config) { /* do something */ 
			$scope.hideLoading();
			$scope.$broadcast('scroll.refreshComplete'); /* hide refresh */
		});
	};

   $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };

   $scope.showLoading();

	$http.get(base_url+'?action=getMangaAllEpisode&site='+$stateParams.url_situs).
	success(function(data, status, headers, config) {
		$scope.semua_episode = data;
		$scope.hideLoading();
	}).error(function(data, status, headers, config) { /* do something */ 
		$scope.hideLoading();
	});
})

.controller('BacaMangaCtrl', function($scope,$http,$stateParams,$ionicPopup, $timeout, $ionicLoading, $ionicHistory,$ionicSideMenuDelegate, $ionicFilterBar,$ionicModal) { 


    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      	$scope.modal.show();
    };

    $scope.closeModal = function() {
      	$scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';

    $scope.showImage = function(href) {
    	$scope.imageSrc = href;
      	$scope.openModal();
    }

	$scope.doRefresh = function() {
		$http.get(base_url+'?action=getEpisode&site='+$stateParams.url_situs).
		success(function(data, status, headers, config) {
			$scope.baca_manga = data;
			$scope.hideLoading();
			$scope.$broadcast('scroll.refreshComplete'); /* hide refresh */
		}).error(function(data, status, headers, config) { /* do something */ 
			$scope.hideLoading();
			$scope.$broadcast('scroll.refreshComplete'); /* hide refresh */
		});

	};

   $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };

   $scope.showLoading();

	$http.get(base_url+'?action=getEpisode&site='+$stateParams.url_situs).
	success(function(data, status, headers, config) {
		$scope.baca_manga = data;
		$scope.hideLoading();
	}).error(function(data, status, headers, config) { /* do something */ 
		$scope.hideLoading();
	});
})

.controller('LihatSitusCtrl', function($scope,$http,$stateParams,$ionicPopup, $timeout, $ionicLoading, $ionicHistory,$ionicSideMenuDelegate, $ionicFilterBar) { 
  
  	/* Search bar */

    $scope.showFilterBar = function () {
      filterBar = $ionicFilterBar.show({
        items: $scope.daftar_situs,
        update: function (filteredItems) {
          $scope.daftar_situs = filteredItems
        }
        //filterProperties : 'first_name'
      });
    }

	$scope.doRefresh = function () {

		$http.get(base_url+'?action=comicCategory&site='+$stateParams.url_situs).
		success(function(data, status, headers, config) {
			if(countJSON(data) > 0)
				$scope.daftar_situs = data;
			else
				$scope.showAlert("Sorry brother, data tidak ada!");

			$scope.hideLoading();
			$scope.$broadcast('scroll.refreshComplete');
		}).error(function(data, status, headers, config) { 
			$scope.showAlert("Sorry brother, gagal");
			$scope.hideLoading();
			$scope.$broadcast('scroll.refreshComplete');
		});
	}

	/* Toogle */

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

	$scope.data=["JavaScript","Java","Ruby","Python"];

	$scope.search = "CARI MANGA";

	$scope.visibilityToggle = function() {
		var result = false;
		if(!$ionicHistory.backView()) { /* periksa apakah terdapat history untuk kembali / back */
			result = true;
		}
		return result;
	};

   $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };

   $scope.showLoading();

	$scope.showAlert = function(title) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: 'Alert'
		});
		alertPopup.then(function(res) {
			/* do with alert */
			$scope.hideLoading();
		});
	};
	
	$http.get(base_url+'?action=comicCategory&site='+$stateParams.url_situs).
	success(function(data, status, headers, config) {
		if(countJSON(data) > 0)
			$scope.daftar_situs = data;
		else
			$scope.showAlert("Sorry brother, data tidak ada!");

		$scope.hideLoading();
	}).error(function(data, status, headers, config) { 
			$scope.showAlert("Sorry brother, gagal");
			$scope.hideLoading();
	});
})

/**
 * @ngdoc directive
 * @name ngPinchZoom
 * @restrict A
 * @scope false
 **/
.directive('ngPinchZoom', function() {

  var _directive =  {
    restrict : 'A',
    scope    : false,
    link     : _link
  };

  function _link(scope, element, attrs) {
    var elWidth, elHeight;

    // mode : 'pinch' or 'swipe'
    var mode = '';

    // distance between two touche points (mode : 'pinch')
    var distance = 0;
    var initialDistance = 0;

    // image scaling
    var scale = 1;
    var relativeScale = 1;
    var initialScale = 1;
    var maxScale = parseInt(attrs.maxScale, 10);
    if (isNaN(maxScale) || maxScale <= 1) {
      maxScale = 3;
    }

    // position of the upper left corner of the element
    var positionX = 0;
    var positionY = 0;

    var initialPositionX = 0;
    var initialPositionY = 0;

    // central origin (mode : 'pinch')
    var originX = 0;
    var originY = 0;

    // start coordinate and amount of movement (mode : 'swipe')
    var startX = 0;
    var startY = 0;
    var moveX = 0;
    var moveY = 0;

    var image = new Image();
    image.onload = function() {
      elWidth = element[0].clientWidth;
      elHeight = element[0].clientHeight;

      element.css({
        '-webkit-transform-origin' : '0 0',
        'transform-origin'         : '0 0'
      });

      element.on('touchstart', touchstartHandler);
      element.on('touchmove', touchmoveHandler);
      element.on('touchend', touchendHandler);
    };

    if (attrs.ngSrc) {
      image.src = attrs.ngSrc;
    } else {
      image.src = attrs.src;
    }

    /**
     * @param {object} evt
     */
    function touchstartHandler(evt) {

      var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

      startX = touches[0].clientX;
      startY = touches[0].clientY;
      initialPositionX = positionX;
      initialPositionY = positionY;
      moveX = 0;
      moveY = 0;
    }

    /**
     * @param {object} evt
     */
    function touchmoveHandler(evt) {
      var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

      if (mode === '') {
        if (touches.length === 1 && scale > 1) {

          mode = 'swipe';

        } else if (touches.length === 2) {

          mode = 'pinch';

          initialScale = scale;
          initialDistance = getDistance(touches);
          originX = touches[0].clientX -
                    parseInt((touches[0].clientX - touches[1].clientX) / 2, 10) -
                    element[0].offsetLeft - initialPositionX;
          originY = touches[0].clientY -
                    parseInt((touches[0].clientY - touches[1].clientY) / 2, 10) -
                    element[0].offsetTop - initialPositionY;

        }
      }

      if (mode === 'swipe') {
        evt.preventDefault();

        moveX = touches[0].clientX - startX;
        moveY = touches[0].clientY - startY;

        positionX = initialPositionX + moveX;
        positionY = initialPositionY + moveY;

        transformElement(); 

      } else if (mode === 'pinch') {
        evt.preventDefault();

        distance = getDistance(touches);
        relativeScale = distance / initialDistance;
        scale = relativeScale * initialScale;

        positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
        positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

        transformElement();

      }
    }

    /**
     * @param {object} evt
     */
    function touchendHandler(evt) {

      var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

      if (mode === '' || touches.length > 0) {
        return;
      }

      if (scale < 1) {

        scale = 1;
        positionX = 0;
        positionY = 0;

      } else if (scale > maxScale) {

        scale = maxScale;
        relativeScale = scale / initialScale;
        positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
        positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

      } /*else {

        if (positionX > 0) {
          positionX = 0;
        } else if (positionX < elWidth * (1 - scale)) {
          positionX = elWidth * (1 - scale);
        }
        if (positionY > 0) {
          positionY = 0;
        } else if (positionY < elHeight * (1 - scale)) {
          positionY = elHeight * (1 - scale);
        }

      }*/

      // transformElement(1);
      mode = '';
    }

    /**
     * @param {Array} touches
     * @return {number}
     */
    function getDistance(touches) {
      var d = Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) +
                        Math.pow(touches[0].clientY - touches[1].clientY, 2));
      return parseInt(d, 10);
    }

    /**
     * @param {number} [duration]
     */
    function transformElement(duration) {
      var transition  = duration ? 'all cubic-bezier(0,0,.5,1) ' + duration + 's' : '';
      var matrixArray = [scale, 0, 0, scale, positionX, positionY];
      var matrix      = 'matrix(' + matrixArray.join(',') + ')';

      element.css({
        '-webkit-transition' : transition,
        transition           : transition,
        '-webkit-transform'  : matrix + ' translate3d(0,0,0)',
        transform            : matrix
      });
    }
  }

  return _directive;
})

.directive('searchBar', [function () {
	return {
		scope: {
			ngModel: '='
		},
		require: ['^ionNavBar', '?ngModel'],
		restrict: 'E',
		replace: true,
		template: '<ion-nav-buttons side="right">'+
						'<div class="searchBar">'+
							'<div class="searchTxt" ng-show="ngModel.show">'+
						  		'<div class="bgdiv"></div>'+
						  		'<div class="bgtxt">'+
						  			'<input style="background:#fff;width:100%;color:#ccc;" type="text" placeholder="Cari..." ng-model="ngModel.txt">'+
						  		'</div>'+
					  		'</div>'+
						  	'<i class="icon placeholder-icon" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show"></i>'+
						'</div>'+
					'</ion-nav-buttons>',
		
		compile: function (element, attrs) {
			var icon=attrs.icon
					|| (ionic.Platform.isAndroid() && 'ion-android-search')
					|| (ionic.Platform.isIOS()     && 'ion-ios7-search')
					|| 'ion-search';
			angular.element(element[0].querySelector('.icon')).addClass(icon);
			
			return function($scope, $element, $attrs, ctrls) {
				var navBarCtrl = ctrls[0];
				$scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;
				
			};
		},
		controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
			var title, definedClass;
			$scope.$watch('ngModel.show', function(showing, oldVal, scope) {
				if(showing!==oldVal) {
					if(showing) {
						if(!definedClass) {
							var numicons=$scope.navElement.children().length;
							angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
						}
						
						title = $ionicNavBarDelegate.title();
						$ionicNavBarDelegate.setTitle('');
					} else {
						$ionicNavBarDelegate.setTitle(title);
					}
				} else if (!title) {
					title = $ionicNavBarDelegate.title();
				}
			});
		}]
	};
}]);