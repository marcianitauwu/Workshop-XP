// State management
let currentPhase = 'planning';
let currentArtifactType = '';
let editIndex = -1;

// Data structure
const data = {
    planning: {
        stories: [],
        releases: [],
        velocity: [],
        iterations: [],
        rotations: [],
        meetings: []
    },
    design: {
        metaphor: [],
        crc: [],
        spikes: [],
        minimal: [],
        refactoring: [],
        classDiagram: [],
        useCases: [],
        architecture: [],
        erDiagram: []
    },
    coding: {
        clientAvailability: [],
        unitTests: [],
        pairProgramming: [],
        integration: []
    },
    testing: {
        deployment: [],
        acceptanceTests: []
    },
    team: {
        teamMember: []
    }
};

// Phase configuration
const phaseConfig = {
    timeline: {
        title: 'Línea de Tiempo',
        subtitle: 'Visualiza el progreso de todas las fases de XP'
    },
    metrics: {
        title: 'Métricas',
        subtitle: 'Indicadores clave del proyecto'
    },
    planning: {
        title: 'Planning',
        subtitle: 'Gestión de historias de usuario y planificación del proyecto'
    },
    design: {
        title: 'Design',
        subtitle: 'Diseño de la arquitectura y componentes del sistema'
    },
    coding: {
        title: 'Coding',
        subtitle: 'Desarrollo y programación del proyecto'
    },
    testing: {
        title: 'Testing',
        subtitle: 'Pruebas y validación del sistema'
    },
    team: {
        title: 'Equipo',
        subtitle: 'Gestión de roles y miembros del equipo'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadAllData();
    loadTheme();
    switchPhase('planning');
});

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    const icon = document.getElementById('theme-icon');
    
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
    }
}

