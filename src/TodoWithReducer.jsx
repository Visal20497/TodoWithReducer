import React, { useReducer, useState } from "react";
function Todo() {
  let [edit, setEdit] = useState(false);
  let intialState = {
    text: "",
    todo: [],
    edit: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET":
        return { ...state, text: action.payload };
      case "SUBMIT":
        return { ...state, text: "", todo: [...state.todo, action.payload] };
      case "DEL":
        let temp = state.todo.filter((item) => {
          return item.id != action.payload;
        });
        return { ...state, todo: temp };
      case "UPDATE":
        let editTemp = state.todo.map((item) => {
          if (item.id == action.payload.id) {
            let text = state.text;
            return {
              ...state,
              text: text,
            };
          } else {
            return item;
          }
        });
        return {
          ...state,
          text: "",
          todo: editTemp,
        };

      default:
        return state;
    }
  }
  function deleteHandler(id) {
    dispatch({type:"DEL",payload:id});
  }
  function editHandler(id) {
    let findata = todo.todo.find((item) => {
      return item.id == id;
    });
    setEdit(findata);
    dispatch({type:"SET",payload:findata.text});
  }
  function submitHanlder() {
    let obj = {
      id: Math.trunc(Math.random() * 100000),
      text: todo.text,
    };
    if (!edit) {
      dispatch({type:"SUBMIT",payload:obj});
    } else {
      dispatch({type:"UPDATE",payload:edit});
      setEdit("");
    }
  }
  let [todo, dispatch] = useReducer(reducer, intialState);
  return (
    <>
      <div className="container m-5 ">
        <h1>Todo</h1>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Enter your data......"
              value={todo.text}
              onChange={(e) => {
                dispatch({type:"SET",payload:e.target.value});
              }}
              className="form-control"
            />
          </div>
          <div className="col-md-6"><button className="btn btn-primary" onClick={submitHanlder}>{!edit ? "Submit" : "SAVE"}</button></div>
        </div>
        <hr />
        {todo.todo.length === 0 && <h1>Please insert your data....</h1>}
        <div className="row d-flex flex-wrap justify-content-center" >
        {todo.todo?.map((item,i) => {
          let { text, id } = item
          return (
            
                <div className="col-md-3 mb-4" key={i}>
                  <div className="card">
                    <div className="card-body">
                      <div className="card-text">{text}</div>
                      <button className="btn btn-danger m-2" onClick={() => deleteHandler(id)}>
                        Remove Data
                      </button>
                      <button className="btn btn-primary" onClick={() => editHandler(id)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
          );
        })}
        </div>
      </div>
    </>
  );
}

export default Todo;
