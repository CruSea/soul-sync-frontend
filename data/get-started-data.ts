import { Value } from '@radix-ui/react-select';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const specializationOptions = [
  { label: 'Marriage Counseling', value: 'marriageCounseling' },
  { label: 'Discipleship', value: 'discipleship' },
  { label: 'Spiritual', value: 'spritual' },
];

const dayOptions = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
];

const hours = [
  { label: '01', value: '01' },
  { label: '02', value: '02' },
  { label: '03', value: '03' },
  { label: '04', value: '04' },
  { label: '05', value: '05' },
  { label: '06', value: '06' },
  { label: '07', value: '07' },
  { label: '08', value: '08' },
  { label: '09', value: '09' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
];

const minutes = [
  { label: '00', value: '00' },
  { label: '05', value: '05' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
  { label: '30', value: '30' },
  { label: '35', value: '35' },
  { label: '40', value: '40' },
  { label: '45', value: '45' },
  { label: '50', value: '50' },
  { label: '55', value: '55' },
];

const dayPeriod = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
];

export const getStartedForm = {
  genderOptions,
  specializationOptions,
  hours,
  minutes,
  dayPeriod,
  dayOptions,
};
