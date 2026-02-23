import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { pricingApi, PricingPlan } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

async function getPlans(): Promise<PricingPlan[]> {
  try {
    const res = await pricingApi.list();
    return res.data.plans;
  } catch {
    // Fallback static data if API is unavailable
    return [
      {
        _id: "1",
        name: "Free",
        price: 0,
        yearlyPrice: 0,
        description: "Get started with a beautiful portfolio.",
        features: ["1 portfolio", "3 free templates", "Folio subdomain", "5 GB storage", "Basic analytics"],
        highlighted: false,
        ctaLabel: "Start Free",
        order: 0,
      },
      {
        _id: "2",
        name: "Pro",
        price: 14,
        yearlyPrice: 120,
        description: "For professionals who mean business.",
        features: ["5 portfolios", "All templates", "Custom domain", "20 GB storage", "Advanced analytics", "Remove branding", "Priority support"],
        highlighted: true,
        ctaLabel: "Go Pro",
        order: 1,
      },
      {
        _id: "3",
        name: "Studio",
        price: 39,
        yearlyPrice: 360,
        description: "For agencies and creative studios.",
        features: ["Unlimited portfolios", "All templates", "10 custom domains", "100 GB storage", "Team collaboration", "White-label", "Dedicated support"],
        highlighted: false,
        ctaLabel: "Contact Sales",
        order: 2,
      },
    ];
  }
}

export default async function PricingPage() {
  const plans = await getPlans();

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 px-3 py-1 border border-border rounded-full">
          Simple, transparent pricing
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-light mb-4">
          Plans that grow with you
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Start free. Upgrade when you&apos;re ready. No hidden fees, no surprises.
        </p>
      </section>

      {/* Plans */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className={cn(
                  "relative rounded-2xl border p-8 flex flex-col",
                  plan.highlighted
                    ? "border-[hsl(var(--accent))] bg-primary text-primary-foreground shadow-2xl scale-105 z-10"
                    : "border-border bg-card"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent" className="gap-1 px-3 py-1 text-xs shadow-lg">
                      <Sparkles size={10} />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h2
                    className={cn(
                      "font-display text-2xl font-light mb-1",
                      plan.highlighted ? "text-primary-foreground" : ""
                    )}
                  >
                    {plan.name}
                  </h2>
                  <p
                    className={cn(
                      "text-sm",
                      plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="font-display text-5xl font-light">
                      {plan.price === 0 ? "Free" : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span
                        className={cn(
                          "text-sm mb-2",
                          plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"
                        )}
                      >
                        / mo
                      </span>
                    )}
                  </div>
                  {plan.yearlyPrice > 0 && (
                    <p
                      className={cn(
                        "text-xs mt-1",
                        plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"
                      )}
                    >
                      ${plan.yearlyPrice}/yr · save ${plan.price * 12 - plan.yearlyPrice}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check
                        size={14}
                        className={cn(
                          "mt-0.5 flex-shrink-0",
                          plan.highlighted
                            ? "text-[hsl(var(--accent))]"
                            : "text-[hsl(var(--accent))]"
                        )}
                      />
                      <span className={plan.highlighted ? "text-primary-foreground/90" : ""}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? "accent" : "outline"}
                  className={cn(
                    "w-full",
                    !plan.highlighted && "border-border"
                  )}
                  asChild
                >
                  <Link href="/contact">{plan.ctaLabel}</Link>
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ note */}
          <p className="text-center text-sm text-muted-foreground mt-10">
            All plans include SSL, 99.9% uptime, and free migrations from other platforms.{" "}
            <Link href="/contact" className="underline underline-offset-2 hover:text-foreground">
              Questions? Contact us.
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
