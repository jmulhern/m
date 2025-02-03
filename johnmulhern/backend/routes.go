package johnmulhern

import (
	"encoding/json"
	"fmt"
	"gopkg.in/yaml.v3"
	"io"
	"net/http"
	"os"
	"strings"
)

func Routes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /dist/johnmulhern.output.css", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/johnmulhern.output.css"
		contentType := "text/css"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /dist/johnmulhern.bundle.js", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/johnmulhern.bundle.js"
		contentType := "text/javascript; charset=utf-8"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		filename := "johnmulhern/public/favicon.ico"
		contentType := "image/x-icon"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /robots.txt", func(w http.ResponseWriter, r *http.Request) {
		filename := "johnmulhern/public/robots.txt"
		contentType := "text/plain"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /public/images/{name}", func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")
		filename := fmt.Sprintf("johnmulhern/public/images/%s", name)

		var contentType string
		if strings.HasSuffix(name, ".webp") {
			contentType = "image/webp"
		}

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})

	// api
	mux.HandleFunc("GET /api/pets", func(w http.ResponseWriter, r *http.Request) {
		// read from yaml
		filename := "johnmulhern/private/data/pets.yaml"
		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		var animals []Animal
		_ = yaml.Unmarshal(raw, &animals)

		// convert to json
		raw, _ = json.Marshal(animals)
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(raw)

	})
	mux.HandleFunc("GET /api/fosters", func(w http.ResponseWriter, r *http.Request) {
		// read from yaml
		filename := "johnmulhern/private/data/fosters.yaml"
		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		var animals []Animal
		_ = yaml.Unmarshal(raw, &animals)

		// convert to json
		raw, _ = json.Marshal(animals)
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(raw)

	})

	// default
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		filename := "johnmulhern/public/index.html"
		contentType := "text/html; charset=utf-8"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	return mux
}
