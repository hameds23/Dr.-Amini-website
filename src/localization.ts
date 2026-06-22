/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Education, Course, ResearchInterest, TimelineEvent } from './data';

export interface TranslationSchema {
  // Navigation Menu
  navHome: string;
  navAbout: string;
  navServices: string;
  navPortfolio: string;
  navBlogs: string;
  navContact: string;

  // Header / Actions
  adminPortal: string;
  portalTrigger: string;
  deskSignout: string;
  facultyEditorDesk: string;
  languageToggle: string;
  lightModeToggle: string;
  darkModeToggle: string;

  // General Intro Section
  greeting: string;
  roleSentence: string;
  summaryText: string;
  detailedAboutText: string;
  exploreBtn: string;
  contactBtn: string;

  // About Section
  aboutHeading: string;
  aboutIntro: string;
  aboutFullBio: string;
  coursesInstructed: string;
  journalPubs: string;
  researchProfileBtn: string;
  educationAndSkills: string;
  mySkillsHeading: string;
  skillsSubHeading: string;
  experienceHeading: string;
  academicTimeline: string;
  fellowshipLabel: string;
  facultyLabel: string;

  // Services Section
  whatIDo: string;
  gradCurriculumSeminars: string;
  coreSyllabus: string;
  advancedLevel: string;
  interdisciplinaryLevel: string;

  // Portfolio Section
  portfolioHeading: string;
  researchMapTitle: string;
  researchMapSub: string;
  cvHeading: string;

  // Contact Section
  contactMeHeading: string;
  contactChannels: string;
  researchConsults: string;
  contactParagraph: string;
  labLocationLabel: string;
  labLocationVal: string;
  primaryCorrespondence: string;
  saySomething: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectResearch: string;
  subjectPostgrad: string;
  subjectSpeaking: string;
  subjectGeneral: string;
  institutionLabel: string;
  institutionPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  synapticFilterTitle: string;
  synapticParagraph: string;
  synapticDormant: string;
  synapticActive: string;
  synapticFiring: string;
  sendMessageBtn: string;
  demoLabLabel: string;
  sandboxInboxTitle: string;
  sandboxInboxViewBtn: string;
  sandboxInboxLockBtn: string;
  sandboxInboxParagraph: string;
  sandboxInboxEmpty: string;

  // Blogs Section
  blogsHeading: string;
  blogsSub: string;
  blogsDraft: string;
  blogsPublished: string;
  readNotebook: string;
  newPost: string;
  queryingFacultyDB: string;
  dbQueryError: string;
  retryConnBtn: string;
  noBlogsMsg: string;
  composeInitialBlogBtn: string;
  adminUsernameLabel: string;
  adminPasswordLabel: string;
  adminUsernamePlaceholder: string;
  adminPasswordPlaceholder: string;
  adminLoginError: string;

  // App.tsx translations
  educationHeading: string;
  skillsSectionTitle: string;
  servicesHeading: string;
  curriculumSeminarsTitle: string;
  portfolioTitle: string;
  viewCVBtn: string;
  contactHeading: string;
  contactSectionTitle: string;
}

