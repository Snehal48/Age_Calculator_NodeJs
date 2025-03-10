const express = require('express'); 
const path = require('path'); 
const bodyParser = require('body-parser'); 
const moment = require('moment'); // Import moment for date calculations 
 
const app = express(); 
const PORT = 3000; // Use a port other than 5000 
 
// Middleware to parse incoming request bodies 
app.use(bodyParser.urlencoded({ extended: true })); 
 
// Serve static files from the "public" directory 
app.use(express.static(path.join(__dirname, 'public'))); 
 
// POST route to handle form submission 
app.post('/submit-birthdate', (req, res) => { 
  try { 
    const birthdate = req.body.birthdate; 
    console.log(`Received birthdate: ${birthdate}`); 
 
    const birthMoment = moment(birthdate); 
    const currentMoment = moment(); 
 
    // Calculate age in different units 
    const years = currentMoment.diff(birthMoment, 'years'); 
    const months = currentMoment.diff(birthMoment, 'months'); 
    const weeks = currentMoment.diff(birthMoment, 'weeks'); 
    const days = currentMoment.diff(birthMoment, 'days'); 
    const hours = currentMoment.diff(birthMoment, 'hours'); 
    const minutes = currentMoment.diff(birthMoment, 'minutes'); 
    const seconds = currentMoment.diff(birthMoment, 'seconds'); 
 
    // Calculate days until next birthday 
    const nextBirthday = birthMoment.add(years + 1, 'years'); 
    const daysUntilNextBirthday = nextBirthday.diff(currentMoment, 'days'); 
    console.log(`Days until next birthday: ${daysUntilNextBirthday}`); 
 
    // Send the calculated age and days until next birthday back to the client 
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
  } catch (error) { 
    console.error('Error handling form submission:', error); 
    res.status(500).send('An error occurred while processing your request.'); 
  } 
}); 
 
// Start the server 
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`); 
});