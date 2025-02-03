package nba

import (
	"time"

	"github.com/jmulhern/m/sportsball/backend/simple"
)

type Schedule struct {
	Meta           ScheduleMeta   `json:"meta"`
	LeagueSchedule LeagueSchedule `json:"leagueSchedule"`
}

type ScheduleMeta struct {
	Version int       `json:"version"`
	Request string    `json:"request"`
	Time    time.Time `json:"time"`
}

type LeagueSchedule struct {
	SeasonYear      string         `json:"seasonYear"`
	LeagueID        string         `json:"leagueId"`
	GameDates       []GameDate     `json:"gameDates"`
	Weeks           []ScheduleWeek `json:"weeks"`
	BroadcasterList []Broadcaster  `json:"broadcasterList"`
}

type GameDate struct {
	GameDate string `json:"gameDate"`
	Games    []Game `json:"games"`
}

func (gd GameDate) GetDate() simple.Date {
	parsed, _ := time.Parse("01/02/2006 15:04:05", gd.GameDate)
	return simple.Date{
		Year:  parsed.Year(),
		Month: int(parsed.Month()),
		Day:   parsed.Day(),
	}
}

type Game struct {
	GameID           string                `json:"gameId"`
	GameCode         string                `json:"gameCode"`
	GameStatus       int                   `json:"gameStatus"`
	GameStatusText   string                `json:"gameStatusText"`
	GameSequence     int                   `json:"gameSequence"`
	GameDateEst      time.Time             `json:"gameDateEst"`
	GameTimeEst      time.Time             `json:"gameTimeEst"`
	GameDateTimeEst  time.Time             `json:"gameDateTimeEst"`
	GameDateUTC      time.Time             `json:"gameDateUTC"`
	GameTimeUTC      time.Time             `json:"gameTimeUTC"`
	GameDateTimeUTC  time.Time             `json:"gameDateTimeUTC"`
	AwayTeamTime     time.Time             `json:"awayTeamTime"`
	HomeTeamTime     time.Time             `json:"homeTeamTime"`
	Day              string                `json:"day"`
	MonthNum         int                   `json:"monthNum"`
	WeekNumber       int                   `json:"weekNumber"`
	WeekName         string                `json:"weekName"`
	IfNecessary      bool                  `json:"ifNecessary"`
	SeriesGameNumber string                `json:"seriesGameNumber"`
	GameLabel        string                `json:"gameLabel"`
	GameSubLabel     string                `json:"gameSubLabel"`
	SeriesText       string                `json:"seriesText"`
	ArenaName        string                `json:"arenaName"`
	ArenaState       string                `json:"arenaState"`
	ArenaCity        string                `json:"arenaCity"`
	PostponedStatus  string                `json:"postponedStatus"`
	BranchLink       string                `json:"branchLink"`
	GameSubtype      string                `json:"gameSubtype"`
	Broadcasters     Broadcasters          `json:"broadcasters"`
	HomeTeam         ScheduleTeam          `json:"homeTeam"`
	AwayTeam         ScheduleTeam          `json:"awayTeam"`
	PointsLeaders    []SchedulePointLeader `json:"pointsLeaders"`
}

type Broadcasters struct {
	NationalTV         []Broadcaster `json:"nationalTvBroadcasters"`
	NationalRadio      []Broadcaster `json:"nationalRadioBroadcasters"`
	NationalOTT        []Broadcaster `json:"nationalOttBroadcasters"`
	HomeTV             []Broadcaster `json:"homeTvBroadcasters"`
	HomeRadio          []Broadcaster `json:"homeRadioBroadcasters"`
	HomeOTT            []Broadcaster `json:"homeOttBroadcasters"`
	AwayTV             []Broadcaster `json:"awayTvBroadcasters"`
	AwayRadio          []Broadcaster `json:"awayRadioBroadcasters"`
	AwayOTT            []Broadcaster `json:"awayOttBroadcasters"`
	InternationalRadio []Broadcaster `json:"intlRadioBroadcasters"`
	InternationalTV    []Broadcaster `json:"intlTvBroadcasters"`
	InternationalOTT   []Broadcaster `json:"intlOttBroadcasters"`
}

type Broadcaster struct {
	RegionID          int    `json:"regionId"`
	ID                int    `json:"broadcasterId"`
	TeamID            int    `json:"broadcasterTeamId"`
	Scope             string `json:"broadcasterScope"`
	Media             string `json:"broadcasterMedia"`
	Display           string `json:"broadcasterDisplay"`
	Abbreviation      string `json:"broadcasterAbbreviation"`
	TapeDelayComments string `json:"tapeDelayComments"`
	VideoLink         string `json:"broadcasterVideoLink"`
}

type ScheduleTeam struct {
	TeamID      int    `json:"teamId"`
	TeamName    string `json:"teamName"`
	TeamCity    string `json:"teamCity"`
	TeamTricode string `json:"teamTricode"`
	TeamSlug    string `json:"teamSlug"`
	Wins        int    `json:"wins"`
	Losses      int    `json:"losses"`
	Score       int    `json:"score"`
	Seed        int    `json:"seed"`
}

type SchedulePointLeader struct {
	PersonID    int     `json:"personId"`
	FirstName   string  `json:"firstName"`
	LastName    string  `json:"lastName"`
	TeamID      int     `json:"teamId"`
	TeamCity    string  `json:"teamCity"`
	TeamName    string  `json:"teamName"`
	TeamTricode string  `json:"teamTricode"`
	Points      float64 `json:"points"`
}

type ScheduleWeek struct {
	WeekNumber int       `json:"weekNumber"`
	WeekName   string    `json:"weekName"`
	StartDate  time.Time `json:"startDate"`
	EndDate    time.Time `json:"endDate"`
}
