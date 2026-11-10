import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowRight,
  ChevronDown,
  Globe,
  Heart,
  Droplets,
  Building2,
  Camera,
  FileText,
  ShieldCheck,
  Check,
} from 'lucide-react';

export interface ActionButton {
  type: string;
  payload: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: ActionButton[];
}

interface LanguageOption {
  code: string;
  name: string;
  native: string;
  flag: string;
  isRtl: boolean;
  ttsLang: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', isRtl: false, ttsLang: 'en-US' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', isRtl: true, ttsLang: 'ar-SA' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', isRtl: false, ttsLang: 'fr-FR' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', isRtl: false, ttsLang: 'de-DE' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷', isRtl: false, ttsLang: 'tr-TR' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', flag: '🇲🇾', isRtl: false, ttsLang: 'ms-MY' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', isRtl: true, ttsLang: 'ur-PK' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪', isRtl: false, ttsLang: 'sw-KE' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', isRtl: false, ttsLang: 'es-ES' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩', isRtl: false, ttsLang: 'bn-BD' },
];

const LOCALIZED_GREETINGS: Record<string, ChatMessage> = {
  en: {
    id: 'msg-welcome-en',
    role: 'assistant',
    content: `**Assalamu Alaikum & Welcome!**\n\nI am **Amanah**, your multilingual AI Guide for **Sadaqah Africa** (NGO Reg #80020003418921).\n\nI can guide you through every part of our verified platform:\n• The **$10 Campaign** running up to **$50,000**\n• **9 Relief Programs** (Water, Sickle Cell, Emergency Food, Girls Dignity)\n• **School & Hospital Construction** ($20k–$150k)\n• **17 Verified Ground Photographs** in live motion\n• **Mobile Money & Card Payments** (MTN, Airtel, Visa/Mastercard)\n• Official **Constitution & 85% Direct Aid** audited breakdown\n\nHow may I assist your charitable journey today?`,
    timestamp: 'Just now',
    actions: [
      { type: 'DONATE', payload: '10:The $50,000 Campaign Fund', label: 'Give $10 Share' },
      { type: 'NAVIGATE', payload: '#field-footage', label: 'View 17 Ground Photos' },
      { type: 'NAVIGATE', payload: '#infrastructure', label: 'Schools & Hospitals ($20k–$150k)' },
      { type: 'NAVIGATE', payload: '#donate', label: 'Mobile Money Codes' },
    ],
  },
  ar: {
    id: 'msg-welcome-ar',
    role: 'assistant',
    content: `**السلام عليكم ورحمة الله وبركاته، أهلاً وسهلاً بكم!**\n\nأنا **أمانة**، مرشدكم الميداني الذكي لمنظمة **صدقة أفريقيا** (ترخيص رسمي #80020003418921).\n\nيسعدني مرافقتكم وإجابة كافة استفساراتكم:\n• **حملة الـ 10 دولارات** للوصول إلى هدف **50,000 دولار** عبر 5 مراحل تنموية\n• **9 برامج إغاثية** (آبار مياه نقية، علاج فقر الدم المنجلي، كفالة أيتام، طرود غذائية)\n• **المشاريع الإنشائية الكبرى** (بناء مدارس ومستشفيات ريفية من 20,000$ إلى 150,000$)\n• **17 صورة ميدانية موثقة** بتقنية الحركة المباشرة وإحداثيات GPS\n• **طرق الدفع والتبرع** (بطاقات ائتمانية، تحويل دولي، وهواتف Mobile Money)\n• **الدستور والتقارير المالية** المعتمدة رسمياً (85% للمشاريع مباشرة)\n\nكيف يمكنني خدمة صدقتكم ومسيرتكم الخيرية اليوم؟`,
    timestamp: 'الآن',
    actions: [
      { type: 'DONATE', payload: '10:The $50,000 Campaign Fund', label: 'المساهمة بسهم 10$' },
      { type: 'NAVIGATE', payload: '#field-footage', label: 'معاينة 17 صورة ميدانية' },
      { type: 'NAVIGATE', payload: '#infrastructure', label: 'مشاريع المدارس والمستشفيات' },
      { type: 'NAVIGATE', payload: '#donate', label: 'بوابة التبرع والدفع' },
    ],
  },
  fr: {
    id: 'msg-welcome-fr',
    role: 'assistant',
    content: `**Assalamu Alaikum et Bienvenue !**\n\nJe suis **Amanah**, votre guide IA multilingue pour **Sadaqah Africa** (Enregistrement ONG #80020003418921).\n\nJe vous accompagne pour explorer notre plateforme humanitaire vérifiée :\n• La **Campagne de 10 $ vers 50 000 $** (5 jalons majeurs)\n• **9 Programmes d'Urgence** (Eau potable, drépanocytose, colis alimentaires)\n• **Construction d'Écoles & Hôpitaux** (de 20 000 $ à 150 000 $)\n• **17 Photos Réelles du Terrain** avec géolocalisation GPS\n• **Moyens de Paiement** (Cartes bancaires, Mobile Money MTN/Airtel, PayPal)\n• **Constitution & Transparence** (85 % directement alloués au terrain)\n\nComment puis-je vous orienter aujourd'hui ?`,
    timestamp: 'À l\'instant',
    actions: [
      { type: 'DONATE', payload: '10:The $50,000 Campaign Fund', label: 'Donner une Part de 10 $' },
      { type: 'NAVIGATE', payload: '#field-footage', label: '17 Photos du Terrain' },
      { type: 'NAVIGATE', payload: '#infrastructure', label: 'Écoles et Hôpitaux ($20k–$150k)' },
      { type: 'NAVIGATE', payload: '#donate', label: 'Portail de Paiement' },
    ],
  },
  de: {
    id: 'msg-welcome-de',
    role: 'assistant',
    content: `**Assalamu Alaikum & Herzlich willkommen!**\n\nIch bin **Amanah**, Ihr KI-Feldführer für **Sadaqah Africa** (NGO-Registrierung #80020003418921).\n\nGerne begleite ich Sie durch unsere Hilfsprojekte:\n• **10 $-Kampagne zum 50.000 $-Fonds** in 5 transparenten Stufen\n• **9 Hilfsprogramme** (Trinkwasserbrunnen, Sichelzellen-Therapie, Waisen, Nahrung)\n• **Bauprojekte für Schulen & Kliniken** ($20.000 bis $150.000)\n• **17 verifizierte Feldfotos** im Live-Bewegungsband\n• **Spendenwege**: Kreditkarten, PayPal, SEPA-Banküberweisung & Mobile Money\n• **Satzung & 85% Direkthilfe-Garantie**\n\nWie darf ich Ihnen behilflich sein?`,
    timestamp: 'Gerade eben',
    actions: [
      { type: 'DONATE', payload: '10:The $50,000 Campaign Fund', label: '10 $ Anteil spenden' },
      { type: 'NAVIGATE', payload: '#field-footage', label: '17 Feldfotos ansehen' },
      { type: 'NAVIGATE', payload: '#infrastructure', label: 'Schul- & Klinikbau' },
    ],
  },
  tr: {
    id: 'msg-welcome-tr',
    role: 'assistant',
    content: `**Esselâmü Aleyküm ve Hoş Geldiniz!**\n\nBen **Amanah**, **Sadaqah Africa** resmî yapay zekâ saha asistanınızım (STK No #80020003418921).\n\nPlatformumuzdaki tüm konularda size rehberlik etmekten mutluluk duyarım:\n• **50.000 $ Hedefli 10 $ Sahra Kampanyası**\n• **9 Temel Yardım Programı** (Su kuyuları, orak hücre tedavisi, gıda kolileri, yetimler)\n• **Okul ve Hastane İnşaatları** (20.000 $ – 150.000 $ kalıcı vakıf eserleri)\n• **Doğrulanmış 17 Saha Fotoğrafı** ve canlı şantiye görüntüleri\n• **Kredi Kartı ve Mobil Bağış Kanalları**\n• **Resmî Tüzük & %85 Doğrudan Saha Dağıtımı**\n\nBugün hangi konuda bilgi almak istersiniz?`,
    timestamp: 'Az önce',
    actions: [
      { type: 'DONATE', payload: '10:The $50,000 Campaign Fund', label: '10 $ Hisse Bağışla' },
      { type: 'NAVIGATE', payload: '#field-footage', label: '17 Saha Fotoğrafını Gör' },
      { type: 'NAVIGATE', payload: '#infrastructure', label: 'Okul ve Hastane Projeleri' },
    ],
  },
  ms: {
    id: 'msg-welcome-ms',
    role: 'assistant',
    content: `**Assalamu Alaikum & Selamat Datang!**\n\nSaya **Amanah**, pembantu AI lapangan antarabangsa untuk **Sadaqah Africa** (NGO Reg #80020003418921).\n\nSaya boleh membantu anda memahami projek kebajikan kami:\n• **Kempen Saham $10 Menuju $50,000** (5 fasa impak)\n• **9 Program Bantuan Kecemasan** (Telaga air, sel sabit kanak-kanak, pek makanan)\n• **Pembinaan Sekolah & Hospital Komuniti** ($20k–$150k)\n• **17 Foto Lapangan Terverifikasi** dengan koordinat GPS\n• **Saluran Pembayaran Antarabangsa & Mobile Money**\n• **Perlembagaan & Audit Amanah 85%**\n\nBagaimana saya boleh membantu niat murni anda hari ini?`,
    timestamp: 'Sebentar tadi',
    actions: [
      { type: 'DONATE', payload: '10:The $50,000 Campaign Fund', label: 'Sumbang Saham $10' },
      { type: 'NAVIGATE', payload: '#field-footage', label: 'Lihat 17 Foto Lapangan' },
      { type: 'NAVIGATE', payload: '#infrastructure', label: 'Projek Sekolah & Hospital' },
    ],
  },
  ur: {
    id: 'msg-welcome-ur',
    role: 'assistant',
    content: `**السلام علیکم ورحمۃ اللہ وبرکاتہ! خوش آمدید**\n\nمیں **امانہ** ہوں، **صدقہ افریقہ** کا کثیر لسانی فیلڈ اے آئی گائیڈ (رجسٹریشن #80020003418921)۔\n\nمیں آپ کی مکمل رہنمائی کے لیے حاضر ہوں:\n• **$10 صدقہ مہم ($50,000 کا فلاحی ہدف)**\n• **9 اہم امدادی شعبے** (صاف پانی، سکل سیل بچوں کا علاج، راشن، یتیموں کی تعلیم)\n• **اسکول اور اسپتالوں کی تعمیر** ($20,000 تا $150,000 کے مستقل صدقہ جاریہ پراجیکٹس)\n• **17 تصویری ثبوت اور فیلڈ رپورٹس** لائیو موشن کے ساتھ\n• **بین الاقوامی کارڈز اور موبائل منی کے ذریعے ادائیگی**\n• **آئین اور 85% فیلڈ امداد کی شفافیت**\n\nآج میں آپ کے کار خیر میں کس طرح معاون بن سکتا ہوں؟`,
    timestamp: 'ابھی',
    actions: [
      { type: 'DONATE', payload: '10:The $50,000 Campaign Fund', label: '10$ کا صدقہ شیئر دیں' },
      { type: 'NAVIGATE', payload: '#field-footage', label: '17 فیلڈ تصاویر دیکھیں' },
      { type: 'NAVIGATE', payload: '#infrastructure', label: 'اسکول اور اسپتال تعمیرات' },
    ],
  },
  sw: {
    id: 'msg-welcome-sw',
    role: 'assistant',
    content: `**Habari za leo na Karibu Sana!**\n\nMimi ni **Amanah**, msaidizi wako wa akili bandia (AI) kwa ajili ya **Sadaqah Africa** (Usajili wa NGO #80020003418921).\n\nNaweza kukuelekeza katika huduma zetu zote:\n• **Kampeni ya Hisa ya $10 Kufikia $50,000** (Hatua 5 za maendeleo)\n• **Miradi 9 ya Msaada** (Maji safi, selimundu, chakula, na elimu ya mayatima)\n• **Ujenzi wa Shule na Hospitali** ($20k hadi $150k)\n• **Picha 17 za Ushahidi wa Uwandani**\n• **Kutoa Mchango kwa Simu (MTN & Airtel Money)** na kadi za benki\n• **Katiba na Taarifa ya Ukaguzi wa Hesabu (85% huenda uwandani)**\n\nJe, ungependa kupata maelezo gani zaidi leo?`,
    timestamp: 'Sasa hivi',
    actions: [
      { type: 'DONATE', payload: '10:The $50,000 Campaign Fund', label: 'Toa Hisa ya $10' },
      { type: 'NAVIGATE', payload: '#field-footage', label: 'Picha 17 za Uwandani' },
      { type: 'NAVIGATE', payload: '#infrastructure', label: 'Ujenzi wa Shule & Hospitali' },
      { type: 'NAVIGATE', payload: '#donate', label: 'Njia za Malipo' },
    ],
  },
  es: {
    id: 'msg-welcome-es',
    role: 'assistant',
    content: `**¡Assalamu Alaikum y Bienvenidos!**\n\nSoy **Amanah**, tu asistente IA multilingüe para **Sadaqah Africa** (Registro ONG #80020003418921).\n\nPuedo guiarte por toda nuestra plataforma de ayuda comunitaria en África Oriental:\n• La **Campaña de $10 hacia los $50.000** en 5 fases de impacto\n• **9 Programas Humanitarios** (Agua potable, anemia falciforme, alimentos, huérfanos)\n• **Construcción de Escuelas y Hospitales** ($20.000 a $150.000)\n• **17 Fotografías Reales de Campo** verificadas con coordenadas GPS\n• **Donaciones Internacionales**: Tarjetas de crédito, PayPal y Mobile Money\n• **Constitución Oficial y 85% de Ayuda Directa** auditada\n\n¿Cómo puedo orientar tu contribución hoy?`,
    timestamp: 'Ahora mismo',
    actions: [
      { type: 'DONATE', payload: '10:The $50,000 Campaign Fund', label: 'Donar Acción de $10' },
      { type: 'NAVIGATE', payload: '#field-footage', label: 'Ver 17 Fotos de Campo' },
      { type: 'NAVIGATE', payload: '#infrastructure', label: 'Escuelas y Hospitales ($20k–$150k)' },
    ],
  },
  bn: {
    id: 'msg-welcome-bn',
    role: 'assistant',
    content: `**আসসালামু আলাইকুম এবং সাদাকাহ আফ্রিকায় স্বাগতম!**\n\nআমি **আমানাহ**, আন্তর্জাতিক দাতাদের জন্য **সাদাকাহ আফ্রিকা**র এআই গাইড (এনজিও নিবন্ধন নং #৮০০২০০৩NDE8921)।\n\nআমি আপনাকে আমাদের মানবিক প্রকল্পের সমস্ত তথ্য দিতে প্রস্তুত:\n• **$১০ সদকা ক্যাম্পেইন ($৫০,০০০ লক্ষ্য)**\n• **৯টি জরুরি সেবা কর্মসূচি** (বিশুদ্ধ পানি, শিশুদের রক্তরোগ চিকিৎসা, খাদ্য ও শিক্ষা)\n• **স্কুল ও হাসপাতাল ভবন নির্মাণ** ($২০,০০০ থেকে $১৫০,০০০ পর্যন্ত স্থায়ী সাদাকাহ জারিয়াহ)\n• **১৭টি ফিল্ড আলোকচিত্র ও বাস্তব প্রমাণ**\n• **আন্তর্জাতিক কার্ড, পেপ্যাল ও মোবাইল মানি পেমেন্ট**\n• **৮৫% সরাসরি ফিল্ড বিতরণ সনদ ও অডিট রিপোর্ট**\n\nআজ আমি আপনাকে কীভাবে সহায়তা করতে পারি?`,
    timestamp: 'এইমাত্র',
    actions: [
      { type: 'DONATE', payload: '10:The $50,000 Campaign Fund', label: '$১০ সদকা শেয়ার প্রদান' },
      { type: 'NAVIGATE', payload: '#field-footage', label: '১৭টি ফিল্ড ছবি দেখুন' },
      { type: 'NAVIGATE', payload: '#infrastructure', label: 'স্কুল ও হাসপাতাল প্রকল্প' },
    ],
  },
};

