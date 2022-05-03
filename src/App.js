import { useEffect, useState } from "react";
import { createtodos, readtodos } from "./functions";
import Preloader from "./components/preloader.js";
import { deletetodo, updatetodo } from "./api";


function App() {
  const [todo, settodo] = useState({title:'',content:''});
  const [todos, settodos] = useState(null);
  const [currentid, setcurrentid] = useState(0);

  useEffect(()=>{
 
    let currenttodo = currentid!==0 ?todos.find(todo=>todo._id===currentid):{title:'',content:''};
    settodo(currenttodo);

  },[currentid])

  useEffect(() => {
    
    const fetchdata= async()=>
    {
      const result=await readtodos();
      settodos(result);
      console.log(result);
    }
    fetchdata();
  }, [currentid])
  const clear = () => {
    setcurrentid(0);
    settodo({ title: '', content: '' });
  }
  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear()
      }
    }
    window.addEventListener('keydown', clearField)
    return () => window.removeEventListener('keydown', clearField)
  }, [])
  const onsubmithandler = async(e)=>
  {
    e.preventDefault();
    if(currentid === 0)
    {
      const result=await createtodos(todo);
      settodos([...todos, result])
    }
    else 
    {
        await updatetodo(currentid,todo);
     
    }
    clear();
  }

  const removetodo = async (id)=>
  {
    await deletetodo(id);
     const todoscopy=[...todos];
     todoscopy.filter(todo=>todo._id!==id);
     console.log(todoscopy);
     settodos(todoscopy);
     clear();
  }
  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={onsubmithandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="icon_prefix" value={todo.title} type="text" className="validate"
              onChange={e=>settodo({...todo,title:e.target.value})}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" value={todo.content} type="text" className="validate" 
               onChange={e=>settodo({...todo,content:e.target.value})}
              />
              <label htmlFor="description">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="btn waves-effect waves-light" >Submit
              <i className="material-icons right">send</i>
            </button>

          </div>
        </form>
        {
          !todos ? <Preloader /> :  <ul className="collection">
            {todos.map(todo => (
              <li key={todo._id} 
              onClick={()=>setcurrentid(todo._id)}
              className="collection-item"><div><h5>{todo.title}</h5>
                <p>{todo.content}<a href="#!" 
                onClick={()=>removetodo(todo._id)}
                 className="secondary-content"><i className="material-icons">delete</i></a></p></div></li>

            ))}

          </ul> 
        }
      </div>

    </div>


  );
}

export default App;