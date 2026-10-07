export default function Notice({ text, type }) {
  if (!text) return null;

  return (
    <div className={`notice ${type}`}>
      {text}
    </div>
  );
}
