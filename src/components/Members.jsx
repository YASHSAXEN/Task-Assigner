import React, { useContext, useEffect } from 'react'
import './Members.css';
import { authcontext } from '../store/ContextProvider';
import Navbar from './Navbar';

const Members = () => {

    const context_value = useContext(authcontext);

    const user_task_details_Index = context_value.taskData.findIndex((data)=> context_value.session.username === data.username);
    const user_task_details = context_value.taskData[user_task_details_Index];


    useEffect(()=>{
        const colors = ['#FF6347', '#87CEEB', '#FFD700', '#90EE90'];
    
        const card_divs = document.querySelectorAll('.task-number-div');
        const card_divs_main = document.querySelectorAll('.task-detail-div');
    
        let index = 0;
        for(let i=0; i<card_divs.length; i++){
          index = (index + i)%4;
          card_divs[i].style.backgroundColor = colors[index];
          index = 0;
        }

        for(let i=0; i<card_divs_main.length; i++){
          index = (index + i)%4;
          card_divs_main[i].style.backgroundColor = colors[index];
          index = 0;
        }
      },[]);

      function onTaskAccept(task_unique_id){
        console.log('task accepted');
        context_value.taskAccept(user_task_details_Index,task_unique_id);
      }

      function onTaskCompleteFailed(task_unique_id,task_type){
        context_value.taskCompleteFail(user_task_details_Index,task_unique_id,task_type);
      }

  return (
    <div className="main-container-admin">
        <Navbar/>
        <div className="task-number-conatiner">
            <div className="task-number-div">
                <h2>{user_task_details?.task_number.newtask || 0}</h2>
                <h2>New task</h2>
            </div>
            <div className="task-number-div">
                <h2>{user_task_details?.task_number.acceptedtask || 0}</h2>
                <h2>Accepted task</h2>
            </div>
            <div className="task-number-div">
                <h2>{user_task_details?.task_number.completedtask || 0}</h2>
                <h2>Completed task</h2>
            </div>
            <div className="task-number-div">
                <h2>{user_task_details?.task_number.failedtask || 0}</h2>
                <h2>Failed task</h2>
            </div>
        </div>
        <div className="main-task-details-container">
            {user_task_details?.task.length > 0 
            ?
            user_task_details.task.map((t)=>{
                return(
                    <div className="task-detail-div">
                        <div className="category-date-div">
                            <abbr className="actual-category" title='Task category'>{t.category}</abbr>
                            <abbr className='end-date' title='Deadline'>{t.date}</abbr>
                        </div>
                        <div className="task-actual-content-div">
                            <h3 style={{textAlign:'left'}}>
                                {t.title}
                            </h3>
                        </div>
                        <div className="task-actual-content-div">
                            <p>
                                {t.description}
                            </p>
                        </div>
                        <div className="actual-button-container">
                            { t.status === "pending" 
                            ?
                            <button className='btn-member' onClick={()=> onTaskAccept(t.id)}>Accept</button>
                            :
                            t.status === "accepted"
                            ?
                            <>
                                <button className='btn-member' style={{backgroundColor:"blue"}} onClick={()=> onTaskCompleteFailed(t.id,'accepted')}>Completed</button>
                                <button className='btn-member' style={{backgroundColor:"rgb(212, 0, 0)"}} onClick={()=> onTaskCompleteFailed(t.id,'failed')}>Failed</button>
                            </>
                            :
                            t.status === 'completed'
                            ?
                            <h3 style={{color:"blue"}}>🥳🥳 Task completed 🥳🥳</h3>
                            :
                            <h3 style={{color:"darkred"}}>😣😣 Task failed 😣😣</h3>
                            }
                        </div>
                    </div>
                )
            })
            :
            <h1 style={{color:'white',fontFamily:'cursive',margin:"0px auto"}}>No Task Available</h1>
            }
        </div>
    </div>
  )
}

export default Members