// src/components/HTMLDescription.tsx
import React, { useContext } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { ThemeContext } from '../context/ThemeContext';

interface HTMLDescriptionProps {
  htmlContent: string;
}

const HTMLDescription: React.FC<HTMLDescriptionProps> = ({ htmlContent }) => {
  const { width } = useWindowDimensions();
  const { isDarkMode } = useContext(ThemeContext);

  // Base style changes based on the theme
  const baseStyle = { color: isDarkMode ? '#FFF' : '#000', fontSize: 14, lineHeight: 18 };

  // Clean extra newlines from HTML content
  const cleanedHtml = htmlContent.replace(/(\r\n|\n|\r)/gm, ' ');

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: cleanedHtml }}
      baseStyle={baseStyle}
      tagsStyles={{
        p: { marginVertical: 2, fontSize: 14, lineHeight: 18 },
        li: { marginLeft: 20, marginVertical: 2, fontSize: 14, lineHeight: 18 },
        span: { marginVertical: 0, fontSize: 14 },
      }}
    />
  );
};

export default HTMLDescription;
