import { cosmic } from '@/lib/cosmic'
import Section from '@/components/Section'

export default async function Page() {
  const { objects: sections } = await cosmic.objects.find({
    type: 'sections',
  }).props(['title', 'slug', 'metadata'])

  return (
    <main>
      {sections.map((section: any) => (
        <Section
          key={section.id}
          title={section.metadata.title}
          body={section.metadata.body}
          imageUrl={section.metadata.images[0]?.imgix_url}
          ctaLabel={section.metadata.cta_button_label}
          ctaUrl={section.metadata.cta_button_url}
        />
      ))}
    </main>
  )
}