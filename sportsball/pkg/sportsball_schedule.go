package sportsball

import (
	"time"

	"github.com/jmulhern/m/sportsball/pkg/phx"
)

func GetSchedule(teamTricode string) Schedule {
	now := phx.Now()
	schedule := nba.GetSchedule()
	var pastGames, futureGames []ScheduledGame
	var todayGame ScheduledGame
	var gameToday bool
	for _, gameDate := range schedule.LeagueSchedule.GameDates {
		simpleGameDate := gameDate.GetDate()
		for _, game := range gameDate.Games {
			if game.AwayTeam.TeamTricode == teamTricode || game.HomeTeam.TeamTricode == teamTricode {

				var gameTimeTime time.Time
				teamAway := game.AwayTeam.TeamTricode == teamTricode
				var channel string
				if teamAway {
					gameTimeTime = game.AwayTeamTime
					for _, broadcaster := range game.Broadcasters.AwayTV {
						channel = broadcaster.Display
						break
					}
				} else {
					gameTimeTime = game.HomeTeamTime
					for _, broadcaster := range game.Broadcasters.HomeTV {
						channel = broadcaster.Display
						break
					}
				}

				gameDay := simpleGameDate.String()
				gameTime := gameTimeTime.Format("3:04pm")
				scheduledGame := ScheduledGame{
					Away:          teamAway,
					AwayTeam:      game.AwayTeam.TeamTricode,
					AwayTeamName:  game.AwayTeam.TeamName,
					AwayTeamScore: game.AwayTeam.Score,
					HomeTeam:      game.HomeTeam.TeamTricode,
					HomeTeamName:  game.HomeTeam.TeamName,
					HomeTeamScore: game.HomeTeam.Score,
					GameTime:      gameDay + " @ " + gameTime,
					Channel:       channel,
					GameID:        game.GameID,
					Status:        game.GameStatus,
					Clock:         game.GameStatusText,
				}
				if simpleGameDate.Same(now) {
					gameToday = true
					todayGame = scheduledGame
				} else if simpleGameDate.Before(now) {
					pastGames = append(pastGames, scheduledGame)
				} else if simpleGameDate.After(now) {
					futureGames = append(futureGames, scheduledGame)
				}
			}
		}
	}
	return Schedule{
		GameToday:   gameToday,
		PastGames:   pastGames,
		TodayGame:   todayGame,
		FutureGames: futureGames,
	}
}
