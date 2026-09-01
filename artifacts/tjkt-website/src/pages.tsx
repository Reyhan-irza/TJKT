import { ArrowDownRight, ArrowRight, ExternalLink, MapPin, Phone, Mail, Instagram, Youtube, X, Maximize2 } from 'lucide-react';
import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { Link } from 'wouter';
import { activities, careers, competencies, learningAreas, practiceAreas, site } from '@/data/site';
import { media } from '@/data/media';
import { ArrowLink, SectionLabel, Seo, VideoPreview } from '@/components/site-shell';

const baseDescription = 'Website informasi dan pengenalan Jurusan Teknik Jaringan Komputer dan Telekomunikasi SMKN 2 Lubuk Basung.';
type MediaItem = { src: string; fallback: string; title: string; note: string };

export function HomePage() {
  const [selectedCareer, setSelectedCareer] = useState(0);
  const [selectedCompetency, setSelectedCompetency] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  return <><Seo title="TJKT SMKN 2 Lubuk Basung | Teknik Jaringan Komputer dan Telekomunikasi" description={baseDescription} />
    <section className="hero">
      <div className="hero-lines" />
      <div className="container hero-grid">
        <div className="hero-copy"><div className="hero-kicker"><SectionLabel dark>Program keahlian / TJKT</SectionLabel></div><h1><span className="hero-line-mask"><span className="hero-line">Menghubungkan</span></span><span className="hero-line-mask"><span className="hero-line"><em>teknologi,</em></span></span><span className="hero-line-mask"><span className="hero-line">menggerakkan</span></span><span className="hero-line-mask"><span className="hero-line">masa depan.</span></span></h1><p className="hero-sub">Tempat mengenal jaringan komputer, infrastruktur, dan telekomunikasi melalui cara berpikir teknis dan praktik yang nyata.</p><div className="hero-actions"><Link href="/pembelajaran" className="button-primary" data-testid="link-hero-explore">Jelajahi TJKT <ArrowRight size={15} /></Link><Link href="/tentang" className="button-secondary" data-testid="link-hero-about">Tentang TJKT</Link></div><div className="hero-data" aria-label="Ringkasan program"><div><strong>04</strong><span>fondasi bidang</span></div><div><strong>06</strong><span>ruang praktik</span></div><div><strong>01</strong><span>rasa ingin tahu</span></div></div></div>
          <div className="hero-visual">
           <figure className="hero-image-frame">
             <img src="/images/home-hero.jpg" alt="Ilustrasi perangkat jaringan dan proses pemecahan masalah telekomunikasi" data-parallax />
             <figcaption>ILUSTRASI / JARINGAN & PEMECAHAN MASALAH</figcaption>
           </figure>
           <div className="hero-note"><strong>SMKN 2 LUBUK BASUNG</strong>Teknik Jaringan Komputer dan Telekomunikasi. Informasi untuk siswa dan orang tua yang ingin mengenal lebih dekat.</div>
         </div>
        </div>
         <a className="scroll-cue" href="#kompetensi" data-testid="link-scroll-competencies"><span /> gulir untuk menjelajah</a>
    </section>
     <RunningBand />
      <StatementStrip />
     <section id="kompetensi" className="competency-band" aria-labelledby="competency-title"><h2 id="competency-title" className="sr-only">Kompetensi TJKT</h2><div className="container competency-grid">{competencies.map(({ number, title, description, icon: Icon }, index) => <button className={`competency ${selectedCompetency === index ? 'selected' : ''}`} key={number} onClick={() => setSelectedCompetency(index)} aria-pressed={selectedCompetency === index} data-testid={`button-competency-${number}`} data-reveal><span className="competency-number">{number}</span><div className="competency-icon"><Icon size={23} strokeWidth={1.5} /></div><h3>{title}</h3><p>{description}</p><span className="competency-indicator" aria-hidden="true" /></button>)}</div></section>
     <StorySection />
    <section className="section-tight"><div className="container asymmetry"><div className="blueprint" data-reveal><span className="blueprint-coord a">00° 12' 45"S</span><span className="blueprint-coord b">LAB / FIELD NOTE 01</span><span className="blueprint-mark">TJ<span>KT</span></span></div><div data-reveal><SectionLabel>Belajar secara menyeluruh</SectionLabel><h2 className="display" style={{ fontSize: 'clamp(2.5rem, 4.7vw, 5.3rem)', lineHeight: '.9', letterSpacing: '-.07em', margin: '18px 0 25px' }}>Dari kabel,<br /><span style={{ color: 'var(--blue)' }}>ke koneksi.</span></h2><p className="body-copy">Bidang ini mengajak siswa melihat teknologi dari fondasinya. Bukan sekadar memakai perangkat, tetapi memahami hubungan, alur, dan keputusan di balik sebuah sistem.</p><ArrowLink href="/pembelajaran">Lihat area pembelajaran</ArrowLink></div></div></section>
     <section className="number-band"><div className="container number-grid"><div className="number-item" data-reveal><span className="number">04</span><span className="number-label">Tahun pendidikan</span><p className="number-note">Durasi pendidikan yang diketahui untuk program TJKT.</p></div><div className="number-item" data-reveal><span className="number">06</span><span className="number-label">Laboratorium</span><p className="number-note">Enam ruang laboratorium untuk mendukung kegiatan praktik.</p></div><div className="number-item" data-reveal><span className="number">TJKT</span><span className="number-label">Program keahlian</span><p className="number-note">Teknik Jaringan Komputer dan Telekomunikasi.</p></div></div></section>
     <EcosystemBand />
    <section className="section practice-section"><div className="container practice-grid"><div className="practice-title" data-reveal><SectionLabel dark>Praktik & proses</SectionLabel><h2>Belajar<br />dengan<br /><span>melakukan.</span></h2><p>Praktik membuka ruang untuk mencoba, menemukan gangguan, dan belajar menyusun solusi secara bertahap.</p></div><div className="practice-list" data-reveal>{practiceAreas.map(([number, title, description], index) => <button className={`practice-row ${selectedPractice === index ? 'selected' : ''}`} key={number} onClick={() => setSelectedPractice(index)} aria-expanded={selectedPractice === index}><span>{number}</span><span className="practice-row-copy"><h3>{title}</h3><p>{description}</p></span><ArrowDownRight size={18} /></button>)}</div></div></section>
    <section className="section video-section"><div className="container video-layout"><div data-reveal><SectionLabel>Dokumentasi video</SectionLabel><h2>Lihat TJKT<br /><span>dalam aksi.</span></h2><p>Video yang disediakan untuk membantu melihat suasana dan mengenal TJKT lebih dekat.</p><ArrowLink href={site.youtubeUrl} external>Buka di YouTube</ArrowLink></div><div data-reveal><VideoPreview /></div></div></section>
    <section className="section"><div className="container"><div className="career-intro" data-reveal><div><SectionLabel>Arah eksplorasi</SectionLabel><h2>Setelah TJKT,<br />ke mana?</h2></div><p>Contoh bidang yang dapat menjadi arah pengembangan karier. Pilih yang ingin kamu kenali.</p></div><div className="career-list" data-reveal>{careers.map((career, index) => <button className={`career-item ${selectedCareer === index ? 'selected' : ''}`} key={career.title} onClick={() => setSelectedCareer(index)} data-testid={`button-career-${index}`}><span className="career-index">0{index + 1}</span><h3>{career.title}</h3><ArrowDownRight size={18} /><p>{selectedCareer === index ? career.description : ''}</p></button>)}</div></div></section>
    <section className="container section-tight"><div className="cta-panel" data-reveal><h2>Mulai dengan rasa ingin tahu.<br /><span>Lanjutkan dengan praktik.</span></h2><Link href="/kontak" className="button-primary" data-testid="link-home-cta">Prospek & kontak <ArrowRight size={15} /></Link></div></section>
  </>;
}

