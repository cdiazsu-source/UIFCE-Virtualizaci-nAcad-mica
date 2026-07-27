/* ============================================================================
   SCRIPT.JS — Renderiza el sitio a partir de data.js. No requiere edición.
   ============================================================================ */

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const ESTADO_LABEL = { "finalizado": "Finalizado", "en-curso": "En curso", "pendiente": "Pendiente" };
const LINK_META = {
  drive:     { icono: "📁", texto: "Drive" },
  moodle:    { icono: "🎓", texto: "Moodle" },
  genially:  { icono: "✨", texto: "Genially" },
  documento: { icono: "📄", texto: "Documento" },
  manual:    { icono: "📘", texto: "Manual" },
  plantilla: { icono: "🗂️", texto: "Plantilla" },
};

/* ---------- HERO + CONTACTO ---------- */
function renderHero() {
  $("#heroSemestre").textContent = AREA.semestreActual;
  $("#heroTitulo").textContent   = AREA.tituloHero;
  $("#heroSubtitulo").textContent = AREA.subtituloHero;
  $("#heroDesc").innerHTML = AREA.descripcionHero.map(item => `<li>${item}</li>`).join("");

  const info = $("#footerInfo");
  let html = `<strong>${CONTACTO.unidad}</strong><br>${CONTACTO.sede}`;
  if (CONTACTO.correo) html += `<br><a href="mailto:${CONTACTO.correo}">${CONTACTO.correo}</a>`;
  if (CONTACTO.drive)  html += `<br><a href="${CONTACTO.drive}" target="_blank" rel="noopener">Carpeta de Drive del área</a>`;
  info.innerHTML = html;
}

/* ---------- MODAL genérico ---------- */
function openModal(titulo, bodyHtml) {
  $("#modalTitle").textContent = titulo;
  $("#modalBody").innerHTML = bodyHtml;
  $("#introModal").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("#introModal").hidden = true;
  document.body.style.overflow = "";
}
function initModal() {
  $("#introModal").addEventListener("click", (e) => {
    if (e.target.closest("[data-modal-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#introModal").hidden) closeModal();
  });
}

/* ---------- TARJETAS DE INTRODUCCIÓN ---------- */
function renderIntroCards() {
  const wrap = $("#introModalCards");
  wrap.innerHTML = INTRO_AREA_CARDS.map((c, i) => `
    <button class="modalcard" type="button" data-idx="${i}">
      <span class="modalcard__icono">${c.icono}</span>
      <span class="modalcard__titulo">${c.titulo}</span>
      <span class="modalcard__ver">Ver más ›</span>
    </button>
  `).join("");
  $$(".modalcard", wrap).forEach(btn => {
    btn.addEventListener("click", () => {
      const c = INTRO_AREA_CARDS[Number(btn.dataset.idx)];
      openModal(c.titulo, `<p>${c.texto}</p>`);
    });
  });
}

/* ---------- EL ÁREA DENTRO DE LA UIFCE ---------- */
function buildAreaModalBody(area) {
  let html = `<p>${area.descripcion}</p>`;
  if (area.relacionVA) {
    html += `<p class="modal__relacion"><strong>Relación con Virtualización Académica:</strong> ${area.relacionVA}</p>`;
  }
  if (area.destacada) {
    const otras = AREAS_UIFCE.filter(a => a.relacionVA);
    html += `<p class="modal__relacion"><strong>Articulación con otras áreas:</strong></p>
      <ul class="modal__lista">${otras.map(a => `<li><strong>${a.sigla} · ${a.nombre}:</strong> ${a.relacionVA}</li>`).join("")}</ul>`;
  }
  return html;
}

function renderRolArea() {
  const areas = $("#areasUifceGrid");
  areas.innerHTML = AREAS_UIFCE.map((a, i) => `
    <button class="orgchart__area ${a.destacada ? "orgchart__area--destacada" : ""}" type="button" data-idx="${i}">
      ${a.destacada ? `<span class="orgchart__badge">2026</span>` : ""}
      ${a.destacada
        ? `<span class="orgchart__sigla">${a.sigla}</span>${a.nombre}`
        : `<span class="orgchart__sigla-only">${a.sigla}</span>`}
    </button>
  `).join("");
  $$(".orgchart__area", areas).forEach(btn => {
    btn.addEventListener("click", () => {
      const a = AREAS_UIFCE[Number(btn.dataset.idx)];
      openModal(a.nombre, buildAreaModalBody(a));
    });
  });
}

