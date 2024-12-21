import { Outlet } from "react-router-dom";
import { Stack, Link as ChakraLink, Heading, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <Stack margin={4} padding={4}>
      <Heading size={"lg"}>
        <ChakraLink asChild>
          <ReactRouterLink to={"/"}>
            <Text>iTunes Podcasts</Text>
          </ReactRouterLink>
        </ChakraLink>
      </Heading>
      <Outlet />
    </Stack>
  );
}
