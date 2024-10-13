import {useState} from "react";
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
    return <h1>Not currently streaming! Come back for the giveaways</h1>
  } else {
    return <></>
  }
}