# bin-calendar

> Fife Council Bin Calendar client and icalendar server.

## Summary

The purpose of this project is to expose a bin collection calendar in the icalendar format via a url. This calendar can be directly imported into google calendar and other calendar software using just the url.

## Why

The bin calendar in Fife does not have a download option for importing into google calendar. The dates available are only 8 weeks into the future so even if there was an option to download. It would be out of date in 8 weeks time.

The lack of this feature has inspired me to create my own solution and expose the endpoint to the public internet.

## How to install

The project is designed to be run in a docker container. I do my build using Jenkins and deploy to my own self hosted kubernetes cluster. I expose the service to the internet and point a domain name DNS record to the public IP address.

I do have a ready built docker image that can be used

Run the following: 

```
docker run --restart always -p 8080:8080 -d tjstanford/bin-calendar:1.1.46
```

You will now need to open your firewall to point to the endpoint

You can import the calendar into google calendar using the following url e.g. `http://[your public ip]:8080/uprn/[uprn of your fife property]`

To lookup your uprn, you can use the following service: 
- https://www.findmyaddress.co.uk/search
