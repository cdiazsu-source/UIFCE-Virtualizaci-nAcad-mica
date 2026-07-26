/* ============================================================================
   DATA.JS  —  CONTENIDO EDITABLE DEL SITIO DE VIRTUALIZACIÓN UIFCE
   ----------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas tocar para actualizar el sitio.
   No modifiques index.html, style.css ni script.js salvo que sepas lo que haces.

   CÓMO EDITAR:
   - Para poner un enlace, escribe la URL entre las comillas:  drive: "https://..."
   - Si un enlace no existe todavía, déjalo vacío "" y el botón se ocultará solo.
   - Para agregar un proyecto nuevo, copia un bloque { ... } completo y edítalo.
   - Respeta las comas al final de cada línea y las llaves { }.
   ============================================================================ */

/* --------------------------------------------------------------------------
   1. INFORMACIÓN GENERAL DEL ÁREA
   -------------------------------------------------------------------------- */
const AREA = {
  semestreActual: "2026-1",
  tituloHero: "Área de Virtualización",
  subtituloHero:
    "Unidad de Informática · Facultad de Ciencias Económicas · Universidad Nacional de Colombia",
  descripcionHero:
    "Espacio donde diseñamos, actualizamos y estandarizamos los contenidos educativos virtuales de la Facultad. Esta página reúne lo que hemos construido para que cada nuevo equipo de monitores pueda empalmar rápido y seguir avanzando.",
};

/* --------------------------------------------------------------------------
   2. LÍNEA DE TIEMPO (semestres)
   Sirve para filtrar los proyectos. El "id" debe coincidir con el "semestre"
   que uses en cada proyecto más abajo.
   -------------------------------------------------------------------------- */
const SEMESTRES = [
  { id: "2026-1", etiqueta: "2026-1", nota: "Consolidación del área unificada" },
];

/* --------------------------------------------------------------------------
   3. PROYECTOS
   ----------------------------------------------------------------------------
   estado: "finalizado" | "en-curso" | "pendiente"
   enlaces: botones estándar (drive, moodle, genially, documento, manual, plantilla).
   extras:  botones con texto personalizado -> [{ texto, icono, url }]
   Los enlaces vacíos "" no muestran botón. Rellénalos cuando los tengas.
   -------------------------------------------------------------------------- */
