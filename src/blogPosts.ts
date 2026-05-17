/**
 * ───────────────────────────────────────────────────────────────────────────
 *  BLOG POSTS — visi raksti glabājas šajā failā / All blog posts live here.
 * ───────────────────────────────────────────────────────────────────────────
 *
 *  Kā pievienot jaunu rakstu / How to add a new post:
 *
 *  1) Nokopē jebkuru no jau esošajiem objektiem `posts` masīvā.
 *     Copy any of the existing objects in the `posts` array.
 *  2) Nomaini `id` uz unikālu vārdu (tikai burti, cipari un domuzīmes).
 *     Change `id` to a unique slug (letters, digits and dashes only).
 *  3) Aizpildi `date` (YYYY-MM-DD), `cover` (emoji vai bilde) un `tags`.
 *     Fill in `date` (YYYY-MM-DD), `cover` (emoji or image URL) and `tags`.
 *  4) Sadaļā `i18n` ieliec virsraksta, kopsavilkuma un satura tulkojumus.
 *     Atslēga ir valodas kods (lv, en, de, fr, es, ...).
 *     In `i18n`, put title / summary / content per language code.
 *  5) `content` atbalsta vienkāršu Markdown — virsraksti (##),
 *     pasvītrojums (**bold**), saraksti (- vai 1.), saites [teksts](url),
 *     un tukšas rindas starp rindkopām.
 *     `content` supports simple Markdown — headings (##),
 *     **bold**, lists (- or 1.), links [text](url), blank lines between paragraphs.
 *
 *  Pat ja kāda valoda nav iekļauta, lapa parādīs angļu (`en`) versiju.
 *  If a language is not present, the page falls back to English.
 */

export interface BlogTranslation {
  title: string;
  summary: string;
  content: string;
}

