import { Card, CardBody, VStack } from "@chakra-ui/react";
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
      <Card.Header fontWeight={"bold"} marginRight={"auto"}>
        {trackName}
      </Card.Header>
      <CardBody>
        <VStack gap="3">
          <HTMLComponent htmlString={descriptionHTMLstring} />
          {episodeUrl !== undefined && <audio controls src={episodeUrl} />}
        </VStack>
      </CardBody>
    </Card.Root>
  );
};

export default EpisodeCard;
