// Fitur Sidebar Notif
const alert = document.getElementById("alert");
const focus = document.getElementById('backgroundGelap')
const tombolbuka = document.getElementById("buka");
const tomboltutup = document.getElementById('tutup');

tombolbuka.addEventListener("click", function(){
  alert.classList.add("active")
  focus.style.display = "block"
});

tomboltutup.addEventListener("click", function(){
  alert.classList.remove("active")
  focus.style.display = "none"
});

// Timer Kuis
document.addEventListener("DOMContentLoaded", function() {
  const timerText = document.getElementById("timer-text");
  let totalSeconds = 15 * 60;
  function updateTimer() {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    timerText.textContent = `${hrs}:${mins}:${secs}`;
    if (totalSeconds > 0) totalSeconds--;
  }
  updateTimer(); 
  setInterval(updateTimer, 1000);
});

// Fungsi Quiz

// Array Soal dan Jawaban
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

let currentIndex = 0;
const userAnswers = Array(questions.length).fill(null);
const markedQuestions = Array(questions.length).fill(false);

const quizContainer = document.querySelector(".quiz-form");
const questionText = document.querySelector(".box-quiz h4");
const navBtns = document.querySelectorAll(".nav-btn");

// Button Mark
const markBtn = document.createElement("button");
markBtn.textContent = "Mark";
markBtn.className = "mark-button";
document.querySelector(".container-next").appendChild(markBtn);

// Elemen Array
const overlay = document.createElement("div");
overlay.id = "overlay-submit";
overlay.style.cssText = `
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.6); display: none; z-index: 99;
`;
document.body.appendChild(overlay);

const submitAlert = document.createElement("div");
submitAlert.id = "submit-alert";
submitAlert.style.cssText = `
  background: white; width: 400px; 
  padding: 20px;
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  display: none; z-index: 100; box-shadow: 0 0 10px rgba(0,0,0,0.25);
  border-top: 6px solid #00DA12;
  text-align: left;
  font-family: sans-serif;
`;

submitAlert.innerHTML = `
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15%">
    <img src="assets/alert-icon.png" style="width: 100px; height: auto;">
    <p style="margin: 0; font-size: 20px;">Apakah anda yakin menyelesaikan kuis ini ?</p>
  </div>
  <div style="margin-top: 20px; text-align: right;">
    <button id="cancel-submit" style="padding: 6px 16px; border: 2px solid #00DA12; background: white; color: #00DA12; border-radius: 6px; margin-right: 10px; cursor: pointer;">Tidak Setuju</button>
    <button id="confirm-submit" style="padding: 6px 16px; background: #00DA12; color: white; border: none; border-radius: 6px; cursor: pointer;">Setuju</button>
  </div>
`;
document.body.appendChild(submitAlert);

// Overlay untuk Cancel Alert
const overlayCancel = document.createElement("div");
overlayCancel.id = "overlay-cancel";
overlayCancel.style.cssText = `
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.6); display: none; z-index: 99;
`;
document.body.appendChild(overlayCancel);

// Modal Alert Cancel
const cancelAlert = document.createElement("div");
cancelAlert.id = "cancel-alert";
cancelAlert.style.cssText = `
  background: white; width: 400px;
  padding: 20px;
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  display: none; z-index: 100; box-shadow: 0 0 10px rgba(0,0,0,0.25);
  border-top: 6px solid #FF3F26;
  text-align: left;
  font-family: sans-serif;
`;

cancelAlert.innerHTML = `
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15%">
    <img src="assets/alert-icon.png" style="width: 100px; height: auto;">
    <p style="margin: 0; font-size: 20px;">Apakah anda yakin membatalkan kuis saat ini?</p>
  </div>
  <div style="margin-top: 20px; text-align: right;">
    <button id="cancel-exit" style="padding: 6px 16px; border: 2px solid #FF3F26; background: white; color: #FF3F26; border-radius: 6px; margin-right: 10px; cursor: pointer;">Tidak</button>
    <button id="confirm-exit" style="padding: 6px 16px; background: #FF3F26; color: white; border: none; border-radius: 6px; cursor: pointer;">Ya</button>
  </div>
`;
document.body.appendChild(cancelAlert);

document.getElementById("cancel-quiz-btn").addEventListener("click", () => {
  overlayCancel.style.display = "block";
  cancelAlert.style.display = "block";
});

document.getElementById("cancel-exit").addEventListener("click", () => {
  overlayCancel.style.display = "none";
  cancelAlert.style.display = "none";
});

document.getElementById("confirm-exit").addEventListener("click", () => {
  window.location.href = "kelas.html";
});

document.getElementById("cancel-submit").addEventListener("click", () => {
  overlay.style.display = "none";
  submitAlert.style.display = "none";
});

// === Render Soal ===
function renderQuestion(index) {
  const q = questions[index];
  questionText.textContent = `${index + 1}. ${q.question}`;
  quizContainer.innerHTML = q.options.map((opt, i) => {
    const letter = String.fromCharCode(97 + i);
    const checked = userAnswers[index] === letter ? "checked" : "";
    return `<label><input type="radio" name="q" value="${letter}" ${checked}>${opt}</label>`;
  }).join("\n");

  // Highlight navigasi
  navBtns.forEach(btn => btn.classList.remove("active"));
  navBtns[index].classList.add("active");

  // Atur tombol Next/Submit
  const nextBtn = document.querySelector(".next-button");
  if (index === questions.length - 1) {
    nextBtn.textContent = "Submit";
    nextBtn.style.backgroundColor = "#00DA12";
    nextBtn.style.color = "white";
  } else {
    nextBtn.textContent = "Next";
    nextBtn.style.backgroundColor = "";
    nextBtn.style.color = "";
  }
}

// === Simpan Jawaban Saat Dipilih ===
quizContainer.addEventListener("change", function(e) {
  if (e.target.name === "q") {
    userAnswers[currentIndex] = e.target.value;
    navBtns[currentIndex].style.backgroundColor = "#B0E0FF";
  }
});

// === Navigasi Soal Manual ===
navBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    currentIndex = i;
    renderQuestion(currentIndex);
  });
});

// === Tombol Next / Submit ===
const nextBtn = document.querySelector(".next-button");
nextBtn.addEventListener("click", () => {
  const selected = document.querySelector(".quiz-form input[type='radio']:checked");
  if (selected) {
    userAnswers[currentIndex] = selected.value;
    navBtns[currentIndex].style.backgroundColor = "#B0E0FF";
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion(currentIndex);
  } else {
    overlay.style.display = "block";
    submitAlert.style.display = "block";
  }
});

// === Tombol Mark ===
markBtn.addEventListener("click", () => {
  markedQuestions[currentIndex] = true;
  navBtns[currentIndex].style.backgroundColor = "#FFD966";
});

// === Tombol Setuju / Tidak Setuju ===
document.getElementById("confirm-submit").addEventListener("click", () => {
  // Hitung skor
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Simpan data ke localStorage
  localStorage.setItem("quizAnswers", JSON.stringify(userAnswers));
  localStorage.setItem("quizScore", score);

  // Redirect ke halaman hasil
  window.location.href = "quiz_hasil.html";
});

document.getElementById("confirm-submit").addEventListener("click", () => {
  alert("Kuis berhasil disubmit!"); // Ganti dengan aksi submit sesungguhnya
  overlay.style.display = "none";
  submitAlert.style.display = "none";
});

// === Initial Render ===
renderQuestion(currentIndex);
