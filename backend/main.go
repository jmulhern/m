package backend

import (
	"fmt"
	"log"
	"net/http"

	desertcatcookies "github.com/jmulhern/m/desertcatcookies/backend"
	greasyshadows "github.com/jmulhern/m/greasyshadows/backend"
	johnmulhern "github.com/jmulhern/m/johnmulhern/backend"
	sportsball "github.com/jmulhern/m/sportsball/backend"
	what "github.com/jmulhern/m/what/backend"
	whatever "github.com/jmulhern/m/whatever/backend"
)

func Start(port int) {
	mux := &Server{
		desertcatcookies: desertcatcookies.Routes(),
		greasyshadows:    greasyshadows.Routes(),
		johnmulhern:      johnmulhern.Routes(),
		sportsball:       sportsball.Routes(),
		what:             what.Routes(),
		whatever:         whatever.Routes(),
	}
	log.Printf("listening on :%d", port)
	_ = http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
