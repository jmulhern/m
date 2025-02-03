package johnmulhern

import (
	"encoding/json"
	"fmt"
	"gopkg.in/yaml.v3"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
)

var index, stylesheets, javascript, favicon []byte
var cache, loud bool

func init() {
	cache = false
	loud = false
}

func Routes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /dist/johnmulhern.output.css", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/johnmulhern.output.css"
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
	mux.HandleFunc("GET /dist/johnmulhern.bundle.js", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/johnmulhern.bundle.js"
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
		filename := "johnmulhern/public/favicon.ico"
		contentType := "image/x-icon"

		// keep in memory
		if len(favicon) == 0 || !cache {
			file, _ := os.Open(filename)
			favicon, _ = io.ReadAll(file)
		}
		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(favicon)
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
		var fosterAnimals []Animal
		_ = yaml.Unmarshal(raw, &fosterAnimals)

		// convert to json
		raw, _ = json.Marshal(fosterAnimals)
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(raw)

	})
	mux.HandleFunc("GET /api/foster_animals", func(w http.ResponseWriter, r *http.Request) {
		// read from yaml
		filename := "johnmulhern/private/data/fosters.yaml"
		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)
		var fosterAnimals []Animal
		_ = yaml.Unmarshal(raw, &fosterAnimals)

		// convert to json
		raw, _ = json.Marshal(fosterAnimals)
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(raw)

	})

	// default
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		filename := "johnmulhern/public/index.html"
		contentType := "text/html; charset=utf-8"

		// keep in memory
		if len(index) == 0 || !cache {
			file, _ := os.Open(filename)
			index, _ = io.ReadAll(file)
		}
		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(index)
	})
	return mux
}
