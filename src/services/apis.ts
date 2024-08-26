import { NEWS_VALUES } from "@/app/global";
import { newsApi, newYorkTimesApi, theGuardianApi } from "./constans";
const API_KEY_NY_TIMES = process.env.NEXT_PUBLIC_API_KEY_NY_TIMES
const API_KEY_THE_GUARDIAN = process.env.NEXT_PUBLIC_API_KEY_THE_GUARDIAN
const API_KEY_NEWS_API = process.env.NEXT_PUBLIC_API_KEY_NEWS_API

export const getNewsByQuery = async (query: string, source: string) => {
  let api;
    switch (source) {
      case NEWS_VALUES.NEW_YORK_TIMES:
        api = `${newYorkTimesApi}?q=${query}&api-key=${API_KEY_NY_TIMES}`;
        break;
      case NEWS_VALUES.THE_GUARDIAN: 
        api = `${theGuardianApi}q=${query}&api-key=${API_KEY_THE_GUARDIAN}`
        break
      default:
        // defaults to news api
        api = `${newsApi}/everything?q=${query}&apiKey=${API_KEY_NEWS_API}`;
    }

  try {
    const response = await fetch(api);
    const sarasa = await response.json();
    return sarasa;
  } catch (err) {
    console.error(err);
  }
};
