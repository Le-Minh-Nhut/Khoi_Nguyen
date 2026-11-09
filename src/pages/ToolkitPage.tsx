import { useState } from 'react';
import { Check, Download, Info, Plus, RotateCcw, Trash2 } from 'lucide-react';
import type { GlossaryTemplateRow, NoteTemplateValues } from '@/types/storage';
import { useI18n } from '@/hooks/useApp';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { storageKeys, downloadFile, toCsv } from '@/lib/storage';
import { formatPercent, uid } from '@/lib/format';
import { cn } from '@/lib/cn';
import { preparationChecklist, qualityChecklist, referenceResources } from '@/content/toolkit';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input, Textarea } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/shared/Actions';
import { EmptyState } from '@/components/shared/EmptyState';

type ChecklistState = Record<string, boolean>;

const NOTE_TEMPLATE_EMPTY: NoteTemplateValues = {
  topic: '',
  mainIdea: '',
  names: '',
  numbers: '',
  terminology: '',
  actions: '',
};

const EMPTY_ROW: GlossaryTemplateRow = { id: '', en: '', vi: '', context: '' };

export default function ToolkitPage() {
  const t = useI18n();

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.toolkit') }]} />
      <PageHeader eyebrow={t('nav.reference')} title={t('toolkit.title')} lede={t('toolkit.lede')} />

      <nav aria-label={t('nav.toolkit')} className="mt-6 flex flex-wrap gap-2">
        {[
          ['prep', t('toolkit.checklist')],
          ['quality', t('toolkit.quality')],
          ['glossary', t('toolkit.glossaryTemplate')],
          ['notes', t('toolkit.noteTemplate')],
          ['refs', t('toolkit.references')],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full border border-divider bg-surface px-3 py-1.5 text-[12.5px] text-ink-muted transition-colors hover:border-accent/40 hover:text-accent-strong"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-10">
        <PreparationChecklist />
        <QualityChecklist />
        <GlossaryTemplate />
        <NoteTemplate />
        <ReferenceList />
      </div>
    </div>
  );
}

function useChecklist(key: string) {
  const [state, setState] = useLocalStorage<ChecklistState>(key, {});
  const toggle = (id: string) => setState((current) => ({ ...current, [id]: !current[id] }));
  const reset = () => setState({});
  return { state, toggle, reset };
}

function PreparationChecklist() {
  const t = useI18n();
  const { state, toggle, reset } = useChecklist(`${storageKeys.checklists}:prep`);

  const done = preparationChecklist.filter((item) => state[item.id]).length;
  const progress = done / preparationChecklist.length;

  return (
    <section id="prep" aria-labelledby="prep-heading" className="scroll-mt-24 rounded-panel border border-divider bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-divider p-5">
        <div>
          <h2 id="prep-heading" className="text-h3 font-serif">
            {t('toolkit.checklist')}
          </h2>
          <p className="mt-0.5 text-[13px] text-ink-muted">
            {done} / {preparationChecklist.length} · {formatPercent(progress, 'vi-VN')} {t('label.complete')}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={reset} className="text-ink-muted">
          <RotateCcw className="size-3.5" aria-hidden="true" />
          {t('toolkit.resetChecklist')}
        </Button>
      </div>

      <div className="px-5 pt-4">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-label={t('label.progress')}
          className="h-1.5 w-full overflow-hidden rounded-full bg-divider"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <ul className="divide-y divide-divider p-5 pt-3">
        {preparationChecklist.map((item) => {
          const checked = Boolean(state[item.id]);
          return (
            <li key={item.id} className="flex items-start gap-3 py-3">
              <Checkbox
                id={`prep-${item.id}`}
                checked={checked}
                onCheckedChange={() => toggle(item.id)}
                className="mt-0.5"
              />
              <div className="min-w-0 flex-1">
                <label
                  htmlFor={`prep-${item.id}`}
                  className={cn(
                    'cursor-pointer text-[14.5px] leading-snug transition-colors',
                    checked ? 'text-ink-muted line-through' : 'text-ink',
                  )}
                >
                  {item.label.vi}
                </label>
                <p className="text-[12px] text-ink-muted/90">{item.label.en}</p>
                {item.detail ? (
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{item.detail.vi}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function QualityChecklist() {
  const t = useI18n();
  const { state, toggle, reset } = useChecklist(`${storageKeys.checklists}:quality`);
  const done = qualityChecklist.filter((item) => state[item.id]).length;
  const progress = done / qualityChecklist.length;

  return (
    <section id="quality" aria-labelledby="quality-heading" className="scroll-mt-24 rounded-panel border border-divider bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-divider p-5">
        <div>
          <h2 id="quality-heading" className="text-h3 font-serif">
            {t('toolkit.quality')}
          </h2>
          <p className="mt-0.5 text-[13px] text-ink-muted">
            {done} / {qualityChecklist.length} · {formatPercent(progress, 'vi-VN')} {t('label.complete')}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={reset} className="text-ink-muted">
          <RotateCcw className="size-3.5" aria-hidden="true" />
          {t('action.reset')}
        </Button>
      </div>

      <div className="grid gap-px bg-divider sm:grid-cols-2 lg:grid-cols-3">
        {qualityChecklist.map((criterion) => {
          const checked = Boolean(state[criterion.id]);
          return (
            <div key={criterion.id} className="bg-surface p-4">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id={`quality-${criterion.id}`}
                  checked={checked}
                  onCheckedChange={() => toggle(criterion.id)}
                  className="mt-0.5"
                />
                <div className="min-w-0">
                  <label
                    htmlFor={`quality-${criterion.id}`}
                    className={cn(
                      'cursor-pointer text-[14px] font-medium',
                      checked ? 'text-success' : 'text-ink',
                    )}
                  >
                    {criterion.label.vi}
                  </label>
                  <p className="text-[11px] uppercase tracking-wide text-ink-muted">{criterion.label.en}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{criterion.question.vi}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function GlossaryTemplate() {
  const t = useI18n();
  const [rows, setRows] = useLocalStorage<GlossaryTemplateRow[]>(storageKeys.glossaryTemplate, []);
  const [exported, setExported] = useState(false);

  const update = (id: string, field: keyof GlossaryTemplateRow, value: string) =>
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));

  const addRow = () => setRows((current) => [...current, { ...EMPTY_ROW, id: uid('row') }]);
  const removeRow = (id: string) => setRows((current) => current.filter((row) => row.id !== id));

  const exportCsv = () => {
    const filled = rows.filter((row) => row.en.trim() || row.vi.trim() || row.context.trim());
    if (filled.length === 0) {
      setExported(false);
      return;
    }
    const csv = toCsv([
      ['English term', 'Vietnamese term', 'Context'],
      ...filled.map((row) => [row.en, row.vi, row.context]),
    ]);
    downloadFile('edulingo-glossary.csv', csv);
    setExported(true);
    window.setTimeout(() => setExported(false), 2500);
  };

  const hasContent = rows.some((row) => row.en.trim() || row.vi.trim());

  return (
    <section id="glossary" aria-labelledby="glossary-heading" className="scroll-mt-24 rounded-panel border border-divider bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-divider p-5">
        <div>
          <h2 id="glossary-heading" className="text-h3 font-serif">
            {t('toolkit.glossaryTemplate')}
          </h2>
          <p className="mt-0.5 text-[13px] text-ink-muted">{t('toolkit.saved')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={addRow}>
            <Plus className="size-3.5" aria-hidden="true" />
            {t('toolkit.addRow')}
          </Button>
          <Button size="sm" onClick={exportCsv} disabled={!hasContent}>
            <Download className="size-3.5" aria-hidden="true" />
            {t('toolkit.exportCsv')}
          </Button>
        </div>
      </div>

      <div className="p-5">
        {exported ? (
          <p className="mb-3 flex items-center gap-1.5 rounded-md border border-success/25 bg-success-soft px-3 py-1.5 text-[12.5px] text-success" role="status">
            <Check className="size-3.5" aria-hidden="true" />
            {t('toolkit.exported')}
          </p>
        ) : null}

        {rows.length === 0 ? (
          <EmptyState
            title="Bảng thuật ngữ đang trống"
            description="Thêm dòng đầu tiên cho thuật ngữ bạn cần nhớ trước sự kiện."
            action={
              <Button size="sm" onClick={addRow}>
                <Plus className="size-3.5" aria-hidden="true" />
                {t('toolkit.addRow')}
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">{t('toolkit.glossaryTemplate')}</caption>
              <thead>
                <tr className="border-b border-divider">
                  <th scope="col" className="w-[32%] px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                    English term
                  </th>
                  <th scope="col" className="w-[32%] px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                    Vietnamese term
                  </th>
                  <th scope="col" className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                    Context
                  </th>
                  <th scope="col" className="w-10 px-2 py-2">
                    <span className="sr-only">{t('action.remove')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} className="border-b border-divider/70">
                    <td className="px-2 py-1.5">
                      <Input
                        value={row.en}
                        onChange={(event) => update(row.id, 'en', event.target.value)}
                        aria-label={`English term, row ${index + 1}`}
                        className="h-9 border-transparent bg-transparent px-2 hover:border-divider-strong focus-visible:border-accent"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <Input
                        value={row.vi}
                        onChange={(event) => update(row.id, 'vi', event.target.value)}
                        aria-label={`Vietnamese term, row ${index + 1}`}
                        className="h-9 border-transparent bg-transparent px-2 hover:border-divider-strong focus-visible:border-accent"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <Input
                        value={row.context}
                        onChange={(event) => update(row.id, 'context', event.target.value)}
                        aria-label={`Context, row ${index + 1}`}
                        className="h-9 border-transparent bg-transparent px-2 hover:border-divider-strong focus-visible:border-accent"
                      />
                    </td>
                    <td className="px-1 py-1.5">
                      <Button
                        variant="ghost"
                        size="iconSm"
                        onClick={() => removeRow(row.id)}
                        aria-label={`${t('action.remove')} row ${index + 1}`}
                        className="text-ink-muted hover:text-error"
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function NoteTemplate() {
  const t = useI18n();
  const [values, setValues] = useLocalStorage<NoteTemplateValues>(storageKeys.noteTemplate, NOTE_TEMPLATE_EMPTY);

  const fields: Array<{ key: keyof NoteTemplateValues; label: string; hint: string; rows: number }> = [
    { key: 'topic', label: 'Chủ đề', hint: 'Topic · what the session is about', rows: 2 },
    { key: 'mainIdea', label: 'Ý chính', hint: 'Main idea · the argument, in one or two lines', rows: 3 },
    { key: 'names', label: 'Tên và tổ chức', hint: 'Names and organizations · read titles as given', rows: 3 },
    { key: 'numbers', label: 'Số liệu và ngày tháng', hint: 'Numbers and dates · write digits, attach units', rows: 2 },
    { key: 'terminology', label: 'Thuật ngữ then chốt', hint: 'Key terminology · EN = VI, one per line', rows: 3 },
    { key: 'actions', label: 'Điểm cần hành động', hint: 'Action points · who does what by when', rows: 3 },
  ];

  const asText = fields
    .map((field) => `${field.label}\n${values[field.key] || '—'}`)
    .join('\n\n');

  return (
    <section id="notes" aria-labelledby="notes-heading" className="scroll-mt-24 rounded-panel border border-divider bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-divider p-5">
        <div>
          <h2 id="notes-heading" className="text-h3 font-serif">
            {t('toolkit.noteTemplate')}
          </h2>
          <p className="mt-0.5 text-[13px] text-ink-muted">{t('toolkit.saved')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setValues(NOTE_TEMPLATE_EMPTY);
            }}
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            {t('action.reset')}
          </Button>
          <CopyButton
            size="sm"
            text={asText}
            label={t('action.copy')}
            variant="secondary"
          />
        </div>
      </div>

      <div className="grid gap-5 p-5 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`note-${field.key}`} className="mb-1 block text-[13px] font-medium text-ink">
              {field.label}
            </label>
            <p className="mb-1.5 text-[11.5px] text-ink-muted">{field.hint}</p>
            <Textarea
              id={`note-${field.key}`}
              rows={field.rows}
              value={values[field.key]}
              onChange={(event) =>
                setValues((current) => ({ ...current, [field.key]: event.target.value }))
              }
              placeholder="…"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ReferenceList() {
  const t = useI18n();

  return (
    <section id="refs" aria-labelledby="refs-heading" className="scroll-mt-24 rounded-panel border border-divider bg-surface">
      <div className="border-b border-divider p-5">
        <h2 id="refs-heading" className="text-h3 font-serif">
          {t('toolkit.references')}
        </h2>
        <p className="mt-0.5 flex items-start gap-1.5 text-[12.5px] leading-relaxed text-ink-muted">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Liên kết ngoài, mở trong tab mới. Không có liên kết nào mang tính tài trợ hay xác nhận từ tổ chức được
          nhắc tới.
        </p>
      </div>
      <ul className="divide-y divide-divider">
        {referenceResources.map((resource) => (
          <li key={resource.name} className="flex flex-wrap items-start justify-between gap-3 p-4 sm:p-5">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[14.5px] font-medium text-accent-strong underline-offset-4 hover:underline"
                >
                  {resource.name}
                </a>
                <Badge>{resource.kind.vi}</Badge>
              </div>
              <p className="mt-1 max-w-[68ch] text-[13px] leading-relaxed text-ink-muted">
                {resource.description.vi}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
