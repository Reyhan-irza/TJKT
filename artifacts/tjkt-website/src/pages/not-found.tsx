import { ArrowRight, Cable } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-mark"><Cable size={24} /></div>
      <span className="eyebrow dark-label">STATUS / 404</span>
      <h1>Halaman ini<br /><em>belum terhubung.</em></h1>
      <p>Alamat yang kamu buka tidak ditemukan. Kembali ke beranda untuk mengenal program TJKT lebih dekat.</p>
      <Link href="/" className="button-primary" data-testid="link-not-found-home">Kembali ke beranda <ArrowRight size={15} /></Link>
      <span className="not-found-coordinate mono">SMKN 2 LUBUK BASUNG / TJKT</span>
    </section>
  );
}
