package youtube

import (
	"fmt"
	"strings"

	"golang.org/x/net/html"
)

func (c Client) GetYouTubeChannel(id string) (Channel, error) {
	url := fmt.Sprintf("https://youtube.com/channel/%s", id)

	liveURL := fmt.Sprintf("%s/live", url)
	liveResponse, _ := c.getter.Get(liveURL)
	doc, _ := html.Parse(liveResponse.Body)

	linkResults, _ := Search(doc, "link", "")

	var live bool
	for _, result := range linkResults {
		var canonical bool
		for _, attr := range result.Attr {
			if attr.Key == "rel" && attr.Val == "canonical" {
				canonical = true
				break
			}
		}

		if canonical {
			for _, attr := range result.Attr {
				if attr.Key == "href" && strings.HasPrefix(attr.Val, "https://www.youtube.com/watch?v=") {
					live = true
					break
				}
			}
		}
	}

	return Channel{
		ID:      id,
		URL:     url,
		Live:    live,
		LiveURL: liveURL,
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
