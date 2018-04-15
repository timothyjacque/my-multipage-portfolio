$(function() {
  // Auto play modal video
  $(".video").click(function () {
    var theModal = $(this).data("target"),
    videoSRC = $(this).attr("data-video"),
    videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
    $(theModal + ' iframe').attr('src', videoSRCauto);
    $(theModal + ' button.close').click(function () {
      $(theModal + ' iframe').attr('src', videoSRC);
    });
  });
});

$(document).on('click','[data-toggle="lightbox"]',function(event){
  event.preventDefault();
  $(this).ekkoLightbox();
});

$('.slider').slick({
  infinite: true,
  slideToShow:1,
  slideToScroll:1
});


// SUBMIT TO FIREBASE CODE
// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
  apiKey: "AIzaSyABtdUgx5-iZuBQbGRByt-kQ32RbLFjUgA",
  authDomain: "my-portfolio-e0f26.firebaseapp.com",
  databaseURL: "https://my-portfolio-e0f26.firebaseio.com",
  projectId: "my-portfolio-e0f26",
  storageBucket: "my-portfolio-e0f26.appspot.com",
  messagingSenderId: "405402013194"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message
  });
}
