import { useState } from 'react';
import DoctorSidebar from './Docsidebar';
import { createAppoinment } from '../../api/doctorapi/appoinment';
import toast, { Toaster } from 'react-hot-toast';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
} from '@mui/material';
import Slotlist from './Slotlist';
import Getslot from './Getslot'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: 450,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

type DayOfWeek = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

function Schedules() {
  const days: DayOfWeek[] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  const [open, setOpen] = useState(false);
  const [interval, setInterval] = useState<number>(1);
  const [render, setRender] = useState(false);
  const [frequency, setFrequency] = useState<'DAILY' | 'WEEKLY'>('DAILY');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<Record<DayOfWeek, boolean>>({
    MO: false,
    TU: false,
    WE: false,
    TH: false,
    FR: false,
    SA: false,
    SU: false,
  });

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedDays((prev) => ({
      ...prev,
      [name as DayOfWeek]: checked,
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleClose = async () => {
    const daysOfWeek: DayOfWeek[] = Object.entries(selectedDays)
      .filter(([_, isSelected]) => isSelected)
      .map(([day]) => day as DayOfWeek);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedStartDate = new Date(startDate);
    selectedStartDate.setHours(0, 0, 0, 0);

    const selectedEndDate = new Date(endDate);
    selectedEndDate.setHours(0, 0, 0, 0);

    if (selectedStartDate.getTime() === today.getTime()) {
      toast.error('Start date cannot be today');
      return;
    }

    if (selectedEndDate.getTime() === today.getTime()) {
      toast.error('End date cannot be today');
      return;
    }

    if (selectedEndDate.getTime() <= selectedStartDate.getTime()) {
      toast.error('End date must be after start date');
      return;
    }

    if (daysOfWeek.length === 0) {
      toast.error('Please select at least one day of the week');
      return;
    }

    if (interval <= 0) {
      toast.error('Interval cannot be negative');
      return;
    }

    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    if (end <= start) {
      toast.error('End time must be greater than start time');
      return;
    }

    const result = await createAppoinment(
      startDate,
      endDate,
      daysOfWeek,
      startTime,
      endTime,
      interval,
      frequency
    );

    if (result === 'slot creation sucessfull') {
      toast.success(result);
      setRender(!render);
    } else {
      toast.error(result);
    }

    setOpen(false);
  };

  return (
    <div className="flex min-h-screen overflow-hidden font-sans">
      <DoctorSidebar />
      <Toaster />
      <div className="ml-52 flex-1 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
        <div className="m-8">
          <button
            onClick={handleOpen}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out"
          >
            Create Recurring Slots
          </button>

          <Modal open={open} onClose={handleCloseModal}>
            <Box sx={style}>
              <Typography variant="h6" gutterBottom>
                Create Recurring Slots
              </Typography>

              <Stack spacing={2}>
                {/* Date Range */}
                <Box display="flex" gap={2}>
                  <TextField
                    label="Start Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    helperText="Starting date"
                    value={startDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setStartDate(e.target.value)
                    }
                  />
                  <TextField
                    label="End Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    helperText="Ending date"
                    value={endDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEndDate(e.target.value)
                    }
                  />
                </Box>

                {/* Days of the week */}
                <Typography variant="subtitle1">Days of the week:</Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {days.map((day) => (
                    <Box key={day} width="48%">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDays[day]}
                            onChange={handleCheckboxChange}
                            name={day}
                          />
                        }
                        label={day}
                      />
                    </Box>
                  ))}
                </Box>

                {/* Time inputs */}
                <Box display="flex" gap={2}>
                  <TextField
                    type="time"
                    fullWidth
                    label="Start Time"
                    helperText="Starting time"
                    InputLabelProps={{ shrink: true }}
                    value={startTime}
                    onChange={handleStartTimeChange}
                  />
                  <TextField
                    type="time"
                    fullWidth
                    label="End Time"
                    helperText="Ending time"
                    InputLabelProps={{ shrink: true }}
                    value={endTime}
                    onChange={handleEndTimeChange}
                  />
                </Box>

                {/* Interval */}
                <Box display="flex" gap={2}>
                  <TextField
                    type="number"
                    fullWidth
                    label="Interval"
                    value={interval}
                    onChange={(e) => setInterval(Number(e.target.value))}
                    helperText="Sets the gap between recurrences."
                  />
                </Box>

                {/* Frequency */}
                <FormControl fullWidth>
                  <InputLabel id="frequency-label">Frequency</InputLabel>
                  <Select
                    labelId="frequency-label"
                    value={frequency}
                    label="Frequency"
                    onChange={(e) => setFrequency(e.target.value as 'DAILY' | 'WEEKLY')}
                  >
                    <MenuItem value="DAILY">Daily</MenuItem>
                    <MenuItem value="WEEKLY">Weekly</MenuItem>
                  </Select>
                  <Typography variant="caption" color="text.secondary">
                    How often the event repeats.
                  </Typography>
                </FormControl>

                {/* Action buttons */}
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button variant="outlined" color="error" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button variant="contained" onClick={handleClose}>
                    Save
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Modal>
        </div>

        <div>
          <Slotlist render={render} setRender={setRender} />
        </div>

        <div>
          <Getslot/>
        </div>
      </div>
    </div>
  );
}

export default Schedules;
