package psnprofiles

import (
	"fmt"
	"strings"

	"golang.org/x/net/html"
)

func (c Client) GetPSNProfile(psn string) (PSNProfile, error) {
	profileURL := fmt.Sprintf("https://psnprofiles.com/%s", psn)
	profileResponse, _ := c.getter.Get(profileURL)

	doc, _ := html.Parse(profileResponse.Body)

	statResults, _ := Search(doc, "span", "stat")
	var gamesPlayed, gamesCompleted, trophiesPerDay string
	for _, result := range statResults {
		if grow, err := Search(result, "span", "grow"); err == nil {
			if grow[0].FirstChild != nil && grow[0].LastChild != nil && grow[0].LastChild.FirstChild != nil {
				switch grow[0].LastChild.FirstChild.Data {
				case "Games Played":
					gamesPlayed = grow[0].FirstChild.Data
				case "Completed Games":
					gamesCompleted = grow[0].FirstChild.Data
				case "Trophies Per Day":
					trophiesPerDay = grow[0].FirstChild.Data
				}
			}
		}
	}

	var platinumTropies string
	platinumResults, _ := Search(doc, "li", "platinum")
	for _, result := range platinumResults {
		data := strings.TrimSpace(result.LastChild.Data)
		if data != "" {
			platinumTropies = data
			break
		}
	}
	var goldTropies string
	goldResults, _ := Search(doc, "li", "gold")
	for _, result := range goldResults {
		data := strings.TrimSpace(result.LastChild.Data)
		if data != "" {
			goldTropies = data
			break
		}
	}
	var silverTropies string
	silverResults, _ := Search(doc, "li", "silver")
	for _, result := range silverResults {
		data := strings.TrimSpace(result.LastChild.Data)
		if data != "" {
			silverTropies = data
			break
		}
	}
	var bronzeTropies string
	bronzeResults, _ := Search(doc, "li", "bronze")
	for _, result := range bronzeResults {
		data := strings.TrimSpace(result.LastChild.Data)
		if data != "" {
			bronzeTropies = data
			break
		}
	}

	return PSNProfile{
		PSN:              psn,
		GamesPlayed:      gamesPlayed,
		GamesCompleted:   gamesCompleted,
		TrophiesPerDay:   trophiesPerDay,
		TrophiesPlatinum: platinumTropies,
		TrophiesGold:     goldTropies,
		TrophiesSilver:   silverTropies,
		TrophiesBronze:   bronzeTropies,
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
