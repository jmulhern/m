import React, {useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";


export default function Whatever({username}) {
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

  let cards = []
  if(player['psn_profile'] !== undefined) {
    cards.push(<div className="my-3 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <span><i className="fa-brands fa-playstation"></i> {player['psn_profile']['psn']}</span>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="py-4">Played {player['psn_profile']['games_played']}</li>
          <li className="py-4">Completed {player['psn_profile']['games_completed']}</li>
          <li className="py-4">Trophies Per Day {player['psn_profile']['trophies_per_day']}</li>
        </ul>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <span className="px-2"><i className="fa-solid fa-trophy"></i> {player['psn_profile']['trophies_platinum']}</span>
        <span className="px-2"><i className="fa-solid fa-trophy"></i> {player['psn_profile']['trophies_gold']}</span>
        <span className="px-2"><i className="fa-solid fa-trophy"></i> {player['psn_profile']['trophies_silver']}</span>
        <span className="px-2"><i className="fa-solid fa-trophy"></i> {player['psn_profile']['trophies_bronze']}</span>
      </div>
    </div>)
  }

  if (player['youtube_channel'] !== undefined) {
    cards.push(<div className="my-3 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <span><i className="fa-brands fa-youtube"></i> {player['youtube_channel']['url']}</span>
      </div>
      <div className="px-4 py-5 sm:p-6">
        Stream is not live!
      </div>
    </div>)
  }


  return <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-3xl font-bold tracking-tight text-gray-300 sm:text-6xl">
        <i className="fa-solid fa-ghost"></i><span>{player['username']}</span>
      </span>
      <br />
      {cards}
    </div>
  </div>
}