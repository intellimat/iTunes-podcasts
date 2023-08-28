import {
  Card,
  CardProps,
  Center,
  Stack,
  StackDivider,
  Image,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { IPodcast } from "../../types";

interface Props {
  podcast: IPodcast;
  cardProps?: CardProps;
}

export default function PodcastDetailsCard({
  podcast: { artist, image, name, summary },
  cardProps,
}: Props) {
  return (
    <Card {...cardProps}>
      <Stack divider={<StackDivider />} spacing={"16px"}>
        <Box>
          <Center>
            {image !== null && (
              <Image
                maxWidth={200}
                src={image.label}
                alt={"Podcast " + name + "thumbnail"}
              />
            )}
          </Center>
        </Box>
        <Box>
          <Heading size={"xs"}> {name.label}</Heading>
          <Text pt={"2"} fontSize={"sm"}>
            by {artist.label}
          </Text>
        </Box>
        <Box>
          <Heading size={"xs"}>Description: </Heading>
          <Text pt={"2"} fontSize={"sm"} fontStyle={"italic"}>
            {" "}
            {summary.label}
          </Text>
        </Box>
      </Stack>
    </Card>
  );
}
