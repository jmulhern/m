package server

import (
	"fmt"
	"log"
	"net/http"

	sportsball "github.com/jmulhern/m/sportsball/pkg"
	whatever "github.com/jmulhern/m/whatever/pkg"
)

func Start(port int) {
	mux := &Server{
		loud:       true,
		whatever:   whatever.Routes(),
		sportsball: sportsball.Routes(),
	}
	log.Printf("listening on :%d", port)
	_ = http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
