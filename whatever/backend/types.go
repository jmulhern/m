package whatever

type Riddle struct {
	ID              string   `yaml:"id" json:"id"`
	Question        string   `yaml:"question" json:"question"`
	PossibleAnswers []string `yaml:"possible-answers" json:"possible_answers"`
	Answer          string   `yaml:"answer" json:"answer"`
}

type Assessment struct {
	Question       string   `yaml:"question" json:"question"`
	Detractors     []string `yaml:"detractors" json:"detractors"`
	CorrectAnswers []string `yaml:"correct-answers" json:"correct_answers"`
}

type Tier struct {
	Name  string   `yaml:"name" json:"name"`
	Items []string `yaml:"items" json:"items"`
}
