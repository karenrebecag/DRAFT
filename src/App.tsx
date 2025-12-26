import { Provider } from "react-redux"
import { VideoProvider } from "./modals/VideoContext"
import AppNavigation from "./navigation/Navigation"
import store from "./redux/store"


function App() {

  return (
    <Provider store={store}>
      <VideoProvider>
        <AppNavigation />
      </VideoProvider>
    </Provider>
  )
}

export default App