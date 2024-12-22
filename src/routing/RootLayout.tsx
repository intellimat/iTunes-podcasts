import { Outlet } from "react-router-dom";
import {
  Stack,
  Link as ChakraLink,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";
import { Link as ReactRouterLink } from "react-router-dom";
import { ColorModeButton } from "../components/ui/color-mode";

export default function RootLayout() {
  return (
    <Stack margin={4} padding={4}>
      <Toaster />
      <HStack>
        <Heading size={"lg"}>
          <ChakraLink asChild>
            <ReactRouterLink to={"/"}>
              <Text>iTunes Podcasts</Text>
            </ReactRouterLink>
          </ChakraLink>
        </Heading>
        <ColorModeButton marginLeft={"auto"} />
      </HStack>
      <Outlet />
    </Stack>
  );
}
