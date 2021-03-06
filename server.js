const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');

const app = express();

// JSON
const schedule = require("./lib/data/schedule.json");
const geSchedule = require("./lib/data/ge.json")

// Models
const ClassData = require("./server/models/classData");
const Data = require("./server/models/Data");
const GEData = require("./server/models/geData");
const Courses = require("./server/models/Courses");
const calData = require("./server/models/calData");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Port
const port = process.env.PORT || 5000;

// Connect to MongoDB
const db = require("./config/keys").mongoURI;
mongoose
	.connect(db)
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));

// API routes
require("./server/routes/api/signin.js")(app);

// Base route that's still in progress ...
app.get("/", (req, res) => {
	res.send({ express: "Connected!" });
});

// Sorts User Class data into dictionary: {year: [fall classes], [summer classes], [spring classes], [winter classes]}
function sortByQuarter(userClasses){
	var sorted = {};
	for (i = 0; i < userClasses.length; i++) {
		if (!(userClasses[i].year in sorted)) { // If not in dictionary
			sorted[userClasses[i].year] = [[], [], [], []];
			sorted[userClasses[i].year][userClasses[i].quarter].push(
				{courseID: userClasses[i].courseID, grade: userClasses[i].grade,
          		units: userClasses[i].units, _id: userClasses[i]._id});
		}else{
			sorted[userClasses[i].year][userClasses[i].quarter].push(
				{courseID: userClasses[i].courseID, grade: userClasses[i].grade,
          		units: userClasses[i].units, _id: userClasses[i]._id});
		}
	}
	return sorted;
}

// Gets all user classes from the database and returns in a sorted manner
app.post("/api/userClasses", (req, res) => {
	var userClasses = [];
	var sorted = {};
	// Find all the user classes
	ClassData.find({ 'userToken': req.body.userID }, function (err, classes) {
		if (err) {
			console.log(err);
			return res.status(500).send({message: 'Failed to load user classes'});
		}else{
			classes.forEach(function(userClass){
				const newClass = {courseID: userClass.courseID, year: userClass.year,
					quarter: userClass.quarter, grade: userClass.grade, units: userClass.units,
          _id: userClass._id};

				userClasses.push(newClass);
			});
			sorted = sortByQuarter(userClasses); // Sort all the data so we can display it easily
			res.send(sorted);
		}
	}).then(console.log(`Getting user classes ...`));
});

// Gets user claasses for the major requirments page
app.post("/api/majorClasses", (req, res) => {
	let userClasses = [];
	ClassData.find({ 'userToken': req.body.userID }, function (err, classes) {
		if (err) {
			console.log(err);
			return res.status(500).send({ message: 'Failed to load user classes' });
		} else {
			classes.forEach(function (userClass) {
				const newClass = { courseID: userClass.courseID };
				userClasses.push(newClass);
			});
			res.send(userClasses);
		}
	}).then(console.log(`Getting user classes ...`));
});

// Gets course datas from requested classes
app.post("/api/getMajorClassData", async (req, res) => {
	console.log(req.body.classes);
	const classes = Object.keys(req.body.classes);
	let classDatas = {}, find = [];
	for (let i = 0; i < classes.length; i++) {
		find.push({ courseID: classes[i] });
	}

	Courses['Fall18'].find({ $or: find }, function (err, classData) {
		if (err) {
			console.log("error");
			return res.status(500).send({ geError: "Error" });
		} else {
			classData.forEach(function (data) {
				const courseTitle = data.courseTitle.slice(data.courseID.length + 9);
				classDatas[data.courseID] = {
					description: data.description,
					prereqs: data.prereqs,
					courseTitle: courseTitle
				};
			});
			res.send(classDatas);
		}
	});
});

// Gets user claasses for the ge requirements page
app.post("/api/geClasses", (req, res) => {
	let ges = {};
	ClassData.find({ 'userToken': req.body.userID }, function (err, classes) {
		if (err) {
			console.log(err);
			return res.status(500).send({ message: 'Failed to load user classes' });
		} else {
			classes.forEach(function (userClass) {
				if(!(userClass.ge in ges) && userClass.ge !== ''){
					//console.log(userClass.ge);
					ges[userClass.ge] = userClass.courseID;
				}
			});
			console.log(ges);
			res.send(ges);
		}
	}).then(console.log(`Getting user classes ...`));
});

// Push all JSON data into database
app.post("/api", (req, res) => {
	for (let i = 0; i < schedule.length; i++) {
		// Create new model that'll hold schedule data
		const newData = new Data({
			courseID: schedule[i].courseID,
			courseTitle: schedule[i].courseTitle,
			description: schedule[i].description,
			credits: parseInt(schedule[i].credits),
			terms: schedule[i].terms,
			sections: schedule[i].sections
		});

		// Save to db under collection data(s)
		newData.save().then(console.log(`Saving ${i} documents ...`));
	}

	res.send("Done!");
});

//ge post request
app.post("/api/ge", (req, res) => {
  for (let i = 0; i < geSchedule.length; i++) {
    // Create new model that'll hold schedule data
    const geData = new GEData({
      geID: geSchedule[i].geID,
      desc: geSchedule[i].desc,
      credits: parseInt(geSchedule[i].credits),
    });
    geData.save().then(console.log(`Saving ${i} documents ...`));
  }
  res.send("GE Done!");
});


