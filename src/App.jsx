import React,{useContext,useState,useEffect} from 'react'
import { v4 as uuid } from "uuid";
import { context } from './Context/Contextx'

function App() {

  const {todos,setTodos,addtodos,removetodos,edittodos,savetodo}=useContext(context)

  const [inputval,setinputVal]=useState('')

  const [textarea,sertextarea]=useState([])

  let id=uuid()

  function handlesave(id,oldtext){

    if(textarea.length !=0){

      textarea.forEach((value)=>{
        if(value.id==id){
          savetodo(id,value.newtodoText)
        }
    })

    }
    else{
      savetodo(id,oldtext)
    }

  }






  return (
       <>
          <div className='top_iteams'>
              <h1 style={{textAlign:'center',color:'white'}}>Create Your Todo List</h1>
              <div className='input_field_and_submit_button'>
                  <input type="text" value={inputval}  className='main_inputfield' onChange={(e)=>{setinputVal(e.target.value)}}/>
                  <button className='submit_button' onClick={()=>{addtodos(id,inputval,false)
                     setinputVal('')}}>Add Your Todo</button>
              </div>
          </div>

          <div className='todolist_cards_wrapper'>

            {
              todos.map((v)=>{

                return(

                  <div className='todolist_card'>
                  <div className='headings'> 
                    <h5 style={{color:'white', margin:'0'}}>Your Content</h5>
                    <h6 style={{color:'white' ,margin:'0', justifySelf:'center'}}>Edit</h6>
                    <h6 style={{color:'white',margin:'0',justifySelf:'center'}}>Delete</h6>
                  </div>
                  
                  <div className='todolist_card_content'>
    
                    <div className='todo_paragraph_and_textarea'>
                    <p className='todolist_card_paragraph' style={{color:'white', display: v.ischeck==false ? 'block' : 'none' }}>{v.todoText}</p>             
                    <textarea name="todoText" onBlur={(e)=>{sertextarea([...textarea,{id:v.id,newtodoText:e.target.value}])}} style={{width:'100%',display: v.ischeck==true ? 'block' : 'none'}}>{v.todoText}</textarea>
                    </div>
                    
                    <div className='edit_and_save_buttons'style={{justifySelf:'center'}}>
                    <button style={{padding:'8px 10px', display: v.ischeck==false ? 'block' : 'none'}} onClick={()=>{edittodos(v.id,true)}}>Edit</button>
                    <button style={{padding:'8px 10px', display: v.ischeck==true ? 'block' : 'none'}} onClick={()=>{handlesave(v.id,v.todoText)}}>Save</button>
                    </div>
    
                    <button style={{padding:'8px 10px'}} onClick={()=>{removetodos(v.id)}}>Delete</button>  
    
                  </div>
    
    
                </div>

                )

              })
            }



          </div>
       </>
  )
}

export default App;
