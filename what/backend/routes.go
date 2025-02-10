package what

import (
	"encoding/json"
	"fmt"
	"github.com/anthropics/anthropic-sdk-go"
	"gopkg.in/yaml.v3"
	"io"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
)

func Routes() *http.ServeMux {
	ai := anthropic.NewClient()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /dist/what.output.css", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/what.output.css"
		contentType := "text/css"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /dist/what.bundle.js", func(w http.ResponseWriter, r *http.Request) {
		filename := "dist/what.bundle.js"
		contentType := "text/javascript; charset=utf-8"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		filename := "what/public/favicon.ico"
		contentType := "image/x-icon"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /robots.txt", func(w http.ResponseWriter, r *http.Request) {
		filename := "what/public/robots.txt"
		contentType := "text/plain"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})

	// api
	mux.HandleFunc("GET /api/assessments", func(w http.ResponseWriter, r *http.Request) {

		// convert to json
		raw, _ := json.Marshal([]map[string]any{
			{
				"id":   "aws-cloud-practitioner",
				"name": "AWS Cloud Practitioner",
			},
			{
				"id":   "random-trivia",
				"name": "Random Trivia",
			},
			{
				"id":   "blackjack",
				"name": "Blackjack Strategy",
			},
		})
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("GET /api/assessments/{name}", func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")

		// read from yaml
		filename := fmt.Sprintf("what/private/data/assessments/%s.yaml", name)
		file, err := os.Open(filename)
		if err != nil {
			log.Fatalln(err)
		}
		raw, err := io.ReadAll(file)
		if err != nil {
			log.Fatalln(err)
		}

		var assessment Assessment
		err = yaml.Unmarshal(raw, &assessment)
		if err != nil {
			log.Fatalln(err)
		}

		var questions []any
		for _, question := range assessment.Questions {
			var possibleAnswers []string
			if len(assessment.Possibilities) != 0 {
				possibleAnswers = assessment.Possibilities
			} else {
				possibleAnswers = append(question.Detractors, question.CorrectAnswers...)
				shufflePossibleAnswers(possibleAnswers)
			}

			questions = append(questions, map[string]any{
				"question":         question.PromptText,
				"possible_answers": possibleAnswers,
				"correct_answers":  question.CorrectAnswers,
			})
		}
		shuffleQuestions(questions)

		// convert to json
		raw, _ = json.Marshal(map[string]any{
			"name":      assessment.Name,
			"questions": questions[:assessment.Pick],
		})
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(raw)
	})
	mux.HandleFunc("POST /api/explain", func(w http.ResponseWriter, r *http.Request) {
		raw, _ := io.ReadAll(r.Body)

		var request ExplainRequest
		_ = json.Unmarshal(raw, &request)

		prompt := fmt.Sprintf(`
Given the question: %s

The correct answer is: %s

The person being asked the question answered incorrectly with: %s

Give an explanation of why their answer is wrong and how it relates to the correct answer. Keep the response to only two sentences at most.
`, request.Question, request.CorrectAnswers, request.ChosenAnswers)
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
		filename := "what/public/index.html"
		contentType := "text/html; charset=utf-8"

		file, _ := os.Open(filename)
		raw, _ := io.ReadAll(file)

		w.Header().Add("Content-Type", contentType)
		_, _ = w.Write(raw)
	})
	return mux
}

func shuffleQuestions(slice []any) {
	source := rand.NewSource(int64(time.Now().UTC().Add(-7 * time.Hour).YearDay()))
	r := rand.New(source) // Create a new random generator using the source

	for i := len(slice) - 1; i > 0; i-- {
		j := r.Intn(i + 1) // Use the new random generator
		slice[i], slice[j] = slice[j], slice[i]
	}
}

func shufflePossibleAnswers(slice []string) {
	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source) // Create a new random generator using the source

	for i := len(slice) - 1; i > 0; i-- {
		j := r.Intn(i + 1) // Use the local random generator
		slice[i], slice[j] = slice[j], slice[i]
	}
}
