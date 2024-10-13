package stream

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/jmulhern/m/stream/pkg/psnprofiles"
	youtubeapi "github.com/jmulhern/m/stream/pkg/youtube"
)

var psn psnprofiles.API
var youtube youtubeapi.API

func init() {
	psn = psnprofiles.New()
	youtube = youtubeapi.New()
}

type Player struct {
	YouTubeChannelID string `json:"youtube_channel_id"`
	PSN              string `json:"psn"`
}

var players = map[string]Player{
	"pandapandabear": {
		YouTubeChannelID: "UCGqaY3UNt7wNRuKFe1drzCw",
		PSN:              "PandaPandaBear",
	},
	"ghostlybones": {
		PSN: "ghostlybonesss",
	},
}

func HandlePlayer(w http.ResponseWriter, r *http.Request) {
	responseBody := make(map[string]any)

	username := strings.ToLower(r.PathValue("username"))
	responseBody["username"] = username

	player, found := players[username]
	if !found {
		w.WriteHeader(http.StatusNotFound)
		w.Header().Add("Content-Type", "application/json")
		raw, _ := json.Marshal(responseBody)
		_, _ = w.Write(raw)
		return
	}

	if player.YouTubeChannelID != "" {
		channel, _ := youtube.GetYouTubeChannel(player.YouTubeChannelID)
		responseBody["youtube_channel"] = channel
	}

	if player.PSN != "" {
		profile, _ := psn.GetPSNProfile(player.PSN)
		responseBody["psn_profile"] = profile
	}

	w.Header().Add("Content-Type", "application/json")
	raw, _ := json.Marshal(responseBody)
	_, _ = w.Write(raw)
}