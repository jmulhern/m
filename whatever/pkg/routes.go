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
	mux.HandleFunc("GET /dist/whatever.output.css", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/whatever.output.css"
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
	mux.HandleFunc("GET /dist/whatever.bundle.js", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/whatever.bundle.js"
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
		filename := "whatever/public/favicon.ico"
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
		filename := "whatever/public/index.html"
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
	})
	return mux
}
