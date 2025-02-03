package sportsball

import (
	nbadata "github.com/jmulhern/m/sportsball/backend/nba"
)

var (
	nba nbadata.API
)

func init() {
	nba = nbadata.New()
}
