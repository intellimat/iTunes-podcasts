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
      <Stack separator={<StackSeparator />}>
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
        <Box paddingTop={4} paddingBottom={2} paddingX={4}>
          <Heading size={"md"}> {name.label}</Heading>
          <Text pt={"2"} fontSize={"sm"}>
            by {artist.label}
          </Text>
        </Box>
        <Box paddingX={4} paddingBottom={4} paddingTop={2}>
          <Heading size={"sm"}>Description: </Heading>
          <Text pt={"2"} fontSize={"sm"} wordWrap={"break-word"}>
            {summary.label}
          </Text>
        </Box>
      </Stack>
    </Card.Root>
  );
}
