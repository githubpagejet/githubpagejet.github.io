this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["page"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<span id=\"handlebars-content\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.texts : depth0)) != null ? stack1.page_content_text_1 : stack1), depth0))
    + "</span>";
},"useData":true});