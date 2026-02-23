import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-9xl font-light text-muted-foreground/20">404</p>
        <h1 className="font-display text-4xl font-light -mt-4 mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
