package sportsball

import (
	"io"
	"log"
	"net/http"
	"os"
)

var index, stylesheets, javascript, favicon []byte
var cache, loud bool

func init() {
	cache = true
	loud = false
}

func Routes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /-/scoreboard/{tricode}", HandleScoreboard)
	mux.HandleFunc("GET /-/schedule/{tricode}", HandleSchedule)

	mux.HandleFunc("GET /dist/output.css", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/output.css"
		contentType := "text/css"

		// keep in memory
		if len(stylesheets) == 0 || !cache {
			file, _ := os.Open(filename)
			stylesheets, _ = io.ReadAll(file)
		}
		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(stylesheets)
		if loud {
			log.Printf("<- [%s] %s", contentType, filename)
		}
	})
	mux.HandleFunc("GET /dist/bundle.js", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/bundle.js"
		contentType := "text/javascript; charset=utf-8"

		// keep in memory
		if len(javascript) == 0 || !cache {
			file, _ := os.Open(filename)
			javascript, _ = io.ReadAll(file)
		}
		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(javascript)
		if loud {
			log.Printf("<- [%s] %s", contentType, filename)
		}
	})
	mux.HandleFunc("GET /favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		filename := "public/sportsball/favicon.ico"
		contentType := "image/x-icon"

		// keep in memory
		if len(favicon) == 0 || !cache {
			file, _ := os.Open(filename)
			favicon, _ = io.ReadAll(file)
		}
		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(favicon)
		if loud {
			log.Printf("<- [%s] %s", contentType, filename)
		}
	})

	// default
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			filename := "public/sportsball/index.html"
			contentType := "text/html; charset=utf-8"

			// keep in memory
			if len(index) == 0 || !cache {
				file, _ := os.Open(filename)
				index, _ = io.ReadAll(file)
			}
			w.Header().Add("Content-Type", contentType)
			_, _ = w.Write(index)
			if loud {
				log.Printf("<- [%s] %s", contentType, filename)
			}
		} else {
			if loud {
				log.Println("!! 404 - Not Found !!")
			}
			w.WriteHeader(http.StatusNotFound)
		}
	})
	return mux
}
