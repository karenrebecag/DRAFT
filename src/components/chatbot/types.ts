// Tipos para el Chatbot de DRAFT Studio

export interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  file?: {
    name: string;
    size: string;
    type: string;
    url: string;
  };
}

export interface ChatbotState {
  isExpanded: boolean;
  messages: Message[];
  inputValue: string;
  selectedFile: File | null;
  isTyping: boolean;
  isDragging: boolean;
}

export interface ChatbotTranslations {
  welcome: string;
  title: string;
  subtitle: string;
  online: string;
  offline: string;
  openChat: string;
  minimizeChat: string;
  placeholder: string;
  send: string;
  attach: string;
  removeFile: string;
  dragFiles: string;
  maxSize: string;
  noConnection: string;
  errorGeneric: string;
  recording: string;
  stopRecording: string;
  webSearch: string;
  analyzing: string;
}

export interface ChatbotWidgetProps {
  lang?: 'es' | 'en';
  translations?: Partial<ChatbotTranslations>;
}

// Traducciones por defecto
export const DEFAULT_TRANSLATIONS: Record<'es' | 'en', ChatbotTranslations> = {
  es: {
    welcome: '¡Hola! Soy el asistente de DRAFT Studio. ¿En qué puedo ayudarte hoy?',
    title: 'DRAFT Studio',
    subtitle: 'Asistente Virtual',
    online: 'En línea',
    offline: 'Desconectado',
    openChat: 'Abrir chat',
    minimizeChat: 'Minimizar chat',
    placeholder: 'Escribe tu mensaje...',
    send: 'Enviar',
    attach: 'Adjuntar archivo',
    removeFile: 'Eliminar archivo',
    dragFiles: 'Suelta archivos aquí',
    maxSize: 'Máximo 10MB',
    noConnection: 'Sin conexión a internet',
    errorGeneric: 'Ocurrió un error. Intenta de nuevo.',
    recording: 'Grabando...',
    stopRecording: 'Detener grabación',
    webSearch: 'Buscar en la web',
    analyzing: 'Analizando documento...',
  },
  en: {
    welcome: "Hi! I'm the DRAFT Studio assistant. How can I help you today?",
    title: 'DRAFT Studio',
    subtitle: 'Virtual Assistant',
    online: 'Online',
    offline: 'Offline',
    openChat: 'Open chat',
    minimizeChat: 'Minimize chat',
    placeholder: 'Type your message...',
    send: 'Send',
    attach: 'Attach file',
    removeFile: 'Remove file',
    dragFiles: 'Drop files here',
    maxSize: 'Max 10MB',
    noConnection: 'No internet connection',
    errorGeneric: 'An error occurred. Please try again.',
    recording: 'Recording...',
    stopRecording: 'Stop recording',
    webSearch: 'Search the web',
    analyzing: 'Analyzing document...',
  },
};

// Respuestas automáticas del bot (simulación para marketing)
export const BOT_RESPONSES: Record<'es' | 'en', Record<string, string>> = {
  es: {
    servicios: 'En DRAFT Studio ofrecemos servicios de **diseño web**, **branding**, **desarrollo de aplicaciones** y **estrategia digital**. ¿Te gustaría saber más sobre alguno en particular?',
    servicio: 'En DRAFT Studio ofrecemos servicios de **diseño web**, **branding**, **desarrollo de aplicaciones** y **estrategia digital**. ¿Te gustaría saber más sobre alguno en particular?',
    precio: 'Nuestros precios varían según el proyecto. Te invitamos a [agendar una llamada](#contact) para discutir tus necesidades específicas y darte una cotización personalizada.',
    precios: 'Nuestros precios varían según el proyecto. Te invitamos a [agendar una llamada](#contact) para discutir tus necesidades específicas y darte una cotización personalizada.',
    contacto: 'Puedes contactarnos a través del [formulario en nuestra página de contacto](#contact), o escribirnos directamente a **hola@draftstudio.com**',
    contactar: 'Puedes contactarnos a través del [formulario en nuestra página de contacto](#contact), o escribirnos directamente a **hola@draftstudio.com**',
    portafolio: 'Puedes ver nuestros proyectos más recientes en la [sección de portafolio](#portfolio). Tenemos experiencia en diversos sectores como tecnología, moda, gastronomía y más.',
    proyectos: 'Puedes ver nuestros proyectos más recientes en la [sección de portafolio](#portfolio). Tenemos experiencia en diversos sectores como tecnología, moda, gastronomía y más.',
    proceso: 'Nuestro proceso incluye:\n\n1. **Discovery y estrategia**\n2. **Diseño conceptual**\n3. **Desarrollo e implementación**\n4. **Lanzamiento y optimización**\n\n¿Te gustaría agendar una reunión para conocer más?',
    web: 'Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para SEO. Utilizamos las últimas tecnologías como React, Next.js y más. ¿Tienes un proyecto en mente?',
    branding: 'Creamos identidades de marca únicas y memorables. Desde logotipos hasta sistemas de diseño completos. ¿Estás buscando renovar tu marca o crear una nueva?',
    hola: '¡Hola! ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros servicios, portafolio o ayudarte a contactar con nuestro equipo.',
    default: 'Gracias por tu mensaje. Un miembro de nuestro equipo te responderá pronto. Mientras tanto, ¿hay algo más en lo que pueda ayudarte?\n\nPuedes preguntarme sobre:\n- Nuestros **servicios**\n- El **portafolio**\n- **Precios**\n- Cómo **contactarnos**',
  },
  en: {
    services: 'At DRAFT Studio we offer **web design**, **branding**, **application development**, and **digital strategy** services. Would you like to know more about any of them?',
    service: 'At DRAFT Studio we offer **web design**, **branding**, **application development**, and **digital strategy** services. Would you like to know more about any of them?',
    pricing: 'Our prices vary depending on the project. We invite you to [schedule a call](#contact) to discuss your specific needs and give you a personalized quote.',
    price: 'Our prices vary depending on the project. We invite you to [schedule a call](#contact) to discuss your specific needs and give you a personalized quote.',
    contact: 'You can contact us through the [form on our contact page](#contact), or write to us directly at **hello@draftstudio.com**',
    portfolio: 'You can see our most recent projects in the [portfolio section](#portfolio). We have experience in various sectors such as technology, fashion, gastronomy and more.',
    projects: 'You can see our most recent projects in the [portfolio section](#portfolio). We have experience in various sectors such as technology, fashion, gastronomy and more.',
    process: 'Our process includes:\n\n1. **Discovery and strategy**\n2. **Conceptual design**\n3. **Development and implementation**\n4. **Launch and optimization**\n\nWould you like to schedule a meeting to learn more?',
    web: 'We design and develop modern, fast websites optimized for SEO. We use the latest technologies like React, Next.js and more. Do you have a project in mind?',
    branding: 'We create unique and memorable brand identities. From logos to complete design systems. Are you looking to renew your brand or create a new one?',
    hello: 'Hello! How can I help you today? I can tell you about our services, portfolio or help you contact our team.',
    hi: 'Hello! How can I help you today? I can tell you about our services, portfolio or help you contact our team.',
    default: 'Thank you for your message. A member of our team will respond soon. In the meantime, is there anything else I can help you with?\n\nYou can ask me about:\n- Our **services**\n- The **portfolio**\n- **Pricing**\n- How to **contact us**',
  },
};

// Utilidades
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
