export const site = {
  name: 'OIKKA Isshin Ryu Karate Chile',
  shortName: 'OIKKA Chile',
  tagline: 'Okinawa Isshin Ryu Karate Kobudo Association en Chile',
  cta: {
    label: 'Conocer escuelas',
    href: '#escuelas',
  },
}

export const navLinks = [
  { label: 'Escuelas', href: '#escuelas' },
  { label: 'Etapas', href: '#etapas' },
  { label: 'OIKKA', href: '#oikka' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
] as const

export const hero = {
  brand: 'OIKKA Chile',
  title: 'Isshin Ryu Karate y Kobudo en Chile',
  subtitle:
    'Escuela de un solo corazón. Formación integral para niños, jóvenes y adultos en dojos afiliados a OIKKA.',
  image: '/images/hero.jpg',
  imageAlt: 'Práctica de Karate Isshin Ryu',
}

export const schools = [
  {
    id: 'temuco',
    name: 'Isshin Akira Kan',
    city: 'Temuco',
    lead: 'Kyoshi Carlos Alvear Torres',
    website: 'https://isshinryutemuco.cl/',
    websiteLabel: 'isshinryutemuco.cl',
    email: 'sensei.alvear@isshinryutemuco.cl',
    emailHref: 'mailto:sensei.alvear@isshinryutemuco.cl',
  },
  {
    id: 'los-angeles',
    name: 'Dojo Bushin Kan',
    city: 'Los Ángeles',
    lead: 'Sempai Cristian Jarpa Bucher',
    website: 'https://www.facebook.com/Bushinkan-Isshinryu-Los-Angeles-180054852499678/',
    websiteLabel: 'Facebook Bushinkan',
    email: 'bushinkanlosangeles@gmail.com',
    emailHref: 'mailto:bushinkanlosangeles@gmail.com',
  },
  {
    id: 'concepcion',
    name: 'Dojo ShingiTai',
    city: 'San Pedro de la Paz, Concepción',
    lead: 'Sempai Marisol Belmar',
    website: 'https://www.facebook.com/Isshin-Ryu-Shingitai-Dojo-Oikka-1941154012602599/',
    websiteLabel: 'Facebook ShingiTai',
    email: 'marisol.belmar.karate@gmail.com',
    emailHref: 'mailto:marisol.belmar.karate@gmail.com',
  },
] as const

export const stages = [
  {
    id: 'infantil',
    title: 'Etapa Infantil',
    text: 'Se enseña a través de actividades lúdicas, estimulando el desarrollo psicomotriz en actividades individuales y grupales, y creando hábitos de conducta y valores (disciplina y respeto) para formarse como persona íntegra a través del Karate.',
  },
  {
    id: 'adolescente',
    title: 'Etapa Adolescente',
    text: 'Fomenta valores como personalidad, perseverancia, pasión y compañerismo; potencia el estado físico frente al sedentarismo; y desarrolla habilidades técnicas de Karate aplicables a situaciones reales en un entorno controlado.',
  },
  {
    id: 'adulta',
    title: 'Etapa Adulta',
    text: 'Trabaja resiliencia, liderazgo y autocontrol; mejora la preparación física general y específica; fortalece el cuerpo y el sistema cardiorrespiratorio con preparación técnica y teórica.',
  },
  {
    id: 'competitiva',
    title: 'Etapa Competitiva',
    text: 'Fomenta la sana competencia, trabaja capacidades individuales según técnicas y limitaciones propias, y desarrolla habilidades tácticas.',
  },
] as const

export const oikka = {
  title: 'O.I.K.K.A.',
  fullName: 'Okinawa Isshin Ryu Karate Kobudo Association',
  world: {
    name: 'Kaicho Christopher Chase',
    role: 'Director mundial',
    href: 'http://www.oikka.com/',
    hrefLabel: 'oikka.com',
  },
  history:
    'La OIKKA se establece en 1990 por el Maestro Angi Uezu. A partir del 1 de febrero de 2007, el Maestro Uezu nombra al Maestro Christopher Chase como su sucesor y Presidente de la OIKKA. El Maestro Uezu sigue activo como Presidente Emérito y Asesor Especial.',
  isshinryu:
    'Isshin Ryu (“un corazón / una mente”) fue formalmente introducido en 1953 por el Maestro Tatsuo Shimabuku de Okinawa, Japón. Soke Shimabuku estudió Shorin-Ryu bajo Choki Motobu y Chotoku Kyan, reforzó su práctica con Chojun Miyagi (Goju Ryu) y estudió armas (Bo, Sai, Tonfa, Nunchaku) con Shinken Taira. Isshin Ryu combina lo mejor de estos linajes en el karate rápido y preciso de Okinawa.',
}

export const gallery = [
  { src: '/images/gallery-1.jpg', alt: 'Entrenamiento Isshin Ryu' },
  { src: '/images/gallery-2.jpg', alt: 'Práctica en el dojo' },
  { src: '/images/gallery-3.jpg', alt: 'Karate y Kobudo' },
  { src: '/images/gallery-4.jpg', alt: 'Comunidad OIKKA Chile' },
] as const

export const contact = {
  title: 'Contacto',
  text: 'Escríbenos para conocer la escuela más cercana o coordinar una clase de prueba.',
  email: {
    label: 'contacto@isshinryutemuco.cl',
    href: 'mailto:contacto@isshinryutemuco.cl',
  },
  facebook: {
    label: 'Facebook OIKKA',
    href: 'https://www.facebook.com/Okinawa-Isshinryu-Karate-Kobudo-Association-OIKKA-181412761882478/',
  },
}

export const footer = {
  note: 'Okinawa Isshin Ryu Karate Kobudo Association — Chile',
}
