import React, { useState, useEffect } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Button, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    Box,
    CircularProgress,
    Tooltip,
    IconButton
} from '@mui/material';
import { AutoAwesome as MagicIcon, Lightbulb as IdeaIcon } from '@mui/icons-material';
import { aiSuggestPriority, aiAutoComplete } from '../services/api';

const TaskForm = ({ open, handleClose, handleSave, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [priority, setPriority] = useState('medium');
    const [loadingAI, setLoadingAI] = useState(false);

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setStatus(taskToEdit.status);
            setPriority(taskToEdit.priority || 'medium');
        } else {
            setTitle('');
            setDescription('');
            setStatus('pending');
            setPriority('medium');
        }
    }, [taskToEdit, open]);

    const onSubmit = () => {
        if (!title.trim()) return;
        handleSave({ title, description, status, priority });
        handleClose();
    };

    const handleAutoComplete = async () => {
        if (!title.trim()) return;
        setLoadingAI(true);
        try {
            const res = await aiAutoComplete({ title });
            setDescription(res.data.description);
        } catch (error) {
            console.error("AI Error:", error);
        } finally {
            setLoadingAI(false);
        }
    };

    const handleSuggestPriority = async () => {
        if (!title.trim() && !description.trim()) return;
        setLoadingAI(true);
        try {
            const res = await aiSuggestPriority({ title, description });
            setPriority(res.data.priority);
        } catch (error) {
            console.error("AI Error:", error);
        } finally {
            setLoadingAI(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}</DialogTitle>
            <DialogContent>
                <Box display="flex" gap={1} alignItems="center">
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Título"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Box>
                
                <Box position="relative">
                    <TextField
                        margin="dense"
                        label="Descripción"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Box position="absolute" right={8} top={16}>
                        <Tooltip title="Auto-completar descripción con IA">
                            <span>
                                <IconButton onClick={handleAutoComplete} disabled={loadingAI || !title} color="primary" size="small">
                                    {loadingAI ? <CircularProgress size={20} /> : <MagicIcon />}
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Box>
                </Box>

                <Box display="flex" gap={2} mt={1}>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Estado</InputLabel>
                        <Select
                            value={status}
                            label="Estado"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="pending">Pendiente</MenuItem>
                            <MenuItem value="in-progress">En Progreso</MenuItem>
                            <MenuItem value="completed">Completada</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Prioridad</InputLabel>
                        <Select
                            value={priority}
                            label="Prioridad"
                            onChange={(e) => setPriority(e.target.value)}
                            startAdornment={
                                <Tooltip title="Sugerir prioridad con IA">
                                    <IconButton 
                                        onClick={handleSuggestPriority} 
                                        disabled={loadingAI || (!title && !description)}
                                        size="small"
                                        sx={{ mr: 1 }}
                                        color="secondary"
                                    >
                                        <IdeaIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <MenuItem value="low">Baja</MenuItem>
                            <MenuItem value="medium">Media</MenuItem>
                            <MenuItem value="high">Alta</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={onSubmit} variant="contained" color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskForm;