export const translations: Record<'en' | 'fa', TranslationSchema> = {
  en: {
    navHome: "Home",
    navAbout: "About Me",
    navServices: "Services",
    navPortfolio: "Portfolio",
    navBlogs: "Blogs",
    navContact: "Contact Me",

    adminPortal: "Admin Portal",
    portalTrigger: "Faculty Editor Desk",
    deskSignout: "Desk Signout",
    facultyEditorDesk: "Faculty Editor Desk",
    languageToggle: "زبان: فارسی",
    lightModeToggle: "Light Theme",
    darkModeToggle: "Dark Theme",

    greeting: "Hello, I am",
    roleSentence: "I Am Passionate",
    summaryText: "An interdisciplinary scholar bridging the gap between Artificial Intelligence, Computational Neuroscience, and Psychological processes. His career is dedicated to analyzing cognitive structures and diagnosing brain disorders (such as Alzheimer's and Parkinson's) by fusing machine learning frameworks with biological neural signal processing.",
    detailedAboutText: "Dr. Morteza Amini is a respected faculty member at the Institute for Cognitive Science Studies (ICSS). He began his academic tenure with B.Sc. and M.Sc. degrees in Electrical Engineering, specializing in Electronic Circuits and Systems. Realizing that the computational and artificial intelligence fields could benefit enormously from biological insights—and conversely, that psychological state assessment could be revolutionized by computational processing—he went on to complete a second Master's degree in General Psychology at the University of Tehran.\n\nDriven by this interdisciplinary syncretism of brain, mind, and machine, he completed his Ph.D. in Cognitive Science (specializing in Cognitive Modeling) at Shahid Beheshti University. His research focused heavily on the structural and cognitive changes in the brain for early Alzheimer's detection. He thereafter succeeded in completing two highly specialized post-doctoral research projects: one in Artificial Intelligence & Computing (at ICSS) focused on multi-modal data fusion for Parkinson's detection, and a second in Computational Neuroscience (at Shahid Beheshti University) focused on intelligent processing tools for pre-clinical neurodegenerative modeling.",
    exploreBtn: "Explore Portfolio",
    contactBtn: "Contact Me",

    aboutHeading: "About Me.",
    aboutIntro: "I'm an Assistant Professor & Computational Scholar with over 8 years of research and teaching experience.",
    aboutFullBio: "Dr. Morteza Amini stands as a pioneer in combining mathematical algorithms with neurobiological state classifiers. He pursued dynamic hardware models in electronic circuit engineering, completed psychological state assessments at the University of Tehran, and earned his Ph.D. in Cognitive Modeling from Shahid Beheshti University.",
    coursesInstructed: "Courses Instructed",
    journalPubs: "Core Journal Publications",
    researchProfileBtn: "Research Profile",
    educationAndSkills: "Education & Skills",
    mySkillsHeading: "My Skills",
    skillsSubHeading: "Through structured multidisciplinary fellowships and professional practice, my quantitative technical engineering and medical diagnostic expertise covers:",
    experienceHeading: "Experience.",
    academicTimeline: "Academic Timeline",
    fellowshipLabel: "FELLOWSHIP",
    facultyLabel: "FACULTY",

    whatIDo: "What I Do?",
    gradCurriculumSeminars: "Advanced Graduate Curriculum Seminars",
    coreSyllabus: "Core Syllabus",
    advancedLevel: "Advanced",
    interdisciplinaryLevel: "Interdisciplinary",

    portfolioHeading: "Portfolio",
    researchMapTitle: "Interactive Research Map",
    researchMapSub: "Toggle active node vertices in the computer-aided graph below to trace Dr. Morteza Amini's computational biology, engineering, and psychology paths.",
    cvHeading: "Academic Curriculum Vitae",

    contactMeHeading: "Contact Me",
    contactChannels: "Direct Channels",
    researchConsults: "Research Consultations",
    contactParagraph: "Interested in postgraduate advisorship, doctoral collaborations, neural signal pipeline projects, or inviting Dr. Amini to lecture? Call or draft a connection prompt.",
    labLocationLabel: "Laboratory Location:",
    labLocationVal: "Faculty Offices, ICSS",
    primaryCorrespondence: "Primary Correspondence:",
    saySomething: "Say Something",
    fullNameLabel: "Full Name *",
    fullNamePlaceholder: "e.g., Prof. Sarah Chen",
    emailLabel: "Your Email *",
    emailPlaceholder: "name@university.edu",
    subjectLabel: "Subject Matter",
    subjectResearch: "Research Collaboration",
    subjectPostgrad: "Postgraduate Advisorship",
    subjectSpeaking: "Speaking / Lecturing",
    subjectGeneral: "General Inquiry",
    institutionLabel: "Affiliation / Institution",
    institutionPlaceholder: "e.g., Stanford Medicine",
    messageLabel: "Message Content *",
    messagePlaceholder: "Compose your inquiry clearly outlining research contexts and biosensing or AI methodologies if relevant...",
    synapticFilterTitle: "Cognitive Synaptic Filter",
    synapticParagraph: "To trigger dispatch pathways, click to excite the active high-amplitude pulsating node:",
    synapticDormant: "Dormant",
    synapticActive: "Active",
    synapticFiring: "Firing",
    sendMessageBtn: "Send Message",
    demoLabLabel: "Demo Lab",
    sandboxInboxTitle: "Sandbox Correspondence Inbox",
    sandboxInboxViewBtn: "Examine Inbox",
    sandboxInboxLockBtn: "Lock Inbox view",
    sandboxInboxParagraph: "Below represents the database response of submitted messages (secured in your local browser sandbox). Test the form above to see your letter arrive instantaneously!",
    sandboxInboxEmpty: "Inbox registry is empty. Test the submission block above to populate!",

    blogsHeading: "Latest Blogs & Notebooks",
    blogsSub: "Browse publications, philosophical insights, and exploratory articles written by Dr. Amini bridging Cognitive Science, Multi-modal AI, and Computational Neuroscience.",
    blogsDraft: "Draft Mode",
    blogsPublished: "Published",
    readNotebook: "Read Notebook",
    newPost: "New Post",
    queryingFacultyDB: "Querying faculty databases...",
    dbQueryError: "Database Query Interruption",
    retryConnBtn: "Attempt Retry Connection",
    noBlogsMsg: "No active dynamic posts returned.",
    composeInitialBlogBtn: "Compose Initial Blog Post",
    adminUsernameLabel: "Admin Username",
    adminPasswordLabel: "Admin Password",
    adminUsernamePlaceholder: "Enter administrator username...",
    adminPasswordPlaceholder: "Enter administrator secret key...",
    adminLoginError: "Please enter both administrative username and password credentials.",

    // App.tsx translations
    educationHeading: "Education & Skills",
    skillsSectionTitle: "My Technical & Diagnostic Skills",
    servicesHeading: "Scientific Research & Interests",
    curriculumSeminarsTitle: "Advanced Graduate Curriculum Seminars",
    portfolioTitle: "Active Research & Portfolios",
    viewCVBtn: "Academic Curriculum Vitae (CV)",
    contactHeading: "Contact Correspondence",
    contactSectionTitle: "Correspondence & Inquiries"
  },
  fa: {
    navHome: "خانه",
    navAbout: "درباره من",
    navServices: "خدمات علمی",
    navPortfolio: "کارنامه و آثار",
    navBlogs: "وبلاگ علمی",
    navContact: "تماس با من",

    adminPortal: "پرتال مدیریت",
    portalTrigger: "میز ویراستار هیئت علمی",
    deskSignout: "خروج از سیستم",
    facultyEditorDesk: "پنل ویراستاری استاد",
    languageToggle: "Language: English",
    lightModeToggle: "پوسته روشن",
    darkModeToggle: "پوسته تاریک",

    greeting: "سلام، من",
    roleSentence: "علایق پژوهشی من",
    summaryText: "پژوهشگری چندرشته‌ای در نقطه تلاقی هوش مصنوعی، علوم اعصاب محاسباتی و فرآیندهای روان‌شناختی. تمرکز فعالیت‌های من بر تحلیل ساختارهای شناختی و تشخیص اختلالات مغزی (همچون آلزایمر و پارکینسون) با تلفیق چارچوب‌های یادگیری ماشین و پردازش سیگنال‌های زیستی مغز استوار است.",
    detailedAboutText: "دکتر مرتضی امینی از اعضای محترم هیئت علمی پژوهشکده علوم شناختی (ICSS) است. وی کار دانشگاهی خود را با مدارک کارشناسی و کارشناسی ارشد مهندسی برق با گرایش قطعات و سیستم‌های الکترونیکی آغاز نمود. با درک این موضوع که زمینه‌ محاسبات و هوش مصنوعی می‌تواند از بینش‌های زیست‌شناختی بهره‌ بالایی ببرد و متقابلاً، پایش‌های بالینی و روان‌شناختی با مدل‌های محاسباتی متحول شوند، مدرک کارشناسی ارشد دوم خود را در رشته روان‌شناسی عمومی از دانشگاه تهران دریافت نمود.\n\nبا تکیه بر این تقارب بین‌رشته‌ای در مغز، ذهن و ماشین، وی مدرک دکتری تخصصی خود را در گرایش مدل‌سازی شناختی از دانشگاه شهید بهشتی به پایان رساند. حوزه تخصصی او تغییرات ساختاری مغز برای تشخیص زودهنگام بیماری آلزایمر بود. وی پس از آن موفق به انجام دو پروژه پسادکتری معتبر شد: در پژوهشکده علوم شناختی روی همجوشی غنی داده‌های صوتی-بیومتریک به جهت پایش پارکینسون و در دانشگاه شهید بهشتی پیرامون ابزارهای پویای مدل‌سازی فریب‌های زیستی اعصاب پیش‌بالینی.",
    exploreBtn: "مشاهده کارنامه",
    contactBtn: "تماس با من",

    aboutHeading: "درباره من.",
    aboutIntro: "استادیار و پژوهشگر حوزه‌های محاسباتی مغز و ذهن با بیش از ۸ سال سابقه تدریس و تحقیق دانشگاهی.",
    aboutFullBio: "دکتر مرتضی امینی از پیشگامان تلفیق الگوریتم‌های ریاضی و تحلیل‌گرهای پیشرفته زیست‌شناختی مغز است. وی پس از تحصیل در رشته مهندسی برق (الکترونیک)، تحصیلات خود را در مقطع کارشناسی ارشد روان‌شناسی عمومی دانشگاه تهران پی گرفت و دکترای خود را در رشته علوم شناختی (گرایش مدل‌سازی شناختی) از دانشگاه شهید بهشتی به پایان رساند.",
    coursesInstructed: "درس‌های ارائه شده",
    journalPubs: "مقالات ژورنال‌های معتبر",
    researchProfileBtn: "مشخصات پژوهشی",
    educationAndSkills: "تحصیلات و مهارت‌ها",
    mySkillsHeading: "مهارت‌های تخصصی",
    skillsSubHeading: "به عنوان ماحصل دوره‌های فوق‌دکتری چندرشته‌ای و تجارب بالینی و دانشگاهی، مهارت‌های فنی بنده شامل موارد زیر است:",
    experienceHeading: "سوابق علمی.",
    academicTimeline: "زمان‌بندی آکادمیک",
    fellowshipLabel: "دوره فوق‌دکتری",
    facultyLabel: "عضو هیئت علمی",

    whatIDo: "حوزه‌های فعالیت علمی؟",
    gradCurriculumSeminars: "سمینارها و دروس پیشرفته تحصیلات تکمیلی",
    coreSyllabus: "درس پایه",
    advancedLevel: "پیشرفته",
    interdisciplinaryLevel: "بین‌رشته‌ای",

    portfolioHeading: "کارنامه",
    researchMapTitle: "نقشه تعاملی پژوهش",
    researchMapSub: "برای ردیابی مسیرهای تحقیقاتی دکتر مرتضی امینی در حوزه‌های مهندسی، روان‌شناسی و زیست‌شناسی محاسباتی، بر روی گره‌های تعاملی زیر کلیک کنید.",
    cvHeading: "رزومه علمی رسمی (CV)",

    contactMeHeading: "تماس با من",
    contactChannels: "راه‌های ارتباط مستقیم",
    researchConsults: "مشاوره‌های پژوهشی و دانشگاهی",
    contactParagraph: "آیا تمایل به برگزاری همکاری تحقیقاتی، راهنمایی پایان‌نامه‌های دکتری، پروژه‌های پردازش سیگنال مغزی و یا دعوت از دکتر امینی برای سخنرانی دارید؟ پیام خود را ارسال نمائید.",
    labLocationLabel: "محل پژوهشکده و دفتر کار:",
    labLocationVal: "دفتر اعضای هیئت علمی، پژوهشکده علوم شناختی",
    primaryCorrespondence: "رایانامه ارتباطی اصلی:",
    saySomething: "ارسال پیام جدید",
    fullNameLabel: "نام و نام خانوادگی شما *",
    fullNamePlaceholder: "مثلاً: پروفسور مریم حسینی",
    emailLabel: "رایانامه شما *",
    emailPlaceholder: "name@domain.edu",
    subjectLabel: "موضوع پیام",
    subjectResearch: "همکاری پژوهشی علمی",
    subjectPostgrad: "راهنمایی پایان‌نامه و پذیرش دانشجو",
    subjectSpeaking: "دعوت برای سخنرانی یا کارگاه",
    subjectGeneral: "مکاتبات عمومی",
    institutionLabel: "موسسه یا دانشگاه معرف شما",
    institutionPlaceholder: "مثلاً: دانشگاه تهران / پژوهشکده علوم شناختی",
    messageLabel: "متن پیام شما *",
    messagePlaceholder: "جزئیات مکاتبه و زمینه‌های پژوهشی مد نظر خود را به وضوح مرقوم فرمائید...",
    synapticFilterTitle: "فیلتر امنیتی سیناپسی شناختی",
    synapticParagraph: "برای تایید فرآیند ارسال پیام، بر روی گره فعال و در حال تپش طلایی‌رنگ کلیک کنید:",
    synapticDormant: "غیرفعال",
    synapticActive: "فعال‌شده",
    synapticFiring: "تحریک‌شده",
    sendMessageBtn: "ارسال نهایی پیام",
    demoLabLabel: "پایگاه دمو",
    sandboxInboxTitle: "آرشیو پیام‌های لوکال (صندوق شبیه‌سازی)",
    sandboxInboxViewBtn: "بررسی صندوق ورودی پیام‌ها",
    sandboxInboxLockBtn: "قفل کردن نمای صندوق",
    sandboxInboxParagraph: "بخش زیر نمای فیدبک پایگاه‌داده از پیام‌های ارسال شده را نمایش می‌دهد (این اطلاعات صرفاً در مرورگر شما ذخیره می‌شود). با فرم بالا آن را تست کنید!",
    sandboxInboxEmpty: "صندوق دریافت شبیه‌ساز در حال حاضر خالی است. فرم فوق را تست کنید!",

    blogsHeading: "آخرین وبلاگ‌ها و نوشته‌های علمی",
    blogsSub: "مقالات، بینش‌های فلسفی شناختی و یادداشت‌های پژوهشی دکتر امینی در نقطه‌ی تلاقی هوش مصنوعی، یادگیری ماشین و علوم اعصاب محاسباتی.",
    blogsDraft: "پیش‌نویس",
    blogsPublished: "منتشر شده",
    readNotebook: "مطالعه نوشته علمی",
    newPost: "پست جدید",
    queryingFacultyDB: "در حال واکشی اطلاعات از پایگاه هیئت علمی...",
    dbQueryError: "خطا در اتصال به پایگاه اطلاعاتی",
    retryConnBtn: "تلاش مجدد برای برقراری ارتباط",
    noBlogsMsg: "هیچ نوشته پویایی یافت نشد.",
    composeInitialBlogBtn: "نوشتن اولین مطلب وبلاگ",
    adminUsernameLabel: "نام کاربری مدیر",
    adminPasswordLabel: "رمز عبور مدیر",
    adminUsernamePlaceholder: "شناسه کاربری خود را وارد کنید...",
    adminPasswordPlaceholder: "رمز عبور مکتوم سیستم...",
    adminLoginError: "لطفاً شناسه کاربری و رمز عبور معتبر مدیریت را وارد نمایید.",

    // App.tsx translations
    educationHeading: "تحصیلات علمی و فلوشیپ‌ها",
    skillsSectionTitle: "پورتفوی مهارت‌های تخصصی و فنی",
    servicesHeading: "حوزه‌های علمی و پژوهشی",
    curriculumSeminarsTitle: "سمینارها و دروس پیشرفته تحصیلات تکمیلی",
    portfolioTitle: "کارنامه پژوهشی و آثار علمی",
    viewCVBtn: "رزومه رسمی علمی و دانشگاهی (CV)",
    contactHeading: "تماس و ارتباط مستقیم",
    contactSectionTitle: "مکاتبه و ارسال پیام مستقیم"
  }
};

