import { Link } from 'react-router-dom';
import {
  MapPin,
  Wifi,
  Wind,
  Shield,
  Coffee,
  Tv,
  ArrowRight,
  Star,
  Users,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const hostels = [
  {
    id: 'your-space-1',
    name: 'Your Space 1',
    description:
      'A premium student hostel designed for comfortable daily living, focused study, and secure campus accommodation.',
    location: 'North Campus, Block A',
    price: '₹1,20,000 / year',
    rating: 4.8,
    badge: 'Top Rated',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    occupancy: 'Single, Double & Triple Sharing',
    features: [
      { icon: <Wifi className="h-4 w-4" />, name: 'High-Speed WiFi' },
      { icon: <Wind className="h-4 w-4" />, name: 'Air Conditioning' },
      { icon: <Shield className="h-4 w-4" />, name: '24/7 Security' },
      { icon: <Coffee className="h-4 w-4" />, name: 'Mess & Cafeteria' },
    ],
  },
  {
    id: 'your-space-2',
    name: 'Your Space 2',
    description:
      'A modern hostel space built for student comfort, shared living, and a well-connected campus experience.',
    location: 'South Campus, Block C',
    price: '₹1,05,000 / year',
    rating: 4.6,
    badge: 'Student Favorite',
    image:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    occupancy: 'Double & Triple Sharing',
    features: [
      { icon: <Wifi className="h-4 w-4" />, name: 'High-Speed WiFi' },
      { icon: <Tv className="h-4 w-4" />, name: 'Common Lounge' },
      { icon: <Shield className="h-4 w-4" />, name: 'Biometric Access' },
      { icon: <Coffee className="h-4 w-4" />, name: 'Mess & Cafeteria' },
    ],
  },
];

const Hostels = () => {
  return (
    <section className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Hostel Options
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Explore Our Hostel Spaces
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Explore the two available hostel spaces at Hostello and compare
            comfort, occupancy, and everyday living features to choose the right fit.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {hostels.map((hostel) => (
            <article
              key={hostel.id}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-80 overflow-hidden sm:h-[22rem]">
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

                <div className="absolute left-6 top-6">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-900 shadow-sm">
                    {hostel.badge}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="mb-3 flex items-center gap-2 text-sm text-white/90">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{hostel.location}</span>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-[2rem]">
                      {hostel.name}
                    </h2>

                    <div className="rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                      <div className="flex items-center gap-1 text-sm font-semibold text-white">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {hostel.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <p className="max-w-md text-base leading-7 text-slate-600">
                    {hostel.description}
                  </p>

                  <div className="shrink-0 text-left sm:text-right">
                    <p className="text-sm font-medium text-slate-500">Starting from</p>
                    <p className="text-2xl font-bold tracking-tight text-slate-900">
                      {hostel.price}
                    </p>
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="rounded-xl bg-primary/10 p-2 text-primary">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Occupancy
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {hostel.occupancy}
                    </p>
                  </div>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {hostel.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 px-4 py-3"
                    >
                      <div className="rounded-xl bg-primary/10 p-2 text-primary">
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-xl border-slate-200 text-sm font-semibold hover:bg-slate-50"
                  >
                    View Details
                  </Button>

                  <Link to="/login" className="w-full">
                    <Button className="group h-12 w-full rounded-xl text-sm font-semibold">
                      Explore Hostel
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hostels;