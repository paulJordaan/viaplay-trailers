# Viaplay Movie Trailer API

This project was scafolded using [express-api-starter](https://github.com/w3cj/express-api-starter).

The goal of the project is to provide an API that allows the user to retrieve the Youtube Trailer for any of the movies available on Viaplay's content API.

## Usage

The api get served on http://localhost:5000/api by default.

The trailer endpoint needs to be called with the Viaplay Movie Resource Link passed as an query parameter. See the below example as reference:

```
http://localhost:5000/api/trailers/?link=https://content.viaplay.se/pc-se/film/for-your-eyes-only-1981
```

Which will respond with the following object:

```
{

"link": "https://www.youtube.com/watch?v=9Ykn9zPnQME"

}
```

## Setup

```

npm install

```

## Lint

```

npm run lint

```

## Test

```

npm run test

```

## Development

```

npm run dev

```
