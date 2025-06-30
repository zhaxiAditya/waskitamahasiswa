// ===== Data Soal (Tetap sama seperti quiz utama) =====
const questions = [
  {
    question: "Apa tujuan utama dari user research dalam UI/UX?",
    options: [
      "Untuk mempercantik tampilan website",
      "Untuk mengetahui kebutuhan dan perilaku pengguna",
      "Untuk meningkatkan performa server",
      "Untuk mendesain logo perusahaan"
    ],
    answer: "b"
  },
  {
    question: "Apa itu wireframe dalam desain UI/UX?",
    options: [
      "Gambar akhir produk dengan warna",
      "Kode HTML dasar dari halaman",
      "Kerangka kasar yang menggambarkan struktur halaman",
      "Animasi dari transisi layar"
    ],
    answer: "c"
  },
  {
    question: "Apa prinsip utama dari UI/UX",
    options: [
      "Fokus pada warna cerah",
      "Membuat navigasi tersembunyi",
      "Konsistensi dalam desain",
      "Menggunakan ikon sebanyak mungkin"
    ],
    answer: "c"
  },
  {
    question: "Apa itu affordance dalam UI/UX?",
    options: [
      "Kemampuan sistem untuk multi-tasking",
      "Petunjuk visual bagaimana elemen digunakan",
      "Indikator performa backend",
      "Fitur keamanan UI"
    ],
    answer: "b"
  },
  {
    question: "Metode usability testing bertujuan untuk?",
    options: [
      "Mengukur efisiensi kode",
      "Mengetahui kinerja server",
      "Menilai kemudahan penggunaan produk oleh pengguna",
      "Menguji keamanan jaringan"
    ],
    answer: "c"
  },
  {
    question: "Apa kepanjangan dari UI?",
    options: ["User Interaction", "User Interface", "Universal Interface", "Usage Input"],
    answer: "b"
  },
  {
    question: "Card sorting digunakan untuk?",
    options: [
      "Membuat animasi UI",
      "Menentukan struktur dan hierarki informasi",
      "Mengurutkan pengguna",
      "Menguji performa CPU"
    ],
    answer: "b"
  },
  {
    question: "Heuristic evaluation dilakukan oleh?",
    options: [
      "Pengguna akhir",
      "Pengembang back-end",
      "Tim ahli usability",
      "Desainer grafis junior"
    ],
    answer: "c"
  },
  {
    question: "Persona dalam desain UX digunakan untuk?",
    options: [
      "Mewakili tipe pengguna secara fiktif",
      "Menampilkan animasi pengguna",
      "Menyimpan data pengguna",
      "Menggambarkan database"
    ],
    answer: "a"
  },
  {
    question: "Apa itu prototyping?",
    options: [
      "Produk akhir",
      "Sketsa kertas",
      "Simulasi interaktif produk sebelum dirilis",
      "Kode sumber aplikasi"
    ],
    answer: "c"
  },
  {
    question: "Apa itu UX writing?",
    options: [
      "Menulis cerita pengguna",
      "Penulisan yang memandu pengguna dalam produk",
      "Menulis email pengguna",
      "Menulis kode program"
    ],
    answer: "b"
  },
  {
    question: "Eye-tracking dalam UX digunakan untuk?",
    options: [
      "Menilai warna yang dipilih",
      "Mendeteksi klik pengguna",
      "Melacak pergerakan mata pengguna",
      "Melihat struktur data"
    ],
    answer: "c"
  },
  {
    question: "Responsive design adalah...",
    options: [
      "Desain khusus untuk desktop",
      "Desain yang menyesuaikan dengan berbagai ukuran layar",
      "Desain untuk animasi",
      "Desain berbasis server"
    ],
    answer: "b"
  },
  {
    question: "UX berfokus pada...",
    options: [
      "Performa jaringan",
      "Tampilan layout",
      "Pengalaman dan kepuasan pengguna",
      "Banyaknya elemen grafis"
    ],
    answer: "c"
  },
  {
    question: "Design system digunakan untuk...",
    options: [
      "Membuat backend server",
      "Mengelola basis data",
      "Menyatukan panduan desain, komponen dan dokumentasi",
      "Menjalankan API"
    ],
    answer: "c"
  }
];

// ===== Ambil Jawaban dari Local Storage =====
const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");

// ===== Hitung Skor (6 poin per soal benar, lalu konversi ke skala 100) =====
let rawScore = 0;
questions.forEach((q, i) => {
  if (savedAnswers[i] === q.answer) {
    rawScore += 6;
  }
});
const convertedScore = Math.round((rawScore / 90) * 100);

// ===== Tampilkan Skor di Halaman =====
const scoreSpan = document.querySelector(".info-quiz .score");
if (scoreSpan) {
  scoreSpan.textContent = `: ${convertedScore}`;
}

// ===== Render Soal dan Jawaban yang Sudah Dipilih =====
let currentIndex = 0;
const quizContainer = document.querySelector(".quiz-form");
const questionText = document.querySelector(".box-quiz h4");
const navBtns = document.querySelectorAll(".nav-btn");

function renderQuestion(index) {
  const q = questions[index];
  questionText.textContent = `${index + 1}. ${q.question}`;
  quizContainer.innerHTML = q.options.map((opt, i) => {
    const letter = String.fromCharCode(97 + i);
    const checked = savedAnswers[index] === letter ? "checked" : "";
    return `<label><input type="radio" name="q" value="${letter}" ${checked} disabled> ${opt}</label>`;
  }).join("\n");

  navBtns.forEach(btn => btn.classList.remove("active"));
  navBtns[index].classList.add("active");
}

navBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    currentIndex = i;
    renderQuestion(currentIndex);
  });
});

renderQuestion(currentIndex);
