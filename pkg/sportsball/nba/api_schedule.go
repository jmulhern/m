package nba

import (
	"encoding/json"
	"io"
)

func (c Client) GetSchedule() Schedule {
	url := "https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json"
	response, _ := c.getter.Get(url)
	raw, _ := io.ReadAll(response.Body)

	var out Schedule
	_ = json.Unmarshal(raw, &out)
	return out
}
