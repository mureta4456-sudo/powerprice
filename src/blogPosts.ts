/**
 * ───────────────────────────────────────────────────────────────────────────
 *  BLOG POSTS — visi raksti glabājas šajā failā / All blog posts live here.
 * ───────────────────────────────────────────────────────────────────────────
 *
 *  Kā pievienot jaunu rakstu / How to add a new post:
 *
 *  1) Nokopē jebkuru no jau esošajiem objektiem `posts` masīvā.
 *  2) Nomaini `id` uz unikālu vārdu (tikai burti, cipari un domuzīmes).
 *  3) Aizpildi `date` (YYYY-MM-DD), `cover` (emoji vai bilde) un `tags`.
 *  4) Sadaļā `i18n` ieliec tulkojumus. Atslēga = valodas kods.
 *     Ja kāda valoda nav iekļauta, lapa parādīs angļu (`en`) versiju.
 *  5) `content` atbalsta vienkāršu Markdown:
 *     - ## un ### virsraksti
 *     - **bold**
 *     - saraksti ar `-` vai `1.`
 *     - [saites](url)
 *     - tukšas rindas starp rindkopām
 */

export interface BlogTranslation {
  title: string;
  summary: string;
  content: string;
}

export interface BlogPost {
  id: string;
  date: string;
  cover: string;
  readMinutes: number;
  tags: string[];
  i18n: Record<string, BlogTranslation>;
}

