import { assetUrl } from './lib/paths'

export const site = {
  name: 'OIKKA Isshin Ryu Karate Chile',
  shortName: 'OIKKA Chile',
  tagline: 'Okinawa Isshin Ryu Karate Kobudo Association en Chile',
}

export const navLinks = [
  { label: 'Escuelas', href: '/#escuelas' },
  { label: 'OIKKA', href: '/#oikka' },
  { label: 'Linaje', href: '/#linaje' },
  { label: 'Videos', href: '/#videos' },
  { label: 'Historia', href: '/historia-y-biografias' },
  { label: 'Galería', href: '/#galeria' },
  { label: 'Contacto', href: '/#contacto' },
] as const

export const hero = {
  brand: 'OIKKA Chile',
  title: 'Isshin Ryu Karate y Kobudo en Chile',
  subtitle:
    'Escuela de un solo corazón. Formación integral para niños, jóvenes y adultos en dojos afiliados a OIKKA.',
  image: assetUrl('images/hero.jpg'),
  imageAlt: 'Práctica de Karate Isshin Ryu',
}

/** Carrusel del hero: al menos estos 4 ejes de comunicación */
export const heroSlides = [
  {
    id: 'eventos',
    kicker: 'Eventos',
    title: 'Encuentros, exámenes y torneos',
    text: 'Calendario de actividades entre dojos: seminarios, graduaciones y competencia sana al estilo Okinawa.',
  },
  {
    id: 'noticias',
    kicker: 'Noticias',
    title: 'Lo que pasa en la asociación',
    text: 'Avisos de las escuelas, logros de alumnos y novedades de la familia OIKKA en Chile.',
  },
  {
    id: 'representacion',
    kicker: 'Representación',
    title: 'La escuela en el país',
    text: 'Dojos afiliados que representan a OIKKA Isshin Ryu con el mismo espíritu: un solo corazón, una sola mente.',
  },
  {
    id: 'publico',
    kicker: 'Público objetivo',
    title: 'Para toda la familia',
    text: 'Niños, jóvenes y adultos: entrenamiento adaptado a cada etapa, con disciplina, respeto y comunidad.',
  },
] as const

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
    lead: 'Sensei Cristian Jarpa Bucher',
    website: 'https://www.facebook.com/Bushinkan-Isshinryu-Los-Angeles-180054852499678/',
    websiteLabel: 'Facebook Bushinkan',
    email: 'bushinkanlosangeles@gmail.com',
    emailHref: 'mailto:bushinkanlosangeles@gmail.com',
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
    'La OIKKA se establece en 1990 por el Maestro Angi Uezu. A partir del 1 de febrero de 2007, el Maestro Uezu nombra al Maestro Christopher Chase como su sucesor y Presidente de la OIKKA. El Maestro Uezu sirvió como Presidente Emérito y Asesor Especial hasta su fallecimiento en 2024; su legado sigue guiando a la asociación.',
  isshinryu:
    'Isshin Ryu (“un corazón / una mente”) fue formalmente introducido en 1953 por el Maestro Tatsuo Shimabuku de Okinawa, Japón. Soke Shimabuku estudió Shorin-Ryu bajo Choki Motobu y Chotoku Kyan, reforzó su práctica con Chojun Miyagi (Goju Ryu) y estudió armas (Bo, Sai, Tonfa, Nunchaku) con Shinken Taira. Isshin Ryu combina lo mejor de estos linajes en el karate rápido y preciso de Okinawa.',
  mission: {
    title: 'Misión',
    text: 'Difundir y preservar el Isshin Ryu Karate y Kobudo de Okinawa en Chile, formando personas íntegras a través de la práctica seria, el respeto mutuo y el vínculo entre dojos afiliados a OIKKA.',
  },
  vision: {
    title: 'Visión',
    text: 'Ser la referencia nacional de Isshin Ryu: una red de escuelas unidas por el mismo corazón técnico y ético, abiertas a la comunidad y conectadas con la dirección mundial de OIKKA.',
  },
  identity: {
    title: 'Identidad',
    text: 'Isshin Ryu significa “escuela de un solo corazón”. En cada dojo OIKKA Chile cultivamos disciplina, humildad y perseverancia: el keiko diario une cuerpo, mente y carácter, con el sello de Okinawa y el respaldo de la asociación.',
  },
}

