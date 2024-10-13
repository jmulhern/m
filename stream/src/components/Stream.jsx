import React, {useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";


export default function Stream({username}) {
  const [player, setPlayer] = useState({username: username});
  const {isLoading} = useQuery({
    queryKey: [`player:${username}`],
    queryFn: () => axios.get(`player/${username}`)
      .then((res) => {
        setPlayer(res.data)
      })
  })

  if(isLoading) {
    return <></>
  }

  if(player['youtube_channel'] !== undefined && player['youtube_channel']['live'] === true) {
    return <iframe src={player['youtube_channel']['url']}></iframe>
  }

  let stats = <></>
  if(player['psn_profile'] !== undefined) {
    stats = <>
      <h5 className="text-sm tracking-tight text-gray-900 sm:text-lg">
        <span>Games Played {player['psn_profile']['games_played']}</span>
      </h5>
      <h5 className="text-sm tracking-tight text-gray-900 sm:text-lg">
        <span>Games Completed {player['psn_profile']['games_completed']}</span>
      </h5>
      <h5 className="text-sm tracking-tight text-gray-900 sm:text-lg">
        <span>Trophies Per Day {player['psn_profile']['trophies_per_day']}</span>
      </h5>
    </>
  }

  if (player['youtube_channel'] !== undefined && player['youtube_channel']['live'] === false) {
    return <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-3xl font-bold tracking-tight text-gray-300 sm:text-6xl">
          <i className="fa-solid fa-signal-stream-slash"></i>
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {player['psn_profile']['psn']} is not live!
        </h2>
        {stats}
      </div>
    </div>
  }


  return <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-3xl font-bold tracking-tight text-gray-300 sm:text-6xl">
        <i className="fa-solid fa-ghost"></i>
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {player['psn_profile']['psn']}
      </h2>
      {stats}
    </div>
  </div>
}