// const React = require('react');
// const DatePicker = require('material-ui/lib/date-picker/date-picker-inline');

// const SchedulePicker = () => (
//   <div>
//     <DatePicker hintText="Portrait Inline Dialog" container="inline" />
//     <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" />
//   </div>
//   );

// module.exports = SchedulePicker;
const React = require('react');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const TimePicker = require('material-ui/lib/time-picker/time-picker');

const SchedulePicker = () => (
  <div>

    <DatePicker hintText="Schedule Next Appointment" />

      <TimePicker
          format="24hr"
          hintText="24hr Format"
        />

  </div>
);

module.exports = SchedulePicker;