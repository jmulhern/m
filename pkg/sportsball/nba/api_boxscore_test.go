package nba

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestClient_GetBoxScore(t *testing.T) {
	t.Run("happy path", func(t *testing.T) {
		response := BoxScore{
			Meta: BoxScoreMeta{
				Version: 1,
			},
		}

		subject := Client{
			getter: mockGetter{
				GetFunc: func(url string) (resp *http.Response, err error) {
					if diff := cmp.Diff(url, "https://cdn.nba.com/static/json/liveData/boxscore/boxscore_1234.json"); diff != "" {
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

		got := subject.GetBoxScore("1234")

		if diff := cmp.Diff(got, response); diff != "" {
			t.Error(diff)
		}
	})
}
