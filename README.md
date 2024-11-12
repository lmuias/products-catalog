# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

**How to run:
Install dependencies:
   npm I
  Start the JSON Server:
   npm run start:json-server
Run the Vite development server:
   npm run dev

### Опис CRUD операцій:

1. **Create (POST)**:
   - Використовується для створення нових записів в додатку (наприклад, додавання нових продуктів). Це можна зробити через форму або через API-запит.
   - При успішному створенні дані відправляються на сервер, і вони додаються в масив даних.

2. **Read (GET)**:
   - Використовується для отримання даних із JSON Server. Дані запитуються через API та зберігаються у глобальному стані (Redux).
   - Компоненти React підписуються на ці дані, щоб відображати їх на сторінці.

3. **Update (PUT)**:
   - Використовується для оновлення існуючих записів, таких як зміна інформації про продукт. Оновлені дані відправляються на сервер і потім відображаються в UI завдяки оновленому стану.

4. **Delete (DELETE)**:
   - Видалення запису із сервера та оновлення глобального стану. Після видалення запису Redux автоматично оновлює стан додатку, і відповідні компоненти React перестають відображати видалені дані.
