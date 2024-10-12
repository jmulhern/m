package sportsball

import "testing"

func TestGetSchedule(t *testing.T) {
	//scheduleLength = 2
	//t.Run("happy path", func(t *testing.T) {
	//	nba = nbadata.Faker{
	//		GetScheduleFunc: func() nbadata.Schedule {
	//			return nbadata.Schedule{
	//				LeagueSchedule: nbadata.LeagueSchedule{
	//					GameDates: []nbadata.GameDate{
	//						{
	//							GameDate: "10/05/2023 00:00:00",
	//							Games: []nbadata.Game{
	//								{
	//									GameID:       "game-id-20231005",
	//									HomeTeamTime: h4x.GameTime("14:00"),
	//									AwayTeam:     nbadata.ScheduleTeam{TeamTricode: "NOP"},
	//									HomeTeam:     nbadata.ScheduleTeam{TeamTricode: "PHX"},
	//									Broadcasters: nbadata.Broadcasters{
	//										HomeTV: []nbadata.Broadcaster{
	//											{Display: "HBO"},
	//										},
	//									},
	//								},
	//							},
	//						},
	//						{
	//							GameDate: "10/06/2023 00:00:00",
	//							Games: []nbadata.Game{
	//								{
	//									GameID:       "game-id-20231006",
	//									AwayTeamTime: h4x.GameTime("15:00"),
	//									AwayTeam:     nbadata.ScheduleTeam{TeamTricode: "PHX"},
	//									HomeTeam:     nbadata.ScheduleTeam{TeamTricode: "SAS"},
	//									Broadcasters: nbadata.Broadcasters{
	//										AwayTV: []nbadata.Broadcaster{
	//											{Display: "PBS"},
	//										},
	//									},
	//								},
	//							},
	//						},
	//						{
	//							GameDate: "10/07/2023 00:00:00",
	//							Games: []nbadata.Game{
	//								{
	//									GameID:       "game-id-20231007",
	//									HomeTeamTime: h4x.GameTime("19:00"),
	//									AwayTeam:     nbadata.ScheduleTeam{TeamTricode: "BOS"},
	//									HomeTeam:     nbadata.ScheduleTeam{TeamTricode: "PHX"},
	//								},
	//							},
	//						},
	//					},
	//				},
	//			}
	//		},
	//	}
	//
	//	got := GetSchedule("PHX")
	//
	//	want := Schedule{
	//		PastGames: []ScheduledGame{
	//			{
	//				Away:     false,
	//				AwayTeam: "NOP",
	//				HomeTeam: "PHX",
	//				GameTime: "Thu, Oct 5 @ 2:00pm",
	//				Channel:  "HBO",
	//			},
	//		},
	//		TodayGame: ScheduledGame{
	//				Away:     true,
	//				AwayTeam: "PHX",
	//				HomeTeam: "SAS",
	//				GameTime: "Fri, Oct 6 @ 3:00pm",
	//				Channel:  "PBS",
	//			},
	//		FutureGames: []ScheduledGame{
	//			{
	//				Away:     true,
	//				AwayTeam: "LAL",
	//				HomeTeam: "PHX",
	//				GameTime: "Fri, Oct 7 @ 2:00pm",
	//				Channel:  "TNT",
	//			},
	//		},
	//	}
	//
	//	if diff := cmp.Diff(got, want); diff != "" {
	//		t.Error(diff)
	//	}
	//})
}
