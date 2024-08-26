import { NEWS_VALUES } from "@/app/global";
import { newsApi, newYorkTimesApi, theGuardianApi } from "./constans";


export const getNewsByQuery = async (query: string, source: string) => {
  let api;
    switch (source) {
      case NEWS_VALUES.NEW_YORK_TIMES:
        api = `${newYorkTimesApi}?q=${query}&api-key=xFfwghGXi55ug3tUADaZnqsGICZLPgPE`;
        break;
      case NEWS_VALUES.THE_GUARDIAN: 
        api = `${theGuardianApi}q=${query}&api-key=23114ab5-d99b-4cb4-9433-88f241d2f3e7`
        break
      default:
        // defaults to news api
        api = `${newsApi}/everything?q=${query}&apiKey=74dbbc29322d422a9f084de0e2720076`;
    }

  try {
    const response = await fetch(api);
    const sarasa = await response.json();
    return sarasa;
  } catch (err) {
    console.error(err);
  }
};
