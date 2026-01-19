import React, { useState } from 'react';
import { Promotion, PromotionStatus } from '../types';
import { COMMON_STYLES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from 'recharts';

interface PromotionDetailSidebarProps {
  promo: Promotion;
  onClose: () => void;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '...';
  const parts = dateStr.split('-');
  if (parts.length === 3) return `${parts[2]}.${parts[1]}.${parts[0]}`;
  return dateStr;
};

const PromotionDetailSidebar: React.FC<PromotionDetailSidebarProps> = ({ promo, onClose }) => {
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'history'>('analytics');

  const miniChartData = [
    { name: 'Пн', val: 2, noPromo: 1 }, { name: 'Вт', val: 5, noPromo: 2 },
    { name: 'Ср', val: 3, noPromo: 2 }, { name: 'Чт', val: 8, noPromo: 3 },
    { name: 'Пт', val: 4, noPromo: 1 },
  ];

  const getConditionText = () => {
    const symbol = promo.adjustmentMode === 'Понижение' ? '↓' : '↑';
    const value = promo.adjustmentValue;
    const unit = promo.type.includes('%') || (promo.adjustmentType && promo.adjustmentType.includes('%')) ? '%' : ' ₽';
    return `${symbol} ${value}${unit} к стоимости помещения`;
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`${COMMON_STYLES.SIDEBAR} w-[620px] left-0 right-auto animate-slide-in-left shadow-2xl flex flex-col z-50`}>
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-[#FBFDFF] shrink-0">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-black text-[#6699CC] uppercase tracking-[0.2em]">Управление акцией</span>
             <h2 className="text-2xl font-black leading-tight truncate max-w-[440px] text-slate-900">{promo.name}</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex bg-slate-50 p-1 mx-8 mt-6 rounded-xl shrink-0">
          <button onClick={() => setActiveSubTab('analytics')} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'analytics' ? 'bg-white text-[#6699CC] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Аналитика</button>
          <button onClick={() => setActiveSubTab('history')} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'history' ? 'bg-white text-[#6699CC] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>История изменений</button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10 animate-fade-in" key={activeSubTab}>
          {activeSubTab === 'analytics' ? (
            <>
              <div className="grid grid-cols-2 gap-5">
                <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm border-l-4 border-l-[#6699CC]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Конверсия (Акция)</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-900">18.4%</span>
                    <span className="text-xs text-emerald-500 font-bold pb-1">↑ 4.2%</span>
                  </div>
                </div>
                <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Конверсия (без акций)</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-400">14.2%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Динамика спроса (7 дн.)</h3>
                </div>
                <div className="h-56 w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={miniChartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#CBD5E1'}} />
                          <YAxis hide />
                          <Tooltip cursor={{fill: '#F8FAFC'}} />
                          <Legend iconType="circle" verticalAlign="top" align="right" wrapperStyle={{fontSize: '10px', fontWeight: 'bold', paddingBottom: '10px'}} />
                          <Bar dataKey="val" name="По акции" fill="#6699CC" radius={[4, 4, 0, 0]} barSize={20} />
                          <Bar dataKey="noPromo" name="Без акции" fill="#D1D5DB" radius={[4, 4, 0, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4 pb-10">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Характеристики и условия</h3>
                <div className="divide-y divide-slate-50 border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm pointer-events-none">
                    <div className="flex justify-between p-4 px-6">
                      <span className="text-[13px] font-bold text-slate-400">Жилой комплекс</span>
                      <span className="text-[13px] font-extrabold text-slate-900">{promo.project}</span>
                    </div>
                    <div className="flex justify-between p-4 px-6">
                      <span className="text-[13px] font-bold text-slate-400">Условия</span>
                      <span className="text-[13px] font-black text-orange-500">{getConditionText()}</span>
                    </div>
                    <div className="flex justify-between p-4 px-6">
                      <span className="text-[13px] font-bold text-slate-400">Суммируется с другими акциями</span>
                      <span className="text-[13px] font-extrabold text-slate-900">{promo.isStackable ? 'Да' : 'Нет'}</span>
                    </div>
                    <div className="flex justify-between p-4 px-6">
                      <span className="text-[13px] font-bold text-slate-400">Количество лотов</span>
                      <span className="text-[13px] font-extrabold text-slate-900">{promo.unitIds.length}</span>
                    </div>
                    <div className="flex justify-between p-4 px-6">
                      <span className="text-[13px] font-bold text-slate-400">Период</span>
                      <span className="text-[13px] font-extrabold text-slate-600">{formatDate(promo.startDate)} — {promo.endDate ? formatDate(promo.endDate) : 'Без лимита'}</span>
                    </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-8 pb-10 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-black">История акции #{promo.id.replace('p-', '')}</h3>
                <p className="text-sm text-slate-400 mt-1">Время по Москве</p>
              </div>

              <div className="space-y-10">
                {promo.auditLog?.map((log) => {
                  const dateObj = new Date(log.timestamp);
                  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
                  const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()} (${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')}:${dateObj.getSeconds().toString().padStart(2, '0')})`;
                  
                  return (
                    <div key={log.id} className="space-y-1.5">
                      <p className="text-[13px] text-slate-300 font-medium">{formattedDate}</p>
                      <div className="space-y-0.5">
                         <p className="text-[15px] text-black font-bold">
                           {log.action}: <span className="font-extrabold">{log.changes}</span>
                         </p>
                         <p className="text-[13px] text-slate-400">{log.source || log.user}</p>
                         <p className="text-[13px] text-slate-400">{log.processType || 'Изменение вручную'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PromotionDetailSidebar;
