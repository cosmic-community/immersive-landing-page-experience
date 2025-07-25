import React from 'react'

interface SectionProps {
  title: string
  body: string
  imageUrl?: string
  ctaLabel?: string
  ctaUrl?: string
}

export default function Section({ title, body, imageUrl, ctaLabel, ctaUrl }: SectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-64 object-cover mb-6" />}
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="prose mb-6" dangerouslySetInnerHTML={{ __html: body }} />
      {ctaLabel && ctaUrl && (
        <a href={ctaUrl} className="px-4 py-2 bg-primary text-white rounded-md">
          {ctaLabel}
        </a>
      )}
    </section>
  )
}