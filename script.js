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
  $("#heroDesc").textContent     = AREA.descripcionHero;

  const info = $("#footerInfo");
  let html = `<strong>${CONTACTO.unidad}</strong><br>${CONTACTO.sede}`;
  if (CONTACTO.correo) html += `<br><a href="mailto:${CONTACTO.correo}">${CONTACTO.correo}</a>`;
  if (CONTACTO.drive)  html += `<br><a href="${CONTACTO.drive}" target="_blank" rel="noopener">Carpeta de Drive del área</a>`;
  info.innerHTML = html;
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
    a.href = x.url; a.target = "_blank"; a.rel = "noopener";
    wrap.appendChild(a);
  });
  return wrap;
}

function renderProyectos() {
  const grid = $("#proyectosGrid");
  grid.innerHTML = "";
  const lista = PROYECTOS.filter(p =>
    (estadoFiltro === "todos" || p.estado === estadoFiltro) &&
    (semestreFiltro === "todos" || p.semestre === semestreFiltro)
  );

  if (!lista.length) {
    grid.appendChild(el("p", null, "<em>No hay proyectos con este filtro.</em>"));
    return;
  }

  lista.forEach(p => {
    const card = el("article", "card proj reveal");
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

  const inter = $("#geniallyInteract");
  GENIALLY.interactividad.forEach(i =>
    inter.appendChild(el("li", null, `<b>${i.nombre}:</b> ${i.desc}`)));

  const tec = GENIALLY.tecnicaClave;
  $("#geniallyTecnica").innerHTML =
    `<div class="tecnica__titulo">🔑 ${tec.titulo}</div>
     <p class="tecnica__desc">${tec.desc}</p>
     <ol class="tecnica__pasos">${tec.pasos.map(p => `<li>${p}</li>`).join("")}</ol>`;

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
    const card = el("article", "card tool reveal");
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
    const card = el("article", "card guia reveal");
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

let revealObserver;
function observeReveal() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); revealObserver.unobserve(en.target); } });
    }, { threshold: 0.12 });
  }
  $$(".reveal:not(.in)").forEach(n => revealObserver.observe(n));
}

/* ---------- TEXT CURSOR (rastro de emoji siguiendo el mouse) ----------------
   Port en JavaScript puro del componente TextCursor de React Bits.
   Mismos parámetros: text, spacing, followMouseDirection, randomFloat,
   exitDuration, removalInterval, maxPoints.
   --------------------------------------------------------------------------- */
function initTextCursor(opts = {}) {
  const {
    text = "🤖", spacing = 80, followMouseDirection = true, randomFloat = true,
    exitDuration = 0.3, removalInterval = 20, maxPoints = 10,
  } = opts;

  // Solo con puntero fino (mouse); se omite en táctil.
  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;

  const container = el("div", "text-cursor-container");
  document.body.appendChild(container);

  const trail = [];         // { node }
  let last = null;
  let lastMove = Date.now();

  function removeNode(node) {
    node.classList.remove("in");
    setTimeout(() => node.remove(), exitDuration * 1000 + 60);
  }

  function addPoint(x, y, angle) {
    const it = el("div", "text-cursor-item");
    it.textContent = text;
    it.style.left = x + "px";
    it.style.top = y + "px";
    it.style.setProperty("--rot", angle + "deg");
    it.style.setProperty("--exit", exitDuration + "s");
    const inner = el("span", "text-cursor-inner-el", text);
    it.textContent = "";
    it.appendChild(inner);
    if (randomFloat) {
      inner.style.setProperty("--fx", (Math.random() * 10 - 5) + "px");
      inner.style.setProperty("--fy", (Math.random() * 10 - 5) + "px");
      inner.style.setProperty("--fr", (Math.random() * 10 - 5) + "deg");
      inner.style.animationDuration = (1.6 + Math.random()) + "s";
      inner.classList.add("floaty");
    }
    container.appendChild(it);
    requestAnimationFrame(() => it.classList.add("in"));
    trail.push(it);
    while (trail.length > maxPoints) removeNode(trail.shift());
  }

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX, y = e.clientY;
    if (!last) { last = { x, y }; addPoint(x, y, 0); }
    else {
      const dx = x - last.x, dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist >= spacing) {
        const angle = followMouseDirection ? (Math.atan2(dy, dx) * 180) / Math.PI : 0;
        const steps = Math.floor(dist / spacing);
        for (let i = 1; i <= steps; i++) {
          const t = (spacing * i) / dist;
          addPoint(last.x + dx * t, last.y + dy * t, angle);
        }
        last = { x, y };
      }
    }
    lastMove = Date.now();
  }, { passive: true });

  setInterval(() => {
    if (Date.now() - lastMove > 100 && trail.length) removeNode(trail.shift());
  }, removalInterval);
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderTimeline();
  initFiltros();
  renderProyectos();
  renderGenially();
  renderHerramientas();
  renderRecursos();
  renderGuias();
  initNav();
  observeReveal();
  initTextCursor({
    text: "🤖", spacing: 40, followMouseDirection: true, randomFloat: true,
    exitDuration: 0.45, removalInterval: 70, maxPoints: 14,
  });
});
