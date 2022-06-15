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
    + "</div>";
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
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"statistics d-flex\">\r\n    <canvas class=\"chart\" id=\"occupiedChart\" width=\"300\" height=\"300\"></canvas>\r\n    <canvas class=\"chart\" id=\"fichesChart\" width=\"300\" height=\"300\"></canvas>\r\n    <script>\r\n        const occupiedData = {\r\n            labels: [\r\n                'Bezette Plekken',\r\n                'Lege Plekken',\r\n            ],\r\n            datasets: [{\r\n                label: 'My First Dataset',\r\n                data: ["
    + alias4(((helper = (helper = lookupProperty(helpers,"celsOccupied") || (depth0 != null ? lookupProperty(depth0,"celsOccupied") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"celsOccupied","hash":{},"data":data,"loc":{"start":{"line":12,"column":23},"end":{"line":12,"column":39}}}) : helper)))
    + ", "
    + alias4(((helper = (helper = lookupProperty(helpers,"celsUnoccupied") || (depth0 != null ? lookupProperty(depth0,"celsUnoccupied") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"celsUnoccupied","hash":{},"data":data,"loc":{"start":{"line":12,"column":41},"end":{"line":12,"column":59}}}) : helper)))
    + "],\r\n                backgroundColor: [\r\n                    'rgb(255, 99, 132)',\r\n                    'rgb(54, 162, 235)',\r\n                ],\r\n                hoverOffset: 4\r\n            }]\r\n        };\r\n\r\n        const occupiedConfig = {\r\n            type: 'pie',\r\n            data: occupiedData,\r\n            options: {\r\n                responsive: true,\r\n                plugins: {\r\n                    legend: {\r\n                        position: 'top',\r\n                    },\r\n                    title: {\r\n                        display: true,\r\n                        text: 'Plekken status'\r\n                    }\r\n                }\r\n            },\r\n        };\r\n\r\n        const occupiedChart = new Chart(\r\n            document.getElementById('occupiedChart'),\r\n            occupiedConfig\r\n        );\r\n\r\n        const fichesData = {\r\n            labels: [\r\n                'Witte fiches',\r\n                'Zwarte fiches',\r\n            ],\r\n            datasets: [{\r\n                label: 'My First Dataset',\r\n                data: ["
    + alias4(((helper = (helper = lookupProperty(helpers,"whiteFiches") || (depth0 != null ? lookupProperty(depth0,"whiteFiches") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"whiteFiches","hash":{},"data":data,"loc":{"start":{"line":50,"column":23},"end":{"line":50,"column":38}}}) : helper)))
    + ", "
    + alias4(((helper = (helper = lookupProperty(helpers,"blackFiches") || (depth0 != null ? lookupProperty(depth0,"blackFiches") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"blackFiches","hash":{},"data":data,"loc":{"start":{"line":50,"column":40},"end":{"line":50,"column":55}}}) : helper)))
    + "],\r\n                backgroundColor: [\r\n                    'rgb(192,192,192)',\r\n                    'rgb(0,0,0)',\r\n                ],\r\n                hoverOffset: 4\r\n            }]\r\n        };\r\n\r\n        const fichesConfig = {\r\n            type: 'pie',\r\n            data: fichesData,\r\n            options: {\r\n                responsive: true,\r\n                plugins: {\r\n                    legend: {\r\n                        position: 'top',\r\n                    },\r\n                    title: {\r\n                        display: true,\r\n                        text: 'Bezetting'\r\n                    }\r\n                }\r\n            },\r\n        };\r\n\r\n        const fichesChart = new Chart(\r\n                document.getElementById('fichesChart'),\r\n                fichesConfig\r\n        );\r\n    </script>\r\n</div>";
},"useData":true});