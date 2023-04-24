'use strict';

import {
	state,
	addTask,
	deleteAllTasks,
	toggleStateTask,
	deleteDoneTasks,
} from './state.js';

// Seleccionar el form
// const form = document.querySelector('.form');
const form = document.forms.formTodo;
console.log(form);

// Seleccionar botones
const btnClear = document.querySelector('button#clear');
const btnDelete = document.querySelector('button#delete');
const deleteOk = document.querySelector('button#deleteOk');

// Seleccionar la ul
const ul = document.querySelector('ul#todoList');

// Seleccionar el p para mostrar el error
const error = document.querySelector('#error');

// Seleccionar el modal
const modal = document.querySelector('.modal-ext');

// Crear función para renderizar las tareas
const render = () => {
	let count = 0;
	const fragmentTasks = document.createDocumentFragment();
	// Recorro el array de tareas y por cada tarea creo un li y lo añado al fragment
	// Le doy la vuelta al array para que se muestren las tareas de más reciente a más antigua con el método reverse()
	for (const task of state.tasks) {
		const li = document.createElement('li'); // Creo el li
		const input = document.createElement('input'); // Creo el input
		const span = document.createElement('span'); // Creo el span
		span.textContent = task.text; // Añado el texto de la tarea al span

		// Agrego un atributo custom al li
		li.dataset.counter = count++;
		li.setAttribute('name', 'task');

		// Agrego atributos al input
		input.setAttribute('type', 'checkbox');
		input.setAttribute('name', 'check');
		if (task.done) {
			input.setAttribute('checked', '');
			span.classList.add('done');
		} else {
			input.removeAttribute('checked');
			span.classList.remove('done');
		}

		li.append(input); // Añado el input al li
		li.append(span); // Añado el span al li

		fragmentTasks.append(li); // Añado el li al fragment
	}
	console.log(state.tasks);
	ul.innerHTML = ''; // Borrar el contenido de la ul
	ul.append(fragmentTasks); // Añadir el contenido de fragmentTasks a la ul
};

// Crear función handleSubmit que maneja el evento submit del form
function handleSubmit(event) {
	event.preventDefault(); // Evitar que el form se envíe y se recargue la página
	console.log(form.elements);
	const newTask = form.elements.newTask; // Seleccionar el input
	const taskText = newTask.value.trim(); // Eliminar espacios en blanco al principio y al final

	// Añadir la tarea al array de tareas si no está vacía
	if (taskText !== '') {
		addTask(taskText); // Añadir la tarea al array de tareas
		showError('');
	} else {
		showError('La tarea está vacía');
	}

	newTask.value = ''; // Limpiar el input

	render(); // Renderizar las tareas
}

// Asociar al form un evento submit
form.addEventListener('submit', handleSubmit);

// Asociar evento click al modal
modal.addEventListener('click', (event) => {
	modal.classList.toggle('hide');
});

// Crear función para borrar las tareas completadas
btnClear.addEventListener('click', () => {
	deleteDoneTasks();
	render();
});

// Crear función para borrar todas las tareas
btnDelete.addEventListener('click', () => {
	// Abrir el modal
	modal.classList.toggle('hide');
	deleteOk.addEventListener('click', (event) => {
		deleteAllTasks();
		console.log(state.tasks);
		render();
	});
});

// Crear función para mostrar un mensaje de error
const showError = (message) => {
	error.textContent = message;
};

// Asociar evento click a la ul
ul.addEventListener('click', (event) => {
	const target = event.target;
	if (target.matches('input')) {
		// modifico el estado de la tarea
		const indexTask = parseInt(target.parentElement.dataset.counter);
		console.log(indexTask);
		toggleStateTask(indexTask);
		render();
	}
});

render();
