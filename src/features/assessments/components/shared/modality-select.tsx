import type { Modality } from '@/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MODALITY_LABELS: Record<Modality, string> = {
  image: 'Image',
  text: 'Text',
  audio: 'Audio',
};

/** Only the assessed modality has results, so the others are listed but disabled. */
export function ModalitySelect({ modality }: { modality: Modality }) {
  return (
    <Select defaultValue={modality}>
      <SelectTrigger aria-label="Input modality" className="min-w-28">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(MODALITY_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value} disabled={value !== modality}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
