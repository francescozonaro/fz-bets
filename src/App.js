import "./App.css";

// import axios from "axios";
import React, { useEffect } from "react";

function App() {

  // useEffect(() => {
  //   axios.get("https://e3exeuwqd3fdztghs3u6x4wtsi0qyqen.lambda-url.us-east-1.on.aws/api/getLiveBets").then(function (res) {
  //     const bets = res.data;
  //     var rows = "";

  //     bets.forEach((bet) => {
  //       var row = "<tr>";
  //       for (var key in bet) {
  //         row += "<td>" + bet[key] + "</td>";
  //       }
  //       row += "</tr>";
  //       rows += row;
  //     });

  //     var table =
  //       "<table> <tr><th>Date</th><th>League</th><th>Home</th><th>Away</th><th>Type</th><th>Quote</th><th>Bet</th><th>Potential Return</th><th>xQuote</th><th>Value</th><th>Quote %</th><th>Result</th></tr>" +
  //       rows +
  //       "</table>";

  //     const betsContainer = document.getElementById("bets-container-live");
  //     betsContainer.innerHTML = table;
  //   });

  //   axios
  //     .get("https://e3exeuwqd3fdztghs3u6x4wtsi0qyqen.lambda-url.us-east-1.on.aws/api/getCompletedBets")
  //     .then(function (res) {
  //       const bets = res.data;
  //       var rows = "";

  //       bets.forEach((bet) => {
  //         var row = "<tr>";
  //         for (var key in bet) {
  //           row += "<td>" + bet[key] + "</td>";
  //         }
  //         row += "</tr>";
  //         rows += row;
  //       });

  //       var table =
  //         "<table> <tr><th>Date</th><th>League</th><th>Home</th><th>Away</th><th>Type</th><th>Quote</th><th>Bet</th><th>Potential Return</th><th>xQuote</th><th>Value</th><th>Quote %</th><th>Result</th></tr>" +
  //         rows +
  //         "</table>";

  //       const betsContainer = document.getElementById(
  //         "bets-container-completed"
  //       );
  //       betsContainer.innerHTML = table;
  //     });
  // }, []);

  // function toggleCompletedBets() {
  //   var content = document.getElementById("bets-container-completed");
  //   if (content.style.visibility === "visible") {
  //     content.style.visibility = "hidden";
  //   } else {
  //     content.style.visibility = "visible";
  //   }
  // }

  // return (
  //   <div className="App">
  //     <div className="header">
  //       <h1>
  //         <strong>Is there a profit to be made</strong> in the current betting
  //         market?
  //       </h1>

  //       <div id="table-wrapper">
  //         <div id="bets-container-live"></div>
  //       </div>

  //       <div id="table-wrapper">
  //         <button type="button" id="collapse-past-bets" onClick={() => toggleCompletedBets()
  //       }>
  //           Show older bets
  //         </button>
  //         <div
  //           id="bets-container-completed"
  //           style={{ visibility: "hidden" }}
  //         ></div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="App">

      <div className="title spaced-element">
        <strong>Francesco</strong> Zonaro
      </div>

      <div className="spaced-element">
        <a href="" target="_blank"><img src="img/linkedin.png" /></a>
        <a href="https://github.com/francescozonaro" target="_blank"><img src="img/github.png" /></a>
      </div>

      <div className="spaced-element">
        <a className="button" href="" target="_blank">Résumé</a>
      </div>

      <div className="subtitle">
        Projects
      </div>

      <div className="separator"></div>

      <div className="row">
        <div className="col-9 paper-title">
          Is there any money to be made in the current betting market?
        </div>
        <div className="col-3 paper-links">
        </div>
      </div>
      <div className="row paper-viz">
        <img src="img/xT.png"/>
      </div>

      <div className="row" style={{marginTop: "20px"}}>
        <div className="col-9 paper-title">
          Matching 538 Premier League forecasting performances
        </div>
        <div className="col-3 paper-links">
        </div>
      </div>
      <div className="row paper-viz">
        <img src="img/mockup1.png"/>
      </div>

      <div className="separator" style={{marginTop: "30px"}}></div>
    </div>
  );
}

export default App;
