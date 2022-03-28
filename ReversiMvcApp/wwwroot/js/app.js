"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var FeedbackWidget = /*#__PURE__*/function () {
  function FeedbackWidget(elementId) {
    _classCallCheck(this, FeedbackWidget);

    this._elementId = elementId;
  }

  _createClass(FeedbackWidget, [{
    key: "elementId",
    get: function get() {
      //getter, set keyword voor setter methode
      return this._elementId;
    }
  }, {
    key: "show",
    value: function show(message, type) {
      toggleFeedback(this.elementId, true);
      var elementText = $("#".concat(this.elementId, "-text"));
      elementText.text(message);
      var element = $("#".concat(this.elementId));
      element.alert();

      if (type === "danger") {
        element.removeClass("alert-success");
        element.addClass("alert-danger");
      } else {
        element.removeClass("alert-danger");
        element.addClass("alert-success");
      }

      this.log({
        message: message,
        type: type
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      toggleFeedback(this.elementId, false);
    }
  }, {
    key: "log",
    value: function log(message) {
      var messages = [];
      var savedMessages = JSON.parse(localStorage.getItem("feedback_widget"));

      if (savedMessages) {
        messages = savedMessages;
      }

      if (messages.length === 10) {
        messages.splice(1, 11);
      }

      messages.push(message);
      localStorage.setItem("feedback_widget", JSON.stringify(messages));
    }
  }, {
    key: "removeLog",
    value: function removeLog() {
      localStorage.removeItem("feedback_widget");
    }
  }, {
    key: "history",
    value: function history() {
      var messages = JSON.parse(localStorage.getItem("feedback_widget"));
      var messageString = "";

      var _iterator = _createForOfIteratorHelper(messages),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var message = _step.value;
          messageString += "".concat(message.type, " - ").concat(message.message);

          if (messages[-1] === message) {
            messageString += " \n";
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.show(messageString);
    }
  }]);

  return FeedbackWidget;
}();

var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/gameHub").configureLogging(signalR.LogLevel.Information).build(); //Disable send button until connection is established

connection.on("ReceiveMessage", function (spel) {});
connection.start().then(function () {// $.ajax({
  //     method: "GET",
  //     url: "" + "https://localhost:5001/api/spel?token=".concat(token),
  //     contentType: "application/json; charset=utf-8",
  //     success: function success(spel) {
  //         const parsedSpel = JSON.parse(spel)[0];
  //         let x = 0;
  //         let y = 0;
  //         parsedSpel["Bord"].forEach(function (row) {
  //             row.forEach(function (cel) {
  //                 const newCel = document.createElement("div");
  //                 newCel.className = "cel y".concat("y", " x").concat(x);
  //
  //                 if (cel !== 0) {
  //                     const newFiche = document.createElement("div");
  //                     newFiche.className = "fiche";
  //
  //                     if (cel === 1) {
  //                         newFiche.classList.add("wit");
  //                     } else {
  //                         newFiche.classList.add("zwart");
  //                     }
  //
  //                     newCel.appendChild(newFiche);
  //                 }
  //
  //                 x++;
  //
  //                 if (x === 8) {
  //                     x = 0;
  //                 }
  //
  //                 $(".bord").append(newCel);
  //             });
  //             y++;
  //         });
  //         $(".cel").on("click", async () => {
  //             await Game.Reversi.doeZet(this.classList[2][1], this.classList[1][1]);
  //         });
  //     },
  //     error: function error(xhr) {
  //         console.error(xhr.error);
  //     }
  // });
})["catch"](function (err) {
  return console.error(err.toString());
});

var Game = function (url) {
  //Configuratie en state waarden
  var configMap = {
    apiUrl: url
  };
  var stateMap = {
    gameState: 0,
    bord: null,
    token: null
  }; // Private function init

  var privateInit = function privateInit() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var token = urlParams.get("Token");
    console.log("Spel Token: ".concat(token));
    stateMap.token = token;

    _getBordState();

    setInterval(_getCurrentGameState, 2000);
  };

  var _getCurrentGameState = function _getCurrentGameState() {
    stateMap.gameState = Game.Model.getGameState(stateMap.token);
  };

  var _getBordState = function _getBordState() {
    stateMap.bord = Game.Model.getBordState(stateMap.token);
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
  };

  var _doeZet = function _doeZet(x, y) {
    // const result = await fetch("http://localhost:5001/api/spel/zet")
    $(".y".concat(y, ".x").concat(x)).append("<div class='fiche wit'></div>"); //
    // try {
    //     const conn = await connection.invoke("Zet", "test", [x, y])
    //     console.log(conn)
    // } catch (e) {
    //     console.error(e);
    // }
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit,
    doeZet: _doeZet
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
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit
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
  };

  var _getBordState = function _getBordState(token) {
    return new Promise(function (resolve, reject) {
      fetch("https://localhost:5001/api/spel?token=".concat(token)).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.length > 0) {
          var spel = data[0];
          console.log("Spel", spel);
          resolve(spel.bord);
        }
      });
    });
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit,
    getGameState: _getGameState,
    getBordState: _getBordState
  };
}("api/url");