/** Árbol de linaje (basado en el diagrama de Angi Uezu) */
export type LineageNode = {
  id: string
  name: string
  years?: string
  style?: string
  note?: string
  yearLink?: string
}

export const lineageIntro =
  'Linaje que alimenta Isshin Ryu: de China y Okinawa hasta el Maestro Tatsuo Shimabuku y su discípulo Angi Uezu. Explora el mapa a pantalla completa: arrastra, haz zoom y elige un maestro.'

export type LineageEdge = { id: string; source: string; target: string; label?: string }

/** Conexiones del árbol (diagrama Angi Uezu) */
export const lineageEdges: LineageEdge[] = [
  { id: 'e-damura-yara', source: 'damura', target: 'yara' },
  { id: 'e-kusanku-yara', source: 'kusanku', target: 'yara' },
  { id: 'e-yara-sakagawa', source: 'yara', target: 'sakagawa' },
  { id: 'e-sakagawa-matsumura', source: 'sakagawa', target: 'matsumura' },
  { id: 'e-matsumura-itosu', source: 'matsumura', target: 'itosu' },
  { id: 'e-matsumura-kiyan', source: 'matsumura', target: 'kiyan' },
  { id: 'e-matsumura-motobu', source: 'matsumura', target: 'motobu' },
  { id: 'e-higaonna-miyagi', source: 'higaonna', target: 'miyagi' },
  { id: 'e-motobu-shimabuku', source: 'motobu', target: 'shimabuku', label: '1922' },
  { id: 'e-miyagi-shimabuku', source: 'miyagi', target: 'shimabuku', label: '1922' },
  { id: 'e-kiyan-shimabuku', source: 'kiyan', target: 'shimabuku', label: '1923' },
  { id: 'e-taira-shimabuku', source: 'taira', target: 'shimabuku', label: '1958' },
  { id: 'e-shimabuku-uezu', source: 'shimabuku', target: 'uezu' },
]

/** Posiciones del layout (coordenadas del canvas React Flow) */
export const lineagePositions: Record<string, { x: number; y: number }> = {
  damura: { x: 420, y: 40 },
  kusanku: { x: 620, y: 220 },
  yara: { x: 220, y: 220 },
  sakagawa: { x: 420, y: 400 },
  matsumura: { x: 420, y: 580 },
  itosu: { x: 80, y: 760 },
  higaonna: { x: 760, y: 620 },
  motobu: { x: 40, y: 980 },
  miyagi: { x: 280, y: 980 },
  kiyan: { x: 560, y: 980 },
  taira: { x: 820, y: 980 },
  shimabuku: { x: 420, y: 1240 },
  uezu: { x: 420, y: 1480 },
}

