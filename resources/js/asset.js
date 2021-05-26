// Nova Asset JS

function parseRouteForDisplay(route) {
  return route
    .replace("/", "")
    .split("/")
    .map(_.startCase)
    .join(" > ");
}

function getResourceMeta(resourceName) {
  var resourceMeta = Nova.config.resources.filter(function(resource) {
    return resource.uriKey == resourceName;
  });

  if (resourceMeta[0] != undefined) resourceMeta = resourceMeta[0];
  else resourceMeta = null;

  return resourceMeta;
}

Nova.booting((Vue, router, store) => {
  var originalTitle = document.title;
  router.beforeEach((to, from, next) => {
    console.log("FROM: ", from.name, "TO: ", to.name);
    var resourceMeta = getResourceMeta(to.params.resourceName);
    var relatedResourceMeta = null;

    if (to.params.relatedResourceName != undefined)
      relatedResourceMeta = getResourceMeta(to.params.relatedResourceName);

    var label = to.params.resourceName;

    if (resourceMeta != null) {
      if (to.name == "index") label = resourceMeta.label;
      else if (to.name == "detail")
        label = resourceMeta.singularLabel + " Details";
      else if (to.name == "edit-attached")
        label =
          "Edit " +
          resourceMeta.singularLabel +
          " -> " +
          relatedResourceMeta.singularLabel;
      else label = _.startCase(to.name) + " " + resourceMeta.singularLabel;
    } else {
      label = parseRouteForDisplay(to.path);

      if (label == "") label = _.startCase(to.name);
    }

    /** Alias Apps Custom - BEGIN **/
    const activeLabels = document.getElementsByClassName("router-link-active");

    if (activeLabels.length > 0) {
      Array.from(activeLabels).forEach((label) =>
        label.classList.remove("router-link-active")
      );
    }

    let sideLabel = undefined;
    let sideTitle = undefined;
    // all these sideLabels correspond with the the custom nova-components view: ...
    // ...ex. {custom-nova-component}/resources/views/navigation.blade.php
    // ...we've added an id to the side-label to target it and set the class "router-link-active"
    if (from.name === "unassigned-orders") {
      sideLabel = document.getElementById("unassigned-orders");

      //   sideTitle = document.querySelectorAll('[dusk="order-index-component"]');
      //   console.log("sideTitle: ", sideTitle);
      //   if (sideTitle.length > 0) {
      //     let h1 = sideTitle[0].getElementsByTagName("h1");
      //     console.log("h1: ", h1);
      //     if (h1.length > 0) {
      //       h1[0].innerHTML = "Unassigned Orders";
      //       console.log("innerHTML: ", (h1[0].innerHTML = "Unassigned Orders"));
      //     }
      //   }
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

    if (sideLabel) sideLabel.classList.add("router-link-active");

    /** Alias Apps Custom - END **/

    if (originalTitle && originalTitle !== "") {
      document.title = label + " | " + originalTitle;
    } else {
      document.title = label;
    }

    next((vm) => {
      console.log(vm);
    });
  });
  router.afterEach((to, from) => {
    let sideTitle = undefined;

    if (from.name === "unassigned-orders") {
      document.onload = function() {
        sideTitle = document.querySelectorAll('[dusk="order-index-component"]');
        console.log("sideTitle: ", sideTitle);
        if (sideTitle.length > 0) {
          let h1 = sideTitle[0].getElementsByTagName("h1");
          console.log("h1: ", h1);
          if (h1.length > 0) {
            h1[0].innerHTML = "Unassigned Orders";
            console.log("innerHTML: ", (h1[0].innerHTML = "Unassigned Orders"));
          }
        }
      };
    }
  });
});
