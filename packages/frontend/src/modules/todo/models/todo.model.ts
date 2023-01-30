import { ITodoModel } from '../types/todo-model.type';

class TodoModel implements ITodoModel {
  constructor(id: string, fullName: string, status: number) {
    this.id = id;
    this.fullName = fullName;
    // this.dayOfBirth = new Date(user.dob);
    this.status = status;
  }

  id: string;

  fullName: string;

  status: number;

  //   getFormatedDayOfBirth() {
  //     return this.dayOfBirth.toDateString();
  //   }
}

const createTodoModel = (todoFromServer: { id: string; fullName: string; status: number }) =>
  new TodoModel(todoFromServer.id, todoFromServer.fullName, todoFromServer.status);

export { createTodoModel };

export default TodoModel;
