package nba

import (
	"encoding/json"
	"fmt"
	"io"
)

func (c Client) GetBoxScore(gameID string) BoxScore {
	url := fmt.Sprintf("https://cdn.nba.com/static/json/liveData/boxscore/boxscore_%s.json", gameID)
	response, _ := c.getter.Get(url)
	raw, _ := io.ReadAll(response.Body)

	var out BoxScore
	_ = json.Unmarshal(raw, &out)
	return out
}
