// Initialize Firebase 
var config = {
  apiKey: "AIzaSyA4034AE739cWDIpc--Fh4-ADSrB2bC-J8",
  authDomain: "bytehubindia-6083a.firebaseapp.com",
  databaseURL: "https://bytehubindia-6083a.firebaseio.com",
  projectId: "bytehubindia-6083a",
  storageBucket: "bytehubindia-6083a.appspot.com",
  messagingSenderId: "853900768803",
  appId: "1:853900768803:web:ff78dd335471ad263c6396",
  measurementId: "G-MTPCVDR2FX"
};
firebase.initializeApp(config);
firebase.analytics();

// Reference EventData collection
var EventDataRef = firebase.database().ref('EventData');

// Listen for form submit
document.getElementById('EventForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');
  var college = getInputVal('college');

  // Save message
  saveMessage(name, company, email, phone, message, college);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
  }, 10000);

  // Clear form
  document.getElementById('EventForm').reset();
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message, college) {
  var newMessageRef = EventDataRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    phone: phone,
    message: message,
    college: college
  });
}