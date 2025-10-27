# CR Stats API

A Cloudflare Workers API that fetches Clash Royale player statistics for a hardcoded player tag (`#2YV8VR0LR`) and returns filtered data in a custom JSON format.

## Features

- **Hardcoded Player**: Only fetches data for player tag `#2YV8VR0LR`
- **Fallback Data**: Uses local JSON data when API fails or API key is missing
- **Filtered Response**: Returns top 3 badges (by level) and top 3 achievements (by value)
- **Error Handling**: Graceful fallback to local data on any errors

## API Endpoint

```
GET /cr-stats
```

## Response Format

```json
{
  "tag": "#2YV8VR0LR",
  "name": "samdude",
  "clan": {
    "tag": "#2CPVQ0GP",
    "name": "Fighters",
    "badgeId": 16000024
  },
  "expLevel": 45,
  "topBadges": [
    // Top 3 badges sorted by level (descending)
  ],
  "trophies": 9767,
  "bestTrophies": 9891,
  "battleCount": 4377,
  "wins": 2282,
  "losses": 2095,
  "threeCrownWins": 988,
  "arena": {
    "id": 54000031,
    "name": "Legendary Arena"
  },
  "achievements": [
    // Top 3 achievements sorted by value (descending)
  ],
  "currentFavouriteCard": {
    "name": "Mega Knight",
    "id": 26000055,
    "maxLevel": 6,
    "maxEvolutionLevel": 1,
    "elixirCost": 7,
    "iconUrls": {
      "medium": "https://api-assets.clashroyale.com/cards/300/O2NycChSNhn_UK9nqBXUhhC_lILkiANzPuJjtjoz0CE.png",
      "evolutionMedium": "https://api-assets.clashroyale.com/cardevolutions/300/O2NycChSNhn_UK9nqBXUhhC_lILkiANzPuJjtjoz0CE.png"
    },
    "rarity": "legendary"
  }
}
```

## Setup & Deployment

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and add your Clash Royale API key:
```
CLASH_ROYALE_API_KEY=your_actual_api_key_here
```

### 3. Set Up Cloudflare API Token

1. Go to [Cloudflare API Tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)
2. Create a token with "Edit Cloudflare Workers" permissions
3. Set the token as an environment variable:

```bash
export CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
```

### 4. Deploy to Cloudflare Workers

```bash
# Set the Clash Royale API key as a secret
npx wrangler secret put CLASH_ROYALE_API_KEY

# Deploy the worker
npx wrangler deploy --minify
```

### 5. Test Locally

```bash
pnpm dev
```

Then visit `http://localhost:8787/cr-stats` to test the endpoint.

## Development

The API uses:
- **Hono** - Web framework for Cloudflare Workers
- **TypeScript** - Type safety
- **Wrangler** - Cloudflare Workers CLI

### Project Structure

```
src/
├── index.ts          # Main API routes
├── types.ts          # TypeScript interfaces
├── utils.ts          # Helper functions for data processing
└── fallback-data.json # Local fallback data
```

## API Key

The Clash Royale API key is stored as a Cloudflare Workers secret, not in the code. If no API key is provided or the API request fails, the service will automatically fall back to the local JSON data.

## Error Handling

The API includes comprehensive error handling:
- Missing API key → Uses fallback data
- API request failure → Uses fallback data  
- Network errors → Uses fallback data
- Invalid responses → Uses fallback data

This ensures the API is always responsive and returns data even when the Clash Royale API is unavailable.