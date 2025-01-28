import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeCards from "./components/HomeCards";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero
        title="Become a React Dev"
        subtitle="Find the React job that fits your skills and needs"
      />
      <HomeCards />
    </>
  );
};

export default App;
