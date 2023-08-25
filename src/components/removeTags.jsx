import useTagStore from "./tags";

export default function RemoveTags() {
  const reset = useTagStore((state) => state.removeAllTags);
  const tagsLeft = useTagStore((state) => state.tagsLeft);

  return (
    <div className="details">
      <p>
        <span>{tagsLeft}</span> tags are remaining
      </p>
      <button onClick={reset}>
        <strong>Remove All</strong>
      </button>
    </div>
  );
}
