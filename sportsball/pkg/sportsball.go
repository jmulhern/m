package sportsball

import (
	nbadata "github.com/jmulhern/m/sportsball/pkg/nba"
)

var (
	nba nbadata.API
)

func init() {
	nba = nbadata.New()
}