export const lineageNodes: LineageNode[] = [
  {
    id: 'damura',
    name: 'Taishi Damura',
    years: '≈470–543',
    style: 'Shaolin · Sil Lum Chun Fa (China)',
    note: 'Raíz legendaria del linaje Shaolin asociada a los orígenes del vacío mano en Asia.',
  },
  {
    id: 'yara',
    name: 'Maestro Chatan Yara',
    style: 'Okinawa',
    note: 'Figura temprana del karate de Okinawa; puente entre influencias chinas y la isla.',
  },
  {
    id: 'kusanku',
    name: 'Maestro Kusanku',
    style: 'China',
    note: 'Maestro chino vinculado a Chatan Yara; su nombre vive en el kata Kusanku.',
  },
  {
    id: 'sakagawa',
    name: 'Maestro Tode Sakagawa',
    years: '1733–1815',
    style: 'Tode · Okinawa',
    note: 'Consolidó el “tode” en Okinawa; base de generaciones posteriores de Shuri-Te.',
  },
  {
    id: 'matsumura',
    name: 'Maestro Sokon Matsumura (Bushi)',
    years: '1808–1899',
    style: 'Shuri-Te',
    note: 'Bushi Matsumura: pilar del Shuri-Te y del karate clásico de Okinawa.',
  },
  {
    id: 'itosu',
    name: 'Maestro Itosu Yasutsune',
    years: '1831–1915',
    style: 'Shuri-Te',
    note: 'Sistematizó el karate para la enseñanza; influyó en el Shorin-Ryu moderno.',
  },
  {
    id: 'higaonna',
    name: 'Maestro Kanryo Higaonna',
    years: '1853–1916',
    style: 'Naha-Te · Tou-Te',
    note: 'Trajo métodos de respiración y Naha-Te desde Fujian (China).',
  },
  {
    id: 'motobu',
    name: 'Maestro Choki Motobu',
    years: '1871–1941',
    style: 'Shorin-Ryu (Tomari-Te, Shuri-Te)',
    note: 'Enseñó a Tatsuo Shimabuku. Combate práctico y Shorin-Ryu.',
    yearLink: '1922',
  },
  {
    id: 'miyagi',
    name: 'Maestro Chojun Miyagi',
    years: '1888–1953',
    style: 'Goju-Ryu (Naha-Te)',
    note: 'Fundador del Goju-Ryu. Shimabuku estudió con él en 1922.',
    yearLink: '1922',
  },
  {
    id: 'kiyan',
    name: 'Maestro Chotoku Kiyan',
    years: '1870–1945',
    style: 'Shorin-Ryu (Shuri-Te)',
    note: 'Maestro principal de Shimabuku en Shorin-Ryu (desde 1923).',
    yearLink: '1923',
  },
  {
    id: 'taira',
    name: 'Maestro Shinken Taira',
    years: '1897–1970',
    style: 'Ryukyu Kobudo',
    note: 'Armas de Okinawa (bo, sai, tonfa, nunchaku). Shimabuku estudió con él en 1958.',
    yearLink: '1958',
  },
  {
    id: 'shimabuku',
    name: 'Maestro Tatsuo Shimabuku',
    years: '1908–1975',
    style: 'Fundador de Isshin-Ryu (1953)',
    note: 'Abrió Isshin-Ryu Karate-Do en 1953, uniendo Shorin, Goju y Kobudo en “un solo corazón”.',
  },
  {
    id: 'uezu',
    name: 'Maestro Angi Uezu',
    years: '1935–2024',
    style: 'OIKKA · Isshin-Ryu',
    note: 'Yerno y alumno principal de Shimabuku. Fundó OIKKA (1990) y Junken Karate-Do (1992). Presidente Emérito hasta su fallecimiento en 2024.',
  },
]

export const videosIntro =
  'Clips históricos del Maestro Angi Uezu: kata, kihon y kobudo. Material de archivo para estudiar el Isshin Ryu de Okinawa.'

export const angiVideos = [
  {
    id: 'GPwsCzTbQ74',
    title: 'Angi Uezu · kata (archivo ~1980)',
    note: 'Reel Super 8 digitalizado: kata de mano vacía y armas.',
  },
  {
    id: 'enTBjd2KbSM',
    title: 'Isshinryu Basics · 1970',
    note: 'Fundamentos tempranos del Maestro Uezu.',
  },
  {
    id: 'J1CKTP0si7o',
    title: 'Empty hand & Kobudo · años 70',
    note: 'Kata de karate y kobudo en demostración clásica.',
  },
  {
    id: 'znZkTBO2iD0',
    title: 'Kobudo kata · años 70',
    note: 'Trabajo de armas Isshin Ryu con el Maestro Uezu.',
  },
] as const

export const gallery = [
  { src: assetUrl('images/gallery-1.jpg'), alt: 'Entrenamiento Isshin Ryu' },
  { src: assetUrl('images/gallery-2.jpg'), alt: 'Práctica en el dojo' },
  { src: assetUrl('images/gallery-3.jpg'), alt: 'Karate y Kobudo' },
  { src: assetUrl('images/gallery-4.jpg'), alt: 'Comunidad OIKKA Chile' },
] as const

export const contact = {
  title: 'Contacto',
  text: 'Escríbenos para conocer la escuela más cercana o resolver dudas sobre OIKKA Chile.',
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
