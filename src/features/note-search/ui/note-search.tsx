import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function NoteSearch() {
  return (
    <Box
      component="form"
      sx={{ width: '100%', paddingBottom: '20px' }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Поиск"
        type="search"
        variant="outlined"
        color="primary"
        sx={{ width: '93%' }}
      />
    </Box>
  );
}
