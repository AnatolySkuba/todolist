import { Document } from 'mongoose';

export interface ITodo extends Document {
  _id: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isComplete: boolean;
  isPublic: boolean;
}

export interface IUpdateTodo extends Document {
  name: string;
  value: boolean;
}
