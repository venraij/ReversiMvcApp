"use strict";

var Game = function (url) {
  //Configuratie en state waarden
  var configMap = {
    apiUrl: url
  };
  var stateMap = {
    gameState: 0
  }; // Private function init

  var privateInit = function privateInit() {
    console.log(configMap.apiUrl);
    setInterval(_getCurrentGameState, 2000);
  };

  var _getCurrentGameState = function _getCurrentGameState() {
    stateMap.gameState = Game.Model.getGameState("test");
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit
  };
}("api/url");

Game.Reversi = function (url) {
  //Configuratie en state waarden
  var configMap = {
    apiUrl: url
  }; // Private function init

  var privateInit = function privateInit() {
    console.log(configMap.apiUrl);
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit
  };
}("api/url");

Game.Data = function (url) {
  //Configuratie en state waarden
  var configMap = {
    // apiKey: "43dc00f93a9391ed42e2fcf92c22064b",
    mock: [{
      url: "api/Spel/Beurt",
      data: 0
    }]
  };
  var stateMap = {
    environment: 'development'
  };

  var get = function get(url) {
    if (stateMap.environment === "development") {
      return getMockData(url);
    } else if (stateMap.environment === "production") {
      return $.get(url).then(function (r) {
        return r;
      })["catch"](function (e) {
        console.log(e.message);
      });
    }
  };

  var getMockData = function getMockData(url) {
    //filter mock data, configMap.mock ... oei oei, moeilijk moeilijk :-)
    var mockData = configMap.mock.find(function (x) {
      return x.url === url;
    });
    return new Promise(function (resolve, reject) {
      resolve(mockData);
    });
  }; // Private function init


  var privateInit = function privateInit(environment) {
    console.log(configMap.apiUrl);
    stateMap.environment = environment;

    if (stateMap.environment !== "production" && stateMap.environment !== "development") {
      throw new Error("Environment not set in state or set incorrectly");
    }

    get("api/Spel/Beurt").then(function (r) {
      console.log(r);
    });
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit,
    get: get
  };
}("api/url");

Game.Model = function (url) {
  //Configuratie en state waarden
  var configMap = {
    apiUrl: url
  }; // Private function init

  var privateInit = function privateInit() {
    console.log(configMap.apiUrl);
  };

  var getWeather = function getWeather() {
    Game.Data.get("http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=43dc00f93a9391ed42e2fcf92c22064b").then(function (r) {
      if (r.main.temp) {
        return r;
      } else {
        throw new Error("Missing temperature");
      }
    });
  };

  var _getGameState = function _getGameState(token) {
    return new Promise(function (resolve, reject) {
      //aanvraag via Game.Data
      Game.Data.get("/api/Spel/Beurt/".concat(token)).then(function (r) {
        if (r === 0 || r === 1 || r === 2) {
          resolve(r);
        } else {
          throw new Error("Incorrect state");
        }
      });
    });
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit,
    getWeather: getWeather,
    getGameState: _getGameState
  };
}("api/url");