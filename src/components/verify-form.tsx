'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { handleSummarizeUrl, type FormState } from '@/app/verify/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, AlertTriangle } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        'Generate'
      )}
    </Button>
  );
}

export function VerifyForm() {
  const [state, formAction] = useActionState(handleSummarizeUrl, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (!state.success && state.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <form action={formAction}>
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
              <CardDescription>
                Provide the URL and target language for translation and summarization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Document URL</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="https://www.sebi.gov.in/..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select name="language" defaultValue="English">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Marathi">Marathi</SelectItem>
                    <SelectItem value="Bengali">Bengali</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </Card>
        </form>
      </div>
      <div className="lg:col-span-3">
        <SummaryDisplay serverState={state} />
      </div>
    </div>
  );
}

function SummaryDisplay({ serverState }: { serverState: FormState }) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Card className="min-h-[300px]">
        <CardHeader>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-5 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    );
  }

  if (serverState.success && serverState.summary && serverState.fullTranslatedDocument) {
    return (
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="full">Full Document</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Generated Summary</CardTitle>
              <CardDescription>The AI-powered summary of the document.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4 prose prose-sm dark:prose-invert max-w-none">
                  {serverState.summary.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="full">
          <Card>
            <CardHeader>
              <CardTitle>Full Translated Document</CardTitle>
              <CardDescription>The full document translated into your selected language.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4 prose prose-sm dark:prose-invert max-w-none">
                {serverState.fullTranslatedDocument.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    );
  }
  
  const Icon = serverState.message ? AlertTriangle : FileText;
  const text = serverState.message ? 'An error occurred' : 'Your results will be displayed here once generated.';
  const colorClass = serverState.message ? 'text-destructive' : 'text-muted-foreground';

  return (
    <Card className="min-h-[300px]">
      <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-4">
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg w-full h-full">
          <Icon className={`w-12 h-12 mb-4 ${colorClass}`} />
          <p className={`text-sm ${colorClass}`}>{text}</p>
        </div>
      </CardContent>
    </Card>
  );
}