export const posts: BlogPost[] = [
  {
    id: "siltumsuknis-ietaupit",
    date: "2026-05-10",
    cover: "🔥",
    readMinutes: 4,
    tags: ["siltumsūknis", "apkure", "padomi"],
    i18n: {
      lv: {
        title: "Kā ietaupīt ar siltumsūkni?",
        summary: "Iestatiet augstāku temperatūru stundās, kad elektrība ir vislētākā — un samaziniet to dārgākajās stundās.",
        content: `## Kāpēc siltumsūknis ir izdevīgs\n\nSiltumsūknis pārvērš katru kWh elektrības 3–5 kWh siltuma. Tas nozīmē, ka pat dārgākajās stundās tas joprojām ir lētāks par tiešo elektrosildītāju.\n\n## Trīs vienkārši soļi\n\n1. **Skaties grafiku no rīta** — atver PowerPrice un atzīmē, kuras 3–4 stundas dienā būs vislētākās.\n2. **Palielini temperatūru lētajās stundās par 1–2 °C** — māja "uzkrāj" siltumu kā baterija.\n3. **Pazemini par 1–2 °C dārgajās stundās** — siltums lēni izlīdzinās, un komforts gandrīz nemainās.\n\n## Cik var ietaupīt?\n\nVidēji **15–25 %** no apkures rēķina ziemā, ja siltumsūknis ir mājas galvenais apkures avots.\n\n## Padoms\n\nIegādājies pārdomātu termostatu (piem., Tado, Bosch EasyControl), kas pats var sekot stundu cenām.`
      },
      en: {
        title: "How to save with a heat pump",
        summary: "Set a higher temperature during the cheapest hours and lower it when prices peak.",
        content: `## Why heat pumps are great\n\nA heat pump turns each kWh of electricity into 3–5 kWh of heat. Even during expensive hours it beats a direct electric heater.\n\n## Three simple steps\n\n1. **Check the chart in the morning** — note the 3–4 cheapest hours of the day.\n2. **Raise the temperature by 1–2 °C during the cheap hours** — the house stores the heat like a battery.\n3. **Lower it by 1–2 °C during the expensive hours** — comfort barely changes.\n\n## How much can you save?\n\nAround **15–25 %** of your winter heating bill if the heat pump is your main heat source.\n\n## Tip\n\nA smart thermostat (Tado, Bosch EasyControl) can follow the hourly prices automatically.`
      },
      de: {
        title: "Sparen mit der Wärmepumpe",
        summary: "Heizen Sie in den günstigsten Stunden vor und drosseln Sie in den teuersten Stunden.",
        content: `## Warum Wärmepumpen lohnen\n\nEine Wärmepumpe macht aus 1 kWh Strom 3–5 kWh Wärme. Sie schlägt sogar zu teuren Zeiten den Direktheizer.\n\n## Drei einfache Schritte\n\n1. **Morgens den Chart prüfen** — notieren Sie die 3–4 günstigsten Stunden.\n2. **In günstigen Stunden 1–2 °C wärmer heizen** — das Haus speichert Wärme wie ein Akku.\n3. **In teuren Stunden 1–2 °C absenken** — der Komfort verändert sich kaum.\n\n## Wie viel kann man sparen?\n\nEtwa **15–25 %** der Heizkosten im Winter.\n\n## Tipp\n\nEin smarter Thermostat (Tado, Bosch EasyControl) kann den Stundenpreisen automatisch folgen.`
      },
      fr: {
        title: "Économiser avec une pompe à chaleur",
        summary: "Chauffez davantage pendant les heures les moins chères et baissez la consigne quand les prix flambent.",
        content: `## Pourquoi la pompe à chaleur est rentable\n\nUne pompe à chaleur transforme chaque kWh d'électricité en 3 à 5 kWh de chaleur. Même aux heures chères, elle reste moins coûteuse qu'un convecteur électrique.\n\n## Trois étapes simples\n\n1. **Consultez le graphique le matin** — repérez les 3–4 heures les moins chères.\n2. **Augmentez la température de 1–2 °C en heures creuses** — la maison stocke la chaleur comme une batterie.\n3. **Baissez de 1–2 °C en heures pleines** — le confort change à peine.\n\n## Combien peut-on économiser ?\n\nEnviron **15 à 25 %** de la facture de chauffage en hiver.\n\n## Astuce\n\nUn thermostat intelligent (Tado, Bosch EasyControl) suit automatiquement les prix horaires.`
      },
      es: {
        title: "Cómo ahorrar con una bomba de calor",
        summary: "Programa una temperatura más alta en las horas más baratas y bájala cuando el precio sube.",
        content: `## Por qué la bomba de calor compensa\n\nUna bomba de calor convierte cada kWh de electricidad en 3–5 kWh de calor. Incluso en horas caras es más barata que un radiador eléctrico directo.\n\n## Tres pasos sencillos\n\n1. **Revisa el gráfico por la mañana** — anota las 3–4 horas más baratas del día.\n2. **Sube la temperatura 1–2 °C en horas baratas** — la casa "almacena" el calor como una batería.\n3. **Bájala 1–2 °C en horas caras** — el confort apenas cambia.\n\n## ¿Cuánto se puede ahorrar?\n\nEntre el **15 % y el 25 %** de la factura de calefacción en invierno.\n\n## Consejo\n\nUn termostato inteligente (Tado, Bosch EasyControl) sigue los precios por hora automáticamente.`
      },
      et: {
        title: "Kuidas säästa soojuspumbaga",
        summary: "Tõsta temperatuuri odavate hindade ajaks ja langeta seda kallimatel tundidel.",
        content: `## Miks soojuspump on tasuv\n\nSoojuspump muudab iga kWh elektri 3–5 kWh soojuseks. Isegi kallidel tundidel on ta odavam kui tavaline elektriradiaator.\n\n## Kolm lihtsat sammu\n\n1. **Vaata graafikut hommikul** — märgi üles 3–4 päeva odavaimat tundi.\n2. **Tõsta temperatuuri 1–2 °C võrra odavatel tundidel** — maja salvestab soojuse nagu aku.\n3. **Langeta 1–2 °C võrra kallitel tundidel** — mugavus muutub vaevu.\n\n## Kui palju saab säästa?\n\nUmbes **15–25 %** kütteаrvest talvel.\n\n## Nõuanne\n\nNutikas termostaat (Tado, Bosch EasyControl) jälgib hindu automaatselt.`
      },
      lt: {
        title: "Kaip taupyti su šilumos siurbliu",
        summary: "Pakelkite temperatūrą pigiausiomis valandomis ir sumažinkite ją brangiausiu metu.",
        content: `## Kodėl šilumos siurblys apsimoka\n\nŠilumos siurblys vieną kWh elektros paverčia 3–5 kWh šilumos. Net brangiomis valandomis jis pigesnis už tiesioginį elektrinį šildytuvą.\n\n## Trys paprasti žingsniai\n\n1. **Patikrinkite grafiką ryte** — pažymėkite 3–4 pigiausias dienos valandas.\n2. **Pakelkite temperatūrą 1–2 °C pigiomis valandomis** — namas kaupia šilumą kaip baterija.\n3. **Sumažinkite 1–2 °C brangiomis valandomis** — komfortas beveik nepasikeičia.\n\n## Kiek galima sutaupyti?\n\nMaždaug **15–25 %** šildymo sąskaitos žiemą.\n\n## Patarimas\n\nIšmanus termostatas (Tado, Bosch EasyControl) automatiškai seka valandines kainas.`
      },
      fi: {
        title: "Näin säästät lämpöpumpulla",
        summary: "Säädä korkeampi lämpötila halvimmille tunneille ja laske sitä silloin kun hinta on huipussaan.",
        content: `## Miksi lämpöpumppu kannattaa\n\nLämpöpumppu muuttaa jokaisen kWh:n sähköä 3–5 kWh:ksi lämpöä. Jopa kalliilla tunneilla se voittaa suoran sähkölämmittimen.\n\n## Kolme yksinkertaista vaihetta\n\n1. **Katso kuvaaja aamulla** — merkitse päivän 3–4 halvinta tuntia.\n2. **Nosta lämpötilaa 1–2 °C halvoilla tunneilla** — talo varastoi lämmön kuin akku.\n3. **Laske 1–2 °C kalliilla tunneilla** — mukavuus tuskin muuttuu.\n\n## Kuinka paljon voi säästää?\n\nNoin **15–25 %** lämmityslaskusta talvella.\n\n## Vinkki\n\nÄlykäs termostaatti (Tado, Bosch EasyControl) seuraa tuntihintoja automaattisesti.`
      },
      sv: {
        title: "Så sparar du med värmepump",
        summary: "Höj temperaturen under de billigaste timmarna och sänk när priset toppar.",
        content: `## Varför värmepump lönar sig\n\nEn värmepump gör om 1 kWh el till 3–5 kWh värme. Även under dyra timmar slår den direktel.\n\n## Tre enkla steg\n\n1. **Kolla diagrammet på morgonen** — anteckna dygnets 3–4 billigaste timmar.\n2. **Höj 1–2 °C under billiga timmar** — huset lagrar värme som ett batteri.\n3. **Sänk 1–2 °C under dyra timmar** — komforten påverkas knappt.\n\n## Hur mycket kan man spara?\n\nUngefär **15–25 %** av värmenotan på vintern.\n\n## Tips\n\nEn smart termostat (Tado, Bosch EasyControl) följer timpriserna automatiskt.`
      },
      da: {
        title: "Sådan sparer du med varmepumpen",
        summary: "Skru op for varmen i de billigste timer og ned, når priserne topper.",
        content: `## Hvorfor varmepumpen betaler sig\n\nEn varmepumpe omdanner hver kWh strøm til 3–5 kWh varme. Selv i dyre timer er den billigere end direkte elvarme.\n\n## Tre enkle trin\n\n1. **Tjek grafen om morgenen** — find dagens 3–4 billigste timer.\n2. **Hæv 1–2 °C i de billige timer** — huset lagrer varmen som et batteri.\n3. **Sænk 1–2 °C i de dyre timer** — komforten ændrer sig næsten ikke.\n\n## Hvor meget kan man spare?\n\nCirka **15–25 %** af varmeregningen om vinteren.\n\n## Tip\n\nEn smart termostat (Tado, Bosch EasyControl) følger timepriserne automatisk.`
      },
      nl: {
        title: "Zo bespaar je met een warmtepomp",
        summary: "Stook bij in de goedkoopste uren en zet de thermostaat lager wanneer de prijs piekt.",
        content: `## Waarom een warmtepomp loont\n\nEen warmtepomp maakt van 1 kWh stroom 3–5 kWh warmte. Zelfs tijdens dure uren is dat goedkoper dan een elektrische kachel.\n\n## Drie eenvoudige stappen\n\n1. **Bekijk 's ochtends de grafiek** — noteer de 3–4 goedkoopste uren van de dag.\n2. **Verhoog de temperatuur met 1–2 °C tijdens goedkope uren** — het huis slaat warmte op als een accu.\n3. **Verlaag met 1–2 °C tijdens dure uren** — het comfort verandert nauwelijks.\n\n## Hoeveel kun je besparen?\n\nOngeveer **15–25 %** van de stookkosten in de winter.\n\n## Tip\n\nEen slimme thermostaat (Tado, Bosch EasyControl) volgt de uurprijzen automatisch.`
      },
      pl: {
        title: "Jak oszczędzać z pompą ciepła?",
        summary: "Podgrzewaj w najtańszych godzinach i obniżaj temperaturę, gdy ceny rosną.",
        content: `## Dlaczego pompa ciepła się opłaca\n\nPompa ciepła zamienia każdą kWh prądu w 3–5 kWh ciepła. Nawet w drogich godzinach jest tańsza od bezpośredniego grzejnika elektrycznego.\n\n## Trzy proste kroki\n\n1. **Sprawdź wykres rano** — zaznacz 3–4 najtańsze godziny w ciągu dnia.\n2. **Podnieś temperaturę o 1–2 °C w tanich godzinach** — dom magazynuje ciepło jak akumulator.\n3. **Obniż o 1–2 °C w drogich godzinach** — komfort prawie się nie zmienia.\n\n## Ile można zaoszczędzić?\n\nOkoło **15–25 %** rachunku za ogrzewanie zimą.\n\n## Wskazówka\n\nInteligentny termostat (Tado, Bosch EasyControl) automatycznie podąża za cenami godzinowymi.`
      },
      cs: {
        title: "Jak ušetřit s tepelným čerpadlem",
        summary: "Topte víc v nejlevnějších hodinách a méně, když ceny vrcholí.",
        content: `## Proč se tepelné čerpadlo vyplatí\n\nTepelné čerpadlo přemění každou kWh elektřiny na 3–5 kWh tepla. I v drahých hodinách je levnější než přímotop.\n\n## Tři jednoduché kroky\n\n1. **Ráno se podívejte na graf** — najděte 3–4 nejlevnější hodiny dne.\n2. **Zvyšte teplotu o 1–2 °C v levných hodinách** — dům ukládá teplo jako baterie.\n3. **Snižte o 1–2 °C v drahých hodinách** — komfort se prakticky nezmění.\n\n## Kolik se dá ušetřit?\n\nAsi **15–25 %** účtu za topení v zimě.\n\n## Tip\n\nChytrý termostat (Tado, Bosch EasyControl) automaticky sleduje hodinové ceny.`
      },
      sk: {
        title: "Ako ušetriť s tepelným čerpadlom",
        summary: "Kúrte viac v najlacnejších hodinách a menej, keď sú ceny najvyššie.",
        content: `## Prečo sa tepelné čerpadlo oplatí\n\nTepelné čerpadlo premení každú kWh elektriny na 3–5 kWh tepla. Aj v drahých hodinách je lacnejšie ako priamy elektrický ohrievač.\n\n## Tri jednoduché kroky\n\n1. **Ráno si pozrite graf** — nájdite 3–4 najlacnejšie hodiny dňa.\n2. **Zvýšte teplotu o 1–2 °C v lacných hodinách** — dom ukladá teplo ako batéria.\n3. **Znížte o 1–2 °C v drahých hodinách** — komfort sa prakticky nemení.\n\n## Koľko sa dá ušetriť?\n\nAsi **15–25 %** účtu za kúrenie v zime.\n\n## Tip\n\nInteligentný termostat (Tado, Bosch EasyControl) automaticky sleduje hodinové ceny.`
      },
      hu: {
        title: "Hogyan spóroljunk hőszivattyúval?",
        summary: "Fűts magasabbra a legolcsóbb órákban, és vedd vissza, amikor a legdrágább.",
        content: `## Miért éri meg a hőszivattyú\n\nEgy hőszivattyú minden 1 kWh áramból 3–5 kWh hőt állít elő. Még drága órákban is olcsóbb, mint egy közvetlen elektromos fűtőtest.\n\n## Három egyszerű lépés\n\n1. **Reggel nézd meg a grafikont** — jelöld be a nap 3–4 legolcsóbb óráját.\n2. **Olcsó órákban emeld 1–2 °C-kal a hőmérsékletet** — a ház akkuként tárolja a hőt.\n3. **Drága órákban csökkentsd 1–2 °C-kal** — a komfort alig változik.\n\n## Mennyit lehet megspórolni?\n\nNagyjából **15–25 %**-ot a téli fűtésszámlából.\n\n## Tipp\n\nEgy okos termosztát (Tado, Bosch EasyControl) automatikusan követi az óránkénti árakat.`
      },
      it: {
        title: "Come risparmiare con la pompa di calore",
        summary: "Imposta una temperatura più alta nelle ore più economiche e abbassala quando i prezzi salgono.",
        content: `## Perché la pompa di calore conviene\n\nUna pompa di calore trasforma ogni kWh di elettricità in 3–5 kWh di calore. Anche nelle ore care batte una stufa elettrica diretta.\n\n## Tre semplici passi\n\n1. **Controlla il grafico al mattino** — segna le 3–4 ore più economiche del giorno.\n2. **Alza la temperatura di 1–2 °C nelle ore economiche** — la casa accumula calore come una batteria.\n3. **Abbassa di 1–2 °C nelle ore care** — il comfort cambia appena.\n\n## Quanto si può risparmiare?\n\nCirca il **15–25 %** della bolletta del riscaldamento in inverno.\n\n## Consiglio\n\nUn termostato intelligente (Tado, Bosch EasyControl) segue automaticamente i prezzi orari.`
      },
      pt: {
        title: "Como poupar com uma bomba de calor",
        summary: "Aqueça mais nas horas mais baratas e baixe a temperatura quando os preços disparam.",
        content: `## Porque vale a pena a bomba de calor\n\nUma bomba de calor transforma cada kWh de eletricidade em 3–5 kWh de calor. Mesmo nas horas caras é mais barata do que um aquecedor elétrico direto.\n\n## Três passos simples\n\n1. **Veja o gráfico de manhã** — anote as 3–4 horas mais baratas do dia.\n2. **Suba 1–2 °C nas horas baratas** — a casa armazena o calor como uma bateria.\n3. **Baixe 1–2 °C nas horas caras** — o conforto quase não muda.\n\n## Quanto se pode poupar?\n\nCerca de **15–25 %** da fatura do aquecimento no inverno.\n\n## Dica\n\nUm termóstato inteligente (Tado, Bosch EasyControl) segue automaticamente os preços horários.`
      },
      ro: {
        title: "Cum economisești cu o pompă de căldură",
        summary: "Setează o temperatură mai mare în orele cele mai ieftine și redu-o când prețurile sunt mari.",
        content: `## De ce merită pompa de căldură\n\nO pompă de căldură transformă fiecare kWh de electricitate în 3–5 kWh de căldură. Chiar și în orele scumpe este mai ieftină decât un radiator electric direct.\n\n## Trei pași simpli\n\n1. **Verifică graficul dimineața** — notează cele 3–4 cele mai ieftine ore ale zilei.\n2. **Crește temperatura cu 1–2 °C în orele ieftine** — casa stochează căldura ca o baterie.\n3. **Scade cu 1–2 °C în orele scumpe** — confortul se schimbă abia perceptibil.\n\n## Cât se poate economisi?\n\nCirca **15–25 %** din factura de încălzire iarna.\n\n## Sfat\n\nUn termostat inteligent (Tado, Bosch EasyControl) urmărește automat prețurile orare.`
      },
      bg: {
        title: "Как да спестявате с термопомпа",
        summary: "Загрявайте по-силно в най-евтините часове и намалявайте, когато цените са най-високи.",
        content: `## Защо термопомпата си струва\n\nТермопомпата превръща всеки kWh електричество в 3–5 kWh топлина. Дори в скъпите часове е по-евтина от директен електрически радиатор.\n\n## Три прости стъпки\n\n1. **Проверете графиката сутрин** — отбележете 3–4 най-евтини часа от деня.\n2. **Повишете температурата с 1–2 °C в евтините часове** — къщата съхранява топлината като батерия.\n3. **Намалете с 1–2 °C в скъпите часове** — комфортът почти не се променя.\n\n## Колко може да се спести?\n\nОколо **15–25 %** от сметката за отопление през зимата.\n\n## Съвет\n\nИнтелигентен термостат (Tado, Bosch EasyControl) автоматично следи часовите цени.`
      },
      el: {
        title: "Πώς να εξοικονομήσετε με αντλία θερμότητας",
        summary: "Ρυθμίστε υψηλότερη θερμοκρασία στις φθηνότερες ώρες και χαμηλώστε όταν οι τιμές κορυφώνονται.",
        content: `## Γιατί συμφέρει η αντλία θερμότητας\n\nΜια αντλία θερμότητας μετατρέπει κάθε kWh ηλεκτρικού ρεύματος σε 3–5 kWh θερμότητας. Ακόμη και τις ακριβές ώρες είναι φθηνότερη από έναν απευθείας ηλεκτρικό θερμαντήρα.\n\n## Τρία απλά βήματα\n\n1. **Δείτε το γράφημα το πρωί** — σημειώστε τις 3–4 φθηνότερες ώρες της ημέρας.\n2. **Αυξήστε τη θερμοκρασία κατά 1–2 °C τις φθηνές ώρες** — το σπίτι αποθηκεύει θερμότητα σαν μπαταρία.\n3. **Μειώστε κατά 1–2 °C τις ακριβές ώρες** — η άνεση αλλάζει ελάχιστα.\n\n## Πόσο μπορείτε να εξοικονομήσετε;\n\nΠερίπου **15–25 %** του λογαριασμού θέρμανσης το χειμώνα.\n\n## Συμβουλή\n\nΈνας έξυπνος θερμοστάτης (Tado, Bosch EasyControl) ακολουθεί αυτόματα τις ωριαίες τιμές.`
      },
      hr: {
        title: "Kako uštedjeti s dizalicom topline",
        summary: "Grijte više u najjeftinijim satima i smanjite kad cijene rastu.",
        content: `## Zašto se isplati dizalica topline\n\nDizalica topline pretvara svaki kWh struje u 3–5 kWh topline. Čak je i u skupim satima jeftinija od izravnog električnog grijača.\n\n## Tri jednostavna koraka\n\n1. **Pogledajte graf ujutro** — označite 3–4 najjeftinija sata u danu.\n2. **Podignite temperaturu za 1–2 °C u jeftinim satima** — kuća sprema toplinu poput baterije.\n3. **Spustite za 1–2 °C u skupim satima** — udobnost se gotovo ne mijenja.\n\n## Koliko se može uštedjeti?\n\nOko **15–25 %** zimskog računa za grijanje.\n\n## Savjet\n\nPametni termostat (Tado, Bosch EasyControl) automatski prati satne cijene.`
      },
      sl: {
        title: "Kako varčevati s toplotno črpalko",
        summary: "Ogrevajte močneje v najcenejših urah in znižajte temperaturo, ko so cene najvišje.",
        content: `## Zakaj se toplotna črpalka splača\n\nToplotna črpalka pretvori vsak kWh elektrike v 3–5 kWh toplote. Tudi v dragih urah je cenejša od neposrednega električnega grelnika.\n\n## Trije preprosti koraki\n\n1. **Zjutraj preverite graf** — označite 3–4 najcenejše ure dneva.\n2. **Dvignite temperaturo za 1–2 °C v cenenih urah** — hiša shrani toploto kot baterija.\n3. **Znižajte za 1–2 °C v dragih urah** — udobje se komaj spremeni.\n\n## Koliko se da prihraniti?\n\nOkoli **15–25 %** ogrevalnega računa pozimi.\n\n## Nasvet\n\nPametni termostat (Tado, Bosch EasyControl) samodejno sledi urnim cenam.`
      },
      mt: {
        title: "Kif tiffranka bil-pompa tas-sħana",
        summary: "Issaħħan iktar fl-irħas sigħat u naqqas meta l-prezzijiet jogħlew.",
        content: `## Għaliex il-pompa tas-sħana taħdem\n\nPompa tas-sħana taqleb kull kWh ta' elettriku f'3–5 kWh ta' sħana. Anke fis-sigħat għaljin hi orħas minn heater elettriku dirett.\n\n## Tliet passi sempliċi\n\n1. **Iċċekkja l-graff filgħodu** — innota t-3–4 sigħat l-orħas tal-ġurnata.\n2. **Għolli t-temperatura b'1–2 °C fis-sigħat irħas** — id-dar taħżen is-sħana bħal batterija.\n3. **Naqqas b'1–2 °C fis-sigħat għaljin** — il-kumdità tinbidel ftit li xejn.\n\n## Kemm tista' tiffranka?\n\nMadwar **15–25 %** mill-kont tat-tisħin fix-xitwa.\n\n## Parir\n\nTermostat intelliġenti (Tado, Bosch EasyControl) isegwi awtomatikament il-prezzijiet fis-siegħa.`
      },
      ga: {
        title: "Conas airgead a shábháil le teaschaidéal",
        summary: "Ardaigh an teocht le linn na n-uaireanta is saoire, agus laghdaigh é nuair atá na praghsanna ag a mbarr.",
        content: `## Cén fáth go bhfuil teaschaidéil ar fheabhas\n\nIompóidh teaschaidéal gach kWh leictreachais ina 3–5 kWh teasa. Fiú amháin le linn uaireanta daor, tá sé níos saoire ná téitheoir díreach leictreach.\n\n## Trí chéim shimplí\n\n1. **Féach ar an gcairt ar maidin** — marcáil na 3–4 huaire is saoire den lá.\n2. **Ardaigh an teocht 1–2 °C le linn uaireanta saora** — stórálann an teach an teas mar a bheadh ceallraí.\n3. **Laghdaigh 1–2 °C le linn uaireanta daora** — is ar éigean a athraíonn an chompóird.\n\n## Cá mhéad is féidir a shábháil?\n\nThart ar **15–25 %** den bhille téimh sa gheimhreadh.\n\n## Leid\n\nLeanann teirmeasta cliste (Tado, Bosch EasyControl) na praghsanna in aghaidh na huaire go huathoibríoch.`
      }
    }
  },
  {
    id: "elektroauto-uzlade-nakti",
    date: "2026-05-05",
    cover: "🚗",
    readMinutes: 3,
    tags: ["elektroauto", "uzlāde", "nakts tarifs"],
    i18n: {
      lv: {
        title: "Elektroauto uzlāde naktīs",
        summary: "Naktis parasti ir lētākais laiks uzlādei, bet vienmēr seko līdzi grafikam — vējainās naktīs cena var negaidīti pieaugt.",
        content: `## Kāpēc nakts uzlāde ir izdevīgākā\n\nNakts stundās (00:00–06:00) pieprasījums pēc elektrības ir zems. Bieži vien cena nokrīt **2–4 reizes zemāk** par dienas vidējo.\n\n## Iestati lādētāja grafiku\n\nLielākā daļa mūsdienu lādētāju (Easee, Wallbox, Tesla) ļauj iestatīt **lādēšanas logu**. Iesaku:\n\n- Sākums: **01:00**\n- Beigas: **05:00**\n\n## Kad NEdarīt naktī\n\n- **Stiprs ziemeļvējš** — vēja parku ražošana krīt\n- **Aukstas dienas (-15 °C)** — apkure paaugstina pieprasījumu\n\nTad labāk **uzlādēt dienas vidū**.\n\n## Aptuvenais ietaupījums\n\nPārejot uz dinamisko nakts uzlādi, vidējais elektroauto īpašnieks ietaupa **€20–€40 mēnesī**.`
      },
      en: {
        title: "Night EV charging",
        summary: "Nights are usually the cheapest time, but check the chart — windless nights can spike unexpectedly.",
        content: `## Why night charging wins\n\nDemand drops at night, and prices can fall **2–4× below** the daytime average between 00:00–06:00.\n\n## Set the charger schedule\n\nMost modern chargers (Easee, Wallbox, Tesla) let you set a charging window. Suggested:\n\n- Start: **01:00**\n- End: **05:00**\n\n## When NOT to charge at night\n\n- **Strong north winds** stalling wind output\n- **Cold snaps (-15 °C)** raising heating demand\n\nOn those days, midday solar peaks can be cheaper.\n\n## Typical savings\n\nSwitching to dynamic night charging saves **€20–€40 / month** for an average EV.`
      },
      de: {
        title: "E-Auto nachts laden",
        summary: "Nächte sind meist am günstigsten — prüfen Sie aber den Chart bei windstillen Nächten.",
        content: `## Warum Nachtladen lohnt\n\nNachts (00:00–06:00) sinkt die Nachfrage, und der Preis liegt oft **2–4× unter** dem Tagesmittel.\n\n## Ladezeitfenster einrichten\n\nDie meisten Wallboxen (Easee, Wallbox, Tesla) erlauben ein Ladefenster. Empfehlung:\n\n- Start: **01:00**\n- Ende: **05:00**\n\n## Wann NICHT nachts laden\n\n- **Starker Nordwind** — Windkraft sinkt\n- **Kältewellen (-15 °C)** — Heizbedarf steigt\n\nDann lieber mittags laden.\n\n## Typische Ersparnis\n\nDer Wechsel zum dynamischen Nachttarif spart **20–40 € / Monat**.`
      },
      fr: {
        title: "Recharge nocturne du véhicule électrique",
        summary: "La nuit est généralement le moment le moins cher, mais regardez le graphique — les nuits sans vent peuvent surprendre.",
        content: `## Pourquoi recharger la nuit\n\nLa demande chute la nuit, et les prix tombent souvent **2 à 4× sous** la moyenne diurne entre 00h00 et 06h00.\n\n## Programmer la borne\n\nLa plupart des bornes (Easee, Wallbox, Tesla) permettent de définir une plage. Suggéré :\n\n- Début : **01h00**\n- Fin : **05h00**\n\n## Quand ÉVITER la nuit\n\n- **Vent du nord faible** — production éolienne en baisse\n- **Vagues de froid (-15 °C)** — demande de chauffage en hausse\n\nMieux vaut alors recharger en milieu de journée.\n\n## Économies typiques\n\nPasser à la recharge nocturne dynamique fait économiser **20 à 40 € par mois**.`
      },
      es: {
        title: "Carga nocturna de coche eléctrico",
        summary: "Las noches suelen ser el momento más barato, pero comprueba el gráfico — las noches sin viento pueden ser más caras.",
        content: `## Por qué cargar de noche\n\nLa demanda cae por la noche y los precios bajan **entre 2 y 4 veces** por debajo de la media diurna entre las 00:00 y las 06:00.\n\n## Programa el cargador\n\nLa mayoría de cargadores modernos (Easee, Wallbox, Tesla) permiten definir una ventana de carga. Sugerido:\n\n- Inicio: **01:00**\n- Fin: **05:00**\n\n## Cuándo NO cargar de noche\n\n- **Viento del norte flojo** — baja producción eólica\n- **Olas de frío (-15 °C)** — sube la demanda de calefacción\n\nEn esos días, los picos solares del mediodía pueden ser más baratos.\n\n## Ahorro típico\n\nPasar a carga nocturna dinámica ahorra **20–40 € al mes**.`
      },
      et: {
        title: "Elektriauto öine laadimine",
        summary: "Öösel on hinnad tavaliselt madalaimad, kuid jälgi graafikut — tuulevaiksetel öödel võivad hinnad ootamatult tõusta.",
        content: `## Miks öine laadimine on parim\n\nÖösel (00:00–06:00) nõudlus langeb ja hind on sageli **2–4 korda madalam** päevasest keskmisest.\n\n## Sea laadija ajakava\n\nEnamik kaasaegseid laadijaid (Easee, Wallbox, Tesla) lubavad määrata laadimisakna. Soovitatav:\n\n- Algus: **01:00**\n- Lõpp: **05:00**\n\n## Millal MITTE laadida öösel\n\n- **Tugev põhjatuul** — tuulekoormus langeb\n- **Külmalained (-15 °C)** — kütte nõudlus tõuseb\n\nNeil päevadel laadi parem keskpäeval.\n\n## Tüüpiline sääst\n\nÜleminek dünaamilisele öisele laadimisele säästab **20–40 € kuus**.`
      },
      lt: {
        title: "Elektromobilio krovimas naktį",
        summary: "Naktys paprastai yra pigiausias laikas, tačiau visada patikrinkite grafiką — bevėjėmis naktimis kaina gali pakilti.",
        content: `## Kodėl naktinis krovimas pigiausias\n\nNaktį paklausa krenta, o kainos 00:00–06:00 laikotarpiu dažnai būna **2–4 kartus mažesnės** už dienos vidurkį.\n\n## Nustatykite kroviklio grafiką\n\nDauguma šiuolaikinių kroviklių (Easee, Wallbox, Tesla) leidžia nustatyti krovimo langą. Rekomenduojama:\n\n- Pradžia: **01:00**\n- Pabaiga: **05:00**\n\n## Kada NEKROVIMĖ naktį\n\n- **Stiprus šiaurės vėjas** — krenta vėjo gamyba\n- **Šaltis (-15 °C)** — auga šildymo paklausa\n\nTokiomis dienomis geriau kraukite vidurdienį.\n\n## Tipinis sutaupymas\n\nPerėjus prie dinaminio naktinio krovimo, sutaupoma **20–40 € per mėnesį**.`
      },
      fi: {
        title: "Sähköauton lataus yöllä",
        summary: "Yö on yleensä halvin aika, mutta tarkista kuvaaja — tuulettomina öinä hinta voi nousta yllättäen.",
        content: `## Miksi yölataus kannattaa\n\nYöllä (00:00–06:00) kysyntä laskee ja hinta on usein **2–4 kertaa alle** päiväkeskiarvon.\n\n## Aseta latausaika\n\nUseimmat latauslaitteet (Easee, Wallbox, Tesla) sallivat lataikkunan. Suositus:\n\n- Alku: **01:00**\n- Loppu: **05:00**\n\n## Milloin EI ladata yöllä\n\n- **Vahva pohjoistuuli** — tuulisähkö vähenee\n- **Pakkasaalto (-15 °C)** — lämmityskysyntä kasvaa\n\nNiinä päivinä lataa mieluummin keskipäivällä.\n\n## Tyypillinen säästö\n\nDynaamiseen yölataukseen siirtyminen säästää **20–40 € / kuukausi**.`
      },
      sv: {
        title: "Ladda elbilen på natten",
        summary: "Nätterna är oftast billigast, men kolla diagrammet — vindstilla nätter kan oväntat stiga i pris.",
        content: `## Varför nattladdning vinner\n\nEfterfrågan minskar nattetid och priserna ligger ofta **2–4× under** dagens medel mellan 00:00 och 06:00.\n\n## Ställ in laddschema\n\nDe flesta moderna laddare (Easee, Wallbox, Tesla) tillåter ett laddfönster. Rekommendation:\n\n- Start: **01:00**\n- Slut: **05:00**\n\n## När du INTE ska ladda på natten\n\n- **Stark nordanvind** — vindkraften minskar\n- **Köldknäppar (-15 °C)** — uppvärmningsbehovet ökar\n\nLadda hellre mitt på dagen då.\n\n## Typisk besparing\n\nByte till dynamisk nattladdning sparar **20–40 € / månad**.`
      },
      da: {
        title: "Opladning af elbil om natten",
        summary: "Natten er normalt billigst, men tjek grafen — vindstille nætter kan stige uventet.",
        content: `## Hvorfor natopladning vinder\n\nEfterspørgslen falder om natten, og priserne ligger ofte **2–4× under** dagsgennemsnittet mellem 00:00 og 06:00.\n\n## Indstil ladeplan\n\nDe fleste moderne ladere (Easee, Wallbox, Tesla) tillader et ladevindue. Forslag:\n\n- Start: **01:00**\n- Slut: **05:00**\n\n## Hvornår du IKKE skal lade om natten\n\n- **Stærk nordenvind** — vindproduktion falder\n- **Kuldebølger (-15 °C)** — varmebehov stiger\n\nLad hellere midt på dagen på de dage.\n\n## Typisk besparelse\n\nSkift til dynamisk natladning sparer **20–40 € / måned**.`
      },
      nl: {
        title: "Elektrische auto 's nachts opladen",
        summary: "'s Nachts is meestal het goedkoopste moment, maar bekijk de grafiek — windstille nachten kunnen onverwacht duurder zijn.",
        content: `## Waarom 's nachts opladen loont\n\nDe vraag daalt 's nachts en de prijs ligt vaak **2–4× onder** het daggemiddelde tussen 00:00 en 06:00.\n\n## Stel het laadschema in\n\nDe meeste moderne laders (Easee, Wallbox, Tesla) staan een laadvenster toe. Aanbevolen:\n\n- Start: **01:00**\n- Eind: **05:00**\n\n## Wanneer NIET 's nachts opladen\n\n- **Sterke noordenwind** — windproductie daalt\n- **Koudegolven (-15 °C)** — verwarmingsvraag stijgt\n\nLaad dan liever midden op de dag.\n\n## Typische besparing\n\nOverstappen op dynamisch nachtladen scheelt **20–40 € / maand**.`
      },
      pl: {
        title: "Ładowanie samochodu elektrycznego nocą",
        summary: "Noc to zwykle najtańszy czas, ale sprawdzaj wykres — w bezwietrzne noce cena może niespodziewanie wzrosnąć.",
        content: `## Dlaczego nocne ładowanie się opłaca\n\nPopyt spada w nocy, a ceny często są **2–4× niższe** od średniej dziennej między 00:00 a 06:00.\n\n## Ustaw harmonogram ładowarki\n\nWiększość nowoczesnych ładowarek (Easee, Wallbox, Tesla) pozwala ustawić okno ładowania. Sugestia:\n\n- Start: **01:00**\n- Koniec: **05:00**\n\n## Kiedy NIE ładować nocą\n\n- **Silny wiatr północny** — spada produkcja wiatrowa\n- **Mrozy (-15 °C)** — rośnie zapotrzebowanie na ogrzewanie\n\nW takich dniach ładuj raczej w południe.\n\n## Typowa oszczędność\n\nPrzejście na dynamiczne ładowanie nocne pozwala zaoszczędzić **20–40 € miesięcznie**.`
      },
      cs: {
        title: "Noční nabíjení elektromobilu",
        summary: "Noc bývá nejlevnější, ale sledujte graf — za bezvětrných nocí může cena nečekaně vyletět.",
        content: `## Proč se vyplatí nabíjet v noci\n\nPoptávka v noci klesá a ceny mezi 00:00 a 06:00 bývají **2–4× nižší** než denní průměr.\n\n## Nastavte rozvrh nabíječky\n\nVětšina moderních wallboxů (Easee, Wallbox, Tesla) umožňuje nastavit nabíjecí okno. Doporučení:\n\n- Začátek: **01:00**\n- Konec: **05:00**\n\n## Kdy NENABÍJET v noci\n\n- **Silný severní vítr** — klesá výroba z větru\n- **Mrazy (-15 °C)** — roste poptávka po topení\n\nV takových dnech raději nabíjejte v poledne.\n\n## Typická úspora\n\nPřechod na dynamické noční nabíjení ušetří **20–40 € měsíčně**.`
      },
      sk: {
        title: "Nočné nabíjanie elektromobilu",
        summary: "Noc býva najlacnejšia, ale sledujte graf — pri bezvetrných nociach môže cena nečakane vzrásť.",
        content: `## Prečo sa oplatí nabíjať v noci\n\nDopyt v noci klesá a ceny medzi 00:00 a 06:00 bývajú **2–4× nižšie** než denný priemer.\n\n## Nastavte rozvrh nabíjačky\n\nVäčšina moderných wallboxov (Easee, Wallbox, Tesla) umožňuje nastaviť nabíjacie okno. Odporúčanie:\n\n- Začiatok: **01:00**\n- Koniec: **05:00**\n\n## Kedy NENABÍJAJTE v noci\n\n- **Silný severný vietor** — klesá výroba z vetra\n- **Mrazy (-15 °C)** — rastie dopyt po kúrení\n\nV takých dňoch radšej nabíjajte na poludnie.\n\n## Typická úspora\n\nPrechod na dynamické nočné nabíjanie ušetrí **20–40 € mesačne**.`
      },
      hu: {
        title: "Elektromos autó éjszakai töltése",
        summary: "Az éjszaka általában a legolcsóbb, de nézd a grafikont — szélcsendes éjszakákon a ár meglepően magas lehet.",
        content: `## Miért éri meg éjjel tölteni\n\nA kereslet éjszaka csökken, és a árak gyakran **2–4× alacsonyabbak** a nappali átlagnál 00:00 és 06:00 között.\n\n## Állítsd be a töltő ütemezést\n\nA legtöbb modern töltő (Easee, Wallbox, Tesla) lehetővé teszi a töltési ablak beállítását. Javasolt:\n\n- Kezdés: **01:00**\n- Vége: **05:00**\n\n## Mikor NE tölts éjszaka\n\n- **Erős északi szél** — csökken a szélenergia\n- **Hideghullámok (-15 °C)** — nő a fűtési igény\n\nIlyen napokon inkább délben tölts.\n\n## Tipikus megtakarítás\n\nA dinamikus éjszakai töltésre váltás **havi 20–40 €**-t spórol.`
      },
      it: {
        title: "Ricarica notturna dell'auto elettrica",
        summary: "Le notti sono di solito il momento più economico, ma controlla il grafico — le notti senza vento possono salire inaspettatamente.",
        content: `## Perché la ricarica notturna conviene\n\nLa domanda cala di notte e i prezzi tra le 00:00 e le 06:00 sono spesso **2–4× sotto** la media diurna.\n\n## Imposta il programma di ricarica\n\nLa maggior parte delle wallbox moderne (Easee, Wallbox, Tesla) permette di impostare una finestra di ricarica. Suggerito:\n\n- Inizio: **01:00**\n- Fine: **05:00**\n\n## Quando NON caricare di notte\n\n- **Forte vento del nord** — cala la produzione eolica\n- **Ondate di freddo (-15 °C)** — sale la domanda di riscaldamento\n\nIn quei giorni meglio caricare a mezzogiorno.\n\n## Risparmio tipico\n\nPassare alla ricarica notturna dinamica fa risparmiare **20–40 € al mese**.`
      },
      pt: {
        title: "Carregamento noturno do carro elétrico",
        summary: "As noites são geralmente o momento mais barato, mas verifique o gráfico — noites sem vento podem subir inesperadamente.",
        content: `## Porque o carregamento noturno é vantajoso\n\nA procura desce à noite e os preços entre as 00:00 e as 06:00 são frequentemente **2–4× abaixo** da média diurna.\n\n## Defina o horário do carregador\n\nA maioria dos carregadores modernos (Easee, Wallbox, Tesla) permite definir uma janela de carregamento. Sugerido:\n\n- Início: **01:00**\n- Fim: **05:00**\n\n## Quando NÃO carregar à noite\n\n- **Vento norte forte** — cai a produção eólica\n- **Ondas de frio (-15 °C)** — sobe a procura por aquecimento\n\nNesses dias, prefira carregar ao meio-dia.\n\n## Poupança típica\n\nMudar para carregamento noturno dinâmico poupa **20–40 € por mês**.`
      },
      ro: {
        title: "Încărcarea mașinii electrice noaptea",
        summary: "Nopțile sunt de obicei cel mai ieftin moment, dar verifică graficul — în nopțile fără vânt prețurile pot crește.",
        content: `## De ce încărcarea de noapte câștigă\n\nCererea scade noaptea, iar prețurile între 00:00 și 06:00 sunt adesea **de 2–4 ori mai mici** decât media diurnă.\n\n## Setează programul încărcătorului\n\nMajoritatea încărcătoarelor moderne (Easee, Wallbox, Tesla) permit setarea unei ferestre. Recomandare:\n\n- Început: **01:00**\n- Sfârșit: **05:00**\n\n## Când să NU încarci noaptea\n\n- **Vânt puternic din nord** — producția eoliană scade\n- **Valuri de frig (-15 °C)** — cererea de încălzire crește\n\nÎn acele zile încarcă mai bine la prânz.\n\n## Economii tipice\n\nTrecerea la încărcare nocturnă dinamică economisește **20–40 € pe lună**.`
      },
      bg: {
        title: "Нощно зареждане на електромобил",
        summary: "Нощите обикновено са най-евтиното време, но проверявайте графиката — в безветрени нощи цената може неочаквано да скочи.",
        content: `## Защо нощното зареждане е изгодно\n\nТърсенето пада през нощта, а цените между 00:00 и 06:00 често са **2–4 пъти по-ниски** от дневната средна.\n\n## Настройте графика на зарядното\n\nПовечето модерни зарядни (Easee, Wallbox, Tesla) позволяват настройка на прозорец за зареждане. Препоръка:\n\n- Начало: **01:00**\n- Край: **05:00**\n\n## Кога да НЕ зареждате нощем\n\n- **Силен северен вятър** — пада вятърното производство\n- **Студени вълни (-15 °C)** — расте търсенето за отопление\n\nВ такива дни е по-добре да заредите по обяд.\n\n## Типично спестяване\n\nПреминаването към динамично нощно зареждане спестява **20–40 € на месец**.`
      },
      el: {
        title: "Νυχτερινή φόρτιση ηλεκτρικού αυτοκινήτου",
        summary: "Οι νύχτες είναι συνήθως η φθηνότερη ώρα, αλλά ελέγξτε το γράφημα — οι ήρεμες νύχτες μπορούν απρόσμενα να ανέβουν.",
        content: `## Γιατί η νυχτερινή φόρτιση νικά\n\nΗ ζήτηση πέφτει τη νύχτα και οι τιμές μεταξύ 00:00 και 06:00 είναι συχνά **2–4 φορές χαμηλότερες** από τον ημερήσιο μέσο όρο.\n\n## Ρυθμίστε το πρόγραμμα φορτιστή\n\nΟι περισσότεροι σύγχρονοι φορτιστές (Easee, Wallbox, Tesla) επιτρέπουν παράθυρο φόρτισης. Προτείνεται:\n\n- Έναρξη: **01:00**\n- Λήξη: **05:00**\n\n## Πότε ΟΧΙ φόρτιση νυχτερινή\n\n- **Δυνατός βόρειος άνεμος** — πέφτει η αιολική παραγωγή\n- **Ψύχη (-15 °C)** — αυξάνεται η ζήτηση θέρμανσης\n\nΕκείνες τις μέρες φορτίστε μεσημέρι.\n\n## Τυπική εξοικονόμηση\n\nΗ μετάβαση σε δυναμική νυχτερινή φόρτιση εξοικονομεί **20–40 €/μήνα**.`
      },
      hr: {
        title: "Noćno punjenje električnog automobila",
        summary: "Noći su obično najjeftinije, ali provjerite graf — u bezvjetrim noćima cijena može iznenada porasti.",
        content: `## Zašto noćno punjenje pobjeđuje\n\nPotražnja noću pada, a cijene između 00:00 i 06:00 često su **2–4 puta niže** od dnevnog prosjeka.\n\n## Postavite raspored punjača\n\nVećina modernih punjača (Easee, Wallbox, Tesla) omogućuje prozor punjenja. Preporuka:\n\n- Početak: **01:00**\n- Kraj: **05:00**\n\n## Kada NE puniti noću\n\n- **Jaki sjeverni vjetar** — pada proizvodnja vjetra\n- **Hladni valovi (-15 °C)** — raste potreba za grijanjem\n\nTih dana radije punite usred dana.\n\n## Tipična ušteda\n\nPrijelaz na dinamično noćno punjenje štedi **20–40 € mjesečno**.`
      },
      sl: {
        title: "Nočno polnjenje električnega avtomobila",
        summary: "Noči so običajno najcenejši čas, vendar preverite graf — v brezvetrnih nočih lahko cena nepričakovano naraste.",
        content: `## Zakaj nočno polnjenje zmaga\n\nPovpraševanje ponoči pade, cene med 00:00 in 06:00 pa so pogosto **2–4-krat nižje** od dnevnega povprečja.\n\n## Nastavite urnik polnilnice\n\nVečina sodobnih polnilnic (Easee, Wallbox, Tesla) omogoča okno polnjenja. Priporočilo:\n\n- Začetek: **01:00**\n- Konec: **05:00**\n\n## Kdaj NE polnite ponoči\n\n- **Močan severni veter** — pada proizvodnja iz vetra\n- **Ohladitev (-15 °C)** — raste potreba po ogrevanju\n\nTakrat polnite raje opoldne.\n\n## Tipičen prihranek\n\nPrehod na dinamično nočno polnjenje prihrani **20–40 € na mesec**.`
      },
      mt: {
        title: "Iċċarġjar tal-karozza elettrika billejl",
        summary: "Il-lejl ġeneralment huwa l-irħas, iżda iċċekkja l-graff — fil-lejliet bla riħ il-prezz jista' jogħla.",
        content: `## Għalfejn iċ-ċarġjar billejl jirbaħ\n\nId-domanda tinżel billejl, u l-prezzijiet bejn 00:00 u 06:00 spiss huma **2–4 darbiet inqas** mill-medja bil-jum.\n\n## Issettja l-iskeda taċ-charger\n\nIl-biċċa l-kbira tal-chargers moderni (Easee, Wallbox, Tesla) jippermettu tieqa taċ-ċarġjar. Suġġerita:\n\n- Bidu: **01:00**\n- Tmiem: **05:00**\n\n## Meta TAL-EBDA ma tiċċarġja billejl\n\n- **Riħ qawwi tat-tramuntana** — il-produzzjoni tar-riħ tinżel\n- **Mewġiet ta' kesħa (-15 °C)** — id-domanda tat-tisħin togħla\n\nF'dawk il-jiem aħjar tiċċarġja f'nofsinhar.\n\n## Iffrankar tipiku\n\nIl-qalba għaċ-ċarġjar dinamiku billejl tiffranka **20–40 € fix-xahar**.`
      },
      ga: {
        title: "Carrcharhdú feithicle leictrí istoíche",
        summary: "Is iondúil gurb iad oícheanta an t-am is saoire, ach féach an chairt — d'fhéadfadh oíche gan ghaoth méadú gan choinne.",
        content: `## Cén fáth go mbuann lódáil oíche\n\nTitfeann an t-éileamh san oíche, agus is minic a bhíonn praghsanna idir 00:00 agus 06:00 **2–4 huaire níos ísle** ná an meán laethúil.\n\n## Socraigh sceideal an luchtaire\n\nLigeann formhór na luchtairí nua-aimseartha (Easee, Wallbox, Tesla) fuinneog luchtaithe a shocrú. Moltar:\n\n- Tús: **01:00**\n- Deireadh: **05:00**\n\n## Cathain a sheachainfeá luchtú oíche\n\n- **Gaoth láidir aduaidh** — titim ar an aschur gaoithe\n- **Tonn fhuachta (-15 °C)** — ardú ar éileamh téimh\n\nNa laethanta sin, luchtaigh i lár an lae.\n\n## Coigilteas tipiciúil\n\nAistriú chuig luchtú oíche dinimiciúil — coigilteas thart ar **€20–40 in aghaidh na míosa**.`
      }
    }
  },
  {
    id: "veladas-masinas-laiks",
    date: "2026-04-28",
    cover: "🧺",
    readMinutes: 2,
    tags: ["sadzīves tehnika", "veļa", "padomi"],
    i18n: {
      lv: {
        title: "Kad griezt veļas mašīnu?",
        summary: "Vislabākais laiks veļas mazgāšanai ir starp 13:00 un 15:00 vai pēc 22:00 — kad cenas zemāk par dienas vidējo.",
        content: `## Cik elektrības patērē veļas mašīna?\n\nViena pilna mazgāšana 40 °C režīmā = aptuveni **0.7 kWh**.\nPie cenas 30 ct/kWh = 21 ct. Pie 5 ct/kWh = 3.5 ct.\n\n## Vienkāršs likums\n\nAtver PowerPrice un atrodi **lētāko 2 stundu logu dienā** — tieši tad palaid veļas mašīnu un trauku mazgājamo mašīnu vienlaicīgi.\n\n## Atliktās palaišanas funkcija\n\nLielākajai daļai mūsdienu mašīnu ir **delay start** funkcija. Vakarā ielādē veļu, iestati atliktu palaišanu uz 14:00 nākamajā dienā.`
      },
      en: {
        title: "When to run the washing machine?",
        summary: "Best windows: 13:00–15:00 or after 22:00 — when prices are below the daily average.",
        content: `## How much does a wash cost?\n\nOne full 40 °C wash = around **0.7 kWh**.\nAt 30 ct/kWh that's 21 cents. At 5 ct/kWh — just 3.5 cents.\n\n## Simple rule\n\nOpen PowerPrice, find the **cheapest 2-hour window of the day**, and run the washer and dishwasher at the same time.\n\n## Delay-start\n\nMost modern machines have a **delay start** feature. Load it in the evening, schedule it for 14:00, and the house quietly works the cheap slot for you.`
      },
      de: {
        title: "Wann läuft die Waschmaschine am günstigsten?",
        summary: "Beste Zeiten: 13:00–15:00 oder nach 22:00 — wenn die Preise unter dem Tagesdurchschnitt liegen.",
        content: `## Wie viel kostet ein Waschgang?\n\nEine volle 40 °C-Wäsche = etwa **0,7 kWh**.\nBei 30 ct/kWh = 21 Cent. Bei 5 ct/kWh = nur 3,5 Cent.\n\n## Einfache Regel\n\nÖffnen Sie PowerPrice und finden Sie das **günstigste 2-Stunden-Fenster des Tages** — dann Waschmaschine und Spülmaschine gleichzeitig starten.\n\n## Startverzögerung\n\nDie meisten modernen Maschinen haben eine **Startverzögerung**. Abends beladen, auf 14:00 programmieren — fertig.`
      },
      fr: {
        title: "Quand lancer la machine à laver ?",
        summary: "Meilleurs créneaux : 13h–15h ou après 22h — lorsque les prix sont sous la moyenne journalière.",
        content: `## Combien coûte une machine ?\n\nUn cycle complet à 40 °C = environ **0,7 kWh**.\nÀ 30 ct/kWh, cela fait 21 centimes. À 5 ct/kWh — seulement 3,5 centimes.\n\n## Règle simple\n\nOuvrez PowerPrice, trouvez la **fenêtre de 2 heures la moins chère du jour**, et lancez machine et lave-vaisselle simultanément.\n\n## Départ différé\n\nLa plupart des machines modernes ont une fonction **départ différé**. Chargez le soir, programmez pour 14h, et la maison travaille pour vous.`
      },
      es: {
        title: "¿Cuándo poner la lavadora?",
        summary: "Mejores franjas: 13:00–15:00 o después de las 22:00 — cuando los precios están por debajo de la media diaria.",
        content: `## ¿Cuánto cuesta un lavado?\n\nUn lavado completo a 40 °C = unos **0,7 kWh**.\nA 30 ct/kWh son 21 céntimos. A 5 ct/kWh — solo 3,5 céntimos.\n\n## Regla simple\n\nAbre PowerPrice, encuentra **la ventana de 2 horas más barata del día**, y pon la lavadora y el lavavajillas al mismo tiempo.\n\n## Inicio diferido\n\nLa mayoría de las máquinas modernas tienen función **inicio diferido**. Cárgala por la noche, prográmala para las 14:00 y listo.`
      },
      et: {
        title: "Millal pesumasinat käivitada?",
        summary: "Parimad ajad: 13:00–15:00 või pärast 22:00 — kui hinnad on alla päeva keskmise.",
        content: `## Kui palju maksab üks pesu?\n\nÜks täispesu 40 °C-ga = umbes **0,7 kWh**.\n30 senti/kWh = 21 senti. 5 senti/kWh = ainult 3,5 senti.\n\n## Lihtne reegel\n\nAva PowerPrice, leia **päeva odavaim 2-tunnine aken** ja käivita pesumasin ning nõudepesumasin koos.\n\n## Hilinenud start\n\nEnamikul kaasaegsetel masinatel on **viivitusega start**. Lae õhtul, sea kell 14:00 ja maja töötab vaikselt sinu eest.`
      },
      lt: {
        title: "Kada įjungti skalbimo mašiną?",
        summary: "Geriausi langai: 13:00–15:00 arba po 22:00 — kai kainos žemiau dienos vidurkio.",
        content: `## Kiek kainuoja vienas skalbimas?\n\nVienas pilnas skalbimas 40 °C režimu = apie **0,7 kWh**.\nUž 30 ct/kWh = 21 ct. Už 5 ct/kWh = tik 3,5 ct.\n\n## Paprasta taisyklė\n\nAtidaryk PowerPrice, rask **pigiausią 2 valandų langą dienoje** ir paleisk skalbimo bei indaplovę vienu metu.\n\n## Atidėtas paleidimas\n\nDauguma šiuolaikinių mašinų turi **delay start** funkciją. Vakare užkrauk, nustatyk paleidimą 14:00 ir namas tyliai dirbs už tave.`
      },
      fi: {
        title: "Milloin pyykinpesukone kannattaa käynnistää?",
        summary: "Parhaat ikkunat: 13:00–15:00 tai 22:00 jälkeen — kun hinnat ovat päivän keskiarvon alle.",
        content: `## Kuinka paljon yksi pesu maksaa?\n\nYksi täysi 40 °C pesu = noin **0,7 kWh**.\n30 c/kWh = 21 senttiä. 5 c/kWh = vain 3,5 senttiä.\n\n## Yksinkertainen sääntö\n\nAvaa PowerPrice, etsi **päivän halvin 2 tunnin ikkuna** ja käynnistä pyykin- ja astianpesukone yhtä aikaa.\n\n## Viivästetty käynnistys\n\nUseimmissa nykykoneissa on **delay start** -toiminto. Lataa illalla, ajasta klo 14:00 — talo hoitaa loput.`
      },
      sv: {
        title: "När ska man köra tvättmaskinen?",
        summary: "Bästa fönster: 13:00–15:00 eller efter 22:00 — när priserna ligger under dagsmedel.",
        content: `## Hur mycket kostar en tvätt?\n\nEn full 40 °C-tvätt = ungefär **0,7 kWh**.\nVid 30 öre/kWh = 21 öre. Vid 5 öre/kWh = bara 3,5 öre.\n\n## Enkel regel\n\nÖppna PowerPrice, hitta dagens **billigaste 2-timmarsfönster** och kör tvätt- och diskmaskinen samtidigt.\n\n## Fördröjd start\n\nDe flesta moderna maskiner har **fördröjd start**. Fyll på kvällen, programmera till 14:00 — så sköter huset resten.`
      },
      da: {
        title: "Hvornår skal vaskemaskinen køre?",
        summary: "Bedste tidspunkter: 13:00–15:00 eller efter 22:00 — når priserne er under dagsgennemsnittet.",
        content: `## Hvad koster en vask?\n\nEn fuld 40 °C-vask = cirka **0,7 kWh**.\nVed 30 øre/kWh = 21 øre. Ved 5 øre/kWh = kun 3,5 øre.\n\n## Enkel regel\n\nÅbn PowerPrice, find dagens **billigste 2-timers vindue** og kør vaske- og opvaskemaskinen samtidig.\n\n## Udskudt start\n\nDe fleste moderne maskiner har **delay start**. Fyld om aftenen, programmer til kl. 14:00 — huset klarer resten.`
      },
      nl: {
        title: "Wanneer de wasmachine laten draaien?",
        summary: "Beste vensters: 13:00–15:00 of na 22:00 — wanneer de prijzen onder het daggemiddelde liggen.",
        content: `## Hoeveel kost een wasbeurt?\n\nEen volledige 40 °C-was = ongeveer **0,7 kWh**.\nBij 30 ct/kWh = 21 cent. Bij 5 ct/kWh = slechts 3,5 cent.\n\n## Eenvoudige regel\n\nOpen PowerPrice, vind het **goedkoopste venster van 2 uur** en zet de was- en vaatwasmachine tegelijk aan.\n\n## Uitgestelde start\n\nDe meeste moderne machines hebben een **uitgestelde start**. Laad 's avonds, programmeer voor 14:00 — het huis doet de rest.`
      },
      pl: {
        title: "Kiedy włączać pralkę?",
        summary: "Najlepsze okna: 13:00–15:00 lub po 22:00 — gdy ceny są poniżej średniej dziennej.",
        content: `## Ile kosztuje jedno pranie?\n\nJedno pełne pranie w 40 °C = około **0,7 kWh**.\nPrzy 30 gr/kWh = 21 gr. Przy 5 gr/kWh — tylko 3,5 gr.\n\n## Prosta zasada\n\nOtwórz PowerPrice, znajdź **najtańsze 2-godzinne okno dnia** i włącz pralkę oraz zmywarkę jednocześnie.\n\n## Opóźniony start\n\nWiększość nowoczesnych pralek ma funkcję **opóźnionego startu**. Załaduj wieczorem, zaprogramuj na 14:00 — dom zrobi resztę.`
      },
      cs: {
        title: "Kdy spustit pračku?",
        summary: "Nejlepší okna: 13:00–15:00 nebo po 22:00 — když jsou ceny pod denním průměrem.",
        content: `## Kolik stojí jedno praní?\n\nJedno plné praní na 40 °C = asi **0,7 kWh**.\nPři 30 hal/kWh = 21 haléřů. Při 5 hal/kWh — jen 3,5 haléře.\n\n## Jednoduché pravidlo\n\nOtevřete PowerPrice, najděte **nejlevnější dvouhodinové okno dne** a pusťte pračku a myčku najednou.\n\n## Odložený start\n\nVětšina moderních praček má **odložený start**. Večer naložte, naprogramujte na 14:00 — dům zařídí zbytek.`
      },
      sk: {
        title: "Kedy spustiť práčku?",
        summary: "Najlepšie okná: 13:00–15:00 alebo po 22:00 — keď sú ceny pod denným priemerom.",
        content: `## Koľko stojí jedno pranie?\n\nJedno plné pranie pri 40 °C = asi **0,7 kWh**.\nPri 30 hal/kWh = 21 halierov. Pri 5 hal/kWh — len 3,5 haliera.\n\n## Jednoduché pravidlo\n\nOtvorte PowerPrice, nájdite **najlacnejšie dvojhodinové okno dňa** a spustite práčku a umývačku riadu naraz.\n\n## Posunutý štart\n\nVäčšina moderných práčok má **odložený štart**. Večer naložte, naprogramujte na 14:00 — dom urobí zvyšok.`
      },
      hu: {
        title: "Mikor érdemes mosógépet beindítani?",
        summary: "Legjobb időszakok: 13:00–15:00 vagy 22:00 után — amikor a árak a napi átlag alatt vannak.",
        content: `## Mennyibe kerül egy mosás?\n\nEgy teljes 40 °C-os mosás = körülbelül **0,7 kWh**.\n30 fillér/kWh esetén = 21 fillér. 5 fillér/kWh esetén = csak 3,5 fillér.\n\n## Egyszerű szabály\n\nNyisd meg a PowerPrice-t, keresd meg a **nap legolcsóbb 2 órás ablakát**, és indítsd a mosógépet meg a mosogatógépet egyszerre.\n\n## Késleltetett indítás\n\nA legtöbb modern gépen van **delay start** funkció. Este pakold be, állítsd 14:00-ra — a ház csendben dolgozik érted.`
      },
      it: {
        title: "Quando far partire la lavatrice?",
        summary: "Finestre migliori: 13:00–15:00 o dopo le 22:00 — quando i prezzi sono sotto la media giornaliera.",
        content: `## Quanto costa un lavaggio?\n\nUn lavaggio pieno a 40 °C = circa **0,7 kWh**.\nA 30 ct/kWh = 21 cent. A 5 ct/kWh = solo 3,5 cent.\n\n## Regola semplice\n\nApri PowerPrice, trova la **finestra di 2 ore più economica del giorno** e fai partire lavatrice e lavastoviglie insieme.\n\n## Partenza ritardata\n\nLa maggior parte delle macchine moderne ha la **partenza ritardata**. Carica la sera, programma per le 14:00 e la casa fa il resto.`
      },
      pt: {
        title: "Quando ligar a máquina de lavar roupa?",
        summary: "Melhores janelas: 13:00–15:00 ou depois das 22:00 — quando os preços estão abaixo da média diária.",
        content: `## Quanto custa uma lavagem?\n\nUma lavagem completa a 40 °C = cerca de **0,7 kWh**.\nA 30 ct/kWh = 21 cêntimos. A 5 ct/kWh = apenas 3,5 cêntimos.\n\n## Regra simples\n\nAbra o PowerPrice, encontre a **janela de 2 horas mais barata do dia** e ligue a máquina de roupa e a de loiça em simultâneo.\n\n## Início diferido\n\nA maioria das máquinas modernas tem **início diferido**. Carregue à noite, programe para as 14:00 — a casa faz o resto.`
      },
      ro: {
        title: "Când să pornești mașina de spălat?",
        summary: "Cele mai bune intervale: 13:00–15:00 sau după 22:00 — când prețurile sunt sub media zilnică.",
        content: `## Cât costă o spălare?\n\nO spălare completă la 40 °C = aproximativ **0,7 kWh**.\nLa 30 bani/kWh = 21 bani. La 5 bani/kWh = doar 3,5 bani.\n\n## Regulă simplă\n\nDeschide PowerPrice, găsește **fereastra de 2 ore cea mai ieftină a zilei** și pornește mașina de spălat și cea de spălat vase în același timp.\n\n## Pornire întârziată\n\nMajoritatea mașinilor moderne au funcția **delay start**. Încarcă seara, programează pentru 14:00 — casa lucrează în liniște pentru tine.`
      },
      bg: {
        title: "Кога да пуснем пералнята?",
        summary: "Най-добри прозорци: 13:00–15:00 или след 22:00 — когато цените са под дневната средна.",
        content: `## Колко струва едно пране?\n\nЕдно пълно пране на 40 °C = около **0,7 kWh**.\nПри 30 ст/kWh = 21 стотинки. При 5 ст/kWh = само 3,5 стотинки.\n\n## Просто правило\n\nОтвори PowerPrice, намери **най-евтиния двучасов прозорец на деня** и пусни пералнята и съдомиялната едновременно.\n\n## Отложен старт\n\nПовечето модерни машини имат **отложен старт**. Заредете вечер, програмирайте за 14:00 — къщата работи тихо за вас.`
      },
      el: {
        title: "Πότε να βάλω το πλυντήριο;",
        summary: "Καλύτερα παράθυρα: 13:00–15:00 ή μετά τις 22:00 — όταν οι τιμές είναι κάτω από τον ημερήσιο μέσο όρο.",
        content: `## Πόσο κοστίζει μια πλύση;\n\nΜία πλήρης πλύση στους 40 °C = περίπου **0,7 kWh**.\nΣτα 30 ct/kWh = 21 λεπτά. Στα 5 ct/kWh = μόλις 3,5 λεπτά.\n\n## Απλός κανόνας\n\nΆνοιξε το PowerPrice, βρες το **φθηνότερο δίωρο παράθυρο της ημέρας** και βάλε πλυντήριο και πλυντήριο πιάτων μαζί.\n\n## Καθυστερημένη εκκίνηση\n\nΟι περισσότερες σύγχρονες συσκευές έχουν **delay start**. Φόρτωσε το βράδυ, ρύθμισε για τις 14:00 — το σπίτι δουλεύει για σένα.`
      },
      hr: {
        title: "Kada uključiti perilicu rublja?",
        summary: "Najbolji prozori: 13:00–15:00 ili poslije 22:00 — kad su cijene ispod dnevnog prosjeka.",
        content: `## Koliko košta jedno pranje?\n\nJedno potpuno pranje na 40 °C = oko **0,7 kWh**.\nPri 30 lp/kWh = 21 lipa. Pri 5 lp/kWh = samo 3,5 lipe.\n\n## Jednostavno pravilo\n\nOtvorite PowerPrice, pronađite **najjeftiniji dvosatni prozor dana** i uključite perilicu rublja i posuđa istovremeno.\n\n## Odgođeni start\n\nVećina modernih perilica ima **delay start**. Napunite navečer, programirajte za 14:00 — kuća radi za vas.`
      },
      sl: {
        title: "Kdaj vklopiti pralni stroj?",
        summary: "Najboljša okna: 13:00–15:00 ali po 22:00 — ko so cene pod dnevnim povprečjem.",
        content: `## Koliko stane eno pranje?\n\nEno popolno pranje pri 40 °C = približno **0,7 kWh**.\nPri 30 c/kWh = 21 centov. Pri 5 c/kWh = le 3,5 centa.\n\n## Preprosto pravilo\n\nOdpri PowerPrice, poišči **najcenejše dvourno okno dneva** in vključi pralni in pomivalni stroj hkrati.\n\n## Zakasnjeni zagon\n\nVečina sodobnih strojev ima **zakasnjeni zagon**. Naloži zvečer, nastavi na 14:00 — hiša tiho dela zate.`
      },
      mt: {
        title: "Meta tibda l-magna tal-ħasil?",
        summary: "L-aħjar tieqi: 13:00–15:00 jew wara t-22:00 — meta l-prezzijiet ikunu taħt il-medja tal-jum.",
        content: `## Kemm tiswa ħasla waħda?\n\nĦasla sħiħa fi 40 °C = madwar **0.7 kWh**.\nBi 30 ċ/kWh = 21 ċenteżmi. Bi 5 ċ/kWh = biss 3.5 ċenteżmi.\n\n## Regola sempliċi\n\nIftaħ PowerPrice, sib **l-irħas tieqa ta' 2 sigħat tal-jum**, u ixgħel il-magna tal-ħasil u tal-platti flimkien.\n\n## Bidu mdewmin\n\nIl-biċċa l-kbira tal-magni moderni għandhom funzjoni **delay start**. Imla' filgħaxija, programma għas-2:00 PM — id-dar tagħmel il-bqija.`
      },
      ga: {
        title: "Cathain ba chóir an meaisín níocháin a chasadh?",
        summary: "Na fuinneoga is fearr: 13:00–15:00 nó tar éis 22:00 — nuair atá praghsanna faoi mhéan an lae.",
        content: `## Cá mhéad a chosnaíonn níochán amháin?\n\nNíochán iomlán ag 40 °C = thart ar **0.7 kWh**.\nAg 30 c/kWh = 21 cent. Ag 5 c/kWh = ach 3.5 cent.\n\n## Riail shimplí\n\nOscail PowerPrice, faigh an **fhuinneog dhá uair an chloig is saoire den lá** agus rith an meaisín níocháin agus an miasniteoir le chéile.\n\n## Tús moillithe\n\nTá feidhm **delay start** ag formhór na meaisíní nua-aimseartha. Lódáil tráthnóna, sceideal go 14:00 — déanann an teach an chuid eile.`
      }
    }
  }
];

export function getPostById(id: string): BlogPost | undefined {
  return posts.find(p => p.id === id);
}

export function getTranslation(post: BlogPost, lang: string): BlogTranslation {
  const code = lang.split("-")[0];
  return post.i18n[code] || post.i18n.en || Object.values(post.i18n)[0];
}