/* ---------- TIMELINE ---------- */
let semestreFiltro = "todos";
function renderTimeline() {
  const track = $("#timelineTrack");
  const todos = el("div", "timeline__item active", `<div class="timeline__year">Todos</div><div class="timeline__nota">Ver todo</div>`);
  todos.dataset.sem = "todos";
  track.appendChild(todos);

  SEMESTRES.forEach(s => {
    const item = el("div", "timeline__item", `<div class="timeline__year">${s.etiqueta}</div><div class="timeline__nota">${s.nota}</div>`);
    item.dataset.sem = s.id;
    track.appendChild(item);
  });

  track.addEventListener("click", (e) => {
    const item = e.target.closest(".timeline__item");
    if (!item) return;
    $$(".timeline__item", track).forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    semestreFiltro = item.dataset.sem;
    renderProyectos();
    document.getElementById("proyectos").scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------- PROYECTOS ---------- */
let estadoFiltro = "todos";
let categoriaFiltro = "todos";
let lineaFiltro = "todos";
function linkButtons(proyecto) {
  const wrap = el("div", "card__actions");
  const enlaces = proyecto.enlaces || {};
  // Botones estándar
  Object.keys(LINK_META).filter(k => k in enlaces).forEach(k => {
    const url = enlaces[k];
    const meta = LINK_META[k];
    if (url) {
      const a = el("a", "linkbtn", `${meta.icono} ${meta.texto}`);
      a.href = url; a.target = "_blank"; a.rel = "noopener";
      wrap.appendChild(a);
    } else {
      const b = el("span", "linkbtn linkbtn--off", `${meta.icono} ${meta.texto}`);
      b.title = "Enlace pendiente por agregar en data.js";
      wrap.appendChild(b);
    }
  });
  // Botones personalizados (extras)
  (proyecto.extras || []).forEach(x => {
    if (!x.url) return;
    const a = el("a", "linkbtn", `${x.icono || "🔗"} ${x.texto}`);
    a.href = x.url;
    if (!x.url.startsWith("#")) { a.target = "_blank"; a.rel = "noopener"; }
    wrap.appendChild(a);
  });
  return wrap;
}

function renderProyectos() {
  const grid = $("#proyectosGrid");
  grid.innerHTML = "";
  const lista = PROYECTOS.filter(p =>
    (estadoFiltro === "todos" || p.estado === estadoFiltro) &&
    (semestreFiltro === "todos" || p.semestre === semestreFiltro) &&
    (categoriaFiltro === "todos" || (p.linea && LINEAS[p.linea]?.categoria === categoriaFiltro)) &&
    (lineaFiltro === "todos" || p.linea === lineaFiltro)
  );

  if (!lista.length) {
    grid.appendChild(el("p", null, "<em>No hay proyectos con este filtro.</em>"));
    return;
  }

  lista.forEach(p => {
    const card = el("article", "card proj");
    const entregables = (p.entregables || []).map(x => `<li>${x}</li>`).join("");
    card.innerHTML = `
      <div class="proj__top">
        <div class="proj__icono">${p.icono || "📦"}</div>
        <div>
          <div class="proj__nombre">${p.nombre}</div>
          <span class="proj__estado estado--${p.estado}">${ESTADO_LABEL[p.estado] || p.estado}</span>
        </div>
      </div>
      <p class="proj__enc"><b>Encargado:</b> ${(p.encargados || []).join(", ") || "—"}</p>
      <p class="proj__desc">${p.descripcion}</p>
      <ul class="proj__entregables">${entregables}</ul>
    `;
    card.appendChild(linkButtons(p));
    grid.appendChild(card);
  });
  observeReveal();
}

function initFiltros() {
  $("#filtrosEstado").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip", $("#filtrosEstado")).forEach(c => c.classList.remove("chip--active"));
    chip.classList.add("chip--active");
    estadoFiltro = chip.dataset.estado;
    renderProyectos();
  });

  $("#filtrosCategoria").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip", $("#filtrosCategoria")).forEach(c => c.classList.remove("chip--active"));
    chip.classList.add("chip--active");
    categoriaFiltro = chip.dataset.categoria;
    lineaFiltro = "todos";
    actualizarSelectLinea();
    renderProyectos();
  });

  $("#filtroLinea").addEventListener("change", (e) => {
    lineaFiltro = e.target.value;
    renderProyectos();
  });
}

function actualizarSelectLinea() {
  const select = $("#filtroLinea");
  if (categoriaFiltro === "todos") {
    select.hidden = true;
    return;
  }
  const siglasEnUso = new Set(
    PROYECTOS.filter(p => p.linea && LINEAS[p.linea]?.categoria === categoriaFiltro).map(p => p.linea)
  );
  const opciones = [...siglasEnUso].sort((a, b) => LINEAS[a].nombre.localeCompare(LINEAS[b].nombre));
  select.innerHTML = `<option value="todos">Todas las líneas</option>` +
    opciones.map(sigla => `<option value="${sigla}">${LINEAS[sigla].nombre}</option>`).join("");
  select.hidden = opciones.length === 0;
}

/* ---------- NUEVA PLANTILLA ARTICULATE 360 (comparador antes/después) ---- */
function renderPlantillaArticulate() {
  const puntos = $("#plantillaPuntos");
  puntos.innerHTML = PLANTILLA_ARTICULATE.puntos.map(p => `<li>${p}</li>`).join("");

  renderCompareSlider("compareSlider", "compareBefore", "compareAfter", "compareHandle", PLANTILLA_ARTICULATE);
  renderCompareSlider("compareSlider2", "compareBefore2", "compareAfter2", "compareHandle2", COMPARATIVA_2);
  renderCompareSlider("compareSlider3", "compareBefore3", "compareAfter3", "compareHandle3", COMPARATIVA_3);
}

function renderCompareSlider(wrapId, beforeId, afterId, handleId, data) {
  $(`#${beforeId}`).src = data.antes || "";
  $(`#${afterId}`).src = data.despues || "";
  initCompareSlider(wrapId, beforeId, handleId);
}

