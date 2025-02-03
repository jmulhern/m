package nba

type Faker struct {
	GetScheduleFunc func() Schedule
	GetBoxScoreFunc func(gameID string) BoxScore
}

func (f Faker) GetSchedule() Schedule {
	return f.GetScheduleFunc()
}

func (f Faker) GetBoxScore(gameID string) BoxScore {
	return f.GetBoxScoreFunc(gameID)
}
