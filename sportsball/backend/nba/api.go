package nba

type API interface {
	GetSchedule() Schedule
	GetBoxScore(gameID string) BoxScore
}
