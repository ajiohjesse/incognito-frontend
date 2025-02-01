import { VenetianMaskIcon } from "lucide-react";
import { useState } from "react";

const Message: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") {
      alert("Please enter a message before sending.");
      return;
    }
    // Add logic to send the message (e.g., API call)
    console.log("Message sent:", message);
    setMessage(""); // Clear the textarea after sending
  };

  return (
    <main className="bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="mx-auto flex max-w-4xl flex-col px-4 py-12">
        {/* Fancy Text Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-purple-700">
            <VenetianMaskIcon className="mr-2 mb-2 inline-block h-10 w-10 text-purple-500" />
            Send an Anonymous Message
          </h1>
          <p className="font-medium text-slate-800">
            Share your thoughts, feelings, or secrets without revealing your
            identity. Let your words speak for themselves!
          </p>
        </div>

        {/* Recipient Username Section */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold text-purple-700">
            Sending to:
          </h2>
          <p className="text-lg text-pink-600">@Username</p>{" "}
          {/* Replace with dynamic username */}
        </div>

        {/* Message Input Section */}
        <div className="flex flex-1 flex-col rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-purple-700">
            Your Message:
          </h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your anonymous message here..."
            rows={1}
            className="flex-1 resize-none overflow-y-auto rounded-lg border border-purple-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            style={{ minHeight: "200px" }}
          />
          <button
            onClick={handleSendMessage}
            className="mt-4 rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            Send Message
          </button>
        </div>
      </div>
    </main>
  );
};

export default Message;
