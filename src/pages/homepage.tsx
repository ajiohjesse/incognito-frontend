import {
  GhostIcon,
  LockKeyholeIcon,
  ReplyIcon,
  SparklesIcon,
  VenetianMaskIcon,
  ZapIcon,
} from 'lucide-react';
import heroImage from '../assets/hero3.svg';

const HomePage = () => {
  return (
    <>
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="container  flex flex-col lg:flex-row gap-x-20 gap-y-14 items-center justify-between py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl opacity-40" />

          <div className="relative z-10 max-w-2xl flex-[1.5] flex flex-col lg:text-start lg:items-start items-center text-center">
            <VenetianMaskIcon className="absolute size-24 opacity-5 -top-20 -left-4 -rotate-20" />
            <VenetianMaskIcon className="absolute size-24 opacity-5 top-70 right-4 rotate-20" />

            <h1 className="text-[clamp(2.5rem,7vw,3.5rem)] font-bold mb-6 leading-tight">
              Send <span className="text-purple-500">Secret Messages </span>
              Like A Digital Ghost 👻
            </h1>
            <p className="text-xl font-medium mb-8">
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
              className="w-[600px] rounded-3xl border-8 border-purple-500/20 shadow-2xl z-10"
            />

            <div className="size-[600px] bg-gradient-to-r to-purple-500 from-transparent rounded-full blur-[100px] opacity-30 absolute right-0 -bottom-20 -z-10" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-14">
          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose Incognito?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <LockKeyholeIcon />,
                title: 'Message Encryption',
                desc: 'End-to-end encrypted messages no one else can read besides you.',
              },
              {
                icon: <GhostIcon />,
                title: 'Complete Anonymity',
                desc: 'No sign-up required, no personal data collected.',
              },
              {
                icon: <ZapIcon />,
                title: 'Realtime Chat',
                desc: 'Instant message delivery with typing indicators.',
              },
              {
                icon: <ReplyIcon />,
                title: 'Anonymous Replies',
                desc: 'Respond to messages without revealing identity.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl hover:bg-purple-600 transition-colors group shadow-2xl shadow-purple-700/20"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-700 group-hover:text-purple-50 font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-purple-500/10 py-20">
          <div className="container">
            <h2 className="text-4xl font-bold text-center mb-16">
              What People Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="p-8 bg-purple-50 shadow-lg rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center">
                      <VenetianMaskIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Anonymous User</p>
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20 text-center">
          <div className="max-w-3xl grid place-items-center mx-auto relative">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-purple-500 rounded-full blur-[80px] opacity-30" />
            <h2 className="text-4xl font-bold mb-6">
              Ready to Go Incognito? 👻
            </h2>
            <p className="text-xl text-gray-500 mb-8 font-medium">
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
    name: 'Anonymous User',
    text: `Finally a platform where I can get honest feedback without anyone knowing it's me! The reply feature is really awesome.`,
  },
  {
    name: 'Anonymous User',
    text: `This ain't a random messaging app 💅 The ghost vibes 👻 and instant replies got me feeling like a digital ninja 🥷`,
  },
  {
    name: 'Anonymous User',
    text: 'dropped this link in my class groupchat and the questions went CRAZY 📚✨ zero lag, instant msgs, my students are obsessed lol',
  },
  {
    name: 'Anonymous User',
    text: 'Never knew anonymous chatting could be this fun! The instant message delivery make it strangely addictive.',
  },
];

function GetStartedLink() {
  return (
    <button className="bg-gradient-to-r from-indigo-500 to-pink-500 cursor-pointer w-max text-white px-8 py-4 rounded-full text-lg hover:bg-purple-600 transition-colors flex items-center gap-2 hover:scale-105 transition-transform shadow-2xl">
      <SparklesIcon className="w-5 h-5" />
      Create Anonymous Link
    </button>
  );
}
