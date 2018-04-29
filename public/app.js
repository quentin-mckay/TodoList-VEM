new Vue({
    el: '#app',
    data: {
        items: [],
        subHeading: 'A simple todo list app built with nodeee',
        itemInput: ''
    },
    methods: {
        addNewTodo() {
            // POST to backend (note: must set header for express to understand it)
            fetch('/api/todos', {
                method: 'post',
                body: JSON.stringify({ name: this.itemInput }),
                headers: { 'Content-Type': 'application/json' }  // ! must do this !
            })
            .then(res => res.json())
            .then(newTodo => {
                // add successfully stored todo to the view
                this.items.push(newTodo)
            })

            // reset input to empty
            this.itemInput = ''
        },
        deleteTodo(id) {
            // DELETE item using id
            fetch('/api/todos/' + id, {
                method: 'delete'
            })
            .then(() => {
                // remove the deleted item from our view
                this.items = this.items.filter(item => item._id !== id)
            })
        },
        updateTodo(id) {
            // console.log(`updating ` + id)

            // find our local item
            const item = this.items.find(item => item._id === id)
            // is it completed?
            const isDone = item.completed
            
            fetch('/api/todos/' + id, {
                method: 'put',
                body: JSON.stringify({completed: !isDone}),
                headers: { 'Content-Type': 'application/json' }  // ! must do this !
            })
            .then(() => {
                item.completed = !item.completed
            })
        }
    },
    created() {
        // display all todos (automatically) by setting items data
        fetch('/api/todos').then(res => res.json())
        .then(data => {
            this.items = data
        })
    }
})