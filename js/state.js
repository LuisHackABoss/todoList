'use strict';

// Creo el Objeto state para no trabajar directamente en el DOM
// Lo creo como objeto y no solo un array de tareas porque en el futuro puede que tenga que añadir más propiedades

// recuperar el estado del localStorage
const localeStorageState = localStorage.getItem('stateTodoList');

export const state = {
	tasks: localeStorageState ? JSON.parse(localeStorageState).tasks : [],
	night: false,
};

// crear función para añadir una tarea al array
export const addTask = (task) => {
	const tastObject = {
		text: task,
		done: false,
	};
	// poner la tarea en el array de tareas de primera
	state.tasks.unshift(tastObject);
	// state.tasks.push(tastObject);
	saveState();
};

// Crear suncion para borrar las atreas hechas
export const deleteDoneTasks = () => {
	state.tasks = state.tasks.filter((task) => !task.done);
	saveState();
};

// Crear función para borrar todas las tareas
export const deleteAllTasks = () => {
	state.tasks = [];
	saveState();
};

// Salvando el estado en localStorage
const saveState = () => {
	// localStorage solo guarda strings, por eso tengo que convertir el objeto state a string
	localStorage.setItem('stateTodoList', JSON.stringify(state));
};

export const toggleStateTask = (id) => {
	state.tasks[id].done = !state.tasks[id].done;
	saveState();
};
