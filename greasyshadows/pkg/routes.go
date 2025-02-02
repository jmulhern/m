package pkg

import (
	"io"
	"log"
	"net/http"
	"os"
)

var index, stylesheets, javascript, favicon []byte
var cache, loud bool

func init() {
	cache = false
	loud = false
}

func Routes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /dist/greasyshadows.output.css", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/greasyshadows.output.css"
		contentType := "text/css"

		// keep in memory
		file, _ := os.Open(filename)
		stylesheets, _ = io.ReadAll(file)
		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(stylesheets)
		if loud {
			log.Printf("<- [%s] %s", contentType, filename)
		}
	})
	mux.HandleFunc("GET /dist/greasyshadows.bundle.js", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/greasyshadows.bundle.js"
		contentType := "text/javascript; charset=utf-8"

		file, _ := os.Open(filename)
		javascript, _ = io.ReadAll(file)
		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(javascript)
		if loud {
			log.Printf("<- [%s] %s", contentType, filename)
		}
	})
	mux.HandleFunc("GET /favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		filename := "greasyshadows/public/favicon.ico"
		contentType := "image/x-icon"

		// keep in memory
		file, _ := os.Open(filename)
		favicon, _ = io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(favicon)
	})

	// default
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		filename := "greasyshadows/public/index.html"
		contentType := "text/html; charset=utf-8"

		// keep in memory
		file, _ := os.Open(filename)
		index, _ = io.ReadAll(file)
		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(index)
	})
	return mux
}
