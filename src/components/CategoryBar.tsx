const categories = ["STRATEGY", "UI/UX DESIGN", "BRAND IDENTITY", "WEB DESIGN", "DEVELOPMENT"];

export function CategoryBar({ items = categories }: { items?: string[] }) {
  return (
    <div className="category-bar">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
