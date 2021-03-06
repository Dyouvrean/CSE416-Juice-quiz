import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap'; 
import Axios from "axios";  
import './quizEditAfter.css'
const initQuestions=   [
  {
      questionText: '',
      answerOptions: [
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: true },
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: false },
      ],
      key:0
  },
]
    export default class quizEdit extends Component {

    
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"Description",
              description:"",
              PID:0,
              QID:localStorage.getItem('QID'),
              success:true,
              currentQuestion:0,
              questions:initQuestions , 
              origin:initQuestions,
              option1:"",
              option2:"",
              option3:"",
              option4:"",
              add:[],
              delete:[],
              modify:[]
            };    
           
          }
        
      
          componentDidMount = () => {
           const url = `https://juice-quiz.herokuapp.com/api/answer/${this.state.QID}`;
        //  const url= `http://localhost:3001/api/answer/${this.state.QID}`;
            Axios.get(url)
        .then(res=>{return res.data})
        .then( result =>{ 
          // console.log(result);
          this.setState({data:result},()=>{console.log(this.state.data);});
          this.processData()       
         });
    
        
      }

      processData = () => {
        this._isMounted = true;
        // console.log(this.state.data);
        var data= this.state.data
        this.setState({ queslength: data.length/4 });
        
        // console.log(index);
        // console.log(this.state.queslength);
        // console.log("processing");

        for (var index=0; index< (data.length/4) ;index++){
        this.setState({ quesText: data[index*4]['Qtext'] });
        // console.log(this.state.quesText)
        var option1 = {'answerText':data[index*4]['Optionx'],'isCorrect':data[index*4]['correctness']==1};
        var option2 = {'answerText':data[index*4+1]['Optionx'],'isCorrect':data[index*4+1]['correctness']==1};
        var option3 = {'answerText':data[index*4+2]['Optionx'],'isCorrect':data[index*4+2]['correctness']==1};
        var option4 = {'answerText':data[index*4+3]['Optionx'],'isCorrect':data[index*4+3]['correctness']==1};
        
        this.setState({ opt1: option1 });
        this.setState({ opt2: option2 });
        this.setState({ opt3: option3 });
        this.setState({ opt4: option4 });
        this.setState({ answerOptions: [option1, option2, option3, option4] });
        var q= {
          questionText: this.state.quesText,
          answerOptions: this.state.answerOptions,
          key:index
      };
      this.setState({questions:[...this.state.questions,q]})
    }
      this.setState({questions:this.state.questions.slice(1)})
      this.setState({origin:this.state.questions})
      }
    
    








        handleChangeAnswerText1(e) {    
          let tmp = [...this.state.questions];       
          tmp[this.state.currentQuestion].answerOptions[0].answerText=e.target.value 
            this.setState({ tmp });      
          
        }
     
        handleChangeAnswerText2(e) {    
          let tmp = [...this.state.questions];       
          tmp[this.state.currentQuestion].answerOptions[1].answerText=e.target.value 
            this.setState({ tmp });      
          
        }

        handleChangeAnswerText3(e) {    
          let tmp = [...this.state.questions];       
          tmp[this.state.currentQuestion].answerOptions[2].answerText=e.target.value 
            this.setState({ tmp });      
          
        }

        handleChangeAnswerText4(e) {    
          let tmp = [...this.state.questions];       
          tmp[this.state.currentQuestion].answerOptions[3].answerText=e.target.value 
            this.setState({ tmp });      
          
        }
        handleChangeDiscription(e) {   
    let tmp = [...this.state.questions];       
    tmp[this.state.currentQuestion].questionText=e.target.value 
      this.setState({ tmp });      
    

        }

       
        
        setAsAnswer(index){ 
        let tmp = [...this.state.questions];       
        tmp[this.state.currentQuestion].answerOptions.forEach(element => {
          element.isCorrect=false
         });
        
        tmp[this.state.currentQuestion].answerOptions[index].isCorrect = true;  
          this.setState({ tmp });    
        // console.log(tmp[this.state.currentQuestion].answerOptions[index].isCorrect)     
        }
        
        
        
        //sun
        submit(){  
          
            if (this.state.origin.length<this.state.questions.length){
              this.insert();
            }
            else if(this.state.origin.length>this.state.questions.length){
             this.delete();
            }
           
            this.update();        
    
    }



         insert(){
           var question=[]
          for(var i= this.state.origin.length+1; i<=this.state.questions.length; i++){
            question.push({
              questionText: ' ',
              answerOptions: [
                  { answerText: ' ', isCorrect: true },
                  { answerText: ' ', isCorrect: false },
                  { answerText: ' ', isCorrect: false },
                  { answerText: ' ', isCorrect: false },
              ],
              key:i
          })
          }
          // console.log(question);
        
            const url = 'https://juice-quiz.herokuapp.com/api/quizsetEdit/insert';
          //  const url= 'http://localhost:3001/api/quizsetEdit/insert';
                  
            Axios.post(url, { 
                QID: localStorage.getItem('QID'), 
                questions:question 
})
}


            delete(){
              var del=[]
              for(var i= this.state.questions.length+1; i<=this.state.origin.length; i++){
                del.push(i)
              }
              // console.log(del);
                  const url = 'https://juice-quiz.herokuapp.com/quizsetEdit/delete';
              //const url= 'http://localhost:3001/api/quizsetEdit/delete';
                      
                Axios.delete(url, { data:{
                  QID: localStorage.getItem('QID'), 
                  del:del }
                    
    })             
            }

 
       update(){
  const url = `https://juice-quiz.herokuapp.com/api/quizsetEdit/change`;
// const url= `http://localhost:3001/api/quizsetEdit/change`;
     console.log(this.state.questions);
 Axios.put(url,{QID:localStorage.getItem('QID'),
  question:this.state.questions
  
}).then((response) => { 
//  console.log(response); 
 }
 )




      }
            
      switchQuestion(index){  
       this.setState({currentQuestion:index})
        // console.log(this.state.currentQuestion)
        
        // console.log(this.state.questions[this.state.currentQuestion].questionText+"index1")
        
      }
       
      checkBoard(){ 
          
        let tmp=false
       
         this.state.questions.forEach(element => {
           console.log( element.questionText +", "+
           element.answerOptions[0].answerText +", "+
           element.answerOptions[1].answerText+", "+
           element.answerOptions[2].answerText +", "+
           element.answerOptions[3].answerText)
           console.log( element.questionText===""||
           element.answerOptions[0].answerText===""||
           element.answerOptions[1].answerText===""||
           element.answerOptions[2].answerText===""||
           element.answerOptions[3].answerText==="")
         tmp= tmp||element.questionText===""||
          element.answerOptions[0].answerText===""||
          element.answerOptions[1].answerText===""||
          element.answerOptions[2].answerText===""||
          element.answerOptions[3].answerText===""
          if( tmp
         ) {  
          // alert("empty field in questions!")  
         } 
        });
        console.log("tmp: "+tmp)
        return tmp
      }



    

  

   discriptionContent(){
    //  console.log(this.state.questions)
     let description=this.state.questions[this.state.currentQuestion].questionText
     return(
      <textarea    value={description}
      className="questionDiscription" rows="5" cols="50" required onChange={this.handleChangeDiscription.bind(this)} > 
 </textarea>
     )
   }


   addNewQuestion(){
  this.setState({ questions: [...this.state.questions, {
    questionText: ' ',
    answerOptions: [
        { answerText: ' ', isCorrect: true },
        { answerText: ' ', isCorrect: false },
        { answerText: ' ', isCorrect: false },
        { answerText: ' ', isCorrect: false },
    ],
    key:this.state.questions.length
}] })  

 
   }

   deleteCurrentQuestion(){ 
     let tmp=[]; 
     for (let i = 0; i <  this.state.questions.length; i++) {

      if(this.state.questions[i].key!=this.state.currentQuestion){ 
        tmp=[...tmp,this.state.questions[i]] ;  
       }
    }
  
    for (let i = 0; i <  tmp.length; i++) {
    tmp[i].key=i 
    // console.log(tmp[i].key)
    } 
     this.setState({ questions:tmp})  
    this.setState({ currentQuestion:0})
   }

