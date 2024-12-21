import { Card, CardBody, VStack, Heading, Text } from "@chakra-ui/react";
import HTMLComponent from "../HTMLcomponent";

interface Props {
  trackName: string;
  descriptionHTMLstring: string;
  episodeUrl?: string;
}
const EpisodeCard = ({
  trackName,
  descriptionHTMLstring,
  episodeUrl,
}: Props) => {
  return (
    <Card.Root>
      <CardBody>
        <VStack mt="6" gap="3">
          <Heading size="md" marginRight={"auto"}>
            {trackName}
          </Heading>
          <Text maxWidth={750}>
            <HTMLComponent htmlString={descriptionHTMLstring} />
          </Text>
          {episodeUrl !== undefined && <audio controls src={episodeUrl} />}
        </VStack>
      </CardBody>
    </Card.Root>
  );
};

export default EpisodeCard;
