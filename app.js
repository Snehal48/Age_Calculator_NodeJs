const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-birthdate', (req, res) => {
  const birthdate = req.body.birthdate;
  console.log(`Received birthdate: ${birthdate}`);

  const birthMoment = moment(birthdate, 'DD/MM/YYYY', true);
  if (!birthMoment.isValid()) {
    return res.status(400).json({ error: 'Invalid date format. Please use DD/MM/YYYY.' });
  }

  const currentMoment = moment();
  const years = currentMoment.diff(birthMoment, 'years');
  const months = currentMoment.diff(birthMoment, 'months');
  const weeks = currentMoment.diff(birthMoment, 'weeks');
  const days = currentMoment.diff(birthMoment, 'days');
  const hours = currentMoment.diff(birthMoment, 'hours');
  const minutes = currentMoment.diff(birthMoment, 'minutes');
  const seconds = currentMoment.diff(birthMoment, 'seconds');

  const nextBirthday = moment(birthMoment).year(currentMoment.year());
  if (nextBirthday.isBefore(currentMoment)) {
    nextBirthday.add(1, 'years');
  }
  const daysUntilNextBirthday = nextBirthday.diff(currentMoment, 'days');

  res.json({
    years: years,
    months: months,
    weeks: weeks,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    daysUntilNextBirthday: daysUntilNextBirthday
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
