import React, {useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";


export default function Stream({channelID}) {
  const [showStream, setShowStream] = useState(null);
  useQuery({
    queryKey: [`live:${channelID}`],
    queryFn: () => axios.get(`live/${channelID}`)
      .then((res) => {
        setShowStream(res.data['live'] === true)
      })
  })

  if(showStream===true) {
    return <iframe src={`https://www.youtube.com/embed/live_stream?channel=${channelID}`}></iframe>
  } else if(showStream===false) {
    return <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-3xl font-bold tracking-tight text-gray-300 sm:text-6xl">
          <i className="fa-solid fa-signal-stream-slash"></i>
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Stream is not live!
        </h2>
        <h5 className="text-lg tracking-tight text-gray-900 sm:text-2xl">
          Check back soon, please...
        </h5>
      </div>
    </div>
  } else {
    return <></>
  }
}