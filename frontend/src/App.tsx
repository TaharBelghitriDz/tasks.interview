import CardsList from "./components/cards.list";
import ManualInterval from "./components/manual.interval";
import Modals from "./components/modals";
import { Triggers } from "./components/modals/triggers";

function App() {
  return (
    <main>
      <Triggers />
      <Modals />
      <CardsList />
      <ManualInterval />
    </main>
  );
}

export default App;
