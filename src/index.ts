import { Hono } from "hono";
import type { ClashRoyalePlayer, CRStatsResponse } from "./types";
import { transformPlayerData } from "./utils";
import fallbackData from "./fallback-data.json";

type Bindings = {
  CLASH_ROYALE_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Hardcoded player tag
const PLAYER_TAG = "#2YV8VR0LR";
const ENCODED_PLAYER_TAG = "%232YV8VR0LR";

app.get("/", (c) => {
  return c.text("CR Stats API - Use /cr-stats endpoint");
});

app.get("/cr-stats", async (c) => {
  try {
    // Get API key from environment
    const apiKey = c.env.CLASH_ROYALE_API_KEY;

    if (!apiKey) {
      console.log("No API key found, using fallback data");
      const fallbackPlayerData = fallbackData as ClashRoyalePlayer;
      const response = transformPlayerData(fallbackPlayerData, true);
      return c.json(response);
    }

    // Fetch from Clash Royale API
    const apiUrl = `https://api.clashroyale.com/v1/players/${ENCODED_PLAYER_TAG}`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(
        `API request failed with status ${response.status}, using fallback data`
      );
      const fallbackPlayerData = fallbackData as ClashRoyalePlayer;
      const fallbackResponse = transformPlayerData(fallbackPlayerData, true);
      return c.json(fallbackResponse);
    }

    const playerData = (await response.json()) as ClashRoyalePlayer;
    const transformedData = transformPlayerData(playerData);

    return c.json(transformedData);
  } catch (error) {
    console.error("Error fetching player data:", error);

    // Use fallback data on any error
    const fallbackPlayerData = fallbackData as ClashRoyalePlayer;
    const fallbackResponse = transformPlayerData(fallbackPlayerData, true);
    return c.json(fallbackResponse);
  }
});

export default app;
