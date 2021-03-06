import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap'; 
import Axios from "axios";  
import './quizInit.css'


    export default class EditNewQuiz extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"",
              description:"",
              timeLimited:true,
              limitedHour:0,
              limitedMin:0,
              QID:localStorage.getItem('QID'),
              UID:localStorage.getItem('UID'),
              success:false,
              Repoint:0,
            };    
          }
        
        handleChangeName(e) {  
            this.setState({name: e.target.value});   
        }
        handleChangeRep(e) {  
          this.setState({Repoint: e.target.value});   
      }
     
        handleChangeDiscription(e) {  
        this.setState({description: e.target.value});   
        }

        handleTimeLimited(e)   { 
          this.setState({timeLimited: !this.state.timeLimited});    
          }
         handleTimeHour(e){
            this.setState({limitedHour: e.target.value});    
           
         } 
 
        handleTimeMin(e){
            this.setState({limitedMin: e.target.value});    
        } 
        
        
        submit(){ 
            const url = `https://juice-quiz.herokuapp.com/api/updateQuizdes/${this.state.description}`;
    // const url= `http://localhost:3001/api/updateQuizdes/${this.state.description}`;
     Axios.put(url,{QID:this.state.QID}).then((response) => { 
      console.log(response); 
      }
      )
      }
       
        
   
    
      


render(){ 
        
	
   
	return (
		<>
		 <div className='initQuizeditBoard'>
         <img src="./logo.jpg" className="quizInitIcon"></img> 
        <form onSubmit={this.handleSubmit} className="editForm">
            
    

        <li>
      <label className='editInput'>  Description
        </label>  
      </li>
      <li> 
      <textarea className="quizDiscription" rows="5" cols="50" required onChange={this.handleChangeDiscription.bind(this)}> 
  </textarea>
        </li>
      

       <Link to={'/quizEdit/'+this.state.QID}>
      <button  className="submit" onClick={()=>this.submit()} >UPDATE</button>  
        </Link>
       
       </form>
         </div>
			  </>
			  
	);
  
}

}