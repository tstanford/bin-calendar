# bin-calendar

This project is to expose a bin collection calendar as a icalendar url which can be directly imported into the likes of google calendar using just a url.

The project consists of two parts.

## getCalender.js

This is a nodejs script which connects to Fife Council and downloads a json calendar for a particulr property using a upid. The downloaded json is then converted into an icalendar format and saved to disk.

> The upid must be retrieved using the chrome developer tools when using the real web site. The upid will be visible in the network tab. 

This script is best run on a weekly basis so that the calendar updates every week with newly published collections.

## server.js

A very simple nodejs application which exposes the calendar via an http server. The http server should be accessibly from the internet. Using the URL along, the calendar can be added to google calendar.

