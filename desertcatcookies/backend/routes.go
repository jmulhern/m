package desertcatcookies

import (
	"io"
	"net/http"
	"os"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

var sendGrid *sendgrid.Client
var from, to *mail.Email

func init() {
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

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		filename := "desertcatcookies/public/favicon.ico"
		contentType := "image/x-icon"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /robots.txt", func(w http.ResponseWriter, r *http.Request) {
		filename := "desertcatcookies/public/robots.txt"
		contentType := "text/plain"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})

	mux.HandleFunc("GET /public/logo.webp", func(w http.ResponseWriter, r *http.Request) {
		filename := "desertcatcookies/public/logo.webp"
		contentType := "image/webp"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})

	// default
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			filename := "desertcatcookies/public/index.html"
			contentType := "text/html; charset=utf-8"

			file, _ := os.Open(filename)
			raw, _ := io.ReadAll(file)

			w.Header().Add("Content-Type", contentType)
			_, _ = w.Write(raw)
		} else {
			w.WriteHeader(http.StatusNotFound)
		}
	})
	return mux
}
