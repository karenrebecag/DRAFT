import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Message, ChatbotWidgetProps } from './types';
import {
  DEFAULT_TRANSLATIONS,
  BOT_RESPONSES,
  generateId,
  formatFileSize,
} from './types';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import { floatingButtonVariants, badgeVariants, containerVariants } from './lib/animations';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/Drawer';
import styles from './styles/chatbot.module.scss';

// Icons - defined outside component to prevent re-creation
const MessageCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// Quick suggestions - defined outside component
const QUICK_SUGGESTIONS = {
  es: [
    { text: 'Servicios', value: 'servicios' },
    { text: 'Precios', value: 'precio' },
    { text: 'Portafolio', value: 'portafolio' },
    { text: 'Contacto', value: 'contacto' },
  ],
  en: [
    { text: 'Services', value: 'services' },
    { text: 'Pricing', value: 'pricing' },
    { text: 'Portfolio', value: 'portfolio' },
    { text: 'Contact', value: 'contact' },
  ],
};

// Avatar URL - constant
const AVATAR_URL = '/assets/img/logo/favicon.png';

export default function ChatbotWidget({ lang = 'es', translations }: ChatbotWidgetProps) {
  const t = useMemo(() => ({ ...DEFAULT_TRANSLATIONS[lang], ...translations }), [lang, translations]);

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [audioModeEnabled, setAudioModeEnabled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Check mobile - only on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if at absolute bottom of page
  useEffect(() => {
    const checkAtBottom = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      setIsAtBottom(distanceFromBottom <= 0);
    };
    checkAtBottom();
    window.addEventListener('scroll', checkAtBottom);
    window.addEventListener('resize', checkAtBottom);
    return () => {
      window.removeEventListener('scroll', checkAtBottom);
      window.removeEventListener('resize', checkAtBottom);
    };
  }, []);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Scroll to bottom
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  // Auto-scroll on messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Welcome message - with initialization guard
  useEffect(() => {
    if (hasInitialized.current) return;

    if (isOpen && messages.length === 0) {
      hasInitialized.current = true;
      const welcomeMessage: Message = {
        id: generateId(),
        text: t.welcome,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, t.welcome]);

  // Auto-scroll when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom('instant'), 100);
    }
  }, [isOpen, scrollToBottom]);

  // Click outside to close (desktop only)
  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMobile]);

  // Generate bot response - memoized based on lang
  const generateBotResponse = useCallback((userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const responses = BOT_RESPONSES[lang];

    for (const [keyword, response] of Object.entries(responses)) {
      if (keyword !== 'default' && lowerMessage.includes(keyword)) {
        return response;
      }
    }

    return responses.default;
  }, [lang]);

  // Send message
  const sendMessage = useCallback(() => {
    if ((!inputValue.trim() && !selectedFile) || !isOnline) return;

    const userMessage: Message = {
      id: generateId(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
      file: selectedFile
        ? {
            name: selectedFile.name,
            size: formatFileSize(selectedFile.size),
            type: selectedFile.type,
            url: URL.createObjectURL(selectedFile),
          }
        : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setSelectedFile(null);
    setIsTyping(true);

    // Simulate bot response
    const responseText = generateBotResponse(userMessage.text);
    setTimeout(() => {
      const botMessage: Message = {
        id: generateId(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  }, [inputValue, selectedFile, isOnline, generateBotResponse]);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Máximo 10MB.');
      return;
    }
    setSelectedFile(file);
  }, []);

  // Clear file
  const clearFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  // Toggle audio mode
  const toggleAudioMode = useCallback(() => {
    setAudioModeEnabled((prev) => !prev);
  }, []);

  // Handle quick suggestion
  const handleQuickSuggestion = useCallback(
    (value: string) => {
      setInputValue(value);
      // Use setTimeout to ensure state is updated before sending
      setTimeout(() => {
        const userMessage: Message = {
          id: generateId(),
          text: value,
          sender: 'user',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        const responseText = generateBotResponse(value);
        setTimeout(() => {
          const botMessage: Message = {
            id: generateId(),
            text: responseText,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
        }, 1000 + Math.random() * 1500);
      }, 0);
    },
    [generateBotResponse]
  );

  // Open chat handler
  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Close chat handler
  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Memoized suggestions
  const suggestions = useMemo(() => QUICK_SUGGESTIONS[lang], [lang]);

  // Bot message count for badge
  const botMessageCount = useMemo(
    () => messages.filter((m) => m.sender === 'bot').length,
    [messages]
  );

  // Render chat content (inlined, not as component)
  const renderChatContent = () => (
    <>
      <MessageList ref={messagesEndRef} messages={messages} isTyping={isTyping} avatarUrl={AVATAR_URL} />

      {messages.length <= 1 && (
        <div className={styles.quickSuggestions}>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.value}
              className={styles.suggestionBtn}
              onClick={() => handleQuickSuggestion(suggestion.value)}
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      )}

      <InputArea
        value={inputValue}
        onChange={setInputValue}
        onSend={sendMessage}
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        onClearFile={clearFile}
        audioModeEnabled={audioModeEnabled}
        onToggleAudioMode={toggleAudioMode}
        translations={t}
        disabled={!isOnline}
        isLoading={isTyping}
      />
    </>
  );

  // Render floating button (hidden when at bottom and chat is closed)
  const renderFloatingButton = () => {
    // Hide button when at absolute bottom of page, unless chat is open
    if (isAtBottom && !isOpen) return null;

    return (
      <motion.button
        onClick={openChat}
        className={styles.floatingBtn}
        aria-label={t.openChat}
        variants={floatingButtonVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircleIcon />
        {messages.length > 1 && (
          <motion.span className={styles.badge} variants={badgeVariants} initial="hidden" animate="visible">
            {botMessageCount}
          </motion.span>
        )}
      </motion.button>
    );
  };

  // Mobile: Use Drawer
  if (isMobile) {
    return (
      <>
        {!isOpen && renderFloatingButton()}
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent showHandle={true}>
            <div className={styles.drawerHeader}>
              <DrawerTitle>{t.title}</DrawerTitle>
              <DrawerDescription>{isOnline ? t.online : t.offline}</DrawerDescription>
            </div>
            {renderChatContent()}
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Desktop: Floating button when closed
  if (!isOpen) {
    return renderFloatingButton();
  }

  // Desktop: Chat container when open
  return (
    <AnimatePresence>
      <motion.div
        ref={chatContainerRef}
        className={styles.chatContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ChatHeader
          title={t.title}
          subtitle={isOnline ? t.online : t.offline}
          onMinimize={closeChat}
          minimizeLabel={t.minimizeChat}
          avatarUrl={AVATAR_URL}
          isOnline={isOnline}
        />
        {renderChatContent()}
      </motion.div>
    </AnimatePresence>
  );
}
