import { useQuery } from "@tanstack/react-query";
import { getPodcasts } from "../../services/podcasts/podcasts-services";
import { useState, useMemo } from "react";
import { getFilteredPodcasts } from "./query/filters";
import { Text, Input, Center, Flex, HStack, VStack } from "@chakra-ui/react";
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
            marginBottom={4}
            marginLeft={[0, 0, "auto"]}
            width={[300, 300, 400]}
          >
            <Text
              marginRight={1}
              fontSize={"lg"}
              bg={"#004f99"}
              color={"white"}
              borderRadius={10}
              padding={1.5}
            >
              {filteredPodcasts.length}
            </Text>

            <Input
              placeholder="Filter Podcasts..."
              onChange={({ target: { value } }) => setQuery(value)}
            />
          </HStack>
          <Flex
            justifyContent={[
              "space-evenly",
              "space-evenly",
              "space-evenly",
              "space-between",
            ]}
            wrap={"wrap"}
            columnGap={8}
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
                    cardProps={{ width: 300, bg: "#f2f2f2" }}
                  />
                </ReactRouterLink>
              </Center>
            ))}
          </Flex>
        </>
      )}
    </VStack>
  );
}
