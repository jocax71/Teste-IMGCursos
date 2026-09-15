const whatsapp = (
  text = "Olá! Gostaria de saber mais sobre os cursos do IMG CURSOS.",
) => "https://wa.me/557399110291?text=" + encodeURIComponent(text);
const courses = [
  {
    category: "Técnico",
    title: "Técnico em Eletrotécnica",
    image: "electrical.jpg",
    alt: "Painel elétrico e equipamento de medição",
    description:
      "Instalações, sistemas e equipamentos elétricos. Formação técnica voltada às atividades da área.",
  },
  {
    category: "Técnico",
    title: "Técnico em Segurança do Trabalho",
    image: "safety.jpg",
    alt: "Profissional de segurança em ambiente industrial",
    description:
      "Prevenção de riscos, proteção dos trabalhadores e segurança nos ambientes de trabalho.",
  },
  {
    category: "Curso Livre",
    title: "RD — Redes de Distribuição",
    image: "distribution.jpg",
    alt: "Postes e infraestrutura de distribuição de energia elétrica",
    description:
      "Qualificação para atividades relacionadas às redes de distribuição de energia elétrica.",
  },
  {
    category: "Curso Livre",
    title: "Eletricidade em Atividades Comerciais",
    image: "commercial.jpg",
    alt: "Manutenção em instalação elétrica comercial",
    description:
      "Conhecimentos de instalação e manutenção elétrica aplicados a ambientes comerciais.",
  },
];
document.querySelector("#course-grid").innerHTML = courses
  .map(
    (c, i) =>
      `<article class="course-card"><div class="course-image"><img src="assets/${c.image}" alt="${c.alt} — imagem ilustrativa" loading="lazy" width="600" height="400"><span class="tag">${c.category}</span></div><div class="course-content"><h3>${c.title}</h3><p>${c.description}</p><div class="course-bottom"><button class="detail-button" data-course="${i}">Ver detalhes </button><a class="interest" href="${whatsapp("Olá! Tenho interesse no curso " + c.title + ". Gostaria de informações sobre a próxima turma.")}" target="_blank" rel="noopener">Tenho interesse</a></div></div></article>`,
  )
  .join("");
function wireWhatsApp() {
  document.querySelectorAll("[data-whatsapp]").forEach((a) => {
    a.href = whatsapp();
    a.target = "_blank";
    a.rel = "noopener";
  });
}
wireWhatsApp();
const toggle = document.querySelector(".menu-toggle"),
  menu = document.querySelector("#menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }),
);
const dialog = document.querySelector("#details");
document.querySelectorAll("[data-course]").forEach((b) =>
  b.addEventListener("click", () => {
    const c = courses[b.dataset.course];
    document.querySelector("#detail-category").textContent = c.category;
    document.querySelector("#detail-title").textContent = c.title;
    document.querySelector("#detail-description").textContent = c.description;
    const interest = document.querySelector("#detail-interest");
    interest.href = whatsapp("Olá! Tenho interesse no curso " + c.title + ".");
    interest.target = "_blank";
    interest.rel = "noopener";
    dialog.setAttribute("aria-labelledby", "detail-title");
    dialog.showModal();
  }),
);
dialog.querySelector(".close").onclick = () => dialog.close();
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
