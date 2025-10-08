import { MetaTags } from "../../../helpers/MetaTags"
import { useState, useEffect } from 'react'

export const Users = ({ metaData }) => {
	// Estados para las tareas y funcionalidades
	const [tasks, setTasks] = useState([])
	const [filter, setFilter] = useState('all') // 'all', 'pending', 'completed'
	const [editingTask, setEditingTask] = useState(null)
	
	// Estados para el formulario
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		dueDate: '',
		completed: false
	})
	
	// Estados para la UI
	const [showForm, setShowForm] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	// Cargar tareas desde localStorage al inicializar el componente
	useEffect(() => {
		loadTasksFromStorage()
	}, [])

	// RF6: Funciones de almacenamiento local
	const saveTasksToStorage = (tasksToSave) => {
		try {
			localStorage.setItem('personal-tasks', JSON.stringify(tasksToSave))
		} catch (error) {
			console.error('Error saving tasks to localStorage:', error)
		}
	}

	const loadTasksFromStorage = () => {
		try {
			const savedTasks = localStorage.getItem('personal-tasks')
			if (savedTasks) {
				setTasks(JSON.parse(savedTasks))
			}
		} catch (error) {
			console.error('Error loading tasks from localStorage:', error)
		}
	}

	// RF1: Crear nuevas tareas
	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const validateForm = () => {
		if (!formData.title.trim()) {
			alert('El título es obligatorio')
			return false
		}
		if (!formData.description.trim()) {
			alert('La descripción es obligatoria')
			return false
		}
		if (!formData.dueDate) {
			alert('La fecha límite es obligatoria')
			return false
		}
		// Validar que la fecha no sea anterior a hoy (solo para nuevas tareas)
		if (!isEditing && formData.dueDate < getTodayString()) {
			alert('La fecha límite no puede ser anterior a hoy')
			return false
		}
		return true
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		
		if (!validateForm()) return

		if (isEditing && editingTask) {
			// Actualizar tarea existente
			const updatedTasks = tasks.map(task => 
				task.id === editingTask.id 
					? { ...task, ...formData, updatedAt: getCurrentTimestamp() }
					: task
			)
			setTasks(updatedTasks)
			saveTasksToStorage(updatedTasks)
		} else {
			// Crear nueva tarea
			const newTask = {
				id: Date.now().toString(),
				...formData,
				completed: false,
				createdAt: getCurrentTimestamp(),
				updatedAt: getCurrentTimestamp()
			}
			const updatedTasks = [...tasks, newTask]
			setTasks(updatedTasks)
			saveTasksToStorage(updatedTasks)
		}

		// Resetear formulario
		resetForm()
	}

	const resetForm = () => {
		setFormData({
			title: '',
			description: '',
			dueDate: '',
			completed: false
		})
		setShowForm(false)
		setIsEditing(false)
		setEditingTask(null)
	}

	// RF2: Marcar tareas como completadas
	const toggleTaskCompletion = (taskId) => {
		const updatedTasks = tasks.map(task =>
			task.id === taskId 
				? { ...task, completed: !task.completed, updatedAt: getCurrentTimestamp() }
				: task
		)
		setTasks(updatedTasks)
		saveTasksToStorage(updatedTasks)
	}

	// RF3: Editar tareas existentes
	const startEditTask = (task) => {
		setFormData({
			title: task.title,
			description: task.description,
			dueDate: task.dueDate,
			completed: task.completed
		})
		setEditingTask(task)
		setIsEditing(true)
		setShowForm(true)
	}

	// RF4: Eliminar tareas
	const deleteTask = (taskId) => {
		if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
			const updatedTasks = tasks.filter(task => task.id !== taskId)
			setTasks(updatedTasks)
			saveTasksToStorage(updatedTasks)
		}
	}

	// RF5: Filtrar tareas
	const getFilteredTasks = () => {
		switch (filter) {
			case 'pending':
				return tasks.filter(task => !task.completed)
			case 'completed':
				return tasks.filter(task => task.completed)
			default:
				return tasks
		}
	}

	// Funciones auxiliares para la UI
	const formatDate = (dateString) => {
		// Manejar tanto fechas ISO como fechas simples
		const date = dateString.includes('T') 
			? new Date(dateString) 
			: new Date(dateString + 'T00:00:00')
		
		// Verificar si la fecha es válida
		if (isNaN(date.getTime())) {
			return 'Fecha inválida'
		}
		
		return date.toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	}

	const formatDateTime = (dateString) => {
		const date = new Date(dateString)
		
		// Verificar si la fecha es válida
		if (isNaN(date.getTime())) {
			return 'Fecha inválida'
		}
		
		return date.toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	const isOverdue = (dueDate) => {
		// Comparar solo las fechas sin horas para evitar problemas de zona horaria
		const today = new Date()
		const todayStr = today.getFullYear() + '-' + 
			String(today.getMonth() + 1).padStart(2, '0') + '-' + 
			String(today.getDate()).padStart(2, '0')
		
		return dueDate < todayStr
	}

	// Función para obtener la fecha actual en formato YYYY-MM-DD
	const getTodayString = () => {
		const today = new Date()
		return today.getFullYear() + '-' + 
			String(today.getMonth() + 1).padStart(2, '0') + '-' + 
			String(today.getDate()).padStart(2, '0')
	}

	// Función para obtener timestamp local para createdAt y updatedAt
	const getCurrentTimestamp = () => {
		return new Date().toISOString()
	}

	return (
		<>
			<MetaTags metaData={metaData} />
			<div className="task-manager">
				<div className="task-header">
					<h1>📋 Sistema de Gestión de Tareas Personales</h1>
					<button 
						className="btn-primary"
						onClick={() => setShowForm(true)}
						disabled={showForm}
					>
						➕ Nueva Tarea
					</button>
				</div>

				{/* Filtros de tareas */}
				<div className="filters">
					<button 
						className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
						onClick={() => setFilter('all')}
					>
						📋 Todas ({tasks.length})
					</button>
					<button 
						className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
						onClick={() => setFilter('pending')}
					>
						⏳ Pendientes ({tasks.filter(t => !t.completed).length})
					</button>
					<button 
						className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
						onClick={() => setFilter('completed')}
					>
						✅ Completadas ({tasks.filter(t => t.completed).length})
					</button>
				</div>

				{/* Formulario para crear/editar tareas */}
				{showForm && (
					<div className="form-overlay">
						<div className="task-form">
							<h2>{isEditing ? '✏️ Editar Tarea' : '➕ Nueva Tarea'}</h2>
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="title">Título *</label>
									<input
										type="text"
										id="title"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										placeholder="Título de la tarea..."
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="description">Descripción *</label>
									<textarea
										id="description"
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										placeholder="Describe la tarea..."
										rows="3"
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="dueDate">Fecha Límite *</label>
									<input
										type="date"
										id="dueDate"
										name="dueDate"
										value={formData.dueDate}
										onChange={handleInputChange}
										min={getTodayString()}
										required
									/>
								</div>

								<div className="form-actions">
									<button type="submit" className="btn-success">
										{isEditing ? '💾 Actualizar' : '➕ Crear Tarea'}
									</button>
									<button 
										type="button" 
										className="btn-secondary"
										onClick={resetForm}
									>
										❌ Cancelar
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{/* Lista de tareas */}
				<div className="tasks-container">
					{getFilteredTasks().length === 0 ? (
						<div className="empty-state">
							<h3>
								{filter === 'all' && '📝 No hay tareas creadas'}
								{filter === 'pending' && '🎉 No hay tareas pendientes'}
								{filter === 'completed' && '📋 No hay tareas completadas'}
							</h3>
							<p>
								{filter === 'all' && 'Crea tu primera tarea haciendo clic en "Nueva Tarea"'}
								{filter === 'pending' && '¡Genial! Has completado todas tus tareas'}
								{filter === 'completed' && 'Las tareas completadas aparecerán aquí'}
							</p>
						</div>
					) : (
						<div className="tasks-grid">
							{getFilteredTasks().map(task => (
								<div 
									key={task.id} 
									className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}`}
								>
									<div className="task-content">
										<div className="task-header-card">
											<h3 className={task.completed ? 'completed-title' : ''}>
												{task.title}
											</h3>
											<div className="task-status">
												{task.completed ? '✅' : isOverdue(task.dueDate) ? '🚨' : '⏳'}
											</div>
										</div>
										
										<p className="task-description">{task.description}</p>
										
										<div className="task-meta">
											<span className={`due-date ${isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}`}>
												📅 {formatDate(task.dueDate)}
												{isOverdue(task.dueDate) && !task.completed && ' (Vencida)'}
											</span>
											<span className="created-date">
												Creada: {formatDateTime(task.createdAt)}
											</span>
										</div>
									</div>
									
									<div className="task-actions">
										<button
											className={`btn-toggle ${task.completed ? 'completed' : 'pending'}`}
											onClick={() => toggleTaskCompletion(task.id)}
											title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
										>
											{task.completed ? '↩️ Reabrir' : '✅ Completar'}
										</button>
										
										<button
											className="btn-edit"
											onClick={() => startEditTask(task)}
											title="Editar tarea"
										>
											✏️ Editar
										</button>
										
										<button
											className="btn-delete"
											onClick={() => deleteTask(task.id)}
											title="Eliminar tarea"
										>
											🗑️ Eliminar
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Estadísticas */}
				<div className="stats">
					<div className="stat-item">
						<span className="stat-number">{tasks.length}</span>
						<span className="stat-label">Total</span>
					</div>
					<div className="stat-item">
						<span className="stat-number">{tasks.filter(t => !t.completed).length}</span>
						<span className="stat-label">Pendientes</span>
					</div>
					<div className="stat-item">
						<span className="stat-number">{tasks.filter(t => t.completed).length}</span>
						<span className="stat-label">Completadas</span>
					</div>
					<div className="stat-item">
						<span className="stat-number">{tasks.filter(t => isOverdue(t.dueDate) && !t.completed).length}</span>
						<span className="stat-label">Vencidas</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Users

// Estilos CSS embebidos para el componente
const styles = `
.task-manager {
	padding: 20px;
	max-width: 1200px;
	margin: 0 auto;
	font-family: 'Arial', sans-serif;
}

.task-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
	padding-bottom: 20px;
	border-bottom: 2px solid #e0e0e0;
}

.task-header h1 {
	color: #2c3e50;
	font-size: 2.5rem;
	margin: 0;
}

.filters {
	display: flex;
	gap: 15px;
	margin-bottom: 30px;
	flex-wrap: wrap;
}

.filter-btn {
	padding: 12px 20px;
	border: 2px solid #bdc3c7;
	background: white;
	border-radius: 25px;
	cursor: pointer;
	transition: all 0.3s ease;
	font-weight: 500;
	font-size: 14px;
}

.filter-btn:hover {
	background: #ecf0f1;
	border-color: #95a5a6;
}

.filter-btn.active {
	background: #3498db;
	border-color: #3498db;
	color: white;
}

.form-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.task-form {
	background: white;
	padding: 30px;
	border-radius: 15px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	width: 90%;
	max-width: 500px;
}

.task-form h2 {
	margin: 0 0 25px 0;
	color: #2c3e50;
	text-align: center;
}

.form-group {
	margin-bottom: 20px;
}

.form-group label {
	display: block;
	margin-bottom: 8px;
	font-weight: 600;
	color: #34495e;
}

.form-group input,
.form-group textarea {
	width: 100%;
	padding: 12px 15px;
	border: 2px solid #bdc3c7;
	border-radius: 8px;
	font-size: 14px;
	transition: border-color 0.3s ease;
	box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
	outline: none;
	border-color: #3498db;
}

.form-actions {
	display: flex;
	gap: 15px;
	justify-content: center;
	margin-top: 25px;
}

.btn-primary, .btn-success, .btn-secondary, .btn-edit, .btn-delete, .btn-toggle {
	padding: 12px 20px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-weight: 500;
	transition: all 0.3s ease;
	font-size: 14px;
}

.btn-primary {
	background: #3498db;
	color: white;
}

.btn-primary:hover:not(:disabled) {
	background: #2980b9;
}

.btn-primary:disabled {
	background: #bdc3c7;
	cursor: not-allowed;
}

.btn-success {
	background: #27ae60;
	color: white;
}

.btn-success:hover {
	background: #229954;
}

.btn-secondary {
	background: #95a5a6;
	color: white;
}

.btn-secondary:hover {
	background: #7f8c8d;
}

.tasks-container {
	margin-bottom: 30px;
}

.empty-state {
	text-align: center;
	padding: 60px 20px;
	background: #f8f9fa;
	border-radius: 15px;
	border: 2px dashed #bdc3c7;
}

.empty-state h3 {
	color: #7f8c8d;
	margin-bottom: 15px;
	font-size: 1.5rem;
}

.empty-state p {
	color: #95a5a6;
	font-size: 1.1rem;
}

.tasks-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	gap: 20px;
}

.task-card {
	background: white;
	border: 2px solid #e0e0e0;
	border-radius: 15px;
	padding: 20px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
}

.task-card:hover {
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	transform: translateY(-2px);
}

.task-card.completed {
	background: #f0f8f0;
	border-color: #27ae60;
}

.task-card.overdue {
	background: #fdf2f2;
	border-color: #e74c3c;
}

.task-header-card {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 15px;
}

.task-header-card h3 {
	margin: 0;
	color: #2c3e50;
	font-size: 1.3rem;
	flex: 1;
}

.completed-title {
	text-decoration: line-through;
	color: #7f8c8d !important;
}

.task-status {
	font-size: 1.5rem;
	margin-left: 10px;
}

.task-description {
	color: #7f8c8d;
	margin-bottom: 15px;
	line-height: 1.5;
}

.task-meta {
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin-bottom: 20px;
	font-size: 0.9rem;
}

.due-date {
	color: #f39c12;
	font-weight: 500;
}

.due-date.overdue {
	color: #e74c3c;
	font-weight: 600;
}

.created-date {
	color: #95a5a6;
}

.task-actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.task-actions button {
	flex: 1;
	min-width: 80px;
	font-size: 12px;
}

.btn-toggle {
	background: #f39c12;
	color: white;
}

.btn-toggle:hover {
	background: #e67e22;
}

.btn-toggle.completed {
	background: #27ae60;
}

.btn-toggle.completed:hover {
	background: #229954;
}

.btn-edit {
	background: #9b59b6;
	color: white;
}

.btn-edit:hover {
	background: #8e44ad;
}

.btn-delete {
	background: #e74c3c;
	color: white;
}

.btn-delete:hover {
	background: #c0392b;
}

.stats {
	display: flex;
	justify-content: center;
	gap: 30px;
	flex-wrap: wrap;
	background: #f8f9fa;
	padding: 25px;
	border-radius: 15px;
}

.stat-item {
	text-align: center;
}

.stat-number {
	display: block;
	font-size: 2rem;
	font-weight: bold;
	color: #3498db;
	margin-bottom: 5px;
}

.stat-label {
	color: #7f8c8d;
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 1px;
}

@media (max-width: 768px) {
	.task-header {
		flex-direction: column;
		align-items: stretch;
		gap: 20px;
	}
	
	.task-header h1 {
		font-size: 2rem;
		text-align: center;
	}
	
	.tasks-grid {
		grid-template-columns: 1fr;
	}
	
	.filters {
		justify-content: center;
	}
	
	.stats {
		gap: 20px;
	}
	
	.task-actions {
		justify-content: center;
	}
}
`;

// Inyectar estilos en el documento
if (typeof document !== 'undefined') {
	const styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';
	styleSheet.innerText = styles;
	
	// Verificar si ya existe para evitar duplicados
	const existingStyles = document.querySelector('style[data-task-manager]');
	if (!existingStyles) {
		styleSheet.setAttribute('data-task-manager', 'true');
		document.head.appendChild(styleSheet);
	}
}
