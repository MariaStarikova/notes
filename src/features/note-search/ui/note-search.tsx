import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface NoteSearchProps {
  textValue: string;
  onChange: (value: string) => void;
}

export function NoteSearch(props: NoteSearchProps) {
  const { textValue, onChange } = props;
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
        sx={{ width: '100%' }}
        value={textValue}
        onChange={e => onChange(e.target.value)}
      />
    </Box>
  );
}
