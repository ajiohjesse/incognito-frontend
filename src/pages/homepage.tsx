import {
  GhostIcon,
  LockKeyholeIcon,
  ReplyIcon,
  VenetianMaskIcon,
  ZapIcon,
} from "lucide-react";
import heroImage from "../assets/hero3.svg";
import GetStartedLink from "../components/get-started-link";

const HomePage = () => {
  return (
    <>
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative container flex flex-col items-center justify-between gap-x-20 gap-y-14 py-20 lg:flex-row">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent opacity-40 blur-3xl" />

          <div className="relative z-10 flex max-w-2xl flex-[1.5] flex-col items-center text-center lg:items-start lg:text-start">
            <VenetianMaskIcon className="absolute -top-20 -left-4 size-24 -rotate-20 opacity-5" />
            <VenetianMaskIcon className="absolute top-70 right-4 size-24 rotate-20 opacity-5" />

            <h1 className="mb-6 text-[clamp(2.5rem,7vw,3.5rem)] leading-tight font-bold">
              Send <span className="text-purple-500">Secret Messages </span>
              Like A Digital Ghost 👻
            </h1>
            <p className="mb-8 text-xl font-medium">
              Whisper your thoughts without revealing your identity. Realtime
              messages, fully encrypted, completely anonymous, and absolutely
              fun!
            </p>
            <GetStartedLink />
          </div>

          <div className="relative flex-1">
            <img
              src={heroImage}
              alt="Chat Preview"
              className="z-10 w-[600px] rounded-3xl border-8 border-purple-500/20 shadow-2xl"
            />

            <div className="absolute right-0 -bottom-20 -z-10 size-[600px] rounded-full bg-gradient-to-r from-transparent to-purple-500 opacity-30 blur-[100px]" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-14">
          <h2 className="mb-14 text-center text-4xl font-bold">
            Why Choose Incognito?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <LockKeyholeIcon />,
                title: "Message Encryption",
                desc: "End-to-end encrypted messages no one else can read besides you.",
              },
              {
                icon: <GhostIcon />,
                title: "Complete Anonymity",
                desc: "No sign-up required, no personal data collected.",
              },
              {
                icon: <ZapIcon />,
                title: "Realtime Chat",
                desc: "Instant message delivery with typing indicators.",
              },
              {
                icon: <ReplyIcon />,
                title: "Anonymous Replies",
                desc: "Respond to messages without revealing identity.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-white p-6 shadow-2xl shadow-purple-700/20 transition-colors hover:bg-purple-600"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="font-medium text-gray-700 group-hover:text-purple-50">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-purple-500/10 py-20">
          <div className="container">
            <h2 className="mb-16 text-center text-4xl font-bold">
              What People Are Saying
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="rounded-2xl bg-purple-50 p-8 shadow-lg">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                      <VenetianMaskIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">Anonymous User</p>
                    </div>
                  </div>
                  <p className="font-medium text-slate-700">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20 text-center">
          <div className="relative mx-auto grid max-w-3xl place-items-center">
            <div className="absolute -top-20 left-1/2 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-purple-500 opacity-30 blur-[80px]" />
            <h2 className="mb-6 text-4xl font-bold">
              Ready to Go Incognito? 👻
            </h2>
            <p className="mb-8 text-xl font-medium text-gray-500">
              Create your anonymous inbox in seconds and start receiving secret
              messages today!
            </p>
            <GetStartedLink />
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;

const testimonials = [
  {
    name: "Anonymous User",
    text: `Finally a platform where I can get honest feedback without anyone knowing it's me! The reply feature is really awesome.`,
  },
  {
    name: "Anonymous User",
    text: `This ain't a random messaging app 💅 The ghost vibes 👻 and instant replies got me feeling like a digital ninja 🥷`,
  },
  {
    name: "Anonymous User",
    text: "dropped this link in my class groupchat and the questions went CRAZY 📚✨ zero lag, instant msgs, my students are obsessed lol",
  },
  {
    name: "Anonymous User",
    text: "Never knew anonymous chatting could be this fun! The instant message delivery make it strangely addictive.",
  },
];
