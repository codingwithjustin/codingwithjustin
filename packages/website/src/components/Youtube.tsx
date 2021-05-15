import { AspectRatio, AspectRatioProps } from '@chakra-ui/react'
import React from 'react'

export const YouTubeVideo: React.FC<{ id: string } & AspectRatioProps> = ({
  id,
  ...rest
}) => {
  return (
    <AspectRatio ratio={16 / 9} rounded="md" {...rest}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        style={{
          borderTopLeftRadius: 'var(--chakra-radii-md)',
          borderTopRightRadius: 'var(--chakra-radii-md)'
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  )
}
