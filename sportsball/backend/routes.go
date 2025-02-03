package sportsball

import (
	"io"
	"net/http"
	"os"
)

func Routes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /-/scoreboard/{tricode}", HandleScoreboard)
	mux.HandleFunc("GET /-/schedule/{tricode}", HandleSchedule)

	mux.HandleFunc("GET /dist/sportsball.output.css", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/sportsball.output.css"
		contentType := "text/css"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /dist/sportsball.bundle.js", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/sportsball.bundle.js"
		contentType := "text/javascript; charset=utf-8"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		filename := "sportsball/public/favicon.ico"
		contentType := "image/x-icon"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /robots.txt", func(w http.ResponseWriter, r *http.Request) {
		filename := "sportsball/public/robots.txt"
		contentType := "text/plain"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})

	// default
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		filename := "sportsball/public/index.html"
		contentType := "text/html; charset=utf-8"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	return mux
}