export interface BlogPost {
  id: string;
  date: string;            // YYYY-MM-DD
  cover: string;           // emoji or image URL (https://...)
  readMinutes: number;     // aptuvenais lasīšanas laiks
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
        content: `## Kāpēc siltumsūknis ir izdevīgs

Siltumsūknis pārvērš katru kWh elektrības 3–5 kWh siltuma. Tas nozīmē, ka pat dārgākajās stundās tas joprojām ir lētāks par tiešo elektrosildītāju.

## Trīs vienkārši soļi

1. **Skaties grafiku no rīta** — atver PowerPrice un atzīmē, kuras 3–4 stundas dienā būs vislētākās.
2. **Palielini temperatūru lētajās stundās par 1–2 °C** — māja "uzkrāj" siltumu kā baterija.
3. **Pazemini par 1–2 °C dārgajās stundās** — siltums lēni izlīdzinās, un komforts gandrīz nemainās.

## Cik var ietaupīt?

Vidēji **15–25 %** no apkures rēķina ziemā, ja siltumsūknis ir mājas galvenais apkures avots. Vislielāko efektu redzēsi kombinācijā ar **dinamiskā tarifa** elektrības līgumu.

## Padoms

Iegādājies pārdomātu termostatu (piem., Tado, Bosch EasyControl), kas pats var sekot stundu cenām. Tad viss process notiek automātiski.`
      },
      en: {
        title: "How to save with a heat pump",
        summary: "Set a higher temperature during the cheapest hours and lower it when prices peak.",
        content: `## Why heat pumps are great

A heat pump turns each kWh of electricity into 3–5 kWh of heat. Even during expensive hours it beats a direct electric heater.

## Three simple steps

1. **Check the chart in the morning** — note the 3–4 cheapest hours of the day.
2. **Raise the temperature by 1–2 °C during the cheap hours** — the house stores the heat like a battery.
3. **Lower it by 1–2 °C during the expensive hours** — comfort barely changes.

## How much can you save?

Around **15–25 %** of your winter heating bill if the heat pump is your main heat source — especially when paired with a **dynamic tariff** contract.

## Tip

A smart thermostat (Tado, Bosch EasyControl) can follow the hourly prices automatically.`
      },
      de: {
        title: "Sparen mit der Wärmepumpe",
        summary: "Heizen Sie in den günstigsten Stunden vor und drosseln Sie in den teuersten Stunden.",
        content: `## Warum Wärmepumpen lohnen

Eine Wärmepumpe macht aus 1 kWh Strom 3–5 kWh Wärme. Sie schlägt sogar zu teuren Zeiten den Direktheizer.

## Drei einfache Schritte

1. **Morgens den Chart prüfen** — notieren Sie die 3–4 günstigsten Stunden.
2. **In günstigen Stunden 1–2 °C wärmer heizen** — das Haus speichert Wärme wie ein Akku.
3. **In teuren Stunden 1–2 °C absenken** — der Komfort verändert sich kaum.

## Wie viel kann man sparen?

Etwa **15–25 %** der Heizkosten im Winter, besonders mit einem **dynamischen Tarif**.`
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
        content: `## Kāpēc nakts uzlāde ir izdevīgākā

Nakts stundās (00:00–06:00) pieprasījums pēc elektrības ir zems. Bieži vien cena nokrīt **2–4 reizes zemāk** par dienas vidējo.

## Iestati lādētāja grafiku

Lielākā daļa mūsdienu lādētāju (Easee, Wallbox, Tesla) ļauj iestatīt **lādēšanas logu**. Iesaku:

- Sākums: **01:00**
- Beigas: **05:00**

Šajās stundās tu gandrīz vienmēr saņemsi viszemāko cenu.

## Kad NEdarīt naktī

- **Stiprs ziemeļvējš** — nakts un agra rīta cenas var pieaugt, ja Baltijas reģionā vēja parku ražošana krīt.
- **Aukstas dienas (-15 °C)** — apkure mājsaimniecībās paaugstina kopējo pieprasījumu.

Tad labāk **uzlādēt dienas vidū** — saulainās dienās ap pusdienlaiku cenas var būt pat negatīvas!

## Aptuvenais ietaupījums

Pārejot no dienas tarifa uz dinamisko nakts uzlādi, vidējais Latvijas elektroauto īpašnieks ietaupa **€20–€40 mēnesī**.`
      },
      en: {
        title: "Night EV charging",
        summary: "Nights are usually the cheapest time, but check the chart — windless nights can spike unexpectedly.",
        content: `## Why night charging wins

Demand drops at night, and prices can fall **2–4× below** the daytime average between 00:00–06:00.

## Set the charger schedule

Most modern chargers (Easee, Wallbox, Tesla) let you set a charging window. Suggested:

- Start: **01:00**
- End: **05:00**

## When NOT to charge at night

- **Strong north winds** stalling wind output across the Baltics.
- **Cold snaps (-15 °C)** raising household heating demand.

On those days, midday solar peaks can be cheaper — sometimes even negative prices.

## Typical savings

Switching from a flat tariff to dynamic night charging saves **€20–€40 / month** for an average EV.`
      },
      de: {
        title: "E-Auto nachts laden",
        summary: "Nächte sind meist am günstigsten — prüfen Sie aber den Chart bei windstillen Nächten.",
        content: `## Warum Nachtladen lohnt

Nachts (00:00–06:00) sinkt die Nachfrage, und der Preis liegt oft **2–4× unter** dem Tagesmittel.

## Ladezeitfenster einrichten

Empfohlen: Start **01:00**, Ende **05:00**.

## Wann NICHT nachts laden

Bei windstillen Nächten oder starker Kälte — dann mittags laden, wenn die Sonne den Preis drückt.`
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
        content: `## Cik elektrības patērē veļas mašīna?

Viena pilna mazgāšana 40 °C režīmā = aptuveni **0.7 kWh**.
Pie cenas 30 ct/kWh = 21 ct par reizi. Pie 5 ct/kWh = 3.5 ct.

## Vienkāršs likums

Atver PowerPrice un atrodi **lētāko 2 stundu logu dienā** — tieši tad palaid mazgājamo mašīnu un trauku mazgājamo mašīnu vienlaicīgi.

## Atliktās palaišanas funkcija

Lielākajai daļai mūsdienu mašīnu ir **delay start** funkcija. Vakarā ielādē veļu, iestati atliktu palaišanu uz 14:00 nākamajā dienā, un saimniecība pati izdarīs darbu lētākajā brīdī.`
      },
      en: {
        title: "When to run the washing machine?",
        summary: "Best windows: 13:00–15:00 or after 22:00 — when prices are below the daily average.",
        content: `## How much does a wash cost?

One full 40 °C wash = around **0.7 kWh**.
At 30 ct/kWh that's 21 cents. At 5 ct/kWh — just 3.5 cents.

## Simple rule

Open PowerPrice, find the **cheapest 2-hour window of the day**, and run the washer and dishwasher at the same time.

## Delay-start

Most modern machines have a **delay start** feature. Load it in the evening, schedule it for 14:00, and the house quietly works the cheap slot for you.`
      }
    }
  }
];

/**
 * Atrod rakstu pēc id.
 * Find a post by id.
 */
export function getPostById(id: string): BlogPost | undefined {
  return posts.find(p => p.id === id);
}

/**
 * Atgriež raksta tulkojumu vēlamajā valodā,
 * ar atkāpšanu uz angļu, ja valoda nav atrasta.
 * Returns the post translation for the chosen language,
 * falling back to English if missing.
 */
export function getTranslation(post: BlogPost, lang: string): BlogTranslation {
  return post.i18n[lang] || post.i18n.en || Object.values(post.i18n)[0];
}
