import {
  Badge,
  Box,
  Card,
  HStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  date: string;
  time: string;
  imageUrl: string;
  podcastId: string;
  trackId: number;
  linkTo: { pathname: string; search: string };
}

const EpisodePreviewCard = ({
  title,
  description,
  date,
  time,
  linkTo,
}: Props) => (
  <Card.Root flexDirection="row" width={"100%"}>
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
            <ReactRouterLink to={linkTo}>
              <Text>More</Text>
            </ReactRouterLink>
          </ChakraLink>
        </HStack>
      </Card.Footer>
    </Box>
  </Card.Root>
);

export default EpisodePreviewCard;
