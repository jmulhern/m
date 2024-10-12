package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/jmulhern/m/pkg/sportsball"
	"github.com/jmulhern/m/pkg/whatever"
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
