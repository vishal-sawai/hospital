$(document).ready(function () {

    $(".slide2").hide();
    $(".slide1").hide();

    let no;
    $(".sbtn").click(function (ev) {
        no = document.getElementById("phone").value;
        if (isNaN(no)) {
            event.preventDefault();
            $(".sp").text("*Enter only number");
        }
        else {
            $(".sp").text("");
        }
    });
    $("#pt").click(function () {
        var patient = document.getElementById('pt').value;
        if (patient == "New Patient") {
            $(".slide1").slideDown();
            $(".slide2").hide();
        }
        else if (patient == "Renewal Patient") {
            $(".slide2").slideDown();
            $(".slide1").hide();
        }
        else {
            $(".slide2").hide();
            $(".slide1").hide();
        }
    });
});


// Firebase

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCj9w2p0Zwwf0pimJ_MNUQ6bQ3OfVYfRsA",
    authDomain: "hospital-b5b96.firebaseapp.com",
    projectId: "hospital-b5b96",
    storageBucket: "hospital-b5b96.appspot.com",
    messagingSenderId: "665852192642",
    appId: "1:665852192642:web:ce5688f088d77c137b519b"
};

var d11 = "Doctor 1";
var d22 = "Doctor 2";
var d33 = "Doctor 3";

var dac = "";


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var firstname, lastname, mail, phoneno, regno, appdate, patient, doctor, pay;

function store() {
    document.getElementById('f').addEventListener("submit", storeData);
}
function storeData(e) {

    e.preventDefault();
    firstname = document.getElementById('fname').value;
    lastname = document.getElementById('lname').value;
    mail = document.getElementById('email').value;
    phoneno = document.getElementById('phone').value;
    regno = document.getElementById('r-no').value;
    appdate = document.getElementById('adate').value;
    patient = document.getElementById('pt').value;
    doctor = document.getElementById('dr').value;
    add = document.getElementById('address').value;
    symptoms = document.getElementById('symptoms').value;
    pay = document.querySelector('input[name=payment]:checked').value;
    gender = document.querySelector('input[name=gender]:checked').value;

    // doctor

    function firecode(dr) {
        db.collection(dr).doc(regno).set({
            PatientFirstName: firstname,
            PatientLastName: lastname,
            RegNo: regno,
            Email: mail,
            PhoneNo: phoneno,
            AppointmentDate: appdate,
            Patient: patient,
            Doctor: doctor,
            Address: add,
            Symptoms: symptoms,
            PaymentMethod: pay,
            Gender: gender
        })
            .then(function () {
                alert(firstname + " Your Request Submitted");
                document.getElementById('vform').reset();
            });
    }

    if (doctor == "Doctor 1") {
        firecode(d11);
    }

    if (doctor == "Doctor 2") {
        firecode(d22);
    }

    if (doctor == "Doctor 3") {
        firecode(d33);
    }
}

//login

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        console.log(user);
    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
        console.log(user);
    }
});

function login() {

    var UserEmail = document.getElementById("lmail").value;
    var UserPass = document.getElementById("lpassword").value;

    firebase.auth().signInWithEmailAndPassword(UserEmail, UserPass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error" + error)

    });
}
const LogOut = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Logout successful");
        location.replace("patient.html");
    })
        .catch((error) => {
            // An error happened.
            alert("Error: " + error);
        });
};

// table

// doctor 1
function d1() {

    dac = "d1"

    $(document).ready(function () {

        $("#d-section").slideDown();

        $("#delbtn").click(function (ev) {
            event.preventDefault();
            var d = document.getElementById('ind').value;
            db.collection("Doctor 1").doc(d).delete().then(() => {
                alert("Document successfully deleted!");
                $("#t").load(window.location.href + " #t");
            }).catch((error) => {
                alert.error("Error removing document: ", error);
            });
        });

        $("#delete-button").click(function () {
            $(".d").slideToggle();
            $(".pre").slideUp();
        });
        $("#prescription-button").click(function () {
            $(".pre").slideToggle();
            $(".d").slideUp();
        });
    });

    function SelectAllData() {
        $("#t").load(window.location.href + " #t");

        var vi = db.collection("Doctor 1");

        vi.get().then((snapshot) => {
            const patient = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                patient.push(data);
            });
            patient.map((vishal) => {
                var fname = vishal.PatientFirstName;
                var lname = vishal.PatientLastName;
                var regno = vishal.RegNo;
                var mail = vishal.Email;
                var appdate = vishal.AppointmentDate;
                var patient = vishal.Patient;
                var symptoms = vishal.Symptoms;
                var gender = vishal.Gender;
                AddItemsToTable(fname, lname, regno, mail, appdate, patient, symptoms, gender);

            });
        }).catch((error) => {
            // An error happened.
            alert("Error: " + error);
        });

    }
    SelectAllData();

    var stdNo = 0;

    function AddItemsToTable(fname, lname, regno, mail, appdate, patient, symptoms, gender) {

        var tbody = document.getElementById("table1");
        var trow = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");
        var td8 = document.createElement("td");
        var td9 = document.createElement("td");

        td1.innerHTML = ++stdNo;
        td2.innerHTML = fname;
        td3.innerHTML = lname;
        td4.innerHTML = regno;
        td5.innerHTML = mail;
        td6.innerHTML = appdate;
        td7.innerHTML = patient;
        td8.innerHTML = symptoms;
        td9.innerHTML = gender;

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(td5);
        trow.appendChild(td6);
        trow.appendChild(td7);
        trow.appendChild(td8);
        trow.appendChild(td9);
        tbody.appendChild(trow);

    }

}
//doctor 2

