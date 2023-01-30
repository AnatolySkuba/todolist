import { Request } from 'express';
import TodoService from '../services/todo.service';
import { ITodo, IUpdateTodo } from '../types/todo.type';
import { RequestWithUser } from '../types/request.type';

class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: RequestWithUser): Promise<
    | {
        todos: ITodo[];
        count: number;
      }
    | undefined
  > {
    const { user, query } = req;
    if (user) {
      const { id: owner } = user;
      return this.todoService.findAll(owner, query);
    }
  }

  async getTodoById(req: Request<{ id: string }>): Promise<ITodo> {
    const todo: ITodo = await this.todoService.getTodoById(req.params.id);
    return todo;
  }

  async addTodo(req: Request<{ body: ITodo }>): Promise<ITodo> {
    const newTodo: ITodo = await this.todoService.addTodo(req.body);
    return newTodo;
  }

  async updateTodo(req: Request<{ id: string; body: IUpdateTodo }>): Promise<ITodo> {
    const updateTodo: ITodo = await this.todoService.updateTodo(req.params.id, req.body);
    return updateTodo;
  }

  async deleteTodo(req: Request<{ id: string }>): Promise<ITodo> {
    const todo: ITodo = await this.todoService.deleteTodo(req.params.id);
    return todo;
  }
}

export const todoController = new TodoController(new TodoService());
