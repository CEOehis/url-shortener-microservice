## Url Shortener Microservice

A url shortener microservice, built using NodeJS/Express

**User Story**: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

**User Story**: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

**User Story**: When I visit that shortened URL, it will redirect me to my original link.

The API endpoint for shortening a url is GET `[project_url]/api/shorten/{url}`.

The API endpoint for retrieving a shortened url is GET `[project_url]/{short_url}`

