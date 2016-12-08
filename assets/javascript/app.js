// Initialize Firebase
var config = {
    apiKey: "AIzaSyB23-RkvAm32QeoOSxJuuWWNN-bUFsPeaE",
    authDomain: "train-scheduler-4455f.firebaseapp.com",
    databaseURL: "https://train-scheduler-4455f.firebaseio.com",
    storageBucket: "train-scheduler-4455f.appspot.com",
    messagingSenderId: "456375045212"
};
firebase.initializeApp(config);

var database = firebase.database();
var pushKey;
var trainName;
var destination;
var firstTrainTime;
var frenquency;

setInterval(calcTrainTimes(), 60000);
calcTrainTimes();
displayTrains();


$('#submit-button').on('click', function() {
    trainName = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    firstTrainTime = $('#first-train-time').val().trim();
    frenquency = $('#frenquency').val().trim();
    $('#train-name, #destination, #first-train-time, #frenquency').val('');

    if (trainName === '' || destination === '' || firstTrainTime === '' || frenquency === '') {
        alert('Please fill out all fields');
    } else {
        pushKey = database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            key: 'none',
            frenquency: frenquency
        }).key;
        //not sure if i need the key, probabaly not
        database.ref().child(pushKey).update({
            key: pushKey
        });
    }
    displayTrains();
    return false;
});


function displayTrains() {
    $('#train-results').empty();
    var rowDiv = $('<div>').addClass('row');
    var trainNameCol = $('<div>').addClass('col-sm-3');
    trainNameCol.append($('<h5>').text('Train Name'));
    rowDiv.append(trainNameCol);
    var destinationCol = $('<div>').addClass('col-sm-3');
    destinationCol.append($('<h5>').text('Destination'));
    rowDiv.append(destinationCol);
    var frenquencyCol = $('<div>').addClass('col-sm-2');
    frenquencyCol.append($('<h5>').text('Frequency (min)'));
    rowDiv.append(frenquencyCol);
    var nextArrivalCol = $('<div>').addClass('col-sm-2');
    nextArrivalCol.append($('<h5>').text('Next Arrival'));
    rowDiv.append(nextArrivalCol);
    var minutesAwayCol = $('<div>').addClass('col-sm-2');
    minutesAwayCol.append($('<h5>').text('Minutes Away'));
    rowDiv.append(minutesAwayCol);
    $('#train-results').append(rowDiv);

    database.ref().on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var trainNameSnap = childSnapshot.val().trainName;
            var destinationSnap = childSnapshot.val().destination;
            var firstTrainTimeSnap = childSnapshot.val().firstTrainTime;
            var frenquencySnap = childSnapshot.val().frenquency;

            $('#train-results').append('<hr>');
            var rowDiv = $('<div>').addClass('row');
            var trainNameCol = $('<div>').addClass('col-sm-3');
            trainNameCol.append($('<h5>').text(trainNameSnap));
            rowDiv.append(trainNameCol);
            var destinationCol = $('<div>').addClass('col-sm-3');
            destinationCol.append($('<h5>').text(destinationSnap));
            rowDiv.append(destinationCol);
            var frenquencyCol = $('<div>').addClass('col-sm-2');
            frenquencyCol.append($('<h5>').text(frenquencySnap));
            rowDiv.append(frenquencyCol);
            var nextArrivalCol = $('<div>').addClass('col-sm-2');
            var minutesAwayCol = $('<div>').addClass('col-sm-2');
            $('#train-results').append(rowDiv);
        });
        // If it fails, cue error handling.
    }, function(errorObject) {
        // Log a read error and its error code.
        console.log("The read failed: " + errorObject.code);
    });

}


function calcTrainTimes() {

}