export function AboutPage() {
  const principles = ['Pembelajaran jaringan komputer', 'Infrastruktur dan perangkat', 'Teknologi telekomunikasi', 'Dasar keamanan jaringan', 'Praktik dan penyelesaian masalah'];
  return <><Seo title="Tentang TJKT | SMKN 2 Lubuk Basung" description="Mengenal bidang Teknik Jaringan Komputer dan Telekomunikasi di SMKN 2 Lubuk Basung." /><PageHero eyebrow="01 / Tentang program" title={<>Mengenal<br /><em>TJKT.</em></>} aside="Sebuah pengantar untuk memahami apa yang dipelajari, bagaimana prosesnya, dan mengapa bidang ini relevan untuk terus dieksplorasi." />
    <section className="section"><div className="container about-split"><div data-reveal><SectionLabel>Definisi singkat</SectionLabel><h2>Bukan hanya<br /><span style={{ color: 'var(--blue)' }}>tentang kabel.</span></h2></div><div className="about-content" data-reveal><p className="lead">TJKT merupakan bidang keahlian yang mempelajari perancangan, implementasi, pengelolaan, dan pemeliharaan jaringan komputer serta sistem telekomunikasi.</p><p className="body-copy">Teknologi menjadi lebih mudah dipahami saat diurai menjadi hubungan yang masuk akal. TJKT mengajak siswa berkenalan dengan cara berpikir tersebut—membaca kebutuhan, menyusun langkah, menguji, dan merawat.</p><ArrowLink href="/pembelajaran">Lihat cara belajarnya</ArrowLink></div></div></section>
    <section className="section section-dark"><div className="container dark-intro"><div data-reveal><SectionLabel dark>Fondasi perjalanan</SectionLabel><h2>Mengapa<br /><span>mempelajari TJKT?</span></h2></div><p data-reveal>Karena memahami teknologi berarti juga memahami cara menyelesaikan masalah. Setiap area di bawah ini adalah pintu masuk untuk mengenal dunia jaringan dan telekomunikasi dengan lebih dekat.</p></div><div className="container" style={{ marginTop: 65 }}><div className="principles">{principles.map((principle, index) => <div className="principle" key={principle} data-reveal><b>0{index + 1}</b><div><h3 style={{ color: 'var(--white)' }}>{principle}</h3><p>Area kompetensi yang relevan dengan bidang TJKT dan dapat dieksplorasi melalui proses belajar.</p></div></div>)}</div></div></section>
    <section className="section"><div className="container asymmetry"><div className="blueprint" data-reveal><span className="blueprint-mark">04</span><span className="blueprint-coord a">LEARNING / METHOD</span><span className="blueprint-coord b">PRACTICE FIRST</span></div><div data-reveal><SectionLabel>Cara belajar</SectionLabel><h2 className="display" style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)', lineHeight: '.9', letterSpacing: '-.08em', margin: '18px 0 25px' }}>Pahami.<br />Coba.<br /><span style={{ color: 'var(--blue)' }}>Perbaiki.</span></h2><p className="body-copy">Cara belajar di bidang teknis tumbuh melalui pengulangan yang bermakna. Kesalahan menjadi bahan untuk membaca sistem dengan lebih teliti, bukan akhir dari proses.</p></div></div></section>
    <section className="container section-tight"><div className="cta-panel" data-reveal><h2>Kenali area yang<br /><span>ingin kamu pelajari.</span></h2><Link href="/pembelajaran" className="button-primary" data-testid="link-about-cta">Pembelajaran <ArrowRight size={15} /></Link></div></section>
  </>;
}

