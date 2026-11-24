/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Folder, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PROJECT_SOURCE_FILES } from '../../data/projectFiles';

interface SourceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourceCodeModal: React.FC<SourceCodeModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>('src/App.tsx');
  const [copiedFile, setCopiedFile] = useState<boolean>(false);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  if (!isOpen) return null;

  const files = Object.keys(PROJECT_SOURCE_FILES).sort();
  const currentContent = PROJECT_SOURCE_FILES[selectedFile] || '// 파일을 찾을 수 없습니다.';

  const handleCopyCurrentFile = async () => {
    try {
      await navigator.clipboard.writeText(currentContent);
      setCopiedFile(true);
      setTimeout(() => setCopiedFile(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = currentContent;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedFile(true);
      setTimeout(() => setCopiedFile(false), 2000);
    }
  };

  const handleCopyAllFilesJson = async () => {
    try {
      const fullJson = JSON.stringify(PROJECT_SOURCE_FILES, null, 2);
      await navigator.clipboard.writeText(fullJson);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadZipBlob = () => {
    try {
      const a = document.createElement('a');
      a.href = '/thermolab-source-code.zip';
      a.download = 'thermolab-source-code.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-100 text-sky-700 rounded-lg">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                ThermoLab 전체 소스코드 열람 & 복사
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-semibold">
                  {files.length}개 파일
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                다운로드가 차단되는 환경에서도 필요한 모든 코드를 파일별 또는 전체 JSON으로 직접 복사할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZipBlob}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ZIP 다운로드</span>
            </button>
            <button
              onClick={handleCopyAllFilesJson}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors shadow-2xs"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Layers className="w-3.5 h-3.5" />}
              <span>{copiedAll ? '전체 복사 완료!' : '전체 파일 JSON 복사'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left File Navigation List */}
          <div className="w-64 border-r border-slate-200 bg-slate-50/70 p-3 overflow-y-auto space-y-1 text-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1">
              <Folder className="w-3.5 h-3.5" />
              <span>프로젝트 파일 목록</span>
            </div>

            {files.map((file) => {
              const isSelected = file === selectedFile;
              const fileName = file.split('/').pop() || file;
              const dirName = file.includes('/') ? file.substring(0, file.lastIndexOf('/')) : '';

              return (
                <button
                  key={file}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex flex-col gap-0.5 ${
                    isSelected
                      ? 'bg-sky-600 text-white font-medium shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  <span className="font-mono truncate">{fileName}</span>
                  {dirName && (
                    <span className={`text-[10px] truncate ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                      {dirName}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Code Display Area */}
          <div className="flex-1 flex flex-col bg-slate-900 text-slate-100 overflow-hidden">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 font-mono text-sky-300">
                <FileCode className="w-4 h-4 text-sky-400" />
                <span>{selectedFile}</span>
                <span className="text-slate-500 font-sans">
                  ({(currentContent.length / 1024).toFixed(1)} KB, {currentContent.split('\n').length} lines)
                </span>
              </div>

              <button
                onClick={handleCopyCurrentFile}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white transition-all shadow-xs"
              >
                {copiedFile ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFile ? '클립보드 복사 완료!' : '이 파일 코드 전체 복사'}</span>
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-200 selection:bg-sky-700 selection:text-white">
              <pre className="whitespace-pre">{currentContent}</pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
