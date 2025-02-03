package sportsball

import (
	"encoding/json"
	"net/http"
)

func HandleSchedule(w http.ResponseWriter, r *http.Request) {
	teamTricode := r.PathValue("tricode")
	out := GetSchedule(teamTricode)
	futureGames := out.FutureGames
	if len(futureGames) > 5 {
		futureGames = futureGames[:5]
	}

	w.Header().Add("Content-Type", "application/json")
	raw, _ := json.Marshal(futureGames)
	_, _ = w.Write(raw)
}
