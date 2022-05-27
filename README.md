# Reddit clone

A simple reddit clone using [next js](https://nextjs.org/), [next auth](https://next-auth.js.org/), [tailwindcss](https://tailwindcss.com/), [heroicons](https://heroicons.com/), [supabase](https://supabase.com/), [stepZen](https://stepzen.com/), [apollo client](https://www.apollographql.com/docs/react/). Based on this [tutorial](https://www.youtube.com/watch?v=O0AhmAVzOo4).


## Demo

<div align="center">
  <h1><a href="https://constantine.dev:8080/reddit"> DEMO </a></h1>
</div>

## Installation

Follow the steps from this [tutorial](https://www.youtube.com/watch?v=O0AhmAVzOo4).

```bash
yarn install

or

npm install
```

create a .env.local file with these two variables

```bash
NEXT_PUBLIC_REDDIT_CLIENT_ID=
NEXT_PUBLIC_REDDIT_CLIENT_SECRET=
NEXT_PUBLIC_STEP_ZEN_API_ENDPOINT=
NEXT_PUBLIC_STEP_ZEN_API_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

fill in the first two values by creating an app from your reddit account. Fill in the next two values from your step zen account and api configuration. Fill in the next two by choosing a strong NEXTAUTH_SECRET and for the NEXTAUTH_URL choose the url of your ui.

You need a config.yaml file inside stepzen/ path.

with the following

```bash
configurationset:
  - configuration:
      name: postgresql_config
      uri: postgresql://{databaseURl}/{databaseUrl}?user={username}&password={password}
```

## Development

```bash
yarn dev
```

on another terminal

```bash
stepzen start
```

## Run

```bash
yarn dev

or

npm dev
```
