import React,{createContext, useEffect, useState} from "react";


 export const context= createContext({})

export function Context({children}){

    function oldtodoiteamsinstorage(){
        let list=localStorage.getItem('todos')
        if(list){
            return JSON.parse(list)
        }
        else{
            return []
        }
    }


    let [todos,setTodos]=useState(()=>oldtodoiteamsinstorage())

    function addtodos(id,todo,ischeck){
        if(todo.length != 0){ 
            setTodos([...todos,{id:id, todoText:todo, ischeck:ischeck}])
        }
    }

    function removetodos(id){
        const todoss= todos.filter((todoIteam)=>{
                return todoIteam.id != id
        })  

        setTodos(todoss)
    }

    function edittodos(id,boolean){

        let a=[]

        todos.forEach((todoiteam,i,arr)=>{
            if(arr[i].id===id){
                let b={...todoiteam,ischeck:boolean}
                a.push(b)
            }
            else{
                a.push(todoiteam)
            }
        })

        setTodos(a) 
    }

    function savetodo(id, todo){

        let saveValue=[]

        todos.forEach((iteam)=>{

            if(iteam.id==id){
                let c= {...iteam,todoText:todo,ischeck:false}
                saveValue.push(c)
            }
            else{
                saveValue.push(iteam)
            }
        })

        setTodos(saveValue)

    }



    useEffect(()=>{

        let a=JSON.stringify(todos)
        localStorage.setItem("todos",a)
    
     },[todos])

    return(
        <>
        <context.Provider value={{todos,setTodos,addtodos,removetodos,edittodos,savetodo}}>
            {children}
        </context.Provider>
        </>
    )
}

