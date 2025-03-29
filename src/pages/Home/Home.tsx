import { useQuery } from "@tanstack/react-query";
import { getPodcasts } from "../../services/podcasts/podcasts-services";
import { useState, useMemo } from "react";
import { getFilteredPodcasts } from "./query/filters";
import { Text, Input, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import PodcastHomeCard from "../../components/cards/PodcastHomeCard";
import { LOADING_PODCASTS_MESSAGE } from "../../messages/loading";
import Loading from "../../components/Loading";
import { SegmentGroup } from "@chakra-ui/react";

const LIMITS = ["10", "25", "50"];
const DEFAULT_LIMIT = LIMITS[1];

export default function Home() {
  const [limit, setLimit] = useState<string>(DEFAULT_LIMIT);

  const { data, isLoading } = useQuery({
    queryKey: ["podcasts", limit],
    queryFn: () => getPodcasts(limit),
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
      {isLoading ? (
        <Loading text={LOADING_PODCASTS_MESSAGE} />
      ) : (
        <>
          <HStack justifyContent={"space-between"} width={"100%"} wrap={"wrap"}>
            <SegmentGroup.Root
              value={limit}
              onValueChange={(e) => setLimit(e.value)}
            >
              <SegmentGroup.Indicator />
              {LIMITS.map((limit) => (
                <SegmentGroup.Item value={limit} key={limit}>
                  <SegmentGroup.ItemText>{limit}</SegmentGroup.ItemText>
                  <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
              ))}
            </SegmentGroup.Root>
            <HStack>
              <Text
                fontSize={"lg"}
                bg={{ base: "bg.muted", _dark: "bg.muted" }}
                color={"InfoText"}
                borderRadius={4}
                padding={1.5}
              >
                {filteredPodcasts.length}
              </Text>

              <Input
                disabled={isLoading}
                placeholder="Filter Podcasts..."
                onChange={({ target: { value } }) => setQuery(value)}
              />
            </HStack>
          </HStack>

          <SimpleGrid columns={[1, 2, 3, 4]} gap="4" width={"100%"}>
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
