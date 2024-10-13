package server

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

type Server struct {
	loud             bool
	whatever         *http.ServeMux
	sportsball       *http.ServeMux
	desertcatcookies *http.ServeMux
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/health" {
		w.WriteHeader(200)
		return
	}

	domainParts := strings.Split(r.Host, ".")
	if s.loud {
		log.Println("->", r.Method, r.Host, r.URL.Path)
	}

	switch {
	case domainParts[0] == "whatever":
		s.whatever.ServeHTTP(w, r)
	case domainParts[0] == "sportsball":
		s.sportsball.ServeHTTP(w, r)
	case domainParts[0] == "desertcatcookies":
		s.desertcatcookies.ServeHTTP(w, r)
	default:
		http.Error(w, fmt.Sprintf("%s was not found", r.Host), http.StatusNotFound)
	}
}
