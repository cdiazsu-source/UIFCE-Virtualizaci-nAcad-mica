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
  descripcionHero: [
    "Diseño, actualización y estandarización de los contenidos e-learning de la Unidad de Informática y la Facultad de Ciencias Económicas.",
    "Repositorio centralizado de los recursos, plantillas y lineamientos desarrollados por el área.",
    "Soporte a la continuidad del proceso de empalme entre los sucesivos equipos de monitores.",
  ],
};

/* --------------------------------------------------------------------------
   1b. TARJETAS DE INTRODUCCIÓN (se abren en un modal, van sobre la línea de tiempo)
   -------------------------------------------------------------------------- */
const INTRO_AREA_CARDS = [
  {
    icono: "📍",
    titulo: "Antecedentes del área",
    texto: "El área se creó en el semestre 2026-1 con el propósito de organizar y consolidar la producción de material educativo virtual dentro de la Unidad de Informática.",
  },
  {
    icono: "🎯",
    titulo: "Foco estratégico",
    texto: "Su objetivo es establecer lineamientos técnicos y pedagógicos comunes que garanticen la calidad de los materiales de estudio y contribuyan a la experiencia de aprendizaje de la comunidad académica.",
  },
  {
    icono: "🧭",
    titulo: "Pilares estratégicos",
    texto: "El trabajo del área se concentra en tres frentes: el apoyo a los cursos de extensión de la Facultad, la capacitación del personal administrativo interno y la actualización metodológica de las asignaturas de la Facultad de Ciencias Económicas.",
  },
  {
    icono: "⚙️",
    titulo: "Modelo operativo",
    texto: "Para ello, se han unificado y actualizado procesos clave como el diseño de los cursos, la elaboración de recursos multimedia y la incorporación de dinámicas interactivas.",
  },
  {
    icono: "🌱",
    titulo: "Sostenibilidad y crecimiento",
    texto: "Este trabajo busca establecer un modelo de organización sostenible que oriente la labor de los futuros equipos de monitores y permita la continuidad del área en los siguientes periodos académicos.",
  },
];

/* --------------------------------------------------------------------------
   2. LÍNEA DE TIEMPO (semestres)
   Sirve para filtrar los proyectos. El "id" debe coincidir con el "semestre"
   que uses en cada proyecto más abajo.
   -------------------------------------------------------------------------- */
const SEMESTRES = [
  { id: "2026-1", etiqueta: "2026-1", nota: "Consolidación del área unificada" },
];

/* --------------------------------------------------------------------------
   2b. LÍNEAS (según el Estándar de nomenclatura de cursos VA_[LINEA]_[NIVEL]_...)
   Cada línea pertenece a una categoria: "herramienta" (software) o "disciplina"
   (área temática). Úsalas en el campo "linea" de cada proyecto/curso más abajo.
   Para agregar una línea nueva: escoge una sigla corta (3-4 letras) y agrégala aquí.
   -------------------------------------------------------------------------- */
const LINEAS = {
  // Herramientas y software (tabla oficial del estándar)
  EXC: { nombre: "Excel", categoria: "herramienta" },
  PBI: { nombre: "Power BI", categoria: "herramienta" },
  SIG: { nombre: "SIIGO", categoria: "herramienta" },
  ACC: { nombre: "Access", categoria: "herramienta" },
  LAT: { nombre: "LaTeX", categoria: "herramienta" },
  PYT: { nombre: "Python", categoria: "herramienta" },
  STT: { nombre: "Stata", categoria: "herramienta" },
  WOR: { nombre: "Word", categoria: "herramienta" },
  PPT: { nombre: "PowerPoint", categoria: "herramienta" },
  RSP: { nombre: "RStudio", categoria: "herramienta" },
  // Herramientas internas del área (extensión no oficial todavía, ver punto 10.3 del estándar)
  ART: { nombre: "Articulate 360", categoria: "herramienta" },
  GEN: { nombre: "Genially", categoria: "herramienta" },
  MDL: { nombre: "Moodle", categoria: "herramienta" },
  // Áreas temáticas o disciplinares (tabla oficial del estándar)
  FIN: { nombre: "Finanzas", categoria: "disciplina" },
  ECO: { nombre: "Econometría", categoria: "disciplina" },
  EST: { nombre: "Estadística", categoria: "disciplina" },
  CON: { nombre: "Contabilidad", categoria: "disciplina" },
  ADM: { nombre: "Administración", categoria: "disciplina" },
  DAT: { nombre: "Análisis de datos", categoria: "disciplina" },
  INV: { nombre: "Investigación", categoria: "disciplina" },
  MAT: { nombre: "Matemáticas", categoria: "disciplina" },
  MER: { nombre: "Mercadeo", categoria: "disciplina" },
  PRO: { nombre: "Proyectos", categoria: "disciplina" },
  COS: { nombre: "Costos", categoria: "disciplina" },
  PRE: { nombre: "Presupuesto", categoria: "disciplina" },
};

