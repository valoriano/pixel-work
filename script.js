document.addEventListener("DOMContentLoaded", () => {

  initMenu();
  initSmoothScroll();
  initScrollReveal();
  initParticles();
  initWhatsAppGenerator();
  initChatUI();
  initChallenge(); // desafio adicional

});

/* ======================================================
   1. MENU MOBILE
====================================================== */

function initMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

/* ======================================================
   2. SCROLL SUAVE
====================================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ======================================================
   3. ANIMAÇÃO DOS CARDS
====================================================== */

function initScrollReveal() {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
}

/* ======================================================
   4. PARTÍCULAS HERO
====================================================== */

function initParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;";
  hero.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const total = 60;

  for (let i = 0; i < total; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 0.4 - 0.2,
      speedY: Math.random() * 0.4 - 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.fillStyle = "#3b82f6";
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ======================================================
   5. GERADOR → WHATSAPP
====================================================== */

function initWhatsAppGenerator() {
  const gerarBtn = document.getElementById("gerar-btn");
  const promptInput = document.getElementById("prompt");

  if (!gerarBtn || !promptInput) return;

  gerarBtn.addEventListener("click", () => {

    const texto = promptInput.value.trim();
    if (!texto) {
      alert("Descreva a imagem que deseja.");
      return;
    }

    const numero = "244943246243"; // teu número
    const mensagem = encodeURIComponent(`Olá PixelWork! Quero gerar esta imagem:\n\n${texto}`);

    window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
  });
}

/* ======================================================
   6. CHAT UI
====================================================== */

function initChatUI() {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  if (!chatMessages || !userInput || !sendBtn) return;

  function addMessage(text, isUser = false) {
    const div = document.createElement("div");
    div.classList.add("message", isUser ? "user" : "bot");
    div.innerHTML = `<div class="message-content">${text}</div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function fakeBotResponse(userText) {
    setTimeout(() => {
      addMessage("Obrigado pela sua mensagem. Em breve um atendente PixelWork responderá.", false);
    }, 800);
  }

  sendBtn.addEventListener("click", () => {
    const texto = userInput.value.trim();
    if (!texto) return;

    addMessage(texto, true);
    userInput.value = "";
    fakeBotResponse(texto);
  });

  userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendBtn.click();
  });
}

/* ======================================================
   7. DESAFIO INTERNO
   Exemplo que altera o preview e interage com chat
====================================================== */

function initChallenge() {
  const preview = document.getElementById("preview-img");
  if (!preview) return;

  // Cria botão desafio se não existir
  let btn = document.getElementById("challenge-btn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "challenge-btn";
    btn.textContent = "🎯 Desafio PixelWork";
    btn.className = "btn-outline";
    preview.parentElement.insertBefore(btn, preview.nextSibling);
  }

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "Carregando Desafio...";

    // 1) Muda imagem para cores aleatórias
    const randomColor = () => `hsl(${Math.random()*360}, 80%, 50%)`;
    preview.style.backgroundColor = randomColor();

    // 2) Envia mensagem fictícia para o chat
    const chatMessages = document.getElementById("chat-messages");
    if (chatMessages) {
      const div = document.createElement("div");
      div.classList.add("message", "bot");
      div.innerHTML = `<div class="message-content">💡 Desafio concluído! Experimente outras cores.</div>`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    await new Promise(r => setTimeout(r, 1000));
    btn.disabled = false;
    btn.textContent = "🎯 Desafio PixelWork";
  });
      }
