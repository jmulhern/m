package server

import (
	"fmt"
	"log"
	"net/http"

	desertcatcookies "github.com/jmulhern/m/desertcatcookies/pkg"
	lunkers "github.com/jmulhern/m/lunkers/pkg"
	sportsball "github.com/jmulhern/m/sportsball/pkg"
	whatever "github.com/jmulhern/m/whatever/pkg"
)

func Start(port int) {
	mux := &Server{
		loud:             true,
		whatever:         whatever.Routes(),
		sportsball:       sportsball.Routes(),
		desertcatcookies: desertcatcookies.Routes(),
		lunkers:          lunkers.Routes(),
	}
	log.Printf("listening on :%d", port)
	_ = http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
