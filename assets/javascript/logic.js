$(document).ready(function() {
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBp6wVR8Ulr2ATjTCZ6_cnN4vHsk0Chz7A",
    authDomain: "homework7-177fd.firebaseapp.com",
    databaseURL: "https://homework7-177fd.firebaseio.com",
    projectId: "homework7-177fd",
    storageBucket: "homework7-177fd.appspot.com",
    messagingSenderId: "678071242633"
  };
  firebase.initializeApp(config);

  // Variable to Reference Database

  var dataRef = firebase.database();

  // Listen for Button Click
  // Store Data

  $("#submit-btn").on("click", function(event) {
      //Prevent Refresh
      event.preventDefault();

      // Store and Retrieve Most Recent Information 
      var name = $("name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var frequency = $("#frequency").val().trim();

      // Clear Input Fields After Submit
      $("#name").val("");
      $("#destination").val("");
      $("#firstTrain").val("");
      $("#frequency").val("");

      // Push Data Rather Than Set In Order to Add Onto Previous Data
      dataRef.ref().push({
          name: name,
          destination: destination,
          time: firstTrain,
          frequency: frequency
      });
  });

  // Firebase Listener
  dataRef.ref().on("child_added", function(chidSnapshot) {
      console.log(childSnapshot.val());

      // Create Variables from childSnapshot of firebase
      var name = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var frequency = childSnapshot.val().destination;
      var time = childSnapshot.val().time;
      var key = childSnapshot.key;
      var remove = "<button class='glyhicon glyphicon-trash' id=" + key + "></button>"

      // Find the Next Train Time Until Next Arrival
      var firstTrainConverted = moment(time, "hh:mm").subtract(1, "years");
      console.log(firstTrainConverted);

      // Set Variable Equal to Current Time from Moment.js
      var currentTime = moment();
      console.log("Current Time: " + moment(currentTime).format("hh:mm"));

      // Post Current Time
      $("#currentTme").html("Current Time: " + moment(CurrentTime).format("hh:mm"));

      // Difference Between First Train Time and Current Time
      var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
      console.log("Difference in Time: " + timeDiff);

      // Find the Time Apart by Finding the Remainder of the Time Difference and the Frequency
      var timeRemainder = timeDiff % frequency;
      console.log(timeRemainder);

      // Minutes Until the Next Train
      var nextTrainMin = frequency - timeRemainder;
      console.log("Minutes Till Train: " + nextTrainMin);

      // Time of the Next Train Arrival
      var nextTrainAdd = moment().add(nextTrainMin, "minutes");
      var nextTrainArr = moment(nextTrainAdd).format("hh:mm");
      console.log("Arrival Time: " + nextTrainArr);

      // Prepend All Info for User Submitted Train Data
      $("#schedule").prepend("<tr><td>" + name + "</td><td>" + destination + "</td><td" + frequency + "</td><td>" + nextTrainArr + "</td><td>" + nextTrainMin + "</td><td>" + remove + "</td><tr>");

  }, function(error) {
      consoel.log(error);
  });

        // Delete Function

        $(document).on("click", ".glyphicon-trash", deleteTrain);

        function deleteTrain() {
            var deleteKey = $(this).attr("id");
            dataRef.ref().child(deleteKey).remove();

            location.reload();
        }
  });
