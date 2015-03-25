var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngSanitize'])
	
	.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider
				.when('/Introduction', {
					controller : 'IntroductionCtrl',
					controllerAs: 'page',
					templateUrl : Directory.url+'/partials/introduction.html'
				})
				.when('/Design', {
					controller : 'DesignCtrl',
					controllerAs: 'page',
					templateUrl : Directory.url+'/partials/design.html'
				})
				.when('/Hydromassage', {
					controller : 'HydromassageCtrl',
					controllerAs: 'page',
					templateUrl : Directory.url+'/partials/hydromassage.html'
				})
				.when('/Technology', {
					controller : 'TechnologyCtrl',
					controllerAs: 'page',
					templateUrl : Directory.url+'/partials/technology.html'
				})
				.when('/Specifications', {
					controller : 'SpecificationsCtrl',
					controllerAs: 'page',
					templateUrl : Directory.url+'/partials/specifications.html'
				})
				.when('/Order', {
					controller : 'OrderCtrl',
					controllerAs: 'page',
					templateUrl : Directory.url+'/partials/formholder.html'
				})
				.when('/Ordernow', {
					controller : 'OrderCtrl',
					controllerAs: 'page',
					templateUrl : Directory.url+'/partials/formholder.html'
				})
				.when('/Own', {
					controller : 'OwnCtrl',
					controllerAs: 'page',
					templateUrl : Directory.url+'/partials/own.html'
				})
				.when('/ThankYou', {
					controller : 'ThankCtrl',
					controllerAs: 'page',
					templateUrl : Directory.url+'/partials/thank.html'
				})
				.otherwise({
					redirectTo : '/Introduction'
				});

				$locationProvider.html5Mode({
					enabled: true
				});
	}])
	.controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', '$http',
		function($scope, $route, $routeParams, $location, $http) {
			this.$route = $route;
			this.$location = $location;
			this.$routeParams = $routeParams;

			$scope.transition = 'up';
			
			$scope.videotemplate = Directory.url+'/partials/video.html';
			$scope.formtemplate = Directory.url+'/partials/form.html';
			
			$scope.pagePrev = function () {
				$scope.transition = 'down';
				$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
			};

			$scope.pageNext = function () {
				$scope.transition = 'up';
				$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
			};

			$scope.isActive = function(path){
				if ( $location.path().substr(0, path.length) == path ) {
					return "active"
				} else {
					return ""
				}
			};
			
			$scope.tubs = [];
			//	{name:'J-585', image: Directory.url+'/images/J-585-overhead.png', id:'585', seating:'6-7 adults', lounge:'Yes', jets:'55'},
			//	{name:'J-575', image: Directory.url+'/images/J-575-overhead.png', id:'575', seating:'5-6 adults', lounge:'No', jets:'53'}
			//];
			
			$http.post(MyAjax.ajaxurl, { action: "get_tub_data", nonce: wpApiOptions.tubnonce }).success(function(response) {
			    $scope.tubs = response;
			});
			
			$scope.skirtColors = [
				{name:'Silverwood'},
				{name:'Roasted Chestnut'}
			];

			$scope.shellColors = [
				{name:'Sand'},
				{name:'Opal Monaco'},
				{name:'Midnight'},
				{name:'Caribbean Surf'},
				{name:'Titanium'}
			];

			$scope.specs = [];
			/*
				{row1: "MODEL NAME:", row2: $scope.tubs[0].name + "™", row3: $scope.tubs[1].name + "™"},
				{row1: "SEATING CAPACITY:", row2: $scope.tubs[0].seating, row3: $scope.tubs[1].seating},
				{row1: "DIMENSIONS: (L X W X H)", row2: '91" X 91" X 36"', row3: '91" X 91" X 36"'},
				{row1: "DRY WEIGHT:", row2: "", row3: ""},
				{row1: "TOTAL FILLED WEIGHT:", row2: "", row3: ""},
				{row1: "AVERAGE SPA VOLUME:", row2: "", row3: ""},
				{row1: "PUMP 1: NORTH AMERICA:", row2: "1 speed, 2.5 cont hp (5.1 bhp)", row3: "1 speed, 2.5 cont hp (5.1 bhp)"},
				{row1: "PUMP 1: INTERNATIONAL:", row2: "1 speed, 2.0 cont hp (2.6 bhp)", row3: "1 speed, 2.0 cont hp (2.6 bhp)"},
				{row1: "PUMP 2: NORTH AMERICA:", row2: "1 speed, 2.5 cont hp (5.1 bhp)", row3: "1 speed, 2.5 cont hp (5.1 bhp)"},
				{row1: "IPUMP 2: NTERNATIONAL:", row2: "1 speed, 2.0 cont hp (2.6 bhp)", row3: "1 speed, 2.0 cont hp (2.6 bhp)"},
				{row1: "TOTAL JETS:", row2: $scope.tubs[0].jets, row3: $scope.tubs[1].jets},
				{row1: "PowerPro MX2", row2: "5", row3: "3"},
				{row1: "Mini PowerPro FX", row2: "0", row3: "8"},
				{row1: "PowerPro RX (dual port)", row2: "6", row3: "8"},
				{row1: "PowerPro IX", row2: "0", row3: "0"},
				{row1: "PowerPro NX2 (pulse)", row2: "6", row3: "6"},
				{row1: "PowerPro FX-S", row2: "14", row3: "10"},
				{row1: "PowerPro FX", row2: "6", row3: "8"},
				{row1: "PowerPro FX2-S", row2: "6", row3: "5"},
				{row1: "PowerPro HX", row2: "2", row3: "2"},
				{row1: "PowerPro PX (new)", row2: "8", row3: "2"},
				{row1: "LOUNGE SEATING:", row2: $scope.tubs[0].lounge, row3: $scope.tubs[1].lounge},
				{row1: "FILTERS:", row2: "ProClarity™ Filtration System w/ Grill, Skimming Weir and ProCatch Bag + ProClear™ Pleated Filter, 1 - ProClarity™ Depth Load Filter, 1 - ProClarity™ 40 Sq Ft Filter, 1 - ProClear™ 75 Sq Ft Filter", row3: "ProClarity™ Filtration System w/ Grill, Skimming Weir and ProCatch Bag + ProClear™ Pleated Filter, 1- ProClarity™ Depth Load Filter, 1 - ProClarity™ 40 Sq Ft Filter, 1 - ProClear™ 75 Sq Ft Filter"},
				{row1: "WATER PURIFICATION SYSTEM:", row2: "CLEARRAY®", row3: "CLEARRAY®"},
				{row1: "LIGHTING:", row2: "Multicolor LED Lighting", row3: "Multicolor LED Lighting"},
				{row1: "PILLOWS:", row2: "4", row3: "4"},
				{row1: "WATERFALLS:", row2: "2 WaterColour™ Waterfalls", row3: "2 WaterColour™ Waterfalls"},
				{row1: "ELECTRICAL NORTH AMERICA:", row2: "240VAC 60Hz 30A/50A/60A", row3: "240VAC 60Hz 30A/50A/60A"},
				{row1: "ELECTRICAL INTERNATIONAL:", row2: "230-240VAC 50Hz 20A", row3: "230-240VAC 50Hz 20A"},
				{row1: "STEREO:", row2: "Optional", row3: "Optional"},
				{row1: "CURVALUX™ SKIRT COLORS:", row2: "Silverwood, Roasted Chestnut", row3: "Silverwood, Roasted Chestnut"},
				{row1: "ACRYLIC COLOR SHELLS:", row2: "Sand, Opal Monaco, Midnight, Caribbean Surf, Titanium", row3: "Sand, Opal Monaco, Midnight, Caribbean Surf, Titanium"}
			];
			*/
			
			$scope.slidesDesign = [
				{image: Directory.url+'/images/design-slide-1.jpg', description: 'Image 01', rel: 'slide1'},
				{image: Directory.url+'/images/design-slide-2.jpg', description: 'Image 02', rel: 'slide2'},
				{image: Directory.url+'/images/design-slide-3.jpg', description: 'Image 03', rel: 'slide3'}
			];

			$scope.slidesHydromassage = [
				{image: Directory.url+'/images/hydromassage-slide-1.jpg', description: 'Image 01', rel: 'slide1'},
				//{image: 'images/hydromassage-slide-2.jpg', description: 'Image 02', rel: 'slide2'},
				//{image: 'images/hydromassage-slide-3.jpg', description: 'Image 03', rel: 'slide3'}
			];

	}])
	.controller('IntroductionCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		this.name = "Introduction";
		this.pageId = 1;
		this.params = $routeParams;
		this.styles = "light-grey";

		//$scope.tubs = $scope.$parent.tubs;

			$http.post(MyAjax.ajaxurl, { action: "get_tub_data", nonce: wpApiOptions.tubnonce }).success(function(response) {
			    $scope.tubs = response;
			});
					
		
		$scope.videotemplate = $scope.$parent.videotemplate;
		
		$scope.heading ="";
		$scope.desc ="";
		
		$http.post(MyAjax.ajaxurl, { action: "get_page_data", pagename: "introduction", nonce: wpApiOptions.pagenonce }).success(function(response) {
		    $scope.heading = response.heading;
		    $scope.desc = response.desc;
		});

		$scope.showVideo = false;

		$scope.toggleVideo = function() {
			$scope.showVideo = !$scope.showVideo;
		};

	}])
	.controller('DesignCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		this.name = "Design";
		this.pageId = 2;
		this.params = $routeParams;
		this.styles = "light-grey";
		
		
		$scope.heading ="";
		$scope.desc ="";
		$scope.learnmore ="";
		$scope.sliderimages ="";
		$scope.images = "";
		
		$http.post(MyAjax.ajaxurl, { action: "get_page_data", pagename: "design", nonce: wpApiOptions.pagenonce }).success(function(response) {
		    $scope.heading = response.heading;
		    $scope.desc = response.desc;
		    $scope.learnmore = response.learnmore;
			$scope.slides =  response.sliderimages;
			$scope.pictures =  response.sliderimages;
		});
	     
		$scope.direction = 'left';
		$scope.currentIndex = 0;

		$scope.setCurrentSlideIndex = function (index) {
			$scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
			$scope.currentIndex = index;
		};

		$scope.isCurrentSlideIndex = function (index) {
			return $scope.currentIndex === index;
		};

		$scope.prevSlide = function () {
			$scope.direction = 'left';
			$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
		};

		$scope.nextSlide = function () {
			$scope.direction = 'right';
			$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
		};
	}])
	.controller('HydromassageCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		this.name = "Hydromassage";
		this.pageId = 3;
		this.params = $routeParams;
		this.styles = "light-grey";

		$scope.slides = $scope.$parent.slidesHydromassage;
		
		$http.post(MyAjax.ajaxurl, { action: "get_page_data", pagename: "hydromassage", nonce: wpApiOptions.pagenonce }).success(function(response) {
		    $scope.heading = response.heading;
		    $scope.desc = response.desc;
		    $scope.learnmore = response.learnmore;
			$scope.slides =  response.sliderimages;
			$scope.pictures =  response.sliderimages;
		});
		
		$scope.direction = 'left';
		$scope.currentIndex = 0;

		$scope.setCurrentSlideIndex = function (index) {
			$scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
			$scope.currentIndex = index;
		};

		$scope.isCurrentSlideIndex = function (index) {
			return $scope.currentIndex === index;
		};

		$scope.prevSlide = function () {
			$scope.direction = 'left';
			$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
		};

		$scope.nextSlide = function () {
			$scope.direction = 'right';
			$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
		};
	}])
	.controller('TechnologyCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		this.name = "Technology";
		this.pageId = 4;
		this.params = $routeParams;
		this.styles = "light-grey";
		
		
		$http.post(MyAjax.ajaxurl, { action: "get_page_data", pagename: "technology", nonce: wpApiOptions.pagenonce }).success(function(response) {
		    $scope.heading = response.heading;
		    $scope.desc = response.desc;
		    $scope.learnmore = response.learnmore;
			$scope.slides =  response.sliderimages;
			$scope.pictures =  response.sliderimages;
		});
		
	}])
	.controller('SpecificationsCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		this.name = "Specifications";
		this.pageId = 5;
		this.params = $routeParams;
		this.styles = "";

		$scope.selectedTub = [];

		$scope.tubs = $scope.$parent.tubs;
		$scope.skirtColors = $scope.$parent.skirtColors;
		$scope.shellColors = $scope.$parent.shellColors;
		$scope.specs = $scope.$parent.specs;

		$scope.currentIndex = 0;
		
		$http.post(MyAjax.ajaxurl, { action: "get_page_data", pagename: "specifications", nonce: wpApiOptions.pagenonce }).success(function(response) {
		    $scope.heading = response.heading;
		    $scope.desc = response.desc;
		    $scope.learnmore = response.learnmore;
			$scope.slides =  response.sliderimages;
		});
		
	}])
	.controller('ThankCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		this.name = "ThankYou";
		this.pageId = 7;
		this.params = $routeParams;
		this.styles = "Specifications";

		$scope.selectedTub = [];

		$scope.tubs = $scope.$parent.tubs;
		$scope.skirtColors = $scope.$parent.skirtColors;
		$scope.shellColors = $scope.$parent.shellColors;
		$scope.specs = $scope.$parent.specs;

		$scope.currentIndex = 0;
		
		$http.post(MyAjax.ajaxurl, { action: "get_page_data", pagename: "thankyou", nonce: wpApiOptions.pagenonce }).success(function(response) {
		    $scope.heading = response.heading;
		    $scope.desc = response.desc;
		    $scope.learnmore = response.learnmore;
			$scope.slides =  response.sliderimages;
		});
		
	}])
	.controller('OrderCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
		this.name = "Order";
		this.pageId = 6;
		this.params = $routeParams;
		this.styles = "Specifications";
		
		$scope.formtemplate = $scope.$parent.formtemplate;
		
		$scope.selectedTub = [];

		$scope.tubs = $scope.$parent.tubs;
		$scope.skirtColors = $scope.$parent.skirtColors;
		$scope.shellColors = $scope.$parent.shellColors;
		
		$scope.currentIndex = 0;

		$scope.result = 'hidden';
		$scope.resultMessage;
		$scope.formData = {};
		$scope.submitButtonDisabled = false;
		$scope.submitted = false;
		
		$scope.submit = function(orderForm) {
			$scope.submitted = true;
			$scope.submitButtonDisabled = true;
			if (orderForm.$valid) {
				//console.log($scope.formData.tubName);
				$http({
					method  : 'POST',
					url     : Directory.url+'/contact-form.php',
					data    : $scope.formData,  //param method from jQuery
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
				})
				.success(function(data){
					console.log(data);
					if (data.success) { //success comes from the return json object
						$location.path("/ThankYou");
						//$scope.submitButtonDisabled = true;
						//$scope.resultMessage = data.message;
						//$scope.result='bg-success';
					}
					else {
						$scope.submitButtonDisabled = false;
						$scope.resultMessage = data.message;
						$scope.result='bg-danger';
					}
				});
			}
			else {
				$scope.submitButtonDisabled = false;
				$scope.resultMessage = 'Please fill out all the fields.';
				$scope.result='bg-danger';
			}
		};

		//$scope.setCurrentTub = function (index) {
		//	$scope.selectedTub = $scope.tubs[index];
		//	$scope.formData.tubName = $scope.selectedTub.name;
		//};

		//$scope.isCurrentTub = function (index) {
		//	return $scope.selectedTub === $scope.tubs[index];
		//};

	}])
	.config(['$httpProvider', function ($httpProvider) {
	  // Intercept POST requests, convert to standard form encoding
	  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
	    var key, result = [];
	    for (key in data) {
	      if (data.hasOwnProperty(key)) {
	        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
	      }
	    }
	    return result.join("&");
	  });
	}]);
	
	myApp.directive('slideit', function () {
	    return function (scope, elm, attrs) {
	        scope.$watch(attrs.slideit, function (images) {
	            var html = '';
	            for (var i = 0; i < images.length; i++) {
	                html += '<li><img src="' + images[i].src + '" alt="" /></li>';
	            }
	            jQuery("#" + jQuery(elm[0]).attr('id')).html(html).bxSlider({
	                adaptiveHeight: true,
	                mode: 'horizontal',
	                pager: true,
	                auto: (jQuery("#" + jQuery(elm[0]).attr('id')).html(html).children().length < 2) ? false : true,
	                controls: false
	            });
	        });
	    };
	});