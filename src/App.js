import "./assets/styles.css";
import tag from "./assets/tags.png";
import AddTag from "./components/addTags";
import RemoveTags from "./components/removeTags";

export default function App() {
  return (
    <div className="wrapper">
      <div className="title">
        <img src={tag} alt="icons" />
        <h2>Tags</h2>
      </div>
      <AddTag />
      <RemoveTags />
    </div>
  );
}
