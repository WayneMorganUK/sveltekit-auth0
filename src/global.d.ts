/// <reference types="@sveltejs/kit" />




type Task = {
    id: number;
    completed: boolean;
    description: string;
}

type User = {
    name: string,
    email: string
}