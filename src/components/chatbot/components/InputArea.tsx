import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatbotTranslations } from '../types';
import { formatFileSize } from '../types';
import styles from '../styles/chatbot.module.scss';

// Icons
const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const PaperclipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const StopCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <rect x="9" y="9" width="6" height="6" />
  </svg>
);

const UploadCloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    <polyline points="16 16 12 12 8 16" />
  </svg>
);

const SquareIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClearFile: () => void;
  audioModeEnabled: boolean;
  onToggleAudioMode: () => void;
  translations: ChatbotTranslations;
  disabled?: boolean;
  isLoading?: boolean;
}

export function InputArea({
  value,
  onChange,
  onSend,
  onFileSelect,
  selectedFile,
  onClearFile,
  audioModeEnabled,
  onToggleAudioMode,
  translations,
  disabled = false,
  isLoading = false,
}: InputAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  // File preview for images
  useEffect(() => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  }, [selectedFile]);

  // Audio mode toggle
  useEffect(() => {
    if (audioModeEnabled && !isRecording) {
      setIsRecording(true);
      setAudioTime(0);
      timerRef.current = setInterval(() => {
        setAudioTime((prev) => prev + 1);
      }, 1000);
    } else if (!audioModeEnabled && isRecording) {
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Simulate transcription
      if (audioTime > 2) {
        onChange(value + (value ? ' ' : '') + '[Audio transcription would appear here]');
      }
      setAudioTime(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [audioModeEnabled]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
      e.target.value = '';
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const hasContent = value.trim() !== '' || selectedFile !== null;

  const getPlaceholder = () => {
    if (isRecording) return translations.recording;
    return translations.placeholder;
  };

  return (
    <div className={styles.inputContainer}>
      <div
        className={`${styles.inputWrapper} ${isRecording ? styles.isRecording : ''} ${isDragging ? styles.isDragging : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drag overlay */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              className={styles.dragOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UploadCloudIcon />
              <p>{translations.dragFiles}</p>
              <span>{translations.maxSize}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File preview */}
        <AnimatePresence>
          {selectedFile && !isRecording && (
            <motion.div
              className={styles.filePreview}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.fileItem}>
                {selectedFile.type.startsWith('image/') && filePreview ? (
                  <div className={styles.imagePreview}>
                    <img src={filePreview} alt={selectedFile.name} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearFile();
                      }}
                    >
                      <XIcon />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={styles.fileItemInfo}>
                      <span>{selectedFile.name}</span>
                      <small>{formatFileSize(selectedFile.size)}</small>
                    </div>
                    <button onClick={onClearFile} className={styles.removeFileBtn}>
                      <XIcon />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Textarea - hidden when recording */}
        <div className={`${styles.textareaContainer} ${isRecording ? styles.hidden : ''}`}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder()}
            disabled={disabled || isRecording}
            rows={1}
          />
        </div>

        {/* Recording UI */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.recordingUI}
            >
              <div className={styles.recordingContent}>
                <div className={styles.recordingIndicator}>
                  <motion.div
                    className={styles.recordingDot}
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className={styles.recordingText}>{translations.recording}</span>
                </div>

                {/* Frequency Animation */}
                <div className={styles.frequencyBars}>
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={styles.bar}
                      initial={{ height: 2 }}
                      animate={{
                        height: [2, 3 + Math.random() * 10, 3 + Math.random() * 5, 2],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>

                {/* Timer */}
                <div className={styles.recordingTimer}>{formatTime(audioTime)}</div>

                {/* Stop button */}
                <button
                  onClick={onToggleAudioMode}
                  className={styles.stopRecordingBtn}
                  title={translations.stopRecording}
                >
                  <StopCircleIcon />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action bar */}
        <div className={`${styles.actionBar} ${isRecording ? styles.hidden : ''}`}>
          {/* Left side actions */}
          <div className={styles.leftActions}>
            {/* Attach button */}
            <button className={styles.attachBtn} disabled={isRecording}>
              <PaperclipIcon />
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept="image/*,.pdf,.txt,audio/*"
              />
            </button>

            {/* Audio toggle button */}
            <motion.button
              type="button"
              onClick={onToggleAudioMode}
              className={`${styles.toggleBtn} ${styles.audio} ${audioModeEnabled ? styles.active : ''}`}
              layout
              transition={{ layout: { duration: 0.4 } }}
            >
              <div className={styles.iconContainer}>
                {audioModeEnabled ? (
                  <motion.div
                    style={{
                      width: 14,
                      height: 14,
                      background: '#8B5CF6',
                      borderRadius: 3,
                    }}
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ) : (
                  <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                    <MicIcon />
                  </motion.div>
                )}
              </div>
              <AnimatePresence mode="wait">
                {audioModeEnabled && (
                  <motion.div
                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                    animate={{ opacity: 1, width: 'auto', marginLeft: 4 }}
                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      overflow: 'hidden',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                    }}
                  >
                    <div className={styles.frequencyBars}>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={styles.bar}
                          initial={{ height: 2 }}
                          animate={{
                            height: audioModeEnabled
                              ? [2, 3 + Math.random() * 8, 2]
                              : 2,
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: audioModeEnabled ? Infinity : 0,
                            delay: i * 0.05,
                          }}
                        />
                      ))}
                    </div>
                    <div className={styles.timer}>{formatTime(audioTime)}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Right side - Send button */}
          <button
            className={`${styles.sendBtn} ${hasContent ? styles.hasContent : styles.empty}`}
            onClick={() => {
              if (hasContent) onSend();
            }}
            disabled={isLoading}
          >
            {isLoading ? <SquareIcon /> : <ArrowUpIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
