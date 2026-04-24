import { useState, useEffect } from 'react';
import {
  Flame, Zap, Wind, Gauge, Shield, Camera, MessageCircle,
  MapPin, Clock, AlertTriangle, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, Menu, X, ArrowRight,
  Users, Instagram, Heart, Send, TriangleAlert, Lock,
  Trash2, LogOut, RefreshCw, Eye, EyeOff
} from 'lucide-react';

// ========== CONFIG (edit these) ==========
const CONFIG = {
  WA_NUMBER: '905555555555',      // رقمك واتساب (بدون + )
  IG_HANDLE: 'adrenalin27',        // انستغرامك
  ADMIN_PASSWORD: 'adrenalin27',   // كلمة سر لوحة الحجوزات (غيّرها!)
  HOURS: { start: 8, end: 23 },    // ساعات العمل (8 ص → 11 م)
  USD_TO_TL: 34,                   // لعرض السعر بالـ TL كإشارة
};

// =========== CONTENT ===========
const c = {
  ar: {
    dir: 'rtl',
    brand: 'أدرينالين ٢٧',
    tagline: 'تجربة موتور ناري · غازي عنتاب',
    nav: [
      { id: 'experience', label: 'التجربة' },
      { id: 'packages', label: 'الباقات' },
      { id: 'safety', label: 'السلامة' },
      { id: 'book', label: 'احجز' },
      { id: 'faq', label: 'أسئلة' },
    ],
    warningBadge: 'تجربة قوية · 18+',
    heroTitle1: 'اركب ورا',
    heroTitle2: 'وعيش اللحظة',
    heroTitle3: 'يلّي ما بتتنسى',
    heroSub: 'من 3 دقايق لنصف ساعة ورا سائق محترف على موتور سبورت ناري بشوارع غازي عنتاب. خوذة، جاكيت، سرعة، ريح، وصور تذكارية. بس انت والأدرينالين.',
    ctaBook: 'احجز تجربتك',
    ctaWA: 'اسأل عالواتساب',
    stats: [
      { big: '+250', unit: 'km/h', label: 'أقصى سرعة الموتور' },
      { big: '3.2', unit: 's', label: '0 إلى 100 كم/س' },
      { big: '+1000', unit: '', label: 'تجربة تمّت بنجاح' },
      { big: '100%', unit: '', label: 'ذكرى ما تُنسى' },
    ],
    expTitle: 'شو رح تحسّ؟',
    expSub: 'مش جولة عادية. دقائق بتغيّر نبضك وبتضلّ معك.',
    experiences: [
      { icon: Flame, title: 'ضربة الأدرينالين', desc: 'من الثانية اللي بيفتح فيها العادم. قلبك بينبض مع المحرك.' },
      { icon: Wind, title: 'الريح بوجّك', desc: 'سرعة حقيقية على طريق مفتوح. الصوت، الهواء، كل شي.' },
      { icon: Gauge, title: 'تسارع مجنون', desc: 'من صفر لـ 100 بأقل من 4 ثواني. رح تحسّ فيه بكل خلية.' },
      { icon: Shield, title: 'سائق محترف', desc: 'سنوات خبرة، رخصة سارية، بيعرف كيف يعطيك الإثارة بأمان.' },
      { icon: Camera, title: 'صور تذكارية', desc: 'منصوّرك خلال الجولة — منعطيك الصور بعدين مجاناً.' },
      { icon: Heart, title: 'تجربة شخصية', desc: 'أنت فقط ورا السائق. التجربة كاملة إلك — مش جماعية.' },
    ],
    pkgTitle: 'اختار باقتك',
    pkgSub: 'من رشفة أدرينالين لجولة كاملة حوالين عنتاب. كل الباقات تشمل المعدّات.',
    packages: [
      {
        id: 'sip',
        name: 'الرشفة',
        nameLatin: 'SIP',
        duration: 'رايد واحد · خط طويل',
        priceUSD: 5,
        tag: 'تجربة سريعة',
        desc: 'رشفة أدرينالين. رايد واحد على خط طويل ومفتوح — تحسّ السرعة وترجع. مثالي لأول مرة.',
        features: [
          'رايد واحد على خط مستقيم طويل',
          'خوذة وجاكيت',
          'سائق محترف',
          'صورة تذكارية',
        ],
        highlight: false,
      },
      {
        id: 'fire',
        name: 'النيران',
        nameLatin: 'FIRE',
        duration: '10 دقائق',
        priceUSD: 15,
        tag: 'الأكثر طلباً',
        desc: 'عشر دقايق سرعة ومنعرجات. بيصير عندك وقت تحسّ الموتور وتعيش اللحظة.',
        features: [
          'جولة 10 دقائق',
          'خوذة، جاكيت، قفازات',
          'شارع مفتوح + منعرجات',
          '5 صور + مقطع قصير',
        ],
        highlight: true,
      },
      {
        id: 'storm',
        name: 'العاصفة',
        nameLatin: 'STORM',
        duration: 'نصف ساعة · فتلة عنتاب',
        priceUSD: 30,
        tag: 'الجولة الكاملة',
        desc: 'نصف ساعة فتلة حوالين غازي عنتاب. الطريق الكامل، التجربة القصوى.',
        features: [
          'جولة نصف ساعة كاملة',
          'معدّات كاملة (خوذة + جاكيت + قفازات)',
          'جولة حوالين عنتاب',
          'فيديو احترافي + +10 صور',
          'توقّفات للصور',
        ],
        highlight: false,
      },
    ],
    pkgSelect: 'اختار هاي الباقة',
    pkgSelected: '✓ مختارة',
    bookTitle: 'احجز جولتك',
    bookSub: '١. اختار الباقة   ٢. اختار التاريخ   ٣. اختار الوقت   ٤. أكمل المعلومات',
    step1: 'الباقة',
    step2: 'التاريخ',
    step3: 'الوقت',
    step4: 'معلوماتك',
    pickDate: 'اختار يوم',
    pickTime: 'الأوقات المتاحة',
    noSlots: 'ما في أوقات متاحة هاليوم',
    weekDays: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    months: ['كانون ثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين أول', 'تشرين ثاني', 'كانون أول'],
    selectPkgFirst: 'اختار الباقة أولاً',
    selectDateFirst: 'اختار التاريخ أولاً',
    selectTimeFirst: 'اختار الوقت أولاً',
    form: {
      name: 'اسمك الكامل',
      phone: 'رقم واتساب',
      height: 'الطول (سم)',
      weight: 'الوزن (كغ)',
      notes: 'ملاحظات (اختياري)',
      notesPh: 'أي شي بدك تخبرنا فيه...',
      agree: 'أقرّ بأني بصحّة جيدة، عمري 18+، وبفهم أن هاي التجربة فيها مخاطر. موافق على شروط المشاركة.',
      submit: 'تأكيد الحجز',
      bookingSaved: '✓ تم حفظ الحجز! فتحنا لك واتساب لتأكيده.',
      error: 'صار خطأ. جرّب مرة تانية.',
    },
    safetyTitle: 'السلامة أولاً. الإثارة تانياً.',
    safetySub: 'كل سائق محترف، كل معدّة جديدة، كل تجربة بتبدأ بتعليمات واضحة.',
    safetyItems: [
      { icon: Shield, title: 'خوذة معتمدة', desc: 'خوذات ECE/DOT جديدة ومعقّمة بعد كل استخدام.' },
      { icon: Shield, title: 'جاكيت مع دروع', desc: 'جاكيت سبورت مع حماية ظهر وأكتاف وأكواع.' },
      { icon: Shield, title: 'قفازات وحذاء', desc: 'قفازات لكل جولة. ينصح بحذاء مغلق.' },
      { icon: Users, title: 'سائق مرخّص', desc: 'رخصة سارية وسنوات خبرة. مش هاوٍ.' },
      { icon: CheckCircle2, title: 'فحص قبل كل جولة', desc: 'الموتور بينفحص قبل كل جولة. كل شي جاهز.' },
      { icon: AlertTriangle, title: 'شروط واضحة', desc: 'الحد الأدنى 18 سنة. الوزن حتى 110 كغ. موافقة مكتوبة قبل الركوب.' },
    ],
    faqTitle: 'أسئلة شائعة',
    faqs: [
      { q: 'هل التجربة آمنة؟', a: 'نعم، بقدر ما ركوب موتور ممكن يكون آمن. سائقينا محترفين ومعدّاتنا معتمدة، بس لازم تعرف إنه ركوب الموتور فيه مخاطر — كل شخص بيركب لازم يوقّع ورقة موافقة.' },
      { q: 'شو لازم ألبس؟', a: 'بنطلون طويل (جينز مفضّل)، حذاء مغلّق وثابت، وتيشيرت. الخوذة والجاكيت والقفازات بنأمّنهم نحنا.' },
      { q: 'كيف الدفع؟', a: 'كاش وقت الوصول بالدولار أو ما يعادله بالتركي، أو تحويل بنكي / Papara قبل الموعد. للحجز ممكن نطلب عربون.' },
      { q: 'لو الطقس سيء؟', a: 'السلامة أولوية. لو مطر أو رياح قوية، بنأجّل الجولة لموعد تاني بدون أي رسوم.' },
      { q: 'وين نقطة الانطلاق؟', a: 'منرسلك الموقع الدقيق بعد تأكيد الحجز عالواتساب.' },
    ],
    finalCta1: 'جاهز تركب؟',
    finalCta2: 'اضغط تشتعل',
    footer: {
      hours: 'الدوام: كل يوم · 8:00 ص — 11:00 م',
      city: 'غازي عنتاب · تركيا',
      copy: 'جميع الحقوق محفوظة',
      disclaimer: 'تنبيه: ركوب الموتور فيه مخاطر. التجربة للراشدين فقط.',
      admin: 'لوحة المالك',
    },
    adminTitle: 'لوحة الحجوزات',
    adminLoginTitle: 'دخول المالك',
    adminPwLabel: 'كلمة السر',
    adminLogin: 'دخول',
    adminLogout: 'خروج',
    adminStats: { total: 'إجمالي الحجوزات', upcoming: 'قادمة', today: 'اليوم', past: 'سابقة' },
    adminNoBookings: 'ما في حجوزات قادمة.',
    adminRefresh: 'تحديث',
    adminDelete: 'حذف',
    adminDeleteConfirm: 'متأكد تحذف هاد الحجز؟',
    adminBooking: { name: 'الاسم', phone: 'واتساب', pkg: 'الباقة', date: 'التاريخ', time: 'الوقت', h: 'طول', w: 'وزن', notes: 'ملاحظات' },
    adminCallWA: 'فتح واتساب',
    adminBack: 'عودة للموقع',
    wrongPassword: 'كلمة السر غلط',
    slotTaken: 'هالوقت انحجز للأسف، اختار غيره.',
  },

  tr: {
    dir: 'ltr',
    brand: 'ADRENALİN 27',
    tagline: 'Motor Deneyimi · Gaziantep',
    nav: [
      { id: 'experience', label: 'Deneyim' },
      { id: 'packages', label: 'Paketler' },
      { id: 'safety', label: 'Güvenlik' },
      { id: 'book', label: 'Rezervasyon' },
      { id: 'faq', label: 'SSS' },
    ],
    warningBadge: 'Yoğun deneyim · 18+',
    heroTitle1: 'Arkaya atla',
    heroTitle2: 've unutulmayacak',
    heroTitle3: 'o anı yaşa',
    heroSub: 'Gaziantep sokaklarında profesyonel sürücünün arkasında spor motor ile 3 dakikadan yarım saate kadar. Kask, ceket, hız, rüzgar ve hatıra fotoğrafları.',
    ctaBook: 'Rezervasyon Yap',
    ctaWA: 'WhatsApp’tan Sor',
    stats: [
      { big: '+250', unit: 'km/h', label: 'Maksimum hız' },
      { big: '3.2', unit: 's', label: '0–100 km/h' },
      { big: '+1000', unit: '', label: 'Başarılı deneyim' },
      { big: '100%', unit: '', label: 'Unutulmaz anı' },
    ],
    expTitle: 'Ne hissedeceksin?',
    expSub: 'Sıradan değil. Kalp atışını değiştiren dakikalar.',
    experiences: [
      { icon: Flame, title: 'Adrenalin vuruşu', desc: 'Egzoz açıldığı andan itibaren. Kalbin motorla ritim tutuyor.' },
      { icon: Wind, title: 'Yüzünde rüzgar', desc: 'Açık yolda gerçek hız. Ses, hava, her şey.' },
      { icon: Gauge, title: 'Çılgın ivme', desc: '4 saniyeden az sürede 0–100.' },
      { icon: Shield, title: 'Profesyonel sürücü', desc: 'Yıllarca tecrübe, ehliyet geçerli.' },
      { icon: Camera, title: 'Hatıra fotoğrafları', desc: 'Fotoğraflarını ücretsiz paylaşıyoruz.' },
      { icon: Heart, title: 'Kişisel deneyim', desc: 'Sadece sen ve sürücü.' },
    ],
    pkgTitle: 'Paketini seç',
    pkgSub: 'Kısa bir adrenalin tadından tam Gaziantep turuna. Ekipmanlar dahil.',
    packages: [
      {
        id: 'sip',
        name: 'YUDUM',
        nameLatin: 'SIP',
        duration: 'Tek gidiş · uzun düz',
        priceUSD: 5,
        tag: 'Hızlı tat',
        desc: 'Bir yudum adrenalin. Uzun ve açık bir yolda tek gidiş — hızı hisset ve dön.',
        features: ['Tek uzun düz gidiş', 'Kask ve ceket', 'Profesyonel sürücü', '1 hatıra fotoğrafı'],
        highlight: false,
      },
      {
        id: 'fire',
        name: 'ALEV',
        nameLatin: 'FIRE',
        duration: '10 dakika',
        priceUSD: 15,
        tag: 'En popüler',
        desc: '10 dakika hız ve virajlar. Motoru hissetmeye ve anı yaşamaya yetecek zaman.',
        features: ['10 dakika tur', 'Kask, ceket, eldiven', 'Açık yol + virajlar', '5 foto + kısa video'],
        highlight: true,
      },
      {
        id: 'storm',
        name: 'FIRTINA',
        nameLatin: 'STORM',
        duration: 'Yarım saat · Antep turu',
        priceUSD: 30,
        tag: 'Tam tur',
        desc: 'Gaziantep çevresinde yarım saat tur. Tam rota, uç deneyim.',
        features: ['Yarım saat tur', 'Tam ekipman', 'Antep çevresi', 'Pro video + +10 foto', 'Foto molaları'],
        highlight: false,
      },
    ],
    pkgSelect: 'Bu paketi seç',
    pkgSelected: '✓ Seçildi',
    bookTitle: 'Tur rezervasyonu',
    bookSub: '1. Paket  2. Tarih  3. Saat  4. Bilgiler',
    step1: 'Paket',
    step2: 'Tarih',
    step3: 'Saat',
    step4: 'Bilgiler',
    pickDate: 'Gün seç',
    pickTime: 'Uygun saatler',
    noSlots: 'Bu gün uygun saat yok',
    weekDays: ['Pa', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
    months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    selectPkgFirst: 'Önce paketi seç',
    selectDateFirst: 'Önce tarihi seç',
    selectTimeFirst: 'Önce saati seç',
    form: {
      name: 'Adın soyadın',
      phone: 'WhatsApp numarası',
      height: 'Boy (cm)',
      weight: 'Kilo (kg)',
      notes: 'Notlar (opsiyonel)',
      notesPh: 'Belirtmek istediğin bir şey...',
      agree: 'Sağlığımın iyi olduğunu, 18 yaş üstü olduğumu ve bu deneyimin risk içerdiğini anladığımı beyan ederim.',
      submit: 'Rezervasyonu Onayla',
      bookingSaved: '✓ Rezervasyon kaydedildi! Onay için WhatsApp açıldı.',
      error: 'Bir hata oluştu. Tekrar deneyin.',
    },
    safetyTitle: 'Önce güvenlik. Sonra heyecan.',
    safetySub: 'Her sürücü profesyonel, her ekipman yeni.',
    safetyItems: [
      { icon: Shield, title: 'Sertifikalı kask', desc: 'ECE/DOT sertifikalı, dezenfekte.' },
      { icon: Shield, title: 'Zırhlı ceket', desc: 'Sırt, omuz, dirsek korumalı.' },
      { icon: Shield, title: 'Eldiven, ayakkabı', desc: 'Her tur için eldiven.' },
      { icon: Users, title: 'Ehliyetli sürücü', desc: 'Geçerli ehliyet ve yıllar tecrübe.' },
      { icon: CheckCircle2, title: 'Her tur öncesi kontrol', desc: 'Motor her turdan önce kontrol.' },
      { icon: AlertTriangle, title: 'Net şartlar', desc: 'Min 18 yaş. Maks 110 kg.' },
    ],
    faqTitle: 'Sıkça sorulanlar',
    faqs: [
      { q: 'Güvenli mi?', a: 'Motor sürüşü güvenli olabildiği kadar güvenli. Herkes onay formu imzalar.' },
      { q: 'Ne giymeli?', a: 'Uzun pantolon, kapalı ayakkabı, tişört. Ekipmanlar bizde.' },
      { q: 'Ödeme?', a: 'Gelişte nakit (USD veya TL), veya havale/Papara. Kapora istenebilir.' },
      { q: 'Hava kötüyse?', a: 'Ücretsiz erteleniyor.' },
      { q: 'Başlangıç noktası?', a: 'Rezervasyon onayından sonra WhatsApp’tan gönderiyoruz.' },
    ],
    finalCta1: 'Binmeye hazır mısın?',
    finalCta2: 'Ateşle',
    footer: {
      hours: 'Her gün · 08:00 — 23:00',
      city: 'Gaziantep · Türkiye',
      copy: 'Tüm hakları saklıdır',
      disclaimer: 'Uyarı: Motor sürüşü risk içerir. Sadece yetişkinler.',
      admin: 'Yönetici paneli',
    },
    adminTitle: 'Rezervasyon Paneli',
    adminLoginTitle: 'Yönetici Girişi',
    adminPwLabel: 'Şifre',
    adminLogin: 'Giriş',
    adminLogout: 'Çıkış',
    adminStats: { total: 'Toplam', upcoming: 'Yaklaşan', today: 'Bugün', past: 'Geçmiş' },
    adminNoBookings: 'Yaklaşan rezervasyon yok.',
    adminRefresh: 'Yenile',
    adminDelete: 'Sil',
    adminDeleteConfirm: 'Bu rezervasyonu silmek istediğine emin misin?',
    adminBooking: { name: 'İsim', phone: 'WhatsApp', pkg: 'Paket', date: 'Tarih', time: 'Saat', h: 'Boy', w: 'Kilo', notes: 'Not' },
    adminCallWA: 'WhatsApp aç',
    adminBack: 'Siteye dön',
    wrongPassword: 'Şifre yanlış',
    slotTaken: 'Bu saat az önce alındı, başkasını seç.',
  },
};

// ========= STORAGE HELPERS =========
const BOOKINGS_KEY = 'bookings';

async function loadBookings() {
  try {
    const r = await window.storage.get(BOOKINGS_KEY, true);
    if (!r) return [];
    return JSON.parse(r.value);
  } catch {
    return [];
  }
}

async function saveBookings(list) {
  try {
    await window.storage.set(BOOKINGS_KEY, JSON.stringify(list), true);
    return true;
  } catch {
    return false;
  }
}

// ========= DATE HELPERS =========
function pad(n) { return n.toString().padStart(2, '0'); }
function ymd(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function sameDay(a, b) { return ymd(a) === ymd(b); }
function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }

function getMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const start = addDays(first, -startWeekday);
  const days = [];
  for (let i = 0; i < 42; i++) days.push(addDays(start, i));
  return days;
}

