function register(){

const user={

pseudo:
pseudo.value,

email:
email.value,

password:
password.value,

avatar:
avatar.value

}

localStorage.setItem(
"user",
JSON.stringify(user)
)

location="login.html"

}



function login(){

const user=
JSON.parse(
localStorage.getItem("user")
)

if(

email.value===user.email

&&

password.value===user.password

){

localStorage.setItem(
"connected",
"1"
)

location="index.html"

}

}



window.onload=()=>{

const user=
JSON.parse(
localStorage.getItem("user")
)

if(

localStorage.getItem("connected")

&&

user

){

userArea.innerHTML=`

<img
src="${user.avatar}"
class="avatar">

${user.pseudo}

`

}

}
