import { IParsedEpisode } from "../types";
import {
  Heading,
  VStack,
  Table,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getEpisodeRoutePath } from "../routing/paths";

interface Props {
  podcastId: string;
  episodes: IParsedEpisode[];
}

export default function EpisodesTable({ podcastId, episodes }: Props) {
  return (
    <VStack>
      <Heading fontSize={"xl"}>Episodes</Heading>
      <Table.Root size={"sm"} width={[200, 200, 200, 500, 600]}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textTransform={"capitalize"}>
              <Text>Title</Text>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textTransform={"capitalize"}
              textAlign={"center"}
            >
              <Text>Date</Text>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textTransform={"capitalize"}
              textAlign={"center"}
            >
              <Text>Duration</Text>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {episodes.map((e) => (
            <Table.Row key={e.trackId}>
              <Table.Cell>
                <ChakraLink asChild>
                  <ReactRouterLink
                    to={getEpisodeRoutePath(podcastId, e.trackId)}
                  >
                    <Text maxWidth={"2xl"} whiteSpace={"initial"}>
                      {e.trackName}
                    </Text>
                  </ReactRouterLink>
                </ChakraLink>
              </Table.Cell>
              <Table.Cell>
                <Text textAlign={"center"}>{e.parsedReleasedDate}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text textAlign={"center"}>{e.parsedDuration}</Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </VStack>
  );
}
