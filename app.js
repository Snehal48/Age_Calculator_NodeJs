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
    const months = currentMoment.diff(birthMoment.clone().add(years, 'years'), 'months'); 
    const days = currentMoment.diff(birthMoment.clone().add(years, 'years').add(months, 'months'), 'days'); 
    const weeks = currentMoment.diff(birthMoment, 'weeks'); 
    const totalDays = currentMoment.diff(birthMoment, 'days'); 
    const hours = currentMoment.diff(birthMoment, 'hours'); 
    const minutes = currentMoment.diff(birthMoment, 'minutes'); 
    const seconds = currentMoment.diff(birthMoment, 'seconds'); 
 
    // Calculate days until next birthday 
    const nextBirthday = birthMoment.clone().add(years + 1, 'years'); 
    const daysUntilNextBirthday = nextBirthday.diff(currentMoment, 'days'); 
 
    // Format output string 
    const formattedOutput = ` 
      Age = ${years} years 
      Born on: ${birthMoment.format('dddd MMMM D, YYYY')} 
      Age on: ${currentMoment.format('dddd MMMM D, YYYY')} 
      Exact age in different time units: 
      = ${years} years ${months} months ${days} days 
      = ${currentMoment.diff(birthMoment, 'months')} months ${days} days 
      = ${weeks} weeks ${days} days 
      = ${totalDays} days 
      ≈ ${hours} hours 
      ≈ ${minutes} minutes 
      ≈ ${seconds} seconds 
      ${daysUntilNextBirthday} days till next birthday ${nextBirthday.format('dddd MMMM D, YYYY')} 
    `; 
 
    // Send the formatted output back to the client 
    res.json({ formattedOutput: formattedOutput.trim() }); 
  } catch (error) { 
    console.error('Error handling form submission:', error); 
    res.status(500).send('An error occurred while processing your request.'); 
  } 
}); 
 
// Start the server 
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`); 
});