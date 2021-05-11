import {IconButton, IconButtonProps} from '@chakra-ui/button';
import React from 'react';
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

const fontSize = '1.3em';

export type SocialButtonProps = Omit<IconButtonProps, 'aria-label'> & {
  href?: string
}

export const SocialButton: React.FC<IconButtonProps> = (props) => {
  return <IconButton as="a" variant="ghost" color="gray.500" {...props} />;
};

export const GitHubButton: React.FC<SocialButtonProps> = (props) => {
  return (
    <SocialButton
      href="https://github.com/codingwithjustin"
      aria-label="Github"
      icon={<FaGithub fontSize={fontSize} />}
      {...props}
    />
  );
};

export const GitHubPersonalButton: React.FC<SocialButtonProps> = (props) => {
  return (
    <SocialButton
      href="https://github.com/jsbroks"
      aria-label="Github personal"
      icon={<FaGithub fontSize={fontSize} />}
      {...props}
    />
  );
};

export const YoutubeButton: React.FC<SocialButtonProps> = (props) => {
  return (
    <SocialButton
      href="https://www.youtube.com/channel/UCro4e-xxAYrgwt5cOccnE0A"
      aria-label="Youtube"
      icon={<FaYoutube fontSize={fontSize} />}
      {...props}
    />
  );
};

export const LinkedinPersonalButton: React.FC<SocialButtonProps> = (props) => {
  return (
    <SocialButton
      href="https://github.com/codingwithjustin"
      aria-label="Linkedin"
      icon={<FaLinkedin fontSize={fontSize} />}
      {...props}
    />
  );
};

export const TwitterButton: React.FC<SocialButtonProps> = (props) => {
  return (
    <SocialButton
      href="https://github.com/codingwithjustin"
      aria-label="Twitter"
      icon={<FaTwitter fontSize={fontSize} />}
      {...props}
    />
  );
};

export const DiscordButton: React.FC<SocialButtonProps> = (props) => {
  return (
    <SocialButton
      href="https://github.com/codingwithjustin"
      aria-label="Github"
      icon={<FaDiscord fontSize={fontSize} />}
      {...props}
    />
  );
};
