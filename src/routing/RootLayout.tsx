import { Outlet } from "react-router-dom";
import { Stack, Link as ChakraLink, Heading } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <Stack margin={8} spacing={4}>
      <Heading size={"lg"}>
        <ChakraLink as={ReactRouterLink} to={"/"}>
          iTunes Podcasts
        </ChakraLink>
      </Heading>
      <Outlet />
    </Stack>
  );
}
