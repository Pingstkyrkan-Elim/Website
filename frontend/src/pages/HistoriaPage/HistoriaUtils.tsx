export interface HistoryItem {
  id: number;
  title: string;
  date: string;
  content: string;
  image?: string[];
  details?: string[];
}

export const historyStories: HistoryItem[] = [
  {
    id: 1,
    title: "Den förste pingst-missionären i Österrike",
    date: "1920 - 1930",
    content: "Pastor Steen åkte 1921 till Wien, där han blev förste pingst-missionären i Österrike. Följande år bildades församlingar i Rumänien, Jugoslavien och Ungern. I Berlin bildades en fri församling som växte till den största i Tyskland. På grund av nazisterna fick Steen tillsammans med hustru Frida lämna landet 1937. Efter kriget ledde de pingströrelsens hjälparbete i Hamburg och Ungern. 1948 flyttade paret till Bryssel där de tjänstgjorde fram till pensionen 1958, då de flyttade tillbaka till Trelleborg. När de senare flyttade till Sala behöll de kontakten hela livet med vänner i Elim där de var uppskattade gäster i bönegruppen och förebedjare fram till 1970-talet.",
    image: ["1920.png"],
    details: ["Georg Steen 1919-1921", "Algot Vikström 1921-1922"]
  },
  {
    id: 2,
    title: "Första Lokalen",
    date: "1920 - 1930",
    content: "Så småningom fick församlingen möjlighet att bygga en mera funktionell kyrka, i alla fall efter tidens mått. Den kände arkitekten Ragnar Näsman anlitades och han ritade en kubisk funkisbyggnad. Den blev mycket uppmärksammad och Näsman använde denna som exempel på sin kompetens. Kyrkan byggdes med grunden delvis på den gamla Sveasalen och stod färdig 1936. Den förblev församlingens huvudkvarter fram till 1981.\n\nI fondväggen bakom estraden fanns ett runt fönster som lyste som solen.",
    image: ["1921.png", "1922.png"],
    details: ["Gunnar Pettersson 1922-1923", "Johannes Hedin 1924-1927", "Helmer Freijd 1927-1931", "Gunnar Pettersson 1931-1944"]
  },
  {
    id: 3,
    title: "Pastorer",
    date: "1920 - 1930",
    content: "Tre pastorer som betytt mycket för församlingen i Trelleborg under lång tid:\n\nErnst Almqvist,\n\nGeorg Steen\n\noch Gunnar Pettersson.\n\nHär har alla samlats på estraden i kyrkan på Valldammsgatan, kanske under något jubileum.",
    image: ["1923.png"],
    details: ["Under 1920- och 1930-talen utförde många pastorer och föreståndare ett exceptionellt arbete som hade ett stort inflytande på pingstsamfundets framsteg och tillväxt."]
  },
  {
    id: 4,
    title: "Egen Byggnad",
    date: "1935",
    content: "Ett historiskt ögonblick inträffar när församlingen köper sin första egna byggnad på Storgatan. Detta representerar inte bara ekonomisk stabilitet utan också en djupare förankring i samhället.\n\nDen nya lokalen möjliggör expansion av verksamheterna och skapar möjligheter för större sammankomster. Medlemsantalet har nu vuxit till 100 personer, och ungdomsarbetet tar sina första steg. Byggnaden blir snart känd som en plats för bön, gemenskap och social hjälp under de ekonomiskt svåra 1930-talet.",
    image: ["storgatan-building.jpg"],
    details: ["Storgatan 42", "100 medlemmar", "Ungdomsverksamhet"]
  },
  {
    id: 5,
    title: "Efterkrigstillväxt",
    date: "1945-1950",
    content: "Efter andra världskrigets slut upplever församlingen en period av enorm tillväxt och förnyelse. Många familjer, påverkade av krigsårens vedermödor, söker hopp och mening i tron.\n\nMedlemsantalet växer dramatiskt till 180 personer, och barnarbetet expanderar kraftigt för att möta behoven hos de många nya familjerna. Denna period karakteriseras av stark gemenskap, praktisk hjälp till behövande och en växande missionskänsla som sträcker sig långt utanför Trelleborgs gränser.",
    image: ["post-war.jpg"],
    details: ["180 medlemmar", "Familjetillväxt", "Missionssatsning"]
  },
  {
    id: 6,
    title: "50-talets Guldålder",
    date: "1955",
    content: "1950-talet blir en guldålder för Pingstkyrkan Elim. Församlingen når 250 medlemmar och etablerar sig som en betydande kraft i Trelleborgs religiösa landskap.\n\nDamkören bildas och blir snart känd för sina vackra framföranden vid både gudstjänster och speciella evenemang. Den första församlingsbilen köps, vilket revolutionerar möjligheterna för utflykter, konferenser och missionärsresor. Denna period präglasav optimism, tillväxt och en stark känsla av gemenskap.",
    image: ["50s-boom.jpg"],
    details: ["250 medlemmar", "Damkör", "Första bilen"]
  },
  {
    id: 7,
    title: "Karismatisk Förnyelse",
    date: "1965",
    content: "Den karismatiska förnyelsen sveper över kristenheten globalt och påverkar även Elim på djupet. Nya uttryck för tillbedjan introduceras, och gudstjänsterna blir mer spontana och livfulla.\n\nProfetiska gåvor och gudomlig helning blir mer framträdande, och många medlemmar upplever en fördjupad andlig gemenskap. Nya sånger och musikstilar introduceras, vilket attraherar både yngre medlemmar och besökare. Denna förnyelse skapar ny energi och passion för evangelisation och gemenskap.",
    image: ["charismatic-renewal.jpg"],
    details: ["Nya sånger", "Profetisk tjänst", "Helande möten"]
  },
  {
    id: 8,
    title: "Nya Kyrkobyggnaden",
    date: "1982",
    content: "En dröm blir verklighet när den nuvarande kyrkobyggnaden invigs på den adress som fortfarande används idag. Med 400 sittplatser representerar denna byggnad församlingens största investering och ett starkt uttryck för framtidstro.\n\nDen moderna utrustningen möjliggör större evenemang, konferenser och kulturella aktiviteter. Byggnaden blir snart ett nav för kristna aktiviteter i regionen och välkomnar besökare från många andra församlingar. Denna milstolpe markerar början på en ny era av tillväxt och inflytande.",
    image: ["current-building.jpg"],
    details: ["400 platser", "Modern teknik", "Regionalt center"]
  },
  {
    id: 9,
    title: "Mångkulturell Gemenskap",
    date: "1985",
    content: "I takt med Sveriges ökande mångfald blir även Elim en alltmer internationell församling. Medlemmar från tolv olika nationaliteter skapar en rik kulturell mosaik som berikar församlingslivet enormt.\n\nFlerspråkiga möten introduceras för att välkomna alla, och kulturell mångfald fieras genom internationella evenemang och festivaler. Denna utveckling speglar församlingens öppna hjärta och dess förståelse av kristendomens universella budskap som överskrider alla kulturella gränser.",
    image: ["international.jpg"],
    details: ["12 nationaliteter", "Flerspråkiga möten", "Kulturutbyte"]
  },
  {
    id: 10,
    title: "Digital Revolution",
    date: "2000",
    content: "Det nya millenniet för med sig teknologisk revolution även för Elim. Den första hemsidan lanseras, vilket öppnar nya möjligheter för kommunikation och utåtverksamhet.\n\nProjektorteknik installeras i kyrkan, vilket revolutionerar gudstjänstupplevelsen med visuella element och moderna presentationer. CD-inspelningar av körmusik och predikningar gör det möjligt att sprida församlingens budskap långt utanför kyrkans väggar. Denna digitala satsning positionerar Elim i framkant av kyrklig innovation.",
    image: ["digital-era.jpg"],
    details: ["Första hemsidan", "Projektor", "CD-inspelningar"]
  },
  {
    id: 11,
    title: "Total Renovering",
    date: "2010",
    content: "En omfattande renoveringsprocess påbörjas för att modernisera och förbättra kyrkans faciliteter. LED-belysning installeras för att skapa en varmre och mer energieffektiv miljö.\n\nLjudsystemet får en komplett uppgradering med modern digital teknik som förbättrar ljudkvaliteten dramatiskt. Tillgänglighetsanpassningar genomförs för att säkerställa att alla människor, oavsett fysiska begränsningar, kan delta fullt ut i församlingslivet. Dessa investeringar visar församlingens engagemang för excellens och inkludering.",
    image: ["renovation.jpg"],
    details: ["LED-belysning", "Digital ljud", "Tillgänglighet"]
  },
  {
    id: 12,
    title: "Nutid och Framtid",
    date: "2024",
    content: "Idag fortsätter Pingstkyrkan Elim att utvecklas som en levande, mångkulturell församling som balanserar tradition med innovation. Livestreaming av gudstjänster når medlemmar och vänner över hela världen.\n\nEn egen mobilapp utvecklas för att underlätta kommunikation och deltagande. Sociala medier används aktivt för att dela uppmuntran, evenemang och byggsa community. Trots alla teknologiska framsteg förblir kärnan densamma: att vara en andlig oas där människor kan möta Gud och varandra i äkta gemenskap och kärlek.",
    image: ["today.jpg"],
    details: ["Global räckvidd", "Digital gemenskap", "Framtidsfokus"]
  }
];