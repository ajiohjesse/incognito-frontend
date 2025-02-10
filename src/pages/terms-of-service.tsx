const TermsOfService = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="prose mt-8">
        <h1>Terms of Service</h1>
        <p>
          <strong>Last Updated:</strong> 10th Feb, 2025.
        </p>
        <p>
          Welcome to Incognito, an anonymous messaging web application. By using
          Incognito, you agree to comply with and be bound by the following
          terms and conditions. Please read them carefully.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Incognito, you agree to these Terms of Service.
          If you do not agree, please do not use the application.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Incognito is a free, non-commercial web application that allows users
          to:
        </p>
        <ul>
          <li>Generate unique links to receive anonymous messages.</li>
          <li>Engage in real-time, anonymous conversations.</li>
          <li>Use the app without signing up or providing personal data.</li>
          <li>Delete their account and start afresh at any time.</li>
        </ul>

        <h2>3. User Responsibilities</h2>
        <p>You agree to use Incognito responsibly and not to:</p>
        <ul>
          <li>Engage in illegal or harmful activities.</li>
          <li>Harass, threaten, or abuse others.</li>
          <li>Impersonate any person or entity.</li>
          <li>Attempt to disrupt or compromise the app's functionality.</li>
        </ul>

        <h2>4. No Warranty</h2>
        <p>
          Incognito is provided "as is" without any warranties, express or
          implied. We do not guarantee the app's availability, accuracy, or
          security.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          We are not liable for any damages arising from your use of Incognito,
          including but not limited to direct, indirect, incidental, or
          consequential damages.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued
          use of Incognito constitutes acceptance of the updated terms.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact
          us at{" "}
          <a href="mailto:me@rehx.name.ng" className="text-blue-600">
            me@rehx.name.ng
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
