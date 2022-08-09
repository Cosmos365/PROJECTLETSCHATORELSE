// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyBNqFIsDxapxK8q_BGqben7N0-yoW0NbkU",
      authDomain: "cedar-shape-319803.firebaseapp.com",
      databaseURL: "https://cedar-shape-319803-default-rtdb.firebaseio.com",
      projectId: "cedar-shape-319803",
      storageBucket: "cedar-shape-319803.appspot.com",
      messagingSenderId: "596236448341",
      appId: "1:596236448341:web:13e6a376959f983a7c1adc"
    };
    
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "welcome "+user_name+"!";

function addRoom() {
      room_names = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_names).update({
            purpose:"adding room name"
      });
localStorage.setItem("room_names",room_names);
window.location = "chat_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
            console.log("room name - "+Room_names);
            row = "<div class = 'room_name' id="+Room_names+"onclick = 'redirecttoroomname(this.id)'>#"+Room_names+"</div> <hr>";
            document.getElementById("output").innerHTML+=row;
      });});}
getData();

function redirecttoroomname(name) {
      console.log(name);
      localStorage.setItem("room_names",name);
      window.location = "chat_page.html"
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}