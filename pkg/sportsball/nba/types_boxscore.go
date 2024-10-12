package nba

import "time"

type BoxScore struct {
	Meta BoxScoreMeta `json:"meta"`
	Game BoxScoreGame `json:"game"`
}

type BoxScoreMeta struct {
	Version int    `json:"version"`
	Code    int    `json:"code"`
	Request string `json:"request"`
	Time    string `json:"time"`
}

type BoxScoreGame struct {
	GameID            string             `json:"gameId"`
	GameTimeLocal     string             `json:"gameTimeLocal"`
	GameTimeUTC       time.Time          `json:"gameTimeUTC"`
	GameTimeHome      string             `json:"gameTimeHome"`
	GameTimeAway      string             `json:"gameTimeAway"`
	GameEt            string             `json:"gameEt"`
	Duration          int                `json:"duration"`
	GameCode          string             `json:"gameCode"`
	GameStatusText    string             `json:"gameStatusText"`
	GameStatus        int                `json:"gameStatus"`
	RegulationPeriods int                `json:"regulationPeriods"`
	Period            int                `json:"period"`
	GameClock         string             `json:"gameClock"`
	Attendance        int                `json:"attendance"`
	Sellout           string             `json:"sellout"`
	Arena             BoxScoreArena      `json:"arena"`
	Officials         []BoxScoreOfficial `json:"officials"`
	HomeTeam          BoxScoreTeam       `json:"homeTeam"`
	AwayTeam          BoxScoreTeam       `json:"awayTeam"`
}

type BoxScoreArena struct {
	ArenaID       int    `json:"arenaId"`
	ArenaName     string `json:"arenaName"`
	ArenaCity     string `json:"arenaCity"`
	ArenaState    string `json:"arenaState"`
	ArenaCountry  string `json:"arenaCountry"`
	ArenaTimezone string `json:"arenaTimezone"`
}

type BoxScoreOfficial struct {
	PersonID    int    `json:"personId"`
	Name        string `json:"name"`
	NameInitial string `json:"nameI"`
	FirstName   string `json:"firstName"`
	FamilyName  string `json:"familyName"`
	JerseyNum   string `json:"jerseyNum"`
	Assignment  string `json:"assignment"`
}

type BoxScoreTeam struct {
	TeamID            int                    `json:"teamId"`
	TeamName          string                 `json:"teamName"`
	TeamCity          string                 `json:"teamCity"`
	TeamTricode       string                 `json:"teamTricode"`
	Score             int                    `json:"score"`
	InBonus           string                 `json:"inBonus"`
	TimeoutsRemaining int                    `json:"timeoutsRemaining"`
	Periods           []BoxScorePeriod       `json:"periods"`
	Players           []BoxScorePlayer       `json:"players"`
	Statistics        BoxScoreTeamStatistics `json:"statistics"`
}

type BoxScorePeriod struct {
	Period     int    `json:"period"`
	PeriodType string `json:"periodType"`
	Score      int    `json:"score"`
}

type BoxScorePlayer struct {
	Status                string                   `json:"status"`
	Order                 int                      `json:"order"`
	PersonID              int                      `json:"personId"`
	JerseyNum             string                   `json:"jerseyNum"`
	Position              string                   `json:"position,omitempty"`
	Starter               string                   `json:"starter"`
	OnCourt               string                   `json:"oncourt"`
	Played                string                   `json:"played"`
	Name                  string                   `json:"name"`
	NameInitial           string                   `json:"nameI"`
	FirstName             string                   `json:"firstName"`
	FamilyName            string                   `json:"familyName"`
	Statistics            BoxScorePlayerStatistics `json:"statistics"`
	NotPlayingReason      string                   `json:"notPlayingReason,omitempty"`
	NotPlayingDescription string                   `json:"notPlayingDescription,omitempty"`
}

type BoxScorePlayerStatistics struct {
	Assists                 int     `json:"assists"`
	Blocks                  int     `json:"blocks"`
	BlocksReceived          int     `json:"blocksReceived"`
	FieldGoalsAttempted     int     `json:"fieldGoalsAttempted"`
	FieldGoalsMade          int     `json:"fieldGoalsMade"`
	FieldGoalsPercentage    float64 `json:"fieldGoalsPercentage"`
	FoulsOffensive          int     `json:"foulsOffensive"`
	FoulsDrawn              int     `json:"foulsDrawn"`
	FoulsPersonal           int     `json:"foulsPersonal"`
	FoulsTechnical          int     `json:"foulsTechnical"`
	FreeThrowsAttempted     int     `json:"freeThrowsAttempted"`
	FreeThrowsMade          int     `json:"freeThrowsMade"`
	FreeThrowsPercentage    float64 `json:"freeThrowsPercentage"`
	Minus                   float64 `json:"minus"`
	Minutes                 string  `json:"minutes"`
	MinutesCalculated       string  `json:"minutesCalculated"`
	Plus                    float64 `json:"plus"`
	PlusMinusPoints         float64 `json:"plusMinusPoints"`
	Points                  int     `json:"points"`
	PointsFastBreak         int     `json:"pointsFastBreak"`
	PointsInThePaint        int     `json:"pointsInThePaint"`
	PointsSecondChance      int     `json:"pointsSecondChance"`
	ReboundsDefensive       int     `json:"reboundsDefensive"`
	ReboundsOffensive       int     `json:"reboundsOffensive"`
	ReboundsTotal           int     `json:"reboundsTotal"`
	Steals                  int     `json:"steals"`
	ThreePointersAttempted  int     `json:"threePointersAttempted"`
	ThreePointersMade       int     `json:"threePointersMade"`
	ThreePointersPercentage float64 `json:"threePointersPercentage"`
	Turnovers               int     `json:"turnovers"`
	TwoPointersAttempted    int     `json:"twoPointersAttempted"`
	TwoPointersMade         int     `json:"twoPointersMade"`
	TwoPointersPercentage   float64 `json:"twoPointersPercentage"`
}

