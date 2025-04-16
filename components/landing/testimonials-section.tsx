import Image from "next/image";

const testimonials = [
  {
    content:
      "Cette plateforme a révolutionné la gestion de notre cabinet médical. Tout est plus simple et plus efficace.",
    author: {
      name: "Dr. Sophie Martin",
      role: "Médecin généraliste",
      image: "/testimonials/doctor-1.jpg",
    },
  },
  {
    content:
      "La gestion des employés est maintenant un jeu d'enfant. Je peux me concentrer sur ce qui compte vraiment : mes patients.",
    author: {
      name: "Dr. Jean Dupont",
      role: "Directeur de clinique",
      image: "/testimonials/doctor-2.jpg",
    },
  },
  {
    content:
      "Un outil indispensable pour notre équipe. La planification et le suivi des patients n'ont jamais été aussi faciles.",
    author: {
      name: "Marie Lambert",
      role: "Infirmière coordinatrice",
      image: "/testimonials/nurse-1.jpg",
    },
  },
];

export function TestimonialsSection() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Témoignages
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ce que nos utilisateurs disent
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial, testimonialIdx) => (
              <div
                key={testimonialIdx}
                className="pt-8 sm:inline-block sm:w-full sm:px-4"
              >
                <figure className="rounded-2xl bg-white p-8 text-sm leading-6">
                  <blockquote className="text-gray-900">
                    <p>{`"${testimonial.content}"`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-50">
                      <Image
                        className="h-10 w-10 rounded-full object-cover"
                        src={testimonial.author.image}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.author.name}
                      </div>
                      <div className="text-gray-600">
                        {testimonial.author.role}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
