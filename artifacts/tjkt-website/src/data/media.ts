export const media = {
  heroBackground: '/images/home-background.jpg',
  heroIllustration: '/images/home-hero.jpg',
  videoThumbnail: '/images/video-thumbnail.jpg',
  logo: '/images/tjkt-logo.png',
  labs: [
    { src: '/images/labs/simulator-komputer.webp', fallback: '/images/home-hero.jpg', title: 'Simulator Komputer', note: 'Komponen PC & troubleshooting' },
    { src: '/images/labs/laboratorium-komputer-01.webp', fallback: '/images/home-background.jpg', title: 'Laboratorium Komputer', note: 'Ruang praktik jaringan' },
    { src: '/images/labs/panel-jaringan.webp', fallback: '/images/home-hero.jpg', title: 'Panel Jaringan', note: 'Perangkat konektivitas' },
    { src: '/images/labs/praktik-tjkt.webp', fallback: '/images/home-background.jpg', title: 'Praktik TJKT', note: 'Kolaborasi dan instalasi' },
    { src: '/images/labs/laboratorium-komputer-02.webp', fallback: '/images/home-hero.jpg', title: 'Ruang Komputer', note: 'Pembelajaran berbasis praktik' },
    { src: '/images/labs/kegiatan-praktik.webp', fallback: '/images/home-background.jpg', title: 'Kegiatan Praktik', note: 'Eksplorasi perangkat' },
  ],
  gallery: [
    { src: '/images/labs/praktik-tjkt.webp', fallback: '/images/home-background.jpg', title: 'Praktik Jaringan', note: 'Kolaborasi dan instalasi', size: 'large' },
    { src: '/images/labs/panel-jaringan.webp', fallback: '/images/home-hero.jpg', title: 'Konfigurasi Perangkat', note: 'Panel dan konektivitas', size: 'wide' },
    { src: '/images/labs/simulator-komputer.webp', fallback: '/images/home-background.jpg', title: 'Troubleshooting', note: 'Simulator komponen PC', size: 'small' },
    { src: '/images/labs/laboratorium-komputer-02.webp', fallback: '/images/home-hero.jpg', title: 'Pembelajaran Laboratorium', note: 'Suasana ruang praktik', size: 'small' },
    { src: '/images/labs/kegiatan-praktik.webp', fallback: '/images/home-background.jpg', title: 'Kegiatan Praktik', note: 'Kolaborasi siswa di laboratorium', size: 'wide' },
  ],
} as const;