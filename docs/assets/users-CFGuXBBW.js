import{r as i,j as t,ab as L}from"./index-CP91G1nj.js";const O=({metaData:d})=>{const[s,l]=i.useState([]),[o,g]=i.useState("all"),[f,j]=i.useState(null),[n,x]=i.useState({title:"",description:"",dueDate:"",completed:!1}),[k,b]=i.useState(!1),[m,y]=i.useState(!1);i.useEffect(()=>{S()},[]);const p=e=>{try{localStorage.setItem("personal-tasks",JSON.stringify(e))}catch(a){console.error("Error saving tasks to localStorage:",a)}},S=()=>{try{const e=localStorage.getItem("personal-tasks");e&&l(JSON.parse(e))}catch(e){console.error("Error loading tasks from localStorage:",e)}},h=e=>{const{name:a,value:r}=e.target;x(q=>({...q,[a]:r}))},T=()=>n.title.trim()?n.description.trim()?n.dueDate?!m&&n.dueDate<w()?(alert("La fecha límite no puede ser anterior a hoy"),!1):!0:(alert("La fecha límite es obligatoria"),!1):(alert("La descripción es obligatoria"),!1):(alert("El título es obligatorio"),!1),D=e=>{if(e.preventDefault(),!!T()){if(m&&f){const a=s.map(r=>r.id===f.id?{...r,...n,updatedAt:u()}:r);l(a),p(a)}else{const a={id:Date.now().toString(),...n,completed:!1,createdAt:u(),updatedAt:u()},r=[...s,a];l(r),p(r)}v()}},v=()=>{x({title:"",description:"",dueDate:"",completed:!1}),b(!1),y(!1),j(null)},C=e=>{const a=s.map(r=>r.id===e?{...r,completed:!r.completed,updatedAt:u()}:r);l(a),p(a)},E=e=>{x({title:e.title,description:e.description,dueDate:e.dueDate,completed:e.completed}),j(e),y(!0),b(!0)},F=e=>{if(window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")){const a=s.filter(r=>r.id!==e);l(a),p(a)}},N=()=>{switch(o){case"pending":return s.filter(e=>!e.completed);case"completed":return s.filter(e=>e.completed);default:return s}},z=e=>{const a=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(a.getTime())?"Fecha inválida":a.toLocaleDateString("es-ES",{year:"numeric",month:"short",day:"numeric"})},A=e=>{const a=new Date(e);return isNaN(a.getTime())?"Fecha inválida":a.toLocaleDateString("es-ES",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},c=e=>{const a=new Date,r=a.getFullYear()+"-"+String(a.getMonth()+1).padStart(2,"0")+"-"+String(a.getDate()).padStart(2,"0");return e<r},w=()=>{const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")},u=()=>new Date().toISOString();return t.jsxs(t.Fragment,{children:[t.jsx(L,{metaData:d}),t.jsxs("div",{className:"task-manager",children:[t.jsxs("div",{className:"task-header",children:[t.jsx("h1",{children:"📋 Sistema de Gestión de Tareas Personales"}),t.jsx("button",{className:"btn-primary",onClick:()=>b(!0),disabled:k,children:"➕ Nueva Tarea"})]}),t.jsxs("div",{className:"filters",children:[t.jsxs("button",{className:o==="all"?"filter-btn active":"filter-btn",onClick:()=>g("all"),children:["📋 Todas (",s.length,")"]}),t.jsxs("button",{className:o==="pending"?"filter-btn active":"filter-btn",onClick:()=>g("pending"),children:["⏳ Pendientes (",s.filter(e=>!e.completed).length,")"]}),t.jsxs("button",{className:o==="completed"?"filter-btn active":"filter-btn",onClick:()=>g("completed"),children:["✅ Completadas (",s.filter(e=>e.completed).length,")"]})]}),k&&t.jsx("div",{className:"form-overlay",children:t.jsxs("div",{className:"task-form",children:[t.jsx("h2",{children:m?"✏️ Editar Tarea":"➕ Nueva Tarea"}),t.jsxs("form",{onSubmit:D,children:[t.jsxs("div",{className:"form-group",children:[t.jsx("label",{htmlFor:"title",children:"Título *"}),t.jsx("input",{type:"text",id:"title",name:"title",value:n.title,onChange:h,placeholder:"Título de la tarea...",required:!0})]}),t.jsxs("div",{className:"form-group",children:[t.jsx("label",{htmlFor:"description",children:"Descripción *"}),t.jsx("textarea",{id:"description",name:"description",value:n.description,onChange:h,placeholder:"Describe la tarea...",rows:"3",required:!0})]}),t.jsxs("div",{className:"form-group",children:[t.jsx("label",{htmlFor:"dueDate",children:"Fecha Límite *"}),t.jsx("input",{type:"date",id:"dueDate",name:"dueDate",value:n.dueDate,onChange:h,min:w(),required:!0})]}),t.jsxs("div",{className:"form-actions",children:[t.jsx("button",{type:"submit",className:"btn-success",children:m?"💾 Actualizar":"➕ Crear Tarea"}),t.jsx("button",{type:"button",className:"btn-secondary",onClick:v,children:"❌ Cancelar"})]})]})]})}),t.jsx("div",{className:"tasks-container",children:N().length===0?t.jsxs("div",{className:"empty-state",children:[t.jsxs("h3",{children:[o==="all"&&"📝 No hay tareas creadas",o==="pending"&&"🎉 No hay tareas pendientes",o==="completed"&&"📋 No hay tareas completadas"]}),t.jsxs("p",{children:[o==="all"&&'Crea tu primera tarea haciendo clic en "Nueva Tarea"',o==="pending"&&"¡Genial! Has completado todas tus tareas",o==="completed"&&"Las tareas completadas aparecerán aquí"]})]}):t.jsx("div",{className:"tasks-grid",children:N().map(e=>t.jsxs("div",{className:`task-card ${e.completed?"completed":""} ${c(e.dueDate)&&!e.completed?"overdue":""}`,children:[t.jsxs("div",{className:"task-content",children:[t.jsxs("div",{className:"task-header-card",children:[t.jsx("h3",{className:e.completed?"completed-title":"",children:e.title}),t.jsx("div",{className:"task-status",children:e.completed?"✅":c(e.dueDate)?"🚨":"⏳"})]}),t.jsx("p",{className:"task-description",children:e.description}),t.jsxs("div",{className:"task-meta",children:[t.jsxs("span",{className:`due-date ${c(e.dueDate)&&!e.completed?"overdue":""}`,children:["📅 ",z(e.dueDate),c(e.dueDate)&&!e.completed&&" (Vencida)"]}),t.jsxs("span",{className:"created-date",children:["Creada: ",A(e.createdAt)]})]})]}),t.jsxs("div",{className:"task-actions",children:[t.jsx("button",{className:`btn-toggle ${e.completed?"completed":"pending"}`,onClick:()=>C(e.id),title:e.completed?"Marcar como pendiente":"Marcar como completada",children:e.completed?"↩️ Reabrir":"✅ Completar"}),t.jsx("button",{className:"btn-edit",onClick:()=>E(e),title:"Editar tarea",children:"✏️ Editar"}),t.jsx("button",{className:"btn-delete",onClick:()=>F(e.id),title:"Eliminar tarea",children:"🗑️ Eliminar"})]})]},e.id))})}),t.jsxs("div",{className:"stats",children:[t.jsxs("div",{className:"stat-item",children:[t.jsx("span",{className:"stat-number",children:s.length}),t.jsx("span",{className:"stat-label",children:"Total"})]}),t.jsxs("div",{className:"stat-item",children:[t.jsx("span",{className:"stat-number",children:s.filter(e=>!e.completed).length}),t.jsx("span",{className:"stat-label",children:"Pendientes"})]}),t.jsxs("div",{className:"stat-item",children:[t.jsx("span",{className:"stat-number",children:s.filter(e=>e.completed).length}),t.jsx("span",{className:"stat-label",children:"Completadas"})]}),t.jsxs("div",{className:"stat-item",children:[t.jsx("span",{className:"stat-number",children:s.filter(e=>c(e.dueDate)&&!e.completed).length}),t.jsx("span",{className:"stat-label",children:"Vencidas"})]})]})]})]})},I=`
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
`;if(typeof document<"u"){const d=document.createElement("style");d.type="text/css",d.innerText=I,document.querySelector("style[data-task-manager]")||(d.setAttribute("data-task-manager","true"),document.head.appendChild(d))}export{O as Users,O as default};
