/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// Nova Asset JS

function parseRouteForDisplay(route) {
  return route.replace("/", "").split("/").map(_.startCase).join(" > ");
}

function getResourceMeta(resourceName) {
  var resourceMeta = Nova.config.resources.filter(function (resource) {
    return resource.uriKey == resourceName;
  });

  if (resourceMeta[0] != undefined) resourceMeta = resourceMeta[0];else resourceMeta = null;

  return resourceMeta;
}

Nova.booting(function (Vue, router, store) {
  var originalTitle = document.title;
  router.beforeEach(function (to, from, next) {
    console.log("FROM: ", from.name, "TO: ", to.name);
    var resourceMeta = getResourceMeta(to.params.resourceName);
    var relatedResourceMeta = null;

    if (to.params.relatedResourceName != undefined) relatedResourceMeta = getResourceMeta(to.params.relatedResourceName);

    var label = to.params.resourceName;

    if (resourceMeta != null) {
      if (to.name == "index") label = resourceMeta.label;else if (to.name == "detail") label = resourceMeta.singularLabel + " Details";else if (to.name == "edit-attached") label = "Edit " + resourceMeta.singularLabel + " -> " + relatedResourceMeta.singularLabel;else label = _.startCase(to.name) + " " + resourceMeta.singularLabel;
    } else {
      label = parseRouteForDisplay(to.path);

      if (label == "") label = _.startCase(to.name);
    }

    /** Alias Apps Custom - BEGIN **/
    var activeLabels = document.getElementsByClassName("router-link-active");

    if (activeLabels.length > 0) {
      Array.from(activeLabels).forEach(function (label) {
        return label.classList.remove("router-link-active");
      });
    }

    var sideLabel = undefined;
    var sideTitle = undefined;
    // all these sideLabels correspond with the the custom nova-components view: ...
    // ...ex. {custom-nova-component}/resources/views/navigation.blade.php
    // ...we've added an id to the side-label to target it and set the class "router-link-active"
    if (from.name === "unassigned-orders") {
      console.log(document);
      sideLabel = document.getElementById("unassigned-orders");

      /*
      sideTitle = document.querySelectorAll('[dusk="orders-index-component"]');
      console.log("sideTitle: ", sideTitle);
      if (sideTitle.length > 0) {
        let h1 = sideTitle[0].getElementsByTagName("h1");
        console.log("h1: ", h1);
        if (h1.length > 0) {
          h1[0].innerHTML = "Unassigned Orders";
          console.log("innerHTML: ", (h1[0].innerHTML = "Unassigned Orders"));
        }
      }
      */
    } else if (from.name === "orders-in-progress") {
      sideLabel = document.getElementById("orders-in-progress");
    } else if (from.name === "orders-completed") {
      sideLabel = document.getElementById("orders-completed");
    } else if (from.name === "picked-up") {
      sideLabel = document.getElementById("picked-up");
    } else if (from.name === "new-returns") {
      sideLabel = document.getElementById("new-returns");
    } else if (from.name === "warranties") {
      sideLabel = document.getElementById("warranties");
    } else if (from.name === "outstanding-cores") {
      sideLabel = document.getElementById("outstanding-cores");
    } else if (from.name === "issues") {
      sideLabel = document.getElementById("issues");
    }

    if (sideLabel) {
      Nova.$emit("HELLO", "helloworld");
      sideLabel.classList.add("router-link-active");
    }

    /** Alias Apps Custom - END **/

    if (originalTitle && originalTitle !== "") {
      document.title = label + " | " + originalTitle;
    } else {
      document.title = label;
    }

    next();
  });
});

/***/ })
/******/ ]);