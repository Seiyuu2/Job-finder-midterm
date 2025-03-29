// src/components/HTMLDescription.tsx
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

interface HTMLDescriptionProps {
  htmlContent: string;
}

const HTMLDescription: React.FC<HTMLDescriptionProps> = ({ htmlContent }) => {
  const { width } = useWindowDimensions();

  // Optionally clean up newlines to reduce extra spacing
  const cleanedHtml = htmlContent.replace(/(\r\n|\n|\r)/gm, ' ');

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: cleanedHtml }}
      tagsStyles={{
        p: { marginVertical: 2, fontSize: 14, lineHeight: 18 },
        li: { marginLeft: 20, marginVertical: 2, fontSize: 14, lineHeight: 18 },
        span: { marginVertical: 0, fontSize: 14 },
      }}
    />
  );
};

export default HTMLDescription;
