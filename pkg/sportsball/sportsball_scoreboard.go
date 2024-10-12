package sportsball

import (
	"strconv"
	"strings"
)

func GetScoreboard(teamTricode string) Scoreboard {
	schedule := GetSchedule(teamTricode)
	if schedule.GameToday {
		var status, awayScore, homeScore, gameTime string
		var clock string
		switch schedule.TodayGame.Status {
		case 1:
			status = "pregame"
			awayScore = "-"
			homeScore = "-"
			gameTime = schedule.TodayGame.GameTime
		case 2:
			status = "live"
			boxScore := nba.GetBoxScore(schedule.TodayGame.GameID)
			awayScore = strconv.Itoa(boxScore.Game.AwayTeam.Score)
			homeScore = strconv.Itoa(boxScore.Game.HomeTeam.Score)
			clock = strings.TrimSpace(boxScore.Game.GameStatusText)
			if boxScore.Game.GameStatusText == "Final" {
				status = "over"
			}
		case 3:
			status = "over"
			awayScore = strconv.Itoa(schedule.TodayGame.AwayTeamScore)
			homeScore = strconv.Itoa(schedule.TodayGame.HomeTeamScore)
			clock = strings.TrimSpace(schedule.TodayGame.Clock)
		}
		return Scoreboard{
			Found:     true,
			Away:      schedule.TodayGame.Away,
			Status:    status,
			AwayTeam:  schedule.TodayGame.AwayTeamName,
			AwayScore: awayScore,
			HomeTeam:  schedule.TodayGame.HomeTeamName,
			HomeScore: homeScore,
			Clock:     clock,
			GameTime:  gameTime,
			Channel:   schedule.TodayGame.Channel,
		}
	}
	return Scoreboard{
		Found: false,
	}
}
