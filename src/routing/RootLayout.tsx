import { Outlet } from "react-router-dom";
import { Stack, Link as ChakraLink, Heading } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <Stack margin={16} spacing={8}>
      <Heading>
        <ChakraLink as={ReactRouterLink} to={"/"}>
          iTunes Podcasts
        </ChakraLink>
      </Heading>
      <Outlet />
    </Stack>
  );
}
