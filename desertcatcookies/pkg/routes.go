package desertcatcookies

import (
	"io"
	"log"
	"net/http"
	"os"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

var index, javascript, favicon, logo []byte
var cache, loud bool
var sendGrid *sendgrid.Client
var from, to *mail.Email

func init() {
	cache = true
	loud = false

	sendGrid = sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	from = mail.NewEmail("Clarice", "clarice@em2928.desertcatcookies.com")
	to = mail.NewEmail("Stacy", "stacymulhern@gmail.com")
}

func Routes() *http.ServeMux {

	mux := http.NewServeMux()

	mux.HandleFunc("POST /estimates", HandleEstimates)

	mux.HandleFunc("GET /dist/desertcatcookies.bundle.js", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/desertcatcookies.bundle.js"
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
		filename := "desertcatcookies/public/favicon.ico"
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
	mux.HandleFunc("GET /public/logo.webp", func(w http.ResponseWriter, r *http.Request) {
		filename := "desertcatcookies/public/logo.webp"
		contentType := "image/webp"

		// keep in memory
		if len(logo) == 0 || !cache {
			file, _ := os.Open(filename)
			logo, _ = io.ReadAll(file)
		}
		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(logo)
		if loud {
			log.Printf("<- [%s] %s", contentType, filename)
		}
	})

	// default
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			filename := "desertcatcookies/public/index.html"
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
