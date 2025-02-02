package server

import (
	"fmt"
	"log"
	"net/http"

	desertcatcookies "github.com/jmulhern/m/desertcatcookies/pkg"
	greasyshadows "github.com/jmulhern/m/greasyshadows/pkg"
	sportsball "github.com/jmulhern/m/sportsball/pkg"
	whatever "github.com/jmulhern/m/whatever/pkg"
)

func Start(port int) {
	mux := &Server{
		loud:             false,
		desertcatcookies: desertcatcookies.Routes(),
		greasyshadows:    greasyshadows.Routes(),
		sportsball:       sportsball.Routes(),
		whatever:         whatever.Routes(),
	}
	log.Printf("listening on :%d", port)
	_ = http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