// Phase switching
function switchPhase(phase) {
    currentPhase = phase;
    
    // Update navbar
    document.querySelectorAll('.nav-link-direct').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${phase}`)?.classList.add('active');
    
    // Update phase title
    document.getElementById('phase-heading').textContent = phaseConfig[phase].title;
    document.getElementById('phase-sub').textContent = phaseConfig[phase].subtitle;
    
    // Show/hide views
    document.querySelectorAll('.phase-view').forEach(view => {
        view.style.display = 'none';
    });
    document.getElementById(`view-${phase}`).style.display = 'block';
    
    // Hide action button for special views
    const actionBtn = document.getElementById('main-action-btn');
    if (['timeline', 'metrics'].includes(phase)) {
        actionBtn.style.display = 'none';
    } else {
        actionBtn.style.display = 'flex';
    }
    
    // Render specific views
    if (phase === 'timeline') {
        renderTimeline();
    } else if (phase === 'metrics') {
        renderMetrics();
    } else if (phase === 'team') {
        renderTeam();
    } else {
        renderPhase(phase);
    }
}

// Render timeline
function renderTimeline() {
    const wrapper = document.getElementById('timeline-wrapper');
    
    const phases = [
        { name: 'Planning', icon: 'fa-calendar-alt', color: '#7c3aed', phase: 'planning' },
        { name: 'Design', icon: 'fa-pencil-ruler', color: '#a855f7', phase: 'design' },
        { name: 'Coding', icon: 'fa-code', color: '#6d28d9', phase: 'coding' },
        { name: 'Testing', icon: 'fa-check-circle', color: '#c084fc', phase: 'testing' }
    ];
    
    let html = '';
    
    phases.forEach(p => {
        const phaseData = data[p.phase];
        const totalItems = Object.values(phaseData).reduce((sum, arr) => sum + arr.length, 0);
        const progress = totalItems > 0 ? Math.min(100, (totalItems / 10) * 100) : 0;
        
        html += `
            <div class="timeline-item">
                <div class="timeline-marker" style="background: ${p.color};">
                    <i class="fas ${p.icon}"></i>
                </div>
                <div class="timeline-content">
                    <h3>${p.name}</h3>
                    <p>Artefactos creados: ${totalItems}</p>
                    <div class="timeline-progress">
                        <div class="timeline-progress-bar" style="width: ${progress}%; background: ${p.color};"></div>
                    </div>
                </div>
            </div>
        `;
    });
    
    wrapper.innerHTML = html;
}

// Render metrics
function renderMetrics() {
    // Calculate metrics
    const totalStories = data.planning.stories.length;
    const totalIterations = data.planning.iterations.length;
    const totalTeam = data.team.teamMember.length;
    const totalTests = data.coding.unitTests.length + data.testing.acceptanceTests.length;
    
    const avgVelocity = data.planning.velocity.length > 0
        ? Math.round(data.planning.velocity.reduce((sum, v) => sum + (v.completed || 0), 0) / data.planning.velocity.length)
        : 0;
    
    const completedStories = data.planning.stories.filter(s => s.completed).length;
    
    // Update metric cards
    document.getElementById('metric-stories').textContent = totalStories;
    document.getElementById('metric-completed').textContent = completedStories;
    document.getElementById('metric-velocity').textContent = avgVelocity;
    document.getElementById('metric-iterations').textContent = totalIterations;
    document.getElementById('metric-team').textContent = totalTeam;
    document.getElementById('metric-tests').textContent = totalTests;
    
    // Render charts
    renderVelocityChart();
    renderPriorityChart();
}

// Render velocity chart
function renderVelocityChart() {
    const canvas = document.getElementById('velocity-canvas');
    const ctx = canvas.getContext('2d');
    
    // Simple bar chart
    const velocityData = data.planning.velocity.slice(-6);
    
    if (velocityData.length === 0) {
        ctx.fillStyle = '#5b5f72';
        ctx.font = '14px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.fillText('No hay datos de velocidad', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    // Draw simple bars
    const barWidth = canvas.width / velocityData.length - 20;
    const maxValue = Math.max(...velocityData.map(v => v.completed || 0), 1);
    
    velocityData.forEach((v, i) => {
        const height = (v.completed / maxValue) * (canvas.height - 60);
        const x = i * (barWidth + 20) + 10;
        const y = canvas.height - height - 30;
        
        ctx.fillStyle = '#7c3aed';
        ctx.fillRect(x, y, barWidth, height);
        
        ctx.fillStyle = '#5b5f72';
        ctx.font = '12px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.fillText(v.iteration || `Iter ${i + 1}`, x + barWidth / 2, canvas.height - 10);
        ctx.fillText(v.completed, x + barWidth / 2, y - 5);
    });
}

// Render priority chart
function renderPriorityChart() {
    const canvas = document.getElementById('priority-canvas');
    const ctx = canvas.getContext('2d');
    
    const priorities = { Alta: 0, Media: 0, Baja: 0 };
    data.planning.stories.forEach(s => {
        if (priorities.hasOwnProperty(s.priority)) {
            priorities[s.priority]++;
        }
    });
    
    const total = Object.values(priorities).reduce((a, b) => a + b, 0);
    
    if (total === 0) {
        ctx.fillStyle = '#5b5f72';
        ctx.font = '14px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.fillText('No hay historias de usuario', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    // Simple pie chart
    const colors = { Alta: '#7c3aed', Media: '#a855f7', Baja: '#c084fc' };
    let currentAngle = -Math.PI / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    
    Object.entries(priorities).forEach(([priority, count]) => {
        const sliceAngle = (count / total) * 2 * Math.PI;
        
        ctx.fillStyle = colors[priority];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // Label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
        
        ctx.fillStyle = '#1e1b4b';
        ctx.font = '12px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.fillText(`${priority}: ${count}`, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
}

// Render team
function renderTeam() {
    const container = document.getElementById('team-members-container');
    const members = data.team.teamMember;
    
    if (members.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No hay miembros en el equipo</p>';
        return;
    }
    
    container.innerHTML = members.map((member, index) => `
        <div class="team-member-card">
            <div class="team-avatar">${member.name.charAt(0).toUpperCase()}</div>
            <div class="team-name">${member.name}</div>
            <div class="team-role">Cédula: ${member.cedula || 'N/A'}</div>
            <div class="team-role">${member.role}</div>
            <div class="team-email">${member.email}</div>
            <div class="card-actions" style="justify-content: center; margin-top: 16px;">
                <button class="icon-btn download" onclick="downloadSingleArtifact('team', 'teamMember', ${index})">
                    <i class="fas fa-download"></i>
                </button>
                <button class="icon-btn delete" onclick="deleteArtifact('teamMember', ${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Add artifact
function addArtifact(type) {
    currentArtifactType = type;
    editIndex = -1;
    openModal(type);
}

// Open modal
function openModal(type = currentArtifactType) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    modalTitle.textContent = getModalTitle(type);
    modalContent.innerHTML = getModalForm(type);
    
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    currentArtifactType = '';
    editIndex = -1;
}

