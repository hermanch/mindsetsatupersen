import React from 'react';
import { Video, PremiumCourse } from '../types';
import { X, Youtube, ExternalLink, Play, Clock, Eye, CheckCircle2 } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL } from '../data/mockData';

interface VideoModalProps {
  video: Video | PremiumCourse | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  const isCourse = 'lessonsCount' in video;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-800 relative animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Player Container */}
        <div className="relative aspect-video bg-black overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-[#FF2B2B] text-white rounded-full flex items-center justify-center shadow-2xl mb-4 animate-pulse">
              <Play className="w-7 h-7 fill-white ml-1" />
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white max-w-lg leading-snug">
              {video.title}
            </h3>

            <p className="text-xs text-slate-300 mt-2 max-w-md">
              {isCourse ? 'Video Course Eksklusif Member Satu Persen' : 'Edukasi Keuangan YouTube @mindsetsatupersen05'}
            </p>
          </div>
        </div>

        {/* Modal Info Footer */}
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span className="bg-red-950 text-red-300 px-2.5 py-1 rounded-md font-bold uppercase border border-red-800">
              {video.category}
            </span>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {video.duration}
              </span>
              {'views' in video && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {video.views}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {video.description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Youtube className="w-4 h-4 fill-white" />
              Buka Channel YouTube
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition-all"
            >
              Tutup Preview
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
