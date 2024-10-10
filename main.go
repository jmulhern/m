package main

import (
	"log"
	"net/http"
)

func main() {
	log.Print("hello")
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"hello":true}`))
	})
	log.Print("listening on :3000")
	_ = http.ListenAndServe(":3000", mux)
}
