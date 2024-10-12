package sportsball

import (
	"encoding/json"
	"net/http"
)

func HandleScoreboard(w http.ResponseWriter, r *http.Request) {
	teamTricode := r.PathValue("tricode")
	out := GetScoreboard(teamTricode)

	w.Header().Add("Content-Type", "application/json")
	raw, _ := json.Marshal(out)
	_, _ = w.Write(raw)
}
