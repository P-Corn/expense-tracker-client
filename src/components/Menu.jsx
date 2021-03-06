import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { setSortMethod } from '../store/interface';
import { setSortMonth } from '../store/expenses';
import { populateExpensesByMonth } from '../store/expenses';
import dateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/MobileDatePicker';
import dayjs from 'dayjs';

export default function BasicMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [month, setMonth] = useState('');
  const open = Boolean(anchorEl);
  
  const handleClose = () => setAnchorEl(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSort = (e) => {
    dispatch(setSortMethod('Recent'));
    setMonth('');
    handleClose();
  };

  const handleDateChange = (newDate) => {
    if (newDate === 'Invalid Date')
      return;
    setMonth(newDate);
    dispatch(setSortMethod('Month'));
    dispatch(setSortMonth(newDate));
    dispatch(populateExpensesByMonth(newDate));
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Sort
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(e) => handleSort(e)}>Recent</MenuItem>
        <LocalizationProvider dateAdapter={dateAdapter}>
          <DatePicker
            views={['month', 'year']}
            minDate={dayjs('2012-03-01')}
            maxDate={dayjs('2023-06-01')}
            label="Month"
            value={month}
            onClose={() => handleClose()}
            onChange={ (newValue) => handleDateChange(dayjs(newValue).format('MMMM YYYY')) }
            renderInput={(params) =>
              <TextField 
                {...params} 
                error={false}
                sx={{ marginTop: .5 }}
              />
            }
          />
        </LocalizationProvider>
      </Menu>
    </div>
  );
}