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

          if(key == "Date"){
            bet[key] = bet[key].substring(0,10)
          }

          if(key == "Result"){
            if(bet[key] == ''){
              bet[key] = "⌛"
            }
          }

          row += "<td>" + bet[key] + "</td>";
        }
        row += "</tr>";
        rows += row;
      });


      if(rows != ""){
        var table =
        "<table> <tr><th>Date</th><th>League</th><th>Home</th><th>Away</th><th>Type</th><th>Quote</th><th>Bet</th><th>Potential Return</th><th>xQuote</th><th>Value</th><th>Quote %</th><th>Result</th></tr>" +
        rows +
        "</table>";

        const betsContainer = document.getElementById("bets-container-live");
        betsContainer.innerHTML = table;
      }

    });

    axios
      .get("https://e3exeuwqd3fdztghs3u6x4wtsi0qyqen.lambda-url.us-east-1.on.aws/api/getCompletedBets")
      .then(function (res) {
        const bets = res.data;
        var rows = "";

        bets.forEach((bet) => {
          var row = "<tr>";
          for (var key in bet) {

            if(key == "Date"){
              bet[key] = bet[key].substring(0,10)
            }

            if(key == "Result"){
              if(bet[key] == true){
                bet[key] = "✔️"
              } else {
                bet[key] = "❌"
              }
            }

            row += "<td>" + bet[key] + "</td>";
          }
          row += "</tr>";
          rows += row;
        });

        if(rows != ""){        
          var table =
            "<table> <tr><th>Date</th><th>League</th><th>Home</th><th>Away</th><th>Type</th><th>Quote</th><th>Bet</th><th>Potential Return</th><th>xQuote</th><th>Value</th><th>Quote %</th><th>Result</th></tr>" +
            rows +
            "</table>";

          const betsContainer = document.getElementById(
            "bets-container-completed"
          );
          betsContainer.innerHTML = table;
        }
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

        <div id="introduction-wrapper">
          <div className="intro-text">
            The objective of this work is to create a reliable betting model that would be able to generate a profit throughout the season. The algorithm is characterized by three key components: the use of xG to model scoring probabilities, the emphasis on season-specific data and the use of ClubELO data to keep track of which teams are historically better than others. As in a lot of the current state of the art models, xG is at the base of every prediction this algorithm makes. Is important to note that even if the model was implemented to work with Over/Under 2.5 bets and Both Team To Score Yes/No bets, this version specifically focuses on the Over 2.5 bets, which were the ones giving the best ROI when tested. 
            <br></br>
            <br></br>
            By leveraging xG data from previous matches, a new xG value is computed, which is the expected value for the following match. After computing the xG value for both teams, goal probabilities are calculated and the expected quotes (xQuote) for the following matches are computed. If <code>Quote - xQuote &gt; 0</code>, then the bet is expected to provide some value. The process when choosing which matches to bet on is slightly more complicated: a certain value threshold has to be reached and the average frequency of the considered situation (matches with 3 or more goals) happening throughout the season for the two involved teams is taken into account.
            <br></br>
            <br></br>
            As already said, the initial xG is computed only considering this season data, which also means the algorithm cannot be used right away from the start of the season. This is done to avoid having too much bias based on historical results, which are not reliable enough when modelling the xG of a team during a specific season. A great example of that, coming from the 2022-23 season, are Fulham and Chelsea: the first scoring a fantastic 55 goals as a newly promoted side while the second didn't even reach 40. Still, ClubELO data is valuable information to at least try and place each team in the "Top", "Mid" or "Bottom" category. Note that this could be done simply using the current table, but particularly at the start of the season that may be too volatile. This information is then used to slightly adjust the predicted xG based on which teams were recently encountered. This is done to avoid punishing too much a team after a run of difficult matches and viceversa avoid boosting too much a team that recently played all the worst teams in the league. There is one more possible use for the ClubELO data: as much as current season data remains key, is far more common for an historically good team to get streaky, as in starting to roll over everyone and everything, when they manage to gain momentum; meanwhile a newly promoted side may encounter more obstacles in mantaining a constant level of performances. This could be modelized giving slightly more importance to the most recent positive results when considering a team with an high ELO.
            <br></br>
            <br></br>
            The algorithm was tested in two ways: a calibration phase in which it was analyzed the accuracy of the predicted outcome without taking into consideration any specific bookie and a proper testing phase using historical BET365 odds from the football-data.co.uk provider. Regarding the algorithm calibration, the idea has been to calculate the odd of the Over 2.5 result to happen for all the matches in the top 5 leagues from the 18-19 to the 22-23 season (note: with the same approach described before, so every season is considered separately with the only source of historic data being ClubELO), then divide all the matches in different buckets, based on the expected quote, and calculate the frequency of the Over 2.5 event for each bucket. Ideally, the frequency for each bucket should be as close as possible to the predicted quote. If 100 matches were placed in the 2.0 quote, ideally 50 matches should have ended with an Over 2.5. Is worth noting that the point of the algorithm isn't always placing a winning bet, but being able to predict the outcome of the match more accurately than the bookie that provides the quote. Suppose you know that you are perfectly able to predict the correct probability of the Over 2.5 event happening. If you bet <code>1$</code> on 1000 matches in which the Over 2.5 event has a <code>2</code> odd, then you will win 500 of those 1000 bets, and get back <code>500*2 = 1000$</code>. Of course this doesn't make sense, but here is the key idea: you only bet on a match if the bookie gives you a favourable odd. Suppose you placed those 1000 bets on Bet365 and that the value threshold for each bet to be placed was <code>0.1</code>, it means that you bet on a match only if the bookie gives you a quote which is at least <code>0.1</code> higher than what the algorithm predicted. Back to the previous example, lets say you placed 1000 bets, each worth <code>1$</code>, on 1000 different matches in which the algorithm predicted a <code>2</code> odd, while the bookie always gave you a <code>2.1</code> odd for those bets (to simplify the calculation). Knowing that the algorithm predicted quote is accurate means that you will still win 50% of your bets, but this time the money earned will be <code>500*2.1$</code>, meaning that after investing <code>1000$</code>, you get back <code>1100$</code>, with a 10% profit (which note is equal to <code>threshold*100</code>). Of course the value threshold is higher, less bets will be placed.
          </div>

          <br></br>

            <img src = "/img/calibration.svg" style={{width: '100%', maxWidth: '600px', margin: 'auto'}}/>

          <br></br>

          <div className="intro-text">
            To Be continued.
          </div>

        </div>

        <div id="table-wrapper">
          <div id="bets-container-live"></div>
        </div>

        <button type="button" id="collapse-past-bets" onClick={() => toggleCompletedBets()}>
          Show 2022-23 bets
        </button>

        <div id="table-wrapper">
          <div id="bets-container-completed" style={{ visibility: "hidden" }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
