package whatever

type Riddle struct {
	ID              string   `yaml:"id" json:"id"`
	Question        string   `yaml:"question" json:"question"`
	PossibleAnswers []string `yaml:"possible-answers" json:"possible_answers"`
	Answer          string   `yaml:"answer" json:"answer"`
}

type Tier struct {
	Name  string   `yaml:"name" json:"name"`
	Cards []string `yaml:"cards" json:"cards"`
}
