package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/jmulhern/m/pkg/sportsball"
)

func Start(port int) {
	mux := &Server{
		sportsball: sportsball.Routes(),
	}
	log.Printf("listening on :%d", port)
	_ = http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
