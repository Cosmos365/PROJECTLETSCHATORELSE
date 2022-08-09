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
room_name = localStorage.getItem("room_namesa");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      
      document.getElementById("msg").value = "";
      console.log(msg);
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

      console.log(firebase_message_id);
      console.log(message_data);
      name1 = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];
      name_with_tag = "<h4>"+name1+"<img class = 'user_tick' src = 'tick.png'> </h4>";
      message_with_tag = "<h4 class = 'message_h4' >"+message+"</h4>";
      like_button = "<button class = 'btn btn-warning' id = "+firebase_message_id+" value = "+like+" onclick = 'updatelike(this.id)'> ";
      span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> like: "+like+"</span> </button> <hr>";
      row = name_with_tag+message_with_tag+like_button+span_with_tag;
      document.getElementById("output").innerHTML+=row;
      
      } });  }); }
getData();

function updatelike(message_id) {
      console.log("clicked on like button- "+message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes)+1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });

}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}