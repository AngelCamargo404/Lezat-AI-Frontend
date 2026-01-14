import React from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    CardActions, 
    IconButton, 
    Chip, 
    Box,
    Tooltip,
    Divider
} from '@mui/material';
import { 
    Edit as EditIcon, 
    DeleteOutline as DeleteIcon,
    AccessTime as TimeIcon,
    CheckCircleOutline as DoneIcon,
    PlayCircleOutline as ProgressIcon,
    Flag as FlagIcon
} from '@mui/icons-material';

const statusConfig = {
    pending: {
        color: 'warning',
        label: 'Pendiente',
        icon: <TimeIcon fontSize="small" />
    },
    'in-progress': {
        color: 'info',
        label: 'En Progreso',
        icon: <ProgressIcon fontSize="small" />
    },
    completed: {
        color: 'success',
        label: 'Completada',
        icon: <DoneIcon fontSize="small" />
    }
};

const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'success'
};

const TaskCard = ({ task, onEdit, onDelete }) => {
    const status = statusConfig[task.status] || statusConfig.pending;
    const priority = task.priority || 'medium';

    return (
        <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            overflow: 'visible'
        }}>
           
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Chip 
                        icon={status.icon}
                        label={status.label} 
                        color={status.color} 
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                    <Tooltip title={`Prioridad: ${priority}`}>
                        <Chip 
                            size="small"
                            label={priority.toUpperCase()} 
                            color={priorityColors[priority]} 
                            variant="outlined"
                            icon={<FlagIcon fontSize="small" />}
                        />
                    </Tooltip>
                </Box>
                
                <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                    {task.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph sx={{ 
                    whiteSpace: 'pre-wrap', 
                    mb: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                }}>
                    {task.description || "Sin descripción"}
                </Typography>
            </CardContent>

            <Divider  />

            <CardActions sx={{ justifyContent: 'flex-end', px: 2, py: 1.5 }}>
                <Tooltip title="Editar">
                    <IconButton 
                        size="small" 
                        onClick={() => onEdit(task)}
                        sx={{ 
                            color: 'primary.main',
                            bgcolor: 'primary.50',
                            mr: 1,
                            '&:hover': { bgcolor: 'primary.100' }
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                
                <Tooltip title="Eliminar">
                    <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => onDelete(task.id)}
                        sx={{ 
                            color: 'error.main',
                            bgcolor: 'error.50',
                            '&:hover': { bgcolor: 'error.100' }
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default TaskCard;
