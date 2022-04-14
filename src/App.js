import './App.css';
import {useState} from 'react';
import {FaTrashAlt} from "react-icons/fa";
import {FaEdit} from "react-icons/fa";
//item을 따로 컴포넌트로 안만드니까 list내 모든 것들이 함께움직인다.
//item컴포넌트를 따로 만들어 각자의 컴포넌트마다 status와 newtodo를 관리해줘야한다.
//list내에서 map써봤자 모든 list들의 status와 newtodo가 갱신딤
function Item({v, 삭제, list, setlist}){
  let [newtodo, setnewtodo]=useState('');
  let [status, setstatus]=useState(false);
  let [ischeck, setischeck]=useState(false);
  function 수정(수정할놈, newtodo){
    setlist(list.map((v)=>v==수정할놈?newtodo:v))
    setstatus(false)
    setnewtodo('')
 }

  return(
    <div className='Icon'>
      <div className={ischeck?'hidden':'content'} value={v}><input onClick={e=>setischeck(!ischeck)} 
        type='checkbox' name='ccheck' ></input>{v}<button className='trash' onClick={()=>삭제(v)}><FaTrashAlt /></button>
    
       {status?<div className='newtodo'>
      <input onChange={(e)=>setnewtodo(e.target.value)} value={newtodo} 
       placeholder='수정할 내용을 입력해주세요'></input><button onClick={()=>수정(v,newtodo)}>수정완료</button></div>:
       (ischeck?null:<button onClick={(e)=>setstatus(true)}><FaEdit /></button>)}
    </div>
    </div>
    
  )
}
function Todolist({list, setlist, 삭제}){

   let inputlist='할 일이 없습니다.';
   inputlist=list.map((v,i)=>(<li className='inputlist' key={v}> <Item v={v} 삭제={삭제} list={list} 
    setlist={setlist}/></li>))   //onClick={(i)=>삭제(i)}는 오류남.
        //onClick={()=>삭제(i)} 도, e를 안넣어도 동작잘함
   return (<ul>{inputlist}</ul>)
}

function App() {
  let [todo, settodo]=useState('');
  let [list, setlist]=useState([]);

  function 할일추가(e){
    setlist([todo, ...list]) //setlist먼저 했는데 입력해도 입력창이 안바뀜
    settodo('')

  }
  function 삭제(삭제할놈){
    setlist(list.filter((v)=>v!==삭제할놈))
  }
  function kiki(e){//onkeypress:이벤트의 키값이 enter일때, 클릭동작핟ㄷ로ㅗㄱ
    if(e.key=='Enter'){
      할일추가();
    }
  }
  return (
    <div className='total'>
      <h2>Todo-List</h2>
      <hr />
    <div className='todo'><input placeholder='할일을 추가하세요'
           value={todo} onKeyPress={(e)=>{kiki(e)}} onChange={(e)=>settodo(e.target.value)}></input>
    <button onClick={(e)=>할일추가(e)}>추가</button></div>
    <div className='list'><Todolist list={list} setlist={setlist} 삭제={삭제}/></div>
    </div>
)
}

export default App;




