import React, { useState } from 'react';
import { FREE_VIDEOS, YOUTUBE_CHANNEL_URL } from '../data/mockData';
import { Video } from '../types';
import { Play, Eye, Clock, Youtube, ExternalLink, Search, Sparkles, Filter } from 'lucide-react';

interface TopicsSectionProps {
  onSelectVideo: (video: Video) => void;
}

export const TopicsSection: React.FC<TopicsSectionProps> = ({ onSelectVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', 'Atur Gaji', 'Tips Menabung', 'Bebas Hutang', 'Investasi Pemula', 'Mindset Finansial'];

  const filteredVideos = FREE_VIDEOS.filter((video) => {
    const matchesCategory = selectedCategory === 'Semua' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="topik" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100/80 text-[#FF2B2B] font-bold text-xs uppercase tracking-wider mb-3">
              <Youtube className="w-4 h-4 fill-[#FF2B2B]" />
              Video Edukasi Gratis
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Topik & Video Pilihan YouTube
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-2xl">
              Tonton langsung penjelasan ringkas tanpa basa-basi tentang cara kelola gaji, melunasi hutang, dan investasi.
            </p>
          </div>

          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#FF2B2B] hover:bg-[#D91D1D] rounded-xl shadow-md transition-all shrink-0 self-start md:self-auto"
          >
            <Youtube className="w-4 h-4 fill-white" />
            Lihat Semua Video di YouTube
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF2B2B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari topik video..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#FF2B2B] focus:border-transparent transition-all"
            />
          </div>

        </div>

        {/* Video Cards Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                    {video.category}
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-semibold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-300" />
                    {video.duration}
                  </div>

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => onSelectVideo(video)}
                    className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label={`Putar video ${video.title}`}
                  >
                    <div className="w-12 h-12 bg-[#FF2B2B] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </button>
                </div>

                {/* Video Info Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-[#FF2B2B] transition-colors line-clamp-2 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {video.views}
                    </span>

                    <button
                      onClick={() => onSelectVideo(video)}
                      className="text-[#FF2B2B] font-bold hover:underline inline-flex items-center gap-1 text-xs cursor-pointer"
                    >
                      Tonton Sekarang
                      <Play className="w-3 h-3 fill-[#FF2B2B]" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-lg">Topik Tidak Ditemukan</h3>
            <p className="text-slate-500 text-xs mt-1">Coba kata kunci lain atau pilih kategori "Semua".</p>
          </div>
        )}

      </div>
    </section>
  );
};