function initCompareSlider(wrapId, beforeId, handleId) {
  const wrap = $(`#${wrapId}`), before = $(`#${beforeId}`), handle = $(`#${handleId}`);
  let dragging = false;

  function applyPercent(pct) {
    before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = `${pct}%`;
  }
  function setPercent(clientX) {
    const rect = wrap.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    applyPercent(pct);
  }

  applyPercent(100); // la imagen "antes" se muestra al 100% por defecto

  wrap.addEventListener("pointerdown", (e) => { dragging = true; wrap.setPointerCapture(e.pointerId); setPercent(e.clientX); });
  wrap.addEventListener("pointermove", (e) => { if (dragging) setPercent(e.clientX); });
  wrap.addEventListener("pointerup", () => { dragging = false; });
  wrap.addEventListener("pointerleave", () => { dragging = false; });
}

/* ---------- GUÍA DE VIRTUALIZACIÓN ---------- */
function renderGuiaVirtualizacion() {
  const flujo = $("#flujoGrid");
  flujo.innerHTML = FLUJO_VIRTUALIZACION.map((paso, i) => `
    <div class="flujo__paso">
      <div class="flujo__numero">${i + 1}</div>
      <div class="flujo__icono">${paso.icono}</div>
      <div class="flujo__nombre">${paso.nombre}</div>
      <p class="flujo__desc">${paso.desc}</p>
    </div>
  `).join("");

  const roles = $("#rolesGrid");
  roles.innerHTML = ROLES_VIRTUALIZACION.map(r => `
    <div class="card rol">
      <div class="rol__icono">${r.icono}</div>
      <div class="rol__nombre">${r.nombre}</div>
      <p class="rol__desc">${r.desc}</p>
    </div>
  `).join("");

  const practicas = $("#practicasVGrid");
  practicas.innerHTML = PRACTICAS_VIRTUALIZACION.map(p => `
    <div class="card practicav">
      <div class="practicav__icono">${p.icono}</div>
      <div class="practicav__nombre">${p.nombre}</div>
      <p class="practicav__desc">${p.desc}</p>
    </div>
  `).join("");

  const glosario = $("#glosarioGrid");
  glosario.innerHTML = GLOSARIO_VIRTUALIZACION.map(g => `
    <div class="glosario__item">
      <div class="glosario__termino">${g.termino}</div>
      <p class="glosario__desc">${g.desc}</p>
    </div>
  `).join("");
}

/* ---------- GENIALLY ---------- */
function renderGenially() {
  $("#geniallyIntro").textContent = GENIALLY.intro;

  const enl = $("#geniallyEnlaces");
  if (GENIALLY.enlaces.manual) {
    const a = el("a", "btn btn--ghost", "📘 Ver manual completo");
    a.href = GENIALLY.enlaces.manual; a.target = "_blank"; a.rel = "noopener";
    enl.appendChild(a);
  }
  const g = el("a", "btn btn--primary", "✨ Abrir Genially");
  g.href = GENIALLY.enlaces.genially || "https://genial.ly/"; g.target = "_blank"; g.rel = "noopener";
  enl.appendChild(g);

  const tipos = $("#geniallyTipos");
  GENIALLY.tiposDiseno.forEach(t => {
    tipos.appendChild(el("div", "tipo",
      `<div class="tipo__cat">${t.categoria}</div>
       <div class="tipo__tipos">${t.tipos}</div>
       <div class="tipo__uso">${t.uso}</div>`));
  });

  const prac = $("#geniallyPracticas");
  GENIALLY.buenasPracticas.forEach(b => {
    prac.appendChild(el("div", "card practica",
      `<h4>${b.fase}</h4><ul>${b.items.map(x => `<li>${x}</li>`).join("")}</ul>`));
  });

  // Recursos ya creados en Genially
  const rec = $("#geniallyRecursos");
  (GENIALLY.recursos || []).forEach(r => {
    const card = el("div", "tipo tipo--recurso");
    card.innerHTML =
      `<div class="recurso__head">
         <span class="recurso__icono">${r.icono || "✨"}</span>
         <div class="tipo__cat">${r.nombre}</div>
       </div>
       <div class="tipo__uso">${r.desc}</div>`;
    const a = el("a", "linkbtn", "✨ Ver recurso");
    a.href = r.url; a.target = "_blank"; a.rel = "noopener";
    const act = el("div", "card__actions"); act.appendChild(a);
    card.appendChild(act);
    rec.appendChild(card);
  });
}

/* ---------- HERRAMIENTAS ---------- */
function renderHerramientas() {
  const grid = $("#herramientasGrid");
  HERRAMIENTAS.forEach(h => {
    const card = el("article", "card tool");
    let apps = "";
    h.apps.forEach(a => {
      apps += `<div class="tool__app">
        <a href="${a.url}" target="_blank" rel="noopener">${a.nombre} ↗</a>
        <span>${a.nota}</span></div>`;
    });
    card.innerHTML = `
      <div class="tool__head"><span class="tool__icono">${h.icono}</span>
      <span class="tool__tarea">${h.tarea}</span></div>${apps}`;
    grid.appendChild(card);
  });
}

