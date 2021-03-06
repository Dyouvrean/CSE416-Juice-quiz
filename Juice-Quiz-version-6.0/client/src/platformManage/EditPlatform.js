import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import './EditPlatform.css'; 
import Axios from "axios";   

import {Button, Card} from 'react-bootstrap';

    export default class EditPlatform extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false,   
              name:"",
              tag:"music",
              namechange:false,
              tagchange:false,
              oneOnwer:false,
              requireReputation:0,
              repchange:false,
              EPID:localStorage.getItem('EditPID'),
              success:false,
              file:'',
              validFlag:false
            };    
          }
        handleChangeName(e) {   
	      this.checkValid()
            this.setState({name: e.target.value}); 
            this.setState({namechange:true});  
        }
     
        handleChangeTag(e) {  
        this.setState({tag: e.target.value});  
        this.setState({tagchange:true}); 
        }

        handleChangeOnwer(e)   { 
          this.setState({oneOnwer:!this.state.oneOnwer}); 
        }

        handleReputation(e){
          
	this.checkValid()
            this.setState({requireReputation: e.target.value}); 
            console.log(this.state.requireReputation)
            this.setState({repchange:true});  
        }

       updateName(){
      const url = `https://juice-quiz.herokuapp.com/api/EditPlatform/name/${this.state.name}`;
          //  const url= `http://localhost:3001/api/EditPlatform/name/${this.state.name}`;
        Axios.put(url,{PID:this.state.EPID}).then((response) => { 
      console.log(response); 
      }
      )
    }
    updateTag(){
     const url = `https://juice-quiz.herokuapp.com/api/EditPlatform/tag/${this.state.tag}`;
      //   const url= `http://localhost:3001/api/EditPlatform/tag/${this.state.tag}`;
      
    Axios.put(url,{PID:this.state.EPID}).then((response) => { 
    console.log(response); 
    }
    )
  }
  updateRep(){
     const url = `https://juice-quiz.herokuapp.com/api/EditPlatform/replimit/${this.state.replimit}`;
      //const url= `http://localhost:3001/api/EditPlatform/replimit/${this.state.replimit}`;
    
  Axios.put(url,{PID:this.state.EPID}).then((response) => { 
  console.log(response); 
  }
  )
}





       
handlefileSelected (event){

  const files = event.target.files[0]
  this.setState({file:files})
}


postImage(image, name) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("name", name)
  const url=`https://juice-quiz.herokuapp.com/images/${this.state.PID}`;
  //const url=`http://localhost:3001/images/${this.state.PID}`;

  const result = Axios.post(url, formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}
uploadIcon(event){
  console.log("working")
  event.preventDefault()
  const result =  this.postImage(this.state.file, this.state.name)
}


checkValid(){
  if(this.state.name==''||this.state.option==''||this.state.requireReputation<=0){
  return false
  }else{
    this.setState({validFlag:true})
    return true
  }
}
submit(e){       
     const url = 'https://juice-quiz.herokuapp.com/api/createplatform';
      //const url= 'http://localhost:3001/api/createplatform';
    if(this.checkValid()){
     Axios.post(url, { 
            Pname: this.state.name, 
            tag: this.state.tag, 
            replimit:this.state.requireReputation, 
       }).then((res)=>{return res.data})
       .then((response) => { 
         this.setState({PID:response['PID']});
         this.setState({success:response['success']});
       }); 
     if (this.state.success){
      this.uploadIcon(e)
      this.own();
      this.inital_reputation();
      alert("Platform Created!") 
     }}
      
     }
    
render(){ 
        
   
	return (
		<>
		 
		<div className='EPeditBoard'>
    <div>
            
            <div className='signUpBoard'>
            <Link to='/'>
            <button className="cancel"   >X</button> </Link>
                 

            <label className='SIGNUP'>Manage Platform</label> 
                <div className="userInput">    
                <label className='EPeditInput'>Platform Name:  
                <input type={"text"} style={{width:"480px",marginLeft:'0px'}} value={this.state.name} onChange={this.handleChangeName.bind(this)}></input>
          </label> 
                  </div>
                   
                
                   
                  <div className="userInput">    
                        <label className='EPeditInput'>  Select tag:
                        <select value={this.state.tag} onChange={this.handleChangeTag.bind(this)}>
                        <option value="music">music</option>
                          <option value="sport">sport</option>
                          <option value="programing">programing</option>
                          <option value="science">science</option>
                          <option value="food">food</option>
                          <option value="movie">movie</option> 
                          <option value="game">game</option>
                          <option value="culture">culture</option>  
                          <option value="math">math</option> 
                        </select>
                      </label>
                </div>
                <div className="userInput">    
                        
                        <label  className='EPeditInput'> Allow co-owenr application
                
                <select value={this.state.value} onChange={this.handleChangeOnwer.bind(this)}>
                    <option value="true">Yes</option>
                    <option value="false">no</option> 
                  </select>
                  </label>
                                </div>


{
 !this.state.oneOnwer&& <div className="userInput">    
                                <label className='EPeditInput'>  reputation need
          <input type="number" value={this.state.requireReputation} style={{width:"180px",marginLeft:'0px'}} onChange={this.handleReputation.bind(this)}></input>
 
        </label> 
          </div> 
}
                
                <div className="userInput">     
                <input onChange={this.handlefileSelected.bind(this)} type="file" accept="image/*"></input> </div>

                <div className="userInput">     
               
    { this.state.validFlag&&<Link to='/' > 
     <Button className='EPsubmit' style={{background:'white',color:"#F78223",border:"none"}} onClick={(e)=>this.submit(e)}>Save</Button>
               </Link>}
               
               
                </div>
              
        
               
                  </div>

                 
                  </div>
  
	 
			  </div>

			  </>
			  
	);
  
}

}