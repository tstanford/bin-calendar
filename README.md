# bin-calendar

> Fife Council Bin Calendar client and icalendar server.

## Summary

This project is to expose a bin collection calendar as a icalendar url which can be directly imported into the likes of google calendar using just a url.

The project consists of two parts.

## getBinDates.js

This is a nodejs script which connects to Fife Council and downloads a json calendar for a particular property using a uprn. The downloaded json is then converted into an icalendar format and saved to disk.

> The uprn must be retrieved using the chrome developer tools when using the real web site. The upid will be visible in the network tab. 

This script is best run on a weekly basis using cron so that the calendar updates every week with newly published collections.

## server.js

A very simple nodejs application which exposes the calendar via an http server. The http server should be accessibly from the internet. Using the URL along, the calendar can be added to google calendar.

## My deployment

I run my setup on a raspberry pi 4. I have getBinDates.js running at 5:15am every monday and the server is running on the same pi. I use ngrok to expose it to the internet rather than open up the firewall.





