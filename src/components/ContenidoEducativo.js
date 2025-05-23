import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ContenidoEducativo.module.css';

// IMPORTA TUS IMÁGENES LOCALES AQUÍ
import ArticuloDestacadoImage from '../assets/ArticuloDestacado.png'; // ASEGÚRATE DE LA EXTENSIÓN CORRECTA (.jpg, .jpeg, .png, etc.)
import ExpertoImage from '../assets/Experto.png'; // ASEGÚRATE DE LA EXTENSIÓN CORRECTA (.jpg, .jpeg, .png, etc.)

// NUEVAS IMÁGENES PARA TEMAS POPULARES
import AtencionPlenaImage from '../assets/AtencionPlena.png'; // Verifica la extensión
import SuenoSaludMentalImage from '../assets/SuenoSaludMental.png'; // Verifica la extensión
import ManejoEstresImage from '../assets/ManejoEstres.png'; // Verifica la extensión


function ContenidoEducativo() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Presentado');
    const [vistaActual, setVistaActual] = useState('principal'); // 'principal', 'detalleArticulo', 'perfilDoctora'
    const [contenidoDetalle, setContenidoDetalle] = useState(null); // Guarda el objeto del artículo/tema a mostrar

    // --- Datos de Contenido ---
    const featuredArticleData = {
        id: 'ansiedad-destacado',
        title: "Comprender la ansiedad: causas, síntomas y estrategias de afrontamiento",
        description: "Aprenda sobre la ciencia detrás de los trastornos de ansiedad y descubra técnicas efectivas para controlar los síntomas en la vida diaria.",
        fullContent: `
            <p>La ansiedad es una respuesta natural del cuerpo al estrés. Es un sentimiento de miedo o aprensión sobre lo que está por venir. El primer día de escuela, ir a una entrevista de trabajo o dar un discurso puede hacer que la mayoría de las personas se sientan ansiosas y nerviosas. Pero si sus sentimientos de ansiedad son extremos, duran más de seis meses y están interfiriendo con su vida, es posible que tenga un trastorno de ansiedad.</p>
            <h3>Tipos de trastornos de ansiedad:</h3>
            <ul>
                <li><strong>Trastorno de ansiedad generalizada (TAG):</strong> Ansiedad y preocupación excesivas e incontrolables sobre varios eventos o actividades.</li>
                <li><strong>Trastorno de pánico:</strong> Ataques de pánico recurrentes e inesperados, que son episodios repentinos de miedo intenso.</li>
                <li><strong>Trastorno de ansiedad social (TAS):</strong> Miedo intenso a situaciones sociales y a ser juzgado o evaluado negativamente por otros.</li>
                <li><strong>Fobias específicas:</strong> Miedo irracional e intenso a un objeto o situación específica.</li>
            </ul>
            <h3>Síntomas comunes:</h3>
            <ul>
                <li>Nerviosismo, inquietud o tensión</li>
                <li>Sensación de peligro inminente, pánico o catástrofe</li>
                <li>Aumento del ritmo cardíaco</li>
                <li>Respiración rápida (hiperventilación)</li>
                <li>Sudoración</li>
                <li>Temblores</li>
                <li>Problemas para dormir</li>
                <li>Dificultad para controlar las preocupaciones</li>
                <li>Necesidad de evitar situaciones que provocan ansiedad</li>
            </ul>
            <h3>Estrategias de afrontamiento:</h3>
            <p>Aunque la ansiedad puede ser abrumadora, existen estrategias efectivas para manejarla:</p>
            <ol>
                <li><strong>Terapia cognitivo-conductual (TCC):</strong> Ayuda a identificar y cambiar patrones de pensamiento negativos.</li>
                <li><strong>Técnicas de relajación:</strong> Respiración profunda, meditación, yoga y mindfulness.</li>
                <li><strong>Ejercicio regular:</strong> Reduce el estrés y mejora el estado de ánimo.</li>
                <li><strong>Dieta equilibrada:</strong> Evitar la cafeína y el alcohol puede reducir los síntomas.</li>
                <li><strong>Suficiente sueño:</strong> Asegurarse de tener un descanso adecuado.</li>
                <li><strong>Conexión social:</strong> Mantener el contacto con amigos y familiares.</li>
            </ol>
            <p>Si la ansiedad interfiere significativamente con su vida diaria, es importante buscar ayuda profesional. Un psicólogo o psiquiatra puede ofrecer un diagnóstico y un plan de tratamiento adecuado.</p>
        `,
        imageUrl: ArticuloDestacadoImage, // Usando la imagen importada localmente
    };

    const popularTopicsData = [
        {
            id: 'atencion-plena',
            icon: '🧘‍♀️',
            title: "Fundamentos de la atención plena",
            description: "Introducción a las prácticas de mindfulness y sus beneficios para el bienestar mental.",
            fullContent: `
                <p>La atención plena (mindfulness) es la práctica de estar presente y plenamente comprometido en el momento actual, sin juzgar. Se trata de observar tus pensamientos, sentimientos y sensaciones corporales sin apegarte a ellos. Su objetivo es aumentar la conciencia y la aceptación de la experiencia presente.</p>
                <h3>Beneficios de la atención plena:</h3>
                <ul>
                    <li>Reducción del estrés y la ansiedad</li>
                    <li>Mejora de la concentración y el enfoque</li>
                    <li>Aumento de la autoconciencia y la regulación emocional</li>
                    <li>Mejora del sueño</li>
                    <li>Fomento de la compasión y la empatía</li>
                </ul>
                <h3>Prácticas básicas:</h3>
                <ol>
                    <li><strong>Meditación de la respiración:</strong> Centrarse en la sensación de la respiración.</li>
                    <li><strong>Escaneo corporal:</strong> Prestar atención a las sensaciones en diferentes partes del cuerpo.</li>
                    <li><strong>Comer con atención plena:</strong> Saborear cada bocado y estar consciente del acto de comer.</li>
                    <li><strong>Caminata consciente:</strong> Ser plenamente consciente de cada paso.</li>
                </ol>
                <p>La práctica regular, incluso por unos pocos minutos al día, puede tener un impacto significativo en tu bienestar general.</p>
            `,
            imageUrl: AtencionPlenaImage, // Usando la imagen importada localmente
        },
        {
            id: 'sueno-salud-mental',
            icon: '🌙',
            title: "Sueño y salud mental",
            description: "Cómo el sueño de calidad impacta tu salud mental y consejos para descansar mejor.",
            fullContent: `
                <p>El sueño es un pilar fundamental de la salud mental. Cuando no dormimos lo suficiente o la calidad de nuestro sueño es deficiente, esto puede afectar directamente nuestro estado de ánimo, nuestra capacidad de concentración y nuestra resiliencia emocional. La privación crónica del sueño se ha relacionado con un mayor riesgo de desarrollar trastornos de ansiedad y depresión.</p>
                <h3>Impacto del sueño en la salud mental:</h3>
                <ul>
                    <li><strong>Regulación emocional:</strong> El sueño ayuda al cerebro a procesar las emociones.</li>
                    <li><strong>Función cognitiva:</strong> Mejora la memoria, la concentración y la capacidad de resolución de problemas.</li>
                    <li><strong>Reducción del estrés:</strong> Un buen descanso ayuda al cuerpo a recuperarse del estrés diario.</li>
                    <li><strong>Prevención de trastornos:</strong> La falta de sueño puede exacerbar o contribuir a problemas de salud mental.</li>
                </ul>
                <h3>Consejos para mejorar el descanso:</h3>
                <ol>
                    <li><strong>Establece un horario:</strong> Acuéstate y levántate a la misma hora todos los días, incluso los fines de semana.</li>
                    <li><strong>Crea una rutina relajante:</strong> Antes de dormir, realiza actividades tranquilas como leer o tomar un baño.</li>
                    <li><strong>Optimiza tu entorno:</strong> Asegúrate de que tu habitación sea oscura, silenciosa y fresca.</li>
                    <li><strong>Evita estimulantes:</strong> Limita la cafeína y el alcohol, especialmente por la tarde.</li>
                    <li><strong>Haz ejercicio regularmente:</strong> Pero evita el ejercicio intenso cerca de la hora de acostarte.</li>
                    <li><strong>Limita las pantallas:</strong> La luz azul de dispositivos electrónicos puede interferir con la producción de melatonina.</li>
                </ol>
                <p>Priorizar el sueño es una inversión crucial en tu bienestar mental.</p>
            `,
            imageUrl: SuenoSaludMentalImage, // Usando la imagen importada localmente
        },
        {
            id: 'manejo-estres',
            icon: '⚙️',
            title: "Manejo del estrés",
            description: "Técnicas prácticas para identificar factores estresantes y desarrollar mecanismos de afrontamiento saludables.",
            fullContent: `
                <p>El estrés es una parte inevitable de la vida, pero la forma en que lo manejamos puede marcar una gran diferencia en nuestra salud mental y física. Un manejo efectivo del estrés no se trata de eliminarlo por completo, sino de desarrollar herramientas y estrategias para responder a él de manera más saludable.</p>
                <h3>Identificación de factores estresantes:</h3>
                <p>El primer paso es reconocer qué situaciones, personas o pensamientos desencadenan tu estrés. Llevar un diario de estrés puede ayudarte a identificar patrones.</p>
                <h3>Técnicas de afrontamiento saludables:</h3>
                <ol>
                    <li><strong>Actividad física:</strong> El ejercicio regular es un poderoso reductor de estrés.</li>
                    <li><strong>Técnicas de relajación:</strong> Respiración profunda, meditación, yoga y técnicas de relajación muscular progresiva.</li>
                    <li><strong>Gestión del tiempo:</li>
                    <li><strong>Conexión social:</strong> Hablar con amigos, familiares o un terapeuta puede aliviar la carga.</li>
                    <li><strong>Habilidades de resolución de problemas:</strong> Aborda los desafíos de forma constructiva en lugar de evitarlos.</li>
                    <li><strong>Establecer límites:</strong> Aprende a decir "no" y a proteger tu tiempo y energía.</li>
                    <li><strong>Tiempo para el ocio:</strong> Dedica tiempo a actividades que disfrutes y te recarguen.</li>
                </ol>
                <p>Cada persona es diferente, así que experimenta con diversas técnicas hasta que encuentres las que mejor funcionen para ti. La clave es la consistencia.</p>
            `,
            imageUrl: ManejoEstresImage, // Usando la imagen importada localmente
        },
    ];

    const latestArticlesData = [
        {
            id: 'desintoxicacion-digital',
            icon: '✉️',
            title: "Desintoxicación digital para la claridad mental",
            description: "Cómo tomar descansos de la tecnología puede mejorar la concentración y reducir la ansiedad",
            fullContent: `
                <p>En el mundo hiperconectado de hoy, el uso excesivo de dispositivos digitales puede tener un impacto negativo en nuestra salud mental. Una "desintoxicación digital" implica tomar un descanso intencional de la tecnología para reconectar con el mundo real y mejorar el bienestar.</p>
                <h3>Beneficios de la desintoxicación digital:</h3>
                <ul>
                    <li>Reducción del estrés y la ansiedad.</li>
                    <li>Mejora de la concentración y la productividad.</li>
                    <li>Mejor calidad del sueño.</li>
                    <li>Aumento de la interacción social en la vida real.</li>
                    <li>Mayor apreciación por las actividades offline.</li>
                </ul>
                <h3>Cómo hacer una desintoxicación digital:</h3>
                <ol>
                    <li>Establece un período de tiempo (unas horas, un día, un fin de semana).</li>
                    <li>Identifica qué dispositivos y aplicaciones vas a evitar.</li>
                    <li>Encuentra actividades alternativas para llenar el tiempo (leer, caminar, hobbies).</li>
                    <li>Informa a tus contactos para que sepan que estarás desconectado.</li>
                    <li>Sé amable contigo mismo; no tiene que ser perfecto desde el principio.</li>
                </ol>
                <p>Incluso pequeños descansos pueden marcar una gran diferencia. ¡Inténtalo!</p>
            `,
        },
        {
            id: 'ciencia-felicidad',
            icon: '🧠',
            title: "La ciencia de la felicidad",
            description: "Prácticas respaldadas por investigaciones para aumentar su alegría y satisfacción diarias",
            fullContent: `
                <p>La felicidad no es solo un estado de ánimo, sino que puede ser cultivada a través de prácticas y hábitos basados en la ciencia. La psicología positiva ha investigado qué acciones y pensamientos contribuyen a una vida más plena y satisfactoria.</p>
                <h3>Pilares de la felicidad (basado en la investigación):</h3>
                <ul>
                    <li><strong>Gratitud:</strong> Practicar el reconocimiento de las cosas buenas en tu vida.</li>
                    <li><strong>Conexión social:</strong> Mantener relaciones significativas con otros.</li>
                    <li><strong>Actos de bondad:</strong> Ayudar a los demás o realizar actos altruistas.</li>
                    <li><strong>Atención plena (Mindfulness):</strong> Vivir en el presente y apreciar las pequeñas cosas.</li>
                    <li><strong>Ejercicio físico:</strong> Libera endorfinas y mejora el estado de ánimo.</li>
                    <li><strong>Dormir bien:</strong> Fundamental para la regulación emocional y cognitiva.</li>
                    <li><strong>Metas y propósito:</strong> Tener objetivos significativos en la vida.</li>
                    <li><strong>Resiliencia:</strong> La capacidad de recuperarse de las adversidades.</li>
                </ul>
                <p>Incorporar estas prácticas en tu rutina diaria puede construir un camino hacia una felicidad más sostenible.</p>
            `,
        },
        {
            id: 'resiliencia-emocional',
            icon: '💪',
            title: "Desarrollar la resiliencia emocional",
            description: "Estrategias para recuperarse de los reveses y fortalecer la fortaleza mental",
            fullContent: `
                <p>La resiliencia emocional es la capacidad de adaptarse bien a la adversidad, el trauma, la tragedia, las amenazas o las fuentes importantes de estrés. No significa que una persona resiliente no experimente dificultades, sino que tiene las herramientas para manejarlas y recuperarse.</p>
                <h3>Claves para desarrollar la resiliencia:</h3>
                <ol>
                    <li><strong>Conectarse con otros:</strong> Construir relaciones sólidas y de apoyo.</li>
                    <li><strong>Ver la crisis como un desafío:</strong> Aceptar que el cambio es parte de la vida.</li>
                    <li><strong>Moverse hacia sus metas:</strong> Establecer metas realistas y dar pasos hacia ellas.</li>
                    <li><strong>Tomar acciones decisivas:</strong> No evadir los problemas, sino enfrentarlos.</li>
                    <li><strong>Buscar oportunidades de autodescubrimiento:</strong> Aprender de las experiencias difíciles.</li>
                    <li><strong>Nutrir una visión positiva de uno mismo:</strong> Desarrollar confianza en tu capacidad para resolver problemas.</li>
                    <li><strong>Mantener una perspectiva:</strong> Ver los problemas en un contexto más amplio.</li>
                    <li><strong>Cuidarse a sí mismo:</strong> Priorizar el bienestar físico y mental.</li>
                </ol>
                <p>La resiliencia es un proceso de aprendizaje continuo y una habilidad que se puede fortalecer con el tiempo.</p>
            `,
        },
        {
            id: 'nutricion-salud-mental',
            icon: '🍎',
            title: "Nutrición y salud mental",
            description: "Cómo tu dieta afecta tu estado de ánimo, energía y función cognitiva",
            fullContent: `
                <p>Lo que comemos tiene un impacto profundo no solo en nuestra salud física, sino también en nuestra salud mental. Una dieta equilibrada y nutritiva puede mejorar el estado de ánimo, aumentar la energía y optimizar la función cerebral, mientras que una dieta deficiente puede exacerbar problemas como la depresión y la ansiedad.</p>
                <h3>Nutrientes clave para la salud mental:</h3>
                <ul>
                    <li><strong>Ácidos grasos Omega-3:</strong> Encontrados en pescado graso, semillas de chía, nueces. Importantes para la función cerebral.</li>
                    <li><strong>Vitamina D:</strong> Relacionada con la regulación del estado de ánimo. Obténla del sol, pescado graso o suplementos.</li>
                    <li><strong>Magnesio:</strong> Un mineral que ayuda a la relajación. Encuéntralo en espinacas, almendras, aguacate.</li>
                    <li><strong>Probióticos:</strong> La salud intestinal está conectada con la salud cerebral (eje intestino-cerebro). Presentes en yogur, kéfir, alimentos fermentados.</li>
                </ul>
                <h3>Alimentos a limitar:</h3>
                <ul>
                    <li>Azúcares refinados y alimentos procesados: Pueden causar picos y caídas de energía y estado de ánimo.</li>
                    <li>Cafeína y alcohol en exceso: Pueden exacerbar la ansiedad y alterar el sueño.</li>
                </ul>
                <p>Una alimentación consciente y equilibrada es una herramienta poderosa para apoyar tu bienestar mental.</p>
            `,
        },
    ];

    const expertData = {
        name: "Dra. Sarah Johnson",
        role: "PSICÓLOGO",
        description: "La constancia en las prácticas de salud mental es más importante que la intensidad. Los pequeños hábitos diarios generan cambios duraderos.",
        fullProfile: `
            <h3>Perfil de la Dra. Sarah Johnson</h3>
            <p>La Dra. Sarah Johnson es una psicóloga clínica altamente experimentada, especializada en terapia cognitivo-conductual (TCC) y mindfulness. Obtuvo su doctorado en Psicología Clínica de la Universidad de California, Berkeley, y ha dedicado más de 15 años a ayudar a individuos a manejar la ansiedad, la depresión y el estrés.</p>
            <p>Su enfoque se centra en capacitar a los pacientes con estrategias prácticas y basadas en la evidencia para mejorar su bienestar mental a largo plazo. La Dra. Johnson es una firme creyente en el poder de los pequeños cambios diarios y la consistencia en el desarrollo de hábitos saludables. Ha publicado numerosos artículos en revistas académicas y es una oradora frecuente en conferencias nacionales e internacionales sobre salud mental.</p>
            <p>Además de su práctica privada, la Dra. Johnson es consultora para varias organizaciones sin fines de lucro, desarrollando programas de bienestar para comunidades desfavorecidas. Su pasión es hacer que la psicología sea accesible y comprensible para todos.</p>
            <h4>Áreas de especialización:</h4>
            <ul>
                <li>Trastornos de Ansiedad (TAG, Trastorno de Pánico, Fobia Social)</li>
                <li>Depresión</li>
                <li>Terapia cognitivo-conductual (TCC)</li>
                <li>Reducción del estrés basada en la atención plena (MBSR)</li>
                <li>Terapia de aceptación y compromiso (ACT)</li>
                <li>Manejo de la ira</li>
                <li>Mejora de la resiliencia</li>
            </ul>
            <h4>Contacto:</h4>
            <p>Email: dra.sarahjohnson@example.com</p>
            <p>Teléfono: +1 (555) 123-4567</p>
            <p>Horario de consulta: Lunes a Viernes, 9:00 AM - 5:00 PM</p>
        `,
        imageUrl: ExpertoImage, // Usando la imagen importada localmente
    };

    const resourcesData = [
        {
            id: 'meditaciones-guiadas',
            icon: '🎧',
            title: "Meditaciones guiadas",
            description: "Acceda a nuestra biblioteca de meditaciones de audio para diferentes necesidades y niveles de experiencia.",
            fullContent: `
                <h3>Biblioteca de Meditaciones Guiadas</h3>
                <p>Sumérgete en nuestra extensa colección de meditaciones guiadas, diseñadas para ayudarte a encontrar la calma, reducir el estrés, mejorar la concentración y fomentar un sueño reparador. Tenemos meditaciones para principiantes y practicantes avanzados, abarcando diversas duraciones y temas.</p>
                <h4>Categorías de meditación:</h4>
                <ul>
                    <li>Meditaciones para la relajación profunda</li>
                    <li>Meditaciones para el manejo del estrés</li>
                    <li>Meditaciones para mejorar el sueño</li>
                    <li>Meditaciones de atención plena (mindfulness)</li>
                    <li>Meditaciones para la compasión y el amor bondadoso</li>
                    <li>Meditaciones para aumentar la concentración</li>
                </ul>
                <p>Nuestras meditaciones están narradas por expertos en mindfulness y terapeutas de sonido, utilizando un lenguaje calmado y música ambiental para crear una experiencia inmersiva y efectiva.</p>
                <h4>Cómo empezar:</h4>
                <ol>
                    <li>Encuentra un lugar tranquilo y cómodo.</li>
                    <li>Elige una meditación de nuestra biblioteca según tu estado de ánimo o necesidad.</li>
                    <li>Usa auriculares para una mejor experiencia.</li>
                    <li>Permítete simplemente observar y no juzgar tus pensamientos.</li>
                </ol>
                <p>Empieza a explorar y descubre el poder transformador de la meditación.</p>
                <button class="${styles.inlineButton}" onclick="alert('Reproduciendo la meditación guiada y accediendo a la biblioteca de audio...')">Escucha ahora</button>
                <button class="${styles.inlineButton}" onclick="alert('Guardando meditación en favoritos...')">Ahorrar</button>
            `,
            buttons: ["Escucha ahora", "Ahorrar"],
            action: (buttonText) => {
                if (buttonText === "Escucha ahora") {
                    alert("Reproduciendo la meditación guiada y accediendo a la biblioteca de audio...");
                } else if (buttonText === "Ahorrar") {
                    alert("Guardando meditación...");
                }
            }
        },
        {
            id: 'herramientas-seguimiento',
            icon: '📈',
            title: "Herramientas de seguimiento del estado de ánimo",
            description: "Aprenda a monitorear efectivamente sus patrones emocionales con nuestras herramientas digitales.",
            fullContent: `
                <h3>Herramientas de Seguimiento del Estado de Ánimo</h3>
                <p>Comprender tus patrones emocionales es un paso crucial hacia una mejor salud mental. Nuestras herramientas de seguimiento del estado de ánimo te permiten registrar tus emociones diarias, identificar desencadenantes y observar tendencias a lo largo del tiempo.</p>
                <h4>Beneficios de usar una herramienta de seguimiento del estado de ánimo:</h4>
                <ul>
                    <li>Identificación de patrones: Descubre qué situaciones o actividades influyen en tu estado de ánimo.</li>
                    <li>Mayor autoconciencia: Comprende mejor tus propias respuestas emocionales.</li>
                    <li>Facilita la comunicación con terapeutas: Proporciona datos concretos para tus sesiones.</li>
                    <li>Motivación para el cambio: Ver tu progreso puede inspirarte a mantener hábitos saludables.</li>
                </ul>
                <h4>Cómo funcionan nuestras herramientas:</h4>
                <p>Nuestra plataforma te permite registrar tu estado de ánimo usando una escala o emojis, añadir notas sobre factores influyentes (sueño, estrés, alimentación, etc.) y visualizar tus datos en gráficos claros y fáciles de entender.</p>
                <p>Empieza a monitorear hoy mismo y toma el control de tu bienestar emocional.</p>
                <button class="${styles.inlineButton}" onclick="alert('Iniciando el seguimiento del estado de ánimo...')">Empezar ahora</button>
                <button class="${styles.inlineButton}" onclick="alert('Mostrando más información sobre las herramientas...')">Más información sobre herramientas</button>
            `,
            buttons: ["Empezar", "Más información"],
            action: (buttonText) => {
                if (buttonText === "Empezar") {
                    alert("Empezando a aprender y monitorear patrones emocionales...");
                } else if (buttonText === "Más información") {
                    alert("Mostrando más información sobre las herramientas de seguimiento...");
                }
            }
        },
    ];

    const handleReadArticle = (article) => {
        setContenidoDetalle(article);
        setVistaActual('detalleArticulo');
    };

    const handleMoreInfo = (topic) => {
        setContenidoDetalle(topic);
        setVistaActual('detalleArticulo');
    };

    const handleViewExpertProfile = () => {
        setVistaActual('perfilDoctora');
    };

    const handleResourceAction = (resource, buttonText) => {
        if (resource.action) {
            resource.action(buttonText);
        }
    };

    const handleSubscribe = () => {
        alert("¡Gracias por suscribirte a nuestro boletín de salud mental!");
        // Aquí iría la lógica real para manejar la suscripción (ej. enviar a un backend)
    };

    const handleGoBack = () => {
        if (vistaActual !== 'principal') {
            setVistaActual('principal');
            setContenidoDetalle(null);
        } else {
            navigate(-1); // Si ya estamos en la vista principal, vuelve a la página anterior
        }
    };

    // --- Renderizado de Detalle de Artículo/Tema ---
    const renderDetalleContenido = () => {
        if (!contenidoDetalle) return null;
        return (
            <div className={styles.detailContainer}>
                <button className={styles.backButton} onClick={handleGoBack}>
                    ← Volver a Contenido Educativo
                </button>
                {/* Asegúrate de que la imagen se renderice también en la vista de detalle */}
                {contenidoDetalle.imageUrl && <img src={contenidoDetalle.imageUrl} alt={contenidoDetalle.title} className={styles.detailImage} />}
                <h1 className={styles.detailTitle}>{contenidoDetalle.title}</h1>
                {/* Usamos dangerouslySetInnerHTML para renderizar el HTML del contenido.
                    Es importante tener cuidado con esto y asegurarse de que el HTML sea de confianza. */}
                <div className={styles.detailContent} dangerouslySetInnerHTML={{ __html: contenidoDetalle.fullContent }} />
            </div>
        );
    };

    // --- Renderizado de Perfil de Doctora ---
    const renderPerfilDoctora = () => {
        return (
            <div className={styles.profileContainer}>
                <button className={styles.backButton} onClick={handleGoBack}>
                    ← Volver a Contenido Educativo
                </button>
                <div className={styles.profileHeader}>
                    <img src={expertData.imageUrl} alt={expertData.name} className={styles.profileImage} />
                    <div className={styles.profileInfo}>
                        <p className={styles.profileRole}>{expertData.role}</p>
                        <h1 className={styles.profileName}>{expertData.name}</h1>
                    </div>
                </div>
                <div className={styles.profileContent} dangerouslySetInnerHTML={{ __html: expertData.fullProfile }} />
            </div>
        );
    };

    // Si no estamos en una vista de detalle, renderizamos la vista principal
    if (vistaActual === 'detalleArticulo') {
        return renderDetalleContenido();
    } else if (vistaActual === 'perfilDoctora') {
        return renderPerfilDoctora();
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={handleGoBack}>
                ← Volver
            </button>

            <h1 className={styles.mainTitle}>Educación en salud mental</h1>
            <p className={styles.introText}>
                Explore nuestros artículos y recursos seleccionados para comprender mejor los conceptos y prácticas de salud mental.
            </p>

            <div className={styles.tabs}>
                {['Presentado', 'El último', 'Ansiedad', 'Depresión', 'Manejo del estrés', 'Conciencia'].map(tab => (
                    <button
                        key={tab}
                        className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Sección de Artículos Destacados */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Artículos destacados</h2>
                <div className={styles.featuredArticle}>
                    <img src={featuredArticleData.imageUrl} alt="Artículo destacado" className={styles.featuredArticleImage} />
                    <div className={styles.featuredArticleContent}>
                        <h3 className={styles.featuredArticleTitle}>{featuredArticleData.title}</h3>
                        <p className={styles.featuredArticleDescription}>{featuredArticleData.description}</p>
                        <button className={styles.readArticleButton} onClick={() => handleReadArticle(featuredArticleData)}>Leer el artículo</button>
                    </div>
                </div>
            </section>

            {/* Sección de Temas Populares */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Temas populares</h2>
                <div className={styles.popularTopicsGrid}>
                    {popularTopicsData.map((topic) => (
                        <div key={topic.id} className={styles.topicCard}>
                            {/* Mostrar la imagen en la tarjeta del tema popular */}
                            {topic.imageUrl && <img src={topic.imageUrl} alt={topic.title} className={styles.topicCardImage} />}
                            <div className={styles.topicIcon}>{topic.icon}</div>
                            <h4 className={styles.topicTitle}>{topic.title}</h4>
                            <p className={styles.topicDescription}>{topic.description}</p>
                            <button className={styles.moreInfoButton} onClick={() => handleMoreInfo(topic)}>Más información</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sección de Últimos Artículos */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Últimos artículos</h2>
                <div className={styles.latestArticlesList}>
                    {latestArticlesData.map((article) => (
                        <div key={article.id} className={styles.latestArticleItem} onClick={() => handleReadArticle(article)}>
                            <div className={styles.latestArticleLeft}>
                                <div className={styles.latestArticleIcon}>{article.icon}</div>
                                <div>
                                    <h4 className={styles.latestArticleTitle}>{article.title}</h4>
                                    <p className={styles.latestArticleDescription}>{article.description}</p>
                                </div>
                            </div>
                            <span className={styles.latestArticleArrow}>→</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sección de Perspectivas de Expertos */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Perspectivas de expertos</h2>
                <div className={styles.expertSectionContent}>
                    <div className={styles.expertImageContainer}>
                        <img src={expertData.imageUrl} alt="Experto" className={styles.expertImage} />
                    </div>
                    <div className={styles.expertDetails}>
                        <p className={styles.expertRole}>{expertData.role}</p>
                        <h3 className={styles.expertName}>{expertData.name}</h3>
                        <p className={styles.expertDescription}>{expertData.description}</p>
                        <button className={styles.viewProfileButton} onClick={handleViewExpertProfile}>Ver perfil</button>
                    </div>
                </div>
            </section>

            {/* Sección de Recursos de salud mental */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Recursos de salud mental</h2>
                <div className={styles.resourcesGrid}>
                    {resourcesData.map((resource) => (
                        <div key={resource.id} className={styles.resourceCard}>
                            <div className={styles.resourceIcon}>{resource.icon}</div>
                            <h4 className={styles.resourceTitle}>{resource.title}</h4>
                            <p className={styles.resourceDescription}>{resource.description}</p>
                            <div className={styles.resourceButtons}>
                                {resource.buttons.map((buttonText, btnIndex) => (
                                    <button
                                        key={btnIndex}
                                        className={styles.resourceButton}
                                        onClick={() => handleResourceAction(resource, buttonText)}
                                    >
                                        {buttonText}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sección de Suscripción al boletín */}
            <section className={`${styles.section} ${styles.newsletterSection}`}>
                <h2 className={styles.sectionTitle}>Suscríbete a nuestro boletín de salud mental</h2>
                <div className={styles.newsletterInputContainer}>
                    <input type="email" placeholder="Introduzca su dirección de correo electrónico" className={styles.newsletterInput} />
                    <span className={styles.newsletterIcon}>✉️</span>
                </div>
                <button className={styles.subscribeButton} onClick={handleSubscribe}>Suscribir</button>
            </section>
        </div>
    );
}

export default ContenidoEducativo;