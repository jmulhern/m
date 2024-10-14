package youtube

type Channel struct {
	ID      string `json:"id"`
	URL     string `json:"url"`
	Live    bool   `json:"live"`
	LiveURL string `json:"live_url"`
}

type API interface {
	GetYouTubeChannel(id string) (Channel, error)
}