const PROYECTOS = [
  {
    id: "articulate",
    nombre: "Capacitación y empalme en Articulate",
    semestre: "2026-1",
    estado: "finalizado",
    icono: "🎓",
    encargados: ["Juan Laguna", "Ana Sofía Cardozo"],
    descripcion:
      "Acercamiento inicial del equipo junior a Articulate Storyline 360: revisión del manual de uso, análisis de la anatomía y estructura de proyectos anteriores, e implementación de una nueva interacción que nutre el repositorio de referencia del área en Articulate.",
    entregables: [
      "Documento de capacitación y prueba de diagnóstico",
      "Entregables .story de cada junior (mín. 5 diapositivas)",
      "Plantillas modelo e ideas de gamificación",
    ],
    enlaces: {},
    extras: [
      { texto: "Manual Articulate 360", icono: "📘", url: "https://drive.google.com/file/d/15A4lzteSne6MUyjrPJ60mtO2Mfq1c8eh/view?usp=drive_link" },
    ],
  },
  {
    id: "excel-cl",
    nombre: "Actualización Cursos Libres de Excel",
    semestre: "2026-1",
    estado: "en-curso",
    icono: "📊",
    encargados: ["César D."],
    descripcion:
      "Renovación de las OVAs de los Cursos Libres de Excel ya virtualizados: videos de mejor calidad con el nuevo Uifcito, cambio de texto a voz, gamificación integrada y banco de preguntas.",
    entregables: [
      "OVAs actualizadas de todo el Curso Libre",
      "Videos renovados con Uifcito nuevo",
      "Banco de preguntas y talleres",
      "6 nuevas plantillas de EBV",
    ],
    enlaces: {},
    extras: [
      { texto: "OVAs", icono: "📁", url: "https://drive.google.com/drive/folders/1_ixyvuRBOSTaF5uwqvtWCq1eqPQnxeav?usp=drive_link" },
      { texto: "Guión", icono: "📝", url: "https://docs.google.com/document/d/1aZcZ8aBgISKxA-sPjxUsgzjeaMWXVd799EcVeNoiIdM/edit?usp=drive_link" },
      { texto: "Uifcito en el desierto", icono: "🎬", url: "https://drive.google.com/file/d/1X72ObhtfA3wfvsUphgDOe2TjZ8sq1BdD/view?usp=sharing" },
      { texto: "Uifcito búsqueda del tesoro", icono: "🎬", url: "https://drive.google.com/file/d/1Qc5z4UjzMN25wMWuaIRMu-onJvWSShso/view?usp=sharing" },
      { texto: "Uifcito enigma", icono: "🎬", url: "https://drive.google.com/file/d/1EpHObBtX_1PPI_00LHXGN5dBT6qIAQO2/view?usp=sharing" },
    ],
  },
  {
    id: "python-r",
    nombre: "Finalización CL Introducción a Python y R",
    semestre: "2026-1",
    estado: "en-curso",
    icono: "🐍",
    encargados: ["Ana Sofía Cardozo"],
    descripcion:
      "Cierre, despliegue y remisión del Curso Libre de Introducción a la Programación en Python y R: lecciones faltantes, Moodle funcional, banco de preguntas y Genially interactivo de apoyo.",
    entregables: [
      "Lecciones faltantes del CLIPPRV",
      "Moodle desplegado con las OVAs finales",
      "Banco de preguntas y Genially resumen",
      "Backup organizado en Drive + matriz de inventario",
    ],
    enlaces: {
      drive: "https://drive.google.com/drive/folders/1tOh81YWBrqZ8nVs1X8zVniv4BFlfIBX6?usp=drive_link",
    },
  },
  {
    id: "moodle",
    nombre: "Investigación capacidad de Moodle",
    semestre: "2026-1",
    estado: "finalizado",
    icono: "🧪",
    encargados: ["Ana Sofía Cardozo"],
    descripcion:
      "Estudio del límite real de cursos libres virtualizados en el servidor de Moodle y viabilidad de duplicar cursos (Excel Macros, Odoo). Incluye métricas del servidor.",
    entregables: [
      "Documento de investigación de capacidad",
      "Duplicado de CL Excel Macros y Odoo (según viabilidad)",
      "Backup en Drive del material duplicado",
    ],
    enlaces: {
      drive: "https://drive.google.com/drive/folders/1_3KqrrVLukkmRLHIbd0yGwMFoq56nR_N?usp=sharing",
    },
  },
  {
    id: "genially",
    nombre: "Exploración Genially e integración",
    semestre: "2026-1",
    estado: "en-curso",
    icono: "✨",
    encargados: ["Juan L."],
    descripcion:
      "Investigación de Genially como alternativa a Articulate: caso de negocio con costos y ROI, comparativa, propuestas de gamificación e integración con Moodle, CL y Apoyos Académicos.",
    entregables: [
      "Documento de investigación (15-20 págs)",
      "Manual de uso de Genially",
      "Contenido de muestra para aprobar la suscripción completa",
      "Propuestas de integración con la UIFCE",
    ],
    enlaces: {
      documento: "https://docs.google.com/document/d/1UbeuP3jguwU9Ao16irY4pZPM28rSwqOwv29brXrXz8E/edit?usp=drive_link",
    },
  },
  {
    id: "excel-financiero",
    nombre: "Virtualización Excel Financiero 1 y 2",
    semestre: "2026-1",
    estado: "en-curso",
    icono: "💹",
    encargados: ["Equipo Virtualización"],
    descripcion:
      "Transformación del proyecto de estudio de Excel Financiero (Fundamentos y Finanzas Avanzadas) en dos cursos implementables en Moodle, con plantillas estandarizadas, banco de preguntas y gamificación con Genially.",
    entregables: [
      "Cursos listos en Moodle (10h y 12h)",
      "Plantillas del curso estandarizadas",
      "Banco de preguntas",
      "Genially de Fundamentos y Finanzas Avanzadas",
    ],
    enlaces: {
      drive: "https://drive.google.com/drive/folders/1dgYEizB-gPsVvZER1ba8GbuIG0PKVMo6?usp=drive_link",
    },
  },
  {
    id: "material-existente",
    nombre: "Material existente virtualización",
    semestre: "2026-1",
    estado: "finalizado",
    icono: "🗄️",
    encargados: ["Equipo Virtualización"],
    descripcion:
      "Repositorio del material previamente virtualizado por el área, disponible como base de consulta y reutilización para los proyectos actuales y futuros.",
    entregables: [
      "Recopilación organizada del material previo",
      "Base de consulta para nuevos proyectos",
    ],
    enlaces: {
      drive: "https://drive.google.com/drive/folders/1MrKrjBXYNJtayEXDA8aOCTmcbR9xrNif?usp=drive_link",
    },
  },
  {
    id: "apoyo-posgrado",
    nombre: "Apoyo académico en trabajo de grado — posgrado",
    semestre: "2026-1",
    estado: "finalizado",
    icono: "🎓",
    encargados: ["César D."],
    descripcion:
      "Acompañamiento académico brindado a la estudiante Sara Valentina Ruiz, de posgrado de la Facultad de Ciencias Económicas, a través de tres asesorías especializadas orientadas a la estandarización de procesos en la industria farmacéutica, en el marco de su trabajo de grado. El seguimiento constante contribuyó a la culminación exitosa de su proceso de graduación.",
    entregables: [
      "Encuesta de satisfacción del acompañamiento académico",
    ],
    enlaces: {},
  },
  {
    id: "marca-uifcito",
    nombre: "Nuevo Uifcito, logos y material de marca",
    semestre: "2026-1",
    estado: "finalizado",
    icono: "🤖",
    encargados: ["Equipo Virtualización"],
    descripcion:
      "Creación del nuevo Uifcito animado con múltiples expresiones, logos institucionales virtualizados, paleta de colores, franjas e intros de cursos libres con la identidad de la UIFCE.",
    entregables: [
      "Uifcito nuevo en 8+ expresiones (PNG, GIF, MP4)",
      "Logos institucionales animados",
      "Intros de Cursos Libres virtualizados",
      "5 interacciones virtuales de muestra",
    ],
    enlaces: {
      drive: "https://drive.google.com/drive/folders/1yZUmOXcYk3m_5k8Bv0bftcdjMPbKgkT1?usp=sharing",
    },
  },
];