/* ---------- RECURSOS (galerías) ---------- */
function galItem(item, opts = {}) {
  const g = el("div", "gal");
  const mediaCls = opts.fondo === "oscuro" ? "gal__media gal__media--oscuro" : "gal__media";
  let media;
  if (opts.tipo === "video") {
    media = `<video src="${item.archivo}" autoplay loop muted playsinline></video>`;
  } else {
    media = `<img src="${item.archivo}" alt="${item.nombre}" loading="lazy">`;
  }
  g.innerHTML = `
    <div class="${mediaCls}">${media}</div>
    <div class="gal__foot">
      <span class="gal__nombre">${item.nombre}</span>
      <a class="gal__dl" href="${item.archivo}" download title="Descargar">⬇</a>
    </div>`;
  return g;
}

function renderRecursos() {
  const logos = $("#logosGrid");
  LOGOS.forEach(l => logos.appendChild(galItem(l, { fondo: l.fondo })));

  const uif = $("#uifcitoGrid");
  UIFCITO_ESTADOS.forEach(u => uif.appendChild(galItem(u)));

  const anim = $("#uifcitoAnimGrid");
  UIFCITO_ANIMADOS.forEach(a => anim.appendChild(galItem(a, { tipo: a.tipo })));

  // Tipografía institucional
  const fw = $("#fuentesWrap");
  const card = el("div", "card fuentes");
  const items = FUENTES.familias.map(f => `<li>${f}</li>`).join("");
  card.innerHTML = `
    <div class="fuentes__grid">
      <div>
        <div class="fuentes__titulo">Tipografía Ancizar</div>
        <ul class="fuentes__lista">${items}</ul>
      </div>
      <div class="fuentes__preview" aria-hidden="true">
        <span class="fuentes__aa">Aa</span>
        <span class="fuentes__demo">Ancizar</span>
      </div>
    </div>
    <div class="card__actions">
      <a class="linkbtn" href="${FUENTES.descarga}" target="_blank" rel="noopener">⬇ Descargar tipografía (UNAL)</a>
    </div>`;
  fw.appendChild(card);

  // Paleta
  const pal = $("#paletaGrid");
  PALETA.forEach(c => {
    const s = el("div", "swatch",
      `<div class="swatch__color" style="background:${c.hex}" title="Clic para copiar ${c.hex}"></div>
       <div class="swatch__nombre">${c.nombre}</div>
       <div class="swatch__hex">${c.hex}</div>
       ${c.rgb  ? `<div class="swatch__val">${c.rgb}</div>`  : ""}
       ${c.cmyk ? `<div class="swatch__val">${c.cmyk}</div>` : ""}`);
    s.querySelector(".swatch__color").addEventListener("click", () => {
      navigator.clipboard?.writeText(c.hex);
      const n = s.querySelector(".swatch__hex");
      const orig = n.textContent; n.textContent = "¡Copiado!";
      setTimeout(() => n.textContent = orig, 1200);
    });
    pal.appendChild(s);
  });
}

/* ---------- GUÍAS ---------- */
function renderGuias() {
  const grid = $("#guiasGrid");
  GUIAS.forEach(g => {
    const card = el("article", "card guia");
    const boton = g.url
      ? `<a class="linkbtn" href="${g.url}" target="_blank" rel="noopener">Abrir ↗</a>`
      : `<span class="linkbtn linkbtn--off" title="Enlace pendiente por agregar en data.js">Enlace pendiente</span>`;
    card.innerHTML = `
      <div class="guia__icono">${g.icono}</div>
      <div class="guia__nombre">${g.nombre}</div>
      <div class="guia__desc">${g.desc}</div>
      <div class="card__actions">${boton}</div>`;
    grid.appendChild(card);
  });
}

/* ---------- ORGANIZACIÓN DE CARPETAS (mapa visual, acordeón) -------------- */
function renderCarpetaItem(item) {
  if (item.subcarpetas) {
    return `
      <li class="carpeta__item carpeta__item--expandible">
        <button class="carpeta__toggle" type="button">
          <span class="carpeta__itemNombre">📁 ${item.nombre}</span>
          <span class="carpeta__caret">▸</span>
        </button>
        <p class="carpeta__itemDesc">${item.descripcion}</p>
        <ul class="carpeta__sublist carpeta__sublist--nested">
          ${item.subcarpetas.map(renderCarpetaItem).join("")}
        </ul>
      </li>`;
  }
  return `
    <li class="carpeta__item">
      <div class="carpeta__itemNombre">📁 ${item.nombre}</div>
      <p class="carpeta__itemDesc">${item.descripcion}</p>
    </li>`;
}