export const PERS_RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    title: "مدل‌سازی شناختی",
    description: "توسعه ساختارهای محاسباتی و ریاضی پویا جهت شبیه‌سازی فرآیندهای شناختی و روان‌شناختی انسان با تکیه بر تصمیم‌گیری زمان‌دار.",
    tag: "علوم شناختی",
    iconName: "Brain"
  },
  {
    title: "علوم اعصاب محاسباتی",
    description: "به‌کارگیری سیستم‌های الکترونیکی و فرمالیسم کمی برای بازسازی پویایی‌های شبکه‌های متراکم و اتصالات عملکردی قشر مغز.",
    tag: "علوم اعصاب",
    iconName: "Activity"
  },
  {
    title: "تشخیص آلزایمر و پارکینسون",
    description: "تلفیق نوآورانه سیگنال شبکه‌های توان باند فرکانسی EEG و تصاویر ساختاری fMRI برای تشخیص اثربخش در مراحل پیش‌نشانه چرخه‌های تخریب عصبی.",
    tag: "هوش سنجی پزشکی",
    iconName: "ShieldAlert"
  },
  {
    title: "یادگیری ماشین و شبکه‌های عصبی",
    description: "طراحی بردارهای پیشرفته متمایزساز، همجوشی اطلاعات و الگوریتم‌های مرتبه بالا در شبکه‌های کانوولوشنال غیرخطی سیگنال‌های فیزیولوژیک.",
    tag: "هوش مصنوعی",
    iconName: "Cpu"
  },
  {
    title: "تعامل انسان و ماشین (HCI)",
    description: "ارزیابی و تحلیل ابزارهای هوشمند یارانه مغزی، ثبت تلمتری دست‌خط و رفتار فیزیکی مچ جهت خلق سامانه‌های تطبیقی دیجیتال.",
    tag: "تعامل انسان و کامپیوتر",
    iconName: "UserCheck"
  },
  {
    title: "اقتصاد رفتاری-عصبی",
    description: "تحلیل الگوهای بهینه‌ساز ذهن در گزینش‌های اقتصادی، پویایی‌های اجتماعی و بازخورد محرک‌های پاداش نوروشناختی.",
    tag: "روان‌شناسی تصمیم‌گیری",
    iconName: "Coins"
  }
];

