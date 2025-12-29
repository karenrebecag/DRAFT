import React, { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Paperclip, Mic, StopCircle, X } from 'lucide-react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import styles from './AIPromptBox.module.scss';

// Utility function for className merging
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// Tooltip Components
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(styles.tooltipContent, className)}
    {...props}
  />
));
TooltipContent.displayName = 'TooltipContent';

// Voice Recorder Component
interface VoiceRecorderProps {
  isRecording: boolean;
  onStopRecording: (duration: number) => void;
  visualizerBars?: number;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  onStopRecording,
  visualizerBars = 24,
}) => {
  const [time, setTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (time > 0) onStopRecording(time);
      setTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRecording) return null;

  return (
    <div className={styles.voiceRecorder}>
      <div className={styles.recorderInfo}>
        <div className={styles.recordingDot} />
        <span className={styles.recordingTime}>{formatTime(time)}</span>
      </div>
      <div className={styles.visualizer}>
        {[...Array(visualizerBars)].map((_, i) => (
          <div
            key={i}
            className={styles.visualizerBar}
            style={{
              height: `${Math.max(15, Math.random() * 100)}%`,
              animationDelay: `${i * 0.05}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Main AIPromptBox Component
export interface AIPromptBoxProps {
  onSend?: (message: string, files?: File[]) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export const AIPromptBox: React.FC<AIPromptBoxProps> = ({
  onSend = () => {},
  isLoading = false,
  placeholder = 'Pregúntale a nuestra IA...',
  className,
}) => {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) return;

    setFiles([file]);
    const reader = new FileReader();
    reader.onload = (e) => setFilePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setFiles([]);
    setFilePreview(null);
  };

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          processFile(file);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (input.trim() || files.length > 0) {
      onSend(input, files);
      setInput('');
      setFiles([]);
      setFilePreview(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleStopRecording = (duration: number) => {
    setIsRecording(false);
    onSend(`[Mensaje de voz - ${duration}s]`, []);
  };

  const hasContent = input.trim() !== '' || files.length > 0;

  return (
    <TooltipProvider>
      <motion.div
        className={cn(styles.promptBox, isRecording && styles.recording, className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* File Preview */}
        <AnimatePresence>
          {filePreview && !isRecording && (
            <motion.div
              className={styles.filePreview}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <img src={filePreview} alt="Preview" />
              <button onClick={handleRemoveFile} className={styles.removeFile}>
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice Recorder */}
        <VoiceRecorder
          isRecording={isRecording}
          onStopRecording={handleStopRecording}
        />

        {/* Input Area */}
        {!isRecording && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
              {/* Attach Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => uploadInputRef.current?.click()}
                    className={styles.iconButton}
                    disabled={isLoading}
                  >
                    <Paperclip size={18} />
                    <input
                      ref={uploadInputRef}
                      type="file"
                      className={styles.hiddenInput}
                      onChange={(e) => {
                        if (e.target.files?.[0]) processFile(e.target.files[0]);
                        e.target.value = '';
                      }}
                      accept="image/*"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Adjuntar imagen</TooltipContent>
              </Tooltip>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={isLoading}
                className={styles.textarea}
                rows={1}
              />

              {/* Submit/Mic Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type={hasContent ? 'submit' : 'button'}
                    onClick={() => {
                      if (isRecording) setIsRecording(false);
                      else if (!hasContent) setIsRecording(true);
                    }}
                    className={cn(
                      styles.submitButton,
                      hasContent && styles.hasContent,
                      isRecording && styles.isRecording
                    )}
                    disabled={isLoading}
                  >
                    {isRecording ? (
                      <StopCircle size={18} />
                    ) : hasContent ? (
                      <ArrowUp size={18} />
                    ) : (
                      <Mic size={18} />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isRecording ? 'Detener' : hasContent ? 'Enviar' : 'Grabar voz'}
                </TooltipContent>
              </Tooltip>
            </div>
          </form>
        )}
      </motion.div>
    </TooltipProvider>
  );
};

export default AIPromptBox;