/* --------------------------------------------------------------------------
   4. EMPALME GENIALLY (resumen del manual de uso)
   -------------------------------------------------------------------------- */
const GENIALLY = {
  intro:
    "Genially es una plataforma online (sin instalación, freemium) donde la interactividad es el centro de cada diseño: cualquier elemento puede desencadenar una acción. Estamos evaluando la transición de Articulate hacia Genially por su menor costo, sus plantillas listas y su amplia interactividad.",
  enlaces: {
    manual: "https://docs.google.com/document/d/10RTdwQDWctmCTEl_5TJQIFqZaGqfUhMptTUi31wuzL4/edit?usp=sharing",
    genially: "https://genial.ly/",
  },
  tiposDiseno: [
    {
      categoria: "Para presentar",
      tipos: "Presentación, Videopresentación, Dosier, Recursos didácticos",
      uso: "Introducción de módulos, explicación de temas, presentaciones de inicio de curso.",
    },
    {
      categoria: "Para interaccionar",
      tipos: "Imagen interactiva, Gamificación, Quiz",
      uso: "Actividades de repaso, evaluaciones rápidas, juegos educativos, mapas interactivos.",
    },
    {
      categoria: "Para explicar",
      tipos: "Infografía, Procesos/Línea de tiempo, Listas, Mapas",
      uso: "Procesos académicos, líneas de tiempo, guías rápidas de herramientas.",
    },
    {
      categoria: "Para difundir",
      tipos: "Eventos, eCard, Epóster, CV",
      uso: "Comunicados de la unidad, epósteres de eventos, tarjetas de bienvenida.",
    },
  ],
  interactividad: [
    { nombre: "Etiqueta", desc: "Muestra un texto corto al pasar/hacer clic. Ideal para explicaciones breves." },
    { nombre: "Ventana", desc: "Abre un panel con contenido extenso: imágenes, videos, listas." },
    { nombre: "Ir a página", desc: "Lleva a otra página del diseño. Base de la gamificación y quizzes ramificados." },
    { nombre: "Enlace externo", desc: "Abre una URL en nueva pestaña: recursos, bibliografía, YouTube." },
  ],
  tecnicaClave: {
    titulo: "Modo Microsite + Áreas Invisibles",
    desc:
      "Combinando el Modo Microsite con áreas invisibles y la interactividad «Ir a página» se crean quizzes con retroalimentación por respuesta (acierto/error), escape rooms, juegos de código secreto y tableros de juego.",
    pasos: [
      "Crea la pregunta y sus opciones (Página 1).",
      "Activa el Modo Microsite (barra inferior › Microsite).",
      "Crea página de «Respuesta correcta» (Pág. 2) y de «Incorrecta» (Pág. 3).",
      "Sobre la opción correcta pon un Área Invisible › «Ir a página» › Pág. 2.",
      "Sobre las incorrectas, Áreas Invisibles › «Ir a página» › Pág. 3.",
      "Prueba todo con Vista previa antes de publicar.",
    ],
  },
  buenasPracticas: [
    { fase: "Antes de crear", items: ["Define el objetivo pedagógico.", "Elige el tipo de diseño correcto (no uses presentación si necesitas un quiz).", "Revisa plantillas antes de empezar en blanco.", "Ten listo el contenido (textos, imágenes, URLs)."] },
    { fase: "Durante el diseño", items: ["Mantén la identidad visual (colores y tipografía institucionales).", "Menos es más: evita textos largos y exceso de animaciones.", "Cuida el contraste y texto legible (mín. 14pt).", "Bloquea el fondo y nombra las páginas."] },
    { fase: "Al publicar", items: ["Haz Vista previa completa y prueba cada interacción.", "Publica ANTES de compartir el enlace.", "Al incrustar en Moodle usa iframe de mínimo 600px de alto.", "Recuerda republicar si haces cambios."] },
  ],
  // Recursos ya creados en Genially por el área
  recursos: [
    {
      nombre: "Logo Universidad Interactivo",
      desc: "Creado para colocarlo al inicio de los proyectos.",
      icono: "🏛️",
      url: "https://view.genially.com/6a32d3272e6b24dfa6a8acce",
    },
    {
      nombre: "Materia FCE · Fundamentos de finanzas",
      desc: "Recurso interactivo donde los estudiantes encuentran lo más fundamental de la materia.",
      icono: "💰",
      url: "https://view.genially.com/69a6348c282f94549169b888",
    },
    {
      nombre: "Materia FCE · Finanzas avanzadas",
      desc: "Recurso interactivo donde los estudiantes encuentran lo más fundamental de la materia.",
      icono: "📈",
      url: "https://view.genially.com/69a76b1062a622571c3660b5",
    },
    {
      nombre: "Mochila de supervivencia",
      desc: "Recurso interactivo que reúne recursos, pistas y recordatorios clave sobre las herramientas de Informática aplicada para la gestión de información FCE.",
      icono: "🎒",
      url: "https://view.genially.com/69af6ec583dcae28409c3d45",
    },
    {
      nombre: "Material para un profesor FCE",
      desc: "Virtualización interactiva de las diapositivas de un profesor, primeras sesiones de Contabilidad de gestión.",
      icono: "👨‍🏫",
      url: "https://view.genially.com/69ebc91cd98ab7d033240be1",
    },
    {
      nombre: "Plantilla general Genially",
      desc: "Plantilla estandarizada para crear el contenido de una clase o curso.",
      icono: "🧩",
      url: "https://view.genially.com/6a2c381b823051a8756fe6ed",
    },
  ],
};

