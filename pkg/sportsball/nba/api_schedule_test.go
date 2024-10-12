package nba

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestClient_GetSchedule(t *testing.T) {
	t.Run("happy path", func(t *testing.T) {
		response := Schedule{
			Meta: ScheduleMeta{
				Version: 1,
			},
		}

		subject := Client{
			getter: mockGetter{
				GetFunc: func(url string) (resp *http.Response, err error) {
					if diff := cmp.Diff(url, "https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json"); diff != "" {
						t.Error(diff)
					}
					raw, _ := json.Marshal(response)
					return &http.Response{
						StatusCode: 200,
						Body:       io.NopCloser(bytes.NewReader(raw)),
					}, nil
				},
			},
		}

		got := subject.GetSchedule()

		if diff := cmp.Diff(got, response); diff != "" {
			t.Error(diff)
		}
	})
}
