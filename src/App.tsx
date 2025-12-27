import { Provider } from "react-redux"
import { VideoProvider } from "./modals/VideoContext"
import { I18nProvider } from "./i18n"
import AppNavigation from "./navigation/Navigation"
import store from "./redux/store"
import { ChatbotWidget } from "./components/chatbot"


function App() {

  return (
    <Provider store={store}>
      <I18nProvider defaultLocale="es">
        <VideoProvider>
          <AppNavigation />
          <ChatbotWidget lang="es" />
        </VideoProvider>
      </I18nProvider>
    </Provider>
  )
}

export default App