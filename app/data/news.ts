import type { CommunityNews } from '~/types'

export const newsData: CommunityNews[] = [
  {
    id: '1',
    slug: 'cars-game-steam-deck-verified-guide',
    title: 'Panduan Optimalisasi: Mainkan Disney Pixar Cars & Cars 2 di Steam Deck 60 FPS Solid!',
    excerpt: 'Simak setting grafis terbaik, pemetaan kontroler gyroscope untuk trik berputar, dan tips kompatibilitas Proton untuk pengalaman balap portable maksimal.',
    content: `Komunitas balap Disney Pixar Cars di Steam menyambut gembira performa luar biasa game ini di perangkat handheld modern seperti Steam Deck dan ROG Ally.

### Konfigurasi Proton Terbaik
Untuk mendapatkan rendering stabil 60 FPS tanpa stuttering pada resolusi 1280x800:
1. Masuk ke **Properties** -> **Compatibility** di Steam library.
2. Centang "Force the use of a specific Steam Play compatibility tool" dan pilih **Proton GE 8-25** atau versi Proton Experimental terbaru.
3. Tambahkan launch option: \`DXVK_FRAME_RATE=60 %command%\` untuk membatasi tearing.

### Sensasi Kontroler Modern
Game ini mendukung penuh input analog XInput dan DualSense. Anda dapat menikmati drifting presisi Doc Hudson di Willy's Butte dengan getaran haptic feedback yang responsif!`,
    author: 'DocHornet_Speed',
    date: '2026-08-15',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: '2',
    slug: 'piston-cup-community-tournament-2026',
    title: 'Pengumuman Piston Cup Online Invitational 2026: Total Hadiah $2,500!',
    excerpt: 'Turnamen komunitas global resmi dibuka! Bersiaplah berkompetisi di mode multiplayer Cars 2 C.H.R.O.M.E. Battle dan Time Attack Radiator Springs.',
    content: `Komunitas Discord Cars Game Championship mengumumkan turnamen tahunan **Piston Cup Online Invitational 2026** yang akan diadakan pada tanggal 10-12 September 2026.

### Kategori Perlombaan:
- **Piston Cup Pro Circuit (Cars 1)**: Time Trial di 5 sirkuit utama tanpa alat bantu nitro glitch.
- **C.H.R.O.M.E. Combat Arena (Cars 2)**: Pertarungan 4v4 menggunakan senjata rahasia spy gadgets, ranjau minyak, dan roket pelacak.
- **Backwards Drift Mater Challenge**: Mode spesial mengemudi mundur melewati rintangan jalanan berdebu Radiator Springs.

Pendaftaran gratis dan terbuka untuk semua pemilik game di platform Steam!`,
    author: 'RustEze_Admin',
    date: '2026-08-10',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: '3',
    slug: 'community-hd-texture-mod-pack-v4',
    title: 'Rilis Komunitas: HD Remaster Texture Mod Pack v4.0 dengan Dukungan Ray Tracing Shader!',
    excerpt: 'Tingkatkan resolusi tekstur livery mobil, aspal basah, dan efek pencahayaan neon malam hari hingga 4K Ultra-HD dengan mod buatan penggemar setia.',
    content: `Tim modder komunitas internasional baru saja merilis **Radiator Springs Ultra-HD Remaster Pack v4.0** untuk versi Steam dari Disney Pixar Cars.

### Fitur Pembaruan Mod:
- Peningkatan tekstur bodi seluruh 26+ karakter ke resolusi 4K native dengan detail stiker sponsor yang tajam.
- Implementasi ReShade RTGI (Ray-Traced Global Illumination) untuk efek pantulan lampu sorot studio dan neon Tokyo.
- Audio remaster suara mesin V8 dan efek ban berdecit dengan bitrate tinggi 320kbps.

Mod ini sepenuhnya gratis dan kompatibel tanpa merusak save file asli game.`,
    author: 'Luigi_TireMaster',
    date: '2026-07-28',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false
  },
  {
    id: '4',
    slug: 'cars-retrospective-20-years-of-speed',
    title: 'Nostalgia & Retrospeksi: Mengapa Mekik Balap Disney Pixar Cars Masih Menjadi Game Favorit Sepanjang Masa',
    excerpt: 'Mengulas kembali sejarah perilisan game Cars di era 2006, transisi ke aksi agen spionase di Cars 2, dan daya tariknya yang tak pernah pudar.',
    content: `Dua dekade sejak film pertamanya meluncur di bioskop, franchise game balap Disney Pixar Cars tetap menduduki tempat istimewa di hati para gamer lintas generasi.

Berbeda dengan game balap arcade biasa, seri game Cars memadukan eksplorasi open-world kota kecil yang penuh kehangatan, interaksi karakter yang hidup, serta mekanik drifting yang sangat memuaskan di atas lintasan tanah liat.

Cars 2 kemudian menyempurnakannya dengan dinamika tempur berkecepatan tinggi yang dapat dinikmati bersama teman melalui split-screen maupun remote play Steam.`,
    author: 'SallyFan_95',
    date: '2026-07-14',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false
  }
]
