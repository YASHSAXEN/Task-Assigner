import React, { useContext, useEffect, useRef, useState } from 'react';
import './Admin.css';
import { authcontext } from '../store/ContextProvider';
import Navbar from './Navbar';
import { useForm } from 'react-hook-form';

const Admin = () => {

  const context_value = useContext(authcontext);

  const {register, handleSubmit, reset} = useForm();

  const employees_data = localStorage.getItem('employees')?JSON.parse(localStorage.getItem('employees')):[];


  useEffect(()=>{
    const colors = ['#FF6347', '#87CEEB', '#FFD700', '#90EE90'];

    const card_divs = document.querySelectorAll('.user-details-cards');

    console.log(card_divs)
    let index = 0;
    for(let i=0; i<card_divs.length; i++){
      index = (index + i)%4;
      card_divs[i].style.backgroundColor = colors[index];
      index = 0;
    }
  },[]);

  const date = new Date();

  function onAdminFormSubmit(data){
    console.log(data);
    context_value.createTask(data);
    reset();
  }

  return (
    <div className="main-container-admin">
      <Navbar/>
      <div className="form-div-admin">
        <form className="main-form-admin" onSubmit={handleSubmit(onAdminFormSubmit)}>
          <div className="left-form-div">
            <div className="input-div">
              <label htmlFor="title">Task Title</label>
              <input type="text" id='title' placeholder='Enter task title' className='input-fields' {...register('title')} minLength='10' maxLength='30' required autoComplete='off'/>
            </div>
            <div className="input-div">
              <label htmlFor="date">Date</label>
              <input type="date"  id="date" className='input-fields' {...register('date')} min={date.toISOString().split('T')[0]} autoComplete='off'/>
            </div>
            <div className="input-div">
              <label htmlFor="employee">Assign to</label>
              <select name="" id="employee" className='input-fields' {...register('employee')} required>
                {employees_data.length > 0 && 
                  employees_data.filter((employee) => employee.username!= context_value.session.username).map((employee)=> <option key={employee.username}  value={employee.username} className='employees-value'>{employee.username}</option>)
                }
              </select>
            </div>
            <div className="input-div">
              <label htmlFor="category">Category</label>
              <input type="text" id="category" placeholder='Enter employee category' {...register('category')} className='input-fields' required minLength='5' maxLength='15' autoComplete='off'/>
            </div>
          </div>
          <div className="right-form-div">
              <div className="input-content-div">
                <div className="label-conatiner">
                  <label htmlFor="content">Description</label>
                </div>
                <textarea name="" id="content" className='input-content-field' {...register('description')} required minLength='100' maxLength='200' autoComplete='off'></textarea>
              </div>
              <button className='create-btn'>Create Task</button>
            </div>
        </form>
      </div>
      <div className="task-div-admin">
        <h3> Employee Task Details</h3>
        {context_value.taskData.map((employee)=>{
          return(
            <div className="user-details-cards" key={employee.username}>
              <div className="employee-name-div">
                <h3>{employee.username}</h3>
              </div>
              <div className="employee-task-details">
                <p>New task:{employee.task_number.newtask}</p>
                <p>Accepted:{employee.task_number.acceptedtask}</p>
                <p>Completed task:{employee.task_number.completedtask}</p>
                <p>Failed task:{employee.task_number.failedtask}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Admin