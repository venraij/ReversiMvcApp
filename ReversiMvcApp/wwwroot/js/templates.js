Handlebars.registerPartial("cell", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"fiche"),depth0,{"name":"fiche","hash":{"kleur":((stack1 = (depth0 != null ? lookupProperty(depth0,"fiche") : depth0)) != null ? lookupProperty(stack1,"kleur") : stack1)},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"cel y"
    + alias4(((helper = (helper = lookupProperty(helpers,"yValue") || (depth0 != null ? lookupProperty(depth0,"yValue") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"yValue","hash":{},"data":data,"loc":{"start":{"line":1,"column":17},"end":{"line":1,"column":27}}}) : helper)))
    + " x"
    + alias4(((helper = (helper = lookupProperty(helpers,"xValue") || (depth0 != null ? lookupProperty(depth0,"xValue") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"xValue","hash":{},"data":data,"loc":{"start":{"line":1,"column":29},"end":{"line":1,"column":39}}}) : helper)))
    + "\" onclick=\"Game.Reversi.doeZet("
    + alias4(((helper = (helper = lookupProperty(helpers,"xValue") || (depth0 != null ? lookupProperty(depth0,"xValue") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"xValue","hash":{},"data":data,"loc":{"start":{"line":1,"column":70},"end":{"line":1,"column":80}}}) : helper)))
    + ", "
    + alias4(((helper = (helper = lookupProperty(helpers,"yValue") || (depth0 != null ? lookupProperty(depth0,"yValue") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"yValue","hash":{},"data":data,"loc":{"start":{"line":1,"column":82},"end":{"line":1,"column":92}}}) : helper)))
    + ")\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"fiche") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":4,"column":11}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"usePartial":true,"useData":true}));
Handlebars.registerPartial("fiche", Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"fiche "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"kleur") || (depth0 != null ? lookupProperty(depth0,"kleur") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"kleur","hash":{},"data":data,"loc":{"start":{"line":1,"column":18},"end":{"line":1,"column":27}}}) : helper)))
    + "\"></div>";
},"useData":true}));
this["spa_templates"] = this["spa_templates"] || {};
this["spa_templates"]["templates"] = this["spa_templates"]["templates"] || {};
this["spa_templates"]["templates"]["game"] = this["spa_templates"]["templates"]["game"] || {};
this["spa_templates"]["templates"]["game"]["bord"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"cell"),depth0,{"name":"cell","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"bord\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"cells") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":4,"column":13}}})) != null ? stack1 : "")
    + "</div>\r\n\r\n<canvas id=\"myChart\" width=\"400\" height=\"400\"></canvas>\r\n<script>\r\n    const ctx = document.getElementById('myChart').getContext('2d');\r\n    const myChart = new Chart(ctx, {\r\n        type: 'bar',\r\n        data: {\r\n            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],\r\n            datasets: [{\r\n                label: '# of Votes',\r\n                data: [12, 19, 3, 5, 2, 3],\r\n                backgroundColor: [\r\n                    'rgba(255, 99, 132, 0.2)',\r\n                    'rgba(54, 162, 235, 0.2)',\r\n                    'rgba(255, 206, 86, 0.2)',\r\n                    'rgba(75, 192, 192, 0.2)',\r\n                    'rgba(153, 102, 255, 0.2)',\r\n                    'rgba(255, 159, 64, 0.2)'\r\n                ],\r\n                borderColor: [\r\n                    'rgba(255, 99, 132, 1)',\r\n                    'rgba(54, 162, 235, 1)',\r\n                    'rgba(255, 206, 86, 1)',\r\n                    'rgba(75, 192, 192, 1)',\r\n                    'rgba(153, 102, 255, 1)',\r\n                    'rgba(255, 159, 64, 1)'\r\n                ],\r\n                borderWidth: 1\r\n            }]\r\n        },\r\n        options: {\r\n            scales: {\r\n                y: {\r\n                    beginAtZero: true\r\n                }\r\n            }\r\n        }\r\n    });\r\n</script>";
},"usePartial":true,"useData":true});
this["spa_templates"]["templates"]["game"]["fact"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p class=\"fact\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"fact") || (depth0 != null ? lookupProperty(depth0,"fact") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"fact","hash":{},"data":data,"loc":{"start":{"line":1,"column":16},"end":{"line":1,"column":24}}}) : helper)))
    + "</p>";
},"useData":true});
this["spa_templates"]["templates"]["game"]["stats"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"statistics\">\r\n\r\n</div>";
},"useData":true});
this["spa_templates"]["templates"]["feedbackWidget"] = this["spa_templates"]["templates"]["feedbackWidget"] || {};
this["spa_templates"]["templates"]["feedbackWidget"]["body"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"cel") || (depth0 != null ? lookupProperty(depth0,"cel") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"cel","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":15}}}) : helper)))
    + "\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"bord\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"cels") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":4,"column":13}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});