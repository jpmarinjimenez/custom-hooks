import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () => {
    let lc = null;
    if (typeof window !== 'undefined') {
        lc = localStorage.getItem('todos');
    }

    return JSON.parse(lc) || [];
};

export const useTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos) || []);
    }, [todos]);

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        };

        dispatch(action);
    };

    const handleRemoveTodo = (id) => {
        const action = {
            type: '[TODO] Remove todo',
            payload: id,
        };

        dispatch(action);
    };

    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] Toggle todo',
            payload: id,
        };

        dispatch(action);
    };

    const todosCount = todos.length;
    const pendingTodosCount = todos.filter((todo) => todo.done === false).length;

    return { todos, todosCount, pendingTodosCount, handleNewTodo, handleRemoveTodo, handleToggleTodo };
};
