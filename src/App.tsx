import { useEffect, useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import xenonHero from "@/imports/ChatGPT_Image_18_de_set._de_2026__10_43_35.png";

const SELLERS = [
  {
    name: "Gabriel",
    role: "Consultor de vendas",
    phone: "5511961324902",
  },
  {
    name: "Thamires",
    role: "Consultora de vendas",
    phone: "5511914977703",
  },
];

const INSTAGRAM_URL = "https://www.instagram.com/multimarcasxenon/";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Av.+Marechal+Tito,+2012";

const whatsappMessage = (vehicle?: string) =>
  vehicle
    ? `Olá! Tenho interesse no ${vehicle}. Gostaria de saber mais informações.`
    : "Olá, me interessei em um dos seus veículos! Entrei em contato pois gostaria de mais informações.";

const whatsappUrl = (phone: string, vehicle?: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage(vehicle))}`;

const cars = [
  {
    name: "Hyundai Tucson GLS 2.0",
    price: "Consulte a equipe",
    year: "2013",
    km: "127.000 km",
    motor: "2.0 16V Flex, 4 cilindros",
    cambio: "Automático de 4 velocidades",
    potencia: "142 cv (E) / 135 cv (G)",
    portaMalas: "325 L",
    consumo: "7,0 km/l cidade / 8,5 km/l estrada (gasolina)",
    tanque: "65 L",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Ford EcoSport 1.5",
    year: "2018",
    km: "63.341 km",
    motor: "1.5 Ti-VCT Flex, 3 cilindros, 12V",
    cambio: "Manual de 5 velocidades / Automático de 6 velocidades",
    potencia: "137 cv (E) / 130 cv (G)",
    portaMalas: "356 L",
    consumo: "Manual: 8,3 km/l (E) / 11,6 km/l (G) na cidade",
    tanque: "52 L",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Chevrolet Corsa Maxx 1.4",
    year: "2012",
    km: "159.000 km",
    motor: "1.4 MPFI Econoflex, 4 cilindros, 8V",
    cambio: "Manual de 5 velocidades",
    potencia: "105 cv (E) / 99 cv (G)",
    portaMalas: "260 L",
    consumo: "6,7 km/l (E) / 10,2 km/l (G) cidade; 8,3 / 12,8 estrada",
    tanque: "44 L",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Volkswagen CrossFox 1.6 Mi",
    price: "Consulte a equipe",
    year: "2013",
    km: "129.634 km",
    motor: "1.6 Flex, 4 cilindros, 8V multiponto",
    cambio: "Manual de 5 velocidades",
    potencia: "104 cv (E) / 101 cv (G)",
    portaMalas: "260 L",
    consumo: "6,0 km/l (E) / 8,9 km/l (G) cidade; 7,7 / 11,4 estrada",
    tanque: "50 L",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Volkswagen Gol 1.0 MPI Totalflex",
    year: "2022/2023",
    km: "a informar",
    motor: "1.0 12V MPI Totalflex",
    cambio: "Manual de 5 velocidades",
    potencia: "84 cv (E) / 77 cv (G)",
    portaMalas: "285 L",
    consumo: "9,4 km/l (E) / 13,7 km/l (G) cidade; 10,7 / 15,2 estrada",
    tanque: "55 L",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Honda HR-V Touring 1.5 Turbo",
    price: "Consulte a equipe",
    year: "2024",
    km: "67.000 km",
    motor: "1.5 DI VTEC Turbo Flex, 4 cilindros, 16V, injeção direta",
    cambio: "CVT com 7 marchas simuladas e paddle shifts",
    potencia: "177 cv (E/G)",
    portaMalas: "354 L",
    consumo: "7,9 km/l (E) / 11,3 km/l (G) cidade; 8,8 / 12,6 estrada",
    tanque: "50 L",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Peugeot 2008 Allure 1.6",
    price: "Consulte a equipe",
    year: "2017",
    km: "101.800 km",
    motor: "1.6 16V Flex",
    cambio: "Automático sequencial de 4 velocidades",
    potencia: "122 cv (E) / 115 cv (G)",
    portaMalas: "355 L",
    consumo: "6,8 km/l (E) / 9,4 km/l (G) cidade; 7,9 / 11,0 estrada",
    tanque: "55 L",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Citroën C3 Tendance 1.5",
    price: "Consulte a equipe",
    year: "2013",
    km: "163.601 km",
    motor: "1.5 Flex",
    cambio: "Manual de 5 velocidades",
    potencia: "93 cv (E) / 89 cv (G)",
    portaMalas: "300 L",
    consumo: "7,5 km/l (E) / 11,9 km/l (G) cidade; 9,3 / 14,7 estrada",
    tanque: "55 L",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Citroën C3 Live 1.0",
    price: "Consulte a equipe",
    year: "2024/2025",
    km: "89.498 km",
    motor: "1.0 Flex",
    cambio: "Manual de 5 velocidades",
    potencia: "75 cv (E) / 71 cv (G)",
    portaMalas: "315 L",
    consumo: "9,3 km/l (E) / 13,0 km/l (G) cidade; 10,0 / 14,6 estrada",
    tanque: "47 L",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Volkswagen Space Cross 1.6 MSI",
    price: "Consulte a equipe",
    year: "2015/2016",
    km: "171.000 km",
    motor: "1.6 MSI 16V Flex",
    cambio: "Manual de 6 velocidades",
    potencia: "120 cv (E) / 110 cv (G)",
    portaMalas: "440 L",
    consumo: "7,0 km/l (E) / 10,0 km/l (G) cidade; 7,5 / 11,1 estrada",
    tanque: "50 L",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Toyota Corolla XEi 2.0",
    price: "Consulte a equipe",
    year: "2012",
    km: "131.800 km",
    motor: "2.0 16V Flex",
    cambio: "Automático sequencial de 4 velocidades",
    potencia: "153 cv (E) / 142 cv (G)",
    portaMalas: "470 L",
    consumo: "6,7 km/l (E) / 8,7 km/l (G) cidade; 9,4 / 12,2 estrada",
    tanque: "60 L",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Chevrolet Vectra Elegance 2.0",
    price: "Consulte a equipe",
    year: "2009",
    km: "191.000 km",
    motor: "2.0 MPFI 8V Flex",
    cambio: "Manual de 5 velocidades",
    potencia: "140 cv (E) / 133 cv (G)",
    portaMalas: "526 L",
    consumo: "5,9 km/l (E) / 8,4 km/l (G) cidade; 7,9 / 11,4 estrada",
    tanque: "58 L",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Chevrolet Onix Joy 1.0",
    price: "Consulte a equipe",
    year: "2019",
    km: "93.018 km",
    motor: "1.0 MPFI 8V Flex",
    cambio: "Manual de 6 velocidades",
    potencia: "80 cv (E) / 78 cv (G)",
    portaMalas: "289 L",
    consumo: "9,1 km/l (E) / 12,9 km/l (G) cidade; 10,8 / 15,3 estrada",
    tanque: "54 L",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Hyundai HB20 1.0",
    price: "Consulte a equipe",
    year: "2013",
    km: "141.000 km",
    motor: "1.0 Flex",
    cambio: "Manual de 5 velocidades",
    potencia: "80 cv (E) / 75 cv (G)",
    portaMalas: "300 L",
    consumo: "7,6 km/l (E) / 11,5 km/l (G) cidade; 9,8 / 14,5 estrada",
    tanque: "50 L",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Citroën Aircross GLX 1.6",
    price: "Consulte a equipe",
    year: "a informar",
    km: "131.000 km",
    motor: "1.6 16V Flex",
    cambio: "Automático de 4 velocidades",
    potencia: "122 cv (E) / 115 cv (G)",
    portaMalas: "403 L",
    consumo: "5,9 km/l (E) / 8,4 km/l (G) cidade; 7,4 / 10,7 estrada",
    tanque: "55 L",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Hyundai HB20S Comfort Plus 1.0",
    price: "Consulte a equipe",
    year: "2025",
    km: "72.000 km",
    motor: "1.0 Flex",
    cambio: "Manual de 5 velocidades",
    potencia: "80 cv (E) / 75 cv (G)",
    portaMalas: "475 L",
    consumo: "9,7 km/l (E) / 13,4 km/l (G) cidade; 10,9 / 15,4 estrada",
    tanque: "50 L",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Chevrolet Cruze LT 1.8",
    price: "Consulte a equipe",
    year: "2015",
    km: "152.000 km",
    motor: "1.8 16V Flex, 4 cilindros, aspirado, injeção multiponto",
    cambio: "Automático de 6 velocidades",
    potencia: "144 cv (E) / 140 cv (G)",
    portaMalas: "450 L",
    consumo: "6,6 km/l (E) / 8,6–9,1 km/l (G) cidade; 9,1–9,3 / 11,8–12,1 estrada",
    tanque: "60 L",
    image: "https://images.unsplash.com/photo-1532932497843-4f50dba7b2c5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Volkswagen SpaceFox",
    price: "Consulte a equipe",
    year: "2013",
    km: "156.158 km",
    motor: "1.6 Flex",
    cambio: "Manual de 5 velocidades",
    potencia: "104 cv (E) / 101 cv (G)",
    portaMalas: "430 L",
    consumo: "7,2 km/l (E) / 9,4 km/l (G) cidade; 10,1 / 13,1 estrada",
    tanque: "50 L",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Ford Fiesta 1.0",
    price: "Consulte a equipe",
    year: "2012",
    km: "128.000 km",
    motor: "1.0 Flex",
    cambio: "Manual",
    potencia: "a informar",
    portaMalas: "a informar",
    consumo: "a informar",
    tanque: "a informar",
    image: "https://images.unsplash.com/photo-1541443131876-44f03f8c9b6d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Chevrolet Captiva 3.0 V6 AWD",
    price: "Consulte a equipe",
    year: "2011",
    km: "100.800 km",
    motor: "3.0 V6 24V aspirado, gasolina, injeção direta",
    cambio: "Automático de 6 velocidades com Active Select",
    potencia: "268 cv",
    portaMalas: "383 L",
    consumo: "aprox. 6,0 km/l cidade / 8,6 km/l estrada",
    tanque: "63 L",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
  },
];

const gallery = [
  {
    src: xenonHero,
    alt: "Carro esportivo preto sob luzes laranjas da Xenon Multimarcas",
  },
  {
    src: "https://images.unsplash.com/photo-1577473403731-a36ec9087f44?auto=format&fit=crop&w=1400&q=85",
    alt: "Supercarro laranja em destaque",
  },
  {
    src: "https://images.unsplash.com/photo-1515871401659-95f03af5fb36?auto=format&fit=crop&w=1400&q=85",
    alt: "Detalhe da roda de um carro esportivo",
  },
  {
    src: "https://images.unsplash.com/photo-1627656958549-cce472c53a94?auto=format&fit=crop&w=1400&q=85",
    alt: "Carro esportivo estacionado",
  },
];

function Icon({
  name,
  size = 20,
}: {
  name: "arrow" | "check" | "close" | "menu" | "pin" | "whatsapp";
  size?: number;
}) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4.2a8.5 8.5 0 1 1 15.8-4.3Z" />
        <path d="M8.4 7.7c.5 3.5 2.4 5.4 5.9 5.9" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function WhatsAppLink({
  children,
  vehicle,
  seller = SELLERS[0],
  className = "",
}: {
  children: React.ReactNode;
  vehicle?: string;
  seller?: (typeof SELLERS)[number];
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(seller.phone, vehicle)}
      className={className}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCar(null);
        setLightbox(null);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const nav = [
    ["Início", "#inicio"],
    ["Sobre", "#sobre"],
    ["Estoque", "#estoque"],
    ["Galeria", "#galeria"],
    ["Contato", "#contato"],
  ];

  return (
    <main className="site-shell">
      <header className="header">
        <a href="#inicio" className="brand" aria-label="Xenon Multimarcas">
          <span className="brand-mark">X</span>
          <span>
            XENON
            <small>MULTIMARCAS</small>
          </span>
        </a>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Principal">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <WhatsAppLink className="button button-small">
            <Icon name="whatsapp" size={18} />
            Falar no WhatsApp
          </WhatsAppLink>
        </nav>
        <button
          className="menu-button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={26} />
        </button>
      </header>

      <section id="inicio" className="hero">
        <ImageWithFallback
          src={xenonHero}
          alt="Carro esportivo preto da Xenon Multimarcas em cenário noturno"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow">Compra • Venda • Troca • Financia</div>
          <h1>
            Seu próximo carro
            <span>começa aqui.</span>
          </h1>
          <p>
            Veículos selecionados, atendimento transparente e uma experiência
            feita para você dirigir sua melhor escolha.
          </p>
          <div className="hero-actions">
            <a href="#estoque" className="button">
              Ver nossos carros <Icon name="arrow" />
            </a>
            <WhatsAppLink className="button button-ghost">
              <Icon name="whatsapp" /> Falar no WhatsApp
            </WhatsAppLink>
          </div>
        </div>
        <a className="scroll-cue" href="#sobre">
          <span>Descubra</span>
          <span className="scroll-line" />
        </a>
      </section>

      <section id="sobre" className="section about">
        <div>
          <div className="section-kicker">Sobre a Xenon</div>
          <h2>Confiança para fazer um bom negócio.</h2>
        </div>
        <div className="about-copy">
          <p>
            Na Xenon Multimarcas você encontra veículos selecionados,
            atendimento personalizado e facilidade para encontrar o carro ideal
            para você.
          </p>
          <div className="trust-list">
            {["Veículos selecionados", "Atendimento personalizado", "Negociação transparente"].map(
              (item) => (
                <span key={item}>
                  <i>
                    <Icon name="check" size={16} />
                  </i>
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="estoque" className="section stock">
        <div className="section-heading">
          <div>
            <div className="section-kicker">Nosso estoque</div>
            <h2>Escolha o seu próximo carro.</h2>
          </div>
          <p>Novas oportunidades chegando. Consulte nossa equipe.</p>
        </div>
        <div className="car-grid">
          {cars.map((car, index) => (
            <article className="car-card" key={index}>
              <button
                className="car-image-button"
                onClick={() => setSelectedCar(index)}
                aria-label={`Ver detalhes: ${car.name}`}
              >
                <ImageWithFallback
                  src={car.image}
                  alt="Foto ilustrativa de veículo; estoque em atualização"
                  className="car-image"
                />
                <span className="status">Disponível</span>
              </button>
              <div className="car-info">
                <div className="car-title">
                  <div>
                    <small>{car.year}</small>
                    <h3>{car.name}</h3>
                  </div>
                  <button onClick={() => setSelectedCar(index)} aria-label="Abrir detalhes">
                    <Icon name="arrow" />
                  </button>
                </div>
                <div className="specs">
                  <span>Km: {car.km}</span>
                  <span>Motor: {car.motor}</span>
                  <span>Câmbio: {car.cambio}</span>
                  <span>Potência: {car.potencia}</span>
                </div>
                <div className="price-row">
                  <div>
                    <small>Valor</small>
                    <strong>{car.price ?? "Consulte a equipe"}</strong>
                  </div>
                  <WhatsAppLink vehicle={car.name} className="interest">
                    Tenho interesse
                  </WhatsAppLink>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="editor-note">
          Consulte nossa equipe para disponibilidade, condições e demais informações de cada veículo.
        </p>
      </section>

      <section id="galeria" className="section gallery-section">
        <div className="section-heading">
          <div>
            <div className="section-kicker">Galeria</div>
            <h2>Detalhes que despertam desejo.</h2>
          </div>
          <p>Clique em uma imagem para ampliar.</p>
        </div>
        <div className="gallery">
          {gallery.map((photo, index) => (
            <button
              key={index}
              className={`gallery-item gallery-item-${index + 1}`}
              onClick={() => setLightbox(index)}
              aria-label={`Ampliar imagem ${index + 1}`}
            >
              <ImageWithFallback src={photo.src} alt={photo.alt} />
              <span>Ver foto <Icon name="arrow" size={17} /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="section team">
        <div className="section-kicker">Atendimento personalizado</div>
        <h2>Fale com nossa equipe.</h2>
        <p>Conte com quem entende para encontrar a opção certa para você.</p>
        <div className="team-grid">
          {SELLERS.map((seller) => (
            <div className="team-card" key={seller.phone}>
              <div className="avatar-placeholder">{seller.name.charAt(0)}</div>
              <div>
                <small>{seller.role}</small>
                <h3>{seller.name}</h3>
              </div>
              <WhatsAppLink seller={seller} className="button">
                <Icon name="whatsapp" /> Falar pelo WhatsApp
              </WhatsAppLink>
            </div>
          ))}
        </div>
      </section>

      <section id="instagram" className="instagram">
        <div className="insta-orbit">X</div>
        <div className="section-kicker">Acompanhe as novidades</div>
        <h2>Siga a Xenon Multimarcas.</h2>
        <p>Novos veículos, oportunidades e bastidores em um só lugar.</p>
        <a href={INSTAGRAM_URL} className="button button-light">
          Ver Instagram <Icon name="arrow" />
        </a>
      </section>

      <section id="localizacao" className="section location">
        <div className="location-info">
          <div className="section-kicker">Onde estamos</div>
          <h2>Venha conhecer a Xenon.</h2>
          <div className="location-row">
            <Icon name="pin" size={25} />
            <div>
              <small>Endereço</small>
              <strong>Av. Marechal Tito, 2012</strong>
              <span>Consulte a rota pelo Google Maps</span>
            </div>
          </div>
          <div className="location-row">
            <span className="clock">08</span>
            <div>
              <small>Horário de atendimento</small>
              <strong>Todos os dias, das 08:00 às 18:00</strong>
            </div>
          </div>
          <a href={MAPS_URL} className="button">
            Como chegar <Icon name="arrow" />
          </a>
        </div>
        <div className="map-placeholder">
          <div className="map-grid" />
          <i><Icon name="pin" size={32} /></i>
          <strong>Av. Marechal Tito, 2012</strong>
          <span>Abra o Google Maps para traçar sua rota</span>
        </div>
      </section>

      <footer id="contato" className="footer">
        <div className="footer-main">
          <div>
            <a href="#inicio" className="brand">
              <span className="brand-mark">X</span>
              <span>XENON<small>MULTIMARCAS</small></span>
            </a>
            <p>Seu próximo carro começa aqui.</p>
          </div>
          <div className="footer-links">
            <div><small>WhatsApp Gabriel</small><strong>(11) 96132-4902</strong></div>
            <div><small>WhatsApp Thamires</small><strong>(11) 91497-7703</strong></div>
            <div><small>Instagram</small><strong>@multimarcasxenon</strong></div>
            <div><small>Localização</small><strong>Av. Marechal Tito, 2012</strong></div>
            <div><small>Funcionamento</small><strong>08:00 às 18:00</strong></div>
          </div>
          <WhatsAppLink className="button">
            <Icon name="whatsapp" /> Fale com a gente
          </WhatsAppLink>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Xenon Multimarcas.</span>
          <span>Compra • Venda • Troca • Financia</span>
        </div>
      </footer>

      <WhatsAppLink className="floating-whatsapp">
        <Icon name="whatsapp" size={25} />
        <span>WhatsApp</span>
      </WhatsAppLink>

      {selectedCar !== null && (
        <div className="modal-backdrop" onClick={() => setSelectedCar(null)}>
          <section className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCar(null)}>
              <Icon name="close" />
            </button>
            <ImageWithFallback
              src={cars[selectedCar].image}
              alt="Foto ilustrativa do veículo"
            />
            <div className="modal-copy">
              <div className="section-kicker">Detalhes do veículo</div>
              <h2>{cars[selectedCar].name}</h2>
              <div className="modal-price">{cars[selectedCar].price ?? "Consulte a equipe"}</div>
              <div className="specs modal-specs">
                <span>Ano: {cars[selectedCar].year}</span>
                <span>Km: {cars[selectedCar].km}</span>
                <span>Motor: {cars[selectedCar].motor}</span>
                <span>Câmbio: {cars[selectedCar].cambio}</span>
                <span>Potência: {cars[selectedCar].potencia}</span>
                <span>Porta-malas: {cars[selectedCar].portaMalas}</span>
                <span>Consumo: {cars[selectedCar].consumo}</span>
                <span>Tanque: {cars[selectedCar].tanque}</span>
              </div>
              <p>Fale com nossa equipe para confirmar disponibilidade e receber mais informações sobre este veículo.</p>
              <WhatsAppLink vehicle={cars[selectedCar].name} className="button">
                <Icon name="whatsapp" /> Consultar no WhatsApp
              </WhatsAppLink>
            </div>
          </section>
        </div>
      )}

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="modal-close" onClick={() => setLightbox(null)}>
            <Icon name="close" size={24} />
          </button>
          <button
            className="lightbox-arrow lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((lightbox - 1 + gallery.length) % gallery.length);
            }}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <ImageWithFallback
            src={gallery[lightbox].src}
            alt={gallery[lightbox].alt}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            className="lightbox-arrow lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((lightbox + 1) % gallery.length);
            }}
            aria-label="Próxima foto"
          >
            ›
          </button>
          <span>{lightbox + 1} / {gallery.length}</span>
        </div>
      )}
    </main>
  );
}
