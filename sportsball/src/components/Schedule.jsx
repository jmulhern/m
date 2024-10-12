import React, { useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";

export default function Schedule({tricode}) {
  const [scheduledGames, setScheduledGames] = useState([]);
  useQuery({
    queryKey: ["schedule"],
    queryFn: () => axios.get(`/-/schedule/${tricode}`)
      .then((res) => setScheduledGames(res.data))
  })

  return (
    <>
      {scheduledGames && scheduledGames.length > 0 && <div className="divide-purple-200 divide-y overflow-hidden rounded-lg bg-white">
          {scheduledGames.map((game) => <div className="grid grid-cols-1 place-items-center gap-2  py-2  sm:grid-cols-2" key={game['game_time']}>
            <div>
              {game['away'] === true && <i className="fa-sharp fa-light fa-plane-departure mx-2 font-bold text-gray-500"></i>}
              {game['away'] === false && <i className="fa-sharp fa-light fa-house-heart mx-2 font-bold text-red-500"></i>}
              <span className={game['away'] === true ? "font-bold" : ''}>{game['away_team']}</span> vs <span className={game['away'] === false ? "font-bold" : ''}>{game['home_team']}</span>
            </div>
            <div className="text-center text-xs">
              <span className="font-bold">{game['game_time']}</span><br/><i className="fa-sharp fa-light fa-tv-retro mx-2"></i>{game['channel']}
            </div>

          </div>)}
      </div>}
    </>
  )
}