function renderCarpetas() {
  const raiz = $("#carpetasRaiz");
  raiz.innerHTML = `
    <div class="carpetas__raizTitulo">📁 ${CARPETAS_RAIZ}/</div>
    <a class="linkbtn" href="${CARPETAS_DRIVE_URL}" target="_blank" rel="noopener">Abrir en Drive ↗</a>`;

  const grid = $("#carpetasGrid");
  grid.innerHTML = ESTRUCTURA_CARPETAS.map(carpeta => `
    <div class="carpeta card">
      <button class="carpeta__header" type="button">
        <span class="carpeta__icono">${carpeta.icono}</span>
        <span class="carpeta__nombre">${carpeta.nombre}</span>
        <span class="carpeta__caret">▾</span>
      </button>
      <div class="carpeta__body">
        <p class="carpeta__objetivo">${carpeta.objetivo}</p>
        ${carpeta.subcarpetas.length ? `<ul class="carpeta__sublist">${carpeta.subcarpetas.map(renderCarpetaItem).join("")}</ul>` : ""}
      </div>
    </div>
  `).join("");

  $$(".carpeta__header", grid).forEach(btn => {
    btn.addEventListener("click", () => btn.closest(".carpeta").classList.toggle("carpeta--open"));
  });
  $$(".carpeta__toggle", grid).forEach(btn => {
    btn.addEventListener("click", () => btn.closest(".carpeta__item").classList.toggle("carpeta__item--open"));
  });
}

/* ---------- NAV móvil + volver arriba + reveal ---------- */
function initNav() {
  const toggle = $("#navToggle"), links = $("#navLinks");
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("open"); });

  const toTop = $("#toTop");
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });
}

/* ---------- Animaciones de aparición (librería Motion) --------------------
   Se activan cada vez que el usuario ve el elemento (no solo la primera vez):
   al entrar en pantalla aparece con un leve desplazamiento, al salir se
   reinicia para poder repetirse la próxima vez que vuelva a la vista.
   --------------------------------------------------------------------------- */
const REVEAL_SELECTOR = [
  ".section__head", ".hero__content", ".hero__mascot",
  ".card", ".proj", ".tool", ".guia", ".rol", ".practicav", ".carpeta",
  ".modalcard", ".orgchart__area", ".flujo__paso", ".glosario__item",
  ".timeline__item", ".tipo",
].join(", ");

function observeReveal(root = document) {
  if (!window.Motion) return;
  const { inView, animate } = window.Motion;
  const targets = $$(REVEAL_SELECTOR, root).filter(n => !n.dataset.motionBound);
  if (!targets.length) return;
  targets.forEach(n => { n.dataset.motionBound = "1"; });
  inView(targets, (el) => {
    animate(el, { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0)"] },
      { duration: 0.5, easing: [0.22, 1, 0.36, 1] });
    return (leave) => {
      animate(leave.target, { opacity: 0, transform: "translateY(18px)" }, { duration: 0.01 });
    };
  }, { margin: "-10% 0px -10% 0px" });
}

/* ---------- SPLASH CURSOR (fluido WebGL siguiendo el mouse) ----------------
   Puerto en JavaScript puro del componente SplashCursor de React Bits.
   -------------------------------------------------------------------------- */
