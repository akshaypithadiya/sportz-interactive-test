import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://api.npoint.io/d6bd0efc05639084eb17");
    const playerDetails = await data.json();
    const sortedPlayers = playerDetails.playerList.sort((a, b) =>
      parseInt(a.Value) > parseInt(b.Value) ? 1 : -1
    );
    setPlayers(sortedPlayers);
  };

  const dateToLocal = (utcDate) => {
    var date = new Date(`${utcDate} UTC`);
    var local =
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);

    return local;
  };

  return (
    <div className="App">
      <form>
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Player"
        />
      </form>
      {players
        .filter((player) => {
          if (search == "") {
            return player;
          } else if (
            player.PFName.toLowerCase().includes(search.toLowerCase()) ||
            player.TName.toLowerCase().includes(search.toLowerCase())
          ) {
            return player;
          }
        })
        .map((player) => (
          <div className="player-card" key={player.Id}>
            <img
              src={`player-images/${player.Id}.jpg`}
              alt={player.Id}
              width="150px"
              height="150px"
            />
            <table>
              <tr>
                <td>Full Name</td>
                <td>{player.PFName}</td>
              </tr>
              <tr>
                <td>Skill</td>
                <td>{player.SkillDesc}</td>
              </tr>
              <tr>
                <td>Value</td>
                <td>${player.Value}</td>
              </tr>
              <tr>
                <td>Upcoming Matches</td>
                {player.UpComingMatchesList.map((upComingMatches) => (
                  <td>
                    {upComingMatches.CCode
                      ? `${upComingMatches.CCode} vs ${upComingMatches.VsCCode}`
                      : "No Upcoming Matches"}{" "}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Next Match Time</td>
                {player.UpComingMatchesList.map((nextMatchTime) => (
                  <td>
                    {nextMatchTime.MDate
                      ? dateToLocal(nextMatchTime.MDate)
                      : "Time Not Avaliable"}
                  </td>
                ))}
              </tr>
            </table>
          </div>
        ))}
    </div>
  );
}

export default App;
