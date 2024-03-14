import { TableCell, TableRow } from '@/components/ui/table';

interface PresetsListItemProps {
  item: string;
}

const PresetsWidgetItem = ({ item }: PresetsListItemProps) => {
  return (
    <TableRow>
      <TableCell>{item}</TableCell>
    </TableRow>
  );
};

export default PresetsWidgetItem;
