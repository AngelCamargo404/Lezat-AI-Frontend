
const STORAGE_KEY = 'tasks';

const defaultTasks = [
    {
        id: '1',
        title: 'Investigación de Mercado',
        description: 'Analizar competidores directos y recopilar feedback de usuarios potenciales.',
        status: 'completed'
    },
    {
        id: '2',
        title: 'Diseño de UX/UI',
        description: 'Crear wireframes y prototipos de alta fidelidad para la aplicación móvil.',
        status: 'in-progress'
    },
    {
        id: '3',
        title: 'Desarrollo Backend',
        description: 'Configurar base de datos y desarrollar API endpoints principales.',
        status: 'pending'
    },
    {
        id: '4',
        title: 'Tests Unitarios',
        description: 'Implementar pruebas para el módulo de autenticación de usuarios.',
        status: 'pending'
    }
];

// Initialize/Seed LocalStorage
const initializeStorage = () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTasks));
    }
};

// Ensure initialization happens when the module is loaded
initializeStorage();

const getLocalTasks = () => {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
};

const setLocalTasks = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const getTasks = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: getLocalTasks() });
        }, 300); // Simulate network delay
    });
};

export const createTask = async (task) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const tasks = getLocalTasks();
            const newTask = { ...task, id: Date.now().toString() };
            const newTasks = [...tasks, newTask];
            setLocalTasks(newTasks);
            resolve({ data: newTask });
        }, 300);
    });
};

export const updateTask = async (id, updatedTask) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const tasks = getLocalTasks();
            const index = tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                const newTask = { ...tasks[index], ...updatedTask };
                tasks[index] = newTask;
                setLocalTasks(tasks);
                resolve({ data: newTask });
            } else {
                reject(new Error('Task not found'));
            }
        }, 300);
    });
};

export const deleteTask = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const tasks = getLocalTasks();
            const newTasks = tasks.filter(t => t.id !== id);
            setLocalTasks(newTasks);
            resolve({ data: { id } });
        }, 300);
    });
};
