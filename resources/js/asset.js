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
    console.log("activeLabels: ", activeLabels);
    if (activeLabels.length > 0) {
      activeLabels.forEach((label) =>
        label.classList.remove("router-link-active")
      );
    }

    let sideLabel = undefined;

    if (from.name === "outstanding-cores") {
      sideLabel = document.getElementById("outstanding-cores");
      sideLabel.classList.add("router-link-active");
    }

    // if (sideLabel) {
    //   if (from.name === "index") {
    //     sideLabel.classList.remove("router-link-active");
    //   }
    // }

    /** Alias Apps Custom - END **/

    if (originalTitle && originalTitle !== "") {
      document.title = label + " | " + originalTitle;
    } else {
      document.title = label;
    }

    next();
  });
});
