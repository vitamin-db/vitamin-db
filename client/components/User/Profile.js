const React = require('react');

const Todo = ({userInfo}) => {
  return (
    <div>
      {userInfo}
      <input ref={node => {
        // console.log(node)
        this.input = node;
      }} />
      <button onClick={() => {
         store.dispatch({
          type: 'ADD_TODO',
          text: this.input.value,
          id: nextTodoId++
        });
         this.input.value = '';
      }}>
        {userInfo}
      </button>

  

    </div>
  )
}

module.exports = Todo;