/* --------------------------------------------------------------------------
   3. PROYECTOS
   ----------------------------------------------------------------------------
   estado: "finalizado" | "en-curso" | "pendiente"
   linea:  sigla de LINEAS (arriba) -> ej. "EXC". Opcional: déjalo sin escribir
           si el proyecto no corresponde a una herramienta o disciplina puntual
           (p. ej. proyectos de marca, investigación general, apoyo académico).
   enlaces: botones estándar (drive, moodle, genially, documento, manual, plantilla).
   extras:  botones con texto personalizado -> [{ texto, icono, url }]
   Los enlaces vacíos "" no muestran botón. Rellénalos cuando los tengas.
   -------------------------------------------------------------------------- */
const PROYECTOS = [
  {
    id: "guia-primeros-pasos",
    nombre: "Guía de Primeros Pasos en Virtualización Académica",
    semestre: "2026-1",
    estado: "finalizado",
    icono: "🚀",
    encargados: ["Equipo Virtualización"],
    descripcion:
      "Documento de referencia introductorio para el área de Virtualización Académica: explica el porqué del área, su filosofía de trabajo, el flujo de 7 etapas para virtualizar un curso, la estructura del Guion Maestro, los roles del equipo y las buenas prácticas metodológicas. Es el punto de entrada obligatorio para cualquier persona que se integre al área.",
    entregables: [
      "Guía completa de primeros pasos (documento maestro)",
      "Flujo de 7 etapas de virtualización",
      "Definición de roles (Monitor Máster, Monitores Junior, articulación con otras áreas UIFCE)",
      "Buenas prácticas metodológicas y glosario básico",
    ],
    enlaces: {
      documento: "https://docs.google.com/document/d/1d4DcUWD8yY-t4QPceg0EvUQhM8YOXi9bu39DvisUFBc/edit?usp=drive_link",
    },
  },
  {
    id: "material-existente",
    nombre: "Creación del dominio y estándar de carpetas del área",
    semestre: "2026-1",
    estado: "finalizado",
    icono: "🗄️",
    encargados: ["Equipo Virtualización"],
    descripcion:
      "Diseño e implementación de la carpeta raíz institucional \"Virtualizacion_Academica\" en Google Drive, que centraliza la gestión, documentación, producción, recursos reutilizables y archivo histórico del área. A partir de este dominio se definió un estándar oficial de organización y nomenclatura —de carpetas, cursos y archivos— que garantiza trazabilidad, escalabilidad y continuidad del trabajo entre los distintos equipos de monitores.",
    entregables: [
      "Carpeta raíz \"Virtualizacion_Academica\" con sus 7 carpetas principales (Gestión del área, Guías y documentación, Plantillas maestras, Cursos en proceso, Cursos finalizados, Recursos reutilizables, Histórico)",
      "Documento del Estándar de Estructura de Carpetas (versión final)",
      "Norma de nomenclatura de carpetas, cursos y archivos",
      "Organización del material existente dentro del nuevo dominio",
    ],
    enlaces: {
      drive: "https://drive.google.com/drive/folders/1MrKrjBXYNJtayEXDA8aOCTmcbR9xrNif?usp=drive_link",
    },
    extras: [
      { texto: "Organización de carpetas", icono: "🗂️", url: "https://drive.google.com/drive/folders/1C44YCShWIBv5o6pMvCs9CHV1DB0_fyGO?usp=drive_link" },
      { texto: "Ver mapa de carpetas", icono: "🗺️", url: "#carpetas" },
    ],
  },
  {
    id: "articulate",
    nombre: "Capacitación y empalme en Articulate",
    semestre: "2026-1",
    estado: "finalizado",
    linea: "ART",
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
    estado: "finalizado",
    linea: "EXC",
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
    estado: "finalizado",
    linea: "PYT",
    icono: "🐍",
    encargados: ["Juan Esteban Laguna"],
    descripcion:
      "Renovación integral del curso de Introducción a la Programación con Python y R, un proyecto con varios semestres de retraso. Esta iniciativa consistió en el diseño desde cero de sus contenidos y metodologías, aplicando los nuevos formatos y plantillas del área para garantizar un material de estudio moderno, visualmente coherente y de alta calidad académica.",
    entregables: [
      "Lecciones faltantes del CLIPPRV",
      "Moodle desplegado con las OVAs finales",
      "Banco de preguntas y Genially resumen",
      "Backup organizado en Drive + matriz de inventario",
    ],
    enlaces: {
      drive: "https://drive.google.com/drive/folders/1ZKS5MdfIUQoLjiOmas8yBgcUZNVDah7C?usp=drive_link",
    },
  },
  {
    id: "moodle",
    nombre: "Investigación capacidad de Moodle",
    semestre: "2026-1",
    estado: "finalizado",
    linea: "MDL",
    icono: "🧪",
    encargados: ["Juan Esteban Laguna"],
    descripcion:
      "Estudio del límite real de cursos libres virtualizados en el servidor de Moodle y viabilidad de duplicar cursos (Excel Macros, Odoo). Incluye métricas del servidor.",
    entregables: [
      "Documento de investigación de capacidad",
      "Duplicado de CL Excel Macros y Odoo (según viabilidad)",
      "Backup en Drive del material duplicado",
    ],
    enlaces: {
      drive: "https://docs.google.com/document/d/1NGX4wVoXlCaX_O5XVCd6oiQrkFNxjxdk/edit?usp=sharing&ouid=104555590579470237858&rtpof=true&sd=true",
    },
  },
  {
    id: "genially",
    nombre: "Exploración Genially e integración",
    semestre: "2026-1",
    estado: "finalizado",
    linea: "GEN",
    icono: "✨",
    encargados: ["Ana Sofia Cardozo"],
    descripcion:
      "Evaluación técnica y pedagógica de la plataforma Genially, explorándola como una alternativa de mayor accesibilidad e interfaz más intuitiva frente a Articulate. La investigación comprendió un estudio detallado de sus restricciones operativas, su viabilidad financiera y la formulación de estrategias para su integración en los entornos virtuales de aprendizaje.",
    entregables: [
      "Documento de investigación (15-20 págs)",
      "Manual de uso de Genially",
      "Contenido de muestra para aprobar la suscripción completa",
      "Propuestas de integración con la UIFCE",
    ],
    enlaces: {},
    extras: [
      { texto: "Manual Genially", icono: "📄", url: "https://docs.google.com/document/d/1cAHxx3O1KxBloTTxLOuhlPc0tUxvapFVOmBZsOexnyw/edit?usp=drive_link" },
      { texto: "Integración nueva herramienta", icono: "🔗", url: "https://docs.google.com/document/d/1g7jSf7wvQlsR1N3J0-4q_V_op9_UuR_wgY98VypeHcU/edit?usp=drive_link" },
      { texto: "Mochila de supervivencia", icono: "🎒", url: "https://view.genially.com/69af6ec583dcae28409c3d45" },
    ],
  },
  {
    id: "excel-financiero",
    nombre: "Virtualización Excel Financiero 1 y 2",
    semestre: "2026-1",
    estado: "finalizado",
    linea: "EXC",
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
   5b. LOOP DE LOGOS (tecnologías que se enseñan en el área)
   -------------------------------------------------------------------------- */
const LOGO_LOOP = [
  { nombre: "Excel", archivo: "assets/logos/excel.svg" },
  { nombre: "SQL", archivo: "assets/logos/mysql.svg" },
  { nombre: "Universidad Nacional de Colombia", archivo: "assets/institucional/logo-unal.png" },
  { nombre: "Python", archivo: "assets/logos/python.svg" },
  { nombre: "R", archivo: "assets/logos/r.svg" },
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
   2c. EL ÁREA DENTRO DE LA UIFCE (organigrama simple)
   -------------------------------------------------------------------------- */
const AREAS_UIFCE = [
  {
    sigla: "AA",
    nombre: "Apoyos Académicos",
    descripcion: "Área dedicada a resolver las necesidades tecnológicas del día a día académico, garantizando que profesores y alumnos cuenten con el soporte, las plataformas y el software especializado necesarios para sus clases y proyectos.",
    relacionVA: "Brinda soporte técnico de primer nivel a profesores y estudiantes en el uso de los cursos y recursos virtualizados por el área, resolviendo inconvenientes cotidianos de acceso a plataformas y herramientas.",
  },
  {
    sigla: "GC",
    nombre: "Gestión del Conocimiento",
    descripcion: "Su rol es preservar y potenciar el capital intelectual de la Unidad de Informática. Se encarga de sistematizar procesos, documentar soluciones tecnológicas y crear un repositorio institucional que garantice la continuidad operativa.",
    relacionVA: "Apoya a Virtualización Académica en la organización documental y la preservación de los recursos y cursos producidos.",
  },
  {
    sigla: "ET",
    nombre: "Estrategias Tecnológicas",
    descripcion: "Gestiona la difusión de todos los servicios que presta la UIFCE a través de los diferentes medios de comunicación, espacios y eventos a los que se tiene acceso, buscando que una mayor cantidad de usuarios hagan uso de estos.",
    relacionVA: "Apoya a Virtualización Académica en la identidad visual, los recursos gráficos y la difusión multimedia de los cursos virtualizados.",
  },
  {
    sigla: "VA",
    nombre: "Virtualización Académica",
    destacada: true,
    descripcion: "Diseña, produce y despliega los Objetos Virtuales de Aprendizaje (OVA) y cursos virtualizados de la Facultad, articulándose con las demás áreas de la UIFCE para garantizar procesos técnicos, pedagógicos y documentales de calidad.",
  },
  {
    sigla: "DS",
    nombre: "Desarrollo",
    descripcion: "Área responsable de impulsar la transformación digital mediante la arquitectura, desarrollo e integración de sistemas de información, garantizando que la Facultad cuente con plataformas de software robustas, seguras y escalables.",
    relacionVA: "Brinda a Virtualización Académica el soporte técnico y de infraestructura necesario para la implementación de los cursos en Moodle y otras plataformas.",
  },
  {
    sigla: "CL",
    nombre: "Cursos Libres",
    descripcion: "Encargada directa de la planeación, creación y gestión de los cursos libres a ofertar durante el semestre académico. Adicionalmente, apoya a profesores y administrativos de la FCE en el uso de herramientas tecnológicas enfocadas a la virtualidad, y direcciona el comité de cursos libres, que vela por la calidad y el contenido de los cursos ofertados por la UIFCE.",
    relacionVA: "Se articula con Virtualización Académica para la implementación y el despliegue de los cursos virtualizados dentro de la oferta de Cursos Libres.",
  },
];

/* --------------------------------------------------------------------------
   6b. GUÍA DE VIRTUALIZACIÓN (resumen visual de la Guía de Primeros Pasos)
   -------------------------------------------------------------------------- */
const FLUJO_VIRTUALIZACION = [
  { icono: "📥", nombre: "Recepción y organización", desc: "Se reciben los insumos del docente: syllabus, presentaciones, bibliografía y ejercicios." },
  { icono: "🧭", nombre: "Estructuración pedagógica", desc: "Se define la organización del curso: módulos, secuencia de aprendizaje y recursos necesarios." },
  { icono: "🎬", nombre: "Producción multimedia", desc: "Se elaboran guiones, narraciones, videos y recursos gráficos de apoyo." },
  { icono: "🧩", nombre: "Desarrollo interactivo", desc: "Se monta el contenido en Articulate 360: narraciones, botones, interacciones y evaluaciones." },
  { icono: "🔍", nombre: "Revisión y ajustes", desc: "Se valida funcionamiento, ortografía, consistencia visual y navegación antes de publicar." },
  { icono: "📦", nombre: "Exportación", desc: "Se generan los entregables finales, generalmente en formato SCORM." },
  { icono: "🚀", nombre: "Implementación y despliegue", desc: "Se carga el recurso en Moodle y se valida su acceso y funcionamiento." },
];

const ROLES_VIRTUALIZACION = [
  { icono: "🧑‍💼", nombre: "Monitor Máster", desc: "Planea, supervisa y coordina el flujo general del área; valida calidad y coherencia de los OVAs." },
  { icono: "🧑‍💻", nombre: "Monitores Junior", desc: "Desarrollan y producen los recursos: contenidos, interactividad, audiovisuales y documentación." },
  { icono: "🎨", nombre: "Estrategias Tecnológicas", desc: "Apoya identidad visual, recursos gráficos y difusión multimedia." },
  { icono: "🛠️", nombre: "Desarrollo", desc: "Brinda soporte técnico de infraestructura, Moodle y plataformas." },
  { icono: "🗄️", nombre: "Gestión del Conocimiento", desc: "Apoya la organización documental y la preservación de recursos." },
  { icono: "📚", nombre: "Cursos Libres", desc: "Se articula para la implementación y despliegue de los cursos virtualizados." },
];

const PRACTICAS_VIRTUALIZACION = [
  { icono: "🧹", nombre: "Claridad y organización", desc: "Textos breves, contenidos divididos en secciones y jerarquías visuales claras." },
  { icono: "🎯", nombre: "Coherencia visual y metodológica", desc: "Tipografías, colores, iconografía y navegación consistentes entre cursos." },
  { icono: "⚖️", nombre: "Equilibrio con multimedia", desc: "Videos y narraciones que apoyan el aprendizaje, sin saturar la experiencia." },
  { icono: "🧪", nombre: "Enfoque práctico", desc: "Ejercicios aplicados, ejemplos contextualizados y demostraciones reales." },
  { icono: "🗂️", nombre: "Organización y respaldo", desc: "Archivos, narraciones y videos guardados en la estructura documental del área." },
  { icono: "🔁", nombre: "Revisión constante", desc: "Mejora continua de los recursos ya publicados." },
];

const GLOSARIO_VIRTUALIZACION = [
  { termino: "OVA", desc: "Objeto Virtual de Aprendizaje: recurso educativo digital interactivo." },
  { termino: "Guion Maestro", desc: "Documento central de planeación y documentación de un OVA o curso virtualizado." },
  { termino: "SCORM", desc: "Estándar para empaquetar y desplegar contenidos LMS con seguimiento de progreso." },
  { termino: "LMS", desc: "Sistema de gestión de aprendizaje utilizado para administrar cursos virtuales (ej. Moodle)." },
  { termino: "Escena", desc: "Conjunto de diapositivas que representa una lección o módulo en Articulate." },
  { termino: "Capa", desc: "Contenido adicional mostrado sobre una diapositiva sin cambiar de escena." },
  { termino: "Trigger (Accionador)", desc: "Configuración que define qué ocurre al interactuar con un objeto en Articulate." },
  { termino: "Gamificación", desc: "Uso de dinámicas de juego para fortalecer la motivación y participación del estudiante." },
  { termino: "Narración", desc: "Audio que acompaña y explica los contenidos visuales de un OVA." },
  { termino: "H5P", desc: "Herramienta para crear cuestionarios, juegos y actividades interactivas." },
];

/* --------------------------------------------------------------------------
   7b. ORGANIZACIÓN DE CARPETAS (mapa visual del dominio en Drive)
   Basado en el Estándar de Estructura de Carpetas del área.
   Cada subcarpeta es { nombre, descripcion, subcarpetas? } — "subcarpetas" es
   opcional y solo se usa para anidar un nivel más (Guias_herramientas, plantilla de curso).
   -------------------------------------------------------------------------- */
const CARPETAS_RAIZ = "Virtualizacion_Academica";
const CARPETAS_DRIVE_URL = "https://drive.google.com/drive/folders/1C44YCShWIBv5o6pMvCs9CHV1DB0_fyGO?usp=drive_link";

const SUBCARPETAS_CURSO = [
  { nombre: "01_Insumos_y_estructura", descripcion: "Insumos entregados por docentes (presentaciones, textos, syllabus) y definición de la estructura académica: objetivos, módulos y secuencia de contenidos." },
  { nombre: "02_Guion_y_apoyos", descripcion: "Guion general y por módulo, textos de pantalla, instrucciones de interacción, retroalimentaciones y demás apoyos de desarrollo." },
  { nombre: "03_Recursos", descripcion: "Imágenes, íconos, audios, videos, capturas, gráficos y documentos descargables usados en la producción del curso." },
  { nombre: "04_Produccion_y_revision", descripcion: "Archivos fuente de producción (Articulate 360 u otras herramientas), versiones de trabajo, observaciones y revisiones internas." },
  { nombre: "05_Entrega_y_cierre", descripcion: "Paquetes de entrega, versiones finales aprobadas, exportaciones SCORM/HTML y documentos de cierre del proyecto." },
];

const ESTRUCTURA_CARPETAS = [
  {
    nombre: "00_Gestion_del_area",
    icono: "🗂️",
    objetivo: "Centralizar los documentos de planeación, coordinación, seguimiento y administración general del área.",
    subcarpetas: [
      { nombre: "01_Planeacion_y_control", descripcion: "Cronogramas semestrales, planes de trabajo, hojas de ruta, seguimiento de actividades e indicadores de cumplimiento." },
      { nombre: "02_Organizacion_del_area", descripcion: "Propósito, alcance, funciones, responsabilidades, licencias, accesos y recursos operativos del área." },
      { nombre: "03_Reuniones_y_actas", descripcion: "Actas, minutas, acuerdos y compromisos derivados de reuniones formales del área." },
      { nombre: "04_Solicitudes_y_priorizacion", descripcion: "Solicitudes de cursos recibidas, matrices de priorización, backlog y criterios de selección." },
      { nombre: "05_Historico", descripcion: "Cronogramas, planes y actas de periodos anteriores que ya no están vigentes, conservados como memoria." },
    ],
  },
  {
    nombre: "01_Guias_y_documentacion",
    icono: "📘",
    objetivo: "Concentrar el conocimiento metodológico y operativo del área: cómo se trabaja, qué lineamientos existen y qué herramientas se utilizan.",
    subcarpetas: [
      { nombre: "00_Guias_generales", descripcion: "Documentos introductorios y guías marco que explican el funcionamiento general del área." },
      {
        nombre: "01_Guias_herramientas",
        descripcion: "Guías específicas de uso de cada herramienta: primeros pasos, recomendaciones y buenas prácticas.",
        subcarpetas: [
          { nombre: "01_Articulate360", descripcion: "Guía de primeros pasos y buenas prácticas de Articulate 360." },
          { nombre: "02_Genially", descripcion: "Guía de uso, tipos de diseño e interactividad en Genially." },
          { nombre: "03_Canva", descripcion: "Guía de uso de Canva para piezas gráficas y plantillas del área." },
          { nombre: "04_GoogleAIStudio", descripcion: "Guía de uso de Google AI Studio para generación de contenido con IA." },
        ],
      },
      { nombre: "02_Protocolos_y_estandares", descripcion: "Protocolos, estándares, criterios de calidad y reglas de nomenclatura y estructura documental." },
      { nombre: "03_Formatos_y_apoyos_documentales", descripcion: "Formatos de brief, listas de chequeo, formatos de revisión y cierre, y matrices documentales." },
      { nombre: "04_Referencias_y_ejemplos", descripcion: "Referentes visuales, ejemplos de interacciones, casos de uso y muestras de buenas prácticas." },
      { nombre: "05_Historico", descripcion: "Versiones antiguas o reemplazadas de esta documentación, conservadas como respaldo." },
    ],
  },
  {
    nombre: "02_Plantillas_maestras",
    icono: "🧩",
    objetivo: "Centralizar los archivos base reutilizables que sirven como punto de partida para la producción de cursos y recursos.",
    subcarpetas: [
      { nombre: "01_Articulate360", descripcion: "Plantillas maestras de Articulate 360, versiones base y estructuras reutilizables." },
      { nombre: "02_Genially", descripcion: "Plantillas y estructuras base desarrolladas en Genially, adaptables a distintos proyectos." },
      { nombre: "03_Canva", descripcion: "Plantillas gráficas y piezas visuales base de uso recurrente en Canva." },
      { nombre: "04_Guiones_y_estructuras", descripcion: "Modelos de guion, esqueletos de curso y formatos base de diseño instruccional." },
      { nombre: "05_Historico", descripcion: "Versiones antiguas de plantillas ya reemplazadas, conservadas como respaldo." },
    ],
  },
  {
    nombre: "03_Cursos_en_proceso",
    icono: "🚧",
    objetivo: "Reunir los cursos y proyectos académicos en desarrollo, revisión o producción activa.",
    subcarpetas: [
      {
        nombre: "VA_[LINEA]_[NIVEL]_[NOMBRECORTO]_[PERIODO]",
        descripcion: "Carpeta raíz de cada curso individual (ej. VA_EXC_BAS_ExcelBasico_2026-1), con la misma estructura interna en los 5 pasos de producción.",
        subcarpetas: SUBCARPETAS_CURSO,
      },
    ],
  },
  {
    nombre: "04_Cursos_finalizados",
    icono: "✅",
    objetivo: "Conservar los cursos ya terminados y aprobados, manteniendo la misma estructura interna que en Cursos en proceso.",
    subcarpetas: [
      {
        nombre: "VA_[LINEA]_[NIVEL]_[NOMBRECORTO]_[PERIODO]",
        descripcion: "Carpeta raíz del curso ya cerrado, trasladada sin reorganizar, conservando sus 5 subcarpetas originales.",
        subcarpetas: SUBCARPETAS_CURSO,
      },
    ],
  },
  {
    nombre: "05_Recursos_reutilizables",
    icono: "♻️",
    objetivo: "Guardar recursos visuales, audiovisuales, interactivos, evaluativos, estructurales y gamificados reutilizables en distintos cursos.",
    subcarpetas: [
      { nombre: "01_Recursos_visuales", descripcion: "Imágenes, ilustraciones, fondos, texturas y elementos gráficos decorativos." },
      { nombre: "02_Recursos_audiovisuales", descripcion: "Audios, efectos de sonido, narraciones base, clips de video y animaciones." },
      { nombre: "03_Interacciones_y_evaluaciones", descripcion: "Modelos de interacciones, actividades tipo, bancos de preguntas y plantillas de evaluación." },
      { nombre: "04_Estructuras_y_gamificacion", descripcion: "Esqueletos de módulos, insignias, barras de progreso, retos y demás dinámicas de gamificación." },
      { nombre: "05_Historico", descripcion: "Recursos reutilizables ya reemplazados o fuera de uso, conservados como respaldo." },
    ],
  },
  {
    nombre: "07_Historico",
    icono: "📦",
    objetivo: "Conservar materiales, documentos y proyectos que ya no forman parte del trabajo activo, pero que deben preservarse como memoria institucional.",
    subcarpetas: [],
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
