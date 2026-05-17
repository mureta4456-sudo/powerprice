import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * Translations for all 24 official EU languages.
 * Keys used across the app — keep this list in sync when adding new strings.
 *
 * If a translation is missing in a language, i18next falls back to English.
 */

const resources = {
  // Latvian
  lv: { translation: {
    app_name: "PowerPrice", today: "Šodien", tomorrow: "Rītdiena",
    current_price: "Pašreizējā cena", unit: "ct/kWh", avg: "Vidējā",
    status_low: "Lēta", status_mid: "Vidēja", status_high: "Dārga", status_unknown: "Nav datu",
    chart_title: "Cenu grafiks", tips_title: "AI Ieteikumi", faq_title: "Biežāk uzdotie jautājumi",
    blog_title: "Enerģijas Blogs", blog_subtitle: "Padomi un raksti par enerģijas taupīšanu",
    blog_read_more: "Lasīt vairāk", blog_back: "← Atpakaļ uz blogu", home_back: "← Atpakaļ uz sākumlapu",
    blog_empty: "Drīzumā tiks publicēti raksti.",
    source_info: "Datu avots: ENTSO-E Transparency Platform",
    q1: "Kas ir spot cena?", a1: "Tā ir elektrības cena biržā, kas mainās katru stundu atkarībā no pieprasījuma un piedāvājuma.",
    q2: "Kad rītdienas cenas ir pieejamas?", a2: "Rītdienas cenas parasti tiek publicētas katru dienu ap plkst. 14:00.",
    q3: "Vai cenā ir iekļauti PVN un sadales pakalpojumi?", a3: "Nē, šī ir tikai biržas cena. Galīgajā rēķinā jāpieskaita PVN, akcīze un sadales tarifs.",
    install_app: "Instalēt kā lietotni",
    install_subtitle: "Pievieno PowerPrice sākuma ekrānam un seko cenām katru dienu.",
    advice_loading: "Sagatavoju ieteikumus...", advice_failed: "Neizdevās ielādēt AI ieteikumus."
  }},
  // English
  en: { translation: {
    app_name: "PowerPrice", today: "Today", tomorrow: "Tomorrow",
    current_price: "Current Price", unit: "ct/kWh", avg: "Average",
    status_low: "Cheap", status_mid: "Normal", status_high: "Expensive", status_unknown: "No data",
    chart_title: "Price chart", tips_title: "AI Advice", faq_title: "Common Questions",
    blog_title: "Energy Blog", blog_subtitle: "Tips and articles on saving energy",
    blog_read_more: "Read more", blog_back: "← Back to blog", home_back: "← Back to home",
    blog_empty: "Articles will be published soon.",
    source_info: "Data source: ENTSO-E Transparency Platform",
    q1: "What is a spot price?", a1: "It is the hourly electricity price on the exchange, determined by supply and demand.",
    q2: "When are tomorrow's prices available?", a2: "Tomorrow's prices are usually published daily around 14:00 CET.",
    q3: "Does the price include VAT and grid fees?", a3: "No, this is only the exchange price. The final bill adds VAT, excise and distribution tariffs.",
    install_app: "Install App",
    install_subtitle: "Add PowerPrice to your home screen and follow prices every day.",
    advice_loading: "Preparing advice...", advice_failed: "Failed to load AI advice."
  }},
  // German
  de: { translation: {
    app_name: "PowerPrice", today: "Heute", tomorrow: "Morgen",
    current_price: "Aktueller Preis", unit: "ct/kWh", avg: "Durchschnitt",
    status_low: "Günstig", status_mid: "Normal", status_high: "Teuer", status_unknown: "Keine Daten",
    chart_title: "Preisdiagramm", tips_title: "KI-Tipps", faq_title: "Häufige Fragen",
    blog_title: "Energie-Blog", blog_subtitle: "Tipps und Artikel zum Energiesparen",
    blog_read_more: "Weiterlesen", blog_back: "← Zurück zum Blog", home_back: "← Zurück zur Startseite",
    blog_empty: "Artikel werden bald veröffentlicht.",
    source_info: "Datenquelle: ENTSO-E Transparency Platform",
    q1: "Was ist ein Spot-Preis?", a1: "Es handelt sich um den stündlichen Börsenstrompreis, der durch Angebot und Nachfrage bestimmt wird.",
    q2: "Wann sind die Preise für morgen verfügbar?", a2: "Meist gegen 14:00 Uhr für den nächsten Tag.",
    q3: "Sind MwSt. und Netzentgelte enthalten?", a3: "Nein, dies ist nur der Börsenpreis. Die Endabrechnung enthält MwSt., Steuern und Netzentgelte.",
    install_app: "App installieren",
    install_subtitle: "Fügen Sie PowerPrice zum Startbildschirm hinzu und verfolgen Sie täglich die Preise.",
    advice_loading: "Tipps werden vorbereitet...", advice_failed: "KI-Tipps konnten nicht geladen werden."
  }},
  // French
  fr: { translation: {
    app_name: "PowerPrice", today: "Aujourd'hui", tomorrow: "Demain",
    current_price: "Prix actuel", unit: "ct/kWh", avg: "Moyenne",
    status_low: "Bon marché", status_mid: "Normal", status_high: "Cher", status_unknown: "Aucune donnée",
    chart_title: "Graphique des prix", tips_title: "Conseils IA", faq_title: "Questions fréquentes",
    blog_title: "Blog Énergie", blog_subtitle: "Conseils et articles pour économiser l'énergie",
    blog_read_more: "Lire la suite", blog_back: "← Retour au blog", home_back: "← Retour à l'accueil",
    blog_empty: "Articles à venir prochainement.",
    source_info: "Source : ENTSO-E Transparency Platform",
    q1: "Qu'est-ce qu'un prix spot ?", a1: "C'est le prix horaire de l'électricité sur le marché, déterminé par l'offre et la demande.",
    q2: "Quand les prix de demain sont-ils disponibles ?", a2: "Généralement vers 14h00 pour le lendemain.",
    q3: "La TVA et les frais de réseau sont-ils inclus ?", a3: "Non, c'est uniquement le prix de marché. La facture finale ajoute TVA, taxes et tarifs de distribution.",
    install_app: "Installer l'application",
    install_subtitle: "Ajoutez PowerPrice à votre écran d'accueil et suivez les prix chaque jour.",
    advice_loading: "Préparation des conseils...", advice_failed: "Impossible de charger les conseils IA."
  }},
  // Spanish
  es: { translation: {
    app_name: "PowerPrice", today: "Hoy", tomorrow: "Mañana",
    current_price: "Precio actual", unit: "ct/kWh", avg: "Promedio",
    status_low: "Barato", status_mid: "Normal", status_high: "Caro", status_unknown: "Sin datos",
    chart_title: "Gráfico de precios", tips_title: "Consejos IA", faq_title: "Preguntas frecuentes",
    blog_title: "Blog de energía", blog_subtitle: "Consejos y artículos sobre ahorro de energía",
    blog_read_more: "Leer más", blog_back: "← Volver al blog", home_back: "← Volver al inicio",
    blog_empty: "Pronto se publicarán artículos.",
    source_info: "Fuente: ENTSO-E Transparency Platform",
    q1: "¿Qué es un precio spot?", a1: "Es el precio horario de la electricidad en el mercado, determinado por oferta y demanda.",
    q2: "¿Cuándo están disponibles los precios de mañana?", a2: "Normalmente alrededor de las 14:00 para el día siguiente.",
    q3: "¿Incluye el precio el IVA y los peajes?", a3: "No, este es solo el precio de mercado. La factura final añade IVA, impuestos y peajes de distribución.",
    install_app: "Instalar aplicación",
    install_subtitle: "Añade PowerPrice a tu pantalla de inicio y consulta los precios cada día.",
    advice_loading: "Preparando consejos...", advice_failed: "No se pudieron cargar los consejos IA."
  }},
  // Estonian
  et: { translation: {
    app_name: "PowerPrice", today: "Täna", tomorrow: "Homme",
    current_price: "Praegune hind", unit: "ct/kWh", avg: "Keskmine",
    status_low: "Odav", status_mid: "Tavaline", status_high: "Kallis", status_unknown: "Andmed puuduvad",
    chart_title: "Hinnagraafik", tips_title: "Tehisintellekti nõuanded", faq_title: "Korduvad küsimused",
    blog_title: "Energia blogi", blog_subtitle: "Nõuanded ja artiklid energia säästmiseks",
    blog_read_more: "Loe edasi", blog_back: "← Tagasi blogisse", home_back: "← Tagasi avalehele",
    blog_empty: "Artiklid avaldatakse peagi.",
    source_info: "Andmeallikas: ENTSO-E Transparency Platform",
    q1: "Mis on hetkehind?", a1: "See on tunnipõhine elektri börsihind, mille määravad nõudlus ja pakkumine.",
    q2: "Millal on homsed hinnad saadaval?", a2: "Tavaliselt avaldatakse kella 14.00 paiku järgmise päeva hinnad.",
    q3: "Kas hind sisaldab käibemaksu ja võrgutasusid?", a3: "Ei, see on ainult börsihind. Lõpparvele lisanduvad käibemaks, aktsiis ja võrgutasud.",
    install_app: "Paigalda rakendus",
    install_subtitle: "Lisa PowerPrice avakuvale ja jälgi hindu iga päev.",
    advice_loading: "Nõuandeid valmistatakse...", advice_failed: "Tehisintellekti nõuandeid ei õnnestunud laadida."
  }},
  // Lithuanian
  lt: { translation: {
    app_name: "PowerPrice", today: "Šiandien", tomorrow: "Rytoj",
    current_price: "Dabartinė kaina", unit: "ct/kWh", avg: "Vidutinė",
    status_low: "Pigi", status_mid: "Įprasta", status_high: "Brangi", status_unknown: "Nėra duomenų",
    chart_title: "Kainų grafikas", tips_title: "DI patarimai", faq_title: "Dažni klausimai",
    blog_title: "Energijos tinklaraštis", blog_subtitle: "Patarimai ir straipsniai apie energijos taupymą",
    blog_read_more: "Skaityti daugiau", blog_back: "← Atgal į tinklaraštį", home_back: "← Atgal į pradžią",
    blog_empty: "Straipsniai netrukus bus paskelbti.",
    source_info: "Duomenų šaltinis: ENTSO-E Transparency Platform",
    q1: "Kas yra biržos kaina?", a1: "Tai valandinė elektros kaina biržoje, kurią lemia paklausa ir pasiūla.",
    q2: "Kada bus prieinamos rytojaus kainos?", a2: "Paprastai apie 14:00 paskelbiamos kitos dienos kainos.",
    q3: "Ar į kainą įskaičiuotas PVM ir tinklo mokesčiai?", a3: "Ne, tai tik biržos kaina. Galutinėje sąskaitoje pridedami PVM, akcizas ir tinklo mokesčiai.",
    install_app: "Įdiegti programėlę",
    install_subtitle: "Pridėkite PowerPrice į pradžios ekraną ir kasdien sekite kainas.",
    advice_loading: "Ruošiami patarimai...", advice_failed: "Nepavyko įkelti DI patarimų."
  }},
  // Finnish
  fi: { translation: {
    app_name: "PowerPrice", today: "Tänään", tomorrow: "Huomenna",
    current_price: "Nykyinen hinta", unit: "ct/kWh", avg: "Keskiarvo",
    status_low: "Halpa", status_mid: "Normaali", status_high: "Kallis", status_unknown: "Ei tietoja",
    chart_title: "Hintakuvaaja", tips_title: "Tekoälyvinkit", faq_title: "Usein kysytyt kysymykset",
    blog_title: "Energia-blogi", blog_subtitle: "Vinkit ja artikkelit energian säästämiseen",
    blog_read_more: "Lue lisää", blog_back: "← Takaisin blogiin", home_back: "← Takaisin etusivulle",
    blog_empty: "Artikkeleita julkaistaan pian.",
    source_info: "Tietolähde: ENTSO-E Transparency Platform",
    q1: "Mikä on spot-hinta?", a1: "Se on sähkön tuntikohtainen pörssihinta, jonka määräävät kysyntä ja tarjonta.",
    q2: "Milloin huomisen hinnat ovat saatavilla?", a2: "Yleensä noin klo 14 seuraavan päivän hinnat julkaistaan.",
    q3: "Sisältyykö ALV ja siirtomaksut hintaan?", a3: "Ei, tämä on vain pörssihinta. Loppulaskuun lisätään ALV, vero ja siirtomaksut.",
    install_app: "Asenna sovellus",
    install_subtitle: "Lisää PowerPrice aloitusnäytöllesi ja seuraa hintoja päivittäin.",
    advice_loading: "Valmistellaan vinkkejä...", advice_failed: "Tekoälyvinkkejä ei voitu ladata."
  }},
  // Swedish
  sv: { translation: {
    app_name: "PowerPrice", today: "Idag", tomorrow: "Imorgon",
    current_price: "Aktuellt pris", unit: "ct/kWh", avg: "Genomsnitt",
    status_low: "Billigt", status_mid: "Normalt", status_high: "Dyrt", status_unknown: "Ingen data",
    chart_title: "Prisdiagram", tips_title: "AI-tips", faq_title: "Vanliga frågor",
    blog_title: "Energiblogg", blog_subtitle: "Tips och artiklar om att spara energi",
    blog_read_more: "Läs mer", blog_back: "← Tillbaka till bloggen", home_back: "← Tillbaka till startsidan",
    blog_empty: "Artiklar publiceras snart.",
    source_info: "Datakälla: ENTSO-E Transparency Platform",
    q1: "Vad är ett spotpris?", a1: "Det är elens timpris på börsen, som bestäms av tillgång och efterfrågan.",
    q2: "När finns morgondagens priser tillgängliga?", a2: "Vanligtvis runt kl. 14 publiceras nästa dags priser.",
    q3: "Är moms och nätavgifter inkluderade?", a3: "Nej, detta är endast börspriset. Slutfakturan inkluderar moms, skatter och nätavgifter.",
    install_app: "Installera appen",
    install_subtitle: "Lägg till PowerPrice på din hemskärm och följ priserna varje dag.",
    advice_loading: "Förbereder tips...", advice_failed: "Kunde inte ladda AI-tips."
  }},
  // Danish
  da: { translation: {
    app_name: "PowerPrice", today: "I dag", tomorrow: "I morgen",
    current_price: "Aktuel pris", unit: "ct/kWh", avg: "Gennemsnit",
    status_low: "Billigt", status_mid: "Normalt", status_high: "Dyrt", status_unknown: "Ingen data",
    chart_title: "Prisdiagram", tips_title: "AI-tips", faq_title: "Ofte stillede spørgsmål",
    blog_title: "Energiblog", blog_subtitle: "Tips og artikler om energibesparelse",
    blog_read_more: "Læs mere", blog_back: "← Tilbage til bloggen", home_back: "← Tilbage til forsiden",
    blog_empty: "Artikler udgives snart.",
    source_info: "Datakilde: ENTSO-E Transparency Platform",
    q1: "Hvad er en spotpris?", a1: "Det er elektricitetens timepris på børsen, bestemt af udbud og efterspørgsel.",
    q2: "Hvornår er morgendagens priser tilgængelige?", a2: "Normalt omkring kl. 14 offentliggøres næste dags priser.",
    q3: "Indeholder prisen moms og netgebyrer?", a3: "Nej, dette er kun børsprisen. Slutregningen inkluderer moms, afgifter og nettariffer.",
    install_app: "Installér app",
    install_subtitle: "Tilføj PowerPrice til din hjemmeskærm og følg priserne hver dag.",
    advice_loading: "Forbereder tips...", advice_failed: "Kunne ikke indlæse AI-tips."
  }},
  // Dutch
  nl: { translation: {
    app_name: "PowerPrice", today: "Vandaag", tomorrow: "Morgen",
    current_price: "Huidige prijs", unit: "ct/kWh", avg: "Gemiddeld",
    status_low: "Goedkoop", status_mid: "Normaal", status_high: "Duur", status_unknown: "Geen gegevens",
    chart_title: "Prijsgrafiek", tips_title: "AI-tips", faq_title: "Veelgestelde vragen",
    blog_title: "Energieblog", blog_subtitle: "Tips en artikelen over energiebesparing",
    blog_read_more: "Lees meer", blog_back: "← Terug naar blog", home_back: "← Terug naar startpagina",
    blog_empty: "Artikelen worden binnenkort gepubliceerd.",
    source_info: "Gegevensbron: ENTSO-E Transparency Platform",
    q1: "Wat is een spotprijs?", a1: "Het is de uurprijs van elektriciteit op de beurs, bepaald door vraag en aanbod.",
    q2: "Wanneer zijn de prijzen voor morgen beschikbaar?", a2: "Meestal rond 14:00 voor de volgende dag.",
    q3: "Zit btw en nettarief in de prijs?", a3: "Nee, dit is alleen de beursprijs. Op de eindfactuur komen btw, accijns en nettarieven bij.",
    install_app: "App installeren",
    install_subtitle: "Voeg PowerPrice toe aan je startscherm en volg prijzen elke dag.",
    advice_loading: "Tips worden voorbereid...", advice_failed: "AI-tips konden niet worden geladen."
  }},
  // Polish
  pl: { translation: {
    app_name: "PowerPrice", today: "Dziś", tomorrow: "Jutro",
    current_price: "Aktualna cena", unit: "ct/kWh", avg: "Średnia",
    status_low: "Tania", status_mid: "Normalna", status_high: "Droga", status_unknown: "Brak danych",
    chart_title: "Wykres cen", tips_title: "Porady AI", faq_title: "Często zadawane pytania",
    blog_title: "Blog energetyczny", blog_subtitle: "Porady i artykuły o oszczędzaniu energii",
    blog_read_more: "Czytaj więcej", blog_back: "← Powrót do bloga", home_back: "← Powrót do strony głównej",
    blog_empty: "Artykuły zostaną wkrótce opublikowane.",
    source_info: "Źródło danych: ENTSO-E Transparency Platform",
    q1: "Czym jest cena spot?", a1: "To godzinowa cena energii na giełdzie, zależna od popytu i podaży.",
    q2: "Kiedy dostępne są ceny na jutro?", a2: "Zazwyczaj publikowane są codziennie około 14:00.",
    q3: "Czy cena zawiera VAT i opłaty dystrybucyjne?", a3: "Nie, to tylko cena giełdowa. Do rachunku doliczane są VAT, akcyza i opłaty dystrybucyjne.",
    install_app: "Zainstaluj aplikację",
    install_subtitle: "Dodaj PowerPrice do ekranu głównego i śledź ceny codziennie.",
    advice_loading: "Przygotowywanie porad...", advice_failed: "Nie udało się załadować porad AI."
  }},
  // Czech
  cs: { translation: {
    app_name: "PowerPrice", today: "Dnes", tomorrow: "Zítra",
    current_price: "Aktuální cena", unit: "ct/kWh", avg: "Průměr",
    status_low: "Levná", status_mid: "Normální", status_high: "Drahá", status_unknown: "Bez dat",
    chart_title: "Graf cen", tips_title: "Tipy AI", faq_title: "Časté dotazy",
    blog_title: "Energetický blog", blog_subtitle: "Tipy a články o úspoře energie",
    blog_read_more: "Číst více", blog_back: "← Zpět na blog", home_back: "← Zpět na domovskou stránku",
    blog_empty: "Články budou brzy publikovány.",
    source_info: "Zdroj dat: ENTSO-E Transparency Platform",
    q1: "Co je spotová cena?", a1: "Je to hodinová cena elektřiny na burze, určená nabídkou a poptávkou.",
    q2: "Kdy jsou dostupné ceny na zítra?", a2: "Obvykle se zveřejňují denně kolem 14:00.",
    q3: "Zahrnuje cena DPH a distribuční poplatky?", a3: "Ne, toto je pouze burzovní cena. Konečná faktura zahrnuje DPH, spotřební daň a distribuční poplatky.",
    install_app: "Nainstalovat aplikaci",
    install_subtitle: "Přidejte PowerPrice na domovskou obrazovku a sledujte ceny každý den.",
    advice_loading: "Připravuji tipy...", advice_failed: "Nepodařilo se načíst tipy AI."
  }},
  // Slovak
  sk: { translation: {
    app_name: "PowerPrice", today: "Dnes", tomorrow: "Zajtra",
    current_price: "Aktuálna cena", unit: "ct/kWh", avg: "Priemer",
    status_low: "Lacná", status_mid: "Normálna", status_high: "Drahá", status_unknown: "Bez údajov",
    chart_title: "Graf cien", tips_title: "Tipy AI", faq_title: "Časté otázky",
    blog_title: "Energetický blog", blog_subtitle: "Tipy a články o úspore energie",
    blog_read_more: "Čítať viac", blog_back: "← Späť na blog", home_back: "← Späť na domovskú stránku",
    blog_empty: "Články budú čoskoro publikované.",
    source_info: "Zdroj údajov: ENTSO-E Transparency Platform",
    q1: "Čo je spotová cena?", a1: "Je to hodinová cena elektriny na burze, určená ponukou a dopytom.",
    q2: "Kedy sú dostupné ceny na zajtra?", a2: "Zvyčajne sa zverejňujú denne okolo 14:00.",
    q3: "Zahŕňa cena DPH a distribučné poplatky?", a3: "Nie, je to len burzová cena. Konečná faktúra zahŕňa DPH, spotrebnú daň a distribučné poplatky.",
    install_app: "Nainštalovať aplikáciu",
    install_subtitle: "Pridajte PowerPrice na domovskú obrazovku a sledujte ceny každý deň.",
    advice_loading: "Pripravujem tipy...", advice_failed: "Nepodarilo sa načítať tipy AI."
  }},
  // Hungarian
  hu: { translation: {
    app_name: "PowerPrice", today: "Ma", tomorrow: "Holnap",
    current_price: "Aktuális ár", unit: "ct/kWh", avg: "Átlag",
    status_low: "Olcsó", status_mid: "Normál", status_high: "Drága", status_unknown: "Nincs adat",
    chart_title: "Árdiagram", tips_title: "MI tippek", faq_title: "Gyakori kérdések",
    blog_title: "Energia blog", blog_subtitle: "Tippek és cikkek az energiatakarékosságról",
    blog_read_more: "Tovább olvasom", blog_back: "← Vissza a bloghoz", home_back: "← Vissza a főoldalra",
    blog_empty: "A cikkek hamarosan megjelennek.",
    source_info: "Adatforrás: ENTSO-E Transparency Platform",
    q1: "Mi az azonnali ár?", a1: "Ez az áram óránkénti tőzsdei ára, amelyet a kereslet és kínálat határoz meg.",
    q2: "Mikor érhetők el a holnapi árak?", a2: "Általában délután 14:00 körül teszik közzé a következő napra.",
    q3: "Tartalmazza az ár az áfát és a hálózati díjakat?", a3: "Nem, ez csak a tőzsdei ár. A végszámlához hozzáadódik az áfa, jövedéki adó és hálózati díj.",
    install_app: "Alkalmazás telepítése",
    install_subtitle: "Adja hozzá a PowerPrice-t a kezdőképernyőhöz, és kövesse az árakat naponta.",
    advice_loading: "Tippek előkészítése...", advice_failed: "Nem sikerült betölteni az MI tippeket."
  }},
  // Italian
  it: { translation: {
    app_name: "PowerPrice", today: "Oggi", tomorrow: "Domani",
    current_price: "Prezzo attuale", unit: "ct/kWh", avg: "Media",
    status_low: "Conveniente", status_mid: "Normale", status_high: "Caro", status_unknown: "Nessun dato",
    chart_title: "Grafico prezzi", tips_title: "Consigli IA", faq_title: "Domande frequenti",
    blog_title: "Blog Energia", blog_subtitle: "Consigli e articoli sul risparmio energetico",
    blog_read_more: "Leggi di più", blog_back: "← Torna al blog", home_back: "← Torna alla home",
    blog_empty: "Gli articoli saranno pubblicati a breve.",
    source_info: "Fonte dati: ENTSO-E Transparency Platform",
    q1: "Cos'è un prezzo spot?", a1: "È il prezzo orario dell'elettricità in borsa, determinato da domanda e offerta.",
    q2: "Quando sono disponibili i prezzi di domani?", a2: "Solitamente pubblicati intorno alle 14:00 per il giorno successivo.",
    q3: "Il prezzo include IVA e oneri di rete?", a3: "No, questo è solo il prezzo di borsa. La bolletta finale aggiunge IVA, accise e oneri di rete.",
    install_app: "Installa app",
    install_subtitle: "Aggiungi PowerPrice alla schermata Home e segui i prezzi ogni giorno.",
    advice_loading: "Preparazione consigli...", advice_failed: "Impossibile caricare i consigli IA."
  }},
  // Portuguese
  pt: { translation: {
    app_name: "PowerPrice", today: "Hoje", tomorrow: "Amanhã",
    current_price: "Preço atual", unit: "ct/kWh", avg: "Média",
    status_low: "Barato", status_mid: "Normal", status_high: "Caro", status_unknown: "Sem dados",
    chart_title: "Gráfico de preços", tips_title: "Conselhos IA", faq_title: "Perguntas frequentes",
    blog_title: "Blog de Energia", blog_subtitle: "Dicas e artigos sobre poupança de energia",
    blog_read_more: "Ler mais", blog_back: "← Voltar ao blog", home_back: "← Voltar à página inicial",
    blog_empty: "Os artigos serão publicados em breve.",
    source_info: "Fonte: ENTSO-E Transparency Platform",
    q1: "O que é um preço spot?", a1: "É o preço horário da eletricidade no mercado grossista, determinado por oferta e procura.",
    q2: "Quando estão disponíveis os preços de amanhã?", a2: "Normalmente publicados por volta das 14:00 para o dia seguinte.",
    q3: "O preço inclui IVA e tarifas de rede?", a3: "Não, este é apenas o preço de mercado. A fatura final inclui IVA, impostos e tarifas de distribuição.",
    install_app: "Instalar aplicação",
    install_subtitle: "Adicione o PowerPrice ao ecrã inicial e acompanhe os preços todos os dias.",
    advice_loading: "A preparar conselhos...", advice_failed: "Não foi possível carregar os conselhos IA."
  }},
  // Romanian
  ro: { translation: {
    app_name: "PowerPrice", today: "Azi", tomorrow: "Mâine",
    current_price: "Preț curent", unit: "ct/kWh", avg: "Medie",
    status_low: "Ieftin", status_mid: "Normal", status_high: "Scump", status_unknown: "Fără date",
    chart_title: "Grafic prețuri", tips_title: "Sfaturi AI", faq_title: "Întrebări frecvente",
    blog_title: "Blog Energie", blog_subtitle: "Sfaturi și articole despre economisirea energiei",
    blog_read_more: "Citește mai mult", blog_back: "← Înapoi la blog", home_back: "← Înapoi la pagina principală",
    blog_empty: "Articolele vor fi publicate în curând.",
    source_info: "Sursa datelor: ENTSO-E Transparency Platform",
    q1: "Ce este un preț spot?", a1: "Este prețul orar al electricității pe bursă, determinat de cerere și ofertă.",
    q2: "Când sunt disponibile prețurile pentru mâine?", a2: "De obicei publicate zilnic în jurul orei 14:00.",
    q3: "Prețul include TVA și taxele de rețea?", a3: "Nu, acesta este doar prețul de bursă. Factura finală include TVA, accize și tarife de distribuție.",
    install_app: "Instalează aplicația",
    install_subtitle: "Adaugă PowerPrice pe ecranul de pornire și urmărește prețurile zilnic.",
    advice_loading: "Pregătesc sfaturi...", advice_failed: "Nu s-au putut încărca sfaturile AI."
  }},
  // Bulgarian
  bg: { translation: {
    app_name: "PowerPrice", today: "Днес", tomorrow: "Утре",
    current_price: "Текуща цена", unit: "ct/kWh", avg: "Средна",
    status_low: "Евтина", status_mid: "Нормална", status_high: "Скъпа", status_unknown: "Няма данни",
    chart_title: "Графика на цените", tips_title: "AI съвети", faq_title: "Често задавани въпроси",
    blog_title: "Енергиен блог", blog_subtitle: "Съвети и статии за пестене на енергия",
    blog_read_more: "Прочети повече", blog_back: "← Назад към блога", home_back: "← Назад към началото",
    blog_empty: "Статиите ще бъдат публикувани скоро.",
    source_info: "Източник на данни: ENTSO-E Transparency Platform",
    q1: "Какво е спот цена?", a1: "Това е почасовата цена на електроенергията на борсата, определена от търсенето и предлагането.",
    q2: "Кога са достъпни цените за утре?", a2: "Обикновено се публикуват около 14:00 ч. за следващия ден.",
    q3: "Включва ли цената ДДС и мрежови такси?", a3: "Не, това е само борсовата цена. Крайната сметка включва ДДС, акциз и мрежови такси.",
    install_app: "Инсталирай приложението",
    install_subtitle: "Добавете PowerPrice към началния екран и следете цените всеки ден.",
    advice_loading: "Подготвям съвети...", advice_failed: "Неуспешно зареждане на AI съветите."
  }},
  // Greek
  el: { translation: {
    app_name: "PowerPrice", today: "Σήμερα", tomorrow: "Αύριο",
    current_price: "Τρέχουσα τιμή", unit: "ct/kWh", avg: "Μέσος όρος",
    status_low: "Φθηνή", status_mid: "Κανονική", status_high: "Ακριβή", status_unknown: "Δεν υπάρχουν δεδομένα",
    chart_title: "Γράφημα τιμών", tips_title: "Συμβουλές AI", faq_title: "Συχνές ερωτήσεις",
    blog_title: "Blog Ενέργειας", blog_subtitle: "Συμβουλές και άρθρα για εξοικονόμηση ενέργειας",
    blog_read_more: "Διαβάστε περισσότερα", blog_back: "← Επιστροφή στο blog", home_back: "← Επιστροφή στην αρχική",
    blog_empty: "Τα άρθρα θα δημοσιευθούν σύντομα.",
    source_info: "Πηγή δεδομένων: ENTSO-E Transparency Platform",
    q1: "Τι είναι η τιμή spot;", a1: "Είναι η ωριαία χρηματιστηριακή τιμή ηλεκτρικού ρεύματος, καθοριζόμενη από προσφορά και ζήτηση.",
    q2: "Πότε είναι διαθέσιμες οι τιμές της αύριο;", a2: "Συνήθως δημοσιεύονται γύρω στις 14:00 για την επόμενη μέρα.",
    q3: "Περιλαμβάνει η τιμή ΦΠΑ και χρεώσεις δικτύου;", a3: "Όχι, αυτή είναι μόνο η τιμή χονδρικής. Ο τελικός λογαριασμός περιλαμβάνει ΦΠΑ, φόρους και χρεώσεις δικτύου.",
    install_app: "Εγκατάσταση εφαρμογής",
    install_subtitle: "Προσθέστε το PowerPrice στην αρχική οθόνη και παρακολουθείτε τις τιμές καθημερινά.",
    advice_loading: "Προετοιμασία συμβουλών...", advice_failed: "Αποτυχία φόρτωσης συμβουλών AI."
  }},
  // Croatian
  hr: { translation: {
    app_name: "PowerPrice", today: "Danas", tomorrow: "Sutra",
    current_price: "Trenutna cijena", unit: "ct/kWh", avg: "Prosjek",
    status_low: "Jeftino", status_mid: "Normalno", status_high: "Skupo", status_unknown: "Nema podataka",
    chart_title: "Graf cijena", tips_title: "AI savjeti", faq_title: "Česta pitanja",
    blog_title: "Energetski blog", blog_subtitle: "Savjeti i članci o uštedi energije",
    blog_read_more: "Pročitaj više", blog_back: "← Natrag na blog", home_back: "← Natrag na početnu",
    blog_empty: "Članci će uskoro biti objavljeni.",
    source_info: "Izvor podataka: ENTSO-E Transparency Platform",
    q1: "Što je spot cijena?", a1: "To je satna cijena električne energije na burzi, određena ponudom i potražnjom.",
    q2: "Kada su dostupne cijene za sutra?", a2: "Obično se objavljuju oko 14:00 za sljedeći dan.",
    q3: "Uključuje li cijena PDV i mrežne naknade?", a3: "Ne, ovo je samo burzovna cijena. Konačni račun uključuje PDV, trošarine i mrežne naknade.",
    install_app: "Instaliraj aplikaciju",
    install_subtitle: "Dodajte PowerPrice na početni zaslon i pratite cijene svaki dan.",
    advice_loading: "Pripremam savjete...", advice_failed: "Učitavanje AI savjeta nije uspjelo."
  }},
  // Slovenian
  sl: { translation: {
    app_name: "PowerPrice", today: "Danes", tomorrow: "Jutri",
    current_price: "Trenutna cena", unit: "ct/kWh", avg: "Povprečje",
    status_low: "Poceni", status_mid: "Normalno", status_high: "Drago", status_unknown: "Ni podatkov",
    chart_title: "Graf cen", tips_title: "AI nasveti", faq_title: "Pogosta vprašanja",
    blog_title: "Energetski blog", blog_subtitle: "Nasveti in članki o varčevanju z energijo",
    blog_read_more: "Preberi več", blog_back: "← Nazaj na blog", home_back: "← Nazaj na domačo stran",
    blog_empty: "Članki bodo kmalu objavljeni.",
    source_info: "Vir podatkov: ENTSO-E Transparency Platform",
    q1: "Kaj je promptna cena?", a1: "To je urna borzna cena električne energije, ki jo določata ponudba in povpraševanje.",
    q2: "Kdaj so na voljo cene za jutri?", a2: "Običajno objavljene okrog 14:00 za naslednji dan.",
    q3: "Ali cena vključuje DDV in omrežnino?", a3: "Ne, to je samo borzna cena. Končni račun vključuje DDV, trošarine in omrežnino.",
    install_app: "Namesti aplikacijo",
    install_subtitle: "Dodajte PowerPrice na domači zaslon in vsak dan spremljajte cene.",
    advice_loading: "Pripravljam nasvete...", advice_failed: "Nasvetov AI ni bilo mogoče naložiti."
  }},
  // Maltese
  mt: { translation: {
    app_name: "PowerPrice", today: "Illum", tomorrow: "Għada",
    current_price: "Prezz attwali", unit: "ċ/kWh", avg: "Medja",
    status_low: "Irħis", status_mid: "Normali", status_high: "Għali", status_unknown: "L-ebda data",
    chart_title: "Graff tal-prezzijiet", tips_title: "Pariri AI", faq_title: "Mistoqsijiet komuni",
    blog_title: "Blog tal-Enerġija", blog_subtitle: "Pariri u artikli dwar l-iffrankar tal-enerġija",
    blog_read_more: "Aqra aktar", blog_back: "← Lura għall-blog", home_back: "← Lura għall-paġna ewlenija",
    blog_empty: "L-artikli se jiġu ppubblikati dalwaqt.",
    source_info: "Sors tad-data: ENTSO-E Transparency Platform",
    q1: "X'inhu prezz spot?", a1: "Huwa l-prezz fis-siegħa tal-elettriku fil-borża, iddeterminat mid-domanda u l-provvista.",
    q2: "Meta huma disponibbli l-prezzijiet ta' għada?", a2: "Normalment ippubblikati madwar l-14:00 għall-jum li ġej.",
    q3: "Il-prezz jinkludi VAT u tariffi tan-netwerk?", a3: "Le, dan huwa biss il-prezz tal-borża. Il-kont finali jinkludi VAT, dazji u tariffi tad-distribuzzjoni.",
    install_app: "Installa l-app",
    install_subtitle: "Żid PowerPrice mal-iskrin tad-dar u segwi l-prezzijiet kuljum.",
    advice_loading: "Inħejji l-pariri...", advice_failed: "Il-pariri AI ma ġewx mgħobbija."
  }},
  // Irish
  ga: { translation: {
    app_name: "PowerPrice", today: "Inniu", tomorrow: "Amárach",
    current_price: "Praghas reatha", unit: "ct/kWh", avg: "Meán",
    status_low: "Saor", status_mid: "Gnáth", status_high: "Daor", status_unknown: "Gan sonraí",
    chart_title: "Cairt phraghsanna", tips_title: "Comhairle IS", faq_title: "Ceisteanna coitianta",
    blog_title: "Blag Fuinnimh", blog_subtitle: "Leideanna agus ailt faoi shábháil fuinnimh",
    blog_read_more: "Léigh tuilleadh", blog_back: "← Ar ais chuig an mblag", home_back: "← Ar ais chuig an mbaile",
    blog_empty: "Foilseofar ailt go luath.",
    source_info: "Foinse sonraí: ENTSO-E Transparency Platform",
    q1: "Cad is praghas spot ann?", a1: "Is é praghas leictreachais san uair sa mhalartán é, arna chinneadh ag soláthar agus éileamh.",
    q2: "Cathain a bhíonn praghsanna an lae amárach ar fáil?", a2: "Foilsithe go hiondúil thart ar 14:00 don lá dár gcionn.",
    q3: "An gcuirtear CBL agus táillí líonra san áireamh?", a3: "Ní hea, is praghas an mhalartáin amháin é seo. Cuireann an bille deiridh CBL, dleachtanna agus táillí líonra leis.",
    install_app: "Suiteáil an aip",
    install_subtitle: "Cuir PowerPrice le do scáileán baile agus lean praghsanna gach lá.",
    advice_loading: "Comhairle á hullmhú...", advice_failed: "Theip ar luchtú comhairle IS."
  }}
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
