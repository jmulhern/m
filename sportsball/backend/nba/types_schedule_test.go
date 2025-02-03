package nba

import (
	"testing"

	"github.com/google/go-cmp/cmp"

	"github.com/jmulhern/m/sportsball/backend/simple"
)

func TestGameDate_GetDate(t *testing.T) {
	t.Run("happy path", func(t *testing.T) {
		subject := GameDate{
			GameDate: "10/05/2023 00:00:00",
		}

		got := subject.GetDate()

		want := simple.Date{Year: 2023, Month: 10, Day: 5}

		if diff := cmp.Diff(got, want); diff != "" {
			t.Error(diff)
		}
	})
}
