import { useQuery } from "@tanstack/react-query";
import { getPodcasts } from "../../services/podcasts/podcasts-services";
import { useState, useMemo } from "react";
import { getFilteredPodcasts } from "./query/filters";
import { Stack, Text, Input, Center, Flex } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Loading from "../../components/Loading";
import PodcastHomeCard from "../../components/cards/PodcastHomeCard";

export default function Home() {
  const { data, isLoading } = useQuery(["podcasts"], getPodcasts);
  const [query, setQuery] = useState("");
  const filteredPodcasts = useMemo(() => {
    if (data === undefined) {
      return [];
    }
    return getFilteredPodcasts(query, data);
  }, [data, query]);
  return (
    <Stack>
      {isLoading && <Loading text="Loading podcasts, please wait" />}
      {!isLoading && (
        <Flex
          marginLeft={"auto"}
          display={"flex"}
          alignItems={"center"}
          marginBottom={"3"}
        >
          <Text
            marginRight={"4"}
            fontSize={"lg"}
            bg={"#004f99"}
            color={"white"}
            borderRadius={10}
            padding={2}
          >
            {filteredPodcasts.length}
          </Text>

          <Input
            placeholder="Filter Podcasts..."
            size={"lg"}
            width={"md"}
            onChange={({ target: { value } }) => setQuery(value)}
          />
        </Flex>
      )}
      <Flex
        justify={"space-between"}
        wrap={"wrap"}
        rowGap={8}
        alignItems={"baseline"}
      >
        {filteredPodcasts.map((p) => (
          <Center key={p.id}>
            <ReactRouterLink to={"/podcast/" + p.id}>
              <PodcastHomeCard
                img={{
                  src: p.image.label,
                }}
                title={p.name.label}
                subtitle={"Author: " + p.artist.label}
                cardProps={{ width: "280px", bg: "#f2f2f2" }}
              />
            </ReactRouterLink>
          </Center>
        ))}
      </Flex>
    </Stack>
  );
}