render(){  
   
	return (
		<>
        <span>
      
		 <div className='editQuizeditBoard'> 
         <img src="/logo.jpg" className="quizInitIcon"></img>  
        <div className="editQuestionList">
        {this.state.questions.map((item, index) => {
           console.log( this.state.currentQuestion==index)
                return (  
                   this.state.currentQuestion==index&&  <button style={{color:"black"}} type="button" onClick={()=>this.switchQuestion(item.key)}>{item.key+1}</button> || <button style={{color:"white"}} type="button" onClick={()=>this.switchQuestion(item.key)}>{item.key+1}</button> 
                );
              })}
               <button  style={{color:"white"}} type="button" onClick={()=>this.addNewQuestion()} >+</button> 
        </div>
        

         <div className="editContent">
        <form onSubmit={this.handleSubmit} className="QEAeditForm">
             
     
      <label className='editInput'  > {this.state.name}
        </label>   
 

      {  this.discriptionContent()
              } 
 

  
        <input value={this.state.questions[this.state.currentQuestion].answerOptions[0].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText1.bind(this)}>
     
          </input>  
      {!this.state.questions[this.state.currentQuestion].answerOptions[0].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(0)} >set as answer</button>  ||<label style={{display:"inline-block"}}>???</label>
      }  
 
        <input value={this.state.questions[this.state.currentQuestion].answerOptions[1].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText2.bind(this)}>
     
     </input>  
        {!this.state.questions[this.state.currentQuestion].answerOptions[1].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(1)} >set as answer</button> ||<label>???</label>
      } 
       
 
        <input value={this.state.questions[this.state.currentQuestion].answerOptions[2].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText3.bind(this)}>
     
     </input> 
            {!this.state.questions[this.state.currentQuestion].answerOptions[2].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(2)} >set as answer</button>  ||<label>???</label>
      }  
 
        <input value={this.state.questions[this.state.currentQuestion].answerOptions[3].answerText} type="text"   className="editQuizOption" required onChange={this.handleChangeAnswerText4.bind(this)}>
     
     </input> 
           {!this.state.questions[this.state.currentQuestion].answerOptions[3].isCorrect&&<button type="button" className="editButton" onClick={()=>this.setAsAnswer(3)} >set as answer</button>  ||<label>???</label>
      }  


       <div className="editListButton">
       {/* <button className="QEAedit" type="button" onClick={()=>this.addNewQuestion()} >new</button>  */}
       <button className="QEAedit" type="button"  onClick={()=>this.deleteCurrentQuestion()} >delete</button>
       
       

      {!this.checkBoard()&&  <Link to='/'>  
      <button type="button" className="QEAsubmit" onClick={()=>this.submit()} >Submit?</button> 
        </Link> }  
       </div>
        
       </form>
       </div>
         </div>
         </span>
			  </>
			  
	);
  
}

}