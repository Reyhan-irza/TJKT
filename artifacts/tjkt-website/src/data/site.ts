import type { ComponentType } from 'react';
import { Cable, HardDrive, Network, ShieldCheck } from 'lucide-react';

export const site = {
  school: 'SMKN 2 Lubuk Basung',
  department: 'Teknik Jaringan Komputer dan Telekomunikasi',
  short: 'TJKT',
  email: 'smkn2lubukbasung@yahoo.com',
  phone: '0752-8804180',
  instagram: '@smkn2lubukbasungofficial',
  instagramUrl: 'https://www.instagram.com/smkn2lubukbasungofficial/',
  youtubeUrl: 'https://youtu.be/WJc7Cvf1mWI?si=eLiep-YSxbMSlXjk',
  mapUrl: 'https://maps.app.goo.gl/wFKvSwX7TFeUvdkU7',
  address: 'Jl. Lintas Manggopoh Pasaman, Lubuk Basung, Sumatera Barat',
};

export const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang TJKT' },
  { href: '/pembelajaran', label: 'Pembelajaran' },
  { href: '/fasilitas', label: 'Fasilitas & Kegiatan' },
  { href: '/kontak', label: 'Prospek & Kontak' },
];

export const competencies: { number: string; title: string; description: string; icon: ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { number: '01', title: 'Jaringan Komputer', description: 'Memahami cara perangkat terhubung, berkomunikasi, dan bekerja sebagai satu sistem.', icon: Network },
  { number: '02', title: 'Telekomunikasi', description: 'Mengenal pertukaran informasi dan dasar teknologi komunikasi data.', icon: Cable },
  { number: '03', title: 'Infrastruktur', description: 'Membaca kebutuhan, menyiapkan, dan merawat fondasi sebuah jaringan.', icon: HardDrive },
  { number: '04', title: 'Keamanan Jaringan', description: 'Membangun kebiasaan berpikir aman saat mengelola akses dan konektivitas.', icon: ShieldCheck },
];

export const practiceAreas = [
  ['01', 'Konfigurasi jaringan', 'Menyusun langkah kerja dari kebutuhan hingga jaringan siap digunakan.'],
  ['02', 'Instalasi perangkat', 'Mengenal proses penempatan, penyambungan, dan pengecekan perangkat.'],
  ['03', 'Troubleshooting', 'Melatih cara membaca gejala, menguji kemungkinan, dan menemukan solusi.'],
  ['04', 'Server & infrastruktur', 'Mendekati sistem dari sisi struktur, layanan, dan pemeliharaan.'],
  ['05', 'Komunikasi data', 'Melihat bagaimana informasi berpindah melalui sebuah jaringan.'],
];

export const learningAreas = [
  { number: '01', title: 'Jaringan Komputer', description: 'Area untuk memahami hubungan antarperangkat, alur komunikasi, dan cara kerja sebuah jaringan.', tags: ['konektivitas', 'topologi', 'konfigurasi'] },
  { number: '02', title: 'Infrastruktur', description: 'Mengenal fondasi teknis yang membuat jaringan dapat dirancang, dipasang, dan dipelihara dengan rapi.', tags: ['perangkat', 'instalasi', 'pemeliharaan'] },
  { number: '03', title: 'Telekomunikasi', description: 'Membuka perspektif tentang teknologi yang memungkinkan data dan informasi saling terhubung.', tags: ['komunikasi data', 'transmisi', 'sistem'] },
  { number: '04', title: 'Keamanan Jaringan', description: 'Membangun kesadaran terhadap akses, risiko, dan langkah perlindungan dalam lingkungan jaringan.', tags: ['akses', 'risiko', 'perlindungan'] },
  { number: '05', title: 'Perangkat Komputer', description: 'Mengenali perangkat sebagai bagian dari sistem, bukan hanya benda yang berdiri sendiri.', tags: ['komponen', 'sistem', 'perakitan'] },
  { number: '06', title: 'Troubleshooting', description: 'Mengembangkan cara berpikir terstruktur ketika sebuah sistem tidak bekerja seperti yang diharapkan.', tags: ['diagnosis', 'uji', 'solusi'] },
];

export const careers = [
  { title: 'Network Technician', description: 'Contoh arah pengembangan untuk yang tertarik memasang, menguji, dan memelihara jaringan.' },
  { title: 'IT Support', description: 'Contoh bidang yang dekat dengan pemecahan masalah perangkat dan kebutuhan pengguna.' },
  { title: 'System Administrator', description: 'Contoh arah untuk mendalami pengelolaan sistem dan layanan digital.' },
  { title: 'Network Engineer', description: 'Contoh bidang lanjutan yang berfokus pada rancangan dan performa jaringan.' },
  { title: 'Infrastructure Technician', description: 'Contoh peran yang menaruh perhatian pada fondasi dan keberlangsungan infrastruktur.' },
  { title: 'Cybersecurity', description: 'Contoh area eksplorasi bagi yang ingin memahami keamanan sistem dan jaringan.' },
];

export const activities = ['Semua aktivitas', 'Praktik Jaringan', 'Konfigurasi Perangkat', 'Troubleshooting', 'Pembelajaran Laboratorium', 'Proyek Siswa'];