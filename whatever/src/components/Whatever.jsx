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
  cards.push(<div className="my-3 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
    <div className="px-4 py-5 sm:px-6">
      <span className="px-2"><i className={player['icon']}></i> {player['username']}</span>
    </div>
  </div>)

  if (player['psn_profile'] !== undefined) {
    cards.push(<div className="my-3 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <span><i className="fa-brands fa-playstation"></i> {player['psn_profile']['psn']}</span>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <span className="px-2">
          <i className="fa-solid fa-game-console-handheld"></i> {player['psn_profile']['games_played']}
        </span>
        <span className="px-2">
          <i className="fa-solid fa-hundred-points"></i> {player['psn_profile']['games_completed']}
        </span>
        <span className="px-2">{player['psn_profile']['trophies_per_day']} <i className="fa-solid fa-trophy"></i>/day
        </span>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <span className="px-2" style={{color: '#83b8e0'}}><i className="fa-solid fa-trophy"></i> {player['psn_profile']['trophies_platinum']}</span>
        <span className="px-2" style={{color: '#cd9a46'}}><i className="fa-solid fa-trophy"></i> {player['psn_profile']['trophies_gold']}</span>
        <span className="px-2" style={{color: '#d6d6d6'}}><i className="fa-solid fa-trophy"></i> {player['psn_profile']['trophies_silver']}</span>
        <span className="px-2" style={{color: '#bf6a3a'}}><i className="fa-solid fa-trophy"></i> {player['psn_profile']['trophies_bronze']}</span>
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


  return <div className="px-6 py-8 sm:py-16 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      {cards}
    </div>
  </div>
}