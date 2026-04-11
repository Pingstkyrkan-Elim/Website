import { HistoryEntry } from '../../types';

// Static fallback data — mirrors the database seed in populate_history.py
// Used when the API is unavailable (e.g. during development without backend).

export const staticHistoryData: HistoryEntry[] = [
  {
    id: 1,
    period: '1919',
    year_start: 1919,
    title: 'Församlingens Grundande',
    content:
      'Elimförsamlingen i Trelleborg bildades i mars 1919 när ett 25-tal personer lämnade Baptisterna för att under den unge evangelisten Georg Steens ledning bilda Elimförsamlingen. Den första lokalen man samlades i hette Sveasalen och låg strax söder om den kyrka som senare byggdes på Valldammsgatan 2.',
    images: ['historia/Steen.webp'],
    leaders: [],
    order: 1,
  },
  {
    id: 2,
    period: '1920- och 1930-talet',
    year_start: 1920,
    title: 'Expansion och Missionstid',
    content:
      'Pastor Steen åkte 1921 till Wien, där han blev förste pingst-missionären i Österrike. Följande år bildades församlingar i Rumänien, Jugoslavien och Ungern. I Berlin bildades en fri församling som växte till den största i Tyskland. På grund av nazisterna fick Steen tillsammans med hustru Frida lämna landet 1937. Efter kriget ledde de pingströrelsens hjälparbete i Hamburg och Ungern.\n\nSå småningom fick församlingen möjlighet att bygga en mera funktionell kyrka. Den kände arkitekten Ragnar Näsman anlitades och han ritade en kubisk funkisbyggnad. Den blev mycket uppmärksammad och stod färdig 1936 — församlingens huvudkvarter fram till 1981. I fondväggen bakom estraden fanns ett runt fönster som lyste som solen.\n\nFörsamlingen hade tidigt ett rikt sång- och musikliv.',
    images: ['historia/Valldammsgatan.webp', 'historia/Screenshot_18.webp', 'historia/image007.webp', 'historia/Music_groups.webp', 'historia/Song_groups.webp'],
    leaders: [
      'Georg Steen 1919–1921',
      'Algot Vikström 1921–1922',
      'Gunnar Pettersson 1922–1923',
      'Johannes Hedin 1924–1927',
      'Helmer Freijd 1927–1931',
      'Gunnar Pettersson 1931–1944',
    ],
    order: 2,
  },
  {
    id: 3,
    period: '1940- och 1950-talet',
    year_start: 1940,
    title: 'Pastorer, Utposter och Barnverksamhet',
    content:
      'Harald Strömstedt var en mycket varm och nitisk människa med stort hjärta för de nyfrälsta och ungdomarna. Han var en andlig fader för alla i församlingen och en god förkunnare.\n\nKarl Wärn tillbringade fyra år i församlingen från 1950. Han hade talets gåva — hans levande och intressanta förkunnelse berörde alla som lyssnade. Han hade också en gåva att be för sjuka.\n\nFörsamlingen bedrev möten och söndagsskola på många platser runt om Trelleborg: Smygehamn, Skegrie och Kurland. I Smygehamn hölls varje år den välkända Smygehamnskonferensen. Söndagsskola och barnverksamhet samlade många barn och ledare under slutet av 1940-talet och framåt.',
    images: ['historia/Screenshot_1.webp', 'historia/Screenshot_3.webp', 'historia/Styrelsen_1950.webp', 'historia/Kurland.webp', 'historia/Söndagsskola.webp'],
    leaders: [
      'Gunnar Pettersson 1931–1944',
      'Harald Strömstedt 1944–1950',
      'Karl Wärn 1950–1954',
      'Stig Ohrle 1954–1956',
      'Åke Axelsson 1956–1957',
      'Ernst Almqvist 1957–1965',
    ],
    order: 3,
  },
  {
    id: 4,
    period: '1960- och 1970-talet',
    year_start: 1960,
    title: 'Blåsorkester och Ungdomstid',
    content:
      'Efter tiden med Ernst Almqvist hade församlingen flera vakanspredikanter tills Philip Nilsson accepterade kallelsen som föreståndare. Philip var en god predikant som predikade med stor inlevelse och stort personligt engagemang.\n\nFörsamlingen hade en blåsorkester som verkade under många år under ledning av Åke Svensson. Denna var ett verktyg att samla människor utomhus och dela evangelium. Den blev samtidigt en samlingspunkt för ungdomarna.',
    images: ['historia/image009.webp', 'historia/image029.webp', 'historia/Wiborn.webp'],
    leaders: [
      'Ernst Almqvist 1957–1965',
      'Karl Eriksson 1965–1968',
      'Gustav Söderholm 1968–1969',
      'Philip Nilsson 1969–1973',
      'Knut Wiborn 1973–1977',
      'Nils Sjöström 1977–1990',
    ],
    order: 4,
  },
  {
    id: 5,
    period: '1980- och 1990-talet',
    year_start: 1980,
    title: 'Kyrkobranden och Återuppbyggnad',
    content:
      'Nils Sjöström satte sin prägel på församlingen som ingen annan pastor på senare tid. Han var föreståndare 1977–1990 och full av idéer och visioner. Han engagerade sig starkt för flyktingar och utsågs av Sveriges Radio till "Sveriges modigaste man".\n\nBeslut fattades att bygga en ny kyrka, finansierad av ett testamente från Victor Palson. Men den 24 april 1982 — tre veckor före invigningen — sattes kyrkan i brand av några ungdomar och hela byggnaden fick rivas. Efter en nattlig samling med bön och samtal beslutades att gå vidare.\n\nKyrkan byggdes upp igen och invigdes till Advent samma år, 1982. Den är en luftig byggnad med synliga limträbalkar och furupanel i taket. I sidobyggnaden startades Sveriges första kristna fritidshem.\n\nUnder 1990-talet ledde Torbjörn Söder (1994–2001) församlingen mot en folkligare inriktning med aktiviteter för äldre och samarbete med Trelleborgs Kommun.',
    images: ['historia/Screenshot_4.webp', 'historia/image011.webp', 'historia/image019.webp', 'historia/Fire1.webp', 'historia/Fire2.webp', 'historia/Fire3.webp', 'historia/Fire4.webp', 'historia/Screenshot_10.webp', 'historia/Screenshot_16.webp', 'historia/Tunhav.webp', 'historia/Söder.webp'],
    leaders: [
      'Nils Sjöström 1977–1990',
      'Bosse Tunhav 1991–1993',
      'Nils Sjöström 1993–1994',
      'Torbjörn Söder 1994–2001',
    ],
    order: 5,
  },
  {
    id: 6,
    period: '2000- och 2010-talet',
    year_start: 2000,
    title: 'En Levande Församling Idag',
    content:
      'Under 2000- och 2010-talet fortsatte Pingstkyrkan Elim att växa som en levande, mångkulturell församling. Joakim Freiman ledde församlingen 2002–2016 och Ingmar Aronson tillträdde 2018.\n\nIdag är Elim en åldersblandad och multietnisk pingstkyrka med många barn och ungdomar och flera olika verksamheter för alla åldrar. Predikan tolkas ofta till engelska och predikotexten finns även översatt till flera olika språk.\n\nVi brinner för att göra Jesus känd, trodd och efterföljd i Trelleborg med omnejd och välkomnar alla som vill uppleva livet med Jesus.',
    images: ['historia/ElimPastors2.webp'],
    leaders: [
      'Torbjörn Söder 1994–2001',
      'Joakim Freiman 2002–2016',
      'Ingmar Aronson 2018–',
    ],
    order: 6,
  },
];