export function LearningPage() {
  return <><Seo title="Pembelajaran TJKT | SMKN 2 Lubuk Basung" description="Area kompetensi yang relevan dengan bidang Teknik Jaringan Komputer dan Telekomunikasi." /><PageHero eyebrow="02 / Pembelajaran" title={<>Apa yang akan<br /><em>kamu pelajari?</em></>} aside="Area di bawah ini adalah contoh bidang kompetensi yang relevan dengan TJKT—bukan daftar resmi mata pelajaran sekolah." />
    <section className="section"><div className="container learning-layout"><div className="learning-sticky" data-reveal><SectionLabel>Area kompetensi</SectionLabel><h2>Belajar<br />melihat<br /><span style={{ color: 'var(--blue)' }}>hubungan.</span></h2><p>Teknologi jaringan hadir sebagai sebuah sistem. Telusuri area yang saling terhubung di sepanjang jalur ini.</p></div><div className="timeline">{learningAreas.map((area) => <article className="timeline-item" key={area.number} data-reveal><span className="timeline-index">{area.number} / AREA TJKT</span><h3>{area.title}</h3><p>{area.description}</p><div className="timeline-tags">{area.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></div></section>
     <section className="section section-blue"><div className="container learning-note-grid"><div data-reveal><SectionLabel dark>Catatan untuk calon siswa</SectionLabel><h2 className="display" style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)', lineHeight: '.9', letterSpacing: '-.08em', margin: '18px 0 0' }}>Rasa ingin tahu<br /><span style={{ color: 'var(--yellow)' }}>adalah awal.</span></h2></div><p style={{ color: '#d7e2f4', lineHeight: 1.8, fontSize: 13, maxWidth: 380 }} data-reveal>Area kompetensi ini dapat menjadi peta awal untuk mencari hal yang paling membuatmu ingin mencoba. Detail pembelajaran dapat disesuaikan dan diperbarui oleh pengelola program.</p></div></section>
    <section className="container section-tight"><div className="cta-panel" data-reveal><h2>Temukan proses<br /><span>yang cocok untukmu.</span></h2><Link href="/fasilitas" className="button-primary" data-testid="link-learning-cta">Lihat fasilitas <ArrowRight size={15} /></Link></div></section>
  </>;
}

export function FacilitiesPage() {
  const [activeActivity, setActiveActivity] = useState(activities[0]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    if (!selectedMedia) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedMedia(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedMedia]);

  const openMedia = (item: MediaItem) => setSelectedMedia(item);

  return <><Seo title="Fasilitas & Kegiatan | TJKT SMKN 2 Lubuk Basung" description="Mengenal enam laboratorium dan contoh kegiatan praktik bidang TJKT." /><PageHero eyebrow="03 / Fasilitas & kegiatan" title={<>Ruang untuk<br /><em>mencoba.</em></>} aside="Dokumentasi ruang praktik dan kegiatan TJKT SMKN 2 Lubuk Basung, dari laboratorium komputer sampai perangkat jaringan." />
     <section className="section"><div className="container facility-hero-copy" data-reveal><SectionLabel>Laboratorium TJKT</SectionLabel><h2>Enam ruang.<br /><span>Banyak kemungkinan.</span></h2><p>Laboratorium adalah ruang untuk mengubah teori menjadi kebiasaan kerja: menyiapkan, menghubungkan, memeriksa, dan memperbaiki. Dokumentasi di bawah memperlihatkan ruang dan perangkat yang digunakan untuk belajar secara langsung.</p></div><div className="container lab-grid">{media.labs.map((lab, index) => <button type="button" className="lab-slot lab-button" style={{ '--lab-image': `url(${lab.fallback})` } as CSSProperties} key={lab.src} data-reveal onClick={() => openMedia(lab)} aria-label={`Perbesar dokumentasi ${lab.title}`} data-testid={`button-lab-${index + 1}`}><img className="slot-image" src={lab.src} alt={`Dokumentasi ${lab.title} TJKT`} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = lab.fallback; }} /><span className="lab-meta">LAB / 0{index + 1}</span><span className="lab-expand" aria-hidden="true"><Maximize2 size={14} /></span><span className="lab-title">{lab.title}</span><small>{lab.note}</small></button>)}</div></section>
     <section className="section-tight" style={{ background: 'var(--mist)' }}><div className="container"><SectionLabel>Kegiatan yang dapat dieksplorasi</SectionLabel><div className="activity-bar" style={{ marginTop: 28 }}>{activities.map((activity) => <button type="button" className={activeActivity === activity ? 'active' : ''} key={activity} onClick={() => setActiveActivity(activity)} aria-pressed={activeActivity === activity} data-testid={`button-activity-${activity.toLowerCase().replaceAll(' ', '-')}`}>{activity}</button>)}</div><div style={{ padding: '47px 0 0', maxWidth: 650 }} data-reveal><span className="mono" style={{ color: 'var(--blue)', fontSize: 11 }}>AKTIVITAS TERPILIH / {activeActivity.toUpperCase()}</span><h2 className="display" style={{ fontSize: 'clamp(2.3rem, 4.4vw, 4.8rem)', letterSpacing: '-.07em', lineHeight: .9, margin: '17px 0' }}>{activeActivity === 'Semua aktivitas' ? 'Belajar dengan ruang untuk bereksperimen.' : `${activeActivity}.`}</h2><p className="body-copy">Contoh kegiatan yang relevan dengan proses belajar TJKT. Foto di galeri menampilkan suasana ruang, perangkat, dan kolaborasi siswa.</p></div></div></section>
     <section className="section"><div className="container"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 25, flexWrap: 'wrap' }} data-reveal><div><SectionLabel>Galeri kegiatan</SectionLabel><h2 className="display" style={{ fontSize: 'clamp(2.7rem, 5vw, 5.3rem)', lineHeight: .9, letterSpacing: '-.08em', margin: '18px 0 0' }}>Ruang belajar<br /><span style={{ color: 'var(--blue)' }}>yang nyata.</span></h2></div><p className="body-copy" style={{ maxWidth: 260 }}>Dokumentasi kegiatan dan fasilitas TJKT dari SMKN 2 Lubuk Basung.</p></div><div className="lab-grid gallery-grid" style={{ marginTop: 48 }}>{media.gallery.map((item, index) => <button type="button" className={`lab-slot lab-button gallery-slot ${item.size}`} style={{ '--lab-image': `url(${item.fallback})` } as CSSProperties} key={item.src} data-reveal onClick={() => openMedia(item)} aria-label={`Perbesar dokumentasi ${item.title}`} data-testid={`button-gallery-${index + 1}`}><img className="slot-image" src={item.src} alt={`Dokumentasi ${item.title} TJKT`} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = item.fallback; }} /><span className="lab-meta">GALLERY / 0{index + 1}</span><span className="lab-expand" aria-hidden="true"><Maximize2 size={14} /></span><span className="lab-title">{item.title}</span><small>{item.note}</small></button>)}</div></div></section>
    <section className="container section-tight"><div className="cta-panel" data-reveal><h2>Lihat bagaimana<br /><span>TJKT terhubung.</span></h2><Link href="/kontak" className="button-primary" data-testid="link-facilities-cta">Prospek & kontak <ArrowRight size={15} /></Link></div></section>
     {selectedMedia && <div className="media-lightbox" role="dialog" aria-modal="true" aria-labelledby="media-lightbox-title" onClick={() => setSelectedMedia(null)}><div className="media-lightbox-card" onClick={(event) => event.stopPropagation()}><button type="button" className="media-lightbox-close" onClick={() => setSelectedMedia(null)} aria-label="Tutup dokumentasi" data-testid="button-close-media"><X size={19} /></button><img src={selectedMedia.src} alt={`Dokumentasi ${selectedMedia.title} TJKT`} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = selectedMedia.fallback; }} /><div className="media-lightbox-caption"><span className="mono">DOKUMENTASI TJKT</span><h2 id="media-lightbox-title">{selectedMedia.title}</h2><p>{selectedMedia.note}</p></div></div></div>}
   </>;
}

 export function ContactPage() {
  return <><Seo title="Prospek & Kontak | TJKT SMKN 2 Lubuk Basung" description="Informasi prospek bidang TJKT dan kontak SMKN 2 Lubuk Basung." /><PageHero eyebrow="04 / Prospek & kontak" title={<>Setelah TJKT,<br /><em>ke mana?</em></>} aside="Kenali contoh arah pengembangan bidang, lalu hubungi SMKN 2 Lubuk Basung melalui kanal yang tersedia." />
    <section className="section prospect-band"><div className="container"><SectionLabel>Eksplorasi karier</SectionLabel><h2>Bidang teknis<br />terus <span style={{ color: 'var(--blue)' }}>berkembang.</span></h2><div className="prospect-grid">{careers.slice(0, 3).map((career, index) => <article className="prospect-card" key={career.title} data-reveal><span className="mono">0{index + 1} / CONTOH ARAH</span><h3>{career.title}</h3><p>{career.description}</p></article>)}</div></div></section>
     <ContactSection />
    <section className="container section-tight"><div className="cta-panel" data-reveal><h2>Teknologi dimulai<br /><span>dengan pertanyaan.</span></h2><a href={`mailto:${site.email}`} className="button-primary" data-testid="link-contact-email-cta">Kirim email <ArrowRight size={15} /></a></div></section>
  </>;
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mailLink, setMailLink] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const subject = `Pertanyaan TJKT dari ${String(values.get('name') ?? '')}`;
    const body = `Nama: ${String(values.get('name') ?? '')}\nEmail: ${String(values.get('email') ?? '')}\nTopik: ${String(values.get('topic') ?? '')}\n\n${String(values.get('message') ?? '')}`;
    setMailLink(`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      form.reset();
    }, 420);
  };
  return <section id="hubungi-sekolah" className="section"><div className="container contact-layout"><div className="contact-intro" data-reveal><SectionLabel>Hubungi sekolah</SectionLabel><h2>Mulai dari<br /><span>percakapan.</span></h2><p>Untuk informasi lebih lanjut tentang SMKN 2 Lubuk Basung dan TJKT, gunakan kanal kontak yang tersedia.</p><div style={{ marginTop: 28 }}><ArrowLink href={site.youtubeUrl} external>Lihat video di YouTube</ArrowLink></div></div><div data-reveal><div className="contact-list"><a className="contact-row" href={`mailto:${site.email}`} data-testid="link-contact-email"><span className="contact-label"><Mail size={14} /> Email</span><span className="contact-value">{site.email}</span><ExternalLink size={14} /></a><a className="contact-row" href={`tel:${site.phone.replaceAll('-', '')}`} data-testid="link-contact-phone"><span className="contact-label"><Phone size={14} /> Telepon</span><span className="contact-value">{site.phone}</span><ExternalLink size={14} /></a><a className="contact-row" href={site.instagramUrl} target="_blank" rel="noreferrer" data-testid="link-contact-instagram"><span className="contact-label"><Instagram size={14} /> Instagram</span><span className="contact-value">{site.instagram}</span><ExternalLink size={14} /></a><a className="contact-row" href={site.youtubeUrl} target="_blank" rel="noreferrer" data-testid="link-contact-youtube"><span className="contact-label"><Youtube size={14} /> YouTube</span><span className="contact-value">Video TJKT</span><ExternalLink size={14} /></a></div><div className="contact-map-note" style={{ marginTop: 40 }}><MapPin size={25} strokeWidth={1.3} /><p>{site.address}<br /><br />Peta lokasi belum ditautkan karena URL Google Maps belum diverifikasi.</p></div></div><div className="contact-form-wrap" data-reveal><form className="contact-form" onSubmit={handleSubmit} data-testid="form-contact"><h3 className="contact-form-heading">Punya pertanyaan?<br /><span>Kirimkan di sini.</span></h3><div className="form-field"><label htmlFor="contact-name">Nama</label><input id="contact-name" name="name" type="text" placeholder="Nama siswa atau orang tua" required data-testid="input-contact-name" /></div><div className="form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" placeholder="nama@email.com" required data-testid="input-contact-email" /></div><div className="form-field"><label htmlFor="contact-topic">Topik</label><select id="contact-topic" name="topic" defaultValue="informasi" data-testid="select-contact-topic"><option value="informasi">Informasi TJKT</option><option value="penerimaan">Penerimaan siswa</option><option value="kunjungan">Kunjungan sekolah</option><option value="lainnya">Lainnya</option></select></div><div className="form-field"><label htmlFor="contact-message">Pesan</label><textarea id="contact-message" name="message" placeholder="Apa yang ingin kamu ketahui tentang TJKT?" required data-testid="textarea-contact-message" /></div><div className="form-actions"><button className="button-primary" type="submit" disabled={submitting} data-testid="button-submit-contact">{submitting ? 'Mengirim...' : 'Kirim pertanyaan'} <ArrowRight size={15} /></button>{submitted && <><p className="form-status" role="status" data-testid="status-contact-success">Pertanyaan siap dikirim melalui email sekolah.</p><a className="form-status-link" href={mailLink} data-testid="link-open-contact-email">Buka aplikasi email <ArrowRight size={13} /></a></>}</div></form></div></div></section>;
}

function RunningBand() {
  const items = [
    { label: 'TJKT' },
    { label: 'Jaringan Komputer' },
    { label: 'Telekomunikasi' },
    { label: 'MikroTik', logo: '/tech-logos/mikrotik.svg' },
    { label: 'Cisco', logo: '/tech-logos/cisco.svg' },
    { label: 'TP-Link', logo: '/tech-logos/tplink.svg' },
    { label: 'Ubiquiti', logo: '/tech-logos/ubiquiti.svg' },
    { label: 'Linux', logo: '/tech-logos/linux.svg' },
    { label: 'Debian', logo: '/tech-logos/debian.svg' },
  ];
  return <section className="running-band" data-direction="forward" aria-label="Terminologi TJKT" data-testid="band-running-tjkt">
    <div className="running-track">
      {items.map((item) => <span className="running-item" key={`primary-${item.label}`}>{item.logo && <img src={item.logo} alt="" aria-hidden="true" />}<strong>{item.label}</strong></span>)}
      {items.map((item) => <span className="running-item" aria-hidden="true" key={`duplicate-${item.label}`}>{item.logo && <img src={item.logo} alt="" />}<strong>{item.label}</strong></span>)}
    </div>
  </section>;
}

function StatementStrip() {
  return <section className="statement-strip" aria-label="Catatan singkat tentang TJKT">
    <div className="container statement-layout">
      <span className="statement-index">FIELD NOTE / 001</span>
      <p>Teknologi terasa dekat saat kita memahami hubungan yang membuatnya bekerja.</p>
      <span className="statement-arrow" aria-hidden="true"><ArrowDownRight size={19} /></span>
    </div>
  </section>;
}

function StorySection() {
  return <section className="story-section" aria-labelledby="story-title">
    <div className="container story-layout">
      <div className="story-copy">
        <SectionLabel>Tentang bidang</SectionLabel>
        <h2 id="story-title">Apa itu<br /><span>TJKT?</span></h2>
        <p>TJKT merupakan bidang keahlian yang mempelajari perancangan, implementasi, pengelolaan, dan pemeliharaan jaringan komputer serta sistem telekomunikasi.</p>
        <p>Di dalamnya, rasa ingin tahu bertemu dengan cara kerja yang terstruktur: mengamati, mencoba, menguji, lalu memperbaiki.</p>
        <ArrowLink href="/tentang">Kenali bidangnya</ArrowLink>
      </div>
      <div className="story-stage" aria-label="Empat fondasi bidang TJKT">
        <div className="story-orbit" aria-hidden="true" />
        <span className="story-word">Jaringan</span>
        <span className="story-word">Infrastruktur</span>
        <span className="story-word">Telekomunikasi</span>
        <span className="story-word">Keamanan</span>
        <div className="story-core" aria-hidden="true"><span>TJ<br />KT</span><small>FIELD / 01—04</small></div>
        <div className="story-progress" aria-hidden="true"><span className="story-progress-number">01</span><div className="story-progress-line"><span /></div><span>04</span></div>
      </div>
    </div>
  </section>;
}

function EcosystemBand() {
  const hardware = [
    { label: 'MikroTik', logo: '/tech-logos/mikrotik.svg' },
    { label: 'Cisco', logo: '/tech-logos/cisco.svg' },
    { label: 'TP-Link', logo: '/tech-logos/tplink.svg' },
    { label: 'Ubiquiti', logo: '/tech-logos/ubiquiti.svg' },
  ];
  const software = [
    { label: 'Linux', logo: '/tech-logos/linux.svg' },
    { label: 'Debian', logo: '/tech-logos/debian.svg' },
  ];
  return <section className="ecosystem-section" aria-labelledby="ecosystem-title">
    <div className="container">
      <div className="ecosystem-heading">
        <div><SectionLabel dark>Referensi teknologi</SectionLabel><h2 id="ecosystem-title">Mengenal <span>ekosistemnya.</span></h2></div>
        <p className="ecosystem-note">Contoh teknologi dan perangkat yang umum ditemui dalam konteks pembelajaran jaringan dan telekomunikasi. Bukan daftar kemitraan sekolah.</p>
      </div>
      <div className="ecosystem-rail">
        <div className="ecosystem-group" data-reveal><span className="ecosystem-group-label">NETWORK HARDWARE</span><div className="ecosystem-list">{hardware.map((brand) => <div className="ecosystem-brand" key={brand.label}><img src={brand.logo} alt="" aria-hidden="true" /><span>{brand.label}</span></div>)}</div></div>
        <div className="ecosystem-group" data-reveal><span className="ecosystem-group-label">SOFTWARE / OPERATING SYSTEM</span><div className="ecosystem-list">{software.map((brand) => <div className="ecosystem-brand" key={brand.label}><img src={brand.logo} alt="" aria-hidden="true" /><span>{brand.label}</span></div>)}</div></div>
      </div>
      <p className="ecosystem-footnote">EKOSISTEM TEKNOLOGI TJKT / REPRESENTASI EDUKASIONAL NETRAL</p>
    </div>
  </section>;
}

function PageHero({ eyebrow, title, aside }: { eyebrow: string; title: ReactNode; aside: string }) {
  return <section className="page-hero"><span className="page-hero-coordinate page-hero-coordinate-top">SMKN2 / TJKT / 2026</span><span className="page-hero-coordinate page-hero-coordinate-bottom">FIELD NOTE / OPEN DAY</span><div className="container page-hero-grid"><div data-reveal><SectionLabel dark>{eyebrow}</SectionLabel><h1>{title}</h1></div><p className="page-hero-side" data-reveal>{aside}</p></div></section>;
}