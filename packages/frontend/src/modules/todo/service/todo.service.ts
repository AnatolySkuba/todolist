import { HttpService } from '../../service/http.service';
import { BACKEND_KEYS, QUERY_KEYS } from '../../common/consts/app-keys.const';
import { ITodo } from '../types/todo.type';
import { IAddTodoForm } from '../types/add-todo-form.type';

class TodoService extends HttpService {
  getAllTodo(search: string, status: string, page: number) {
    return this.get({
      url: `${BACKEND_KEYS.TODOS}?${QUERY_KEYS.SEARCH}=${search}&${QUERY_KEYS.STATUS}=${status}&${QUERY_KEYS.PAGE}=${page}`
    });
  }

  getTodoById(id: string) {
    return this.get({
      url: `${BACKEND_KEYS.TODOS}/${id}`
    });
  }

  addTodo(body: IAddTodoForm): Promise<ITodo> {
    return this.post(
      {
        url: `${BACKEND_KEYS.TODOS}`
      },
      body
    );
  }

  updateTodo(id: string, name: string, value: boolean): Promise<ITodo> {
    return this.put(
      {
        url: `${BACKEND_KEYS.TODOS}/${id}`
      },
      { name, value }
    );
  }

  deleteTodo(id: string): Promise<ITodo> {
    return this.delete({
      url: `${BACKEND_KEYS.TODOS}/${id}`
    });
  }
}

export const todoService = new TodoService();
