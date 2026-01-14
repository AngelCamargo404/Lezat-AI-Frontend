import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Button, 
    Grid, 
    Box, 
    AppBar, 
    Toolbar, 
    CssBaseline, 
    CircularProgress, 
    Snackbar, 
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Add as AddIcon, AutoFixHigh as AiIcon } from '@mui/icons-material';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from './services/localApi';
import { aiSummary } from './services/api';

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
    const [summaryText, setSummaryText] = useState('');
    const [loadingSummary, setLoadingSummary] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            showNotification("Error al cargar las tareas", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateClick = () => {
        setCurrentTask(null);
        setOpenModal(true);
    };

    const handleEditClick = (task) => {
        setCurrentTask(task);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentTask(null);
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (currentTask) {
                const response = await updateTask(currentTask.id, taskData);
                setTasks(tasks.map(t => t.id === currentTask.id ? response.data : t));
                showNotification("Tarea actualizada correctamente");
            } else {
                const response = await createTask(taskData);
                setTasks([...tasks, response.data]);
                showNotification("Tarea creada correctamente");
            }
        } catch (error) {
            console.error("Error saving task:", error);
            showNotification("Error al guardar la tarea", "error");
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
            try {
                await deleteTask(id);
                setTasks(tasks.filter(t => t.id !== id));
                showNotification("Tarea eliminada correctamente");
            } catch (error) {
                console.error("Error deleting task:", error);
                showNotification("Error al eliminar la tarea", "error");
            }
        }
    };

    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleGenerateSummary = async () => {
        setLoadingSummary(true);
        setSummaryDialogOpen(true);
        try {
            const res = await aiSummary(tasks);
            setSummaryText(res.data.summary);
        } catch (error) {
            setSummaryText("Error al generar el resumen. Inténtalo más tarde.");
            console.error(error);
        } finally {
            setLoadingSummary(false);
        }
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)', bgcolor: 'background.paper' }}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 800, color: 'primary.main' }}>
                        Lezat <Box component="span" sx={{ color: 'text.primary' }}>AI</Box>
                    </Typography>
                    <Button
                        color="secondary"
                        startIcon={<AiIcon />}
                        onClick={handleGenerateSummary}
                        variant="outlined"
                        sx={{ mr: 2 }}
                    >
                        Resumen AI
                    </Button>
                </Toolbar>
            </AppBar>
            
            <Container maxWidth="xl" sx={{ mt: { xs: 4, md: 6 }, mb: { xs: 4, md: 8 } }}>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }} mb={5} gap={2}>
                    <Box>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                            Mis Tareas
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Gestiona tus actividades diarias de manera eficiente
                        </Typography>
                    </Box>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        startIcon={<AddIcon />} 
                        onClick={handleCreateClick}
                        sx={{ px: 4, py: 1.5 }}
                    >
                        Nueva Tarea
                    </Button>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={8}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={task.id}>
                                    <TaskCard 
                                        task={task} 
                                        onEdit={handleEditClick} 
                                        onDelete={handleDeleteTask} 
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Box 
                                    textAlign="center" 
                                    py={10} 
                                    sx={{ 
                                        bgcolor: 'background.paper', 
                                        borderRadius: 4, 
                                        border: '2px dashed rgba(0,0,0,0.1)' 
                                    }}
                                >
                                    <Typography variant="h6" color="text.secondary" gutterBottom>
                                        No hay tareas pendientes
                                    </Typography>
                                    <Button color="primary" onClick={handleCreateClick}>
                                        ¡Crea tu primera tarea ahora!
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                )}

                <TaskForm 
                    open={openModal} 
                    handleClose={handleCloseModal} 
                    handleSave={handleSaveTask} 
                    taskToEdit={currentTask} 
                />

                <Snackbar 
                    open={notification.open} 
                    autoHideDuration={6000} 
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                        {notification.message}
                    </Alert>
                </Snackbar>

                {/* AI Summary Dialog */}
                <Dialog open={summaryDialogOpen} onClose={() => setSummaryDialogOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle display="flex" alignItems="center" gap={1}>
                        <AiIcon color="secondary" />
                        Resumen Inteligente de Tareas
                    </DialogTitle>
                    <DialogContent>
                        {loadingSummary ? (
                            <Box display="flex" justifyContent="center" p={4}>
                                <CircularProgress color="secondary" />
                            </Box>
                        ) : (
                            <Typography sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                                {summaryText}
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSummaryDialogOpen(false)}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}

export default App;

