<script lang="ts">
import { onMount } from "svelte";



    let todos: Array<{title: string; completed: boolean}> = [];

    let todo = "Hallelujah";

    function addTodo(){
        const newTodo = {title: todo, completed: false};
        todos = [newTodo, ...todos]
        todo = "";
    }

    function runAddTodo(event: any){
        if(event.KeyCode == 13){
            addTodo();
        }else{
            return;
        }
    }

    onMount(()=>{
        window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.type) {
            case 'new-todo':
                let newTodo = {title: message.value, completed: false};
                todos = [newTodo, ...todos];
                break; 
        }
    });
    })


</script>

<style>
.isComplete{
    text-decoration: line-through;
}

</style>


<h3>Add a New Todo</h3>

<hr>

<h1>{todo}</h1>

<form action="" method="" on:submit|preventDefault={addTodo}>

    <input bind:value={todo} on:keyup={runAddTodo}/>

</form>


<ul>
    {#each todos as todo(todo.title)}
        <li class={todo.completed ? "isComplete": ""}>{todo.title} <input type="checkbox" bind:checked={todo.completed}> </li>
        
    {/each}
</ul>

<pre>
    {JSON.stringify(todos, null, 2)}
</pre>


<!-- svelte-ignore missing-declaration -->
<button on:click={()=>{
    tsvscode.postMessage({
        type: 'onInfo',
        value: 'info Message'
    })
}}>
INFO
</button>


<!-- svelte-ignore missing-declaration -->
<button on:click={()=>{
    tsvscode.postMessage({
        type: 'onError',
        value: 'Error Message'
    })
}}>
ERROR
</button>