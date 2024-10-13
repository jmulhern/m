package server

import (
	"fmt"
	"log"
	"net/http"

	desertcatcookies "github.com/jmulhern/m/desertcatcookies/pkg"
	sportsball "github.com/jmulhern/m/sportsball/pkg"
	stream "github.com/jmulhern/m/stream/pkg"
	whatever "github.com/jmulhern/m/whatever/pkg"
)

func Start(port int) {
	mux := &Server{
		loud:             false,
		whatever:         whatever.Routes(),
		sportsball:       sportsball.Routes(),
		desertcatcookies: desertcatcookies.Routes(),
		stream:           stream.Routes(),
	}
	log.Printf("listening on :%d", port)
	_ = http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
