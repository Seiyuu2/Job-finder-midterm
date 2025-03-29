// src/components/HTMLDescription.tsx
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

type HTMLDescriptionProps = {
  htmlContent: string;
};

const HTMLDescription: React.FC<HTMLDescriptionProps> = ({ htmlContent }) => {
  const { width } = useWindowDimensions();

  // Replace occurrences of &gt; (plus optional space) with a bullet (•)
  const cleanedHtml = htmlContent.replace(/&gt;\s?/g, '• ');

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: cleanedHtml }}
      tagsStyles={{
        p: { marginVertical: 4, fontSize: 14, lineHeight: 20 },
        li: { marginLeft: 20, marginVertical: 2, fontSize: 14, lineHeight: 20 },
      }}
    />
  );
};

export default HTMLDescription;
