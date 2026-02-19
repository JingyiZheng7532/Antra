// MVC Pattern
// Model-View-Controller
const data = [
  { title: "Cook", id: 0 },
  { title: "Take the class", id: 1 },
  { title: "Review Notes", id: 2 },
  { title: "Have lunch", id: 3 },
];

const View = (() => {
  const dom = {
    container: document.querySelector("#todolist_container"),
    userInput: document.querySelector("#user_input"),
    btn: document.querySelector("#add-btn"),
  };

  // function to genetate the template string
  const createTml = (dataList) => {
    let template = "";

    dataList.forEach((todo) => {
      template += `<li>${todo.title}</li>`;
    });

    return template;
  };

  // render the data within same elements
  const render = (elem, template) => {
    elem.innerHTML = template;
  };

  return {
    dom,
    createTml,
    render,
  };
})();

const Model = ((view) => {
  // we need to use the same name as what we return
  const { dom, createTml, render } = view;

  class Todos {
    #todoList;
    constructor() {
      this.#todoList = [];
    }

    set newList(newTodos) {
      this.#todoList = newTodos;

      // re-render template;

      const template = createTml(newTodos);
      render(dom.container, template);
    }

    get getTodos() {
      return this.#todoList;
    }
  }

  return { Todos };
})(View);

const Controller = ((model, view) => {
  const { Todos } = model;
  const { dom } = view;
  //   const { dom, createTml, render } = view;
  const todoList = new Todos();

  // Initialize the data
  const init = () => {
    todoList.newList = data;
  };

  // Add a new todo
  const addTodo = () => {
    dom.btn.addEventListener("click", () => {
      const obj = { title: dom.userInput.value, id: todoList.getTodos.length };
      // update the todo list
      // why can not use push method to update the list? because we need to trigger the setter method to re-render the template, and push method will not trigger the setter method, so we need to create a new list and assign it to the setter method.
      const newList = [...todoList.getTodos, obj];
      todoList.newList = newList;
      dom.userInput.value = "";
    });
  };

  const bootstrap = () => {
    init();
    addTodo();
  };

  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
