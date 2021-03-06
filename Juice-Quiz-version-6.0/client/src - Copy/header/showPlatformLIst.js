import React from 'react';
import { Component } from 'react';  
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import './showPlatformLIst.css' 
import Axios from "axios";  

import {Button, Card} from 'react-bootstrap';

    export default class showPlatformList extends Component {
        constructor(props) {
            super(props);
            this.state = { 
              trigger:false, 
                UID:localStorage.getItem("UID"),
				place:"",
                renderList:[],
				oriList:[],
				co_owner:'',
            };   
       this.get();
          }
  
		  async get(){
			this._isMounted = true;
		  //const url = `https://juice-quiz.herokuapp.com/api/user/subscribed/${this.state.UID}`;
			  const url= `http://localhost:3001/api/user/subscribed/${this.state.UID}`;
		  const res = await Axios.get(url)
		  .then(res=>{return res.data})
		  .then( result =>{
			  if(this._isMounted){
			  //console.log(result);
			  this.setState({places:result},()=>{console.log(this.state.places);});
			  this.setState({renderList:this.state.places});}          
		   });
		    
		}


		 is_coowner(PID){
		
			//const url = 'https://juice-quiz.herokuapp.com/api/platform/coowner';
		   const url= `http://localhost:3001/api/platform/coowner`;
		   var result =  Axios.post(url, {
			  PID : PID,
			  UID: localStorage.getItem("UID"),
			}).then((response) => {
				return response.data["coowner"]
			  //console.log(response.data);
			  this.setState({co_owner: response.data["coowner"]})
			});
		  
	   };
   

   op_subscribe=(PID)=>{
	 //  const url = `https://juice-quiz.herokuapp.com/platform/delSub/${PID}`;
	const url= `http://localhost:3001/api/platform/delSub/${PID}`;
	     
	Axios.delete(url, { data:{UID: localStorage.getItem("UID")}}).then((response) => {  
    this.get();
	}); 
	let tmp=[];
	this.state.renderList.forEach(element => {
		if(element.PID!=PID){

			tmp=[...tmp,element]
		}
	}); 
	this.setState({renderList:tmp})
}

op_uncoown=(PID)=>{
   // const url = `https://juice-quiz.herokuapp.com/api/platform/delCoown/${this.state.PID}`;
	const url= `http://localhost:3001/api/platform/delCoown/${PID}`;
		  Axios.delete(url, { data:{UID: localStorage.getItem("UID")}			
		  }).then((response) => { 
		  console.log(response); 		  
		  }); 		
}

op_delrep=(PID)=>{
	 // const url = `https://juice-quiz.herokuapp.com/api/platform/delRep/${this.state.PID}`;
	  const url= `http://localhost:3001/api/platform/delRep/${PID}`;
		   
			Axios.delete(url, { data:{UID: localStorage.getItem("UID")}  
			}).then((response) => { 
			console.log(response); 
			}); 
			
  }  	
  

 unsubscribe=(PID)=>{
	 console.log(PID)
    const url = 'https://juice-quiz.herokuapp.com/api/platform/owner';
	//	 const url= `http://localhost:3001/api/platform/owner`;
		Axios.post(url, {
		   PID : PID,
		   UID: localStorage.getItem("UID"),
		 }).then((response) => {
		   //console.log(response.data);
		   this.setState({owner: response.data["owner"]})
           var owner = response.data["owner"];
			const url = 'https://juice-quiz.herokuapp.com/api/platform/coowner';
			//const url= `http://localhost:3001/api/platform/coowner`;
			var result =  Axios.post(url, {
			PID : PID,
			UID: localStorage.getItem("UID"),
			}).then((response) => {
			var co_owner = response.data["coowner"]
			console.log(co_owner) 
			console.log(owner) 
			if (owner){
				alert("You can't unsubscribe your own platform!")
			}
			else {
				if (co_owner){
				this.op_delrep(PID);
				this.op_uncoown(PID);	
			    }
			    else{
				this.op_delrep(PID);
			    }
			    this.op_subscribe(PID)
			    }
			});


		       
		});

}

//??????????????????????????????????????????????????????platform
    



render(){ 
	// this.setState({oriList:this.state.renderList})
        
	const menu = this.state.renderList.map((place) => {
		return( 
<div style={{paddingLeft : '2%' ,paddingTop : '2%'}}  >   
				<Card className="managePlatFormSingleItem" style={{width : '18rem' }}  >
		<Card.Img  src={'https://juicequiztest.s3.amazonaws.com'+place.Pcover} />
		<Card.Body>
			<Card.Title>{place.Pname}</Card.Title>
			<Button style={{background:"red", border:"none"}} variant="primary" onClick={()=>this.unsubscribe(place.PID)}>Unsubscribe</Button> 
		</Card.Body>
		</Card>  
	</div>
		   
		);
	});
   
	return (
		<>
		
		<div className='ManagePlatFormList'>
		{menu}
		</div>

			  </>
			  
	);
  
}
    
}