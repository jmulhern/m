package psnprofiles

type PSNProfile struct {
	PSN              string `json:"psn"`
	GamesPlayed      string `json:"games_played"`
	GamesCompleted   string `json:"games_completed"`
	TrophiesPerDay   string `json:"trophies_per_day"`
	TrophiesPlatinum string `json:"trophies_platinum"`
	TrophiesGold     string `json:"trophies_gold"`
	TrophiesSilver   string `json:"trophies_silver"`
	TrophiesBronze   string `json:"trophies_bronze"`
}

type API interface {
	GetPSNProfile(psn string) (PSNProfile, error)
}
