import type { GameSpec, GameplayVideo } from '~/types'

export const cars1Spec: GameSpec = {
  title: 'Disney•Pixar Cars',
  releaseYear: 2006,
  developer: 'Rainbow Studios',
  publisher: 'Disney Interactive',
  genre: 'Open World / Arcade Racing / Adventure',
  steamAppId: '288580',
  steamUrl: 'https://store.steampowered.com/app/288580/DisneyPixar_Cars/',
  coverUrl: '/images/games-cover/cover-cars-1-ps2.webp',
  summary: 'Mulai petualangan balap open-world legendaris di Radiator Springs! Bantu Lightning McQueen berlatih, ikuti turnamen Piston Cup, dan jelajahi indahnya pemandangan Route 66 serta minigame seru bersama Tow Mater dan Doc Hudson.',
  minimumSpecs: {
    os: 'Windows 7 / 8 / 10 / 11 (64-bit)',
    processor: '1.2 GHz Pentium 4 atau Athlon XP',
    memory: '512 MB RAM',
    graphics: '64 MB DirectX 9.0c compatible 3D video card (GeForce FX / Radeon 9200)',
    directx: 'Versi 9.0c',
    storage: '2 GB ruang penyimpanan kosong'
  }
}

export const cars2Spec: GameSpec = {
  title: 'Disney•Pixar Cars 2: The Video Game',
  releaseYear: 2011,
  developer: 'Avalanche Software',
  publisher: 'Disney Interactive',
  genre: 'Combat Arcade Racing / Spy Action / Co-Op Party',
  steamAppId: '301760',
  steamUrl: 'https://store.steampowered.com/app/301760/DisneyPixar_Cars_2/',
  coverUrl: '/images/games-cover/cover-cars-2-ps3.jpg',
  summary: 'Masuki akademi pelatihan agen rahasia C.H.R.O.M.E. (Command Headquarters for Recon Operations and Motorized Espionage)! Ikuti balapan World Grand Prix berkecepatan tinggi dan gunakan persenjataan spionase canggih untuk menghentikan sindikat kriminal internasional.',
  minimumSpecs: {
    os: 'Windows 7 / 8 / 10 / 11 (64-bit)',
    processor: 'Intel Pentium 4 3.0 GHz atau AMD Athlon 64 3500+',
    memory: '1 GB RAM',
    graphics: '128 MB DirectX 9.0c compatible 3D (GeForce 6600 / Radeon X1600)',
    directx: 'Versi 9.0c',
    storage: '3 GB ruang penyimpanan kosong'
  }
}

export const gameplayVideos: GameplayVideo[] = [
  {
    id: 'trailer-main',
    title: 'Cars PS2 Gak Sejelek Yang Gua Kira... (Malah Bagus Bjir)',
    category: 'Cinematic Trailer',
    youtubeId: 'KJTS4nvmShA?si=eNJpqd5F4jqMPgkl', // Official Cars 2 trailer or high quality showcase
    duration: '15:53',
    game: 'Cars 1: Playstation 2',
    description: 'Review dan gameplay dari game Cars 1 di Playstation 2, menampilkan cerita, karakter, dan fitur-fitur yang tersedia.'
  },
  {
    id: 'gameplay-tokyo',
    title: 'Tokyo Neon Grand Prix 4K 60FPS - Francesco vs McQueen',
    category: 'High-Speed Racing',
    youtubeId: 'MoMIu_xEY14?si=8WnP_RV21SwumnSH',
    duration: '4:30',
    game: 'Cars 2: The Video Game',
    description: 'Aksi balap malam hari di sirkuit Tokyo dengan manuver drift 360 derajat, lompatan jembatan layang, dan semburan nitro booster.'
  },
  {
    id: 'gameplay-cars1',
    title: 'Cars 1 Open World Radiator Springs Free Roam & Willy’s Butte',
    category: 'Open World Exploration',
    youtubeId: 'dx0oDJqy77A?si=NGMTxTGq4Scv518q',
    duration: '5:45',
    game: 'Disney•Pixar Cars (2006)',
    description: 'Eksplorasi bebas kota kecil bersejarah Radiator Springs, balapan dirt track di Willy’s Butte, dan latihan mengemudi bersama Doc Hudson.'
  },
  {
    id: 'gameplay-battle',
    title: 'C.H.R.O.M.E. Arena Combat Mode - Spy Gadgets & Weapons Showcase',
    category: 'Battle Arena',
    youtubeId: '2ygi69qS0xk',
    duration: '6:12',
    game: 'Cars 2: The Video Game',
    description: 'Pertarungan arena 4v4 multiplayer dengan roket berpemandu, tumpahan oli, minigun gatling, dan tameng pelindung energi.'
  }
]
