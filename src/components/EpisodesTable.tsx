import { IParsedEpisode } from "../types";
import {
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
      <TableContainer>
        <Table
          size={"sm"}
          variant={"unstyled"}
          width={[200, 200, 200, 500, 600]}
        >
          <Thead>
            <Tr>
              <Th textTransform={"capitalize"}>
                <Text>Title</Text>
              </Th>
              <Th textTransform={"capitalize"} textAlign={"center"}>
                <Text>Date</Text>
              </Th>
              <Th textTransform={"capitalize"} textAlign={"center"}>
                <Text>Duration</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {episodes.map((e) => (
              <Tr key={e.trackId}>
                <Td>
                  <ChakraLink
                    as={ReactRouterLink}
                    to={getEpisodeRoutePath(podcastId, e.trackId)}
                  >
                    <Text maxWidth={"2xl"} whiteSpace={"initial"}>
                      {e.trackName}
                    </Text>
                  </ChakraLink>
                </Td>
                <Td>
                  <Text textAlign={"center"}>{e.parsedReleasedDate}</Text>
                </Td>
                <Td>
                  <Text textAlign={"center"}>{e.parsedDuration}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
