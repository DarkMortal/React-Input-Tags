import useTagStore from "./tags";

export default function AddTag() {
  const addTag = useTagStore((state) => state.addTag);
  const tagsLeft = useTagStore((state) => state.tagsLeft);
  const tags = useTagStore((state) => state.tags);
  const removeTag = useTagStore((state) => state.removeTag);
  const removeLastTag = useTagStore((state) => state.removeLastTag);
  
  return (
    <div className="content">
      <p>Press enter or add a comma after each tag</p>
      <ul>
        {tags instanceof Set
          ? Array.from(tags, (tag) => (
              <li key={tag}>
                {tag}
                <span
                  className="uit uit-multiply"
                  onClick={() => removeTag(tag)}
                >
                  &times;
                </span>
              </li>
            ))
          : null}
        <input
          type="text"
          spellCheck="false"
          onFocus={(evt) =>
            (evt.target.parentElement.style.border = "1px solid #5372f0")
          }
          onBlur={(evt) =>
            (evt.target.parentElement.style.border = "1px solid #a6a6a6")
          }
          disabled={tagsLeft <= 0}
          onKeyUp={(evt) => {
            if (evt.key === "Enter") {
              let tagArr = evt.target.value.split(",");
              tagArr.forEach((elm) => {
                if (elm.strip()) addTag(elm.strip());
              });
              evt.target.value = "";
            }
            if (evt.key === "Backspace") removeLastTag();
          }}
        />
      </ul>
    </div>
  );
}
