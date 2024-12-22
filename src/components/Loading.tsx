import { HStack, Spinner, Text } from "@chakra-ui/react";

interface Props {
  text?: string;
}

export default function Loading({ text }: Props) {
  return (
    <HStack>
      <Text fontSize={"md"} color={"#737373"}>
        {text || ""}
      </Text>{" "}
      <Spinner size={"sm"} color={"#737373"} />
    </HStack>
  );
}