const LOCALIZED_CHIPS: Record<string, Array<{ label: string; query: string }>> = {
  en: [
    { label: '💡 How does $10 to $50k work?', query: 'How does the $10 share campaign work towards the $50,000 goal?' },
    { label: '🏫 School & Hospital construction', query: 'Tell me about the School and Hospital construction projects and budgets' },
    { label: '📱 How to pay via MTN & Airtel', query: 'How do I donate via MTN Mobile Money or Airtel Money?' },
    { label: '📸 Show me the 17 ground photos', query: 'Where can I see the 17 verified ground photos and dispatches?' },
    { label: '📜 Constitution & 85% fund policy', query: 'Explain the Constitution, NGO registration, and 85% fund breakdown' },
    { label: '🆘 How to apply for emergency aid', query: 'How can a family or community apply for emergency humanitarian aid?' },
  ],
  ar: [
    { label: '💡 كيف تعمل حملة الـ 10 دولارات؟', query: 'كيف تعمل حملة الـ 10 دولارات للوصول إلى هدف 50,000 دولار؟' },
    { label: '🏫 بناء المدارس والمستشفيات', query: 'ما هي تكاليف وتفاصيل مشاريع بناء المدارس والمستشفيات؟' },
    { label: '📱 التبرع عبر الهاتف والبطاقات', query: 'كيف يمكنني التبرع عبر الهاتف المحمول أو البطاقات البنكية؟' },
    { label: '📸 مشاهدة 17 صورة ميدانية', query: 'أين يمكنني رؤية الصور الميدانية الموثقة الـ 17؟' },
    { label: '📜 الدستور والتقارير المالية (85%)', query: 'اشرح لي دستور المنظمة وترخيصها ونسبة الصرف 85%' },
    { label: '🆘 كيفية طلب المساعدة الإغاثية', query: 'كيف يمكن لأسرة أو قرية محتاجة تقديم طلب إغاثة طارئة؟' },
  ],
  fr: [
    { label: '💡 Campagne 10 $ vers 50 000 $', query: 'Comment fonctionne la campagne de 10 $ vers 50 000 $ ?' },
    { label: '🏫 Écoles & Hôpitaux ($20k-$150k)', query: 'Quels sont les détails et budgets de construction des écoles et hôpitaux ?' },
    { label: '📱 Payer par Mobile Money & Carte', query: 'Comment donner via MTN Mobile Money, Airtel Money ou Carte bancaire ?' },
    { label: '📸 Voir les 17 photos terrain', query: 'Montrez-moi les 17 photos vérifiées du terrain' },
    { label: '📜 Constitution & Règle des 85%', query: 'Expliquez la constitution officielle et la répartition de 85% sur le terrain' },
  ],
  de: [
    { label: '💡 10 $-Kampagne bis 50.000 $', query: 'Wie funktioniert die 10 $-Kampagne bis zu 50.000 $?' },
    { label: '🏫 Bau von Schulen & Kliniken', query: 'Erzählen Sie mir von den Schul- und Krankenhausbauprojekten' },
    { label: '📱 Spenden per Karte & Mobile Money', query: 'Welche Spenden- und Zahlungswege gibt es?' },
    { label: '📸 17 Feldfotos ansehen', query: 'Wo finde ich die 17 verifizierten Feldfotos?' },
  ],
  tr: [
    { label: '💡 10 $ ile 50.000 $ Hedefi', query: '10 $ hisse kampanyası 50.000 $ hedefine nasıl ulaşacak?' },
    { label: '🏫 Okul ve Hastane İnşaatları', query: 'Okul ve hastane inşaat projeleri ve bütçeleri nelerdir?' },
    { label: '📱 Kredi Kartı ve Mobil Bağış', query: 'Kredi kartı veya mobil ödeme ile nasıl bağış yapabilirim?' },
    { label: '📸 17 Saha Fotoğrafını Gör', query: '17 doğrulanmış saha fotoğrafını nerede görebilirim?' },
  ],
  ms: [
    { label: '💡 Kempen $10 ke $50,000', query: 'Bagaimana kempen saham $10 ke $50,000 berfungsi?' },
    { label: '🏫 Pembinaan Sekolah & Hospital', query: 'Apakah kos dan perincian pembinaan sekolah dan hospital komuniti?' },
    { label: '📱 Cara Sumbang Mobile Money', query: 'Bagaimana cara menderma melalui kad dan perbankan antarabangsa?' },
    { label: '📸 17 Gambar Lapangan Rasmi', query: 'Di manakah saya boleh melihat 17 gambar lapangan yang disahkan?' },
  ],
  ur: [
    { label: '💡 $10 مہم اور $50k فنڈ', query: '$10 مہم اور $50,000 ہدف کا طریقہ کار کیا ہے؟' },
    { label: '🏫 اسکول و اسپتال تعمیرات', query: 'اسکول اور اسپتال کی تعمیراتی لاگت اور تفصیلات کیا ہیں؟' },
    { label: '📱 عطیہ دینے کے طریقے', query: 'بین الاقوامی کارڈ اور موبائل منی سے عطیہ کیسے دیا جائے؟' },
    { label: '📸 17 فیلڈ تصاویر دیکھیں', query: '17 تصدیق شدہ فیلڈ تصاویر کہاں دیکھی جا سکتی ہیں؟' },
  ],
  sw: [
    { label: '💡 Kampeni ya $10 hadi $50k', query: 'Jinsi kampeni ya hisa ya $10 hadi $50,000 inavyofanya kazi?' },
    { label: '🏫 Ujenzi wa Shule na Hospitali', query: 'Nieleze kuhusu gharama za ujenzi wa shule na hospitali' },
    { label: '📱 Jinsi ya kutoa kwa MTN/Airtel', query: 'Jinsi ya kuchangia kwa njia ya MTN au Airtel Money?' },
    { label: '📸 Picha 17 za uwandani', query: 'Ninaweza kuona wapi picha 17 za uthibitisho za uwandani?' },
  ],
  es: [
    { label: '💡 Campaña $10 a $50k', query: '¿Cómo funciona la campaña de $10 hacia los $50.000?' },
    { label: '🏫 Escuelas y Hospitales', query: '¿Cuáles son los costos y proyectos de escuelas y hospitales?' },
    { label: '📱 Métodos de Donación', query: '¿Cómo donar mediante tarjeta o canales internacionales?' },
    { label: '📸 17 Fotos de Campo', query: '¿Dónde puedo ver las 17 fotos de campo verificadas?' },
  ],
  bn: [
    { label: '💡 $১০ ক্যাম্পেইনের নিয়মাবলী', query: '$১০ ক্যাম্পেইন কীভাবে $৫০,০০০ লক্ষ্যে কাজ করছে?' },
    { label: '🏫 স্কুল ও হাসপাতাল নির্মাণ ব্যয়', query: 'স্কুল ও হাসপাতাল নির্মাণ প্রকল্পের খরচ ও বিবরণ জানান' },
    { label: '📱 পেমেন্ট ও ডোনেশনের উপায়', query: 'আন্তর্জাতিক কার্ড ও মোবাইল মাধ্যমে কীভাবে ডোনেট করব?' },
    { label: '📸 ১৭টি ফিল্ড ছবি দেখুন', query: 'বাস্তব ফিল্ডের ১৭টি ছবি কোথায় দেখতে পাব?' },
  ],
};