// ========= MAIN COMPONENT =========
export default function Adrenalin27() {
  const [lang, setLang] = useState('ar');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const t = c[lang];
  const rtl = t.dir === 'rtl';

  // Booking state
  const [bookings, setBookings] = useState([]);
  const [selectedPkg, setSelectedPkg] = useState('');
  const [calMonth, setCalMonth] = useState(() => {
    const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', height: '', weight: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Admin state
  const [adminView, setAdminView] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPw, setAdminPw] = useState('');
  const [pwError, setPwError] = useState(false);

  // Rolling RPM
  const [rpm, setRpm] = useState(3500);
  useEffect(() => {
    const id = setInterval(() => setRpm(Math.floor(2800 + Math.random() * 6000)), 140);
    return () => clearInterval(id);
  }, []);

  const reloadBookings = async () => {
    const b = await loadBookings();
    setBookings(b);
  };
  useEffect(() => { reloadBookings(); }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Time slots
  const allSlots = [];
  for (let h = CONFIG.HOURS.start; h < CONFIG.HOURS.end; h++) {
    allSlots.push(`${pad(h)}:00`);
  }
  const takenSlots = new Set(
    bookings.filter(b => b.date === selectedDate).map(b => b.time)
  );
  const now = new Date();
  const todayYMD = ymd(now);
  const availableSlots = allSlots.filter(s => {
    if (selectedDate === todayYMD) {
      const [h] = s.split(':').map(Number);
      if (h <= now.getHours()) return false;
    }
    return true;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed || submitting) return;
    if (!selectedPkg) { setErrorMsg(t.selectPkgFirst); return; }
    if (!selectedDate) { setErrorMsg(t.selectDateFirst); return; }
    if (!selectedTime) { setErrorMsg(t.selectTimeFirst); return; }

    setSubmitting(true);
    setErrorMsg('');

    const latest = await loadBookings();
    const taken = latest.some(b => b.date === selectedDate && b.time === selectedTime);
    if (taken) {
      setBookings(latest);
      setSelectedTime('');
      setErrorMsg(t.slotTaken);
      setSubmitting(false);
      return;
    }

    const pkgObj = t.packages.find(p => p.id === selectedPkg);
    const newBooking = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      pkg: selectedPkg,
      pkgName: pkgObj?.name || selectedPkg,
      pkgPrice: pkgObj?.priceUSD || 0,
      date: selectedDate,
      time: selectedTime,
      name: form.name,
      phone: form.phone,
      height: form.height,
      weight: form.weight,
      notes: form.notes,
      lang,
    };
    const newList = [...latest, newBooking];
    const ok = await saveBookings(newList);
    if (!ok) {
      setErrorMsg(t.form.error);
      setSubmitting(false);
      return;
    }
    setBookings(newList);
    setSuccessMsg(t.form.bookingSaved);

    const msg = lang === 'ar'
      ? `🏍️🔥 *حجز جديد — أدرينالين ٢٧*\n\n👤 الاسم: ${form.name}\n📱 واتساب: ${form.phone}\n📦 الباقة: ${pkgObj?.name} ($${pkgObj?.priceUSD})\n📅 التاريخ: ${selectedDate}\n🕐 الوقت: ${selectedTime}\n📏 الطول: ${form.height} سم\n⚖️ الوزن: ${form.weight} كغ\n📝 ملاحظات: ${form.notes || 'لا يوجد'}\n\n✅ وافق على الشروط`
      : `🏍️🔥 *Yeni Rezervasyon — Adrenalin 27*\n\n👤 İsim: ${form.name}\n📱 WhatsApp: ${form.phone}\n📦 Paket: ${pkgObj?.name} ($${pkgObj?.priceUSD})\n📅 Tarih: ${selectedDate}\n🕐 Saat: ${selectedTime}\n📏 Boy: ${form.height} cm\n⚖️ Kilo: ${form.weight} kg\n📝 Not: ${form.notes || 'Yok'}\n\n✅ Şartları kabul etti`;
    window.open(`https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');

    setTimeout(() => {
      setSelectedTime('');
      setForm({ name: '', phone: '', height: '', weight: '', notes: '' });
      setAgreed(false);
      setSuccessMsg('');
      setSubmitting(false);
    }, 2500);
  };

  // ADMIN VIEW
  if (adminView) {
    return (
      <AdminPanel
        t={t} rtl={rtl}
        bookings={bookings}
        reload={reloadBookings}
        authed={adminAuthed}
        onAuth={(pw) => {
          if (pw === CONFIG.ADMIN_PASSWORD) {
            setAdminAuthed(true);
            setPwError(false);
            reloadBookings();
          } else {
            setPwError(true);
          }
        }}
        pwError={pwError}
        adminPw={adminPw}
        setAdminPw={setAdminPw}
        onLogout={() => { setAdminAuthed(false); setAdminPw(''); setAdminView(false); }}
        onBack={() => setAdminView(false)}
        onDelete={async (id) => {
          if (!confirm(t.adminDeleteConfirm)) return;
          const latest = await loadBookings();
          const filtered = latest.filter(b => b.id !== id);
          await saveBookings(filtered);
          setBookings(filtered);
        }}
      />
    );
  }

  return (
    <div
      dir={t.dir}
      className="min-h-screen selection:bg-[#FF0033] selection:text-white"
      style={{
        fontFamily: rtl ? "'Tajawal', 'Archivo', system-ui, sans-serif" : "'Archivo', 'Tajawal', system-ui, sans-serif",
        background: '#0A0A0A',
        color: '#F5F5F5',
      }}
    >
      <SharedStyles />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 bg-[#FF0033] flex items-center justify-center group-hover:bg-[#FFD400] transition-colors">
              <Flame size={20} className="text-black" />
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full strobe" />
            </div>
            <div className="leading-tight">
              <div className="display text-sm md:text-base">{t.brand}</div>
              <div className="text-[9px] opacity-50 uppercase tracking-widest mono -mt-0.5">{t.tagline}</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {t.nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-xs uppercase tracking-widest font-bold hover:text-[#FF0033] transition-colors">{n.label}</button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex bg-white/10 text-white text-xs font-bold overflow-hidden">
              <button onClick={() => setLang('ar')} className={`px-3 py-1.5 ${lang === 'ar' ? 'bg-[#FF0033]' : 'hover:bg-white/10'}`}>ع</button>
              <button onClick={() => setLang('tr')} className={`px-3 py-1.5 ${lang === 'tr' ? 'bg-[#FF0033]' : 'hover:bg-white/10'}`}>TR</button>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 -m-2">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
              {t.nav.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className={`py-3 border-b border-white/10 font-bold uppercase text-xs tracking-widest text-${rtl ? 'right' : 'left'}`}>{n.label}</button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden noise">
        <div className="h-3 hazard" />
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="speedline" style={{ top: `${15 + i * 15}%`, animationDelay: `${i * 0.3}s`, animationDuration: `${1.5 + i * 0.2}s` }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 space-y-6">
              <div className="reveal inline-flex items-center gap-2 border border-[#FFD400]/40 bg-[#FFD400]/10 text-[#FFD400] px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
                <TriangleAlert size={14} />
                {t.warningBadge}
              </div>
              <h1 className="display text-6xl md:text-8xl lg:text-9xl reveal reveal-2">
                <div>{t.heroTitle1}</div>
                <div className="text-[#FF0033] relative inline-block">
                  {t.heroTitle2}
                  <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                    <path d="M0 4 L200 4" stroke="#FFD400" strokeWidth="3" strokeDasharray="8 4" />
                  </svg>
                </div>
                <div>{t.heroTitle3}</div>
              </h1>
              <p className="text-base md:text-lg max-w-xl opacity-70 reveal reveal-3 leading-relaxed">{t.heroSub}</p>
              <div className="flex flex-wrap gap-3 reveal reveal-4">
                <button onClick={() => scrollTo('book')} className="group bg-[#FF0033] text-white px-6 py-4 font-black uppercase tracking-wider text-sm flex items-center gap-3 hover:bg-white hover:text-black transition-all">
                  <Flame size={18} />
                  {t.ctaBook}
                  <ArrowRight size={18} className={`transition-transform group-hover:translate-x-1 ${rtl ? 'rotate-180' : ''}`} />
                </button>
                <a href={`https://wa.me/${CONFIG.WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="border border-white/30 px-6 py-4 font-black uppercase tracking-wider text-sm flex items-center gap-3 hover:bg-white hover:text-black hover:border-white transition-colors">
                  <MessageCircle size={18} />
                  {t.ctaWA}
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 reveal reveal-4">
              <div className="relative bg-black border border-white/10 p-6 md:p-8">
                <div className="absolute top-0 left-0 h-1 w-full bg-[#FF0033]" />
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="relative w-2 h-2 rounded-full bg-[#FF0033] live" />
                    <span className="text-[10px] mono uppercase tracking-widest opacity-50">{rtl ? 'محرك يشتغل' : 'Motor çalışıyor'}</span>
                  </div>
                  <Gauge size={18} className="text-[#FF0033]" />
                </div>
                <div className="mono text-xs opacity-50 uppercase tracking-widest mb-2">RPM</div>
                <div className="display text-6xl md:text-7xl tabular-nums mono">{rpm.toLocaleString()}</div>
                <div className="mt-4 h-2 bg-white/10 relative overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#FFD400] via-[#FF0033] to-[#FF0033] transition-all duration-200" style={{ width: `${Math.min(100, (rpm / 9000) * 100)}%` }} />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
                  <div>
                    <div className="mono text-[10px] uppercase tracking-widest opacity-50">{rtl ? 'مدة' : 'Süre'}</div>
                    <div className="display text-xl mono">3-30′</div>
                  </div>
                  <div>
                    <div className="mono text-[10px] uppercase tracking-widest opacity-50">{rtl ? 'ركّاب' : 'Yolcu'}</div>
                    <div className="display text-xl mono">01</div>
                  </div>
                  <div>
                    <div className="mono text-[10px] uppercase tracking-widest opacity-50">{rtl ? 'عمر' : 'Yaş'}</div>
                    <div className="display text-xl mono">18+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-3 hazard" />
      </section>

      {/* STATS */}
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {t.stats.map((s, i) => (
              <div key={i} className="flex flex-col border-s-2 border-[#FF0033] ps-4">
                <div className="display text-4xl md:text-6xl">
                  {s.big}
                  {s.unit && <span className="text-xl md:text-2xl text-[#FFD400] mono ms-1 align-top">{s.unit}</span>}
                </div>
                <div className="text-xs mono uppercase tracking-widest opacity-50 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="mono text-xs text-[#FF0033] uppercase tracking-widest mb-3">[ 01 / {rtl ? 'التجربة' : 'Deneyim'} ]</div>
            <h2 className="display text-5xl md:text-7xl max-w-3xl">{t.expTitle}</h2>
            <p className="opacity-60 mt-4 max-w-xl">{t.expSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
            {t.experiences.map((e, i) => {
              const Icon = e.icon;
              return (
                <div key={i} className={`group p-6 md:p-8 hover:bg-[#FF0033] transition-all duration-300 border-white/10 ${i < 3 ? 'border-b' : ''} ${(i + 1) % 3 !== 0 ? 'lg:border-e' : ''} ${i % 2 === 0 ? 'sm:border-e lg:border-e-0' : ''}`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 border border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-black transition-colors">
                      <Icon size={22} />
                    </div>
                    <div className="mono text-xs opacity-30">0{i + 1}</div>
                  </div>
                  <h3 className="display text-2xl mb-2">{e.title}</h3>
                  <p className="text-sm opacity-60 group-hover:opacity-90 leading-relaxed">{e.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="mono text-xs text-[#FF0033] uppercase tracking-widest mb-3">[ 02 / {rtl ? 'الباقات' : 'Paketler'} ]</div>
            <h2 className="display text-5xl md:text-7xl">{t.pkgTitle}</h2>
            <p className="opacity-60 mt-4 max-w-xl">{t.pkgSub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {t.packages.map((p) => {
              const isSelected = selectedPkg === p.id;
              return (
                <div key={p.id} className={`tilt-card relative border-2 p-6 md:p-8 flex flex-col transition-colors ${
                  isSelected
                    ? 'bg-[#FFD400] border-[#FFD400] text-black'
                    : p.highlight
                      ? 'bg-[#FF0033] border-[#FF0033] text-white md:-translate-y-4'
                      : 'bg-black border-white/15'
                }`}>
                  {p.highlight && !isSelected && (
                    <div className="absolute -top-3 start-6 bg-[#FFD400] text-black px-3 py-1 text-xs font-black uppercase tracking-wider">★ {p.tag}</div>
                  )}
                  {isSelected && (
                    <div className="absolute -top-3 start-6 bg-black text-[#FFD400] px-3 py-1 text-xs font-black uppercase tracking-wider">{t.pkgSelected}</div>
                  )}
                  <div className="mono text-xs uppercase tracking-widest opacity-60 mb-2">{p.nameLatin}</div>
                  <h3 className="display text-4xl md:text-5xl mb-1">{p.name}</h3>
                  <div className="flex items-center gap-2 opacity-80 text-sm mb-5">
                    <Clock size={14} />
                    <span className="mono">{p.duration}</span>
                  </div>
                  <p className={`text-sm mb-6 ${p.highlight || isSelected ? 'opacity-90' : 'opacity-60'}`}>{p.desc}</p>
                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={16} className={`mt-0.5 flex-shrink-0 ${isSelected ? 'text-[#FF0033]' : p.highlight ? 'text-[#FFD400]' : 'text-[#FF0033]'}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`border-t pt-5 mb-5 ${isSelected ? 'border-black/30' : p.highlight ? 'border-white/30' : 'border-white/10'}`}>
                    <div className="flex items-baseline gap-1">
                      <span className="display text-5xl tabular-nums">${p.priceUSD}</span>
                    </div>
                    <div className="text-xs opacity-60 mono">≈ {p.priceUSD * CONFIG.USD_TO_TL} TL</div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPkg(p.id);
                      setSelectedDate('');
                      setSelectedTime('');
                      setTimeout(() => scrollTo('book'), 200);
                    }}
                    className={`w-full py-3 font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-colors ${
                      isSelected
                        ? 'bg-black text-[#FFD400] hover:bg-[#FF0033] hover:text-white'
                        : p.highlight
                          ? 'bg-black text-white hover:bg-white hover:text-black'
                          : 'bg-white text-black hover:bg-[#FF0033] hover:text-white'
                    }`}
                  >
                    <Flame size={16} />
                    {isSelected ? t.pkgSelected : t.pkgSelect}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section id="safety" className="py-16 md:py-24 border-b border-white/10 bg-gradient-to-b from-[#0A0A0A] to-[#140404]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12 flex items-start gap-5 flex-wrap">
            <div className="flex-1 min-w-[260px]">
              <div className="mono text-xs text-[#FFD400] uppercase tracking-widest mb-3">[ 03 / {rtl ? 'السلامة' : 'Güvenlik'} ]</div>
              <h2 className="display text-5xl md:text-7xl">{t.safetyTitle}</h2>
              <p className="opacity-60 mt-4 max-w-xl">{t.safetySub}</p>
            </div>
            <div className="hazard w-20 h-20 flex-shrink-0" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.safetyItems.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="border border-white/10 p-5 hover:border-[#FFD400] transition-colors flex gap-4">
                  <div className="w-10 h-10 border border-[#FFD400]/40 bg-[#FFD400]/5 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#FFD400]" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg mb-1">{s.title}</h3>
                    <p className="text-sm opacity-60 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" className="py-16 md:py-24 border-b border-white/10 noise">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <div className="mono text-xs text-[#FF0033] uppercase tracking-widest mb-3">[ 04 / {rtl ? 'احجز' : 'Rezervasyon'} ]</div>
            <h2 className="display text-5xl md:text-7xl">{t.bookTitle}</h2>
            <p className="opacity-60 mt-4">{t.bookSub}</p>
          </div>

          {/* Progress steps */}
          <div className="mb-6 grid grid-cols-4 gap-1 mono text-[10px] uppercase tracking-widest">
            {[t.step1, t.step2, t.step3, t.step4].map((label, i) => {
              const done = [selectedPkg, selectedDate, selectedTime, (form.name && form.phone && agreed)][i];
              return (
                <div key={i} className={`p-3 border-t-2 ${done ? 'border-[#FF0033] text-white' : 'border-white/20 text-white/40'}`}>
                  0{i + 1}. {label}
                </div>
              );
            })}
          </div>

          {selectedPkg && (
            <div className="mb-4 p-4 border-2 border-[#FFD400] bg-[#FFD400]/5 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div className="mono text-[10px] opacity-60 uppercase tracking-widest">{t.step1}</div>
                <div className="display text-xl">
                  {t.packages.find(p => p.id === selectedPkg)?.name}
                  <span className="text-[#FFD400] ms-2">${t.packages.find(p => p.id === selectedPkg)?.priceUSD}</span>
                </div>
              </div>
              <button onClick={() => { setSelectedPkg(''); setSelectedDate(''); setSelectedTime(''); }} className="text-xs opacity-60 hover:opacity-100 underline">
                {rtl ? 'تغيير' : 'Değiştir'}
              </button>
            </div>
          )}

          {!selectedPkg ? (
            <div className="border-2 border-dashed border-white/20 p-8 text-center">
              <Flame size={32} className="mx-auto mb-3 opacity-40" />
              <p className="opacity-60">{t.selectPkgFirst}</p>
              <button onClick={() => scrollTo('packages')} className="mt-3 underline text-[#FF0033] font-bold text-sm">
                {rtl ? '← اختار باقة' : 'Paket seç →'}
              </button>
            </div>
          ) : (
            <>
              {/* Calendar */}
              <div className="border-2 border-white/15 bg-black mb-4">
                <CalendarGrid
                  t={t} rtl={rtl}
                  calMonth={calMonth}
                  setCalMonth={setCalMonth}
                  selectedDate={selectedDate}
                  onPickDate={(d) => { setSelectedDate(d); setSelectedTime(''); setErrorMsg(''); }}
                />
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div className="border-2 border-white/15 bg-black p-5 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="mono text-[10px] uppercase tracking-widest opacity-60">{t.pickTime}</div>
                      <div className="display text-xl">{selectedDate}</div>
                    </div>
                    <Clock size={20} className="text-[#FF0033]" />
                  </div>
                  {availableSlots.length === 0 ? (
                    <div className="py-6 text-center opacity-50">{t.noSlots}</div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {availableSlots.map((slot) => {
                        const taken = takenSlots.has(slot);
                        const selected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={taken}
                            onClick={() => { setSelectedTime(slot); setErrorMsg(''); }}
                            className={`p-3 border mono text-sm font-bold transition-colors ${
                              taken
                                ? 'border-white/10 bg-white/5 text-white/20 cursor-not-allowed line-through'
                                : selected
                                  ? 'border-[#FF0033] bg-[#FF0033] text-white'
                                  : 'border-white/20 hover:border-[#FF0033] hover:bg-[#FF0033]/20'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Info form */}
              {selectedTime && (
                <form onSubmit={handleSubmit} className="border-2 border-white/15 bg-black">
                  <div className="grid md:grid-cols-2 border-b border-white/15">
                    <div className="p-5 border-b md:border-b-0 md:border-e border-white/15">
                      <label className="mono text-[10px] uppercase tracking-widest opacity-60 block mb-2">{t.form.name} *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent text-lg focus:outline-none" placeholder={rtl ? 'محمد أحمد' : 'Mehmet'} />
                    </div>
                    <div className="p-5">
                      <label className="mono text-[10px] uppercase tracking-widest opacity-60 block mb-2">{t.form.phone} *</label>
                      <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-transparent text-lg focus:outline-none" placeholder="+90 5XX XXX XX XX" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 border-b border-white/15">
                    <div className="p-5 border-b md:border-b-0 md:border-e border-white/15">
                      <label className="mono text-[10px] uppercase tracking-widest opacity-60 block mb-2">{t.form.height}</label>
                      <input type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} className="w-full bg-transparent text-lg focus:outline-none" placeholder="175" />
                    </div>
                    <div className="p-5">
                      <label className="mono text-[10px] uppercase tracking-widest opacity-60 block mb-2">{t.form.weight}</label>
                      <input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="w-full bg-transparent text-lg focus:outline-none" placeholder="70" />
                    </div>
                  </div>

                  <div className="p-5 border-b border-white/15">
                    <label className="mono text-[10px] uppercase tracking-widest opacity-60 block mb-2">{t.form.notes}</label>
                    <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full bg-transparent text-sm focus:outline-none resize-none" rows={2} placeholder={t.form.notesPh} />
                  </div>

                  <div className="p-5 border-b border-white/15 bg-[#FFD400]/5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-5 h-5 accent-[#FF0033] flex-shrink-0" />
                      <span className="text-sm leading-relaxed opacity-80">
                        <TriangleAlert size={14} className="inline text-[#FFD400] me-1" />
                        {t.form.agree}
                      </span>
                    </label>
                  </div>

                  {errorMsg && <div className="p-4 bg-[#FF0033]/20 border-b border-[#FF0033] text-sm">{errorMsg}</div>}
                  {successMsg && <div className="p-4 bg-green-500/20 border-b border-green-500 text-sm">{successMsg}</div>}

                  <button
                    type="submit"
                    disabled={!agreed || submitting || !form.name || !form.phone}
                    className={`w-full p-5 md:p-6 font-black uppercase tracking-wider text-base md:text-lg flex items-center justify-center gap-3 transition-colors ${
                      agreed && !submitting && form.name && form.phone
                        ? 'bg-[#FF0033] text-white hover:bg-white hover:text-black'
                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    {submitting ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}
                    {t.form.submit}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="mb-10">
            <div className="mono text-xs text-[#FF0033] uppercase tracking-widest mb-3">[ 05 / FAQ ]</div>
            <h2 className="display text-5xl md:text-7xl">{t.faqTitle}</h2>
          </div>
          <div className="border border-white/15">
            {t.faqs.map((f, i) => (
              <div key={i} className={`${i < t.faqs.length - 1 ? 'border-b' : ''} border-white/15`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-5 md:p-6 flex items-center justify-between gap-4 hover:bg-[#FF0033] transition-colors text-start">
                  <div className="flex items-start gap-3">
                    <span className="mono text-xs opacity-50 mt-1.5">0{i + 1}</span>
                    <span className="display text-lg md:text-xl">{f.q}</span>
                  </div>
                  <ChevronDown size={22} className={`flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 md:px-6 pb-6 bg-white/[0.02]">
                    <p className="opacity-70 leading-relaxed ps-8 pt-1">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="h-3 hazard" />
        <div className="py-16 md:py-24 bg-[#FF0033] text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative">
            <Flame size={56} className="mx-auto mb-6" />
            <h3 className="display text-5xl md:text-8xl leading-[0.95] mb-3">{t.finalCta1}</h3>
            <h3 className="display text-5xl md:text-8xl leading-[0.95] mb-8 text-black">{t.finalCta2}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => scrollTo('book')} className="bg-black text-white px-8 py-4 font-black uppercase tracking-wider text-sm flex items-center gap-3 hover:bg-white hover:text-black transition-colors">
                <Zap size={18} /> {t.ctaBook}
              </button>
              <a href={`https://wa.me/${CONFIG.WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-8 py-4 font-black uppercase tracking-wider text-sm flex items-center gap-3 hover:bg-black hover:text-white transition-colors">
                <MessageCircle size={18} /> {t.ctaWA}
              </a>
            </div>
          </div>
        </div>
        <div className="h-3 hazard" />
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 bg-[#FF0033] flex items-center justify-center">
                  <Flame size={20} className="text-black" />
                </div>
                <div>
                  <div className="display text-lg">{t.brand}</div>
                  <div className="text-[9px] mono uppercase tracking-widest opacity-50">{t.tagline}</div>
                </div>
              </div>
              <p className="text-xs opacity-50 leading-relaxed max-w-xs">{t.footer.disclaimer}</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 opacity-80"><MapPin size={14} /> {t.footer.city}</div>
              <div className="flex items-center gap-2 opacity-80"><Clock size={14} /> {t.footer.hours}</div>
              <div className="flex items-center gap-2 opacity-80"><MessageCircle size={14} /> +{CONFIG.WA_NUMBER}</div>
            </div>
            <div className="flex md:justify-end items-start gap-2">
              <a href={`https://wa.me/${CONFIG.WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 hover:bg-[#FF0033] hover:border-[#FF0033] flex items-center justify-center transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href={`https://instagram.com/${CONFIG.IG_HANDLE}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 hover:bg-[#FF0033] hover:border-[#FF0033] flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between items-center gap-3 text-[10px] mono uppercase tracking-widest opacity-40">
            <div>© {new Date().getFullYear()} {t.brand}. {t.footer.copy}.</div>
            <button onClick={() => setAdminView(true)} className="hover:text-[#FF0033] hover:opacity-100 flex items-center gap-1">
              <Lock size={10} /> {t.footer.admin}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ========= CALENDAR =========
function CalendarGrid({ t, rtl, calMonth, setCalMonth, selectedDate, onPickDate }) {
  const today = startOfDay(new Date());
  const { y, m } = calMonth;
  const grid = getMonthGrid(y, m);

  const prev = () => {
    const d = new Date(y, m - 1, 1);
    setCalMonth({ y: d.getFullYear(), m: d.getMonth() });
  };
  const next = () => {
    const d = new Date(y, m + 1, 1);
    setCalMonth({ y: d.getFullYear(), m: d.getMonth() });
  };

  const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const canGoPrev = new Date(y, m, 1) > currentMonthStart;

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <button onClick={prev} disabled={!canGoPrev} className={`w-10 h-10 border flex items-center justify-center ${canGoPrev ? 'border-white/20 hover:bg-[#FF0033] hover:border-[#FF0033]' : 'border-white/5 text-white/20 cursor-not-allowed'}`}>
          {rtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        <div className="text-center">
          <div className="mono text-[10px] uppercase tracking-widest opacity-60">{t.pickDate}</div>
          <div className="display text-2xl">{t.months[m]} {y}</div>
        </div>
        <button onClick={next} className="w-10 h-10 border border-white/20 hover:bg-[#FF0033] hover:border-[#FF0033] flex items-center justify-center">
          {rtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {t.weekDays.map((d, i) => (
          <div key={i} className="text-center mono text-[10px] uppercase tracking-widest opacity-40 py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map((d, i) => {
          const inMonth = d.getMonth() === m;
          const isPast = startOfDay(d) < today;
          const isToday = sameDay(d, new Date());
          const dateStr = ymd(d);
          const isSelected = selectedDate === dateStr;
          const disabled = !inMonth || isPast;

          return (
            <button
              key={i} type="button" disabled={disabled}
              onClick={() => onPickDate(dateStr)}
              className={`aspect-square flex items-center justify-center mono text-sm font-bold transition-colors relative ${
                disabled
                  ? 'text-white/10 cursor-not-allowed'
                  : isSelected
                    ? 'bg-[#FF0033] text-white border border-[#FF0033]'
                    : isToday
                      ? 'border border-[#FFD400] text-[#FFD400] hover:bg-[#FFD400] hover:text-black'
                      : 'border border-white/10 hover:border-[#FF0033] hover:bg-[#FF0033]/20'
              }`}
            >
              {d.getDate()}
              {isToday && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-[#FFD400] rounded-full" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ========= ADMIN PANEL =========
function AdminPanel({ t, rtl, bookings, reload, authed, onAuth, pwError, adminPw, setAdminPw, onLogout, onBack, onDelete }) {
  const [showPw, setShowPw] = useState(false);

  if (!authed) {
    return (
      <div dir={t.dir} className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4"
        style={{ fontFamily: rtl ? "'Tajawal', system-ui" : "'Archivo', system-ui" }}>
        <SharedStyles />
        <div className="w-full max-w-sm border-2 border-white/15 bg-black p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Lock size={18} className="text-[#FF0033]" />
            <div className="mono text-[10px] uppercase tracking-widest opacity-60">{t.adminTitle}</div>
          </div>
          <h2 className="display text-3xl mb-6">{t.adminLoginTitle}</h2>

          <form onSubmit={(e) => { e.preventDefault(); onAuth(adminPw); }}>
            <label className="mono text-[10px] uppercase tracking-widest opacity-60 block mb-2">{t.adminPwLabel}</label>
            <div className="flex border border-white/20 mb-4">
              <input
                type={showPw ? 'text' : 'password'}
                value={adminPw}
                onChange={(e) => setAdminPw(e.target.value)}
                className="flex-1 bg-transparent p-3 focus:outline-none"
                autoFocus
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="px-3 hover:bg-white/5">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {pwError && <div className="text-[#FF0033] text-sm mb-3">{t.wrongPassword}</div>}
            <button type="submit" className="w-full bg-[#FF0033] text-white p-3 font-black uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors">
              {t.adminLogin}
            </button>
          </form>

          <button onClick={onBack} className="w-full mt-3 text-xs opacity-60 hover:opacity-100 mono uppercase tracking-widest">
            ← {t.adminBack}
          </button>
        </div>
      </div>
    );
  }

  const now = new Date();
  const todayY = ymd(now);
  const nowHour = now.getHours();

  const sorted = [...bookings].sort((a, b) => {
    const dateCmp = a.date.localeCompare(b.date);
    if (dateCmp !== 0) return dateCmp;
    return a.time.localeCompare(b.time);
  });

  const isPast = (b) => {
    if (b.date < todayY) return true;
    if (b.date > todayY) return false;
    const h = parseInt(b.time.split(':')[0], 10);
    return h < nowHour;
  };

  const upcoming = sorted.filter(b => !isPast(b));
  const past = sorted.filter(b => isPast(b));
  const todayBookings = upcoming.filter(b => b.date === todayY);

  return (
    <div dir={t.dir} className="min-h-screen bg-[#0A0A0A] text-white"
      style={{ fontFamily: rtl ? "'Tajawal', system-ui" : "'Archivo', system-ui" }}>
      <SharedStyles />

      <header className="sticky top-0 z-40 bg-black border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF0033] flex items-center justify-center">
              <Lock size={18} className="text-black" />
            </div>
            <div>
              <div className="display text-base">{t.adminTitle}</div>
              <div className="mono text-[9px] opacity-50 uppercase tracking-widest">ADRENALİN 27</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={reload} className="w-10 h-10 border border-white/20 hover:bg-[#FF0033] hover:border-[#FF0033] flex items-center justify-center" title={t.adminRefresh}>
              <RefreshCw size={16} />
            </button>
            <button onClick={onBack} className="hidden sm:flex px-3 h-10 border border-white/20 hover:bg-white hover:text-black text-xs mono uppercase tracking-widest items-center">
              {t.adminBack}
            </button>
            <button onClick={onLogout} className="w-10 h-10 border border-white/20 hover:bg-[#FF0033] hover:border-[#FF0033] flex items-center justify-center" title={t.adminLogout}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: t.adminStats.total, value: bookings.length, color: '#FF0033' },
            { label: t.adminStats.today, value: todayBookings.length, color: '#FFD400' },
            { label: t.adminStats.upcoming, value: upcoming.length, color: '#FF0033' },
            { label: t.adminStats.past, value: past.length, color: '#666' },
          ].map((s, i) => (
            <div key={i} className="border border-white/15 p-4" style={{ borderLeftColor: s.color, borderLeftWidth: 3 }}>
              <div className="mono text-[10px] uppercase tracking-widest opacity-60">{s.label}</div>
              <div className="display text-4xl tabular-nums">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="display text-2xl mb-4">{t.adminStats.upcoming} ({upcoming.length})</h3>
          {upcoming.length === 0 ? (
            <div className="border-2 border-dashed border-white/10 p-8 text-center opacity-50">
              {t.adminNoBookings}
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map(b => (
                <BookingCard key={b.id} b={b} t={t} rtl={rtl} onDelete={onDelete} isToday={b.date === todayY} />
              ))}
            </div>
          )}
        </div>

        {past.length > 0 && (
          <details className="group">
            <summary className="cursor-pointer display text-2xl mb-4 list-none flex items-center gap-2">
              <ChevronDown size={22} className="group-open:rotate-180 transition-transform" />
              {t.adminStats.past} ({past.length})
            </summary>
            <div className="space-y-3 opacity-60">
              {past.slice().reverse().map(b => (
                <BookingCard key={b.id} b={b} t={t} rtl={rtl} onDelete={onDelete} isPast />
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

function BookingCard({ b, t, rtl, onDelete, isToday }) {
  const pkgLabels = { sip: rtl ? 'الرشفة' : 'YUDUM', fire: rtl ? 'النيران' : 'ALEV', storm: rtl ? 'العاصفة' : 'FIRTINA' };
  const phoneClean = b.phone.replace(/[^0-9]/g, '');

  return (
    <div className={`border bg-black p-4 md:p-5 ${isToday ? 'border-[#FFD400]' : 'border-white/15'}`}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4">
          <div className={`w-20 p-3 text-center border ${isToday ? 'bg-[#FFD400] text-black border-[#FFD400]' : 'bg-[#FF0033]/10 border-[#FF0033]'}`}>
            <div className="mono text-[9px] uppercase tracking-widest opacity-70">{b.date.slice(5, 7)}/{b.date.slice(8)}</div>
            <div className="display text-2xl md:text-3xl mono">{b.time}</div>
            {isToday && <div className="mono text-[9px] font-black uppercase">{rtl ? 'اليوم' : 'BUGÜN'}</div>}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="display text-lg">{b.name || '—'}</span>
              <span className="mono text-[10px] bg-[#FF0033] text-white px-2 py-0.5">
                {pkgLabels[b.pkg] || b.pkgName} · ${b.pkgPrice}
              </span>
            </div>
            <div className="text-sm opacity-70 mono">{b.phone}</div>
            {(b.height || b.weight) && (
              <div className="text-xs opacity-50 mt-1 mono">
                {b.height && `${t.adminBooking.h}: ${b.height}cm`}
                {b.height && b.weight && ' · '}
                {b.weight && `${t.adminBooking.w}: ${b.weight}kg`}
              </div>
            )}
            {b.notes && (
              <div className="text-xs opacity-70 mt-2 border-s-2 border-[#FFD400] ps-2 italic">
                "{b.notes}"
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={`https://wa.me/${phoneClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 border border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black text-xs mono uppercase tracking-widest flex items-center gap-1.5"
          >
            <MessageCircle size={14} />
            {t.adminCallWA}
          </a>
          <button
            onClick={() => onDelete(b.id)}
            className="w-9 h-9 border border-[#FF0033]/40 text-[#FF0033] hover:bg-[#FF0033] hover:text-white flex items-center justify-center"
            title={t.adminDelete}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ========= SHARED STYLES =========
function SharedStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Archivo:wght@400;700;900&family=Archivo+Black&family=JetBrains+Mono:wght@400;700&display=swap');
      .display { font-family: 'Archivo Black', 'Tajawal', sans-serif; letter-spacing: -0.03em; line-height: 0.9; }
      .mono { font-family: 'JetBrains Mono', monospace; letter-spacing: -0.02em; }
      .hazard { background-image: repeating-linear-gradient(-45deg, #FFD400 0px, #FFD400 14px, #0A0A0A 14px, #0A0A0A 28px); }
      .noise { background-image: radial-gradient(ellipse at top, rgba(255,0,51,0.15), transparent 60%), radial-gradient(ellipse at bottom right, rgba(255,212,0,0.08), transparent 50%); }
      @keyframes strobe { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      .strobe { animation: strobe 1.2s ease-in-out infinite; }
      @keyframes slidein { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      .reveal { animation: slidein 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
      .reveal-2 { animation-delay: 0.12s; }
      .reveal-3 { animation-delay: 0.24s; }
      .reveal-4 { animation-delay: 0.36s; }
      @keyframes speedline { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      .speedline { position: absolute; height: 2px; background: linear-gradient(90deg, transparent, #FF0033, transparent); width: 60%; animation: speedline 2s linear infinite; }
      @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.9; } 100% { transform: scale(2.4); opacity: 0; } }
      .live::after { content: ''; position: absolute; inset: 0; border-radius: 9999px; background: #FF0033; animation: pulse-ring 1.6s ease-out infinite; }
      .tilt-card { transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
      .tilt-card:hover { transform: translateY(-6px) rotate(-0.5deg); }
      select, input, textarea { color-scheme: dark; }
      input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
    `}</style>
  );
}
