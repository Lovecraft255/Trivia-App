import { data } from "./data.js"

if (window.location.pathname == "./index.html") {

    let startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", () => {

        let userName = document.getElementById("userName").value

        if (userName == "" || userName == null) {
            alert("No se ingreso nombre de usuarion");
            console.log(userName);
        } else {
            console.log(userName);
            localStorage.setItem("UserName", JSON.stringify(userName));
            window.location.replace("/quest.html");
        }
    });

}

if (window.location.pathname == "./quest.html") {

    let questionDiv = document.getElementById("question");
    let answersDiv = document.getElementById("answers");

    let a0Div = document.getElementById("0");
    let a1Div = document.getElementById("1");
    let a2Div = document.getElementById("2");
    let a3Div = document.getElementById("3");

    let a0Id = a0Div.getAttribute("id");
    let a1Id = a1Div.getAttribute("id");
    let a2Id = a2Div.getAttribute("id");
    let a3Id = a3Div.getAttribute("id");

    const answersId = [];

    function* generador(data) {
        console.log("comenzó");
        for (const dat of data) {
            yield dat;
        }
    }

    const generarData = generador(data);

    let { value, done } = generarData.next();

    questionDiv.textContent = value.question;
    a0Div.textContent = value.answers[a0Id];
    a1Div.textContent = value.answers[a1Id];
    a2Div.textContent = value.answers[a2Id];
    a3Div.textContent = value.answers[a3Id];

    console.log(value);

    answersDiv.addEventListener("click", (e) => {
        let targetId = e.target.getAttribute("id");

        if (targetId == a0Id || targetId == a1Id || targetId == a2Id || targetId == a3Id) {

            if (!done) {

                answersId.push(parseInt(targetId));
                var obj = generarData.next();
                value = obj.value;
                done = obj.done;

                questionDiv.textContent = value.question;
                a0Div.textContent = value.answers[a0Id];
                a1Div.textContent = value.answers[a1Id];
                a2Div.textContent = value.answers[a2Id];
                a3Div.textContent = value.answers[a3Id];

            } else if (done) {
                localStorage.setItem("AnswersId", JSON.stringify(answersId));
                window.location.replace("/result.html");
            }
        }
    })
    console.log("terminó");
}

if (window.location.pathname == "/result.html") {

    let resultDiv = document.getElementById("results");
    let userInfoDiv = document.getElementById("userInfo");
    let getAID = localStorage.getItem("AnswersId");
    let getUserName = localStorage.getItem("UserName");

    let userNameText = document.createElement("h4");
    let userPoints = document.createElement("h4");

    const UserName = JSON.parse(getUserName);
    const answersId = JSON.parse(getAID);

    console.log(userInfoDiv);



    let puntaje = 0;

    for (let i = 0; i <= 9; i++) {

        let resultAnswerDiv = document.createElement("div");
        let userAnswer = document.createElement("h4");
        let correctAnswer = document.createElement("h4");

        let answerUser = answersId[i];

        let answerCorrect = data[i].correctAnswer;

        if (data[i].correctAnswer == answersId[i]) {

            userAnswer.textContent = "Respuesta del usuario: " + data[i].answers[answerUser];
            correctAnswer.textContent = "Respuesta correcta: " + data[i].answers[answerCorrect];

            console.log(userAnswer);
            console.log(correctAnswer);

            resultAnswerDiv.append(userAnswer);
            resultAnswerDiv.append(correctAnswer);

            resultAnswerDiv.setAttribute("class", "correctAnswerClass");

            resultDiv.append(resultAnswerDiv);

            puntaje++;

            console.log(puntaje);

        } else if (data[i].correctAnswer != answersId[i]) {

            userAnswer.textContent = "Respuesta del usuario: " + data[i].answers[answerUser];
            correctAnswer.textContent = "Respuesta correcta: " + data[i].answers[answerCorrect];

            console.log(userAnswer);
            console.log(correctAnswer);

            resultAnswerDiv.append(userAnswer);
            resultAnswerDiv.append(correctAnswer);

            resultAnswerDiv.setAttribute("class", "wrongAnswerClass");

            resultDiv.append(resultAnswerDiv);

        }
    }

    if (puntaje >= 5) {

        userNameText.textContent = "Felicidades " + UserName + " ganaste el quest";
        userPoints.textContent = "Tu puntaje es de " + puntaje + " puntos";

        userInfoDiv.append(userNameText);
        userInfoDiv.append(userPoints);

    } else {

        userNameText.textContent = "Lastima " + UserName + " perdiste el quest";
        userPoints.textContent = "Tu puntaje es de " + puntaje + " puntos";

        userInfoDiv.append(userNameText);
        userInfoDiv.append(userPoints);

    }


}