interface AIAssistantProps {
  currentLang?: string;
  onLanguageChange?: (lang: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectDonation: (amount: number, causeTitle: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  currentLang = 'en',
  onLanguageChange,
  onNavigateSection,
  onSelectDonation,
}) => {
  const [selectedLangCode, setSelectedLangCode] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('sadaqah_assistant_lang');
      if (saved) return saved;
    } catch (e) {
      // ignore
    }
    return currentLang || 'en';
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [hasPromptedPill, setHasPromptedPill] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  // Sync with prop when parent language changes
  useEffect(() => {
    if (currentLang && currentLang !== selectedLangCode) {
      setSelectedLangCode(currentLang);
    }
  }, [currentLang]);

  const activeLangConfig =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLangCode) || SUPPORTED_LANGUAGES[0];

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(`sadaqah_ai_chat_${selectedLangCode}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [LOCALIZED_GREETINGS[selectedLangCode] || LOCALIZED_GREETINGS['en']];
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Switch greeting when language changes
  const handleSelectLanguage = (code: string) => {
    setSelectedLangCode(code);
    setIsLangMenuOpen(false);
    try {
      localStorage.setItem('sadaqah_assistant_lang', code);
    } catch (e) {
      // ignore
    }

    if (onLanguageChange) {
      onLanguageChange(code);
    }

    // Set initial greeting in selected language
    const newGreeting = LOCALIZED_GREETINGS[code] || LOCALIZED_GREETINGS['en'];
    setMessages([newGreeting]);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  // Persist messages per language
  useEffect(() => {
    try {
      localStorage.setItem(`sadaqah_ai_chat_${selectedLangCode}`, JSON.stringify(messages));
    } catch (e) {
      // ignore
    }
  }, [messages, selectedLangCode]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  // Browser speech synthesis for audio assistance with localized voice matching
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*#_`]/g, '').replace(/\[ACTION:[^\]]+\]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = activeLangConfig.ttsLang || 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          pageContext: window.location.hash || '#hero',
          language: selectedLangCode,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Barakallahu feekum.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: data.actions || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiMsg.content);
    } catch (err: any) {
      console.error('AI Assistant fetch error:', err);
      const fallbackGreeting = LOCALIZED_GREETINGS[selectedLangCode] || LOCALIZED_GREETINGS['en'];
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fallbackGreeting.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: fallbackGreeting.actions,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: ActionButton) => {
    if (action.type === 'NAVIGATE') {
      onNavigateSection(action.payload);
      if (window.innerWidth < 768) {
        setIsMinimized(true);
      }
    } else if (action.type === 'DONATE') {
      const parts = action.payload.split(':');
      const amount = parseFloat(parts[0]) || 10;
      const cause = parts[1] || 'The $50,000 Campaign Fund';
      onSelectDonation(amount, cause);
      if (window.innerWidth < 768) {
        setIsMinimized(true);
      }
    }
  };

  const handleResetChat = () => {
    if (window.confirm('Reset conversation in this language?')) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      const initial = LOCALIZED_GREETINGS[selectedLangCode] || LOCALIZED_GREETINGS['en'];
      setMessages([initial]);
      localStorage.removeItem(`sadaqah_ai_chat_${selectedLangCode}`);
    }
  };

  // Helper to render formatted text with bold and list items
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      const isNumbered = /^\d+\.\s/.test(line.trim());
      const parts = line.split(/(\*\*[^*]+\*\*)/g);

      return (
        <p
          key={idx}
          className={`${
            isBullet || isNumbered ? 'pl-3.5 my-0.5 relative text-xs sm:text-[13px]' : 'my-1 text-xs sm:text-[13px]'
          } leading-relaxed`}
        >
          {isBullet && (
            <span className="absolute left-0 text-[#114A18] font-bold">•</span>
          )}
          {parts.map((p, pIdx) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-[#0A2E0F]">
                  {p.slice(2, -2)}
                </strong>
              );
            }
            if (p.startsWith('`') && p.endsWith('`')) {
              return (
                <code key={pIdx} className="px-1.5 py-0.5 rounded-sm bg-amber-100 font-mono text-xs font-bold text-amber-900">
                  {p.slice(1, -1)}
                </code>
              );
            }
            return <span key={pIdx}>{p}</span>;
          })}
        </p>
      );
    });
  };

  const currentChips = LOCALIZED_CHIPS[selectedLangCode] || LOCALIZED_CHIPS['en'];

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Introductory Prompting Pill */}
        {hasPromptedPill && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0A2E0F] text-white shadow-xl border border-amber-300/40 text-xs font-semibold backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-[#D8EC6E] animate-ping" />
            <span className="flex items-center gap-1.5">
              <span>{activeLangConfig.flag}</span>
              <span><strong>Amanah AI:</strong> Multilingual Donor Guide</span>
            </span>
            <button
              type="button"
              onClick={() => setHasPromptedPill(false)}
              className="p-1 text-slate-300 hover:text-white transition-colors"
              aria-label="Dismiss greeting"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* Trigger Button with Aura */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#114A18] via-[#E59A14] to-[#D8EC6E] opacity-75 blur-xs animate-pulse" />
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
              setIsMinimized(false);
              setHasPromptedPill(false);
            }}
            aria-label="Toggle Amanah AI Assistant"
            className="relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#0A2E0F] hover:bg-[#114A18] text-white font-bold text-xs sm:text-sm shadow-2xl border-2 border-[#D8EC6E] transition-all transform active:scale-95 cursor-pointer group"
          >
            <div className="relative">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D8EC6E] group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-[#0A2E0F]" />
            </div>
            <span className="font-editorial tracking-wide font-black hidden sm:inline flex items-center gap-1.5">
              <span>Ask Amanah AI</span>
              <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-white/20 text-[#D8EC6E]">
                {activeLangConfig.flag} {activeLangConfig.code.toUpperCase()}
              </span>
            </span>
            <span className="sm:hidden font-editorial font-black flex items-center gap-1">
              <span>AI Guide</span>
              <span className="text-xs">{activeLangConfig.flag}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Assistant Modal / Sliding Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : undefined,
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            dir={activeLangConfig.isRtl ? 'rtl' : 'ltr'}
            className={`fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] ${
              isMinimized ? 'h-auto' : 'h-[630px] max-h-[84vh]'
            } bg-[#FAF7F0] rounded-3xl shadow-2xl border-2 border-amber-300 flex flex-col overflow-hidden`}
          >
            {/* Top Bar / Header */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0A2E0F] via-[#114A18] to-[#165B1E] text-white flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center p-1 shrink-0">
                  <img
                    src="/assets/aistudio/sadaqah_logo_fa323d09.jpeg"
                    alt="Sadaqah Africa"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#D8EC6E] border-2 border-[#0A2E0F]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-editorial text-sm sm:text-base font-black tracking-tight text-white">
                      Amanah AI
                    </h3>
                    <span className="px-1.5 py-0.2 rounded-full bg-[#D8EC6E] text-[#0A2E0F] text-[0.62rem] font-mono font-black uppercase">
                      Global Guide
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-emerald-100/80">
                    Sadaqah Africa · NGO #80020003418921
                  </p>
                </div>
              </div>

              {/* Header Action Buttons & International Language Switcher */}
              <div className="flex items-center gap-1">
                {/* Language Switcher Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    title="Change Donor Language"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold text-amber-100 border border-white/20 transition-colors"
                  >
                    <span>{activeLangConfig.flag}</span>
                    <span className="text-[11px] uppercase font-mono">{activeLangConfig.code}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Language Selector Dropdown */}
                  {isLangMenuOpen && (
                    <div
                      className="absolute top-full mt-2 right-0 z-50 w-52 bg-white rounded-2xl shadow-2xl border border-amber-300 py-2 text-slate-800 text-xs overflow-hidden"
                      dir="ltr"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        International Donor Languages (10)
                      </div>
                      <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => handleSelectLanguage(lang.code)}
                            className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-amber-50 transition-colors ${
                              lang.code === selectedLangCode ? 'bg-amber-100/60 font-bold text-[#114A18]' : ''
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-sm">{lang.flag}</span>
                              <span>{lang.name}</span>
                              <span className="text-[11px] text-slate-400 font-normal">({lang.native})</span>
                            </span>
                            {lang.code === selectedLangCode && <Check className="w-3.5 h-3.5 text-[#114A18]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Audio Read-Aloud Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !ttsEnabled;
                    setTtsEnabled(next);
                    if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  title={ttsEnabled ? 'Mute AI Voice' : 'Enable Voice Read-Aloud'}
                  className={`p-1.5 rounded-xl transition-colors ${
                    ttsEnabled ? 'bg-[#D8EC6E] text-[#0A2E0F]' : 'text-emerald-100 hover:bg-white/10'
                  }`}
                >
                  {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Reset Conversation */}
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-xl text-emerald-100 hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Minimize Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? 'Expand window' : 'Minimize window'}
                  className="p-1.5 rounded-xl text-emerald-100 hover:bg-white/10 transition-colors"
                >
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsLangMenuOpen(false);
                  }}
                  title="Close assistant"
                  className="p-1.5 rounded-xl text-emerald-100 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Collapsible Content Area */}
            {!isMinimized && (
              <>
                {/* Multilingual Suggestion Chips */}
                <div className="px-3.5 py-2.5 bg-amber-50/70 border-b border-amber-200/60 overflow-x-auto no-scrollbar shrink-0">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-[10px] font-mono font-bold text-amber-800 uppercase shrink-0">
                      {activeLangConfig.code === 'ar' ? 'اقتراحات سريعة:' : activeLangConfig.code === 'fr' ? 'Suggestions :' : 'Quick Prompts:'}
                    </span>
                    {currentChips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(chip.query)}
                        className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-100/80 text-[11px] font-semibold text-slate-700 hover:text-[#114A18] border border-amber-300/80 shadow-2xs transition-colors shrink-0 cursor-pointer"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages Scroll Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#FAF7F0] to-[#F5EEDC]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.role === 'user'
                          ? activeLangConfig.isRtl
                            ? 'items-start'
                            : 'items-end'
                          : activeLangConfig.isRtl
                          ? 'items-end'
                          : 'items-start'
                      }`}
                    >
                      {/* Bubble Container */}
                      <div
                        className={`max-w-[88%] p-3.5 rounded-2xl shadow-xs text-xs sm:text-sm ${
                          msg.role === 'user'
                            ? 'bg-[#114A18] text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-amber-200 rounded-bl-xs'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          <div className="space-y-1 text-slate-800">
                            {renderFormattedText(msg.content)}
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        )}

                        {/* Interactive Action Chips inside Assistant message */}
                        {msg.role === 'assistant' && msg.actions && msg.actions.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-amber-200/70 flex flex-wrap gap-1.5">
                            {msg.actions.map((act, actIdx) => (
                              <button
                                key={actIdx}
                                type="button"
                                onClick={() => handleActionClick(act)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all transform active:scale-95 cursor-pointer ${
                                  act.type === 'DONATE'
                                    ? 'bg-[#114A18] hover:bg-[#165B1E] text-white border border-[#D8EC6E]'
                                    : 'bg-[#FAFDE6] hover:bg-[#F3FAC4] text-[#114A18] border border-amber-300'
                                }`}
                              >
                                {act.type === 'DONATE' ? (
                                  <Heart className="w-3.5 h-3.5 text-[#D8EC6E] fill-[#D8EC6E]" />
                                ) : (
                                  <ArrowRight className="w-3.5 h-3.5 text-[#E59A14]" />
                                )}
                                <span>{act.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Timestamp */}
                      <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <div className="w-7 h-7 rounded-xl bg-white border border-amber-200 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-[#114A18] animate-spin" />
                      </div>
                      <div className="px-3 py-2 rounded-xl bg-white border border-amber-200 shadow-2xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#114A18] animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#114A18] animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#114A18] animate-bounce [animation-delay:0.4s]" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        {activeLangConfig.code === 'ar'
                          ? 'جاري مراجعة قواعد البيانات الميدانية...'
                          : activeLangConfig.code === 'fr'
                          ? 'Consultation de la base humanitaire...'
                          : 'Consulting international humanitarian database...'}
                      </span>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input Controls */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-white border-t border-amber-200 flex items-center gap-2 shrink-0"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={
                      activeLangConfig.code === 'ar'
                        ? 'اسأل باللغة العربية عن حملة الـ 10$، المدارس، طرق الدفع...'
                        : activeLangConfig.code === 'fr'
                        ? 'Posez votre question en français (écoles, dons, forages)...'
                        : activeLangConfig.code === 'tr'
                        ? 'Türkçe olarak kampanyayı, okul inşaatlarını veya bağışları sorun...'
                        : activeLangConfig.code === 'de'
                        ? 'Fragen Sie auf Deutsch nach Schulbau, Brunnen, Spenden...'
                        : activeLangConfig.code === 'sw'
                        ? 'Uliza kwa Kiswahili kuhusu visima, shule, au michango...'
                        : activeLangConfig.code === 'ur'
                        ? 'اردو میں اسکول، اسپتال یا عطیات کے متعلق سوال پوچھیں...'
                        : 'Ask in your language about the $10 campaign, schools, mobile money...'
                    }
                    className="flex-1 px-3.5 py-2.5 rounded-2xl bg-[#FAF7F0] border border-amber-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#114A18] placeholder:text-slate-400 font-sans"
                    disabled={isLoading}
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2.5 rounded-2xl bg-[#114A18] hover:bg-[#165B1E] disabled:bg-slate-300 text-white shadow-md transition-all transform active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                    title="Send question"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
