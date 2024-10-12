package sportsball

import (
	nbadata "github.com/jmulhern/m/pkg/sportsball/nba"
)

var (
	nba nbadata.API
)

func init() {
	nba = nbadata.New()
}
