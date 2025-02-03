package whatever

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

func Routes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /dist/whatever.output.css", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/whatever.output.css"
		contentType := "text/css"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /dist/whatever.bundle.js", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/whatever.bundle.js"
		contentType := "text/javascript; charset=utf-8"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		filename := "whatever/public/favicon.ico"
		contentType := "image/x-icon"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /robots.txt", func(w http.ResponseWriter, r *http.Request) {
		filename := "whatever/public/robots.txt"
		contentType := "text/plain"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /public/images/{name}", func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")
		filename := fmt.Sprintf("whatever/public/images/%s", name)

		var contentType string
		if strings.HasSuffix(name, ".webp") {
			contentType = "image/webp"
		}

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})

	// default
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		filename := "whatever/public/index.html"
		contentType := "text/html; charset=utf-8"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	return mux
}
