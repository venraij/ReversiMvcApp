"use strict";

var _this = void 0;

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

connection.start().then(function () {
  Game.init();
})["catch"](function (err) {
  return console.error(err.toString());
});
connection.on("ReceiveMessage", function (spel) {});

var Game = function (url) {
  //Configuratie en state waarden
  var configMap = {
    apiUrl: url
  };
  var stateMap = {
    gameState: 0,
    token: null,
    bord: null,
    speler1Token: null,
    speler2Token: null
  }; // Private function init

  var privateInit = function privateInit() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var token = urlParams.get("Token");
    Game.Model.init();
    Game.Data.init("production");
    Game.Reversi.init();
    console.log('Spel Token:', token);
    stateMap.token = token;

    _getCurrentGameBord();

    _getCurrentGameState();
  };

  var _getCurrentGameState = function _getCurrentGameState() {
    stateMap.gameState = Game.Model.getGameState(stateMap.token);
  };

  var _getCurrentGameBord = function _getCurrentGameBord() {
    stateMap.bord = Game.Model.getGameBord(stateMap.token);
    stateMap.bord.then(function (bord) {
      var x = 0;
      var y = 0;

      var _iterator2 = _createForOfIteratorHelper(bord),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var row = _step2.value;

          var _iterator3 = _createForOfIteratorHelper(row),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var cel = _step3.value;
              var newCel = document.createElement("div");
              newCel.className = "cel y".concat(y, " x").concat(x);

              if (cel !== 0) {
                var newFiche = document.createElement("div");
                newFiche.className = "fiche";

                if (cel === 1) {
                  newFiche.classList.add("wit");
                } else {
                  newFiche.classList.add("zwart");
                }

                newCel.appendChild(newFiche);
              }

              x++;

              if (x === 8) {
                x = 0;
              }

              $(".bord").append(newCel);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          y++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }).then(function () {
      $(".cell").click(function () {
        Game.Reversi.doeZet(_this.classList[2][1], _this.classList[1][1]);
      });
    });
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit
  };
}("https://localhost:5001");

Game.Reversi = function (url) {
  //Configuratie en state waarden
  var configMap = {
    apiUrl: url
  }; // Private function init

  var privateInit = function privateInit() {
    console.log(configMap.apiUrl);
  };

  var _doeZet = function _doeZet(x, y) {
    var zet = Game.Data.put("".concat(configMap.apiUrl, "/api/spel/zet"), [x, y]);

    if (zet === "Succeeded") {
      $(".y".concat(y, ".x").concat(x)).append("<div class='fiche wit'></div>");
    } //
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
}("https://localhost:5001");

Game.Data = function (url) {
  //Configuratie en state waarden
  var configMap = {
    mock: [{
      url: "api/Spel/Beurt",
      data: 0
    }, {
      url: "api/Spel"
    }],
    apiUrl: url
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

  var put = function put(url, data) {
    if (stateMap.environment === "production") {
      return $.ajax({
        url: url,
        data: data,
        type: "PUT"
      }).success(function (data) {
        return data;
      }).error(function (errorMessage) {
        console.log(errorMessage);
      });
    }
  };

  var getMockData = function getMockData(url) {
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
    init: privateInit,
    get: get,
    put: put
  };
}("https://localhost:5001");

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
      Game.Data.get("".concat(configMap.apiUrl, "/api/Spel/Beurt?Token=").concat(token)).then(function (r) {
        if (r === 0 || r === 1 || r === 2) {
          resolve(r);
        } else {
          throw new Error("Incorrect state");
        }
      });
    });
  };

  var _getGameBord = function _getGameBord(token) {
    return new Promise(function (resolve, reject) {
      Game.Data.get("".concat(configMap.apiUrl, "/api/Spel?Token=").concat(token)).then(function (r) {
        console.log(JSON.parse(r));
        resolve(JSON.parse(r)[0].Bord);
      });
    });
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit,
    getGameState: _getGameState,
    getGameBord: _getGameBord
  };
}("https://localhost:5001");