import {
  Card,
  CardBody,
  VStack,
  Heading,
  Text,
  CardProps,
} from "@chakra-ui/react";
import HTMLComponent from "../HTMLcomponent";

interface Props {
  trackName: string;
  descriptionHTMLstring: string;
  episodeUrl?: string;
  cardProps?: CardProps;
}
const EpisodeCard = ({
  trackName,
  descriptionHTMLstring,
  episodeUrl,
  cardProps,
}: Props) => {
  return (
    <Card {...cardProps}>
      <CardBody>
        <VStack mt="6" spacing="3">
          <Heading size="md" marginRight={"auto"}>
            {trackName}
          </Heading>
          <Text maxWidth={750}>
            <HTMLComponent htmlString={descriptionHTMLstring} />
          </Text>
          {episodeUrl !== undefined && <audio controls src={episodeUrl} />}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default EpisodeCard;
