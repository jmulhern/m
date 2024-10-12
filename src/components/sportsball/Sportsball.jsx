import Scoreboard from "./Scoreboard";
import Schedule from "./Schedule";
import {useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";

export default function Sportsball({tricode}) {
  const [game, setGame] = useState({});
  const [showSchedule, setShowSchedule] = useState(false);
  useQuery({
    queryKey: ["home"],
    queryFn: () => axios.get(`/-/scoreboard/${tricode}`)
      .then((res) => {
        setGame(res.data)
        setShowSchedule(res.data['found'] === false || res.data['status'] === "over")
      })
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Scoreboard tricode={tricode}/>
        {showSchedule && <Schedule tricode={tricode} />}
      </div>
    </div>
  )
}