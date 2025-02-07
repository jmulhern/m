package whatever

import (
	"encoding/json"
	"fmt"
	"github.com/anthropics/anthropic-sdk-go"
	"gopkg.in/yaml.v3"
	"io"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"
)

func Routes() *http.ServeMux {
	ai := anthropic.NewClient()

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

	// api
	mux.HandleFunc("GET /api/riddles", func(w http.ResponseWriter, r *http.Request) {
		// read from yaml
		filename := "whatever/private/data/riddles.yaml"
		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		var riddles []Riddle
		_ = yaml.Unmarshal(raw, &riddles)

		// convert to json
		raw, _ = json.Marshal(riddles[0])
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /api/slay_the_spire/{name}", func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")

		// read from yaml
		filename := fmt.Sprintf("whatever/private/data/slay-the-spire/%s.yaml", name)
		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		var tiers []Tier
		_ = yaml.Unmarshal(raw, &tiers)

		// convert to json
		raw, _ = json.Marshal(tiers)
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(raw)
	})

	mux.HandleFunc("GET /api/questions/{name}", func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")

		// read from yaml
		filename := fmt.Sprintf("whatever/private/data/questions/%s.yaml", name)
		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		var assessments []Assessment
		_ = yaml.Unmarshal(raw, &assessments)

		var questions []any
		for _, assessment := range assessments {
			possibleAnswers := append(assessment.Detractors, assessment.CorrectAnswers...)
			shufflePossibleAnswers(possibleAnswers)
			questions = append(questions, map[string]any{
				"question":         assessment.Question,
				"possible_answers": possibleAnswers,
				"correct_answers":  assessment.CorrectAnswers,
			})
		}
		shuffleQuestions(questions)

		// convert to json
		raw, _ = json.Marshal(questions[:25])
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("POST /api/explain", func(w http.ResponseWriter, r *http.Request) {
		raw, _ := io.ReadAll(r.Body)

		var data map[string]any
		_ = json.Unmarshal(raw, &data)

		prompt := fmt.Sprintf(`
Given the question: %s

The correct answer is: %s

The person being asked the question answered incorrectly with: %s

Give an explanation of why their answer is wrong and how it relates to the correct answer. Keep the response to only two sentences at most.
`, data["question"], data["correct_answers"], data["incorrect_answers"])
		fmt.Println(prompt)
		message, _ := ai.Messages.New(r.Context(), anthropic.MessageNewParams{
			Model:     anthropic.F(anthropic.ModelClaude3_5SonnetLatest),
			MaxTokens: anthropic.F(int64(1024)),
			Messages: anthropic.F([]anthropic.MessageParam{
				anthropic.NewUserMessage(anthropic.NewTextBlock(prompt)),
			}),
		})

		raw, _ = json.Marshal(map[string]any{
			"explanation": message.Content[0].Text,
		})
		w.Header().Add("Content-Type", "application/json")
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

func shuffleQuestions(slice []any) {
	rand.Seed(int64(time.Now().Hour()))

	for i := len(slice) - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		slice[i], slice[j] = slice[j], slice[i]
	}
}
func shufflePossibleAnswers(slice []string) {
	rand.Seed(time.Now().Unix())

	for i := len(slice) - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		slice[i], slice[j] = slice[j], slice[i]
	}
}
