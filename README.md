# Todo list project

## Required features

1. **Todo list - CRUD operations on backend**;

- _Each `PUT` `POST` rout should has validation of `req.body` and throw `400` error in case of failed validation_
- _Separate your logic from routes. You should perform all interactions with `DB` inside your `services/<filename>.service.ts` file and import it to `controllers/<filename>.controller.ts`. After that you can call your controllers in routes_
- _Create GENERIC validator, isExist (for put, delete and get by id), tryCatch middlewares _

2. **Todo list - Connect your CRUD operations with frontend**;

- _You should split your code on logical components ( `<TodoContainer />`, `<TodoElement/>` etc);_
- _For Edit/Add you should use forms written with [Formik](https://formik.org/docs/overview);_
- _Put logic related to server interactions inside `service/http.ts` file (check [Our Documentation](https://github.com/CodeGeneration-2020/code-generation-code-style/blob/main/docs/javascript.md#server-interactions-))_
- _For data fetching you can use [React Query](https://react-query.tanstack.com/), it also help you to globally store your data_
- _Todo list page should have different behaviors on different devices. Desktop - should be displayed as a table, Tablet - should be as slider, Mobile - list._
- _Your font sizes, colors, margins, paddings should be in THEME const_
- _Create QUERY_KEYS and ROUTER_KEYS const for routing_
- _Use styled components_
- _Design should be tablet and mobile adaptive_

3. **Authorization (login/signup) backend;**

- _Use jwt [authorization](https://nodejsdev.ru/doc/jwt/) and [Passport](http://www.passportjs.org/) for that_
- _Logic related to token processing should be stored in `middlewares/auth.middleware.ts`_
- _Private todos should be accessible only for Todo creators_
- _Change password endpoint_

4. **Authorization (login/signup) frontend;**

- _Should store token in localStorage_
- _Use Formik for handling validation and submit func_
- _Extend your http service for interacting with auth requests (check our codestyle)_
- _Integrate logout and edit user information UI_

5. **Filters for todo list by title and statuses (private and completed);**

- _You should pass filter params through `req.params`(`localhost:3000/todo?search=test&status=completed`)_
- _Connect backend filtration with UI components_

6. **Button pagination;**

- _All pagination should be handled by backend_
- _Change frontend request with pagination params_
- _Pagination should be done differently on different devices. Desktop - button pagination, Tablet - horizontal scroll pagination, Mobile - vertical scroll pagination_

### NOTES

> Backend should have stored in `backend` dir, mobile should be stored in `fronted` dir.
> Use technologies from `Useful links and technologies`. You should create separate pr for each task.

Design: [drive.google](https://drive.google.com/file/d/1Xw1OUerR9ndQ1Ay8hp1nhqvtXcdJkGbQ/view?usp=sharing)

## PR convention

1. Each intern will be attached to a branch (`<name that you have set in pre-requirements>/main`);
2. When you are working on a feature you should create a separate branch from `<name that you have set in pre-requirements>/main` with the following name:
   `feature/<name that you have set in pre-requirements>/<feature-name>` or `bug/<name that you have set in pre-requirements>/<feature-name>`. Once you are done with a subtask you should create a PR into `<name that you have set in pre-requirements>/main` and ping `Danyyl Kuchkov & Oleksii Samoilenko` for review;
3. Title of your PR's should be `feat: <name of your feature>` or `bug-fix: <name of your bugfix>`. Description field should contain short info about feature/bug;
4. PR's are under review ONLY between 9AM - 9:30AM (Kyiv EET time)

> If you will face with some issues with git. Ask `Danyyl Kuchkov` via slack;

## Useful links and technologies

[Corporate Codestyle](https://github.com/CodeGeneration-2020/code-generation-code-style)  
[Formik](https://formik.org/docs/overview)  
[Mongoose](https://mongoosejs.com/)  
[Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)  
[Passport](http://www.passportjs.org/)  
[React Query](https://react-query.tanstack.com/)  
[Styled component](https://styled-components.com/)

```

```
