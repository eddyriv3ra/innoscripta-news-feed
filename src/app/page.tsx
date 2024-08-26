"use client";
import Select from "./components/Select";
import styles from "./page.module.scss";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNewsByQuery } from "@/services/apis";
import { Box, Button, Text, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { transformData } from "./utils";
import { NEWS_VALUES, options } from "./global";
import Article from "./components/Article";
import { IArticle } from "./interfaces";

export default function Home() {
 
  const [source, setSource] = useState(NEWS_VALUES.NEW_YORK_TIMES);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery(query);
  };

  const { data, error, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["everything", searchQuery, source],
    queryFn: () => getNewsByQuery(searchQuery || "latest", source), // Default to 'latest' if no query
    select: (data: unknown) => transformData(data, source),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

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
        </div>
        <div className={styles.articlesContainer}>
          {data?.map((item: IArticle) => 
              <Article item={item} />
          )}
        </div>
      </div>
    </main>
  );
}