/* --------------------------------------------------------------------------
   5. HERRAMIENTAS E IA RECOMENDADAS (por tarea)
   -------------------------------------------------------------------------- */
const HERRAMIENTAS = [
  {
    tarea: "Imágenes e ilustraciones",
    icono: "🖼️",
    apps: [
      { nombre: "Canva IA (Magic Media)", url: "https://www.canva.com/", nota: "Ya en uso. Íconos, fondos y assets." },
      { nombre: "Adobe Firefly", url: "https://firefly.adobe.com/", nota: "Generación de imágenes libre de derechos." },
      { nombre: "Whisk (Google Labs)", url: "https://whiskailabs.org/es", nota: "Generación y remezcla de imágenes con IA." },
    ],
  },
  {
    tarea: "Animación de personajes",
    icono: "🎬",
    apps: [
      { nombre: "Canva (animate)", url: "https://www.canva.com/", nota: "Animar a Uifcito rápido." },
      { nombre: "Vyond", url: "https://www.vyond.com/", nota: "Animación de personajes más elaborada." },
    ],
  },
  {
    tarea: "Edición de video",
    icono: "✂️",
    apps: [
      { nombre: "Shotcut", url: "https://shotcut.org/", nota: "Ya en uso. Gratis y open source." },
      { nombre: "CapCut", url: "https://www.capcut.com/", nota: "Cortes rápidos, subtítulos automáticos." },
      { nombre: "Clipchamp", url: "https://clipchamp.com/es/", nota: "Editor online de Microsoft, plantillas listas." },
    ],
  },
  {
    tarea: "Voz y texto a voz",
    icono: "🎙️",
    apps: [
      { nombre: "ElevenLabs", url: "https://elevenlabs.io/", nota: "Narración natural para OVAs." },
      { nombre: "Murf.ai", url: "https://murf.ai/", nota: "Alternativa de voces en español." },
      { nombre: "Google AI Studio", url: "https://aistudio.google.com/prompts/new_chat", nota: "Generación de voz y contenido con Gemini." },
    ],
  },
  {
    tarea: "Interactividad y gamificación",
    icono: "🎮",
    apps: [
      { nombre: "Genially", url: "https://genial.ly/", nota: "Herramienta principal del área." },
      { nombre: "H5P", url: "https://h5p.org/", nota: "Interacciones integrables en Moodle." },
      { nombre: "Wordwall", url: "https://wordwall.net/", nota: "Juegos y actividades exprés." },
    ],
  },
  {
    tarea: "Guiones y contenido",
    icono: "✍️",
    apps: [
      { nombre: "ChatGPT", url: "https://chat.openai.com/", nota: "Guiones, resúmenes, transcripciones." },
      { nombre: "Claude", url: "https://claude.ai/", nota: "Redacción y análisis de documentos." },
    ],
  },
  {
    tarea: "Diseño y plantillas",
    icono: "🎨",
    apps: [
      { nombre: "Canva Pro", url: "https://www.canva.com/", nota: "Suscripción activa del área." },
    ],
  },
];