// Get modal title
function getModalTitle(type) {
    const titles = {
        stories: 'Historia de Usuario',
        releases: 'Plan de Entrega',
        velocity: 'Velocidad de Proyecto',
        iterations: 'Iteración',
        rotations: 'Rotación',
        meetings: 'Reunión',
        metaphor: 'Metáfora del Sistema',
        crc: 'Tarjeta CRC',
        spikes: 'Solución Puntual',
        minimal: 'Funcionalidad Mínima',
        refactoring: 'Reciclaje',
        classDiagram: 'Diagrama de Clases',
        useCases: 'Casos de Uso',
        architecture: 'Arquitectura',
        erDiagram: 'Diagrama Entidad-Relación',
        clientAvailability: 'Disponibilidad del Cliente',
        unitTests: 'Prueba Unitaria',
        pairProgramming: 'Sesión de Programación en Parejas',
        integration: 'Integración Continua',
        deployment: 'Implantación',
        acceptanceTests: 'Prueba de Aceptación',
        teamMember: 'Miembro del Equipo'
    };
    return titles[type] || 'Nuevo Elemento';
}

// Get modal form
function getModalForm(type) {
    const forms = {
        stories: `
            <div class="form-group">
                <label>ID</label>
                <input type="text" id="input-id" placeholder="HU-001" required>
            </div>
            <div class="form-group">
                <label>Título</label>
                <input type="text" id="input-title" placeholder="Como usuario..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Quiero... Para..."></textarea>
            </div>
            <div class="form-group">
                <label>Prioridad</label>
                <select id="input-priority">
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
            </div>
            <div class="form-group">
                <label>Puntos de Historia</label>
                <input type="number" id="input-points" value="1" min="1">
            </div>
        `,
        releases: `
            <div class="form-group">
                <label>Versión</label>
                <input type="text" id="input-version" placeholder="v1.0.0" required>
            </div>
            <div class="form-group">
                <label>Fecha de Entrega</label>
                <input type="date" id="input-date" required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Características principales..."></textarea>
            </div>
        `,
        velocity: `
            <div class="form-group">
                <label>Iteración</label>
                <input type="text" id="input-iteration" placeholder="Sprint 1" required>
            </div>
            <div class="form-group">
                <label>Puntos Planificados</label>
                <input type="number" id="input-planned" value="0" min="0">
            </div>
            <div class="form-group">
                <label>Puntos Completados</label>
                <input type="number" id="input-completed" value="0" min="0">
            </div>
        `,
        iterations: `
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="input-name" placeholder="Sprint 1" required>
            </div>
            <div class="form-group">
                <label>Fecha Inicio</label>
                <input type="date" id="input-start-date" required>
            </div>
            <div class="form-group">
                <label>Fecha Fin</label>
                <input type="date" id="input-end-date" required>
            </div>
            <div class="form-group">
                <label>Objetivo</label>
                <textarea id="input-goal"></textarea>
            </div>
        `,
        crc: `
            <div class="form-group">
                <label>Nombre de Clase</label>
                <input type="text" id="input-class-name" placeholder="Usuario" required>
            </div>
            <div class="form-group">
                <label>Responsabilidades</label>
                <textarea id="input-responsibilities" placeholder="Una por línea..."></textarea>
            </div>
            <div class="form-group">
                <label>Colaboradores</label>
                <textarea id="input-collaborators" placeholder="Una por línea..."></textarea>
            </div>
        `,
        teamMember: `
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="input-name" placeholder="Juan Pérez" required>
            </div>
            <div class="form-group">
                <label>Cédula</label>
                <input type="text" id="input-cedula" placeholder="0123456789" required>
            </div>
            <div class="form-group">
                <label>Rol</label>
                <select id="input-role">
                    <option value="Developer">Developer</option>
                    <option value="Tester">Tester</option>
                    <option value="Coach">Coach</option>
                    <option value="Customer">Customer</option>
                    <option value="Tracker">Tracker</option>
                </select>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="input-email" placeholder="correo@ejemplo.com" required>
            </div>
        `
    };
    
    // Default form for file uploads
    const defaultFileForm = `
        <div class="form-group">
            <label>Título</label>
            <input type="text" id="input-title" required>
        </div>
        <div class="form-group">
            <label>Descripción</label>
            <textarea id="input-description"></textarea>
        </div>
        <div class="form-group">
            <label>Archivo</label>
            <input type="file" id="input-file" accept="image/*,.pdf">
        </div>
    `;
    
    return forms[type] || defaultFileForm;
}

