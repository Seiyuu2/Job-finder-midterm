const HTMLDescription: React.FC<HTMLDescriptionProps> = ({ htmlContent }) => {

 
  const { width } = useWindowDimensions();
 

 

  // If your HTML might be null or undefined, default to empty string:
 

  const safeHtml = htmlContent || '';
 

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
 

      source={{ html: safeHtml }}
 

      source={{ html: htmlContent || '' }}
 

      tagsStyles={tagsStyles}
 
    />
 
  );
 
};