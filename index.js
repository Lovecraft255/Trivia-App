import {data} from "./data.js"

if(window.location.pathname == "/intro.html"){

    let startBtn = document.getElementById("startBtn");

    console.log(startBtn);
    

    startBtn.addEventListener( "click" , () => {

        let userName = document.getElementById("userName").value

        if(userName == "" || userName == null){
            alert("No se ingreso nombre de usuarion");
            console.log(userName);
        }else{
            console.log(userName);
            localStorage.setItem( "UserName" , JSON.stringify(userName) );
            window.location.replace("/quest.html");
        }

    });

}

if(window.location.pathname == "/quest.html"){

    let questionDiv = document.getElementById("question");
    let answersDiv = document.getElementById("answers");
    console.log( questionDiv );

    console.log( answersDiv );
    
}