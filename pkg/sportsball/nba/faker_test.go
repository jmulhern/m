package nba

import (
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestFaker(t *testing.T) {
	t.Run("API conformance", func(t *testing.T) {
		subject := Faker{}
		_ = API(subject)
	})
}

func TestFaker_GetSchedule(t *testing.T) {
	t.Run("happy path", func(t *testing.T) {
		var called bool
		subject := Faker{
			GetScheduleFunc: func() Schedule {
				called = true
				return Schedule{}
			},
		}

		_ = subject.GetSchedule()

		if diff := cmp.Diff(called, true); diff != "" {
			t.Error(diff)
		}
	})
}

func TestFaker_GetBoxScore(t *testing.T) {
	t.Run("happy path", func(t *testing.T) {
		var called bool
		subject := Faker{
			GetBoxScoreFunc: func(gameID string) BoxScore {
				called = true
				return BoxScore{}
			},
		}

		_ = subject.GetBoxScore("")

		if diff := cmp.Diff(called, true); diff != "" {
			t.Error(diff)
		}
	})
}
