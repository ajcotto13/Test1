/**
 * TileDisplay — renders a single Mahjong tile.
 * Props: { tile, size='md', selected=false, faceDown=false, onClick, disabled=false }
 */

export default function TileDisplay({ tile, size = 'md', selected = false, faceDown = false, onClick, disabled = false }) {
  const isJoker = tile && (tile.suit === 'joker' || tile.value === 'J')
  const isFlower = tile && tile.suit === 'flowers'

  const sizeClasses = {
    sm: 'w-8 h-10 text-xl',
    md: 'w-12 h-14 text-3xl',
    lg: 'w-16 h-20 text-4xl',
  }[size] || 'w-12 h-14 text-3xl'

  const nameSizeClasses = {
    sm: 'text-[7px]',
    md: 'text-[8px]',
    lg: 'text-[9px]',
  }[size] || 'text-[8px]'

  if (faceDown) {
    return (
      <div
        className={`
          ${sizeClasses}
          inline-flex items-center justify-center
          rounded-lg border-2 border-rose-700
          bg-rose-500 select-none
          transition-all duration-200
          ${!disabled && onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg' : ''}
          ${disabled ? 'opacity-50' : ''}
        `}
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 2px, transparent 2px, transparent 8px)',
        }}
        onClick={!disabled && onClick ? onClick : undefined}
      />
    )
  }

  let bgClass = 'bg-white'
  let borderClass = 'border-rose-200'
  let textClass = 'text-rose-900'

  if (isJoker) {
    bgClass = 'bg-teal-50'
    borderClass = 'border-teal-400'
    textClass = 'text-teal-700'
  } else if (isFlower) {
    bgClass = 'bg-purple-50'
    borderClass = 'border-purple-300'
    textClass = 'text-purple-700'
  }

  return (
    <div
      className={`
        ${sizeClasses}
        inline-flex flex-col items-center justify-center
        rounded-lg border-2 ${borderClass} ${bgClass}
        shadow-md select-none
        transition-all duration-150
        ${selected ? '-translate-y-2 ring-2 ring-rose-500 shadow-lg' : ''}
        ${!disabled && onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border-rose-400' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={!disabled && onClick ? onClick : undefined}
      title={tile?.name}
    >
      <span className={`leading-none ${isJoker ? 'text-gold-600' : textClass}`} style={{ fontSize: size === 'lg' ? '2rem' : size === 'sm' ? '1.1rem' : '1.5rem' }}>
        {tile?.symbol || '?'}
      </span>
      {size !== 'sm' && (
        <span className={`${nameSizeClasses} leading-none mt-0.5 truncate max-w-full px-0.5 ${textClass} opacity-70`}>
          {tile?.name}
        </span>
      )}
    </div>
  )
}
