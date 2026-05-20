function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-sm font-semibold text-emerald-600">{eyebrow}</p>}
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export default PageHeader;
