import React from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';

const RedirectToAppDownloadPage = () => {
  const handleDownloadClick = () => {
    // Redirect to the app store
    window.location.href = 'https://example.com/app-store-url';
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '0 auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Download Our App
        </Typography>
        <Typography variant="body1" gutterBottom>
          Experience our app's amazing features by downloading it today!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadClick}
        >
          Download Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default RedirectToAppDownloadPage;
