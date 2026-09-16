import { siteConfig } from "@/site-config";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 max-w-3xl prose prose-neutral dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="lead">Last updated: {new Date().getFullYear()}</p>
        <p>
          Welcome to {siteConfig.name}. By accessing or using our website, you agree to be bound
          by these Terms of Service. Please read them carefully.
        </p>
        <h2>Use of the Site</h2>
        <p>
          You may use this site for lawful purposes only. You must not use this site in any way
          that breaches any applicable local, national, or international law or regulation.
        </p>
        <h2>Orders & Payment</h2>
        <p>
          All orders are subject to acceptance and availability. Prices are listed in{" "}
          {siteConfig.currency.code} and are subject to change without notice. Payment is
          processed securely through Stripe.
        </p>
        <h2>Contact</h2>
        <p>
          For any questions about these Terms, please contact us at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </div>
    </div>
  );
}
