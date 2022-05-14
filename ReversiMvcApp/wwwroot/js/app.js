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

var Game = function (url) {
  //Configuratie en state waarden
  var configMap = {
    apiUrl: url
  };
  var stateMap = {
    gameState: 0,
    token: null,
    bord: null
  }; // Private function init

  var privateInit = function privateInit() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var token = urlParams.get("Guid");
    Game.Model.init();
    Game.Data.init("production");
    Game.Reversi.init();
    console.log('Speler Token:', token);
    stateMap.token = token;
    setInterval(_getCurrentGameState, 2000);

    _getCurrentGameBordState().then(function () {
      Game.Reversi.drawBord(token, stateMap.bord);
    });

    Game.Data.connection.start()["catch"](function (err) {
      return console.error(err.toString());
    });
  };

  var _getCurrentGameState = function _getCurrentGameState() {
    Game.Model.getGameState(stateMap.token).then(function (gameState) {
      console.log("New Game State:", gameState);
      stateMap.gameState = gameState;
    });
  };

  var _getCurrentGameBordState = function _getCurrentGameBordState() {
    return new Promise(function (resolve, reject) {
      Game.Model.getGameBord(stateMap.token).then(function (bord) {
        console.log("New Game State:", bord);
        resolve(stateMap.bord = bord);
      });
    });
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit,
    getCurrentGameState: _getCurrentGameState,
    getCurrentGameBordState: _getCurrentGameBordState
  };
}("https://localhost:5001");

Game.Reversi = function () {
  // Private function init
  var privateInit = function privateInit() {};

  var _drawBord = function _drawBord(token, bord) {
    var x = 0;
    var y = 0;
    var htmlBord = $(".bord");

    var _iterator2 = _createForOfIteratorHelper(bord),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var row = _step2.value;

        var _iterator3 = _createForOfIteratorHelper(row),
            _step3;

        try {
          var _loop = function _loop() {
            var cel = _step3.value;

            if (htmlBord.children().length !== bord.length * row.length) {
              var newCel = document.createElement("div");
              newCel.className = "cel y".concat(y, " x").concat(x);

              newCel.onclick = function () {
                Game.Reversi.doeZet(newCel.classList[2][1], newCel.classList[1][1], token);
              };

              htmlBord.append(newCel);
            }

            var htmlCel = $(".cel.y".concat(y, ".x").concat(x));
            var newFiche = document.createElement("div");
            newFiche.className = "fiche";

            if (cel === 1) {
              newFiche.classList.add("wit");
            } else if (cel === 2) {
              newFiche.classList.add("zwart");
            }

            if (htmlCel.children('div').length > 0) {
              console.log("Replacing fiche at:", "y".concat(y, " x").concat(x));
              console.log("Old fiche:", htmlCel.children('div')[0]);

              if (cel === 1 && htmlCel.children('div')[0].classList.contains("zwart") || cel === 2 && htmlCel.children('div')[0].classList.contains("wit")) {
                htmlCel.children('div')[0].style.opacity = "0.4";
                htmlCel.children('div')[0].style.opacity = "0.0";
                setTimeout(function () {
                  htmlCel.empty();
                  console.log(htmlCel);
                  htmlCel.append(newFiche);
                }, 500);
              }
            } else if (cel !== 0) {
              console.log("Placing fiche at:", "y".concat(y, " x").concat(x));
              htmlCel.append(newFiche);
            }

            x++;

            if (x === 8) {
              x = 0;
            }
          };

          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            _loop();
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
  };

  var _doeZet = function _doeZet(x, y, token) {
    try {
      Game.Data.connection.invoke("Zet", parseInt(x), parseInt(y), token);
      Game.Data.connection.on("ZetDone", function (gameState, status, bord) {
        console.log("New Bord:", JSON.parse(bord), status);

        if (status === "SUCCEEDED") {
          _drawBord(token, JSON.parse(bord));
        }
      });
    } catch (e) {
      console.error(e);
    }
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit,
    doeZet: _doeZet,
    drawBord: _drawBord
  };
}();

Game.Data = function (url) {
  var stateMap = {
    environment: 'development'
  }; //Configuratie en state waarden

  var configMap = {
    mock: [{
      url: "api/Spel/Beurt",
      data: 0
    }, {
      url: "api/Spel"
    }],
    apiUrl: url
  };

  var get = function get(url) {
    if (stateMap.environment === "development") {
      return getMockData(url);
    } else if (stateMap.environment === "production") {
      return fetch(url, {
        method: "GET"
      }).then(function (res) {
        return res.json();
      })["catch"](function (error) {
        console.log(error);
      });
    }
  };

  var put = function put(url, data, spelToken) {
    if (stateMap.environment === "production") {
      return fetch(url, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'spelToken': spelToken
        },
        body: JSON.stringify(data)
      }).then(function (res) {
        return res.json();
      })["catch"](function (error) {
        console.log(error);
      });
    }
  };

  var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/gameHub").configureLogging(signalR.LogLevel.Information).build(); //Disable send button until connection is established

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
    put: put,
    connection: connection
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
      Game.Data.get("".concat(configMap.apiUrl, "/api/Spel/Beurt/").concat(token)).then(function (r) {
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
      Game.Data.get("".concat(configMap.apiUrl, "/api/Spel/").concat(token)).then(function (r) {
        resolve(r.Bord);
      });
    });
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit,
    getGameState: _getGameState,
    getGameBord: _getGameBord
  };
}("https://localhost:5001");

Game.init();