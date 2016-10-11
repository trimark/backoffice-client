angular.module('docsApp', [ 'angularytics', 'ngRoute', 'ngMessages', 'ngMaterial' ], [
  'SERVICES',
  'COMPONENTS',
  'DEMOS',
  'PAGES',
  '$routeProvider',
  '$locationProvider',
  '$mdThemingProvider',
  '$mdIconProvider',
function(SERVICES, COMPONENTS, DEMOS, PAGES,
    $routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
}])
.config(['AngularyticsProvider', function(AngularyticsProvider) {
   AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
}])
.run(['Angularytics', function(Angularytics) {
  Angularytics.init();
}])
.factory('menu', [
  'SERVICES',
  'COMPONENTS',
  'DEMOS',
  'PAGES',
  '$location',
  '$rootScope',
  '$http',
  '$window',
function(SERVICES, COMPONENTS, DEMOS, PAGES, $location, $rootScope, $http, $window) {
}])
.directive('menuLink', function() {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'partials/menu-link.tmpl.html',
    link: function($scope, $element) {
      var controller = $element.parent().controller();

      $scope.isSelected = function() {
        return controller.isSelected($scope.section);
      };

      $scope.focusSection = function() {
        // set flag to be used later when
        // $locationChangeSuccess calls openPage()
        controller.autoFocusContent = true;
      };
    }
  };
})
.directive('menuToggle', [ '$timeout', '$mdUtil', function($timeout, $mdUtil) {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'partials/menu-toggle.tmpl.html',
    link: function($scope, $element) {
      var controller = $element.parent().controller();

      $scope.isOpen = function() {
        return controller.isOpen($scope.section);
      };
      $scope.toggle = function() {
        controller.toggleOpen($scope.section);
      };

      $mdUtil.nextTick(function() {
        $scope.$watch(
          function () {
            return controller.isOpen($scope.section);
          },
          function (open) {
            // We must run this in a next tick so that the getTargetHeight function is correct
            $mdUtil.nextTick(function() {
              var $ul = $element.find('ul');
              var $li = $ul[0].querySelector('a.active');
              var docsMenuContent = document.querySelector('.docs-menu').parentNode;
              var targetHeight = open ? getTargetHeight() : 0;

              $timeout(function () {
                // Set the height of the list
                $ul.css({height: targetHeight + 'px'});

                // If we are open and the user has not scrolled the content div; scroll the active
                // list item into view.
                if (open && $li && $li.offsetParent && $ul[0].scrollTop === 0) {
                  $timeout(function() {
                    var activeHeight = $li.scrollHeight;
                    var activeOffset = $li.offsetTop;
                    var parentOffset = $li.offsetParent.offsetTop;

                    // Reduce it a bit (2 list items' height worth) so it doesn't touch the nav
                    var negativeOffset = activeHeight * 2;
                    var newScrollTop = activeOffset + parentOffset - negativeOffset;

                    $mdUtil.animateScrollTo(docsMenuContent, newScrollTop);
                  }, 350, false);
                }
              }, 0, false);

              function getTargetHeight() {
                var targetHeight;
                $ul.addClass('no-transition');
                $ul.css('height', '');
                targetHeight = $ul.prop('clientHeight');
                $ul.css('height', 0);
                $ul.removeClass('no-transition');
                return targetHeight;
              }
            }, false);
          }
        );
      });

      var parentNode = $element[0].parentNode.parentNode.parentNode;
      if(parentNode.classList.contains('parent-list-item')) {
        var heading = parentNode.querySelector('h2');
        $element[0].firstChild.setAttribute('aria-describedby', heading.id);
      }
    }
  };
}])

.controller('DocsCtrl', [
  '$scope',
  'COMPONENTS',
  'BUILDCONFIG',
  '$mdSidenav',
  '$timeout',
  '$mdDialog',
  'menu',
  '$location',
  '$rootScope',
function($scope, COMPONENTS, BUILDCONFIG, $mdSidenav, $timeout, $mdDialog, menu, $location, $rootScope) {
  var self = this;

  $scope.COMPONENTS = COMPONENTS;
  $scope.BUILDCONFIG = BUILDCONFIG;
  $scope.menu = menu;

  $scope.path = path;
  $scope.goHome = goHome;
  $scope.openMenu = openMenu;
  $scope.closeMenu = closeMenu;
  $scope.isSectionSelected = isSectionSelected;

  // Grab the current year so we don't have to update the license every year
  $scope.thisYear = (new Date()).getFullYear();

  $rootScope.$on('$locationChangeSuccess', openPage);
  $scope.focusMainContent = focusMainContent;

  //-- Define a fake model for the related page selector
  Object.defineProperty($rootScope, "relatedPage", {
    get: function () { return null; },
    set: angular.noop,
    enumerable: true,
    configurable: true
  });

  $rootScope.redirectToUrl = function(url) {
    $location.path(url);
    $timeout(function () { $rootScope.relatedPage = null; }, 100);
  };

  // Methods used by menuLink and menuToggle directives
  this.isOpen = isOpen;
  this.isSelected = isSelected;
  this.toggleOpen = toggleOpen;
  this.autoFocusContent = false;


  var mainContentArea = document.querySelector("[role='main']");

  // *********************
  // Internal methods
  // *********************

  function closeMenu() {
    $timeout(function() { $mdSidenav('left').close(); });
  }

  function openMenu() {
    $timeout(function() { $mdSidenav('left').open(); });
  }

  function path() {
    return $location.path();
  }

  function goHome($event) {
    menu.selectPage(null, null);
    $location.path( '/' );
  }

  function openPage() {
    $scope.closeMenu();

    if (self.autoFocusContent) {
      focusMainContent();
      self.autoFocusContent = false;
    }
  }

  function focusMainContent($event) {
    // prevent skip link from redirecting
    if ($event) { $event.preventDefault(); }

    $timeout(function(){
      mainContentArea.focus();
    },90);

  }

  function isSelected(page) {
    return menu.isPageSelected(page);
  }

  function isSectionSelected(section) {
    var selected = false;
    var openedSection = menu.openedSection;
    if(openedSection === section){
      selected = true;
    }
    else if(section.children) {
      section.children.forEach(function(childSection) {
        if(childSection === openedSection){
          selected = true;
        }
      });
    }
    return selected;
  }

  function isOpen(section) {
    return menu.isSectionSelected(section);
  }

  function toggleOpen(section) {
    menu.toggleSelectSection(section);
  }
}])

