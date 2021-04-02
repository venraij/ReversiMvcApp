"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/gameHub").build(); //Disable send button until connection is established

connection.on("ReceiveMessage", function (spel) {
  
});

connection.start().then(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Token = urlParams.get("Speler1token");

    $.ajax({
        method: "GET",
        url: "https://localhost:5001/api/spel/" + token,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            console.log(spel);
            spel["bord"].forEach(cel => {
                let newCel = document.createElement("div");
                newCel.className = "cel";
                newCel.classList.add("'grid-item");
                $(".bord").append(newCel);
            });
        },
        error: function (xhr) {
            console.error(xhr.error)
        }
    })

})["catch"](function (err) {
  return console.error(err.toString());
});
