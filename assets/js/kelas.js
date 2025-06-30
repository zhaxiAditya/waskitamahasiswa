    
    function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const alert = document.getElementById('alert');
    console.log(email);
    console.log(password);

        if(email == "sayamahasiswa@amikom.ac.id" && password =="amikom"){
            window.location.href="/../listKelas.html"
        }else {
            alert.style.display = 'block'
            document.getElementById('email').value = "";
            document.getElementById('password').value= "";
        }
    }

    function google(){
        window.location.href="/../listKelas.html"
    }
    
    const search = document.getElementById('search').value;
    const alert = document.getElementById("alert");
    const focus = document.getElementById('backgroundGelap');
    const tombolbuka = document.getElementById("buka");
    const tomboltutup = document.getElementById('tutup');

    tombolbuka.addEventListener("click", function(){
        alert.classList.add("active")
        focus.style.display = "block"
    })
        tomboltutup.addEventListener("click", function(){
        alert.classList.remove("active")
        focus.style.display = "none"
    })

    const filter = document.getElementById("filter");
    const tombol = document.getElementById("buttomFilter")
    tombol.addEventListener('click', function(){
        if(filter.style.display === "block"){
            filter.style.display = "none"
        } else {
            filter.style.display = "block"
        }
    })



    const pemberitahuan = [
    {
        tugas: "Tugas Proyek UI/UX",
        deskripsi: "Tugas Pengeumpulan Laporan Moze",
        waktu: "1 Menit",
    }];

    const kelasData = [
        {
            color: "rgba(58, 160, 255, 0.6)",
            angkatan : "2025 - Ganjil",
            nama: "SI06 - MECHINE LERNING"
        },
        {
            color: "rgba(250, 55, 117, 0.6)",
            angkatan : "2025 - Ganjil",
            nama: "SI06 - TESTING DAN IMPLEMENTASI"
        },
        {
            color: "rgba(43, 73, 222, 0.6)",
            angkatan : "2025 - Ganjil",
            nama: "SI06 - BLOCKCHAIN"
        },
        {
            color: "rgba(3, 171, 110, 0.6)",
            angkatan : "2025 - Ganjil",
            nama: "SI06 - METODOLOGI PENELITIAN"
        },
        {
            color: "rgba(255, 171, 76, 0.6)",
            angkatan : "2025 - Ganjil",
            nama: "SI06 - TUGAS PROYEK UI/UX"
        },
        {
            color: "rgba(215, 245, 81, 0.6)",
            angkatan : "2024 - Ganjil",
            nama: "SI03 - REKAYASA PRANGKAT LUNAK"
        },
        {
            color: "rgba(3, 171, 110, 0.6)",
            angkatan : "2024 - Genap",
            nama: "SI06 - KEAMANAN PRANGKAT LUNAK"
        },
        {
            color: "rgba(14, 3, 171, 0.6)",
            angkatan : "2025 - Ganjil",
            nama: "SI06 - TUGAS PROYEK DIGITAL BISNIS"
        }
        
    ]
        const alertList = document.getElementById('alertList');
        alertList.innerHTML = "";
        pemberitahuan.forEach((kelas, index)=>{
            const div = document.createElement("div");
            div.innerHTML = `
            <span>
                <h4 style="font-size: 16px;">${kelas.tugas}</h4>
                <p style="font-size: 8px;">${kelas.deskripsi}</p>
            </span>
            <span style="text-align: end;">
                <i class="fa-solid fa-xmark" onClick="hapus(${index})"></i> 
                <p style="font-size: 8px;">30Detik yang lalu</p>
            </span>
            `;
            alertList.appendChild(div);
        })

    function hapus(index){
        pemberitahuan.splice(index, 1)
        renderUlang();
    }
    function renderUlang(){
        const alertList = document.getElementById('alertList');
        alertList.innerHTML = "";
        pemberitahuan.forEach((kelas, index)=>{
            const div = document.createElement("div");
            div.innerHTML = `
            <span>
                <h4 style="font-size: 16px;">${kelas.tugas}</h4>
                <p style="font-size: 8px;">${kelas.deskripsi}</p>
            </span>
            <span style="text-align: end;">
                <i class="fa-solid fa-xmark" onClick="hapus(${index})"></i> 
                <p style="font-size: 8px;">30Detik yang lalu</p>
            </span>
            `;
            alertList.appendChild(div);
        })
    }

    const cari = document.getElementById('search');
    const daftarKelas = document.getElementById('daftarKelas');
    const daftarKelasLalu = document.getElementById('kelasSelesai');

    // Tampilkan semua data saat halaman dibuka
    tampilkanDataAwal();

    // Event pencarian
    cari.addEventListener('keyup', function(){
        const keyword = this.value.trim().toLowerCase();
        if (keyword === "") {
            tampilkanDataAwal();
        } else {
            tolongDicari(keyword);
        }
    });

    // Fungsi mencari data
    function tolongDicari(keyword){
        let cariData = kelasData.filter(kelas => 
            kelas.nama.toLowerCase().includes(keyword)
        );
        hasilData(cariData);
    }

    // Fungsi menampilkan hasil pencarian
    function hasilData(filteredData) {
        let hasilSekarang = filteredData.filter(kelas => kelas.angkatan === "2025 - Ganjil");
        let hasilLalu = filteredData.filter(kelas => kelas.angkatan !== "2025 - Ganjil");

        tampilkan(hasilSekarang, daftarKelas);
        tampilkan(hasilLalu, daftarKelasLalu);
    }

    // Fungsi untuk menampilkan data awal (semua data)
    function tampilkanDataAwal() {
        let kelasSekarang = kelasData.filter(kelas => kelas.angkatan === "2025 - Ganjil");
        let kelasLalu = kelasData.filter(kelas => kelas.angkatan !== "2025 - Ganjil");

        tampilkan(kelasSekarang, daftarKelas);
        tampilkan(kelasLalu, daftarKelasLalu);
    }

    // Fungsi untuk menampilkan data ke elemen HTML
    function tampilkan(kelasData, target){
        target.innerHTML = "";

        kelasData.forEach((kelas)=>{
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="cards" style="background-image: url(assets/tekstur.jpg); background-position: center; background-size: cover; overflow: hidden;">
                    <div class="backCard" style="background-color: ${kelas.color};"></div>
                    <span style="position: relative; z-index: 99;"><h3 style="font-size: 26px;">${kelas.angkatan}</h3><i class="fa-solid fa-ellipsis" style="color: #FAFAFA;"></i></span>
                    <p style="position: relative; z-index: 99; font-size: 18px;" >${kelas.nama}</p>
                    <a href="kelas.html" class="backCard" style="z-index: 99;"></a>
                </div>
            `;
            target.appendChild(div);
        });
    }

    // Fitur sorting (jika kamu pakai radio button sort)
    function sortData(order){
        const kelasSort = [...kelasData].sort((a,b) => {
            if(order === "asc"){
                return a.nama.localeCompare(b.nama);
            } else {
                return b.nama.localeCompare(a.nama);
            }
        });

        hasilData(kelasSort); // urutan disortir, lalu ditampilkan per kategori
    }

    document.querySelectorAll('input[name="sort"]').forEach(radio => {
        radio.addEventListener("change", function () {
            sortData(this.value);
        });
    });

