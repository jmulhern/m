package sportsball

type Scoreboard struct {
	Found     bool   `json:"found"`
	Status    string `json:"status"`
	Away      bool   `json:"away"`
	AwayTeam  string `json:"away_team"`
	AwayScore string `json:"away_score"`
	HomeTeam  string `json:"home_team"`
	HomeScore string `json:"home_score"`
	Clock     string `json:"clock"`
	GameTime  string `json:"game_time"`
	Channel   string `json:"channel"`
}

type Schedule struct {
	GameToday   bool
	PastGames   []ScheduledGame
	TodayGame   ScheduledGame
	FutureGames []ScheduledGame
}

type ScheduledGame struct {
	Away          bool   `json:"away"`
	AwayTeam      string `json:"away_team"`
	AwayTeamName  string `json:"away_team_name"`
	AwayTeamScore int    `json:"away_team_score"`
	HomeTeam      string `json:"home_team"`
	HomeTeamName  string `json:"home_team_name"`
	HomeTeamScore int    `json:"home_team_score"`
	GameID        string `json:"game_id"`
	GameTime      string `json:"game_time"`
	Channel       string `json:"channel"`
	Status        int    `json:"status"`
	Clock         string `json:"clock"`
}
