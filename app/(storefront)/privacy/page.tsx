import { siteConfig } from "@/site-config";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 max-w-3xl prose prose-neutral dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: {new Date().getFullYear()}</p>
        <p>
          {siteConfig.name} is committed to protecting your personal information. This Privacy
          Policy explains how we collect, use, and protect your data.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We collect information you provide when creating an account, placing an order, or
          contacting us. This may include your name, email address, and shipping address.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          We use your data to process orders, send transactional emails, and improve our services.
          We do not sell or share your personal information with third parties for marketing purposes.
        </p>
        <h2>Cookies</h2>
        <p>
          We use cookies to maintain your session and cart state. You can disable cookies in your
          browser settings, but this may affect site functionality.
        </p>
        <h2>Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </div>
    </div>
  );
}
