import {
  Box,
  BoxProps,
  ButtonGroup,
  ButtonGroupProps,
  Stack,
  Text,
  TextProps,
} from '@chakra-ui/react';
import React from 'react';
import {GitHubButton, TwitterButton, YoutubeButton} from './SocialMedia';

export const SocialMediaLinks: React.FC<ButtonGroupProps> = (props) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <GitHubButton />
    <TwitterButton />
    <YoutubeButton />
  </ButtonGroup>
);

export const Copyright: React.FC<TextProps> = (props) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} Justin Brooks. All rights reserved.
  </Text>
);

export const Footer: React.FC<BoxProps> = (props) => (
  <Box {...props} as="footer" role="contentinfo" mx="auto" maxW="7xl">
    <Stack>
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Text fontSize="lg" fontWeight="bold">
          Coding With Justin
        </Text>
        <SocialMediaLinks />
      </Stack>
      <Copyright alignSelf={{base: 'center', sm: 'start'}} />
    </Stack>
  </Box>
);
