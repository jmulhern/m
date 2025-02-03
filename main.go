package main

import (
	"github.com/jmulhern/m/backend"
	"log"
)

func main() {
	log.Print("hello")
	backend.Start(3000)
}