// Save artifact
function saveArtifact() {
    const type = currentArtifactType;
    const artifact = collectFormData(type);
    
    if (!artifact) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    const phaseKey = getPhaseForType(type);
    
    if (editIndex >= 0) {
        data[phaseKey][type][editIndex] = artifact;
    } else {
        data[phaseKey][type].push(artifact);
    }
    
    saveToLocalStorage(phaseKey, type);
    downloadArtifact(phaseKey, type, artifact);
    switchPhase(currentPhase);
    closeModal();
}

// Collect form data
function collectFormData(type) {
    const forms = {
        stories: () => ({
            id: document.getElementById('input-id')?.value,
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            priority: document.getElementById('input-priority')?.value,
            points: parseInt(document.getElementById('input-points')?.value) || 1,
            completed: false,
            date: new Date().toISOString()
        }),
        releases: () => ({
            version: document.getElementById('input-version')?.value,
            date: document.getElementById('input-date')?.value,
            description: document.getElementById('input-description')?.value
        }),
        velocity: () => ({
            iteration: document.getElementById('input-iteration')?.value,
            planned: parseInt(document.getElementById('input-planned')?.value) || 0,
            completed: parseInt(document.getElementById('input-completed')?.value) || 0
        }),
        iterations: () => ({
            name: document.getElementById('input-name')?.value,
            startDate: document.getElementById('input-start-date')?.value,
            endDate: document.getElementById('input-end-date')?.value,
            goal: document.getElementById('input-goal')?.value
        }),
        crc: () => ({
            className: document.getElementById('input-class-name')?.value,
            responsibilities: document.getElementById('input-responsibilities')?.value,
            collaborators: document.getElementById('input-collaborators')?.value
        }),
        teamMember: () => ({
            name: document.getElementById('input-name')?.value,
            cedula: document.getElementById('input-cedula')?.value,
            role: document.getElementById('input-role')?.value,
            email: document.getElementById('input-email')?.value
        })
    };
    
    // Default collector for file-based artifacts
    const defaultCollector = () => ({
        title: document.getElementById('input-title')?.value,
        description: document.getElementById('input-description')?.value,
        file: document.getElementById('input-file')?.files[0],
        date: new Date().toISOString()
    });
    
    const collector = forms[type] || defaultCollector;
    return collector();
}