type BoxScoreTeamStatistics struct {
	Assists                      int     `json:"assists"`
	AssistsTurnoverRatio         float64 `json:"assistsTurnoverRatio"`
	BenchPoints                  int     `json:"benchPoints"`
	BiggestLead                  int     `json:"biggestLead"`
	BiggestLeadScore             string  `json:"biggestLeadScore"`
	BiggestScoringRun            int     `json:"biggestScoringRun"`
	BiggestScoringRunScore       string  `json:"biggestScoringRunScore"`
	Blocks                       int     `json:"blocks"`
	BlocksReceived               int     `json:"blocksReceived"`
	FastBreakPointsAttempted     int     `json:"fastBreakPointsAttempted"`
	FastBreakPointsMade          int     `json:"fastBreakPointsMade"`
	FastBreakPointsPercentage    float64 `json:"fastBreakPointsPercentage"`
	FieldGoalsAttempted          int     `json:"fieldGoalsAttempted"`
	FieldGoalsEffectiveAdjusted  float64 `json:"fieldGoalsEffectiveAdjusted"`
	FieldGoalsMade               int     `json:"fieldGoalsMade"`
	FieldGoalsPercentage         float64 `json:"fieldGoalsPercentage"`
	FoulsOffensive               int     `json:"foulsOffensive"`
	FoulsDrawn                   int     `json:"foulsDrawn"`
	FoulsPersonal                int     `json:"foulsPersonal"`
	FoulsTeam                    int     `json:"foulsTeam"`
	FoulsTechnical               int     `json:"foulsTechnical"`
	FoulsTeamTechnical           int     `json:"foulsTeamTechnical"`
	FreeThrowsAttempted          int     `json:"freeThrowsAttempted"`
	FreeThrowsMade               int     `json:"freeThrowsMade"`
	FreeThrowsPercentage         float64 `json:"freeThrowsPercentage"`
	LeadChanges                  int     `json:"leadChanges"`
	Minutes                      string  `json:"minutes"`
	MinutesCalculated            string  `json:"minutesCalculated"`
	Points                       int     `json:"points"`
	PointsAgainst                int     `json:"pointsAgainst"`
	PointsFastBreak              int     `json:"pointsFastBreak"`
	PointsFromTurnovers          int     `json:"pointsFromTurnovers"`
	PointsInThePaint             int     `json:"pointsInThePaint"`
	PointsInThePaintAttempted    int     `json:"pointsInThePaintAttempted"`
	PointsInThePaintMade         int     `json:"pointsInThePaintMade"`
	PointsInThePaintPercentage   float64 `json:"pointsInThePaintPercentage"`
	PointsSecondChance           int     `json:"pointsSecondChance"`
	ReboundsDefensive            int     `json:"reboundsDefensive"`
	ReboundsOffensive            int     `json:"reboundsOffensive"`
	ReboundsPersonal             int     `json:"reboundsPersonal"`
	ReboundsTeam                 int     `json:"reboundsTeam"`
	ReboundsTeamDefensive        int     `json:"reboundsTeamDefensive"`
	ReboundsTeamOffensive        int     `json:"reboundsTeamOffensive"`
	ReboundsTotal                int     `json:"reboundsTotal"`
	SecondChancePointsAttempted  int     `json:"secondChancePointsAttempted"`
	SecondChancePointsMade       int     `json:"secondChancePointsMade"`
	SecondChancePointsPercentage float64 `json:"secondChancePointsPercentage"`
	Steals                       int     `json:"steals"`
	ThreePointersAttempted       int     `json:"threePointersAttempted"`
	ThreePointersMade            int     `json:"threePointersMade"`
	ThreePointersPercentage      float64 `json:"threePointersPercentage"`
	TimeLeading                  string  `json:"timeLeading"`
	TimesTied                    int     `json:"timesTied"`
	TrueShootingAttempts         float64 `json:"trueShootingAttempts"`
	TrueShootingPercentage       float64 `json:"trueShootingPercentage"`
	Turnovers                    int     `json:"turnovers"`
	TurnoversTeam                int     `json:"turnoversTeam"`
	TurnoversTotal               int     `json:"turnoversTotal"`
	TwoPointersAttempted         int     `json:"twoPointersAttempted"`
	TwoPointersMade              int     `json:"twoPointersMade"`
	TwoPointersPercentage        float64 `json:"twoPointersPercentage"`
}
