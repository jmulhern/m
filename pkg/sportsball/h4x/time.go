package h4x

import (
	"fmt"
	"time"
)

func GameTime(gameTime string) time.Time {
	parsed, _ := time.Parse("2006-01-02T15:04:05Z07:00", fmt.Sprintf("1900-01-01T%s:00Z", gameTime))
	return parsed
}