function d2() {

    dac = "d2"; 

    $(document).ready(function () {

        $("#d-section").slideDown();

        $("#delbtn").click(function (ev) {
            event.preventDefault();
            var d = document.getElementById('ind').value;
            db.collection("Doctor 2").doc(d).delete().then(() => {
                alert("Document successfully deleted!");
                $("#t").load(window.location.href + " #t");
            }).catch((error) => {
                alert.error("Error removing document: ", error);
            });
        });

        $("#delete-button").click(function () {
            $(".d").slideToggle();
            $(".pre").slideUp();
        });
        $("#prescription-button").click(function () {
            $(".pre").slideToggle();
            $(".d").slideUp();
        });
    });

    function SelectAllData() {
        $("#t").load(window.location.href + " #t");

        var vi = db.collection("Doctor 2");

        vi.get().then((snapshot) => {
            const patient = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                patient.push(data);
            });
            patient.map((vishal) => {
                var fname = vishal.PatientFirstName;
                var lname = vishal.PatientLastName;
                var regno = vishal.RegNo;
                var mail = vishal.Email;
                var appdate = vishal.AppointmentDate;
                var patient = vishal.Patient;
                var symptoms = vishal.Symptoms;
                var gender = vishal.Gender;
                AddItemsToTable(fname, lname, regno, mail, appdate, patient, symptoms, gender);

            });
        }).catch((error) => {
            // An error happened.
            alert("Error: " + error);
        });


    }
    SelectAllData();
    var stdNo = 0;

    function AddItemsToTable(fname, lname, regno, mail, appdate, patient, symptoms, gender) {

        var tbody = document.getElementById("table1");
        var trow = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");
        var td8 = document.createElement("td");
        var td9 = document.createElement("td");

        td1.innerHTML = ++stdNo;
        td2.innerHTML = fname;
        td3.innerHTML = lname;
        td4.innerHTML = regno;
        td5.innerHTML = mail;
        td6.innerHTML = appdate;
        td7.innerHTML = patient;
        td8.innerHTML = symptoms;
        td9.innerHTML = gender;

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(td5);
        trow.appendChild(td6);
        trow.appendChild(td7);
        trow.appendChild(td8);
        trow.appendChild(td9);
        tbody.appendChild(trow);

    }
}

// doctor 3

function d3() {

     dac = "d3";

     $(document).ready(function () {

        $("#d-section").slideDown();

        $("#delbtn").click(function (ev) {
            event.preventDefault();
            var d = document.getElementById('ind').value;
            db.collection("Doctor 3").doc(d).delete().then(() => {
                alert("Document successfully deleted!");
                $("#t").load(window.location.href + " #t");
            }).catch((error) => {
                alert.error("Error removing document: ", error);
            });
        });

        $("#delete-button").click(function () {
            $(".d").slideToggle();
            $(".pre").slideUp();
        });
        $("#prescription-button").click(function () {
            $(".pre").slideToggle();
            $(".d").slideUp();
        });
    });

    function SelectAllData() {
        $("#t").load(window.location.href + " #t");
        var vi = db.collection("Doctor 3");

        vi.get().then((snapshot) => {
            const patient = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                patient.push(data);
            });
            patient.map((vishal) => {
                var fname = vishal.PatientFirstName;
                var lname = vishal.PatientLastName;
                var regno = vishal.RegNo;
                var mail = vishal.Email;
                var appdate = vishal.AppointmentDate;
                var patient = vishal.Patient;
                var symptoms = vishal.Symptoms;
                var gender = vishal.Gender;
                AddItemsToTable(fname, lname, regno, mail, appdate, patient, symptoms, gender,);

            });
        }).catch((error) => {
            // An error happened.
            alert("Error: " + error);
        });
    }
    SelectAllData();
    var stdNo = 0;

    function AddItemsToTable(fname, lname, regno, mail, appdate, patient, symptoms, gender) {

        var tbody = document.getElementById("table1");
        var trow = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");
        var td8 = document.createElement("td");
        var td9 = document.createElement("td");

        td1.innerHTML = ++stdNo;
        td2.innerHTML = fname;
        td3.innerHTML = lname;
        td4.innerHTML = regno;
        td5.innerHTML = mail;
        td6.innerHTML = appdate;
        td7.innerHTML = patient;
        td8.innerHTML = symptoms;
        td9.innerHTML = gender;

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(td5);
        trow.appendChild(td6);
        trow.appendChild(td7);
        trow.appendChild(td8);
        trow.appendChild(td9);
        tbody.appendChild(trow);

    }
}



function update(a) {

    pre = document.getElementById('inp').value;
    r = document.getElementById("inpr").value;

    db.collection(a).doc(r).update(
        {
            prescription: pre

        })
        .then(() => {
            alert("Prescription");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

function prec() {
    if(dac == "d1"){
        update("Doctor 1");
    }
    else if(dac == "d2"){
        update("Doctor 2");
    }
    else if(dac == "d3"){
        update("Doctor 3");
    }
    
}
