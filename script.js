/* ===== Safari Garage — script.js ===== */

// Ganti dengan nomor WhatsApp Anda (format internasional, tanpa + atau spasi)
const WA_NUMBER = "6281234567890";

const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const form = document.getElementById("form");
const err = document.getElementById("err");

// Bayangan pada navbar saat halaman di-scroll
function onScroll() {
  nav.classList.toggle("scrolled", window.scrollY > 8);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menu mobile
function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// Tombol "Tanya sewa" mengisi form otomatis
document.querySelectorAll("[data-car]").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("layanan-pilih").value = "Sewa mobil klasik";
    document.getElementById("detail").value =
      "Saya tertarik menyewa " + link.dataset.car + ". Tanggal sewa: ";
  });
});

// Kirim form ke WhatsApp
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = form.nama.value.trim();
  if (!nama) {
    err.hidden = false;
    form.nama.focus();
    return;
  }
  err.hidden = true;

  const layanan = form.layanan.value;
  const detail = form.detail.value.trim();
  const pesan =
    "Halo Safari Garage, saya " + nama + ".\n" +
    "Layanan: " + layanan + (detail ? "\n" + detail : "");

  window.open(
    "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(pesan),
    "_blank",
    "noopener"
  );
});

// Tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();
