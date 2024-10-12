package server

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

type Server struct {
	loud       bool
	sportsball *http.ServeMux
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if s.loud {
		log.Println("->", r.Method, r.Host, r.URL.Path)
	}
	domainParts := strings.Split(r.Host, ".")
	if domainParts[0] == "sportsball" {
		s.sportsball.ServeHTTP(w, r)
	} else {
		http.Error(w, fmt.Sprintf("%s was not found", r.Host), http.StatusNotFound)
	}
}
