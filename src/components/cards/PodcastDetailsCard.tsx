import {
  Card,
  Center,
  Stack,
  StackSeparator,
  Image,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { IPodcast } from "../../types";

interface Props {
  podcast: IPodcast;
}

export default function PodcastDetailsCard({
  podcast: { artist, image, name, summary },
}: Props) {
  return (
    <Card.Root>
      <Stack separator={<StackSeparator />} maxWidth={400}>
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
            {summary.label}
          </Text>
        </Box>
      </Stack>
    </Card.Root>
  );
}
