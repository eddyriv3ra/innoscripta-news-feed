"use client";
import Select from "./components/Select";
import styles from "./page.module.scss";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNewsByQuery } from "@/services/apis";
import { Box, Button, Spinner, Text, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { transformData } from "./utils";
import { NEWS_VALUES, options } from "./global";
import Article from "./components/Article";
import { IArticle } from "./interfaces";
import { format } from "date-fns";

export default function Home() {
  const [source, setSource] = useState(NEWS_VALUES.NEW_YORK_TIMES);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [filteredByDate, setFilteredByDate] = useState([]);

  const handleSearch = () => {
    setSearchQuery(query);
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["everything", searchQuery, source],
    queryFn: () => getNewsByQuery(searchQuery || "latest", source), // Default to 'latest' if no query
    select: (data: unknown) => transformData(data, source),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onFilterByDate = () => {
    const filteredData = data.filter(
      (d: IArticle) => format(d?.publishedAt, "yyyy-MM-dd") === date
    );
    setFilteredByDate(filteredData);
  };

  if (isLoading) {
  }

  const articles = date ? filteredByDate : data;

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.inputsContainer}>
          <Select
            options={options}
            label="News feed"
            setValue={setSource}
            value={source}
          />
          <Box maxWidth="200px">
            <TextField.Root
              placeholder="Search..."
              onChange={onChange}
              value={query}
              size="3"
            />
          </Box>
          <Button size="3" variant="solid" onClick={handleSearch}>
            <MagnifyingGlassIcon /> Search
          </Button>
          <Box maxWidth="200px">
            <TextField.Root
              placeholder="dd/mm/yy"
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDate(e.target.value)
              }
              value={date}
              size="3"
            />
          </Box>
          <Button
            size="3"
            variant="solid"
            onClick={onFilterByDate}
            disabled={!date}
          >
            Filter
          </Button>
        </div>
        <div className={styles.articlesContainer}>
          {isLoading || isError ? (
            <div className={styles.spinnerContainer}>
              <Spinner className={styles.spinner} />
            </div>
          ) : (
            articles?.map((item: IArticle) => (
              <Article key={`${item.publishedAt} ${item.title}`} item={item} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
