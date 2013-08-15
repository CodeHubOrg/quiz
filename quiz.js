
  var MyQuiz = {
      allQuestions : [
          {question: "What's the result of \"typeof typeof(null)\"?",
              choices: ["\"undefined\"","SyntaxError","\"string\"","\"object\"","TypeError"], correctAnswer:2},
                {question: "Are the algorithms of the following checks completely equivalent?: \"typeof foo == 'undefined'\" and \"typeof foo === 'undefined'\"",
              choices: ["Yes","No"], correctAnswer:0},
              {question: "What's the result of \"100['toString']['length']\"?",
              choices: ["100","3","1","8","0"], correctAnswer:2},
               {question: "What's the value of a, when \"var a = (1,5 - 1) * 2\"?",
              choices: ["0.99999999","1","0.5","8","-0.5","4"], correctAnswer:3},
               {question: "What's the result of \"1..z\"?",
              choices: ["SyntaxError","New Range object (equivalent to new Range(1, 'z')) including all numbers and letters","undefined","Error of Range object (incompatible types for range: number and string)","ReferenceError \"z\" is not defined"], correctAnswer:2}    
      ],

    counter: 0,
    score: 0,
    question : document.getElementById("question-inner"),
    choices : document.getElementById("answer-inner"),
    button : document.getElementById("submit"),
    form : document.forms[0],
    alertbox : document.getElementById("alertbox"),
    missing : false,

    nextQuestion : function(){

        if(this.alertbox.hasChildNodes()) {
            this.alertbox.removeChild(this.alertbox.firstChild);
        }

        // check if answer selected, but only if choices available
        if(this.choices.childNodes[0].hasChildNodes()){   // this checks if choices present            
            this.missing = MyQuiz.checkMissing();
        } else {
            var element = document.getElementById("starttext");
            element.parentNode.removeChild(element);
        }


        // if answer has been selected move to next question; add score
        if(this.missing != true) {

            // checking again if choices present
            if(this.choices.childNodes[0].hasChildNodes()){
                this.result = this.allQuestions[this.counter].correctAnswer.toString();
                if(this.checkValue(this.result) == true){
                     this.score += 1;

                    this.alert = document.createElement("div");
                    this.alert.setAttribute("id", "correct");
                    this.alert.innerHTML = '<div class="inner">Correct!</div>';
                    this.alertbox.appendChild(this.alert);
                }  else {
                    this.alert = document.createElement("div");
                    this.alert.setAttribute("id", "incorrect");
                    this.alert.innerHTML = '<div class="inner">Sorry, incorrect!</div>';
                    this.alertbox.appendChild(this.alert);
                }

                this.counter += 1;
            }


            this.quizlen = this.allQuestions.length;
            if(this.counter < this.quizlen){

                this.newquestion = document.createTextNode(this.allQuestions[this.counter].question);
                this.question.replaceChild(this.newquestion, this.question.firstChild);

                this.answers = '';
                this.answerarray = this.allQuestions[this.counter].choices;
                for(var i = 0; i < this.answerarray.length; i++){
                     this.answers += '<input value = "'+i+'" id="question'+i+'" name="rad_question" type ="radio">';
                     this.answers += '<label for ="question'+i+'" > '+this.answerarray[i]+'</label><br />';
                }

                this.newanswers = document.createElement('div') ;
                this.newanswers.innerHTML = this.answers;
                this.choices.replaceChild(this.newanswers, this.choices.firstChild);

            }  else {


                this.endtext = document.createElement('strong')
                this.endtext.innerHTML = 'End of quiz!';
                this.question.replaceChild(this.endtext, this.question.firstChild);

                this.scoretext ='Your score is '+this.score+' out of '+this.allQuestions.length+' points';
                this.scoreel = document.createTextNode(this.scoretext);
                this.choices.replaceChild(this.scoreel, this.choices.firstChild);

                this.button.parentNode.removeChild(this.button);
            }
        }
    },

    checkValue : function(result){
        // if(this.form.elements["rad_question"].value === result){    <- doesn't work in Firefox
          if(this.getRadioValue() === result){
          return true;
        }
    },
    
    getRadioValue : function(){
        var rad = this.form.rad_question;
        for (var i=0; i < rad.length; i++){
           if (rad[i].checked){
              return rad[i].value;
           }
         }
        return "";
    },

    checkMissing : function(){
       // if(this.form.elements["rad_question"].value === "") {
          if(this.getRadioValue() === ""){
           this.alert = document.createElement("div");
           this.alert.setAttribute("id", "alert");
           this.alert.innerHTML = '<div class="inner">Please select an answer!</div>';
           this.alertbox.appendChild(this.alert);
           return true;
        }  else {
            return false;
        }
    }


  }

  //MyQuiz.nextQuestion();

  MyQuiz.button.onclick = function(e){
      e.preventDefault();
      MyQuiz.nextQuestion();
  }


