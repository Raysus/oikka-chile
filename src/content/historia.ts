export type HistoriaEntry = {
  id: string
  title: string
  summary: string
  body: string[]
}

/** Página interactiva basada en https://isshinryutemuco.cl/historia-y-biografias/ */
export const historiaPage = {
  title: 'Historia y biografías',
  eyebrow: 'Isshin Ryu · OIKKA',
  lead:
    'Orígenes del karate, el kobudo y el Isshin Ryu, y figuras del linaje hasta la familia OIKKA en Chile. Abre cada ficha para leer.',
}

export const historiaEntries: HistoriaEntry[] = [
  {
    id: 'origenes-karate',
    title: 'Orígenes del karate',
    summary: 'De China a Okinawa: el tode y las raíces del vacío mano.',
    body: [
      'El karate nace en Okinawa a partir del intercambio con China y del desarrollo local del “tode” (mano china). Generaciones de maestros de Shuri, Naha y Tomari dieron forma a lo que hoy reconocemos como karate.',
      'Esa herencia llega a Isshin Ryu a través de Shuri-Te, Naha-Te y el espíritu de un solo corazón que caracteriza a Okinawa.',
    ],
  },
  {
    id: 'origenes-kobudo',
    title: 'Orígenes del Kobudo',
    summary: 'Armas tradicionales de las Ryukyu: bo, sai, tonfa y más.',
    body: [
      'El Ryukyu Kobudo preserva el uso de armas tradicionales de Okinawa. Herramientas del campo y la pesca se transformaron en métodos de defensa codificados en kata.',
      'En Isshin Ryu, el kobudo se integra al karate a través del linaje de Shinken Taira y la enseñanza de Tatsuo Shimabuku.',
    ],
  },
  {
    id: 'origenes-isshin',
    title: 'Orígenes del Isshin Ryu',
    summary: '1953: Tatsuo Shimabuku abre la Escuela de un solo corazón.',
    body: [
      'Isshin Ryu (“un corazón / una mente”) fue formalmente introducido en 1953 por el Maestro Tatsuo Shimabuku. Combina lo mejor del Shorin-Ryu, Goju-Ryu y Kobudo en un sistema rápido, preciso y práctico.',
      'El estilo se caracteriza por puños verticales, patadas bajas y una síntesis técnica pensada para el combate real y el desarrollo del carácter.',
    ],
  },
  {
    id: 'kiyan',
    title: 'Chotoku Kiyan',
    summary: 'Shorin-Ryu · maestro principal de Shimabuku (desde 1923).',
    body: [
      'Chotoku Kiyan (1870–1945) transmitió Shorin-Ryu (Shuri-Te) a Tatsuo Shimabuku. Su enseñanza es uno de los pilares técnicos del Isshin Ryu.',
    ],
  },
  {
    id: 'miyagi',
    title: 'Chojun Miyagi',
    summary: 'Fundador del Goju-Ryu · influencia Naha-Te (1922).',
    body: [
      'Chojun Miyagi (1888–1953) fundó el Goju-Ryu. Shimabuku estudió con él métodos de Naha-Te y respiración que enriquecieron Isshin Ryu.',
    ],
  },
  {
    id: 'motobu',
    title: 'Choki Motobu',
    summary: 'Shorin-Ryu práctico · Tomari-Te y Shuri-Te (1922).',
    body: [
      'Choki Motobu (1871–1941) enfatizó el combate realista. Su Shorin-Ryu aportó a Shimabuku una mirada directa y funcional del karate.',
    ],
  },
  {
    id: 'taira',
    title: 'Shinken Taira',
    summary: 'Ryukyu Kobudo · armas de Okinawa (1958).',
    body: [
      'Shinken Taira (1897–1970) sistematizó el kobudo de las Ryukyu. Shimabuku estudió bo, sai, tonfa y nunchaku con él, incorporando las armas al Isshin Ryu.',
    ],
  },
  {
    id: 'shimabuku',
    title: 'Tatsuo Shimabuku',
    summary: 'Fundador de Isshin Ryu (1908–1975).',
    body: [
      'Tatsuo Shimabuku abrió Isshin-Ryu Karate-Do en 1953. Unió Shorin, Goju y Kobudo bajo el ideal de un solo corazón.',
      'Su legado vive en OIKKA y en dojos de todo el mundo, incluida la familia Isshin Ryu en Chile.',
    ],
  },
  {
    id: 'uezu',
    title: 'Angi Uezu',
    summary: 'Yerno y alumno principal · fundador de OIKKA (1990).',
    body: [
      'Angi Uezu (n. 1935) fue yerno y alumno principal de Shimabuku. Fundó la Okinawa Isshin Ryu Karate Kobudo Association (OIKKA) en 1990 y Junken Karate-Do en 1992.',
      'Hoy es Presidente Emérito y Asesor Especial de OIKKA; su enseñanza sigue guiando a la asociación.',
    ],
  },
  {
    id: 'chase',
    title: 'Christopher Chase',
    summary: 'Kaicho · Director mundial de OIKKA (desde 2007).',
    body: [
      'El 1 de febrero de 2007, el Maestro Uezu nombró a Christopher Chase como su sucesor y Presidente de OIKKA. Desde entonces lidera la dirección mundial de la asociación.',
    ],
  },
  {
    id: 'carlos',
    title: 'Carlos Alvear Torres',
    summary: 'Kyoshi · Isshin Akira Kan, Temuco.',
    body: [
      'Kyoshi Carlos Alvear Torres dirige el Dojo Isshin Akira Temuco (Hombu en Chile), formando niños, jóvenes y adultos en Isshin Ryu bajo el sello OIKKA.',
    ],
  },
  {
    id: 'alexis',
    title: 'Alexis Alvear Constanzo',
    summary: 'Sensei · Dojo Isshin Akira Temuco.',
    body: [
      'Sensei Alexis Alvear Constanzo colabora en la enseñanza y el día a día del Dojo Isshin Akira, acompañando la formación de la familia del dojo.',
    ],
  },
  {
    id: 'jarpa',
    title: 'Cristian Jarpa Bucher',
    summary: 'Sensei · Dojo Bushin Kan, Los Ángeles.',
    body: [
      'Sensei Cristian Jarpa Bucher representa a OIKKA en Los Ángeles a través del Dojo Bushin Kan.',
    ],
  },
]
