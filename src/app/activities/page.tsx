//@ts-nocheck
'use client'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function BrainTrainingPage() {
  const games = [
    {
      id: 1,
      title: "Dual N-Back",
      description:
        "Enhance your working memory and fluid intelligence by tracking visual and auditory stimuli simultaneously.",
      timeSaved: "20s",
      retentionIncrease: "15%",
      image: "/images/dual-n-back.png"
    },
    {
      id: 2,
      title: "Speed Reading",
      description:
        "Boost your reading speed and comprehension to process information faster.",
      timeSaved: "25s",
      retentionIncrease: "18%",
      image: "/images/speed-reading.png"
    },
    {
      id: 3,
      title: "Pattern Recognition",
      description:
        "Sharpen your ability to identify and analyze patterns quickly in complex data.",
      timeSaved: "30s",
      retentionIncrease: "20%",
      image: "/images/pattern-recognition.png"
    },
    {
      id: 4,
      title: "Meditation Guides",
      description:
        "Use guided meditation techniques to relax your mind and improve your focus.",
      timeSaved: "15s",
      retentionIncrease: "10%",
      image: "/images/meditation-guides.png"
    }
  ];

  const generateSlug = (title) => 
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 lg:px-16 flex flex-col items-center">
      <Head>
        <title>Brain Training Games</title>
      </Head>

      <h1 className="text-4xl font-bold text-center mb-4">
        Brain Training &amp; Attention-Boosting Games
      </h1>
      <p className="text-lg text-center mb-8 max-w-2xl mx-auto">
        Improve your cognitive abilities through scientifically-designed games that boost memory, attention, and cognitive endurance.
      </p>

      {/* Center alignment with fixed max-width and proper spacing */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-6xl">
          {games.map((game) => (
            <Link href={`/game/${generateSlug(game.title)}`} key={game.id}>
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 
                              flex flex-col justify-between h-[500px] w-full lg:w-[480px]">
                {/* Game Image */}
                <div className="relative w-full h-60 mb-4 rounded overflow-hidden">
                  <Image
                    src={game.image}
                    alt={`Cover image for ${game.title}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    className="rounded"
                  />
                </div>

                {/* Game Title */}
                <h2 className="text-2xl font-semibold mb-2">{game.title}</h2>
                
                {/* Game Description */}
                <p className="text-gray-300 mb-4 flex-grow">{game.description}</p>

                {/* Stats Section */}
                <div className="flex justify-between mt-4">
                  <div>
                    <span className="block text-sm text-gray-400">Time Saved</span>
                    <span className="text-lg font-bold">{game.timeSaved}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400">Retention Increase</span>
                    <span
                      className={`text-lg font-bold ${
                        parseInt(game.retentionIncrease) > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {game.retentionIncrease}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xl">
          These games use neuroscience-backed techniques to enhance focus and cognitive performance.
        </p>
      </div>
    </div>
  );
}
