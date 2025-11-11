import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css';

//1. TodoItem component: 개별 todo 를 렌더링하고 상태변경 처리
/**
 * @param {object} props
 * @param {object} props.todo - 현재 할 일 객체 {id, text, completed}
 * @param {function} props.onToggle - 완료 상태를 토글하는 함수
 * @param {function} props.onRemove - 할 일을 목록에서 제거하는 함수
 */
function TodoItem({todo, onToggle, onRemove}){
  return(
    <li className={`flex items-center justify-between p-3 mb-2 rounded-lg transition duration-200 ${todo.completed ?'bg-green-100 line-through text-gray-500' :'bg-white shadow-md'}`}>
    <span className="flex-1 cursor-pointer"
    onClick={()=> onToggle(todo.id)}>
    {todo.text}
    </span>
    <button
    onClick={()=> onRemove(todo.id)}
    className="ml-4 p-1 rounded-full text-red-500 hover:bg-red-100 transition duration-150"
    >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg
  (http://www.w3.org/2000/svg)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6L12 18">
  </path></svg>
  </button>
  </li>
  );
}

//2. TodoForm component: 새로운 할일 입력처리
/**
 * @param {object} props
 * @param {function} props.onAdd - 새로운 할 일을 추가하는 함수
 */

function TodoForm({ onAdd }){
  const [inputText, setInputText]= useState('');
  const handleSubmit = (e) => {e.preventDefault();
    if (inputText.trim()) {
      onAdd(inputText.trim());
      setInputText('');
    }
  };
  return(
    <form onSubmit={handleSubmit} className="flex mb-6 shadow-xl rounded-x1 overflow-hidden">
    <input
    type="text"
    placeholder="add new Todo"
    value={inputText}
    onChange={(e)=> setInputText(e.target.value)}
    className="flex-1 p-4 border-none focus:ring-2 focus:ring-blue-500 outline-none"
    />
    <button type="submit" className="bg-blue-600 text-white p-4 hover:bg-blue-700 transition duration-200">
    add
    </button>
    </form>
  );
}


// 3.전체 app의 state 관리
// 애플리케이션의 핵심 데이터(할 일 목록)를 State로 관리
export default function App(){
  const[todos, setTodos]= useState([
  {id: 1, text: 'Key React', completed: false},
  {id: 2, text: 'Immutability Principle', completed: true},
  ]);

  const handleAddTodo = (text)=> {
    const newTodo = {
      id: Date.now(),
      text,
      completed:false,
    };
    /**새 배열을 만들어(스프레드 연산자 ... ) State를 업데이트*/
    setTodos((prevTodos)=>[newTodo, ...prevTodos]);
  };
  const handleToggleTodo =(id)=> {
    setTodos(prevTodos=>
      prevTodos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} :todo
      )
    );
  };
  const handleRemoveTodo =(id)=>{
    setTodos(prevTodos => prevTodos.filter(todo=> todo.id !==id));
  };

  // 4.렌더링
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
    <div className="w-full max-w-xl bg-gray-200 p-8 rounded-2xl shadow-2xl">
    <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-500 pb-2">
    React Todo List Master
    </h1>
    {/*할 일 추가 로직 함수를 Props로 전달*/}
    <TodoForm onAdd={handleAddTodo} />
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Todolist({todos.length}개)</h2>
    <ul className="list-none p-0">
    {todos.map(todo=>(<TodoItem key={todo.id}todo={todo}
      onToggle={handleToggleTodo} onRemove={handleRemoveTodo}
      />
    ))}
    </ul>
    </div>
    </div>
  );
}