//ge get request
app.get("/api/GERequirements", (req, res) => {
	GEData.find(function (err, ge) {
		if (err) {
			//error messages
			console.log("error");
			return res.status(500).send({ geError: "Error" });
		} else {
			//array requirements
			requirements = [];
			//for each GE, put each category in the right place
			ge.forEach(function (GE) {
				const NewGE = {
					geID: GE.geID,
					desc: GE.desc,
					credits: GE.credits,
				};
				//pushing each GE onto the array
				requirements.push(NewGE);
			});
			//send the array to GERequirements.js
			res.send(requirements);
		}
	});
});

function parseYear(year) {
	year = year.toString();
	if (year.length === 4){
		return year.slice(2);
	}
	return year;
}

function quarterNumberToString(quarter){
	if(quarter === 0){
		quarter = 'Fall';
	}else if(quarter === 1){
		quarter = 'Summer';
	}else if(quarter === 2){
		quarter = 'Spring';
	}else if(quarter === 3){
		quarter = 'Winter';
	}
	return quarter;
}

// Posts class form submission to database
app.post("/api/submitClass", (req, res) => {
	console.log(req.body);
	const lecture = {
		days: req.body.days,
		times: req.body.times,
		room: req.body.room,
		meetingDates: req.body.meetingDates,
		instructor: req.body.instructor,
	};
	const credits = req.body.credits[0];
  	const classData = new ClassData({
		courseID: req.body.class,
		userToken: req.body.userID,
		quarter: req.body.quarter,
		year: req.body.year,
		lecture: lecture,
		ge: req.body.ge,
		units: credits,
		courseTitle: req.body.courseTitle
	});
	classData.save(function(err, newClass){
		res.send({ express: "done", _id: newClass._id });
	});
});

// Deletes class from the database
app.post("/api/deleteClass", (req, res) => {
	ClassData.findByIdAndRemove(req.body._id, function (err, classes) {
		if (err) {
			console.log(err);
			return res.status(500).send({ message: 'Failed to load user classes' });
		} else {
			res.send({ express: "done" });
		}
	});
});

app.post("/api/editGrade", (req, res) => {
	console.log("here");
	ClassData.findByIdAndUpdate(req.body._id, { $set: { grade: req.body.grade } }, function(err, classes){
		if (err) {
			console.log(err);
			return res.status(500).send({ message: 'Failed to load user classes' });
		} else {
			res.send({ express: "done" });
		}
	})
})

//based off Chtzou's GE
app.post("/api/getCalendar", (req, res) => {
  calData.find({'userToken': req.body.userID}, function (err, cal) {
    if (err) {
      //error messages
      console.log("Can't get class data");
      return res.status(500).send({ Error: "Can't get class data" });
    } else {
      events = [];
      //parse data into readable for FullCalendar
      cal.forEach(function (c) {
		//calendar date string
		var dateString = c.lecture.meetingDates;
		if(dateString == null) return; //without this it crashes because not all classes have dates
		var dateCut = dateString.split(" -", 2); // Calendar date ie 9/27 - 10/27
		//Meeting Days MWF
		var daysString = c.lecture.days;
		if(daysString == null) return;
		var day = checkDays(daysString); // returns which weekdays class is held
		var timeCut = c.lecture.times;
		timeCut = timeCut.split("-", 2); //takes the time range and splits it
		var timeCutA = timeCut[0]; //start time
		var timeCutB = timeCut[1]; // end time
		// converts first time into 24 hour format
		if (timeCutA.includes("AM")) timeCutA = convertAM(timeCutA);
		else timeCutA = convertPM(timeCutA);
		//converts second time into 24 hour format
		if (timeCutB.includes("AM")) timeCutB = convertAM(timeCutB);
		else timeCutB = convertPM(timeCutB);
        const newCal = {
          title: c.courseTitle,
		  dow: day,
		  start: timeCutA,
		  end: timeCutB,
		  ranges: [{ start: dateCut[0], end: dateCut[1]}],
		  description: c.lecture.room
        };
        //push data to events
        events.push(newCal);
      });
      //send events
      res.send(events);
	  //logging
	  //console.log(events);
    }
  });
});
// trims AM
function convertAM(timeAM) {
	const [time, modifier] = timeAM.split('AM');
	return time;
}
//trims PM + 12 hours
function convertPM(timePM) {
	const [time, modifier] = timePM.split('PM');
	let [hours, minutes] = time.split(':');
	if (hours === '12') {
		hours = '00';
	}
	hours = parseInt(hours, 10) + 12;
	return hours + ':' + minutes;
}
//converts written weekdays into a numerical array of the weekdays
function checkDays(daysInput) {
	if(daysInput == "MWF") {
		return '[1,3,5]';		
		}
	if(daysInput == "MW") {
		return '[1,3]';		
		}
	if(daysInput == "TuTh") {
		return '[2,4]';		
		}
	if(daysInput == "Tu") {
		return '[2]';		
		}
	if(daysInput == "Th") {
		return '[4]';		
		}
	if(daysInput == "M") {
		return '[1]';		
		}
	if(daysInput == "W") {
		return '[3]';		
		}
	if(daysInput == "F") {
		return '[5]';		
		}
}

app.listen(port, () => console.log(`Listening on port ${port}`));
