package what

type Assessment struct {
	Name      string     `yaml:"name" json:"name"`
	Questions []Question `yaml:"questions" json:"questions"`
}
type Question struct {
	Question       string   `yaml:"question" json:"question"`
	Detractors     []string `yaml:"detractors" json:"detractors"`
	CorrectAnswers []string `yaml:"correct-answers" json:"correct_answers"`
}

type ExplainRequest struct {
	Question       string   `json:"question"`
	CorrectAnswers []string `json:"correct_answers"`
	ChosenAnswers  []string `json:"chosen_answers"`
}
