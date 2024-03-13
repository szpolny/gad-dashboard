import { TableCell, TableRow } from '@/components/ui/table';

interface PresetsListItemProps {
  item: string;
}

const PresetsListItem = ({ item }: PresetsListItemProps) => {
  return (
    <TableRow>
      <TableCell>{item}</TableCell>
    </TableRow>
  );
};

export default PresetsListItem;
