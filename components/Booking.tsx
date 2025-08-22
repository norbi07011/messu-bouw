import React, { useState, useMemo, useRef } from 'react';
import { WHATSAPP_PHONE } from '../constants';
import { ChevronLeftIcon, ChevronRightIcon, WhatsAppIcon, PaperClipIcon, XIcon, InformationCircleIcon } from './icons/CoreIcons';
import { useLanguage } from '../contexts/LanguageContext';

const Calendar: React.FC<{ selectedDate: Date | null; onDateSelect: (date: Date) => void }> = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { language, t } = useLanguage();
  
  const locale = language === 'pl' ? 'pl-PL' : 'nl-NL';

  const firstDayOfMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), [currentDate]);
  const daysInMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(), [currentDate]);

  const startingDay = (firstDayOfMonth.getDay() + 6) % 7; // Monday is 0

  const days = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);
  const blanks = useMemo(() => Array.from({ length: startingDay }, (_, i) => i), [startingDay]);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const isSelected = (day: number) => {
      if (!selectedDate) return false;
      return selectedDate.getFullYear() === currentDate.getFullYear() &&
             selectedDate.getMonth() === currentDate.getMonth() &&
             selectedDate.getDate() === day;
  };
  
  const dayNames = language === 'pl' 
    ? ['Po', 'Wt', 'Śr', 'Cz', 'Pi', 'So', 'Ni']
    : ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];


  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors"><ChevronLeftIcon className="h-6 w-6 text-gray-600" /></button>
        <h3 className="text-lg font-bold text-[#4A3F35] capitalize">{currentDate.toLocaleString(locale, { month: 'long', year: 'numeric' })}</h3>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors"><ChevronRightIcon className="h-6 w-6 text-gray-600" /></button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500 mb-2">
        {dayNames.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {blanks.map(blank => <div key={`blank-${blank}`}></div>)}
        {days.map(day => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isPast = date < today;
          return (
            <button
              key={day}
              disabled={isPast}
              onClick={() => onDateSelect(date)}
              className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors ${
                isPast ? 'text-gray-300 cursor-not-allowed' :
                isSelected(day) ? 'bg-[#4A3F35] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  );
};

const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useLanguage();
  
  const locale = language === 'pl' ? 'pl-PL' : 'nl-NL';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };


  const handleWhatsAppRedirect = () => {
    if (!selectedDate || !city) return;
    const formattedDate = selectedDate.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const messageParts = [
      `${t('whatsapp_greeting')}`,
      `\n${t('whatsapp_date')}: ${formattedDate}`,
      `${t('whatsapp_city')}: ${city}`
    ];

    if (description) {
      messageParts.push(`\n${t('whatsapp_description')}:\n${description}`);
    }
    
    const message = messageParts.join('\n');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="afspraak" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F35]">{t('booking_title')}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('booking_subtitle')}
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            <div className="space-y-6 mt-4 md:mt-0">
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">{t('booking_form_city_label')}</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={t('booking_form_city_placeholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3F35] focus:border-[#4A3F35] transition"
                    />
                </div>
                
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">{t('booking_form_description_label')}</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t('booking_form_description_placeholder')}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3F35] focus:border-[#4A3F35] transition"
                    ></textarea>
                </div>

                 <div>
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">{t('booking_form_photos_label')}</label>
                    <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <PaperClipIcon className="h-5 w-5" />
                        <span>{t('booking_form_photos_button')}</span>
                    </button>
                </div>

                {files.length > 0 && (
                    <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
                        <p className="text-sm font-medium text-gray-800">{t('booking_form_selected_photos')}:</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {files.map((file, index) => (
                                <div key={index} className="relative group">
                                    <img 
                                        src={URL.createObjectURL(file)} 
                                        alt={`Preview ${index + 1}`} 
                                        className="w-full h-24 object-cover rounded-md"
                                        onLoad={e => URL.revokeObjectURL(e.currentTarget.src)}
                                    />
                                    <button
                                        onClick={() => handleRemoveFile(index)}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 leading-none shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label={t('booking_form_remove_image_label')}
                                    >
                                        <XIcon className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                         <div className="flex items-start gap-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mt-2" role="alert">
                            <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />
                            <div>
                                <p className="font-bold">{t('booking_form_photos_warning_title')}</p>
                                <p className="text-sm">{t('booking_form_photos_warning_text')}</p>
                            </div>
                        </div>
                    </div>
                )}

                {selectedDate && <p className="text-gray-700 text-center">{t('booking_form_selected_date')}: <span className="font-bold text-[#4A3F35]">{selectedDate.toLocaleDateString(locale)}</span></p>}
                
                <button
                    onClick={handleWhatsAppRedirect}
                    disabled={!selectedDate || !city}
                    className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    <WhatsAppIcon className="h-6 w-6" />
                    {t('booking_form_submit_button')}
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;