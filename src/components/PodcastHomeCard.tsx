import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Image,
  Center,
  CardProps,
} from "@chakra-ui/react";
interface Props {
  img: {
    src: string;
    alt?: string;
  };
  title: string;
  subtitle: string;
  cardProps?: CardProps;
}
export default function PodcastHomeCard({
  cardProps,
  img: { src, alt },
  title,
  subtitle,
}: Props) {
  return (
    <Card {...cardProps}>
      <CardBody>
        <Center>
          <Image src={src} alt={alt || "Alt not available"} />
        </Center>
        <Stack mt="6" spacing={"3"}>
          <Heading size={"md"}>{title}</Heading>
          <Text>{subtitle}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
