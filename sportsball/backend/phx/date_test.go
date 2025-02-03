package phx

import (
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
)

func TestNow(t *testing.T) {
	phx, _ := time.LoadLocation("America/Phoenix")

	t.Run("happy path - year", func(t *testing.T) {
		got := Now()

		want := time.Now().In(phx)

		if diff := cmp.Diff(got.Year, want.Year()); diff != "" {
			t.Error(diff)
		}
	})

	t.Run("happy path - month", func(t *testing.T) {
		got := Now()

		want := time.Now().In(phx)

		if diff := cmp.Diff(got.Month, int(want.Month())); diff != "" {
			t.Error(diff)
		}
	})

	t.Run("happy path - day", func(t *testing.T) {
		got := Now()

		want := time.Now().In(phx)

		if diff := cmp.Diff(got.Day, want.Day()); diff != "" {
			t.Error(diff)
		}
	})
}
