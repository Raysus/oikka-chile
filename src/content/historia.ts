export type HistoriaEntry = {
  id: string
  title: string
  summary: string
  body: string[]
}

/** Biografías basadas en https://isshinryutemuco.cl/historia-y-biografias/ y páginas asociadas. */
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
    summary: 'Del “te” de Okinawa al karate moderno.',
    body: [
      'Con el objetivo de su supervivencia, el ser humano desarrolló distintos tipos de acciones de autodefensa. En el archipiélago Ryukyu —hoy isla de Okinawa, Japón— surge el arte de autodefensa y supervivencia que conocemos como Karate Do.',
      'Aunque hay registros de Okinawa de cerca de mil años, no existe una historia documental completa del karate: la tradición oral y la escasa documentación son las principales herramientas para reconstruirla. Según la literatura okinawense, el arte del “te” existió antes de la influencia china del “to te” y se consolidó en el intercambio cultural del siglo XV bajo el rey Shohashi.',
      'El mayor impulso llegó cuando el clan Satsuma sojuzgó Ryukyu y prohibió armas y artes marciales: el “te” se practicó en secreto y, al unirse con métodos chinos en los siglos XVII y XVIII, tomó forma el karate. Gradualmente se diferenciaron ramas como Shorin-Ryu (Shuri-Te/Tomari) y Shorei-Ryu (Naha-Te).',
      'En el siglo XX, Anko Itosu introdujo el karate en las escuelas. En 1936 maestros como Chojun Miyagi, Chomo Hanashiro, Choki Motobu y Chotoku Kyan acordaron llamar “karate” a este arte. Hoy se reconoce mundialmente por sus beneficios físicos, formativos y de autodefensa.',
    ],
  },
  {
    id: 'origenes-kobudo',
    title: 'Orígenes del Kobudo',
    summary: '“Arte marcial ancestral” de Okinawa: de herramientas a armas.',
    body: [
      'Kobudo es un término japonés que puede traducirse como “arte marcial ancestral” o “antiguo arte de guerra” (bu: guerrero / arte marcial; do: vía o camino).',
      'Tras la guerra civil de 1609 y el control Shimazu sobre Ryukyu, se prohibió la posesión y uso de armas. Los habitantes hallaron en instrumentos agrícolas y de pesca —bo, eku, kama y otros— medios de defensa. Hasta principios del siglo XX cada arma se practicaba en secreto por pueblos distintos.',
      'Maestros como Moden Yabiku reunieron técnicas de distintas localidades y formaron en Naha, a fines de los años 20, la Ryukyu Kobujutsu Kenkyu Kai. Su principal alumno y heredero fue Shinken Taira (1897–1970), quien reorganizó el arte tras la guerra como Ryukyu Kobudo Kai (1955) y formó a figuras como Tatsuo Shimabuku.',
      'En Isshin Ryu, Shimabuku entrenó kobujutsu con Chotoku Kyan (1923–1940) y profundizó Kobudo con Shinken Taira (1958–1960). Hoy OIKKA preserva y difunde ese legado de armas junto al karate.',
    ],
  },
  {
    id: 'origenes-isshin',
    title: 'Orígenes del Isshin Ryu',
    summary: 'La vía de un solo corazón (1953–1956).',
    body: [
      'Tatsuo Shimabuku fue alumno de Chotoku Kyan (1870–1945), perfeccionista severo del Shorin-Ryu, de quien tomó katas y mejoras. Con Chojun Miyagi (1888–1953), maestro de Naha-Te, recibió el desarrollo de Sanchin, base del karate de Okinawa.',
      'De Choki Motobu (1871–1941) aprendió bunkai y kumite: un instructor menos formal, pero combatiente indomable. Con Shinken Taira (1897–1970) y Moden Yabiku entrenó kobudo.',
      'Con todo lo heredado, en 1953 el Maestro Tatsuo Shimabuku introduce formalmente un nuevo sistema que revolucionaría Okinawa y el mundo: Isshin Ryu, la vía de un solo corazón. Aunque relativamente nuevo (establecido como tal hacia 1954–1956), se sustenta en las raíces más importantes de las artes tradicionales de Okinawa.',
    ],
  },
  {
    id: 'kiyan',
    title: 'Chotoku Kyan',
    summary: '1870–1945 · Shorin-Ryu · maestro principal de Shimabuku.',
    body: [
      'Chotoku Kyan nació en 1870 en una familia acomodada de Shuri, Okinawa. A los cinco años comenzó Okinawa-Te con su padre Chofu Kyan y su abuelo, quien exigía perfección cada mañana.',
      'Entrenó con grandes maestros: Sokon Matsumura (Seisan, Gojushiho), Matsumora de Tomari, Pechin Maeda y Oyadomari Kokan, Chatan Yara (Kusanku) y Tokumine (Bo). Creó el kata Ananku y enseñó en Kadena a un reducido grupo de alumnos.',
      'En 1920 viajó a Japón y Taiwán para difundir el karate. Durante la Segunda Guerra Mundial entregaba a los niños el poco alimento que conseguía. En 1945, a los 75 años, falleció de hambre.',
    ],
  },
  {
    id: 'miyagi',
    title: 'Chojun Miyagi',
    summary: '1888–1953 · fundador del Goju-Ryu.',
    body: [
      'Chojun Miyagi nació el 25 de abril de 1888 en Naha, en una familia acomodada dedicada a la importación farmacéutica. Tras la muerte de su padre fue adoptado por su tío y cambió su nombre a Chojun.',
      'Comenzó artes marciales a los 11 años con Ryu Ko Aragaki y desde 1902 entrenó con Kanryo Higaonna. En 1918 cofundó la Ryukyu Toudi Kenkyu-Kai para preservar el karate de Okinawa.',
      'En 1927 nombró su sistema Goju-Ryu (“dureza y suavidad”), inspirado en el Bubishi. En 1930 registró formalmente el nombre. Tras la guerra retomó la enseñanza; murió el 8 de octubre de 1953 a los 65 años, tras dedicar su vida al karate de Okinawa.',
    ],
  },
  {
    id: 'motobu',
    title: 'Choki Motobu',
    summary: '1871–1941 · Shorin-Ryu práctico · influencia en Isshin Ryu.',
    body: [
      'El entrenamiento de Choki Motobu priorizaba makiwara, pesos y velocidad: por su agilidad lo apodaron Motobu “el Mono”. Tras años de práctica en solitario, entrenó con Anko Itosu y Sokon Matsumura.',
      'Fue un gran experto en kumite y luchador callejero invicto en muchos combates reales, hábito que no compartían todos sus maestros. Abrió el dojo Daidokan, donde enseñó hasta 1941; entre sus alumnos estuvo Tatsuo Shimabuku.',
      'Además de combatir conocía los katas; su preferido era Naihanchi, que consideraba fundamental y el más útil.',
    ],
  },
  {
    id: 'taira',
    title: 'Shinken Taira',
    summary: '1897–1970 · Ryukyu Kobudo.',
    body: [
      'Nació en 1897 en Nakazato, Kumejima. De joven resultó herido de una pierna en una mina de azufre. En 1922, en Tokio, conoció a Gichin Funakoshi; en 1929 estudió Ryukyu Kobudo con Moden Yabiku y luego con Kenwa Mabuni.',
      'En 1933 abrió dojo de karate y kobudo. Tras la guerra, preocupado por el declive del kobudo, fundó en 1955 la asociación para preservar y promover el Kobudo de Ryukyu. Formó a expertos como Tatsuo Shimabuku.',
      'Murió en 1970 de cáncer. En Okinawa lo sucedió Eisuke Akamine; en el resto de Japón, Motokatsu Inoue.',
    ],
  },
  {
    id: 'shimabuku',
    title: 'Tatsuo Shimabuku',
    summary: '1908–1975 · fundador de Isshin Ryu.',
    body: [
      'Tatsuo Shimabuku nació el 19 de septiembre de 1908 en el pueblo de Kyan, Okinawa, mayor de diez hermanos en una familia de agricultores. A los 12 años comenzó rudimentos de karate con su tío Shinko Ganiku.',
      'Hacia 1932 estudió Shuri-Te con Chotoku Kyan en Kadena (Seisan, Naihanchi, Wansu, Chinto, Kusanku y kobudo básico). Luego aprendió Seiunchin y Sanchin con Chojun Miyagi, y alrededor de un año con Choki Motobu. Profundizó Bo y Sai y, en los 50–60, kobudo con la línea de Moden Yabiku / Shinken Taira.',
      'Abrió su primer dojo en 1946. Refinó un sistema que unía lo mejor de Shorin-Ryu, Goju-Ryu, armas y sus propias técnicas. Tras un sueño con la diosa del agua Mizugami, el 15 de enero de 1956 anunció un nuevo estilo: Isshin-Ryu. Cambió su nombre a Tatsuo (“hombre dragón”).',
      'Instruyó a marines estadounidenses en Okinawa, lo que difundió Isshin Ryu en EE.UU. Se retiró a inicios de 1972 y falleció de un derrame cerebral el 30 de mayo de 1975, a los 66 años, en Agena.',
    ],
  },
  {
    id: 'uezu',
    title: 'Angi Uezu',
    summary: '1935–2024 · fundador de OIKKA · Presidente Emérito.',
    body: [
      'Nació el 3 de enero de 1935 en la isla de Saipan. Tras la muerte de Shimabuku en mayo de 1975, Isshin Ryu en Okinawa enfrentó graves divisiones; entre los pocos altos grados que persistieron estuvo Angi Uezu, yerno y alumno principal del fundador.',
      'En 1990 fundó la O.I.K.K.A. (Okinawa Isshin Ryu Karate Kobudo Association) para preservar el Isshin Ryu auténtico y apoyar a estudiantes en todo el mundo. En 1992 inauguró el dojo central en Gushikawa. Con Joseph Jennings produjo videos y libros didácticos.',
      'Viajó durante décadas a dictar seminarios, especialmente en Estados Unidos. En 1994 sufrió un ataque cerebral que interrumpió su actividad física; su recuperación fue notable y en 1996 retomó seminarios. Sirvió como Presidente Emérito y Asesor Especial hasta su fallecimiento en 2024.',
    ],
  },
  {
    id: 'chase',
    title: 'Christopher Chase',
    summary: 'Kaicho · Director mundial de OIKKA (desde 2007).',
    body: [
      'Christopher Chase nació el 3 de agosto de 1959. Comenzó Isshin Ryu hacia los 12 años —único estilo que ha practicado—. Angi Uezu lo conoció en una gira por dojos de EE.UU., lo apadrinó y lo llevó a entrenar a Okinawa durante 10 años; todos sus grados son bajo Uezu.',
      'Estudió un doctorado en artes marciales y culturas ancestrales en Tokio. Es cinturón negro 9º dan (Hanshi-sei), con títulos internacionales en armas, kata y combate, e ingresó al International Karate and Kickboxing Hall of Fame en 1996.',
      'El 1 de febrero de 2007, Maestro Uezu lo nombró director de OIKKA. Dirige su dojo en Rochester (EE.UU.) y viaja por el mundo dictando seminarios en representación de la asociación.',
    ],
  },
  {
    id: 'carlos',
    title: 'Carlos Alvear Torres',
    summary: 'Kyoshi · Isshin Akira Kan, Temuco · representante OIKKA Chile.',
    body: [
      'Nació en Concepción el 12 de abril de 1964 y vive en Temuco. Es Técnico de Nivel Superior Preparador Físico (INACAP Temuco). Se inició en artes marciales en 1980 en Shotokan; en 1984 se gradúa cinturón negro Shotokan. Entre 1984 y 1986 realizó el servicio militar como monitor de defensa personal y esgrima de corvo.',
      'En 1987 inició Isshin Ryu. Se gradúa 1º dan en 1997 y ese año viaja a Okinawa representando a Chile en un torneo mundial de karate-kobudo, llegando a octavos de final y asistiendo a seminarios.',
      'En 2003 inicia su labor docente profesional y funda el Dojo Isshin Akira en Temuco, difundiendo Isshin Ryu OIKKA. Sustenta el grado de 7º dan Kyoshi Go como representante de Isshin Ryu OIKKA para Chile.',
    ],
  },
  {
    id: 'alexis',
    title: 'Alexis Alvear Constanzo',
    summary: 'Sensei · Dojo Isshin Akira Temuco.',
    body: [
      'Sensei Alexis Alvear Constanzo colabora en la enseñanza y el día a día del Dojo Isshin Akira Temuco, acompañando la formación de niños, jóvenes y adultos en Isshin Ryu bajo el sello OIKKA.',
      'Integra el equipo docente del Hombu en Chile junto a Kyoshi Carlos Alvear Torres, sosteniendo la práctica diaria, la cortesía del dojo y el vínculo con la familia Isshin Akira.',
    ],
  },
  {
    id: 'jarpa',
    title: 'Cristian Jarpa Bucher',
    summary: 'Sensei · Dojo Bushin Kan, Los Ángeles.',
    body: [
      'Nació en Santiago el 9 de junio de 1976. Realizó estudios básicos en el Colegio Patrocinio San José (Santiago) y secundarios y superiores en el área mecánica automotriz en Los Ángeles (Liceo Don Orione). Comparte su tiempo con la enseñanza y difusión de las artes marciales.',
      'Se inició en artes marciales en 1989 (kempo, tang soo do, judo, shito-ryu) hasta 2005; a fines de ese año comenzó Isshin Ryu. Se gradúa 1º dan en 2012, 2º dan en 2017 y 3º dan en 2019, otorgado por Hanshi Christopher Chase y Sensei Carlos Alvear Torres.',
      'Ha destacado en torneos nacionales e internacionales. En 2018, como seleccionado nacional, participó en el mundial OIKKA en Nueva Jersey (EE.UU.), obteniendo 1º lugar en kumite y kobudo y 2º en kata. Inicia la docencia en 2013 y en 2017 funda el Dojo Bushinkan en Los Ángeles.',
    ],
  },
  {
    id: 'mario',
    title: 'Mario Rodríguez De Pablo',
    summary: 'Figura del entorno Isshin Akira / OIKKA Chile.',
    body: [
      'Mario Rodríguez De Pablo forma parte del índice histórico del Dojo Isshin Akira Temuco. La ficha detallada se irá completando a partir de los archivos de la escuela y de OIKKA Chile.',
    ],
  },
  {
    id: 'beltias',
    title: 'Beltías Vargas Pedreros',
    summary: 'Figura del entorno Isshin Akira / OIKKA Chile.',
    body: [
      'Beltías Vargas Pedreros forma parte del índice histórico del Dojo Isshin Akira Temuco. La ficha detallada se irá completando a partir de los archivos de la escuela y de OIKKA Chile.',
    ],
  },
]

