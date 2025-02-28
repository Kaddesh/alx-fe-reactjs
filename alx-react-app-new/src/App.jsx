import Counter from "./components/counter";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import UserProfile from "./components/UserProfile";
import WelcomeMessage from "./components/WelcomeMessage";


function App() {
    return (
        <div>
             <Counter />
            <WelcomeMessage />
            <Header />
            <MainContent />
            <Footer />
            <UserProfile name="Alice" age={25} bio="Loves hiking and photography." />
        </div>
    );
}

export default App;
