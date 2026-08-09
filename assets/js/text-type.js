/* ============================================================================
   TEXT-TYPE — efecto de máquina de escribir (adaptado de React Bits a JS puro)
   Uso: createTextType(elemento, { text: [...], typingSpeed, ... })
   ============================================================================ */
(function () {
  function createTextType(el, options) {
    options = options || {};
    var texts = Array.isArray(options.text) ? options.text : [options.text];
    var typingSpeed = options.typingSpeed || 50;
    var initialDelay = options.initialDelay || 0;
    var pauseDuration = options.pauseDuration != null ? options.pauseDuration : 2000;
    var deletingSpeed = options.deletingSpeed || 30;
    var loop = options.loop !== false;
    var showCursor = options.showCursor !== false;
    var cursorCharacter = options.cursorCharacter || "|";
    var textColors = options.textColors || [];
    var onSentenceComplete = options.onSentenceComplete;
    var startOnVisible = !!options.startOnVisible;

    el.classList.add("text-type");
    el.innerHTML =
      '<span class="text-type__content"></span>' +
      (showCursor ? '<span class="text-type__cursor">' + cursorCharacter + "</span>" : "");
    var contentEl = el.querySelector(".text-type__content");

    var textIndex = 0;
    var charIndex = 0;
    var deleting = false;
    var timer = null;
    var started = false;

    function colorForCurrent() {
      return textColors.length ? textColors[textIndex % textColors.length] : "";
    }

    function tick() {
      var current = texts[textIndex];
      contentEl.style.color = colorForCurrent();

      if (!deleting) {
        charIndex++;
        contentEl.textContent = current.slice(0, charIndex);
        if (charIndex < current.length) {
          timer = setTimeout(tick, typingSpeed);
        } else if (!loop && textIndex === texts.length - 1) {
          return;
        } else {
          timer = setTimeout(function () {
            deleting = true;
            tick();
          }, pauseDuration);
        }
      } else {
        charIndex--;
        contentEl.textContent = current.slice(0, charIndex);
        if (charIndex > 0) {
          timer = setTimeout(tick, deletingSpeed);
        } else {
          deleting = false;
          if (onSentenceComplete) onSentenceComplete(current, textIndex);
          textIndex = (textIndex + 1) % texts.length;
          timer = setTimeout(tick, typingSpeed);
        }
      }
    }

    function start() {
      if (started) return;
      started = true;
      timer = setTimeout(tick, initialDelay);
    }

    if (startOnVisible && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      }, { threshold: 0.2 });
      io.observe(el);
    } else {
      start();
    }

    return { stop: function () { clearTimeout(timer); } };
  }

  window.createTextType = createTextType;
})();
