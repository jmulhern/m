package main

import (
	"log"

	"github.com/jmulhern/m/pkg/server"
)

func main() {
	log.Print("hello")
	server.Start(3000)
}