/* --------------------------------------------------------------------------
   6. RECURSOS DE MARCA
   Las imágenes ya están en assets/. Para descargar, el botón apunta al archivo.
   -------------------------------------------------------------------------- */
const LOGOS = [
  { nombre: "Versión principal", archivo: "assets/logos/logo-principal.png", fondo: "claro" },
  { nombre: "Monocromía",        archivo: "assets/logos/logo-monocromia.png", fondo: "claro" },
  { nombre: "Positivo",          archivo: "assets/logos/logo-positivo.png", fondo: "claro" },
  { nombre: "Negativo",          archivo: "assets/logos/logo-negativo.png", fondo: "oscuro" },
  { nombre: "Blanco",            archivo: "assets/logos/logo-blanco.png", fondo: "oscuro" },
  { nombre: "Gris",              archivo: "assets/logos/logo-gris.png", fondo: "claro" },
  { nombre: "Antiguo",           archivo: "assets/logos/logo-antiguo.jpeg", fondo: "claro" },
];

const UIFCITO_ESTADOS = [
  { nombre: "Saludo",       archivo: "assets/uifcito/uifcito-saludo.png" },
  { nombre: "Feliz",        archivo: "assets/uifcito/uifcito-feliz.png" },
  { nombre: "Neutral",      archivo: "assets/uifcito/uifcito-neutral.png" },
  { nombre: "Explicando",   archivo: "assets/uifcito/uifcito-explicando.png" },
  { nombre: "Presentando",  archivo: "assets/uifcito/uifcito-presentando.png" },
  { nombre: "Pensando",     archivo: "assets/uifcito/uifcito-pensando.png" },
  { nombre: "Alerta",       archivo: "assets/uifcito/uifcito-alerta.png" },
  { nombre: "Despedida",    archivo: "assets/uifcito/uifcito-despedida.png" },
];

const UIFCITO_ANIMADOS = [
  { nombre: "Saludando (GIF)", archivo: "assets/uifcito/uifcito-saludando.gif", tipo: "gif" },
  { nombre: "Celebrando",      archivo: "assets/uifcito/uifcito-celebrando.mp4", tipo: "video" },
  { nombre: "Bailando",        archivo: "assets/uifcito/uifcito-bailando.mp4", tipo: "video" },
  { nombre: "Emocionado",      archivo: "assets/uifcito/uifcito-emocionado.mp4", tipo: "video" },
];

