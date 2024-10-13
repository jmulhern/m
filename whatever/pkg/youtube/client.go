package youtube

import "net/http"

type Getter interface {
	Get(url string) (resp *http.Response, err error)
}

type Client struct {
	getter Getter
}

func New() API {
	return Client{
		getter: &http.Client{},
	}
}
