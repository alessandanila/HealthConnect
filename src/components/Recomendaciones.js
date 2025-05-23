// Recomendaciones.js (TODO en un solo archivo con Chart.js)
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Recomendaciones.module.css'; // Mismo CSS, pero contendrá los estilos de modales

// Importar Chart.js y los componentes de React-Chartjs-2
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function Recomendaciones() {
    const location = useLocation();
    const { userId, textoUsuario, respuestasCuestionario } = location.state || {};

    const [recomendacionesApi, setRecomendacionesApi] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [categoriaActiva, setCategoriaActiva] = useState('Todas');
    const [modalAbierto, setModalAbierto] = useState(null); // Estado para controlar qué modal está abierto

    // --- Estados específicos para modales ---
    const [tiempoRestanteMeditacion, setTiempoRestanteMeditacion] = useState(10 * 60); // 10 minutos en segundos
    const [meditacionIniciada, setMeditacionIniciada] = useState(false);
    const [gratitud1, setGratitud1] = useState('');
    const [gratitud2, setGratitud2] = useState('');
    const [gratitud3, setGratitud3] = useState('');
    const [nombreContactoSocial, setNombreContactoSocial] = useState('');
    const [fechaHoraSocial, setFechaHoraSocial] = useState('');
    const [limiteMinutosDigital, setLimiteMinutosDigital] = useState(30);
    const [afirmacionGenerada, setAfirmacionGenerada] = useState('');
    const [emailMedico, setEmailMedico] = useState('');
    const [mensajeMedico, setMensajeMedico] = useState('Adjunto mis recomendaciones de bienestar mental.');


    const categorias = ['Todas', 'Ansiedad', 'Depresión', 'Estrés', 'Dormir'];

    const recomendacionesPersonalizadasEstaticas = [
        { id: 'respiracion478', tipo: 'tecnica-respiracion', titulo: 'Técnica de respiración', descripcion: 'Practica la respiración 4-7-8 cuando te sientas ansioso o abrumado', icono: '🌬️' },
        { id: 'conexionSocial', tipo: 'conexion-social', titulo: 'Conexión social', descripcion: 'Programe una videollamada con un amigo o familiar esta semana', icono: '🫂' },
        { id: 'desintoxicacionDigital', tipo: 'desintoxicacion-digital', titulo: 'Desintoxicación digital', descripcion: 'Limite el uso de las redes sociales a 30 minutos diarios para reducir la ansiedad por comparación.', icono: '📱' },
        { id: 'higieneSueno', tipo: 'higiene-sueno', titulo: 'Higiene del sueño', descripcion: 'Crea una rutina consistente a la hora de acostarse sin pantallas para un mejor descanso', icono: '😴' },
        { id: 'movimientoFisico', tipo: 'movimiento-fisico', titulo: 'Camine 15 minutos diariamente', descripcion: 'para aumentar las endorfinas y reducir el estrés.', icono: '🏃‍♂️' },
    ];

    const practicasDiarias = [
        { id: 'meditacion', icono: '⬇️', titulo: 'Meditación de atención plena', descripcion: 'Sesión guiada de 10 minutos para reducir la ansiedad y mejorar la conciencia del momento presente.', botonTexto: 'Iniciar sesión' },
        { id: 'diarioGratitud', icono: '📝', titulo: 'Diario de gratitud', descripcion: 'Registra tres cosas por las que estás agradecido para aumentar las emociones positivas y la resiliencia.', botonTexto: 'Revista abierta' },
        { id: 'terapiaNaturaleza', icono: '🧘‍♀️', titulo: 'Terapia de la naturaleza', descripcion: 'Pase 20 minutos al aire libre para reducir los niveles de cortisol y mejorar el estado de ánimo.', botonTexto: 'Ver guía' },
    ];

    const aiResources = [
        { id: 'afirmaciones', icono: '✨', titulo: 'Afirmaciones personalizadas', descripcion: 'Declaraciones positivas diarias adaptadas a tus desafíos y objetivos específicos.', botonTexto: 'Generar afirmaciones' },
        { id: 'sugerenciasLectura', icono: '📚', titulo: 'Sugerencias de lectura', descripcion: 'Artículos y libros basados en evidencia adaptados a tus necesidades de salud mental.', botonTexto: 'Ver biblioteca' },
        { id: 'listasReproduccion', icono: '🎧', titulo: 'Listas de reproducción personalizadas', descripcion: 'Música y meditaciones guiadas seleccionadas para mejorar tu estado de ánimo actual.', botonTexto: 'Escucha ahora' },
    ];

    // --- Datos y Opciones del Gráfico de Barras ---
    const moodData = {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], // Días de la semana
        datasets: [
            {
                label: 'Estado de Ánimo Promedio',
                data: [3, 4, 3, 5, 4, 5, 4], // Escala del 1 al 5 (ejemplo)
                backgroundColor: 'rgba(142, 68, 173, 0.7)', // Color morado
                borderColor: 'rgba(142, 68, 173, 1)',
                borderWidth: 1,
                borderRadius: 5, // Bordes redondeados para las barras
            },
        ],
    };

    const moodOptions = {
        responsive: true,
        maintainAspectRatio: false, // Permitir que el contenedor controle el tamaño
        plugins: {
            legend: {
                display: false, // No mostrar la leyenda si solo hay un dataset
            },
            title: {
                display: true,
                text: 'Estado de Ánimo Semanal',
                font: {
                    size: 16,
                    weight: 'bold',
                },
                color: '#333',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        // Traducir el valor numérico a un estado de ánimo
                        const moodValue = context.raw;
                        let moodText = '';
                        if (moodValue === 1) moodText = 'Muy Mal';
                        else if (moodValue === 2) moodText = 'Mal';
                        else if (moodValue === 3) moodText = 'Neutral';
                        else if (moodValue === 4) moodText = 'Bien';
                        else if (moodValue === 5) moodText = 'Excelente';
                        return label + moodText;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false, // No mostrar líneas de cuadrícula verticales
                },
                title: {
                    display: true,
                    text: 'Días de la Semana',
                    color: '#555',
                },
            },
            y: {
                beginAtZero: true,
                max: 5, // Escala de 1 a 5
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        // Traducir los valores numéricos del eje Y
                        if (value === 1) return 'Muy Mal';
                        if (value === 2) return 'Mal';
                        if (value === 3) return 'Neutral';
                        if (value === 4) return 'Bien';
                        if (value === 5) return 'Excelente';
                        return '';
                    },
                    color: '#555',
                },
                grid: {
                    color: '#e0e0e0', // Color para las líneas de cuadrícula horizontales
                },
                title: {
                    display: true,
                    text: 'Nivel de Ánimo',
                    color: '#555',
                },
            },
        },
    };
    // --- Fin Datos y Opciones del Gráfico de Barras ---


    // --- Lógica de Meditación ---
    useEffect(() => {
        let timer;
        if (meditacionIniciada && tiempoRestanteMeditacion > 0) {
            timer = setInterval(() => {
                setTiempoRestanteMeditacion(prevTime => prevTime - 1);
            }, 1000);
        } else if (tiempoRestanteMeditacion === 0) {
            clearInterval(timer);
            alert("¡Sesión de meditación completada!");
            setMeditacionIniciada(false); // Detener al finalizar
        }
        return () => clearInterval(timer);
    }, [meditacionIniciada, tiempoRestanteMeditacion]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    // --- Fin Lógica de Meditación ---


    useEffect(() => {
        async function cargarRecomendaciones() {
            setCargando(true);
            try {
                const data = await obtenerRecomendaciones(userId, textoUsuario, respuestasCuestionario);
                setRecomendacionesApi(data);
            } catch (err) {
                console.error("Error al obtener recomendaciones de la API:", err);
            } finally {
                setCargando(false);
            }
        }
        cargarRecomendaciones();
    }, [userId, textoUsuario, respuestasCuestionario]);

    async function obtenerRecomendaciones(userId, texto, respuestas) {
        try {
            const url = userId ? `/api/recomendaciones/${userId}/` : `/api/recomendaciones/`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ texto: texto, respuestas: respuestas, userId: userId })
            });

            if (!response.ok) {
                throw new Error(`Error de servidor: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error en obtenerRecomendaciones:", error);
            throw error;
        }
    }

    const abrirModal = (nombreModal) => {
        setModalAbierto(nombreModal);
        // Reiniciar estados específicos si es necesario al abrir un modal
        if (nombreModal === 'meditacion') {
            setTiempoRestanteMeditacion(10 * 60);
            setMeditacionIniciada(false);
        } else if (nombreModal === 'afirmaciones') {
            setAfirmacionGenerada('');
        }
    };

    const cerrarModal = () => {
        setModalAbierto(null);
    };

    // --- Handlers para acciones de los modales ---
    const handleGuardarDiarioGratitud = () => {
        console.log(`Usuario ${userId} ha registrado:`, { gratitud1, gratitud2, gratitud3 });
        alert('¡Gracias por registrar tu gratitud!');
        cerrarModal();
        setGratitud1(''); setGratitud2(''); setGratitud3(''); // Limpiar campos
    };

    const handleProgramarConexionSocial = () => {
        console.log(`Usuario ${userId} quiere programar videollamada con ${nombreContactoSocial} el ${fechaHoraSocial}`);
        alert(`¡Videollamada con ${nombreContactoSocial} programada para el ${fechaHoraSocial}!`);
        cerrarModal();
        setNombreContactoSocial(''); setFechaHoraSocial(''); // Limpiar campos
    };

    const handleEstablecerLimiteDigital = () => {
        alert(`Límite de uso de redes sociales configurado a ${limiteMinutosDigital} minutos diarios. ¡Buena suerte!`);
        cerrarModal();
    };

    const generarAfirmacion = async () => {
        const afirmacionesEjemplo = [
            "Soy fuerte y capaz de superar cualquier desafío.",
            "Me merezco amor, alegría y paz.",
            "Cada día estoy más cerca de alcanzar mis metas.",
            "Confío en mi capacidad para tomar decisiones correctas.",
            "La calma reside en mi interior, y la llevo conmigo a donde quiera que vaya."
        ];
        const afirmacionAleatoria = afirmacionesEjemplo[Math.floor(Math.random() * afirmacionesEjemplo.length)];
        setAfirmacionGenerada(afirmacionAleatoria);
    };

    const handleDescargarPDF = () => {
        alert('Simulando descarga de PDF de recomendaciones...');
        cerrarModal();
    };

    const handleCompartirMedico = () => {
        console.log(`Compartiendo con médico ${emailMedico}. Mensaje: ${mensajeMedico}`);
        alert(`¡Recomendaciones enviadas a ${emailMedico} (simulado)!`);
        cerrarModal();
        setEmailMedico(''); setMensajeMedico('Adjunto mis recomendaciones de bienestar mental.'); // Limpiar campos
    };
    // --- Fin Handlers ---

    if (cargando) {
        return <div className={styles.loadingMessage}>Cargando recomendaciones...</div>;
    }

    return (
        <div className={styles.recommendationsPage}>
            <h1 className={styles.mainTitle}>Recomendaciones de salud mental impulsadas por IA</h1>
            <p className={styles.subtitle}>Sugerencias personalizadas basadas en sus patrones de estado de ánimo, datos de actividad y prácticas de salud mental basadas en evidencia.</p>

            {/* Pestañas de categoría */}
            <div className={styles.categoryTabs}>
                {categorias.map(cat => (
                    <button
                        key={cat}
                        className={`${styles.tabButton} ${categoriaActiva === cat ? styles.activeTab : ''}`}
                        onClick={() => setCategoriaActiva(cat)}
                    >
                        {cat === 'Todas' ? 'Todas las recomendaciones' : cat}
                    </button>
                ))}
            </div>

            {/* Sección de Recomendación prioritaria */}
            <h2 className={styles.sectionTitle}>Recomendación prioritaria</h2>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}>🧠</span>
                    <h3>Análisis de IA</h3>
                </div>
                <h4 className={styles.cardFeatureTitle}>Reestructuración cognitiva</h4>
                <p className={styles.cardDescription}>
                    {recomendacionesApi.length > 0 && recomendacionesApi[0].texto
                        ? recomendacionesApi[0].texto
                        : 'Tus entradas recientes muestran patrones de pensamiento negativos. Practica identificar y combatir estos pensamientos con los ejercicios de TCC guiados a continuación.'}
                </p>
                <div className={styles.cardActions}>
                    <button className={styles.primaryButton} onClick={() => abrirModal('ejercicioTCC')}>Comenzar el ejercicio</button>
                    <button className={styles.secondaryButton} onClick={() => abrirModal('masInfoTCC')}>Más información</button>
                </div>
            </div>

            {/* Prácticas diarias de salud mental */}
            <h2 className={styles.sectionTitle}>Prácticas diarias de salud mental</h2>
            <div className={styles.gridContainer}>
                {practicasDiarias.map(practice => (
                    <div key={practice.id} className={styles.practiceCard}>
                        <span className={styles.practiceIcon}>{practice.icono}</span>
                        <h4 className={styles.practiceTitle}>{practice.titulo}</h4>
                        <p className={styles.practiceDescription}>{practice.descripcion}</p>
                        <button className={styles.practiceButton} onClick={() => abrirModal(practice.id)}>
                            {practice.botonTexto}
                        </button>
                    </div>
                ))}
            </div>

            {/* Análisis de patrones de estado de ánimo - CON EL GRÁFICO DE BARRAS */}
            <h2 className={styles.sectionTitle}>Análisis de patrones de estado de ánimo</h2>
            <div className={`${styles.card} ${styles.chartCard}`}>
                <h4 className={styles.moodAnalysisTitle}>Gráfico de patrones de estado de ánimo</h4>
                <div className={styles.moodChartContainer}>
                    {/* Renderiza el gráfico de barras aquí */}
                    <Bar data={moodData} options={moodOptions} />
                </div>
            </div>

            {/* Recomendaciones personalizadas de salud mental (Ejemplo estático para el diseño) */}
            <h2 className={styles.sectionTitle}>Recomendaciones personalizadas de salud mental</h2>
            <div className={styles.recommendationsList}>
                {recomendacionesPersonalizadasEstaticas.map((rec) => (
                    <div key={rec.id} className={styles.recommendationItem}>
                        <span className={styles.recommendationIcon}>{rec.icono}</span>
                        <div className={styles.recommendationContent}>
                            <h4 className={styles.recommendationTitle}>{rec.titulo}</h4>
                            <p className={styles.recommendationDescription}>{rec.descripcion}</p>
                        </div>
                        <span className={styles.recommendationArrow} onClick={() => abrirModal(rec.id)}>➡️</span>
                    </div>
                ))}
            </div>

            {/* Recursos generados por IA */}
            <h2 className={styles.sectionTitle}>Recursos generados por IA</h2>
            <div className={styles.gridContainer}>
                {aiResources.map(resource => (
                    <div key={resource.id} className={styles.resourceCard}>
                        <span className={styles.resourceIcon}>{resource.icono}</span>
                        <h4 className={styles.resourceTitle}>{resource.titulo}</h4>
                        <p className={styles.resourceDescription}>{resource.descripcion}</p>
                        <button className={styles.resourceButton} onClick={() => abrirModal(resource.id)}>
                            {resource.botonTexto}
                        </button>
                    </div>
                ))}
            </div>

            {/* Acciones finales */}
            <div className={styles.bottomActions}>
                <a href="#" className={styles.bottomButton} id="download-pdf" onClick={(e) => { e.preventDefault(); abrirModal('descargarPDF'); }}>Descargar recomendaciones en PDF</a>
                <a href="#" className={styles.bottomButton} id="contact-provider" onClick={(e) => { e.preventDefault(); abrirModal('compartirMedico'); }}>Compartir con el proveedor de atención médica</a>
            </div>

            {/* --- Renderizado Condicional de Modales --- */}
            {modalAbierto && (
                <div className={styles.modalOverlay} onClick={cerrarModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={cerrarModal}>×</button>

                        {/* Modal: Ejercicio TCC */}
                        {modalAbierto === 'ejercicioTCC' && (
                            <>
                                <h2 className={styles.modalTitle}>Ejercicio de Reestructuración Cognitiva</h2>
                                <div className={styles.modalBody}>
                                    <p>Este ejercicio te ayudará a identificar y cambiar patrones de pensamiento negativos. Sigue los pasos:</p>
                                    <ol>
                                        <li>**Identifica el pensamiento:** ¿Qué pensamiento negativo o distorsión cognitiva estás teniendo?</li>
                                        <li>**Evalúa la evidencia:** ¿Qué evidencia tienes a favor y en contra de este pensamiento?</li>
                                        <li>**Busca alternativas:** ¿Hay otras formas de ver la situación?</li>
                                        <li>**Reformula:** Crea un pensamiento más equilibrado y realista.</li>
                                    </ol>
                                    <textarea
                                        className={styles.modalTextArea}
                                        placeholder="Escribe aquí tu ejercicio..."
                                        rows="6"
                                    ></textarea>
                                    <button className={styles.modalButton} onClick={cerrarModal}>Guardar y Cerrar</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Más Información TCC */}
                        {modalAbierto === 'masInfoTCC' && (
                            <>
                                <h2 className={styles.modalTitle}>Más Información sobre Reestructuración Cognitiva</h2>
                                <div className={styles.modalBody}>
                                    <p>La **Reestructuración Cognitiva** es una técnica central de la Terapia Cognitivo-Conductual (TCC) que enseña a las personas a identificar, desafiar y cambiar patrones de pensamiento negativos o irracionales que contribuyen a la angustia emocional.</p>
                                    <p>Se basa en la idea de que no son los eventos en sí mismos los que nos causan malestar, sino la interpretación que hacemos de ellos.</p>
                                    <h4>Principios clave:</h4>
                                    <ul>
                                        <li>Identificar distorsiones cognitivas (ej. catastrofización, pensamiento todo o nada).</li>
                                        <li>Evaluar la validez de los pensamientos automáticos.</li>
                                        <li>Desarrollar pensamientos alternativos más realistas y equilibrados.</li>
                                    </ul>
                                    <p>Para más información, puedes consultar recursos de psicología o hablar con un terapeuta.</p>
                                    <button className={styles.modalButton} onClick={cerrarModal}>Cerrar</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Meditación */}
                        {modalAbierto === 'meditacion' && (
                            <>
                                <h2 className={styles.modalTitle}>Sesión de Meditación de Atención Plena</h2>
                                <div className={styles.modalBody}>
                                    <p>Céntrate en tu respiración y el momento presente.</p>
                                    <p className={styles.meditationTimer}>{formatTime(tiempoRestanteMeditacion)}</p>
                                    {!meditacionIniciada ? (
                                        <button className={styles.modalButton} onClick={() => setMeditacionIniciada(true)}>Comenzar Meditación</button>
                                    ) : (
                                        <button className={styles.modalButton} onClick={() => setMeditacionIniciada(false)}>Pausar Meditación</button>
                                    )}
                                    <button className={`${styles.modalButton} ${styles.modalSecondaryButton}`} onClick={cerrarModal}>Cerrar</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Diario de Gratitud */}
                        {modalAbierto === 'diarioGratitud' && (
                            <>
                                <h2 className={styles.modalTitle}>Diario de Gratitud</h2>
                                <div className={styles.modalBody}>
                                    <p>Escribe tres cosas por las que te sientes agradecido hoy. Esto te ayudará a aumentar las emociones positivas y la resiliencia.</p>
                                    <div className={styles.gratitudeEntry}>
                                        <label>1. Estoy agradecido por:</label>
                                        <input
                                            type="text"
                                            className={styles.modalInput}
                                            value={gratitud1}
                                            onChange={(e) => setGratitud1(e.target.value)}
                                            placeholder="Ej. La luz del sol esta mañana"
                                        />
                                    </div>
                                    <div className={styles.gratitudeEntry}>
                                        <label>2. Estoy agradecido por:</label>
                                        <input
                                            type="text"
                                            className={styles.modalInput}
                                            value={gratitud2}
                                            onChange={(e) => setGratitud2(e.target.value)}
                                            placeholder="Ej. Una conversación con un amigo"
                                        />
                                    </div>
                                    <div className={styles.gratitudeEntry}>
                                        <label>3. Estoy agradecido por:</label>
                                        <input
                                            type="text"
                                            className={styles.modalInput}
                                            value={gratitud3}
                                            onChange={(e) => setGratitud3(e.target.value)}
                                            placeholder="Ej. Mi salud"
                                        />
                                    </div>
                                    <button className={styles.modalButton} onClick={handleGuardarDiarioGratitud}>Guardar Entradas</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Terapia de la Naturaleza */}
                        {modalAbierto === 'terapiaNaturaleza' && (
                            <>
                                <h2 className={styles.modalTitle}>Guía de Terapia de la Naturaleza</h2>
                                <div className={styles.modalBody}>
                                    <p>Pasar tiempo en la naturaleza puede reducir el estrés, mejorar el estado de ánimo y aumentar el bienestar general.</p>
                                    <h4>Guía para 20 minutos al aire libre:</h4>
                                    <ul>
                                        <li>**Encuentra un lugar tranquilo:** Un parque, jardín, o incluso tu balcón.</li>
                                        <li>**Desconecta:** Deja tu teléfono y distracciones atrás.</li>
                                        <li>**Usa tus sentidos:** Observa los colores, escucha los sonidos, siente el aire en tu piel, huele las plantas.</li>
                                        <li>**Respira profundamente:** Concéntrate en la inhalación y exhalación.</li>
                                        <li>**Sin expectativas:** Simplemente sé y permite que la naturaleza te rodee.</li>
                                    </ul>
                                    <p>Intenta hacer esto diariamente para obtener los mejores resultados.</p>
                                    <button className={styles.modalButton} onClick={cerrarModal}>Entendido</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Respiración 4-7-8 */}
                        {modalAbierto === 'respiracion478' && (
                            <>
                                <h2 className={styles.modalTitle}>Practica la Respiración 4-7-8</h2>
                                <div className={styles.modalBody}>
                                    <p>La técnica de respiración 4-7-8 es una poderosa herramienta para calmar tu sistema nervioso.</p>
                                    <ol>
                                        <li>**Inhala por la nariz durante 4 segundos.**</li>
                                        <li>**Aguanta la respiración durante 7 segundos.**</li>
                                        <li>**Exhala completamente por la boca durante 8 segundos.**</li>
                                    </ol>
                                    <p>Repite el ciclo 3-4 veces. Practícalo cuando sientas ansiedad o dificultad para dormir.</p>
                                    <button className={styles.modalButton} onClick={cerrarModal}>Comenzar Práctica</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Conexión Social */}
                        {modalAbierto === 'conexionSocial' && (
                            <>
                                <h2 className={styles.modalTitle}>Programar Videollamada con Amigo/Familiar</h2>
                                <div className={styles.modalBody}>
                                    <p>La conexión social es vital para el bienestar mental. ¡Programa una videollamada esta semana!</p>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="contactName">Nombre del contacto:</label>
                                        <input
                                            type="text"
                                            id="contactName"
                                            className={styles.modalInput}
                                            value={nombreContactoSocial}
                                            onChange={(e) => setNombreContactoSocial(e.target.value)}
                                            placeholder="Ej. Juan Pérez"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="dateTime">Fecha y Hora:</label>
                                        <input
                                            type="datetime-local"
                                            id="dateTime"
                                            className={styles.modalInput}
                                            value={fechaHoraSocial}
                                            onChange={(e) => setFechaHoraSocial(e.target.value)}
                                        />
                                    </div>
                                    <button className={styles.modalButton} onClick={handleProgramarConexionSocial}>Programar Videollamada</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Desintoxicación Digital */}
                        {modalAbierto === 'desintoxicacionDigital' && (
                            <>
                                <h2 className={styles.modalTitle}>Desintoxicación Digital</h2>
                                <div className={styles.modalBody}>
                                    <p>Limitar el uso de redes sociales puede reducir la ansiedad por comparación y mejorar tu bienestar general. Sugerimos 30 minutos al día.</p>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="limite">Minutos al día para redes sociales:</label>
                                        <input
                                            type="number"
                                            id="limite"
                                            className={styles.modalInput}
                                            value={limiteMinutosDigital}
                                            onChange={(e) => setLimiteMinutosDigital(e.target.value)}
                                            min="0"
                                            max="120"
                                        />
                                    </div>
                                    <button className={styles.modalButton} onClick={handleEstablecerLimiteDigital}>Establecer Límite</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Higiene del Sueño */}
                        {modalAbierto === 'higieneSueno' && (
                            <>
                                <h2 className={styles.modalTitle}>Crea tu Rutina de Higiene del Sueño</h2>
                                <div className={styles.modalBody}>
                                    <p>Una buena higiene del sueño es fundamental para un descanso reparador y mejorar tu estado de ánimo.</p>
                                    <h4>Pasos para una rutina consistente:</h4>
                                    <ul>
                                        <li>**Horario regular:** Acuéstate y levántate a la misma hora todos los días, incluso los fines de semana.</li>
                                        <li>**Ambiente oscuro y fresco:** Asegúrate de que tu habitación esté oscura, tranquila y a una temperatura agradable.</li>
                                        <li>**Evita pantallas:** No uses dispositivos electrónicos (teléfono, tablet, TV) al menos una hora antes de dormir.</li>
                                        <li>**Relajación:** Toma un baño caliente, lee un libro o escucha música relajante antes de acostarte.</li>
                                        <li>**Café y alcohol:** Evita la cafeína y el alcohol antes de dormir.</li>
                                    </ul>
                                    <p>¡Empieza hoy mismo y siente la diferencia!</p>
                                    <button className={styles.modalButton} onClick={cerrarModal}>Entendido</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Movimiento Físico */}
                        {modalAbierto === 'movimientoFisico' && (
                            <>
                                <h2 className={styles.modalTitle}>Caminar 15 Minutos Diariamente</h2>
                                <div className={styles.modalBody}>
                                    <p>Caminar regularmente puede mejorar significativamente tu estado de ánimo, reducir el estrés y aumentar la energía debido a la liberación de endorfinas.</p>
                                    <h4>Consejos para tu caminata diaria:</h4>
                                    <ul>
                                        <li>**Elige un momento:** Decide si prefieres caminar por la mañana, al mediodía o por la tarde.</li>
                                        <li>**Encuentra un lugar agradable:** Un parque, una calle tranquila o incluso dar vueltas por tu patio.</li>
                                        <li>**Escucha algo:** Un podcast, música relajante o simplemente los sonidos de la naturaleza.</li>
                                        <li>**Establece un recordatorio:** Si es necesario, usa una alarma en tu teléfono.</li>
                                        <li>**Sé constante:** La clave es la regularidad.</li>
                                    </ul>
                                    <button className={styles.modalButton} onClick={cerrarModal}>¡A Caminar!</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Generar Afirmaciones */}
                        {modalAbierto === 'afirmaciones' && (
                            <>
                                <h2 className={styles.modalTitle}>Generar Afirmaciones Personalizadas</h2>
                                <div className={styles.modalBody}>
                                    <p>Una afirmación diaria puede potenciar tu bienestar mental. Haz clic para generar una.</p>
                                    <button className={styles.modalButton} onClick={generarAfirmacion}>Generar Nueva Afirmación</button>
                                    {afirmacionGenerada && (
                                        <div className={styles.generatedContent}>
                                            <h4>Tu afirmación de hoy:</h4>
                                            <p className={styles.afirmationText}>"{afirmacionGenerada}"</p>
                                            <button className={styles.modalSecondaryButton}>Copiar Afirmación</button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Modal: Ver Biblioteca */}
                        {modalAbierto === 'sugerenciasLectura' && (
                            <>
                                <h2 className={styles.modalTitle}>Biblioteca de Salud Mental</h2>
                                <div className={styles.modalBody}>
                                    <p>Artículos y libros basados en evidencia adaptados a tus necesidades.</p>
                                    <h4>Artículos Recomendados:</h4>
                                    <ul className={styles.resourceList}>
                                        <li><a href="#" target="_blank" rel="noopener noreferrer">Introducción a la Mindfulness</a> por Dr. Jon Kabat-Zinn</li>
                                        <li><a href="#" target="_blank" rel="noopener noreferrer">Cómo gestionar la ansiedad en la vida diaria</a> por Psicología Positiva</li>
                                        <li><a href="#" target="_blank" rel="noopener noreferrer">Beneficios de una dieta balanceada para el ánimo</a> por Nutrición y Mente</li>
                                        <li><a href="#" target="_blank" rel="noopener noreferrer">Superando el insomnio: Estrategias efectivas</a> por Clínica del Sueño</li>
                                    </ul>
                                    <h4>Libros Sugeridos:</h4>
                                    <ul className={styles.resourceList}>
                                        <li><a href="#" target="_blank" rel="noopener noreferrer">Sentirse bien: Una nueva terapia de los estados de ánimo</a> por David D. Burns</li>
                                        <li><a href="#" target="_blank" rel="noopener noreferrer">El poder del ahora</a> por Eckhart Tolle</li>
                                    </ul>
                                    <button className={styles.modalButton} onClick={cerrarModal}>Cerrar Biblioteca</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Listas de Reproducción */}
                        {modalAbierto === 'listasReproduccion' && (
                            <>
                                <h2 className={styles.modalTitle}>Listas de Reproducción Personalizadas</h2>
                                <div className={styles.modalBody}>
                                    <p>Música y meditaciones guiadas seleccionadas para mejorar tu estado de ánimo actual.</p>
                                    <div className={styles.playlistItem}>
                                        <h4>Calma y Concentración</h4>
                                        <p>Música ambiental para relajarse y enfocarse.</p>
                                        <a href="https://www.youtube.com/watch?v=l_S67j_g20U" target="_blank" rel="noopener noreferrer" className={styles.playlistButton}>Escuchar ahora</a>
                                    </div>
                                    <div className={styles.playlistItem}>
                                        <h4>Meditación Guiada para el Estrés</h4>
                                        <p>Sesión de 15 minutos para aliviar la tensión.</p>
                                        <a href="https://www.youtube.com/watch?v=Fj-y5308n0k" target="_blank" rel="noopener noreferrer" className={styles.playlistButton}>Escuchar ahora</a>
                                    </div>
                                    <div className={styles.playlistItem}>
                                        <h4>Música para Dormir Profundo</h4>
                                        <p>Sonidos suaves para un sueño reparador.</p>
                                        <a href="https://www.youtube.com/watch?v=nM0_9J7YdI4" target="_blank" rel="noopener noreferrer" className={styles.playlistButton}>Escuchar ahora</a>
                                    </div>
                                    <button className={styles.modalButton} onClick={cerrarModal}>Cerrar</button>
                                </div>
                            </>
                        )}

                        {/* Modal: Descargar PDF */}
                        {modalAbierto === 'descargarPDF' && (
                            <>
                                <h2 className={styles.modalTitle}>Descargar Recomendaciones en PDF</h2>
                                <div className={styles.modalBody}>
                                    <p>Haz clic en el botón para generar y descargar tus recomendaciones personalizadas en formato PDF.</p>
                                    <button className={styles.modalButton} onClick={handleDescargarPDF}>Descargar PDF</button>
                                    <p className={styles.noteText}>Esta es una función simulada. La implementación real requiere librerías adicionales.</p>
                                </div>
                            </>
                        )}

                        {/* Modal: Compartir con Médico */}
                        {modalAbierto === 'compartirMedico' && (
                            <>
                                <h2 className={styles.modalTitle}>Compartir con el Proveedor de Atención Médica</h2>
                                <div className={styles.modalBody}>
                                    <p>Puedes compartir un resumen de tus recomendaciones con tu médico o terapeuta.</p>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="emailMedico">Email del médico/proveedor:</label>
                                        <input
                                            type="email"
                                            id="emailMedico"
                                            className={styles.modalInput}
                                            value={emailMedico}
                                            onChange={(e) => setEmailMedico(e.target.value)}
                                            placeholder="ejemplo@medico.com"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="mensaje">Mensaje (opcional):</label>
                                        <textarea
                                            id="mensaje"
                                            className={styles.modalTextArea}
                                            value={mensajeMedico}
                                            onChange={(e) => setMensajeMedico(e.target.value)}
                                            rows="4"
                                        ></textarea>
                                    </div>
                                    <button className={styles.modalButton} onClick={handleCompartirMedico}>Enviar por Email</button>
                                    <p className={styles.noteText}>Esta es una función simulada. Requiere un backend para enviar emails.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recomendaciones;