import * as Koa from 'koa';
import { getTodos, createTodo as createTodoInDb } from '../../models/todos/todosModel';
import { BadRequest } from '../../lib/errors';

const listTodos : Koa.Middleware = async (ctx) => {
  const todos = await getTodos();
  ctx.body = todos;
};

const getTodo : Koa.Middleware = async (ctx) => {
  // here, the middleware todoMiddleware defined in ./todoMiddleware.ts
  // will inject the todo in ctx.todo and will check that the todo exists
  ctx.body = ctx.todo;
};

const createTodo : Koa.Middleware = async (ctx) => {
  BadRequest.assert(typeof ctx.request.body === 'object', 'Body must be an object');
  BadRequest.assert(typeof ctx.request.body.name === 'string', 'Name must be a string');
  const todo = await createTodoInDb(ctx.request.body);
  ctx.body = todo;
  ctx.status = 201;
};

export { listTodos, getTodo, createTodo };