// Get phase for type
function getPhaseForType(type) {
    for (const [phase, types] of Object.entries(data)) {
        if (types.hasOwnProperty(type)) {
            return phase;
        }
    }
    return 'planning';
}

// Render phase
function renderPhase(phase) {
    const phaseData = data[phase];
    
    for (const [type, items] of Object.entries(phaseData)) {
        const container = document.getElementById(`${type}-container`);
        if (container) {
            container.innerHTML = items.map((item, index) => renderCard(type, item, index)).join('');
        }
    }
}

// Render card
function renderCard(type, item, index) {
    const cardRenderers = {
        stories: (item) => `
            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-id">${item.id}</div>
                        <div class="card-title">${item.title}</div>
                    </div>
                    <span class="badge ${item.priority}">${item.priority}</span>
                </div>
                <div class="card-content">${item.description}</div>
                <div class="card-content"><strong>Puntos:</strong> ${item.points}</div>
                <div class="card-actions">
                    <button class="icon-btn download" onclick="downloadSingleArtifact('${currentPhase}', '${type}', ${index})">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="icon-btn delete" onclick="deleteArtifact('${type}', ${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `,
        crc: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.className}</div>
                </div>
                <table class="crc-table">
                    <tr>
                        <th>Responsabilidades</th>
                        <th>Colaboradores</th>
                    </tr>
                    <tr>
                        <td>${item.responsibilities?.replace(/\n/g, '<br>')}</td>
                        <td>${item.collaborators?.replace(/\n/g, '<br>')}</td>
                    </tr>
                </table>
                <div class="card-actions">
                    <button class="icon-btn download" onclick="downloadSingleArtifact('${currentPhase}', '${type}', ${index})">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="icon-btn delete" onclick="deleteArtifact('${type}', ${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `
    };
    
    // Default card renderer
    const defaultRenderer = (item) => `
        <div class="card">
            <div class="card-header">
                <div class="card-title">${item.title || item.name || item.version || item.className || 'Sin título'}</div>
            </div>
            <div class="card-content">${item.description || item.goal || ''}</div>
            ${item.file ? `<div class="card-content"><i class="fas fa-file"></i> Archivo adjunto</div>` : ''}
            <div class="card-actions">
                <button class="icon-btn download" onclick="downloadSingleArtifact('${currentPhase}', '${type}', ${index})">
                    <i class="fas fa-download"></i>
                </button>
                <button class="icon-btn delete" onclick="deleteArtifact('${type}', ${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    const renderer = cardRenderers[type] || defaultRenderer;
    return renderer(item);
}

// Delete artifact
function deleteArtifact(type, index) {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;
    
    const phaseKey = getPhaseForType(type);
    data[phaseKey][type].splice(index, 1);
    saveToLocalStorage(phaseKey, type);
    switchPhase(currentPhase);
}

// Local storage functions
function saveToLocalStorage(phase, type) {
    localStorage.setItem(`xp_${phase}_${type}`, JSON.stringify(data[phase][type]));
}

function loadAllData() {
    for (const [phase, types] of Object.entries(data)) {
        for (const type of Object.keys(types)) {
            const saved = localStorage.getItem(`xp_${phase}_${type}`);
            if (saved) {
                data[phase][type] = JSON.parse(saved);
            }
        }
    }
}

// Download functions
function downloadArtifact(phase, type, artifact) {
    const folderMap = {
        planning: '1-Planning',
        design: '2-Design',
        coding: '3-Coding',
        testing: '4-Testing',
        team: '5-Team'
    };
    
    const filename = `${folderMap[phase]}/${type}_${Date.now()}.json`;
    const dataStr = JSON.stringify(artifact, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = filename;
    link.click();
}

function downloadSingleArtifact(phase, type, index) {
    const artifact = data[phase][type][index];
    downloadArtifact(phase, type, artifact);
}

function exportAllData() {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `xp_roadmap_backup_${Date.now()}.json`;
    link.click();
}