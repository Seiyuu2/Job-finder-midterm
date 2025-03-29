// src/components/HTMLDescription.tsx
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

type HTMLDescriptionProps = {
  htmlContent: string;
};

const HTMLDescription: React.FC<HTMLDescriptionProps> = ({ htmlContent }) => {
  const { width } = useWindowDimensions();

  // If your HTML might be null or undefined, default to empty string:
  const safeHtml = htmlContent || '';

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: safeHtml }}
    />
  );
};

export default HTMLDescription;
