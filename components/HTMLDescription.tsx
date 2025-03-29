// src/components/HTMLDescription.tsx
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

type HTMLDescriptionProps = {
  htmlContent: string;
};

const HTMLDescription: React.FC<HTMLDescriptionProps> = ({ htmlContent }) => {
  const { width } = useWindowDimensions();

  // Remove line breaks from the raw HTML (optional)
  const cleanedHtml = htmlContent.replace(/(\r\n|\n|\r)/gm, ' ');

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: cleanedHtml }}
      tagsStyles={{
        // Make <p> more compact
        p: {
          marginVertical: 2, // reduce top/bottom spacing
          padding: 0,
          fontSize: 14,
          lineHeight: 18, // slightly tighter line spacing
        },
        // If you have <li> tags, do the same
        li: {
          marginVertical: 2,
          padding: 0,
          fontSize: 14,
          lineHeight: 18,
        },
        // If you see extra <span> tags, reduce their margins
        span: {
          marginVertical: 0,
          padding: 0,
          fontSize: 14,
        },
      }}
    />
  );
};

export default HTMLDescription;
