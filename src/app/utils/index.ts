const transformData = (data: any, source: string) => {
  let result;
  switch (source) {
    case "nytimes": {
      result = data.response.docs.map((doc: any) => {
        return {
          urlToImage: doc.multimedia?.[0]?.url
            ? `http://www.nytimes.com/${doc.multimedia?.[0]?.url}`
            : null,
          title: doc.headline.main,
          description: doc.abstract,
          url: doc.web_url,
          publishedAt: doc.pub_date,
        };
      });
      break;
    }
    case "guardian": {
      result = data.response.results.map((doc: any) => {
        return {
          urlToImage: null, // no images from the guardian api
          title: doc.webTitle,
          description: null, // no description from the guardian api
          url: doc.webUrl,
          publishedAt: doc.webPublicationDate,
        };
      });
      break;
    }
    default:
      result = data.articles;
  }
  return result;
};

export { transformData };
