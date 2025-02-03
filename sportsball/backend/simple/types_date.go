package simple

import "time"

type Date struct {
	Year  int `json:"year"`
	Month int `json:"month"`
	Day   int `json:"day"`
}

func (d Date) Before(that Date) bool {
	return time.Date(d.Year, time.Month(d.Month), d.Day, 0, 0, 0, 0, time.UTC).Before(time.Date(that.Year, time.Month(that.Month), that.Day, 0, 0, 0, 0, time.UTC))
}

func (d Date) After(that Date) bool {
	return time.Date(d.Year, time.Month(d.Month), d.Day, 0, 0, 0, 0, time.UTC).After(time.Date(that.Year, time.Month(that.Month), that.Day, 0, 0, 0, 0, time.UTC))
}

func (d Date) Same(that Date) bool {
	return d.Year == that.Year && d.Month == that.Month && d.Day == that.Day
}

func (d Date) String() string {
	return time.Date(d.Year, time.Month(d.Month), d.Day, 0, 0, 0, 0, time.UTC).Format("Mon, Jan 2")
}
