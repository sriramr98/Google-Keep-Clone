import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';

function SocialLogins() {
  return (
    <Box
      mb={2}
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      width="50%"
    >
      <IconButton>
        <Icon className="fab fa-github" />
      </IconButton>
      <IconButton>
        <Icon className="fab fa-google-plus-g" />
      </IconButton>
      <IconButton>
        <Icon className="fab fa-linkedin-in" />
      </IconButton>
    </Box>
  );
}

export default SocialLogins;