/* Tipografía institucional de la Universidad Nacional de Colombia */
const FUENTES = {
  descarga:
    "https://identidad.unal.edu.co/guia-identidad-visual/c-procedimientos/c1-descarga-e-instalacion-tipografia-ancizar/",
  familias: [
    "Ancizar Sans — Thin",
    "Ancizar Sans — Light Italic",
    "Ancizar Serif — Black",
    "Ancizar Sans — Bold Italic",
  ],
};

/* Paleta institucional (con valores RGB y CMYK) */
const PALETA = [
  { nombre: "Azul oscuro", hex: "#000066", rgb: "R 0 · G 0 · B 102",   cmyk: "C 100 · M 94 · Y 32 · K 30" },
  { nombre: "Azul",        hex: "#0000FF", rgb: "R 0 · G 0 · B 255",   cmyk: "C 93 · M 75 · Y 0 · K 0" },
  { nombre: "Negro",       hex: "#000000", rgb: "R 0 · G 0 · B 0",     cmyk: "C 0 · M 0 · Y 0 · K 100" },
  { nombre: "Amarillo",    hex: "#FFFF00", rgb: "R 255 · G 255 · B 0", cmyk: "C 10 · M 0 · Y 95 · K 0" },
  { nombre: "Blanco",      hex: "#FFFFFF", rgb: "R 255 · G 255 · B 255", cmyk: "C 0 · M 0 · Y 0 · K 0" },
  { nombre: "Azul medio",  hex: "#6666FF", rgb: "R 102 · G 102 · B 255", cmyk: "C 76 · M 64 · Y 0 · K 0" },
];

/* --------------------------------------------------------------------------
   7. GUÍAS Y PLANTILLAS
   -------------------------------------------------------------------------- */
const GUIAS = [
  {
    nombre: "Manual de Articulate Storyline 360",
    desc: "Recorrido general por el programa, usos y limitaciones. Elaborado en 2025-2.",
    icono: "📘",
    url: "https://drive.google.com/file/d/1wHVt9KBh6ollS1RnUaEly9_l6kiRFvNL/view?usp=sharing",
  },
  {
    nombre: "Manual de uso de Genially",
    desc: "Guía completa: tipos de diseño, interactividad, animación y publicación.",
    icono: "📗",
    url: "https://docs.google.com/document/d/10RTdwQDWctmCTEl_5TJQIFqZaGqfUhMptTUi31wuzL4/edit?usp=sharing",
  },
  {
    nombre: "Plantillas maestras",
    desc: "Plantillas .story estandarizadas con logo UNAL/UIFCE virtualizado listas para reutilizar.",
    icono: "🗂️",
    url: "https://drive.google.com/drive/folders/1MrwEyYRh3NTnTupNoFknyuhSfjI4qAV8?usp=sharing",
  },
  {
    nombre: "Guía de estandarización del área",
    desc: "Lineamientos para mantener criterios y calidad uniforme en el área.",
    icono: "📐",
    url: "https://docs.google.com/document/d/19t1sQ3aelsA-Y7SvI9q8kNULO7hVG3PSX8eWR-o0xsI/edit?usp=sharing",
  },
  {
    nombre: "Guía para virtualización",
    desc: "Procedimiento paso a paso para virtualizar un curso o contenido.",
    icono: "🧭",
    url: "https://docs.google.com/document/d/1d4DcUWD8yY-t4QPceg0EvUQhM8YOXi9bu39DvisUFBc/edit?usp=sharing",
  },
  {
    nombre: "Buenas prácticas de nomenclatura",
    desc: "Nombrar cada capa, botón e interacción para facilitar reproducibilidad entre plantillas.",
    icono: "🏷️",
    url: "",
  },
];

/* --------------------------------------------------------------------------
   8. CONTACTO (footer)
   -------------------------------------------------------------------------- */
const CONTACTO = {
  unidad: "Unidad de Informática — Facultad de Ciencias Económicas",
  sede: "Universidad Nacional de Colombia · Sede Bogotá",
  correo: "",   // correo del área si quieres mostrarlo
  drive: "",    // enlace a la carpeta raíz de Drive del área
};
