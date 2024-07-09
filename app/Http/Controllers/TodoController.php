<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        return Inertia::render('Todo', [
            'todos' => Todo::latest()->paginate(3)
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
            'is_complete' => 'boolean'
        ]);

        Todo::create($data);

        return back()->with('message', 'Todo created successfully!');
    }

    public function edit(Todo $todo)
    {
        return Inertia::render('TodoEdit', [
            'todo' => $todo
        ]);
    }

    public function update(Request $request, Todo $todo)
    {
        $data = $request->validate([
            'name' => 'required|min:3'
        ]);

        $todo->update($data);

        return redirect(route('todo.index'))->with('message', 'Todo updated successfully');
    }

    public function updateComplete(Request $request, Todo $todo)
    {
        $data = $request->validate([
            'is_complete' => 'required|boolean'
        ]);

        $todo->update($data);

        return back()->with('message', 'Update todo status successfully');
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();

        return back()->with('message', 'Delete todo successfully');
    }
}
