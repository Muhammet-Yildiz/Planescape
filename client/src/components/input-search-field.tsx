import { Autocomplete, TextField, InputAdornment, Icon, Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { FaLocationDot } from "react-icons/fa6";
import React from 'react';

interface Option {
  label: string ;
  iata?: string; 
}

interface InputSearchFieldProps {
  InputProps?: Record<string, unknown>;
  sx?: Record<string, unknown>;
  startIcon?: React.ReactNode | string;
  options?: Option[];
  onInputChange: (event: React.SyntheticEvent<Element, Event>, value: string) => void;
  disabled?: boolean;
  [key: string]: any; 
}

export const InputSearchField: React.FC<InputSearchFieldProps> = (props) => {
  const { InputProps, sx, startIcon, options = [], onInputChange, disabled, ...other } = props;

  return (
    <Autocomplete
      freeSolo
      options={options}
      onInputChange={onInputChange}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        return `${option?.label} - (${option?.iata || ''})`;
      }}
      disabled={disabled}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center' }} key={option.iata} id={option.iata}>
          <FaLocationDot color="#4B019B" size={14} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1.4, paddingY: '4px !important' }} id={option.iata}>
            {`${option.label} - (${option.iata})`}
          </Typography>
        </Box>
      )}
      PaperComponent={({ children }) => (
        <Box sx={{ width: 300, bgcolor: 'white', zIndex: 100 }}>
          {children}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            sx: {
              alignItems: 'center',
              display: 'flex',
              fontSize: 14,
              height: 'unset',
              lineHeight: 1.6,
              px: 1.5,
              py: 0.75,
              '&.MuiInputBase-inputAdornedStart': {
                pl: 0,
              },
            },
          }}
          variant="filled"
          InputLabelProps={{
            shrink: true,
            sx: {
              color: 'text.primary',
              fontSize: 14,
              fontWeight: 500,
              mb: 0.5,
              position: 'relative',
              transform: 'none',
            },
          }}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'background.default',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#d5d8e1',
              borderRadius: 1,
              boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
              overflow: 'hidden',
              p: 0,
              transition: (theme) =>
                theme.transitions.create(['border-color', 'box-shadow']),
              '&:before': {
                borderBottom: 0,
              },
              '&:hover': {
                backgroundColor: 'background.paper',
              },
              '&.Mui-focused': {
                backgroundColor: 'background.paper',
                boxShadow: (theme) =>
                  `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.13rem`,
              },
              '&.Mui-disabled': {
                backgroundColor: '#f5f5f5',
                boxShadow: 'none',
                borderColor: alpha('#D6DBE1', 0.5),
              },
              '.MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)': {
                mt: 0,
                ml: 1.5,
              },
            },
            ...sx,
          }}
          InputProps={{
            ...params.InputProps,
            ...InputProps,
            disableUnderline: true,
            startAdornment: startIcon && (
              <InputAdornment position="start"
                sx={{
                  color: 'text.main',
                  fontSize: 18,
                }}
              >
                {typeof startIcon === 'string' ? <Icon>{startIcon}</Icon> : startIcon}
              </InputAdornment>
            ),
          }}
          {...other}
        />
      )}
    />
  );
};