function initSplashCursor(opts = {}) {
  const {
    SIM_RESOLUTION = 128,
    DYE_RESOLUTION = 1440,
    CAPTURE_RESOLUTION = 512,
    DENSITY_DISSIPATION = 3.5,
    VELOCITY_DISSIPATION = 2,
    PRESSURE = 0.1,
    PRESSURE_ITERATIONS = 20,
    CURL = 3,
    SPLAT_RADIUS = 0.2,
    SPLAT_FORCE = 6000,
    SHADING = true,
    COLOR_UPDATE_SPEED = 10,
    BACK_COLOR = { r: 0.5, g: 0, b: 0 },
    TRANSPARENT = true,
    RAINBOW_MODE = false,
    COLOR = "#2F7EF5",
  } = opts;

  // Solo con puntero fino (mouse); se omite en táctil para no afectar el rendimiento móvil.
  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;

  const wrapEl = el("div");
  wrapEl.style.cssText = "position:fixed;top:0;left:0;z-index:9998;pointer-events:none;width:100%;height:100%;";
  const canvas = el("canvas");
  canvas.style.cssText = "width:100vw;height:100vh;display:block;";
  wrapEl.appendChild(canvas);
  document.body.appendChild(wrapEl);

  function pointerPrototype() {
    this.id = -1;
    this.texcoordX = 0;
    this.texcoordY = 0;
    this.prevTexcoordX = 0;
    this.prevTexcoordY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.down = false;
    this.moved = false;
    this.color = [0, 0, 0];
  }

  let config = {
    SIM_RESOLUTION, DYE_RESOLUTION, CAPTURE_RESOLUTION, DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION, PRESSURE, PRESSURE_ITERATIONS, CURL, SPLAT_RADIUS,
    SPLAT_FORCE, SHADING, COLOR_UPDATE_SPEED, PAUSED: false, BACK_COLOR,
    TRANSPARENT, RAINBOW_MODE, COLOR,
  };

  let pointers = [new pointerPrototype()];

  const { gl, ext } = getWebGLContext(canvas);
  if (!ext.supportLinearFiltering) {
    config.DYE_RESOLUTION = 256;
    config.SHADING = false;
  }

  function getWebGLContext(canvas) {
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    let gl = canvas.getContext("webgl2", params);
    const isWebGL2 = !!gl;
    if (!isWebGL2) gl = canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params);

    let halfFloat;
    let supportLinearFiltering;
    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
    } else {
      halfFloat = gl.getExtension("OES_texture_half_float");
      supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat && halfFloat.HALF_FLOAT_OES;
    let formatRGBA, formatRG, formatR;

    if (isWebGL2) {
      formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    } else {
      formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
  }

  function getSupportedFormat(gl, internalFormat, format, type) {
    if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
      switch (internalFormat) {
        case gl.R16F: return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
        case gl.RG16F: return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
        default: return null;
      }
    }
    return { internalFormat, format };
  }

  function supportRenderTextureFormat(gl, internalFormat, format, type) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    return status === gl.FRAMEBUFFER_COMPLETE;
  }

  class Material {
    constructor(vertexShader, fragmentShaderSource) {
      this.vertexShader = vertexShader;
      this.fragmentShaderSource = fragmentShaderSource;
      this.programs = [];
      this.activeProgram = null;
      this.uniforms = [];
    }
    setKeywords(keywords) {
      let hash = 0;
      for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
      let program = this.programs[hash];
      if (program == null) {
        let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
        program = createProgram(this.vertexShader, fragmentShader);
        this.programs[hash] = program;
      }
      if (program === this.activeProgram) return;
      this.uniforms = getUniforms(program);
      this.activeProgram = program;
    }
    bind() { gl.useProgram(this.activeProgram); }
  }

  class Program {
    constructor(vertexShader, fragmentShader) {
      this.uniforms = {};
      this.program = createProgram(vertexShader, fragmentShader);
      this.uniforms = getUniforms(this.program);
    }
    bind() { gl.useProgram(this.program); }
  }

  function createProgram(vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.trace(gl.getProgramInfoLog(program));
    return program;
  }

  function getUniforms(program) {
    let uniforms = [];
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      let uniformName = gl.getActiveUniform(program, i).name;
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
  }

  function compileShader(type, source, keywords) {
    source = addKeywords(source, keywords);
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.trace(gl.getShaderInfoLog(shader));
    return shader;
  }

  function addKeywords(source, keywords) {
    if (!keywords) return source;
    let keywordsString = "";
    keywords.forEach(keyword => { keywordsString += "#define " + keyword + "\n"; });
    return keywordsString + source;
  }

  const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `);

  const copyShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
  `);

  const clearShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
  `);

  const displayShaderSource = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        #ifdef SHADING
            vec3 lc = texture2D(uTexture, vL).rgb;
            vec3 rc = texture2D(uTexture, vR).rgb;
            vec3 tc = texture2D(uTexture, vT).rgb;
            vec3 bc = texture2D(uTexture, vB).rgb;

            float dx = length(rc) - length(lc);
            float dy = length(tc) - length(bc);

            vec3 n = normalize(vec3(dx, dy, length(texelSize)));
            vec3 l = vec3(0.0, 0.0, 1.0);

            float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
            c *= diffuse;
        #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
  `;

  const splatShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
  `);

  const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
        #ifdef MANUAL_FILTERING
            vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
            vec4 result = bilerp(uSource, coord, dyeTexelSize);
        #else
            vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
            vec4 result = texture2D(uSource, coord);
        #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }
  `, ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]);

  const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
  `);

  const curlShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
  `);

  const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `);

  const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
  `);

  const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `);

  const blit = (() => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    return (target, clear = false) => {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (clear) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  })();

  let dye, velocity, divergence, curl, pressure;

  const copyProgram = new Program(baseVertexShader, copyShader);
  const clearProgram = new Program(baseVertexShader, clearShader);
  const splatProgram = new Program(baseVertexShader, splatShader);
  const advectionProgram = new Program(baseVertexShader, advectionShader);
  const divergenceProgram = new Program(baseVertexShader, divergenceShader);
  const curlProgram = new Program(baseVertexShader, curlShader);
  const vorticityProgram = new Program(baseVertexShader, vorticityShader);
  const pressureProgram = new Program(baseVertexShader, pressureShader);
  const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
  const displayMaterial = new Material(baseVertexShader, displayShaderSource);

  function initFramebuffers() {
    let simRes = getResolution(config.SIM_RESOLUTION);
    let dyeRes = getResolution(config.DYE_RESOLUTION);
    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
    gl.disable(gl.BLEND);

    if (!dye) dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
    else dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

    if (!velocity) velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
    else velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

    divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
  }

  function createFBO(w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0);
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let texelSizeX = 1.0 / w;
    let texelSizeY = 1.0 / h;
    return {
      texture, fbo, width: w, height: h, texelSizeX, texelSizeY,
      attach(id) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      },
    };
  }

  function createDoubleFBO(w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);
    return {
      width: w, height: h, texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY,
      get read() { return fbo1; },
      set read(value) { fbo1 = value; },
      get write() { return fbo2; },
      set write(value) { fbo2 = value; },
      swap() { let temp = fbo1; fbo1 = fbo2; fbo2 = temp; },
    };
  }

  function resizeFBO(target, w, h, internalFormat, format, type, param) {
    let newFBO = createFBO(w, h, internalFormat, format, type, param);
    copyProgram.bind();
    gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
    blit(newFBO);
    return newFBO;
  }

  function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
    if (target.width === w && target.height === h) return target;
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
    target.write = createFBO(w, h, internalFormat, format, type, param);
    target.width = w;
    target.height = h;
    target.texelSizeX = 1.0 / w;
    target.texelSizeY = 1.0 / h;
    return target;
  }

  function updateKeywords() {
    let displayKeywords = [];
    if (config.SHADING) displayKeywords.push("SHADING");
    displayMaterial.setKeywords(displayKeywords);
  }

  updateKeywords();
  initFramebuffers();
  let lastUpdateTime = Date.now();
  let colorUpdateTimer = 0.0;

  function updateFrame() {
    const dt = calcDeltaTime();
    if (resizeCanvas()) initFramebuffers();
    updateColors(dt);
    applyInputs();
    step(dt);
    render(null);
    requestAnimationFrame(updateFrame);
  }

  function calcDeltaTime() {
    let now = Date.now();
    let dt = (now - lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016666);
    lastUpdateTime = now;
    return dt;
  }

  function resizeCanvas() {
    let width = scaleByPixelRatio(canvas.clientWidth);
    let height = scaleByPixelRatio(canvas.clientHeight);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  function updateColors(dt) {
    colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
    if (colorUpdateTimer >= 1) {
      colorUpdateTimer = wrapValue(colorUpdateTimer, 0, 1);
      pointers.forEach(p => { p.color = generateColor(); });
    }
  }

  function applyInputs() {
    pointers.forEach(p => {
      if (p.moved) {
        p.moved = false;
        splatPointer(p);
      }
    });
  }

  function step(dt) {
    gl.disable(gl.BLEND);
    curlProgram.bind();
    gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(curl);

    vorticityProgram.bind();
    gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write);
    velocity.swap();

    divergenceProgram.bind();
    gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence);

    clearProgram.bind();
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
    blit(pressure.write);
    pressure.swap();

    pressureProgram.bind();
    gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
      gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
      blit(pressure.write);
      pressure.swap();
    }

    gradienSubtractProgram.bind();
    gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    advectionProgram.bind();
    gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    if (!ext.supportLinearFiltering)
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
    let velocityId = velocity.read.attach(0);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
    blit(velocity.write);
    velocity.swap();

    if (!ext.supportLinearFiltering)
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
    blit(dye.write);
    dye.swap();
  }

  function render(target) {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    drawDisplay(target);
  }

  function drawDisplay(target) {
    let width = target == null ? gl.drawingBufferWidth : target.width;
    let height = target == null ? gl.drawingBufferHeight : target.height;
    displayMaterial.bind();
    if (config.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
    gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
    blit(target);
  }

  function splatPointer(pointer) {
    let dx = pointer.deltaX * config.SPLAT_FORCE;
    let dy = pointer.deltaY * config.SPLAT_FORCE;
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
  }

  function clickSplat(pointer) {
    const color = generateColor();
    color.r *= 10.0;
    color.g *= 10.0;
    color.b *= 10.0;
    let dx = 10 * (Math.random() - 0.5);
    let dy = 30 * (Math.random() - 0.5);
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
  }

  function splat(x, y, dx, dy, color) {
    splatProgram.bind();
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.uniforms.point, x, y);
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();
  }

  function correctRadius(radius) {
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1) radius *= aspectRatio;
    return radius;
  }

  function updatePointerDownData(pointer, id, posX, posY) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.color = generateColor();
  }

  function updatePointerMoveData(pointer, posX, posY, color) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    pointer.color = color;
  }

  function updatePointerUpData(pointer) {
    pointer.down = false;
  }

  function correctDeltaX(delta) {
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio < 1) delta *= aspectRatio;
    return delta;
  }

  function correctDeltaY(delta) {
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1) delta /= aspectRatio;
    return delta;
  }

  function hexToRGB(hex) {
    let val = hex.replace("#", "");
    if (val.length === 3) val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
    const r = parseInt(val.slice(0, 2), 16) / 255;
    const g = parseInt(val.slice(2, 4), 16) / 255;
    const b = parseInt(val.slice(4, 6), 16) / 255;
    return { r: r * 0.15, g: g * 0.15, b: b * 0.15 };
  }

  function generateColor() {
    if (!config.RAINBOW_MODE) return hexToRGB(config.COLOR);
    let c = HSVtoRGB(Math.random(), 1.0, 1.0);
    c.r *= 0.15;
    c.g *= 0.15;
    c.b *= 0.15;
    return c;
  }

  function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
      default: break;
    }
    return { r, g, b };
  }

  function wrapValue(value, min, max) {
    const range = max - min;
    if (range === 0) return min;
    return ((value - min) % range) + min;
  }

  function getResolution(resolution) {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
    const min = Math.round(resolution);
    const max = Math.round(resolution * aspectRatio);
    if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
    else return { width: min, height: max };
  }

  function scaleByPixelRatio(input) {
    const pixelRatio = window.devicePixelRatio || 1;
    return Math.floor(input * pixelRatio);
  }

  function hashCode(s) {
    if (s.length === 0) return 0;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  function handleMouseDown(e) {
    let pointer = pointers[0];
    let posX = scaleByPixelRatio(e.clientX);
    let posY = scaleByPixelRatio(e.clientY);
    updatePointerDownData(pointer, -1, posX, posY);
    clickSplat(pointer);
  }

  let firstMouseMoveHandled = false;
  function handleMouseMove(e) {
    let pointer = pointers[0];
    let posX = scaleByPixelRatio(e.clientX);
    let posY = scaleByPixelRatio(e.clientY);
    if (!firstMouseMoveHandled) {
      let color = generateColor();
      updatePointerMoveData(pointer, posX, posY, color);
      firstMouseMoveHandled = true;
    } else {
      updatePointerMoveData(pointer, posX, posY, pointer.color);
    }
  }

  function handleTouchStart(e) {
    const touches = e.targetTouches;
    let pointer = pointers[0];
    for (let i = 0; i < touches.length; i++) {
      let posX = scaleByPixelRatio(touches[i].clientX);
      let posY = scaleByPixelRatio(touches[i].clientY);
      updatePointerDownData(pointer, touches[i].identifier, posX, posY);
    }
  }

  function handleTouchMove(e) {
    const touches = e.targetTouches;
    let pointer = pointers[0];
    for (let i = 0; i < touches.length; i++) {
      let posX = scaleByPixelRatio(touches[i].clientX);
      let posY = scaleByPixelRatio(touches[i].clientY);
      updatePointerMoveData(pointer, posX, posY, pointer.color);
    }
  }

  function handleTouchEnd(e) {
    const touches = e.changedTouches;
    let pointer = pointers[0];
    for (let i = 0; i < touches.length; i++) updatePointerUpData(pointer);
  }

  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", handleTouchMove, false);
  window.addEventListener("touchend", handleTouchEnd);

  updateFrame();
}

/* ---------- LOGO LOOP (herramientas recomendadas) ------------------------
   Puerto en JavaScript puro del componente LogoLoop de React Bits.
   Solo variante horizontal (izquierda), que es lo que necesita este sitio.
   --------------------------------------------------------------------------- */
function initLogoLoop(container, items, opts = {}) {
  const { speed = 60, gap = 40, hoverSpeed = 0, ariaLabel = "Herramientas e IA recomendadas" } = opts;
  const MIN_COPIES = 2, COPY_HEADROOM = 2, SMOOTH_TAU = 0.25;

  container.setAttribute("role", "region");
  container.setAttribute("aria-label", ariaLabel);
  container.style.setProperty("--logoloop-gap", gap + "px");

  const track = el("div", "logoloop__track");
  container.appendChild(track);

  function buildList(hidden) {
    const list = el("ul", "logoloop__list");
    list.setAttribute("role", "list");
    if (hidden) list.setAttribute("aria-hidden", "true");
    items.forEach(item => {
      const li = el("li", "logoloop__item");
      li.setAttribute("role", "listitem");
      const img = el("img");
      img.src = item.archivo; img.alt = item.nombre; img.loading = "lazy"; img.draggable = false;
      if (item.url) {
        const a = el("a", "logoloop__link");
        a.href = item.url; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", item.nombre);
        a.appendChild(img);
        li.appendChild(a);
      } else {
        img.setAttribute("aria-label", item.nombre);
        li.appendChild(img);
      }
      list.appendChild(li);
    });
    return list;
  }

  const seqEl = buildList(false);
  track.appendChild(seqEl);

  let seqWidth = 0, copyCount = MIN_COPIES;
  let offset = 0, velocity = 0, lastTs = null, hovered = false;
  const targetVelocity = Math.abs(speed);

  function updateDimensions() {
    const rect = seqEl.getBoundingClientRect();
    seqWidth = Math.ceil(rect.width);
    if (seqWidth === 0) return;
    const containerWidth = container.clientWidth;
    const copiesNeeded = Math.ceil(containerWidth / seqWidth) + COPY_HEADROOM;
    const needed = Math.max(MIN_COPIES, copiesNeeded);
    if (needed !== copyCount) {
      copyCount = needed;
      track.querySelectorAll(".logoloop__list[data-extra]").forEach(n => n.remove());
      for (let i = 1; i < copyCount; i++) {
        const extra = buildList(true);
        extra.setAttribute("data-extra", "1");
        track.appendChild(extra);
      }
    }
  }

  if (window.ResizeObserver) {
    const ro = new ResizeObserver(updateDimensions);
    ro.observe(container);
    ro.observe(seqEl);
  } else {
    window.addEventListener("resize", updateDimensions);
  }
  updateDimensions();

  container.addEventListener("mouseenter", () => { hovered = true; });
  container.addEventListener("mouseleave", () => { hovered = false; });

  function animate(ts) {
    if (lastTs === null) lastTs = ts;
    const dt = Math.max(0, ts - lastTs) / 1000;
    lastTs = ts;
    const target = hovered ? hoverSpeed : targetVelocity;
    const easing = 1 - Math.exp(-dt / SMOOTH_TAU);
    velocity += (target - velocity) * easing;
    if (seqWidth > 0) {
      offset = ((offset + velocity * dt) % seqWidth + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function renderLogoLoop() {
  const wrap = $("#logoLoop");
  wrap.classList.add("logoloop--fade", "logoloop--scale-hover");
  initLogoLoop(wrap, LOGO_LOOP);
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderRolArea();
  renderIntroCards();
  initModal();
  renderTimeline();
  initFiltros();
  renderProyectos();
  renderGuiaVirtualizacion();
  renderGenially();
  renderPlantillaArticulate();
  renderHerramientas();
  renderRecursos();
  renderGuias();
  renderCarpetas();
  renderLogoLoop();
  initNav();
  observeReveal();
  initSplashCursor();
});
