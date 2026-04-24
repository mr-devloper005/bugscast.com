import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Links curated", value: "180k+" },
  { label: "Collections published", value: "12k+" },
  { label: "Active categories", value: "35+" },
];

const values = [
  {
    title: "Bookmark-first product",
    description:
      "We keep saved links at the center and reduce noise so useful references are easier to revisit.",
  },
  {
    title: "Connected reference lanes",
    description:
      "Articles, PDFs, and profile pages support every bookmark so discovery stays contextual instead of scattered.",
  },
  {
    title: "Built for repeat use",
    description:
      "From quick scans to deep dives, the interface is tuned for people who research, collect, and share daily.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a social bookmarking and reference discovery platform built around curated links and connected knowledge lanes.`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A calmer way to save, browse, and share useful resources.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} brings social bookmarking, supporting articles, and reference pages into one connected
              flow so visitors can move from a saved link to deeper context without friction.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </PageShell>
  );
}
