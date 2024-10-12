package nba

import (
	"net/http"
	"testing"
)

type mockGetter struct {
	GetFunc func(url string) (resp *http.Response, err error)
}

func (m mockGetter) Get(url string) (resp *http.Response, err error) {
	return m.GetFunc(url)
}

func TestNew(t *testing.T) {
	t.Run("happy path", func(t *testing.T) {
		got := New()
		if got == nil {
			t.Error("unexpected to be nil")
		}
	})
}
