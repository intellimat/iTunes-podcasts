import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";

interface Props {
  img: {
    src: string;
    alt?: string;
  };
  title: string;
  subtitle: string;
}

export default function PodcastHomeCard({
  img: { src, alt },
  title,
  subtitle,
}: Props) {
  return (
    <Card.Root height={"320px"}>
      <CardBody>
        <Center>
          <Image src={src} alt={alt || "Alt not available"} />
        </Center>
        <Stack mt="6" gap={"3"}>
          <Heading lineClamp={1} size={"md"}>
            {title}
          </Heading>
          <Text lineClamp={2}>{subtitle}</Text>
        </Stack>
      </CardBody>
    </Card.Root>
  );
}
