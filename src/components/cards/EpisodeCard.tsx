import { Card, CardBody, VStack, Heading, Text } from "@chakra-ui/react";
import HTMLComponent from "../HTMLcomponent";

interface Props {
  trackName: string;
  descriptionHTMLstring: string;
  episodeUrl?: string;
  styleProps?: any;
}
const EpisodeCard = ({
  trackName,
  descriptionHTMLstring,
  episodeUrl,
  styleProps,
}: Props) => {
  return (
    <Card.Root style={styleProps}>
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
