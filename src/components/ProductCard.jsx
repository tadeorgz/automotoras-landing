import { Tag, Home, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import WhatsAppButton from './WhatsAppButton'

function ProductCard({ product, whatsappHref }) {
  const currencyCode = product.moneda === '$' ? 'UYU' : 'USD'
  const formattedPrice = new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(product.precio).replace(/UYU|US\$/, product.moneda)

  const isNew = String(product.tipo).toLowerCase().includes('0km')
  const badgeColor = isNew ? 'bg-[var(--brand-color)]' : 'bg-stone-200 text-stone-800'
  const operationText = isNew ? '0km' : (product.tipo || 'Usado')

  return (
    <article className="group min-h-[465px] relative flex flex-col overflow-hidden rounded-2xl border border-[var(--brand-color)]/15 bg-white shadow-md transition-all duration-500 focus-within:-translate-y-2 focus-within:border-[var(--brand-color)]/40 focus-within:shadow-xl focus-within:shadow-[var(--brand-color)]/20 md:hover:-translate-y-2 md:hover:border-[var(--brand-color)]/40 md:hover:shadow-xl md:hover:shadow-[var(--brand-color)]/15">
      <Link to={`/propiedad/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Ver detalles de {product.nombre}</span>
      </Link>

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-stone-100 sm:h-56">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-110"
          loading="lazy"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100" />

        {/* Type badge (Venta/Alquiler) */}
        <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full ${badgeColor} px-3 py-1 text-xs font-semibold ${isNew ? 'text-white' : ''} shadow-md`}>
          <Tag size={10} />
          {operationText}
        </span>

        {/* Zone badge */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/60 px-2 py-1 text-xs font-semibold text-[var(--text-color)] backdrop-blur-md shadow-sm">
          <MapPin size={12} />
          {product.anio}
        </span>

        {/* Quick-action overlay */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 transition-all duration-500 translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
          <span className="rounded-full bg-[var(--brand-color)] px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm shadow-md">
            Ver detalles
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5 relative z-20 pointer-events-none">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-[var(--text-color)] transition-colors duration-200 md:group-hover:text-[var(--brand-color)]">
          {product.marca} {product.modelo}
        </h3>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-stone-700">
          {product.descripcion}
        </p>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <div className="flex items-center gap-1.5 text-xs text-stone-700 rounded-lg bg-stone-100 p-2 border border-stone-200">
            <span className="font-medium">Año</span>
            <span className="ml-auto font-bold">{product.anio}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-700 rounded-lg bg-stone-100 p-2 border border-stone-200">
            <span className="font-medium">Km</span>
            <span className="ml-auto font-bold">{product.kilometraje ?? '—'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-700 rounded-lg bg-stone-100 p-2 border border-stone-200">
            <span className="font-medium">Tipo</span>
            <span className="ml-auto font-bold capitalize">{product.tipo}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between rounded-xl bg-[var(--brand-color)]/10 px-4 py-2.5 border border-[var(--brand-color)]/20 mt-1">
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--brand-color)]/70">Precio</span>
          <p className="inline-flex items-center gap-1.5 text-base font-extrabold text-[var(--brand-color)]">
            {formattedPrice}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 mt-1 pointer-events-auto">
          <WhatsAppButton href={whatsappHref} label="Agendar visita" className="w-full flex-1 text-xs sm:text-sm" />
        </div>
      </div>
    </article>
  )
}

export default ProductCard
