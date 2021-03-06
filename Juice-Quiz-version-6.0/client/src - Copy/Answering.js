import React from 'react';
import { Component } from 'react';
import Axios from "axios";
import './answer_question.css';

import {Link} from "react-router-dom";
export default class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			data:"",
			currentQuestion: 0,
			showScore: false,
			currentScore: 0,
			ques: [],
			queslength: 0,
			quesText: "",
			opt1: "",
			opt2: "",
			opt3: "",
			opt4: "",
			answerOptions: [],
			QID: localStorage.getItem('QID'),
			PID: localStorage.getItem('PID'),
			is_Mount:false,
			hour:0,
			minute:10,
      		second:0,
			TimeLimitFlag:true, 
			timeSpend:0,
			date:"",
			confirmFlag:false
		};
		this.start = this.start.bind(this)
        this.no = this.no.bind(this) 
		
	}


	
	start(){
         if(this.state.second>0){
	       this.setState({
			minute:this.state.minute,
			second:this.state.second - 1
		  }) 
	
		}
	 else{
	
		   this.setState({
			minute:this.state.minute - 1,
			second:this.state.second + 60
		  }) 
	
		}
	   this.setState({timeSpend: this.state.timeSpend+1})
	  }
	
	  no(){
		  if(this.state.TimeLimitFlag){
          this.id = setInterval(this.start,1000)
		  }
		
	  } 
	 
	  checkTime(){ 
		
		  if(!this.state.showScore&&this.state.minute+this.state.second<=0){
			  this.setState({showScore:true})
			 
			
		  }

		  
	  }
	componentDidMount = () => {
		this.get_time();
         const url = `https://juice-quiz.herokuapp.com/api/answer/${this.state.QID}`;
		//const url= `http://localhost:3001/api/answer/${this.state.QID}`;
		console.log("Component did mount")
        Axios.get(url)
		.then(res=>{return res.data})
		.then( result =>{ 
			console.log(result);
			this.setState({data:result},()=>{console.log(this.state.data);});
			this.processData()       
		 });

    
	}
    

	get_time(){
		const url = `https://juice-quiz.herokuapp.com/api/answer/time/${this.state.QID}`;
		//const url= `http://localhost:3001/api/answer/time/${this.state.QID}`;
        Axios.get(url)
		.then(res=>{return res.data})
		.then( result =>{ 
			console.log(result[0]['TakeTime']);
			var time =result[0]['TakeTime'];
			var min=parseInt(time / 60);
			var sec = time-min*60;

			
			this.setState({time:result[0]['TakeTime']});	
			this.setState({second:sec})	 
			this.setState({minute:min})	 
			console.log(this.state.minute)
			console.log(this.state.second)     
		 });


	}



	processData = () => {

	
		console.log(this.state.data);
		var data= this.state.data
		this.setState({ queslength: data.length/4 });
		let index = this.state.currentQuestion*4;
		console.log(index);
		console.log(this.state.queslength);
		console.log("processing");
		this.setState({ quesText: data[index]['Qtext'] });
		console.log(this.state.quesText)
		var option1 = {'text':data[index]['Optionx'],'correctness':data[index]['correctness']};
		var option2 = {'text':data[index+1]['Optionx'],'correctness':data[index+1]['correctness']};
		var option3 = {'text':data[index+2]['Optionx'],'correctness':data[index+2]['correctness']};
		var option4 = {'text':data[index+3]['Optionx'],'correctness':data[index+3]['correctness']};
		
		this.setState({ opt1: option1 });
		this.setState({ opt2: option2 });
		this.setState({ opt3: option3 });
		this.setState({ opt4: option4 });
		this.setState({ answerOptions: [option1, option2, option3, option4] });
		console.log(this.state.answerOptions);
		this.no()
	}


	handleNextQuestion = (answerOption) => {
			var is_Mount=false;
			var currentQuestion = this.state.currentQuestion;
			console.log('handler');
			var isCorrect = false;
			if (answerOption["correctness"] === 1) { isCorrect = true; }
	
			var currentScore = this.state.currentScore;
			var questlen = this.state.queslength;
	
			
			const nextQuestion = currentQuestion+1;
			console.log(nextQuestion);
			console.log('questlen');
			this.setState({ currentQuestion: nextQuestion },()=>{;
			if (nextQuestion < questlen) {
				if (isCorrect) {
					currentScore = currentScore + 1;
					this.setState({ currentScore: currentScore });
					
				}
	            this.processData()
				
			} else {
				if (isCorrect) {
					currentScore = currentScore + 1;
					this.setState({ currentScore: currentScore })
				}
				this.setState({ showScore: true });
			};
			
			});
			if(this.state.currentQuestion==this.state.queslength-1){
				 
			}
		
		
	}
			 
   


	addHistory() {
				 const url = `https://juice-quiz.herokuapp.com/api/answer/updateHIS/${this.state.QID}`;
	         //const url= `http://localhost:3001/api/answer/updateHIS/${this.state.QID}`;
				Axios.post(url,{
					UID:localStorage.getItem('UID'),
					Score: this.state.currentScore/this.state.queslength,
					timeSpend: this.state.timeSpend,
					Date: this.state.date
			  }).then((response) => { 
				console.log(response); 
			 })
		
		}




	addRep=()=>{
		
		 const timestamp = Date.now();
		 const record=new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp);
		 this.setState({date:record})
	 	console.log(this.state.date) 
 
			 const url = `https://juice-quiz.herokuapp.com/api/answer/updateRep/${this.state.QID}`;
	      	//const url= `http://localhost:3001/api/answer/updateRep/${this.state.QID}`;
			Axios.put(url,{
				PID:this.state.PID,
				UID:localStorage.getItem('UID')
		  }).then((response) => {  
			
		 })
		this.addHistory()
		this.setState({confirmFlag:true})
		 }


	render() {
		this.checkTime();
		return (
			<div className='answering'>
				{this.state.showScore ? (
					<div>

<div className='score-section'>Finished</div>
							{/* state={{id:1}} */}
							{/* <Link to={  '/quizRate'}  onClick={()=>this.addRep()}> 
							Submit<button  onClick={()=>this.addRep()>Submit</button>
			</Link> */}

  
{!this.state.confirmFlag&&<button onClick={()=>this.addRep()}>confirm</button>}
{this.state.confirmFlag&&<Link   to ={{
    pathname: "/quizRate", 
    state: { 
       abb:1
    }
   }}  >
 	 Submit   
</Link> }
					</div>
				) : (
					<>
						<div className='question-section'>
							<div className='question-count'>
								<span style={{color:"black"}}>Question {this.state.currentQuestion + 1} </span>/{this.state.queslength}
							</div>
							<div className='question-text'>{this.state.quesText}</div>
						</div>
						<div className='answer-section'>
							{this.state.answerOptions.map((answerOption) =>
								<button classname='answering_Btn' onClick={() => this.handleNextQuestion(answerOption)}>{answerOption['text']}</button>
							)}
						</div>
						<div>
								{this.state.TimeLimitFlag&&	<div className="Timer_container">
								Time remain: {this.state.minute}m : {this.state.second}s
								</div>
 }
							

								</div>
 
					</>
				)}
				
			</div>
		);
	}
}
