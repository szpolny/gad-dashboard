import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody } from '@/components/ui/table';
import { ArrowRight, LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PresetsWidgetItem from './PresetsWidgetItem';

interface IPresetsWidgetProps {
  presets: { list: string[]; loading: boolean };
}

const PresetsWidget = ({ presets }: IPresetsWidgetProps) => {
  return (
    <Card className="col-span-1 row-span-3 m-4">
      <CardHeader>
        <CardTitle>Presety</CardTitle>
      </CardHeader>
      <CardContent className="h-[70%]">
        {presets.loading ? (
          <div className="h-full flex justify-center items-center">
            <LoaderCircleIcon className="animate-spin" />
          </div>
        ) : (
          <ScrollArea className="h-full">
            <Table className="">
              <TableBody className="">
                {presets.list.map((p) => {
                  return <PresetsWidgetItem key={p} item={p} />;
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>
          Presety <ArrowRight size="20px" className="pl-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PresetsWidget;
