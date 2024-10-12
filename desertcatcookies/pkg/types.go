package desertcatcookies

type Estimate struct {
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	Email          string `json:"email"`
	PhoneNumber    string `json:"phone_number"`
	CookieTheme    string `json:"cookie_theme"`
	CookieQuantity string `json:"cookie_quantity"`
	PickupDate     string `json:"pickup_date"`
	AnythingElse   string `json:"anything_else"`
}