export const PERS_EDUCATION_DATA: Education[] = [
  {
    degree: "دکتری تخصصی (Ph.D.)",
    major: "علوم شناختی – گرایش مدل‌سازی شناختی",
    institution: "دانشگاه شهید بهشتی",
    year: "فارغ‌التحصیل",
    thesisTitle: "تشخیص زودهنگام بیماری آلزایمر از طریق تحلیل تغییرات ساختاری-شناختی مغز",
    details: "پژوهش متمرکز بر تحلیل ساختاری و نگاشت فیزیکی مغز با به کارگیری داده‌های ساختاری تصویربرداری فMRI و توسعه مدل‌های یادگیری چندوظیفه‌ای."
  },
  {
    degree: "پژوهشگر فوق دکتری (فلوشیپ ۲)",
    major: "علوم اعصاب محاسباتی",
    institution: "دانشگاه شهید بهشتی",
    year: "اتمام یافته",
    thesisTitle: "پیش‌بینی زودهنگام بیماری آلزایمر با استفاده از سیستم پردازش هوشمند ابزاربند مغزی",
    details: "طراحی و توسعه الگوریتم‌های هوشمند برخط و فیلترهای موجک سیگنال به منظور مدل‌سازی و پایش مراحل تخریب پیش‌بالینی اعصاب."
  },
  {
    degree: "پژوهشگر فوق دکتری (فلوشیپ ۱)",
    major: "هوش مصنوعی و محاسبات سیستم",
    institution: "پژوهشکده علوم شناختی (ICSS)",
    year: "اتمام یافته",
    thesisTitle: "تشخیص زودهنگام بیماری پارکینسون با استفاده از تکنیک جدید همجوشی داده‌های بیومتریک چندوجهی",
    details: "برنامه‌نویسی و استقرار ابزارهای هوش مصنوعی چندبعدی با تلفیق مشخصه‌های خطی دست‌خط و تصویربرداری آناتومیکال عصبی متقاضیان پارکینسونی."
  },
  {
    degree: "کارشناسی ارشد (مدرک دوم)",
    major: "روان‌شناسی عمومی",
    institution: "دانشگاه تهران",
    year: "فارغ‌التحصیل",
    thesisTitle: "بررسی اثر حاد کاهش وزن بر کارکردهای اجرایی شناختی، ساختار خلق و رفتار پیوندهای اجتماعی",
    details: "تحلیل بالینی الگوهای رفتار، تغییرات هورمونی پویای شناختی و واکنش‌پذیری سیستم عاطفی-شناختی در پاسخ به فشارهای فیزیکی شدید."
  },
  {
    degree: "کارشناسی و کارشناسی ارشد (مدرک اول)",
    major: "مهندسی برق - گرایش مدار الکترونیک",
    institution: "دانشگاه تربیت مدرس (کارشناسی ارشد)",
    year: "فارغ‌التحصیل",
    thesisTitle: "پایش اتوماتیک اضطراب از الگوهای کشش نوشتار با تلفیق فیدبک الکترومکانیکی و شناسایی رایانه‌ای الگوها",
    details: "طراحی بردهای صنعتی پایش سیگنال نوسانی، فیلترینگ نویز و شناسایی بردارهای حاد اضطراب از طریق خوانش‌های دست‌نویس دیجیتال."
  }
];

