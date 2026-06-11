type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <span className="w-10 h-[1.5px] bg-gradient-to-r from-violet to-violet-soft inline-block" />
      <span className="font-body text-[0.68rem] tracking-[0.25em] uppercase text-violet-soft font-medium">
        {children}
      </span>
    </div>
  );
}
