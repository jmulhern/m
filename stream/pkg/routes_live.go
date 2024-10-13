package stream

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

var getter *http.Client

func init() {
	getter = &http.Client{}
}

func HandleLive(w http.ResponseWriter, r *http.Request) {
	channelID := r.PathValue("channel_id")

	url := fmt.Sprintf("https://youtube.com/channel/%s/live", channelID)
	channelLiveResponse, _ := getter.Get(url)
	channelLiveResponseRaw, _ := io.ReadAll(channelLiveResponse.Body)

	live := strings.Contains(string(channelLiveResponseRaw),
		`<link rel="canonical" href="https://www.youtube.com/watch?v=`)

	w.Header().Add("Content-Type", "application/json")
	raw, _ := json.Marshal(map[string]bool{
		"live": live,
	})
	_, _ = w.Write(raw)
}
