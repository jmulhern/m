package server

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

type Server struct {
	loud             bool
	desertcatcookies *http.ServeMux
	greasyshadows    *http.ServeMux
	johnmulhern      *http.ServeMux
	sportsball       *http.ServeMux
	whatever         *http.ServeMux
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
	case domainParts[0] == "desertcatcookies":
		s.desertcatcookies.ServeHTTP(w, r)
	case domainParts[0] == "greasyshadows":
		s.greasyshadows.ServeHTTP(w, r)
	case domainParts[0] == "johnmulhern":
		s.johnmulhern.ServeHTTP(w, r)
	case domainParts[0] == "sportsball":
		s.sportsball.ServeHTTP(w, r)
	case domainParts[0] == "whatever":
		s.whatever.ServeHTTP(w, r)
	default:
		http.Error(w, fmt.Sprintf("%s was not found", r.Host), http.StatusNotFound)
	}
}
