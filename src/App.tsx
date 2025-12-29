import { VideoProvider } from "./modals/VideoContext"
import { I18nProvider } from "./i18n"
import AppNavigation from "./navigation/Navigation"
import { ChatbotWidget } from "./components/chatbot"


function App() {

  return (
    <I18nProvider defaultLocale="es">
      <VideoProvider>
        <AppNavigation />
        <ChatbotWidget lang="es" />
      </VideoProvider>
    </I18nProvider>
  )
}

export default App