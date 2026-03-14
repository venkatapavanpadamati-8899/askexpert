console.log("AskExpert Website Loaded Successfully");


/* ------------------------------
FAKE USER DETECTION
--------------------------------*/

function detectFakeUsers(users){

let fakeUsers=[];
let seenEmails=new Set();

users.forEach(user=>{

let isFake=false;

if(user.name.length < 3){
isFake=true;
}

if(user.email.includes("test") || user.email.includes("fake")){
isFake=true;
}

if(!user.email.includes("@")){
isFake=true;
}

if(isFake && !seenEmails.has(user.email)){
fakeUsers.push(user);
seenEmails.add(user.email);
}

});

return fakeUsers;

}



/* ------------------------------
FAKE EXPERT DETECTION
--------------------------------*/

function detectFakeExperts(experts){

return experts.filter(expert => expert.rating < 2);

}



/* ------------------------------
SPAM QUESTION DETECTION
--------------------------------*/

function detectSpam(question){

let spamWords=["loan","crypto","money","click","earn","free"];

for(let word of spamWords){

if(question.toLowerCase().includes(word)){
return true;
}

}

return false;

}



/* ------------------------------
TOXIC LANGUAGE DETECTION
--------------------------------*/

function detectToxic(text){

let badWords=["idiot","stupid","fake","nonsense"];

return badWords.some(word => text.toLowerCase().includes(word));

}



/* ------------------------------
FRAUD SCORE SYSTEM
--------------------------------*/

function fraudScore(user){

let score=0;

if(user.email.includes("fake")) score+=50;

if(user.questions && user.questions > 50) score+=20;

return score;

}



/* ------------------------------
REGISTER USER
--------------------------------*/

function registerUser(){

let name = document.getElementById("name").value.trim();
let email = document.getElementById("email").value.trim();
let password = document.getElementById("password").value.trim();
let phone = document.getElementById("phone").value.trim();
let type = document.getElementById("accountType").value;
let profession = document.getElementById("profession").value;
let course = document.getElementById("course").value;

if(name=="" || email=="" || password==""){
alert("Please fill all required fields");
return false;
}

/* Email validation */

let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){
alert("Enter valid email");
return false;
}

/* Password validation */

if(password.length < 6){
alert("Password must be at least 6 characters");
return false;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

/* Duplicate email check */

for(let i=0;i<users.length;i++){

if(users[i].email === email){

alert("Email already registered");

return false;

}

}

/* Create user */

let user = {

name:name,
email:email,
password:password,
phone:phone,
type:type,
profession:profession,
course:course,
questions:0

};

users.push(user);

/* Fake user detection */

let fakeUsers = detectFakeUsers(users);

if(fakeUsers.length>0){

console.log("⚠ Fake users detected:",fakeUsers);

}

localStorage.setItem("users",JSON.stringify(users));

alert("Registration Successful");

window.location.href="login.html";

return false;

}



/* ------------------------------
LOGIN USER
--------------------------------*/

function loginUser(){

let email = document.getElementById("loginEmail").value;
let password = document.getElementById("loginPassword").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let found=false;

for(let i=0;i<users.length;i++){

if(users[i].email===email && users[i].password===password){

localStorage.setItem("currentUser",JSON.stringify(users[i]));

found=true;

break;

}

}

if(found){

alert("Login Successful");

window.location.href="dashboard.html";

}else{

alert("Invalid Email or Password");

}

return false;

}



/* ------------------------------
LOGOUT
--------------------------------*/

function logoutUser(){

localStorage.removeItem("currentUser");

alert("Logged Out");

window.location.href="index.html";

}



/* ------------------------------
ASK QUESTION
--------------------------------*/

function submitQuestion(){

let question=document.getElementById("question").value.trim();
let profession=document.getElementById("professionSelect").value;

if(question==""){

alert("Please enter your question");

return;

}

/* Spam detection */

if(detectSpam(question)){

alert("🚫 Spam question detected");

return;

}

/* Toxic language detection */

if(detectToxic(question)){

alert("⚠ Toxic language detected");

return;

}

let questions = JSON.parse(localStorage.getItem("questions")) || [];

let user = JSON.parse(localStorage.getItem("currentUser"));

let newQuestion={

question:question,
profession:profession,
askedBy:user ? user.name : "Anonymous",
date:new Date().toLocaleString()

};

questions.push(newQuestion);

localStorage.setItem("questions",JSON.stringify(questions));

/* Update user question count */

if(user){

user.questions = (user.questions || 0) + 1;

localStorage.setItem("currentUser",JSON.stringify(user));

}

alert("Question Submitted Successfully");

document.getElementById("question").value="";

}



/* ------------------------------
SHOW QUESTIONS
--------------------------------*/

function loadQuestions(){

let questions = JSON.parse(localStorage.getItem("questions")) || [];

let container=document.getElementById("questionsList");

if(!container) return;

container.innerHTML="";

for(let i=0;i<questions.length;i++){

let q=questions[i];

let div=document.createElement("div");

div.style.padding="10px";
div.style.border="1px solid #ccc";
div.style.marginBottom="10px";
div.style.borderRadius="8px";
div.style.background="#f9f9f9";

div.innerHTML=

"<b>Question:</b> "+q.question+"<br>"+
"<b>Profession:</b> "+q.profession+"<br>"+
"<b>Asked By:</b> "+q.askedBy+"<br>"+
"<small>"+q.date+"</small>";

container.appendChild(div);

}

}



/* ------------------------------
SHOW CURRENT USER PROFILE
--------------------------------*/

function loadProfile(){

let user = JSON.parse(localStorage.getItem("currentUser"));

if(!user) return;

document.getElementById("profileName").innerText=user.name;
document.getElementById("profileEmail").innerText=user.email;
document.getElementById("profileType").innerText=user.type;

}



/* ------------------------------
ADMIN FRAUD CHECK
--------------------------------*/

function checkFraudUsers(){

let users = JSON.parse(localStorage.getItem("users")) || [];

users.forEach(user=>{

let score = fraudScore(user);

if(score>=50){

console.log("⚠ Possible Fraud User:",user);

}

});

}
