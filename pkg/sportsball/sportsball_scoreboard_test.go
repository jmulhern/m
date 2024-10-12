package sportsball

import "testing"

func TestGetScoreboard(t *testing.T) {
	//t.Run("happy path - no game", func(t *testing.T) {
	//	nba = nbadata.Faker{
	//		GetScheduleFunc: func() nbadata.Schedule {
	//			return nbadata.Schedule{
	//				LeagueSchedule: nbadata.LeagueSchedule{
	//					GameDates: []nbadata.GameDate{
	//						{
	//							GameDate: "10/05/2023 00:00:00",
	//							Games: []nbadata.Game{
	//								{
	//									GameID:   "game-id",
	//									HomeTeam: nbadata.ScheduleTeam{TeamTricode: "BOS"},
	//									AwayTeam: nbadata.ScheduleTeam{TeamTricode: "NOP"},
	//								},
	//							},
	//						},
	//					},
	//				},
	//			}
	//		},
	//		GetBoxScoreFunc: func(gameID string) nbadata.BoxScore {
	//			t.Fatal("unexpected call")
	//			return nbadata.BoxScore{}
	//		},
	//	}
	//
	//	got := GetScoreboard("PHX", simple.Date{Year: 2023, Month: 10, Day: 5})
	//
	//	want := Scoreboard{
	//		Found: false,
	//	}
	//
	//	if diff := cmp.Diff(got, want); diff != "" {
	//		t.Error(diff)
	//	}
	//
	//})
	//
	//t.Run("happy path - before the home game", func(t *testing.T) {
	//	nba = nbadata.Faker{
	//		GetScheduleFunc: func() nbadata.Schedule {
	//			return nbadata.Schedule{
	//				LeagueSchedule: nbadata.LeagueSchedule{
	//					GameDates: []nbadata.GameDate{
	//						{
	//							GameDate: "10/05/2023 00:00:00",
	//							Games: []nbadata.Game{
	//								{
	//									GameID:       "game-id",
	//									GameStatus:   1, // pregame
	//									HomeTeamTime: h4x.GameTime("17:00"),
	//									AwayTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "NOP",
	//										TeamName:    "Pelicans",
	//									},
	//									HomeTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "PHX",
	//										TeamName:    "Suns",
	//									},
	//									Broadcasters: nbadata.Broadcasters{
	//										HomeTV: []nbadata.Broadcaster{
	//											{
	//												Display: "WGN",
	//											},
	//										},
	//									},
	//								},
	//							},
	//						},
	//					},
	//				},
	//			}
	//		},
	//		GetBoxScoreFunc: func(gameID string) nbadata.BoxScore {
	//			t.Fatal("unexpected call")
	//			return nbadata.BoxScore{}
	//		},
	//	}
	//
	//	got := GetScoreboard("PHX", simple.Date{Year: 2023, Month: 10, Day: 5})
	//
	//	want := Scoreboard{
	//		Found:     true,
	//		Away:      false,
	//		Status:    "pregame",
	//		AwayTeam:  "Pelicans",
	//		AwayScore: "-",
	//		HomeTeam:  "Suns",
	//		HomeScore: "-",
	//		GameTime:  "5:00pm",
	//		Channel:   "WGN",
	//	}
	//
	//	if diff := cmp.Diff(got, want); diff != "" {
	//		t.Error(diff)
	//	}
	//
	//})
	//
	//t.Run("happy path - before the away game", func(t *testing.T) {
	//	nba = nbadata.Faker{
	//		GetScheduleFunc: func() nbadata.Schedule {
	//			return nbadata.Schedule{
	//				LeagueSchedule: nbadata.LeagueSchedule{
	//					GameDates: []nbadata.GameDate{
	//						{
	//							GameDate: "10/05/2023 00:00:00",
	//							Games: []nbadata.Game{
	//								{
	//									GameID:       "game-id",
	//									GameStatus:   1, // pregame
	//									AwayTeamTime: h4x.GameTime("15:00"),
	//									AwayTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "PHX",
	//										TeamName:    "Suns",
	//									},
	//									HomeTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "NOP",
	//										TeamName:    "Pelicans",
	//									},
	//									Broadcasters: nbadata.Broadcasters{
	//										AwayTV: []nbadata.Broadcaster{
	//											{
	//												Display: "MTV",
	//											},
	//										},
	//									},
	//								},
	//							},
	//						},
	//					},
	//				},
	//			}
	//		},
	//		GetBoxScoreFunc: func(gameID string) nbadata.BoxScore {
	//			t.Fatal("unexpected call")
	//			return nbadata.BoxScore{}
	//		},
	//	}
	//
	//	got := GetScoreboard("PHX", simple.Date{Year: 2023, Month: 10, Day: 5})
	//
	//	want := Scoreboard{
	//		Found:     true,
	//		Away:      true,
	//		Status:    "pregame",
	//		AwayTeam:  "Suns",
	//		AwayScore: "-",
	//		HomeTeam:  "Pelicans",
	//		HomeScore: "-",
	//		GameTime:  "3:00pm",
	//		Channel:   "MTV",
	//	}
	//
	//	if diff := cmp.Diff(got, want); diff != "" {
	//		t.Error(diff)
	//	}
	//
	//})
	//
	//t.Run("happy path - live home game", func(t *testing.T) {
	//	nba = nbadata.Faker{
	//		GetScheduleFunc: func() nbadata.Schedule {
	//			return nbadata.Schedule{
	//				LeagueSchedule: nbadata.LeagueSchedule{
	//					GameDates: []nbadata.GameDate{
	//						{
	//							GameDate: "10/05/2023 00:00:00",
	//							Games: []nbadata.Game{
	//								{
	//									GameID:     "game-id",
	//									GameStatus: 2, // live
	//									AwayTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "NOP",
	//										TeamName:    "Pelicans",
	//									},
	//									HomeTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "PHX",
	//										TeamName:    "Suns",
	//									},
	//									Broadcasters: nbadata.Broadcasters{
	//										HomeTV: []nbadata.Broadcaster{
	//											{
	//												Display: "WGN",
	//											},
	//										},
	//									},
	//								},
	//							},
	//						},
	//					},
	//				},
	//			}
	//		},
	//		GetBoxScoreFunc: func(gameID string) nbadata.BoxScore {
	//			if diff := cmp.Diff(gameID, "game-id"); diff != "" {
	//				t.Error(diff)
	//			}
	//			return nbadata.BoxScore{
	//				Game: nbadata.BoxScoreGame{
	//					GameStatusText: "Q1 5:23",
	//					AwayTeam: nbadata.BoxScoreTeam{
	//						Score: 3,
	//					},
	//					HomeTeam: nbadata.BoxScoreTeam{
	//						Score: 29,
	//					},
	//				},
	//			}
	//
	//		},
	//	}
	//
	//	got := GetScoreboard("PHX", simple.Date{Year: 2023, Month: 10, Day: 5})
	//
	//	want := Scoreboard{
	//		Found:     true,
	//		Away:      false,
	//		Status:    "live",
	//		AwayTeam:  "Pelicans",
	//		AwayScore: "3",
	//		HomeTeam:  "Suns",
	//		HomeScore: "29",
	//		Clock:     "Q1 5:23",
	//		Channel:   "WGN",
	//	}
	//
	//	if diff := cmp.Diff(got, want); diff != "" {
	//		t.Error(diff)
	//	}
	//
	//})
	//
	//t.Run("happy path - live away game", func(t *testing.T) {
	//	nba = nbadata.Faker{
	//		GetScheduleFunc: func() nbadata.Schedule {
	//			return nbadata.Schedule{
	//				LeagueSchedule: nbadata.LeagueSchedule{
	//					GameDates: []nbadata.GameDate{
	//						{
	//							GameDate: "10/05/2023 00:00:00",
	//							Games: []nbadata.Game{
	//								{
	//									GameID:     "game-id",
	//									GameStatus: 2, // live
	//									AwayTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "PHX",
	//										TeamName:    "Suns",
	//									},
	//									HomeTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "NOP",
	//										TeamName:    "Pelicans",
	//									},
	//									Broadcasters: nbadata.Broadcasters{
	//										AwayTV: []nbadata.Broadcaster{
	//											{
	//												Display: "UPN",
	//											},
	//										},
	//									},
	//								},
	//							},
	//						},
	//					},
	//				},
	//			}
	//		},
	//		GetBoxScoreFunc: func(gameID string) nbadata.BoxScore {
	//			if diff := cmp.Diff(gameID, "game-id"); diff != "" {
	//				t.Error(diff)
	//			}
	//			return nbadata.BoxScore{
	//				Game: nbadata.BoxScoreGame{
	//					GameStatusText: "Q2 7:23",
	//					AwayTeam: nbadata.BoxScoreTeam{
	//						Score: 31,
	//					},
	//					HomeTeam: nbadata.BoxScoreTeam{
	//						Score: 4,
	//					},
	//				},
	//			}
	//
	//		},
	//	}
	//
	//	got := GetScoreboard("PHX", simple.Date{Year: 2023, Month: 10, Day: 5})
	//
	//	want := Scoreboard{
	//		Found:     true,
	//		Away:      true,
	//		Status:    "live",
	//		AwayTeam:  "Suns",
	//		AwayScore: "31",
	//		HomeTeam:  "Pelicans",
	//		HomeScore: "4",
	//		Clock:     "Q2 7:23",
	//		Channel:   "UPN",
	//	}
	//
	//	if diff := cmp.Diff(got, want); diff != "" {
	//		t.Error(diff)
	//	}
	//
	//})
	//
	//t.Run("happy path - live just ended", func(t *testing.T) {
	//	nba = nbadata.Faker{
	//		GetScheduleFunc: func() nbadata.Schedule {
	//			return nbadata.Schedule{
	//				LeagueSchedule: nbadata.LeagueSchedule{
	//					GameDates: []nbadata.GameDate{
	//						{
	//							GameDate: "10/05/2023 00:00:00",
	//							Games: []nbadata.Game{
	//								{
	//									GameID:     "game-id",
	//									GameStatus: 2, // live
	//									AwayTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "PHX",
	//										TeamName:    "Suns",
	//									},
	//									HomeTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "NOP",
	//										TeamName:    "Pelicans",
	//									},
	//									Broadcasters: nbadata.Broadcasters{
	//										AwayTV: []nbadata.Broadcaster{
	//											{
	//												Display: "UPN",
	//											},
	//										},
	//									},
	//								},
	//							},
	//						},
	//					},
	//				},
	//			}
	//		},
	//		GetBoxScoreFunc: func(gameID string) nbadata.BoxScore {
	//			if diff := cmp.Diff(gameID, "game-id"); diff != "" {
	//				t.Error(diff)
	//			}
	//			return nbadata.BoxScore{
	//				Game: nbadata.BoxScoreGame{
	//					GameStatusText: "Final",
	//					AwayTeam: nbadata.BoxScoreTeam{
	//						Score: 99,
	//					},
	//					HomeTeam: nbadata.BoxScoreTeam{
	//						Score: 42,
	//					},
	//				},
	//			}
	//
	//		},
	//	}
	//
	//	got := GetScoreboard("PHX", simple.Date{Year: 2023, Month: 10, Day: 5})
	//
	//	want := Scoreboard{
	//		Found:     true,
	//		Away:      true,
	//		Status:    "over",
	//		AwayTeam:  "Suns",
	//		AwayScore: "99",
	//		HomeTeam:  "Pelicans",
	//		HomeScore: "42",
	//		Clock:     "Final",
	//		Channel:   "UPN",
	//	}
	//
	//	if diff := cmp.Diff(got, want); diff != "" {
	//		t.Error(diff)
	//	}
	//
	//})
	//
	//t.Run("happy path - game over", func(t *testing.T) {
	//	nba = nbadata.Faker{
	//		GetScheduleFunc: func() nbadata.Schedule {
	//			return nbadata.Schedule{
	//				LeagueSchedule: nbadata.LeagueSchedule{
	//					GameDates: []nbadata.GameDate{
	//						{
	//							GameDate: "10/05/2023 00:00:00",
	//							Games: []nbadata.Game{
	//								{
	//									GameID:     "game-id",
	//									GameStatus: 3, // final
	//									AwayTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "PHX",
	//										TeamName:    "Suns",
	//										Score:       99,
	//									},
	//									HomeTeam: nbadata.ScheduleTeam{
	//										TeamTricode: "NOP",
	//										TeamName:    "Pelicans",
	//										Score:       42,
	//									},
	//									Broadcasters: nbadata.Broadcasters{
	//										AwayTV: []nbadata.Broadcaster{
	//											{
	//												Display: "UPN",
	//											},
	//										},
	//									},
	//								},
	//							},
	//						},
	//					},
	//				},
	//			}
	//		},
	//		GetBoxScoreFunc: func(gameID string) nbadata.BoxScore {
	//			t.Fatal("unexpected call")
	//			return nbadata.BoxScore{}
	//		},
	//	}
	//
	//	got := GetScoreboard("PHX", simple.Date{Year: 2023, Month: 10, Day: 5})
	//
	//	want := Scoreboard{
	//		Found:     true,
	//		Away:      true,
	//		Status:    "over",
	//		AwayTeam:  "Suns",
	//		AwayScore: "99",
	//		HomeTeam:  "Pelicans",
	//		HomeScore: "42",
	//		Channel:   "UPN",
	//	}
	//
	//	if diff := cmp.Diff(got, want); diff != "" {
	//		t.Error(diff)
	//	}
	//
	//})
}
