import React, { useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";

export default function Scoreboard({tricode}) {
  const [game, setGame] = useState({});
  useQuery({
    queryKey: ["scoreboard"],
    queryFn: () => axios.get(`/-/scoreboard/${tricode}`)
      .then((res) => setGame(res.data))
  })

  return (
    <>
        { game['found'] === true && game['status'] === "pregame" &&
          <div className="divide-purple-200 divide-y overflow-hidden rounded-lg bg-white">
            <div className="text-center px-4 py-5 text-2xl sm:text-3xl sm:p-6 lg:text-4xl ">
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
                <div className="font-bold">{game['away_team']}</div>
                <div className="font-light">vs</div>
                <div className="font-bold">{game['home_team']}</div>
              </div>
            </div>
            <div className="text-center text-sm px-4 py-4 sm:px-6">
              {game['game_time']}
            </div>
            <div className="text-center text-sm px-4 py-4 sm:px-6">
              <i className="fa-sharp fa-light fa-tv-retro mx-2"></i>{game['channel']}
            </div>
          </div>}


      {game['found'] === true && game['status'] === "live" &&
        <div className="divide-purple-200 divide-y overflow-hidden rounded-lg bg-white">
          <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-2 gap-4 text-4xl text-center">
                <div className="font-bold">{game['away_team']}</div>
                <div className="font-bold">{game['home_team']}</div>
                <div>{game['away_score']}</div>
                <div>{game['home_score']}</div>
              </div>
            </div>
            <div className="text-center text-2xl px-4 py-4 sm:px-6">
              {game['clock']}
            </div>
            <div className="text-center text-sm px-4 py-4 sm:px-6">
              <i className="fa-sharp fa-light fa-tv-retro mx-2"></i>{game['channel']}
            </div>
          </div>}

      {game['found'] === true && game['status'] === "over" &&
        <div className="divide-purple-200 divide-y overflow-hidden rounded-lg bg-white">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-2 gap-4 text-4xl text-center">
              <div className="font-bold">{game['away_team']}</div>
              <div className="font-bold">{game['home_team']}</div>
              <div>{game['away_score']}</div>
              <div>{game['home_score']}</div>
            </div>
          </div>
          <div className="text-center text-2xl px-4 py-4 sm:px-6">
            {game['clock']}
          </div>
          <div className="text-center text-sm px-4 py-4 sm:px-6">
          </div>
        </div>}

      {game['found'] === false && <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl"><i className="fa-sharp fa-light fa-face-sad-cry"></i></span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              No game today.
            </h2>
          </div>
        </div>}
    </>
  )
}