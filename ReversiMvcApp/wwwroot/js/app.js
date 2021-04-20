"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/gameHub").build(); //Disable send button until connection is established

connection.on("ReceiveMessage", function (spel) {});
connection.start().then(function () {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var token = urlParams.get("Token");
  console.log("Spel Token: ".concat(token));
  $.ajax({
    method: "GET",
    url: "" + "https://localhost:5001/api/spel?token=".concat(token),
    contentType: "application/json; charset=utf-8",
    success: function success(spel) {
      var parsedSpel = JSON.parse(spel)[0];
      console.log(parsedSpel);
      var x = 0;
      var y = 0;
      parsedSpel["Bord"].forEach(function (row) {
        row.forEach(function (cel) {
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
        });
        y++;
      });
      $(".cel").on("click", function () {
        Game.Reversi.doeZet(this.classList[1][1], this.classList[2][1]);
      });
    },
    error: function error(xhr) {
      console.error(xhr.error);
    }
  });
})["catch"](function (err) {
  return console.error(err.toString());
});

var Game = function ($) {
  'use strict';

  var Reversi = function ($) {
    var doeZet = function doeZet(y, x) {
      $(".y".concat(y, ".x").concat(x)).append("<div class='fiche wit'></div>");
    };

    return {
      doeZet: doeZet
    };
  }($);

  return {
    Reversi: Reversi
  };
}($);