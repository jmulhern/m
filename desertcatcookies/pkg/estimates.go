package desertcatcookies

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

func HandleEstimates(w http.ResponseWriter, r *http.Request) {
	raw, _ := io.ReadAll(r.Body)
	var estimate Estimate
	_ = json.Unmarshal(raw, &estimate)

	log.Println(string(raw))

	var sb strings.Builder
	sb.WriteString("First Text: " + estimate.FirstName + "\n")
	sb.WriteString("Last Text: " + estimate.LastName + "\n")
	sb.WriteString("Email: " + estimate.Email + "\n")
	sb.WriteString("Phone Number: " + estimate.PhoneNumber + "\n")
	sb.WriteString("Cookie Theme: " + estimate.CookieTheme + "\n")
	sb.WriteString("Cookie Quantity: " + estimate.CookieQuantity + "\n")
	sb.WriteString("Pickup Date: " + estimate.PickupDate + "\n")
	sb.WriteString("Anything Else: " + estimate.AnythingElse + "\n")
	message := mail.NewSingleEmail(from, "Estimate Request", to, sb.String(), "")
	_, err := sendGrid.Send(message)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("email sent")
	}
}
