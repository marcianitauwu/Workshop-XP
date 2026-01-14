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
        unitTests: [],
        pairProgramming: []
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
document.addEventListener('DOMContentLoaded', async () => {
    await autoLoadFromDataFolder();
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
        unitTests: 'Prueba Unitaria',
        pairProgramming: 'Sesión de Programación en Parejas',
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
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa la tarjeta CRC..." required></textarea>
            </div>
            <div class="form-group">
                <label>Link (Documento, Imagen, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `,
        metaphor: `
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa la metáfora del sistema..." required></textarea>
            </div>
            <div class="form-group">
                <label>Link (Documento, Imagen, Drive, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `,
        spikes: `
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="input-title" placeholder="Solución Puntual..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa la solución..."></textarea>
            </div>
            <div class="form-group">
                <label>Link (Documento, GitHub, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `,
        minimal: `
            <div class="form-group">
                <label>Funcionalidad</label>
                <input type="text" id="input-title" placeholder="Funcionalidad Mínima..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa la funcionalidad mínima..."></textarea>
            </div>
            <div class="form-group">
                <label>Link (Documento, Prototipo, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `,
        refactoring: `
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="input-title" placeholder="Reciclaje/Refactoring..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa los cambios realizados..."></textarea>
            </div>
            <div class="form-group">
                <label>Link (Commit, Pull Request, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `,
        classDiagram: `
            <div class="form-group">
                <label>Título</label>
                <input type="text" id="input-title" placeholder="Diagrama de Clases v1.0..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa el diagrama..."></textarea>
            </div>
            <div class="form-group">
                <label>Link (Imagen, Documento, Draw, Lucidchart, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `,
        useCases: `
            <div class="form-group">
                <label>Título</label>
                <input type="text" id="input-title" placeholder="Casos de Uso..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa los casos de uso..."></textarea>
            </div>
            <div class="form-group">
                <label>Link (Imagen, Documento, Lucidchart, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `,
        architecture: `
            <div class="form-group">
                <label>Título</label>
                <input type="text" id="input-title" placeholder="Arquitectura del Sistema..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa la arquitectura..."></textarea>
            </div>
            <div class="form-group">
                <label>Link (Imagen, Documento, Draw, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `,
        erDiagram: `
            <div class="form-group">
                <label>Título</label>
                <input type="text" id="input-title" placeholder="Diagrama Entidad-Relación..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa el modelo de datos..."></textarea>
            </div>
            <div class="form-group">
                <label>Link (Imagen, Documento, Lucidchart, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
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
        `,
        unitTests: `
            <div class="form-group">
                <label>Nombre de la Prueba</label>
                <input type="text" id="input-title" placeholder="Test Login" required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Prueba unitaria del login"></textarea>
             </div>
            <div class="form-group">
                <label>Link (GitHub, GitLab, Drive, etc.)</label>
                <input type="url" id="input-link" placeholder="https://github.com/..." required>
            </div>
        `,
        pairProgramming: `
            <div class="form-group">
                <label>Sesión</label>
                <input type="text" id="input-title" placeholder="Pair Programming Sprint 1" required>
            </div>
            <div class="form-group">
             <label>Descripción</label>
                <textarea id="input-description" placeholder="Qué se trabajó en la sesión"></textarea>
             </div>
        <div class="form-group">
        <label>Link (Repositorio / Documento)</label>
        <input type="url" id="input-link" placeholder="https://..." required>
        </div>
        `,
        deployment: `
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="input-title" placeholder="Implantación v1.0..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa la implantación..."></textarea>
            </div>
            <div class="form-group">
                <label>Link (Servidor, Documento, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `,
        acceptanceTests: `
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="input-title" placeholder="Prueba de Aceptación..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa la prueba..."></textarea>
            </div>
            <div class="form-group">
                <label>Link (Documento, GitHub, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `,
        meetings: `
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="input-title" placeholder="Reunión..." required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="input-description" placeholder="Describa la reunión..."></textarea>
            </div>
            <div class="form-group">
                <label>Link (Documento, Acta, etc.)</label>
                <input type="url" id="input-link" placeholder="https://..." required>
            </div>
        `
    };
    
    return forms[type] || forms['unitTests'];
}

// Save artifact
async function saveArtifact() {
    const type = currentArtifactType;
    const artifact = collectFormData(type);
    
    if (!artifact) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Validar que todos los campos requeridos estén presentes
    const requiredFields = ['title', 'description'];
    if (type === 'unitTests' || type === 'pairProgramming') {
        requiredFields.push('link');
    }
    
    for (const field of requiredFields) {
        if (!artifact[field]) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }
    }
    
    // Validar formato de enlace para tipos que lo requieren
    if ((type === 'unitTests' || type === 'pairProgramming') && artifact.link) {
        if (!artifact.link.startsWith('http://') && !artifact.link.startsWith('https://')) {
            alert('El enlace debe comenzar con http:// o https://');
            return;
        }
    }
    
    const phaseKey = getPhaseForType(type);
    
    if (editIndex >= 0) {
        data[phaseKey][type][editIndex] = artifact;
    } else {
        data[phaseKey][type].push(artifact);
    }

    // Guardar en localStorage
    saveToLocalStorage(phaseKey, type);
    
    closeModal();
    switchPhase(currentPhase);
    console.log(`✅ Guardado: ${phaseKey}/${type}`);
}

// Delete artifact
async function deleteArtifact(type, index) {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;
    
    const phaseKey = getPhaseForType(type);
    data[phaseKey][type].splice(index, 1);
    
    saveToLocalStorage(phaseKey, type);
    
    switchPhase(currentPhase);
    console.log(`🗑️ Eliminado: ${phaseKey}/${type}`);
}

// Get folder name
function getFolderName(phase) {
    const folderMap = {
        'planning': '1-Planning',
        'design': '2-Design',
        'coding': '3-Coding',
        'testing': '4-Testing',
        'team': '5-Team'
    };
    return folderMap[phase] || phase;
}

// Auto-cargar desde data/ o localStorage
async function autoLoadFromDataFolder() {
    console.log('🔄 Cargando datos automáticamente...');
    
    let totalLoaded = 0;
    let fromLocalStorage = 0;
    
    for (const [phase, types] of Object.entries(data)) {
        const folderName = getFolderName(phase);
        
        for (const type of Object.keys(types)) {
            data[phase][type] = [];
            let foundFiles = false;
            
            // Intentar varios formatos comunes (hasta 20 archivos)
            for (let i = 1; i <= 20; i++) {
                const patterns = [
                    `data/${folderName}/${i}-${folderName}_${type}.json`,
                    `data/${folderName}/${folderName}_${type}_${i}.json`,
                    `data/${folderName}/${type}.json`, // Sin número
                ];
                
                for (const filePath of patterns) {
                    try {
                        const response = await fetch(filePath, { 
                            cache: 'no-cache',
                            headers: { 'Accept': 'application/json' }
                        });
                        
                        if (response.ok) {
                            const text = await response.text();
                            if (text.trim()) {
                                const content = JSON.parse(text);
                                
                                if (Array.isArray(content)) {
                                    data[phase][type].push(...content);
                                } else {
                                    data[phase][type].push(content);
                                }
                                
                                foundFiles = true;
                                totalLoaded++;
                                console.log(`✅ ${filePath} - ${Array.isArray(content) ? content.length : 1} items`);
                            }
                        }
                    } catch (error) {
                        // Continuar silenciosamente
                    }
                }
            }
            
            if (foundFiles && data[phase][type].length > 0) {
                try {
                    localStorage.setItem(`xp_${phase}_${type}`, JSON.stringify(data[phase][type]));
                } catch (e) {}
                console.log(`📦 ${phase}/${type}: ${data[phase][type].length} items totales`);
            } else {
                // Intentar localStorage
                try {
                    const saved = localStorage.getItem(`xp_${phase}_${type}`);
                    if (saved) {
                        data[phase][type] = JSON.parse(saved);
                        if (data[phase][type].length > 0) {
                            console.log(`💾 ${phase}/${type}: ${data[phase][type].length} items desde localStorage`);
                            fromLocalStorage++;
                        }
                    }
                } catch (e) {
                    data[phase][type] = [];
                }
            }
        }
    }
    
    if (totalLoaded > 0) {
        console.log(`🎉 ${totalLoaded} archivos desde data/`);
    }
    if (fromLocalStorage > 0) {
        console.log(`💾 ${fromLocalStorage} desde localStorage`);
    }
    
    console.log('✅ Carga completada');
}

// ✨ FUNCIÓN SIMPLIFICADA: Cargar manualmente con botón
async function manualLoadFromData() {
    console.log('🔄 Cargando manualmente...');
    console.log('📍 URL:', window.location.href);
    
    if (window.location.protocol === 'file:') {
        alert('❌ Usa Live Server en VS Code');
        return;
    }
    
    let totalLoaded = 0;
    let totalItems = 0;
    
    // Para cada fase y tipo
    for (const [phase, types] of Object.entries(data)) {
        const folderName = getFolderName(phase);
        
        for (const type of Object.keys(types)) {
            data[phase][type] = [];
            
            // Buscar archivos con diferentes formatos
            for (let i = 1; i <= 20; i++) {
                // Lista de patrones a probar
                const patterns = [
                    `${i}-${folderName}_${type}.json`,
                    `${folderName}_${type}_${i}.json`,
                    `${i}-${folderName}_${type}_${i}.json`,
                ];
                
                // Agregar patrones con fecha (solo el año actual y próximos 2)
                const currentYear = new Date().getFullYear();
                for (let year = currentYear - 1; year <= currentYear + 2; year++) {
                    patterns.push(`${i}-${folderName}_${type}_${i}_${year}-01-14.json`);
                    patterns.push(`${i}-${folderName}_${type}_${i}_${year}-01-15.json`);
                }
                
                let found = false;
                
                for (const fileName of patterns) {
                    const filePath = `data/${folderName}/${fileName}`;
                    
                    try {
                        const response = await fetch(filePath, { 
                            cache: 'no-cache',
                            headers: { 'Accept': 'application/json' }
                        });
                        
                        if (response.ok) {
                            const text = await response.text();
                            if (text.trim()) {
                                const content = JSON.parse(text);
                                
                                if (Array.isArray(content)) {
                                    data[phase][type].push(...content);
                                    totalItems += content.length;
                                    console.log(`✅ ${filePath}: ${content.length} items`);
                                } else {
                                    data[phase][type].push(content);
                                    totalItems++;
                                    console.log(`✅ ${filePath}: 1 item`);
                                }
                                
                                totalLoaded++;
                                found = true;
                                break;
                            }
                        }
                    } catch (error) {
                        // Continuar buscando
                    }
                }
                
                // Si no encontró nada en este número, continuar
                if (!found && i > 3) break;
            }
            
            if (data[phase][type].length > 0) {
                saveToLocalStorage(phase, type);
                console.log(`💾 Total ${phase}/${type}: ${data[phase][type].length} items`);
            }
        }
    }
    
    switchPhase(currentPhase);
    
    if (totalLoaded > 0) {
        alert(`✅ Cargados ${totalLoaded} archivos con ${totalItems} items`);
        console.log(`🎉 Total: ${totalLoaded} archivos, ${totalItems} items`);
    } else {
        alert(`⚠️ No se encontraron archivos en data/\n\nFormatos soportados:\n• 1-1-Planning_stories.json\n• 1-3-Coding_unitTests_1_2026-01-14.json`);
    }
}

// Local storage functions
function saveToLocalStorage(phase, type) {
    try {
        localStorage.setItem(`xp_${phase}_${type}`, JSON.stringify(data[phase][type]));
        console.log(`💾 Guardado en localStorage: ${phase}/${type}`);
    } catch (e) {
        console.warn('⚠️ No se pudo guardar en localStorage (modo incógnito?)');
    }
}

// Descargar artefacto individual
function downloadSingleArtifact(phase, type, index) {
    try {
        const artifact = data[phase][type][index];
        
        if (!artifact) {
            console.error('Artefacto no encontrado');
            return;
        }
        
        const folderName = getFolderName(phase);
        const timestamp = new Date().toISOString().slice(0, 10);
        const fileName = `${folderName}_${type}_${index + 1}_${timestamp}.json`;
        
        const dataStr = JSON.stringify(artifact, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = fileName;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
        
        console.log(`💾 Descargado: ${fileName}`);
        
    } catch (error) {
        console.error('❌ Error al descargar:', error);
        alert('Error al descargar el archivo');
    }
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
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        metaphor: () => ({
            title: "Metáfora del Sistema",
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        spikes: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        minimal: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        refactoring: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        classDiagram: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        useCases: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        architecture: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        erDiagram: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        teamMember: () => ({
            name: document.getElementById('input-name')?.value,
            cedula: document.getElementById('input-cedula')?.value,
            role: document.getElementById('input-role')?.value,
            email: document.getElementById('input-email')?.value
        }),
        unitTests: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        pairProgramming: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        deployment: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        acceptanceTests: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        }),
        meetings: () => ({
            title: document.getElementById('input-title')?.value,
            description: document.getElementById('input-description')?.value,
            link: document.getElementById('input-link')?.value,
            date: new Date().toISOString()
        })
    };
    
    const collector = forms[type];
    return collector ? collector() : null;
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

// Get container ID for type
function getContainerId(type) {
    const containerMap = {
        stories: 'stories-container',
        releases: 'releases-container',
        velocity: 'velocity-container',
        iterations: 'iterations-container',
        meetings: 'meetings-container',
        metaphor: 'metaphor-container',
        crc: 'crc-container',
        spikes: 'spikes-container',
        minimal: 'minimal-container',
        refactoring: 'refactoring-container',
        classDiagram: 'classDiagram-container',
        useCases: 'useCases-container',
        architecture: 'architecture-container',
        erDiagram: 'erDiagram-container',
        unitTests: 'unit-tests-container',
        pairProgramming: 'pair-programming-container',
        deployment: 'deployment-container',
        acceptanceTests: 'acceptanceTests-container',
        teamMember: 'team-members-container'
    };
    return containerMap[type] || `${type}-container`;
}

// Render phase
function renderPhase(phase) {
    const phaseData = data[phase];
    
    for (const [type, items] of Object.entries(phaseData)) {
        const containerId = getContainerId(type);
        const container = document.getElementById(containerId);
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
        releases: (item) => `
            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-id">${item.version}</div>
                        <div class="card-date">${new Date(item.date).toLocaleDateString('es-CO')}</div>
                    </div>
                </div>
                <div class="card-content">${item.description}</div>
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
                    <div class="card-title">${item.description?.substring(0, 50)}...</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        unitTests: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        pairProgramming: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        metaphor: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.description?.substring(0, 50)}...</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        spikes: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        minimal: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        refactoring: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        classDiagram: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        useCases: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        architecture: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        erDiagram: (item) => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="card-content">${item.description}</div>
                ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Ver enlace</a></div>` : ''}
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
        // ...existing code...
    };
    
    const defaultRenderer = (item) => `
        <div class="card">
            <div class="card-header">
                <div class="card-title">${item.title || 'Sin título'}</div>
            </div>
            <div class="card-content">${item.description || ''}</div>
            ${item.link ? `<div class="card-content"><i class="fas fa-link"></i> <a href="${item.link}" target="_blank">Abrir enlace</a></div>` : ''}
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