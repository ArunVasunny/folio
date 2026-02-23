"use client";

import { useState } from "react";
import { Mail, MapPin, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { contactApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      await contactApi.send(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      const apiErrors = err?.response?.data?.errors;
      if (apiErrors && apiErrors.length > 0) {
        setErrorMsg(apiErrors[0].msg);
      } else {
        setErrorMsg(err?.response?.data?.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-light mb-4">Get in touch</h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Have questions about plans, templates, or anything else? We&apos;d love to hear from you.
        </p>
      </section>

      {/* Content */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-light mb-6">Contact info</h2>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "hello@folio.io" },
                  { icon: MapPin, label: "Location", value: "Remote — worldwide" },
                  { icon: MessageSquare, label: "Response time", value: "Within 24 hours" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-display text-xl font-light mb-2">Looking for support?</h3>
              <p className="text-sm text-muted-foreground">
                Check our documentation or browse frequently asked questions before reaching out — you might find
                an instant answer.
              </p>
              <Button variant="outline" className="mt-4 w-full" size="sm">
                View Documentation
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="font-display text-2xl font-light mb-6">Send a message</h2>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                <CheckCircle size={40} className="text-green-500" />
                <div>
                  <p className="font-medium">Message sent!</p>
                  <p className="text-sm text-muted-foreground mt-1">We&apos;ll be in touch within 24 hours.</p>
                </div>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more…"
                    required
                    rows={5}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-start gap-2 text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
