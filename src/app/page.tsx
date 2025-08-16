import { VerifyForm } from "@/components/verify-form";

export default function VerifyPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col items-start space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Document Summarizer
        </h1>
        <p className="text-lg text-muted-foreground">
          Enter a URL from a SEBI or NISM document to get a summary in your
          preferred language.
        </p>
      </div>
      <VerifyForm />
    </div>
  );
}
