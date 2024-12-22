import { useQuery } from "@tanstack/react-query";
import { getPodcasts } from "../../services/podcasts/podcasts-services";
import { useState, useMemo } from "react";
import { getFilteredPodcasts } from "./query/filters";
import { Text, Input, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Loading from "../../components/Loading";
import PodcastHomeCard from "../../components/cards/PodcastHomeCard";
import { LOADING_PODCASTS_MESSAGE } from "../../messages/loading";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["podcasts"],
    queryFn: getPodcasts,
  });

  const [query, setQuery] = useState("");
  const filteredPodcasts = useMemo(() => {
    if (data === undefined) {
      return [];
    }
    return getFilteredPodcasts(query, data);
  }, [data, query]);
  return (
    <VStack>
      {isLoading && <Loading text={LOADING_PODCASTS_MESSAGE} />}
      {!isLoading && (
        <>
          <HStack
            width={["100%", "60%", "35%", "25%"]}
            marginTop={1}
            marginBottom={2}
            marginLeft={["unset", "unset", "auto"]}
            marginRight={["auto", "auto", "unset"]}
          >
            <Text
              fontSize={"lg"}
              bg={"#004f99"}
              color={"white"}
              borderRadius={4}
              padding={1.5}
            >
              {filteredPodcasts.length}
            </Text>

            <Input
              placeholder="Filter Podcasts..."
              onChange={({ target: { value } }) => setQuery(value)}
            />
          </HStack>
          <SimpleGrid columns={[1, 2, 3, 4]} gap="4">
            {filteredPodcasts.map((p) => (
              <ReactRouterLink key={p.id} to={"/podcast/" + p.id}>
                <PodcastHomeCard
                  img={{
                    src: p.image.label,
                  }}
                  title={p.name.label}
                  subtitle={"Author: " + p.artist.label}
                />
              </ReactRouterLink>
            ))}
          </SimpleGrid>
        </>
      )}
    </VStack>
  );
}
