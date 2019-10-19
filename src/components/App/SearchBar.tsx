import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

interface Props {
  onSearchBarClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const SearchBar: React.FC<Props> = ({onSearchBarClick}) => {
  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        px={2}
        py={1}
      >
        <Typography
          onClick={onSearchBarClick}
          style={{width: '150px'}}
          variant="caption"
        >
          Take a note...
        </Typography>
        <IconButton>
          <Icon className="fas fa-check-square" />
        </IconButton>
        <IconButton>
          <Icon className="fas fa-paint-brush" />
        </IconButton>
        <IconButton>
          <Icon className="far fa-image" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default SearchBar;
