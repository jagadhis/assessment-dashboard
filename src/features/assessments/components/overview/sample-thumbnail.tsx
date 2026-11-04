import type { ImageAsset } from '@/features/assessments/types/schemas';

/** The faded copies behind the photo hint that each sample has several assessed variants. */
export function SampleThumbnail({ image }: { image: ImageAsset }) {
  const shared = {
    src: image.src,
    width: image.width,
    height: image.height,
    loading: 'lazy',
  } as const;
  return (
    <div className="relative h-16 w-32 shrink-0">
      <img
        {...shared}
        alt=""
        className="absolute top-2 left-8 h-12 w-24 rounded-lg object-cover opacity-25"
      />
      <img
        {...shared}
        alt=""
        className="absolute top-1 left-4 h-14 w-24 rounded-lg object-cover opacity-45"
      />
      <img {...shared} alt={image.alt} className="relative h-16 w-24 rounded-lg object-cover" />
    </div>
  );
}
