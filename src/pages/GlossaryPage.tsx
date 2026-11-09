import { useI18n } from '@/hooks/useApp';
import { PageHeader, StatPill } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { GlossaryBrowser } from '@/components/glossary/GlossaryBrowser';
import { glossaryTerms } from '@/content/glossary';
import { glossaryCategories } from '@/content/glossaryCategories';

export default function GlossaryPage() {
  const t = useI18n();

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.glossary') }]} />
      <PageHeader
        eyebrow={t('nav.reference')}
        title={t('glossary.title')}
        lede={t('glossary.lede')}
        meta={
          <>
            <StatPill label={t('label.terms')} value={String(glossaryTerms.length)} />
            <StatPill label={t('glossary.categories')} value={String(glossaryCategories.length)} />
          </>
        }
      />
      <div className="mt-8">
        <GlossaryBrowser />
      </div>
    </div>
  );
}
