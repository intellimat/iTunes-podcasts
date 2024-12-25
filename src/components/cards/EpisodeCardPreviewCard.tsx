import {
  Badge,
  Box,
  Card,
  HStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getEpisodeRoutePath } from "../../routing/paths";

interface Props {
  title: string;
  description: string;
  date: string;
  time: string;
  imageUrl: string;
  podcastId: string;
  trackId: number;
}

const EpisodePreviewCard = ({
  podcastId,
  trackId,
  title,
  description,
  date,
  time,
}: //   imageUrl,
Props) => (
  <Card.Root flexDirection="row" width={"100%"}>
    {/* <Image
      objectFit="cover"
      maxW="200px"
      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
      alt="Caffe Latte"
    /> */}
    <Box>
      <Card.Body paddingBottom={3}>
        <Card.Title mb="2">{title}</Card.Title>
        <Card.Description lineClamp={2}>{description}</Card.Description>
      </Card.Body>
      <Card.Footer paddingBottom={3}>
        <HStack>
          <Badge>{date}</Badge>
          <Badge>{time}</Badge>
          <ChakraLink
            asChild
            marginLeft={"auto"}
            paddingX={2}
            paddingY={1}
            borderWidth={1}
            _hover={{
              textDecoration: "none",
              backgroundColor: "ButtonHighlight",
            }}
            borderBlockStyle={"thin"}
          >
            <ReactRouterLink to={getEpisodeRoutePath(podcastId, trackId)}>
              <Text>More</Text>
            </ReactRouterLink>
          </ChakraLink>
        </HStack>
      </Card.Footer>
    </Box>
  </Card.Root>
);

export default EpisodePreviewCard;
