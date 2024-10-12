package phx

import (
	"time"

	"github.com/jmulhern/m/pkg/sportsball/simple"
)

func Now() simple.Date {
	phx, _ := time.LoadLocation("America/Phoenix")
	now := time.Now().In(phx)
	return simple.Date{
		Year:  now.Year(),
		Month: int(now.Month()),
		Day:   now.Day(),
	}
}
