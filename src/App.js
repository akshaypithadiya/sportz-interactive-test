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
      a.Value > b.Value ? 1 : -1
    );
    setPlayers(sortedPlayers);
  };

  return (
    <div className="App">
      <form>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search player"
        />
      </form>
      <br />
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
                      ? nextMatchTime.MDate
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
