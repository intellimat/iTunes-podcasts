import { useState, useEffect } from "react";
import { Text, Input, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { Link as ReactRouterLink, useSearchParams } from "react-router-dom";
import PodcastHomeCard from "../../components/cards/PodcastHomeCard";
import { LOADING_PODCASTS_MESSAGE } from "../../messages/loading";
import Loading from "../../components/Loading";
import { SegmentGroup } from "@chakra-ui/react";
import { DEFAULT_PODCASTS_LIMIT, PODCASTS_LIMITS } from "../../constants";
import usePodcasts from "../../hooks/usePodcasts";

export default function Home() {
  const [podcastsLimit, setPodcastsLimit] = useState<string>(
    DEFAULT_PODCASTS_LIMIT
  );
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = usePodcasts(podcastsLimit, query);

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("podcastsLimit", podcastsLimit);
      return newParams;
    });
  }, [podcastsLimit, searchParams, setSearchParams]);

  return (
    <VStack>
      {isLoading ? (
        <Loading text={LOADING_PODCASTS_MESSAGE} />
      ) : (
        <>
          <HStack justifyContent={"space-between"} width={"100%"} wrap={"wrap"}>
            <SegmentGroup.Root
              value={podcastsLimit}
              onValueChange={(e) => setPodcastsLimit(e.value)}
            >
              <SegmentGroup.Indicator />
              {PODCASTS_LIMITS.map((limit) => (
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
                {data.length}
              </Text>

              <Input
                disabled={isLoading}
                placeholder="Filter Podcasts..."
                onChange={({ target: { value } }) => setQuery(value)}
              />
            </HStack>
          </HStack>

          <SimpleGrid columns={[1, 2, 3, 4]} gap="4" width={"100%"}>
            {data?.map((p) => (
              <ReactRouterLink
                key={p.id}
                to={{
                  pathname: "/podcast/" + p.id,
                  search: searchParams.toString(),
                }}
              >
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
