import "./App.css";

import axios from "axios";
import React, { useEffect } from "react";

function App() {

  useEffect(() => {
    axios.get("https://e3exeuwqd3fdztghs3u6x4wtsi0qyqen.lambda-url.us-east-1.on.aws/api/getLiveBets").then(function (res) {
      const bets = res.data;
      var rows = "";

      bets.forEach((bet) => {
        var row = "<tr>";
        for (var key in bet) {
          row += "<td>" + bet[key] + "</td>";
        }
        row += "</tr>";
        rows += row;
      });

      var table =
        "<table> <tr><th>Date</th><th>League</th><th>Home</th><th>Away</th><th>Type</th><th>Quote</th><th>Bet</th><th>Potential Return</th><th>xQuote</th><th>Value</th><th>Quote %</th><th>Result</th></tr>" +
        rows +
        "</table>";

      const betsContainer = document.getElementById("bets-container-live");
      betsContainer.innerHTML = table;
    });

    axios
      .get("https://e3exeuwqd3fdztghs3u6x4wtsi0qyqen.lambda-url.us-east-1.on.aws/api/getCompletedBets")
      .then(function (res) {
        const bets = res.data;
        var rows = "";

        bets.forEach((bet) => {
          var row = "<tr>";
          for (var key in bet) {
            row += "<td>" + bet[key] + "</td>";
          }
          row += "</tr>";
          rows += row;
        });

        var table =
          "<table> <tr><th>Date</th><th>League</th><th>Home</th><th>Away</th><th>Type</th><th>Quote</th><th>Bet</th><th>Potential Return</th><th>xQuote</th><th>Value</th><th>Quote %</th><th>Result</th></tr>" +
          rows +
          "</table>";

        const betsContainer = document.getElementById(
          "bets-container-completed"
        );
        betsContainer.innerHTML = table;
      });
  }, []);

  function toggleCompletedBets() {
    var content = document.getElementById("bets-container-completed");
    if (content.style.visibility === "visible") {
      content.style.visibility = "hidden";
    } else {
      content.style.visibility = "visible";
    }
  }

  return (
    <div className="App">
      <div className="header">
        <div class='title'>
          <strong>Is there a profit to be made</strong> in the current betting
          market?
        </div>

        <div id="table-wrapper">
          <div id="bets-container-live"></div>
        </div>

        <div id="table-wrapper">
          <button type="button" id="collapse-past-bets" onClick={() => toggleCompletedBets()
        }>
            Show older bets
          </button>
          <div
            id="bets-container-completed"
            style={{ visibility: "hidden" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
