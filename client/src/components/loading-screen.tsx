import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box } from '@mui/material';

export const LoadingScreen = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme => theme.palette.primary.main,
        flexGrow: 1 ,
        height: 2 ,
        width: '100%' ,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    />
  );
};