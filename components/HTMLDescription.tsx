// src/components/HTMLDescription.tsx
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

type HTMLDescriptionProps = {
  htmlContent: string;
};

const HTMLDescription: React.FC<HTMLDescriptionProps> = ({ htmlContent }) => {
  const { width } = useWindowDimensions();

  // Define custom styles for HTML tags
  const tagsStyles = {
    p: {
      marginVertical: 4,
      fontSize: 14,
      lineHeight: 20,
    },
    li: {
      marginLeft: 20,
      marginVertical: 2,
      fontSize: 14,
      lineHeight: 20,
    },
    span: {
      marginVertical: 2,
      fontSize: 14,
    },
    // You can add more tag customizations here if needed
  };

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: htmlContent || '' }}
      tagsStyles={tagsStyles}
    />
  );
};

export default HTMLDescription;
