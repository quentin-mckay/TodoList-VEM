$(document).ready(function() {
    $.getJSON('/api/todos')
    .then(addTodos)

    // === create todo on Enter keypress ===
    $('#input').keypress(e => {
        if (event.which === 13) {  // .which is deprecated (need better solution)
            createTodo()
        }
    })

    // === remove on click X ===
    $('.list').on('click', 'span', function(e) {  // can't use () =>
        e.stopPropagation() // stops event from bubbling up (don't want span click to trigger li click (below))
        removeTodo($(this).parent());
    })

    // === update Todo ===
    $('.list').on('click', 'li', function(e) {
        updateTodo($(this))
    })
})


function removeTodo(todo) {
    const clickedId = todo.data('id');
    const deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(data => {
        todo.remove()  // if successful, remove from the page
    })
    .catch(err => console.log(err))
}

function addTodos(todos) {
    // add todos to the page
    todos.forEach(todo => {
        addTodo(todo);
    })
}

function addTodo(todo) {
    let newTodo = $('<li class="list__item">' + todo.name + '<span>X</span>' + '</li>');
    newTodo.data('id', todo._id)  // add mongo generated Id as jquery data (need for deletion later)
    newTodo.data('completed', todo.completed)  // store data on the element created by jquery
    if (todo.completed) {
        newTodo.addClass('list__item--done');
    }
    $('.list').append(newTodo);
}

function createTodo() {
    // send request to create new todo
    let userInput = $('#input').val()
    $.post('/api/todos', { name: userInput })
    .then(newTodo => {
        addTodo(newTodo)
        $('#input').val('')
    })
    .catch(err => console.log(err))
}

function updateTodo(todo) {
    const updateUrl = '/api/todos/' + todo.data('id')

    const isDone = !todo.data('completed')
    const updateData = {completed: isDone}

    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(updatedTodo => {
        todo.toggleClass('list__item--done')
        todo.data('completed', isDone)
    })
}