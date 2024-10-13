package psnprofiles

type PSNProfile struct {
	PSN            string `json:"psn"`
	GamesPlayed    string `json:"games_played"`
	GamesCompleted string `json:"games_completed"`
	TrophiesPerDay string `json:"trophies_per_day"`
}

type API interface {
	GetPSNProfile(psn string) (PSNProfile, error)
}
