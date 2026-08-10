import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Star, Compass } from 'lucide-react';

export default function Journey() {
  const milestones = [
    {
      year: '1958',
      title: 'The Inception',
      description: 'Late Shri Shankar Saroj starts the famous "Bhole Chaat" stall (popularly known as "6 No Chaat Wala" or "6th Number Chaat Wala") in Juhu, Vile Parle West. Serving fresh, spicy, and authentic flavors, the stall quickly wins the hearts of locals.',
      icon: <Calendar className="w-5 h-5 text-maroon-primary" />,
    },
    {
      year: '1980s - 2000s',
      title: 'Becoming a Mumbai Landmark',
      description: 'Over decades, the stall becomes a household name and one of the most loved chaat destinations in Vile Parle. Generations of families grow up eating here, establishing a legacy of trust and authentic taste.',
      icon: <Award className="w-5 h-5 text-maroon-primary" />,
    },
    {
      year: 'Legacy Renewed',
      title: 'Jai Shankar Bholenath (JSB)',
      description: 'After the passing of Shri Shankar Saroj, the business is renamed Jai Shankar Bholenath (JSB Chaat) in his honor. The legacy of authentic street-side chaat preparation and customer-first values is proudly carried forward.',
      icon: <Star className="w-5 h-5 text-maroon-primary" />,
    },
    {
      year: '2025',
      title: 'Expanding the Taste of Mumbai',
      description: 'With overwhelming support, the brand opens a second branch in Tagore Nagar, Santacruz West, bringing the legendary 6 No Chaat recipes closer to new customers. Today, both branches are successfully managed and operated by Chandrabhan Saroj.',
      icon: <Compass className="w-5 h-5 text-maroon-primary" />,
    }
  ];

  return (
    <section id="journey" className="py-24 bg-cream-dark/30 border-y border-gold-primary/10 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon-primary/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-serif text-sm font-semibold tracking-[0.25em] text-gold-primary uppercase">Our Legacy</span>
          <h2 className="text-4xl sm:text-5xl font-black text-maroon-primary mt-2 mb-4 font-serif">
            A Journey of Taste Since 1958
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto mb-6" />
          <p className="text-maroon-dark/80 text-base sm:text-lg font-light leading-relaxed">
            From a humble roadside stall in Juhu to Mumbai's legendary chaat landmark, discover how Shri Shankar Saroj's recipes have stood the test of time.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical line through middle */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 timeline-line hidden md:block" />
          <div className="absolute left-6 top-4 bottom-4 w-1 timeline-line md:hidden" />

          <div className="space-y-12">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center md:justify-between">
                  {/* Timeline bullet */}
                  <div className="absolute left-6 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full gold-gradient border-4 border-cream-primary shadow-lg flex items-center justify-center z-10">
                    {milestone.icon}
                  </div>

                  {/* Empty spacer block for side alignment */}
                  <div className="w-full md:w-5/12 hidden md:block" />

                  {/* Timeline card content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 50 }}
                    className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:order-first md:text-right' : 'md:text-left'
                      }`}
                  >
                    <div className="glass-card p-6 sm:p-8 rounded-2xl shadow-md border-l-4 border-gold-primary hover:shadow-lg transition-shadow duration-300 relative">
                      {/* Year badge */}
                      <span className="inline-block bg-maroon-primary text-gold-primary text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full mb-3">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-maroon-primary font-serif mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-maroon-dark/80 text-sm sm:text-base font-light leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Historical Stall Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 border border-gold-primary/30 rounded-3xl p-8 bg-maroon-primary text-cream-primary max-w-4xl mx-auto shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/10 rounded-full filter blur-xl" />
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            <div className="text-center sm:text-left">
              <h4 className="text-xl sm:text-2xl font-bold text-gold-primary font-serif mb-2">
                Did You Know?
              </h4>
              <p className="text-cream-dark text-sm sm:text-base font-light leading-relaxed">
                Many of our oldest customers, some of whom have moved across the globe, still visit Vile Parle and ask for us as <strong>"6 No Chaat Wala"</strong>. It is this decades-old trust and affection that keeps us committed to Shri Shankar Saroj's original recipes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
