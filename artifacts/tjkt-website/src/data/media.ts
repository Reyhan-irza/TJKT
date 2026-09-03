export const media = {
  heroBackground: '/images/home-background.jpg',
  heroIllustration: '/images/tjkt/hero-open-day.png',
  videoThumbnail: '/images/tjkt/youtube-tjkt.jpg',
  logo: '/images/tjkt-logo.png',
  labs: [
    { src: '/images/tjkt/rack-cabling.jpg', fallback: '/images/home-hero.jpg', title: 'Penataan Rack', note: 'Instalasi dan manajemen kabel', focus: '50% 47%' },
    { src: '/images/tjkt/network-lab.jpeg', fallback: '/images/home-background.jpg', title: 'Laboratorium Jaringan', note: 'Ruang praktik komputer', focus: '50% 50%' },
    { src: '/images/tjkt/patch-panel.jpg', fallback: '/images/home-hero.jpg', title: 'Patch Panel', note: 'Identifikasi koneksi jaringan', focus: '50% 55%' },
    { src: '/images/tjkt/network-rack.jpg', fallback: '/images/home-background.jpg', title: 'Network Rack', note: 'Switch dan patch panel', focus: '50% 46%' },
    { src: '/images/tjkt/router-configuration.jpg', fallback: '/images/home-hero.jpg', title: 'Konfigurasi Router', note: 'Praktik pengaturan perangkat', focus: '48% 42%' },
    { src: '/images/labs/kegiatan-praktik.webp', fallback: '/images/home-background.jpg', title: 'Kegiatan Praktik', note: 'Eksplorasi perangkat', focus: '50% 50%' },
  ],
  gallery: [
    { src: '/images/tjkt/hero-open-day.png', fallback: '/images/home-background.jpg', title: 'Profil TJKT', note: 'SMKN 2 Lubuk Basung', size: 'large', focus: '50% 50%' },
    { src: '/images/tjkt/network-rack.jpg', fallback: '/images/home-hero.jpg', title: 'Konfigurasi Perangkat', note: 'Panel dan konektivitas', size: 'wide', focus: '50% 46%' },
    { src: '/images/tjkt/patch-panel.jpg', fallback: '/images/home-background.jpg', title: 'Troubleshooting', note: 'Membaca jalur koneksi', size: 'small', focus: '50% 55%' },
    { src: '/images/tjkt/network-lab.jpeg', fallback: '/images/home-hero.jpg', title: 'Pembelajaran Laboratorium', note: 'Suasana ruang praktik', size: 'small', focus: '50% 50%' },
    { src: '/images/tjkt/router-configuration.jpg', fallback: '/images/home-background.jpg', title: 'Konfigurasi Router', note: 'Eksplorasi perangkat', size: 'wide', focus: '48% 42%' },
  ],
} as const;