.controller('HomeCtrl', [
  '$scope',
  '$rootScope',
function($scope, $rootScope) {
  $rootScope.currentComponent = $rootScope.currentDoc = null;
}])


.controller('GuideCtrl', [
  '$rootScope', '$http',
function($rootScope, $http) {
  $rootScope.currentComponent = $rootScope.currentDoc = null;
  if ( !$rootScope.contributors ) {
    $http
      .get('./contributors.json')
      .then(function(response) {
        $rootScope.github = response.data;
      })
  }
}])

.controller('LayoutCtrl', [
  '$scope',
  '$attrs',
  '$location',
  '$rootScope',
function($scope, $attrs, $location, $rootScope) {
  $rootScope.currentComponent = $rootScope.currentDoc = null;

  $scope.exampleNotEditable = true;
  $scope.layoutDemo = {
    mainAxis: 'center',
    crossAxis: 'center',
    direction: 'row'
  };
  $scope.layoutAlign = function() {
    return $scope.layoutDemo.mainAxis +
     ($scope.layoutDemo.crossAxis ? ' ' + $scope.layoutDemo.crossAxis : '')
  };
}])

.controller('LayoutTipsCtrl', [
function() {
  var self = this;

  /*
   * Flex Sizing - Odd
   */
  self.toggleButtonText = "Hide";

  self.toggleContentSize = function() {
    var contentEl = angular.element(document.getElementById('toHide'));

    contentEl.toggleClass("ng-hide");

    self.toggleButtonText = contentEl.hasClass("ng-hide") ? "Show" : "Hide";
  };
}])

.controller('ComponentDocCtrl', [
  '$scope',
  'doc',
  'component',
  '$rootScope',
function($scope, doc, component, $rootScope) {
  $rootScope.currentComponent = component;
  $rootScope.currentDoc = doc;
}])

.controller('DemoCtrl', [
  '$rootScope',
  '$scope',
  'component',
  'demos',
  '$templateRequest',
function($rootScope, $scope, component, demos, $templateRequest) {
  $rootScope.currentComponent = component;
  $rootScope.currentDoc = null;

  $scope.demos = [];

  angular.forEach(demos, function(demo) {
    // Get displayed contents (un-minified)
    var files = [demo.index]
      .concat(demo.js || [])
      .concat(demo.css || [])
      .concat(demo.html || []);
    files.forEach(function(file) {
      file.httpPromise = $templateRequest(file.outputPath)
        .then(function(response) {
          file.contents = response
            .replace('<head/>', '');
          return file.contents;
        });
    });
    demo.$files = files;
    $scope.demos.push(demo);
  });

  $scope.demos = $scope.demos.sort(function(a,b) {
    return a.name > b.name ? 1 : -1;
  });

}])

.filter('nospace', function () {
  return function (value) {
    return (!value) ? '' : value.replace(/ /g, '');
  };
})
.filter('humanizeDoc', function() {
  return function(doc) {
    if (!doc) return;
    if (doc.type === 'directive') {
      return doc.name.replace(/([A-Z])/g, function($1) {
        return '-'+$1.toLowerCase();
      });
    }
    return doc.label || doc.name;
  };
})

.filter('directiveBrackets', function() {
  return function(str, restrict) {
    if (restrict) {
      // If it is restricted to only attributes
      if (!restrict.element && restrict.attribute) {
        return '[' + str + ']';
      }

      // If it is restricted to elements and isn't a service
      if (restrict.element && str.indexOf('-') > -1) {
        return '<' + str + '>';
      }

      // TODO: Handle class/comment restrictions if we ever have any to document
    }

    // Just return the original string if we don't know what to do with it
    return str;
  };
});