export const PERS_TEACHING_COURSES: Course[] = [
  {
    title: "روش‌های ارزیابی و سنجش در علوم شناختی",
    description: "مطالعه بنیادی پیرامون سایکوفیزیک تجربی، روش‌شناسی ابزارهای دیجیتال، طراحی ابزارهای نوین ارزیابی ذهنی و شاخص‌های آماری سنجش خط شناختی.",
    level: "Core",
    topics: ["سایکوفیزیک", "تشخیص سیگنال نظری", "تست‌های سنجش شناختی", "شاخص‌های روان‌سنجی"]
  },
  {
    title: "شبکه‌های عصبی مصنوعی (ANN)",
    description: "تحلیل ریاضی عمیق سازوکارهای بیولوژیک شبکه‌ها، ساختار لایه‌های پنهان، گرادیان برگشتی، و رویکرد تکامل شبکه‌های بزرگ کانوولوشنال.",
    level: "Core",
    topics: ["انتشار خطا به عقب", "گرادیان نزولی", "مدل‌های حافظه هاپفیلد", "یادگیری هبین پسین"]
  },
  {
    title: "یادگیری ماشین (Machine Learning)",
    description: "آشنایی با مبانی رگرسیون تجمعی، ماشین‌های طبقه‌بند بردار پشتیبان (SVM)، خوشه‌بندی‌های نوین داده و بهینه‌سازی بردارهای پنهان خطی.",
    level: "Advanced",
    topics: ["بردار نوری پشتیبان", "خوشه‌بندی‌های بیولوژیک", "جنگل‌های تصادفی بهینه‌ساز"]
  },
  {
    title: "مدل‌سازی شناختی محاسباتی",
    description: "طراحی عوامل نیمه‌هوشمند با استفاده از الگوهای شناختی برجسته و اصول شبیه‌ساز الگوهای تصمیم‌گیری بهنگام ذهن.",
    level: "Advanced",
    topics: ["ساختار ACT-R بهساز", "مدل‌های انتشار ذهن", "عوامل پویای هوشمند"]
  },
  {
    title: "روش‌های تحقیق در مدل‌های پویای غیراستاتیک مغزی",
    description: "پایش و ردیابی جفت‌شدگی‌های پیوسته مغز با آنالیز آشوب، انتروپی سری‌های زمانی، و رویکردهای غیرخطی علوم اعصاب سیستمی.",
    level: "Interdisciplinary",
    topics: ["جاذبه‌های آشوبناک", "دینامیک همگرایی", "سری‌های زمانی نوسانی"]
  },
  {
    title: "پردازش سیگنال‌های زیستی و فیزیک ادراک شناختی",
    description: "کوپل کردن آستانه‌های فیزیکی حسی با فیلترینگ‌های پیشرفته فوریه سیگنال‌های مغزی و تبدیل‌های موجک.",
    level: "Interdisciplinary",
    topics: ["آنالیز فوریه فرکانس", "موجک‌ها", "پاورباندهای سیگنالی EEG"]
  }
];

