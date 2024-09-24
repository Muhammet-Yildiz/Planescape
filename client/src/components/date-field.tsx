import PropTypes from 'prop-types';
import { FormHelperText, TextField } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
interface DateFieldProps {
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  label?: string;
  name: string;
  onChange: (date: Dayjs | null) => void;
  placeholder?: string;
  value: Dayjs | null;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
export const DateField: React.FC<DateFieldProps> = (props) => {
  const {
    error,
    fullWidth,
    helperText,
    label,
    onChange,
    placeholder,
    value,
    name,
    ...other
  } = props;

  return (
    <>
      <DatePicker
        onChange={onChange}
        value={value}
        shouldDisableDate={(date) => dayjs(date).isBefore(dayjs(), 'day')}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.default',
            boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
            px: 1.5,
            py: 0.45,
            outline: 'none',
            transition: (theme) => theme.transitions.create([
              'border-color',
              'box-shadow'
            ]),
            '&.Mui-focused': {
              outline: 'none',
              border: 'none',
              backgroundColor: 'background.default',
              boxShadow: (theme) => `${alpha(theme.palette.primary.main,
                0.25)} 0 0 0 0.2rem`
            },
            '& .MuiOutlinedInput-input': {
              fontSize: 14,
              height: 'unset',
              lineHeight: 1.6,
              p: 0,
              border: 'none !important',
              outline: 'none !important',
            },
            '&.Mui-disabled': {
              backgroundColor: '#f5f5f5',
              boxShadow: 'none',
              borderColor: alpha('#D6DBE1', 0.5)
            }
          }
        }}
        slotProps={{
          textField: {
            name,
            error,
            fullWidth,
            helperText,
            label,
            placeholder,
            onBlur: props.onBlur,
            variant: 'outlined',
            sx: {
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.default',
                boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
                px: 1.5,
                py: 0.45,
                outline: 'none',
                transition: (theme) => theme.transitions.create([
                  'border-color',
                  'box-shadow',
                ]),
                '&.Mui-focused': {
                  outline: 'none',
                  border: 'none',
                  backgroundColor: 'background.default',
                  boxShadow: (theme) => `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                },
                '& .MuiOutlinedInput-input': {
                  fontSize: 14,
                  height: 'unset',
                  lineHeight: 1.6,
                  p: 0,
                  border: 'none !important',
                  outline: 'none !important',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#f5f5f5',
                  boxShadow: 'none',
                  borderColor: alpha('#D6DBE1', 0.5),
                },
              },
            },
            ...other,
          },
        }}
      />
    </>
  );
};
