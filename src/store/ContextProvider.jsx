import React, { createContext, useEffect, useState } from "react";
import employees_data from "./data";
import toast from 'react-hot-toast';
import '../index.css';
import { v4 as uuidv4 } from 'uuid';
import task_data from "./task_data";

const authcontext = createContext();

const ContextProvider = ({ children }) => {
  const session_data = localStorage.getItem('session')?JSON.parse(localStorage.getItem('session')):{username:null,value:null};
  const [session, setSession] = useState({username:session_data.username,value:session_data.value});
  
  // valid credentials during the time of login
  const [valid,setValid] = useState(true);

  const [taskData, setTaskData] = useState(localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[])

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees_data));
    console.log("tasks1");
    if(!localStorage.getItem('tasks')){
      console.log("tasks");
      localStorage.setItem("tasks",JSON.stringify(task_data));
    }
  }, []);

  function changeSessionOnLogin(data) {
    let employees_data = localStorage.getItem('employees')?JSON.parse(localStorage.getItem('employees')):[];
    if(employees_data.length >0){
        let matched_employee = employees_data.find((employee)=> employee.username === data.username && employee.password === data.password);
        if(matched_employee){
            localStorage.setItem('session',JSON.stringify({username:matched_employee.username,value:matched_employee.category}));
            setSession({username:matched_employee.username,value:matched_employee.category});
            toast.success(`Login successfully`,{className:'toast-class'});
        }
        else{
            setValid(false);
        }
    }
  }

  function changeSessionOnLogout(data){
    localStorage.setItem('session',JSON.stringify(data));
    setSession(data);
    toast.success(`Logout successfully`,{className:'toast-class'});
  }

  function createTask(data){
    console.log(data);
    data.id = uuidv4();
    data.status = 'pending';
    let employees_task_data = taskData;
    if(employees_task_data.length >0){
        let matched_employee_index = employees_task_data.findIndex((employee)=> employee.username === data.employee);
        if(employees_task_data[matched_employee_index]){
          employees_task_data[matched_employee_index].task_number.newtask +=1;
          employees_task_data[matched_employee_index].task.unshift(data);
          localStorage.setItem('tasks',JSON.stringify(employees_task_data));
          setTaskData([...employees_task_data]);
        }
    toast.success(`Task assigned successfully ${data.employee}`,{className:'toast-class'});
    } 
  }

  function taskAccept(taskDataIndex,id){
    let employees_task_data = taskData;
    employees_task_data[taskDataIndex].task_number.newtask -=1;
    employees_task_data[taskDataIndex].task_number.acceptedtask +=1;
    const particular_task_index = employees_task_data[taskDataIndex].task.findIndex((task)=> task.id === id);
    employees_task_data[taskDataIndex].task[particular_task_index].status = 'accepted';
    localStorage.setItem('tasks',JSON.stringify(employees_task_data));
    setTaskData([...employees_task_data]);
    toast.success(`Task with id ${id} accepted successfully`,{className:'toast-class extra'});
  }

  function taskCompleteFail(taskDataIndex,id,task_type){
    let employees_task_data = taskData;
    employees_task_data[taskDataIndex].task_number.acceptedtask -=1;
    if(task_type === 'accepted'){
      employees_task_data[taskDataIndex].task_number.completedtask +=1;
    }
    else{
      employees_task_data[taskDataIndex].task_number.failedtask +=1;
    }
    const particular_task_index = employees_task_data[taskDataIndex].task.findIndex((task)=> task.id === id);
    if(task_type === 'accepted'){
      employees_task_data[taskDataIndex].task[particular_task_index].status = 'completed';
    }
    else{
      employees_task_data[taskDataIndex].task[particular_task_index].status = 'failed';
    }
    localStorage.setItem('tasks',JSON.stringify(employees_task_data));
    setTaskData([...employees_task_data]);
    if(task_type === 'accepted'){
      toast.success(`Task with id ${id} completed successfully`,{className:'toast-class extra'});
    }
    else{
      toast.error(`Task with id ${id} failed `,{className:'toast-class extra'});
    }
  }

  return (
    <authcontext.Provider
      value={{ session: session, changeSessionOnLogin: changeSessionOnLogin, valid: valid, changeSessionOnLogout:changeSessionOnLogout, createTask:createTask ,taskData:taskData, taskAccept:taskAccept, taskCompleteFail:taskCompleteFail}}
    >
      {children}
    </authcontext.Provider>
  );
};

export default ContextProvider;

export { authcontext };