export const PERS_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "۱۴۰۲ - اکنون",
    title: "استادیار و عضو هیئت علمی رسمی پژوهشکده",
    subtitle: "پژوهشکده علوم شناختی (ICSS)",
    type: "academic",
    description: "سرپرستی آزمایشگاه پردازش محاسباتی مغز، راهنمایی و مشاوره رساله‌های تحصیلات تکمیلی، ارزیابی سیستم‌های بیومتریک پزشکی.",
    achievements: [
      "برنامه‌ریزی و ارائه دروس پیشرفته برای بارگذاری سیگنال‌های نوسانی مغز.",
      "آموزش و مشاوره دانشگاهی به بیش از ۱۵۰ دانشجوی نخبه تحصیلات تکمیلی.",
      "توسعه همکارهای بین‌المللی ارزیابی نشانه‌های نوظهور زوال عقل."
    ]
  },
  {
    year: "۱۴۰۰ - ۱۴۰۱",
    title: "مقطع پژوهشی فوق دکتری علوم اعصاب محاسباتی",
    subtitle: "دانشگاه شهید بهشتی",
    type: "fellowship",
    description: "توسعه مدل‌های ریاضی ارزیابی یکپارچگی اتصالات مغزی در تصاویر فMRI به منظور تحلیل ریزساختارهای شبکه خاکستری.",
    achievements: [
      "پایه گذاری الگوریتم‌های کانوولوشنال یادگیری مستقل جهت تشخیص آلزایمر زودهنگام.",
      "انتشار ۳ مقاله علمی رده ممتاز ترازهای بین‌المللی در حوزه پردازش سیگنال‌های مغزی.",
      "خلق ماتریس استخراج امواج بهینه برای شناسایی دقیق چرخه‌های تخریب زیستی."
    ]
  },
  {
    year: "۱۳۹۹ - ۱۴۰۰",
    title: "مقطع پژوهشی پسادکتری هوش مصنوعی و محاسبات سیستم",
    subtitle: "پژوهشکده علوم شناختی (ICSS)",
    type: "fellowship",
    description: "طراحی واسط سیستمی همجوشی اطلاعات حسگر حرکتی دست‌خط، چرخه‌های خواب، سیگنال‌ها و بیومتریک صوتی در پارکینسون زودهنگام.",
    achievements: [
      "ثبت الگوریتم متمایزساز چندسطحی خوانش فیزلوژیک دست‌نویس با همکاری شرکت‌های دانش بنیان.",
      "همکاری مستمر با کادر تشخیصی روان‌شناختی جهت استانداردسازی تست‌های اضطراب دیجیتال.",
      "دریافت تقدیرنامه علمی ملی برای پیشبرد واسط‌های فیزیکی مغز و ذهن."
    ]
  },
  {
    year: "۱۳۹۵ - ۱۳۹۹",
    title: "دوره تخصصی تحقیق و دفاع رساله دکتری",
    subtitle: "دانشگاه شهید بهشتی",
    type: "research",
    description: "بررسی سیستمی اختلالات آلزایمر از آنالیز فرکتالی تصاویر MRI و سیگنال‌های چندکاناله الکتروانسفالوگرافی (EEG).",
    achievements: [
      "شبیه‌سازی فرکتال ساختار کورتکس به صورت سه‌بعدی.",
      "ترکیب پکسل‌های تصاویر چندبرشی با شبکه‌های کانوولوشنال عمیق.",
      "کسب نمره ممتاز و دفاع درخشان در حضور داوران علمی ملی و بین‌المللی."
    ]
  }
];
