import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  lv: {
    translation: {
      "app_name": "PowerPrice",
      "today": "Šodien",
      "tomorrow": "Rītdiena",
      "current_price": "Pašreizējā cena",
      "unit": "ct/kWh",
      "avg": "Vidējā",
      "status_low": "Lēta",
      "status_mid": "Vidēja",
      "status_high": "Dārga",
      "tips_title": "AI Ieteikumi",
      "faq_title": "Biežāk uzdotie jautājumi",
      "blog_title": "Enerģijas Blogs",
      "source_info": "Datu avots: ENTSO-E Transparency Platform",
      "q1": "Kas ir spot cena?",
      "a1": "Tā ir elektrības cena biržā, kas mainās katru stundu atkarībā no pieprasījuma un piedāvājuma.",
      "q2": "Kad rītdienas cenas ir pieejamas?",
      "a2": "Rītdienas cenas parasti tiek publicētas katru dienu ap plkst. 14:00 pēc Latvijas laika.",
      "blog1_title": "Kā ietaupīt ar siltumsūkni?",
      "blog1_summary": "Iestatiet augstāku temperatūru stundās, kad elektrība ir vislētākā...",
      "blog2_title": "Elektroauto uzlāde naktīs",
      "blog2_summary": "Naktis parasti ir lētākais laiks uzlādei, bet sekojiet grafikam...",
      "install_app": "Instalēt kā lietotni"
    }
  },
  en: {
    translation: {
      "app_name": "PowerPrice",
      "today": "Today",
      "tomorrow": "Tomorrow",
      "current_price": "Current Price",
      "unit": "ct/kWh",
      "avg": "Average",
      "status_low": "Cheap",
      "status_mid": "Normal",
      "status_high": "Expensive",
      "tips_title": "AI Advice",
      "faq_title": "Common Questions",
      "blog_title": "Energy Blog",
      "source_info": "Data Source: ENTSO-E Transparency Platform",
      "q1": "What is a spot price?",
      "a1": "It is the hourly electricity price on the exchange, determined by supply and demand.",
      "q2": "When are tomorrow's prices available?",
      "a2": "Tomorrow's prices are usually published daily around 14:00 CET.",
      "blog1_title": "Saving with Heat Pumps",
      "blog1_summary": "Pre-heat your home during the cheapest hours to save big...",
      "blog2_title": "Night EV Charging",
      "blog2_summary": "Nights are often cheapest, but always check the live chart...",
      "install_app": "Install App"
    }
  },
  de: {
    translation: {
      "app_name": "PowerPrice",
      "today": "Heute",
      "tomorrow": "Morgen",
      "current_price": "Aktueller Preis",
      "unit": "ct/kWh",
      "avg": "Durchschnitt",
      "status_low": "Günstig",
      "status_mid": "Normal",
      "status_high": "Teuer",
      "tips_title": "KI-Tipps",
      "faq_title": "Häufige Fragen",
      "blog_title": "Energie-Blog",
      "source_info": "Datenquelle: ENTSO-E Transparency Platform",
      "q1": "Was ist ein Spot-Preis?",
      "a1": "Es handelt sich um den stündlichen Börsenstrompreis.",
      "q2": "Wann sind die Preise für morgen verfügbar?",
      "a2": "Meist gegen 14:00 Uhr für den nächsten Tag.",
      "blog1_title": "Energiesparen bei Wärmepumpen",
      "blog1_summary": "Heizen Sie Ihr Haus während der günstigsten Stunden vor...",
      "blog2_title": "Elektroauto nachts laden",
      "blog2_summary": "Nächte sind oft am günstigsten, prüfen Sie das Live-Diagramm...",
      "install_app": "App installieren"
    }
  },
  fr: {
    translation: {
      "app_name": "PowerPrice",
      "today": "Aujourd'hui",
      "tomorrow": "Demain",
      "current_price": "Prix actuel",
      "unit": "ct/kWh",
      "avg": "Moyenne",
      "status_low": "Bon marché",
      "status_mid": "Normal",
      "status_high": "Cher",
      "tips_title": "Conseils IA",
      "faq_title": "Questions fréquentes",
      "blog_title": "Blog Énergie",
      "source_info": "Source : ENTSO-E Transparency Platform",
      "q1": "Qu'est-ce qu'un prix spot ?",
      "a1": "C'est le prix horaire de l'électricité sur le marché libre.",
      "q2": "Quand les prix de demain sont-ils disponibles ?",
      "a2": "Généralement vers 14h00 pour le lendemain.",
      "blog1_title": "Économiser avec une pompe à chaleur",
      "blog1_summary": "Préchauffez votre maison pendant les heures creuses...",
      "blog2_title": "Recharge nocturne VE",
      "blog2_summary": "Les nuits sont souvent moins chères, vérifiez le graphique...",
      "install_app": "Installer l'app"
    }
  },
  es: {
    translation: {
      "app_name": "PowerPrice",
      "today": "Hoy",
      "tomorrow": "Mañana",
      "current_price": "Precio actual",
      "unit": "ct/kWh",
      "avg": "Promedio",
      "status_low": "Barato",
      "status_mid": "Normal",
      "status_high": "Caro",
      "tips_title": "Consejos IA",
      "faq_title": "Preguntas comunes",
      "blog_title": "Blog de energía",
      "source_info": "Fuente: ENTSO-E Transparency Platform",
      "q1": "¿Qué es un precio spot?",
      "a1": "Es el precio horario de la electricidad en la bolsa.",
      "q2": "¿Cuándo estarán disponibles los precios de mañana?",
      "a2": "Normalmente alrededor de las 14:00 para el día siguiente.",
      "blog1_title": "Ahorro con bombas de calor",
      "blog1_summary": "Precaliente su casa durante las horas más baratas...",
      "blog2_title": "Carga nocturna de VE",
      "blog2_summary": "Las noches suelen ser más baratas, siempre revise el gráfico...",
      "install_app": "Instalar aplicación"
    }
  }
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
