package youtube

import (
	"fmt"
	"io"
	"strings"

	"golang.org/x/net/html"
)

func (c Client) GetYouTubeChannel(id string) (Channel, error) {
	url := fmt.Sprintf("https://youtube.com/channel/%s", id)

	liveURL := fmt.Sprintf("%s/live", url)
	liveResponse, _ := c.getter.Get(liveURL)
	liveResponseRaw, _ := io.ReadAll(liveResponse.Body)

	live := strings.Contains(string(liveResponseRaw),
		`<link rel="canonical" href="https://www.youtube.com/watch?v=`)

	return Channel{
		ID:   id,
		URL:  url,
		Live: live,
	}, nil
}

func Search(doc *html.Node, kind, class string) ([]*html.Node, error) {
	var out []*html.Node
	var crawler func(*html.Node)
	crawler = func(node *html.Node) {
		if node.Type == html.ElementNode && node.Data == kind {
			if class != "" {
				for _, attr := range node.Attr {
					if attr.Key == "class" {
						for _, part := range strings.Split(attr.Val, " ") {
							if part == class {
								out = append(out, node)
							}
						}
					}
				}
			} else {
				out = append(out, node)
			}
		}
		for child := node.FirstChild; child != nil; child = child.NextSibling {
			crawler(child)
		}
	}
	crawler(doc)
	if len(out) > 0 {
		return out, nil
	}
	return nil, fmt.Errorf("not found - kind=%s class=%s", kind, class)
}
