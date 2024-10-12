package h4x

import (
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
)

func TestGameTime(t *testing.T) {
	t.Run("happy path", func(t *testing.T) {
		got := GameTime("17:00")

		want := time.Date(1900, 1, 1, 17, 00, 00, 00, time.UTC)

		if diff := cmp.Diff(got, want); diff != "" {
			t.Error(diff)
		}
	})
}
