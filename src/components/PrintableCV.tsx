import React from 'react';
import { FileText, Printer, Award, GraduationCap, Briefcase } from 'lucide-react';
import { DR_AMIN_BIO, EDUCATION_DATA, PUBLICATIONS, TEACHING_COURSES, RESEARCH_INTERESTS } from '../data';
import { translations, PERS_RESEARCH_INTERESTS, PERS_EDUCATION_DATA, PERS_TEACHING_COURSES } from '../localization';

interface PrintableCVProps {
  isPersian?: boolean;
  isDarkMode?: boolean;
}

export default function PrintableCV({ isPersian = false, isDarkMode = false }: PrintableCVProps) {
  const t = translations[isPersian ? 'fa' : 'en'];
  const education = isPersian ? PERS_EDUCATION_DATA : EDUCATION_DATA;
  const interests = isPersian ? PERS_RESEARCH_INTERESTS : RESEARCH_INTERESTS;
  const courses = isPersian ? PERS_TEACHING_COURSES : TEACHING_COURSES;

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div id="cv-printable-section" className="space-y-6" dir={isPersian ? "rtl" : "ltr"}>
      
      {/* On-screen description and trigger block */}
      <div id="cv-on-screen-banner" className={`${isDarkMode ? 'bg-slate-950 border-slate-900 text-slate-100' : 'bg-white border-slate-200 text-slate-800'} border rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden text-start`}>
        <div className="flex gap-4 items-start text-center sm:text-start flex-col sm:flex-row">
          <div className="p-3 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl shrink-0 mx-auto sm:mx-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-amber-500 font-mono font-medium block">
              {isPersian ? 'ماژول استخراج اطلاعات آکادمیک' : 'Academic Export Module'}
            </span>
            <h3 className={`text-base sm:text-lg font-bold font-serif ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} mt-1 leading-tight`}>
              {isPersian ? 'رزومه رسمی و تحصیلی دکتر امینی' : "Dr. Amini's Professional CV"}
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-1.5 leading-relaxed font-sans max-w-lg`}>
              {isPersian 
                ? 'تولید خودکار کارنامه علمی دو ستونه. با کلیک بر روی این گزینه، پنجره پرینتر سیستم فعال گردیده و می‌توانید آن را به صورت فایل برداری باکیفیت بالا ذخیره نمایید.'
                : 'Generate a formal double-column academic resume. Triggering the download instantly opens your system printer panel allowing saving as a pure-vector PDF document.'}
            </p>
          </div>
        </div>

        {/* Print Trigger Button */}
        <button
          id="trigger-print-cv-btn"
          onClick={triggerPrint}
          className="w-full sm:w-auto inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 hover:text-slate-950 font-mono font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 shrink-0 justify-center cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          {isPersian ? "خروجی چاپی و دانلود فایل رزومه" : "Export & Print CV PDF"}
        </button>
      </div>

      {/* Actual CV layout (fully displayable on-screen, and styled beautifully to print perfectly) */}
      <div 
        id="academic-cv-sheet" 
        className={`${isDarkMode ? 'bg-zinc-100' : 'bg-zinc-50'} print:bg-white text-zinc-900 border border-zinc-200 print:border-none p-6 sm:p-10 rounded-2xl shadow-xl max-w-4xl mx-auto space-y-8 font-serif leading-relaxed text-start`}
      >
        
        {/* Print-only help notice */}
        <div className={`hidden print:block ${isPersian ? 'text-left' : 'text-right'} text-[8px] font-mono text-zinc-400 mb-6 border-b border-zinc-100 pb-2`}>
          {isPersian ? 'رزومه رسمی دکتر مرتضی امینی مأخوذ از ' : 'Dr. Morteza Amini • Faculty Portfolio • exported via '} {window.location.host}
        </div>

        {/* CV main Header Grid */}
        <div className="border-b-2 border-zinc-850 pb-6 flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-zinc-950">
              {isPersian ? 'دکتر مرتضی امینی' : 'Dr. Morteza Amini'}
            </h1>
            <h2 className="text-xs font-mono tracking-widest text-amber-800 font-semibold uppercase">
              {isPersian ? 'استادیار پژوهشکده علوم شناختی و مدل‌ساز محاسباتی ذهن' : 'Assistant Professor of Cognitive Science & Computational Neuroscience'}
            </h2>
            <p className="text-xs text-zinc-600 font-sans font-medium mt-1">
              {isPersian ? 'عضو رسمی هیئت علمی پژوهشکده علوم شناختی (ICSS)' : 'Member of Faculty • Institute for Cognitive Science Studies (ICSS)'}
            </p>
          </div>

          <div className={`text-start ${isPersian ? 'md:text-left' : 'md:text-right'} text-xs font-sans text-zinc-500 space-y-1 md:self-stretch flex flex-col justify-between shrink-0 font-medium`}>
            <div>{isPersian ? 'رایانامه:' : 'Email:'} <span className="font-mono text-zinc-850 select-all font-semibold">amini_m@icss.ac.ir</span></div>
            <div>{isPersian ? 'تارنما:' : 'Web:'} <span className="font-mono text-zinc-850">{window.location.hostname}</span></div>
            <div>{isPersian ? 'آدرس پژوهشکده:' : 'Location:'} <span className="text-zinc-850 font-medium">{isPersian ? 'تهران، ایران' : 'Tehran, Iran'}</span></div>
          </div>
        </div>

        {/* Dual column body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Education & Interests */}
          <div className="space-y-6">
            
            {/* Section: Biography Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold border-b border-zinc-200 pb-1.5 focus:outline-none">
                {isPersian ? 'خلاصه سوابق مدیریتی و علمی' : 'Executive Profile'}
              </h3>
              <p className="text-xs text-zinc-700 leading-relaxed font-sans text-justify">
                {isPersian 
                  ? 'دکتر مرتضی امینی استادیار رسمی گروه مدل‌سازی شناختی پژوهشکده علوم شناختی با تخصص پیوسته تلفیق سخت‌افزارهای مهندسی دقیق الکترونیک و ابزارهای روان‌سنجی در طبقه‌بندهای هوشمند بیولوژی است.'
                  : `${DR_AMIN_BIO.summary} An interdisciplinary academic bridging electronics, cognitive math simulations, and psychophysics.`}
              </p>
            </div>

            {/* Section: Education Chronomap */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold border-b border-zinc-200 pb-1.5 focus:outline-none">
                {isPersian ? 'سوابق تحصیلی و درجات آکادمیک' : 'Higher Education'}
              </h3>
              
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between font-sans text-[10px] text-zinc-500 font-semibold gap-2">
                      <span>{edu.degree} &bull; {edu.institution}</span>
                      <span className="text-amber-800 shrink-0">{edu.year}</span>
                    </div>
                    <h4 className="font-bold text-zinc-900 leading-snug">{edu.major}</h4>
                    {edu.thesisTitle && (
                      <p className="text-[11px] text-zinc-600 italic leading-snug">
                        {isPersian ? 'موضوع پروژه:' : 'Thesis:'} &ldquo;{edu.thesisTitle}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Research Interests */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold border-b border-zinc-200 pb-1.5 focus:outline-none">
                {isPersian ? 'محورهای علمی تخصصی' : 'Specialized Interests'}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-sans text-zinc-700">
                {interests.map((interest, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 p-1 px-2 bg-zinc-200/50 rounded border border-zinc-200/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-800 shrink-0" />
                    <span className="font-medium truncate">{interest.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Publications & Highlights */}
          <div className="space-y-6">
            
            {/* Section: Publications */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold border-b border-zinc-200 pb-1.5 focus:outline-none">
                {isPersian ? 'مقالات و ژورنال‌های دانشگاهی ممتاز' : 'Academic Publications'}
              </h3>

              <div className="space-y-4">
                {PUBLICATIONS.slice(0, 5).map((pub) => (
                  <div key={pub.id} className="space-y-1 text-xs">
                    <div className="flex justify-between items-baseline font-sans text-[10px] text-zinc-500 font-semibold">
                      <span>{pub.journal} &bull; Vol. {pub.year}</span>
                    </div>
                    <dt className="font-bold text-zinc-900 leading-snug">
                      {pub.title}
                    </dt>
                    <p className="text-[10px] text-zinc-600 leading-normal">
                      {pub.authors}
                    </p>
                    <span className="text-[9px] font-mono text-zinc-400 leading-none block">
                      DOI: {pub.doi.split('https://doi.org/')[1] || pub.doi}
                    </span>
                  </div>
                ))}
                
                {PUBLICATIONS.length > 5 && (
                  <div className="text-[10px] text-zinc-400 font-semibold text-center italic font-sans print:hidden">
                    {isPersian 
                      ? `+ نمایش داده‌های تکمیلی بیشتر در پرتال اختصاصی برخط وبسایت هیئت علمی`
                      : `+ ${PUBLICATIONS.length - 5} additional papers showcased on live electronic portal.`}
                  </div>
                )}
              </div>
            </div>

            {/* Section: Teaching Modules */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold border-b border-zinc-200 pb-1.5 focus:outline-none">
                {isPersian ? 'دروس تخصصی دکتری و ارشد' : 'Lectures & Syllabi'}
              </h3>

              <div className="grid grid-cols-1 gap-2.5 font-sans">
                {courses.slice(0, 4).map((course, idx) => (
                  <div key={idx} className="p-2 border border-zinc-200 rounded text-xs">
                    <h5 className="font-bold text-zinc-800">{course.title}</h5>
                    <p className="text-[10px] text-zinc-500 mt-0.5 leading-normal truncate">{course.description}</p>
                    <div className="flex gap-1.5 mt-1">
                      {course.topics.slice(0, 2).map((top, tIdx) => (
                        <span key={tIdx} className="text-[8px] bg-zinc-200 text-zinc-700 px-1 rounded font-mono">
                          {top}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Footer citation block */}
        <div className="border-t border-zinc-200 pt-6 text-[10px] text-center text-zinc-400 font-sans leading-relaxed">
          {isPersian 
            ? 'صحت و اصالت کلیه مدارک، مدارج حوزوی، پسادکتری و آموزش عالی مهندسی، شناختی و روان‌شناسی فوق مورد تایید است.'
            : 'I certify that all records regarding electronic, psychology, cognitive science, and computational fellowships are fully accurate.'}
          <br />
          <strong>{isPersian ? 'دکتر مرتضی امینی • استادیار پژوهشکده علوم شناختی تهران' : 'Dr. Morteza Amini • Assistant Professor, ICSS Tehran'}</strong>
        </div>

      </div>

    </div>
  );
}
