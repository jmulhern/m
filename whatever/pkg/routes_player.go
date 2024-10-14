package pkg

import (
	"encoding/json"
	"net/http"
	"strings"

	youtubeapi "github.com/jmulhern/m/whatever/pkg/youtube"

	"github.com/jmulhern/m/whatever/pkg/psnprofiles"
)

var psn psnprofiles.API
var youtube youtubeapi.API

func init() {
	psn = psnprofiles.New()
	youtube = youtubeapi.New()
}

type Player struct {
	YouTubeUsername  string `json:"youtube_username"`
	YouTubeChannelID string `json:"youtube_channel_id"`
	PSN              string `json:"psn"`
	Icon             Icon   `json:"icon"`
}

type Icon struct {
	Kind  string `json:"kind"`
	Color string `json:"color"`
}

var players = map[string]Player{
	"pandapandabear": {
		YouTubeUsername:  "@thegospelclaws",
		YouTubeChannelID: "UCGqaY3UNt7wNRuKFe1drzCw",
		PSN:              "PandaPandaBear",
		Icon:             Icon{Kind: "octopus", Color: "purple"},
	},
	"ghostlybones": {
		PSN:  "ghostlybonesss",
		Icon: Icon{Kind: "ghost", Color: "gray"},
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
	responseBody["icon"] = player.Icon

	if player.YouTubeChannelID != "" {
		channel, _ := youtube.GetYouTubeChannel(player.YouTubeChannelID)
		responseBody["youtube_channel"] = channel
		responseBody["youtube_username"] = player.YouTubeUsername
	}

	if player.PSN != "" {
		profile, _ := psn.GetPSNProfile(player.PSN)
		responseBody["psn_profile"] = profile
	}

	w.Header().Add("Content-Type", "application/json")
	raw, _ := json.Marshal(responseBody)
	_, _ = w.Write(raw)
}
