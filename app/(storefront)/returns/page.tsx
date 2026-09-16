import { siteConfig } from "@/site-config";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 max-w-3xl prose prose-neutral dark:prose-invert">
        <h1>Return Policy</h1>
        <p className="lead">Last updated: {new Date().getFullYear()}</p>
        <p>
          We want you to be completely satisfied with your purchase. If you are not happy
          with your order, we offer a straightforward return policy.
        </p>
        <h2>30-Day Return Window</h2>
        <p>
          You may return most items within 30 days of delivery for a full refund. Items must
          be in their original condition — unworn, unwashed, and with all tags attached.
        </p>
        <h2>How to Return</h2>
        <ol>
          <li>Contact us at <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> with your order number and reason for return.</li>
          <li>We will provide a prepaid return shipping label.</li>
          <li>Pack your items securely and drop them off at your nearest carrier location.</li>
          <li>Refunds are processed within 5–7 business days of receiving the returned item.</li>
        </ol>
        <h2>Non-Returnable Items</h2>
        <p>
          Final sale items, gift cards, and downloadable products cannot be returned.
        </p>
        <h2>Contact</h2>
        <p>
          For any questions about returns, please contact us at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </div>
    </div>
  );
}
