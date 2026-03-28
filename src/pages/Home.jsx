import React, { useState, useEffect } from "react";
import { Images } from "../components/Images";
import { Rooms } from "../components/Rooms";
import roommateImage from "../assets/Room-mate handshake.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Cities } from "../components/Cities";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Users,
  MapPin,
  Heart,
  Search,
  MessageCircle,
  Plus,
} from "lucide-react";
import axios from "axios";

export const Home = () => {
  const partnerRef = React.useRef(null);
  const partnerBox = React.useRef(null);
  const partnerText = React.useRef(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);

  const [data, setData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [City, setCity] = useState("");
  const [Price, setPrice] = useState("");
  const [Type, setType] = useState("");

  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/room/get-rooms");

      setData(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    let result = await fetchRooms();

    if (City) {
      result = result.filter((item) =>
        item.nearestCity?.toLowerCase().includes(City.toLowerCase()),
      );
    }

    if (Price) {
      result = result.filter((item) => item.rent <= Number(Price));
    }

    if (Type && Type !== "Type") {
      result = result.filter((item) => item.type === Type);
    }

    setFilteredData(result);
  };

  const handleClear = async () => {
    setCity("");
    setPrice("");
    setType("");
    setFilteredData(data);
  };

  const RoomImg = [
    "https://images.jdmagicbox.com/v2/comp/bangalore/g2/080pxx80.xx80.200104135109.k2g2/catalogue/srm-pg-chamarajpet-bangalore-paying-guest-accommodations-for-men-qjfakk97b8.jpg",
    "https://websiteupload.s3.ap-south-1.amazonaws.com/media/2024/07/66115bc1d6be29.webp",
    "https://kripalhomes.com/wp-content/uploads/2023/02/WhatsApp-Image-2020-07-31-at-12.02.36-PM-3-e1625383337516.jpeg",
    "https://gsh-cdn.sgp1.cdn.digitaloceanspaces.com/assets/img/no-broker-indore/PRT836/room-on-rent-in-indore/pg-in-new-gayatri-nagar_1713338684.jpg",
    "https://websiteupload.s3.ap-south-1.amazonaws.com/media/2024/07/6617bb86d89551.webp",
  ];

  const faqs = [
    {
      question: "How do I find a roommate?",
      answer:
        "You can search for roommates by city and preferences using our search feature. Browse profiles and connect with potential roommates.",
    },
    {
      question: "Is there a fee to use RoomMate?",
      answer:
        "Basic search and browsing is free. Premium features may require a subscription.",
    },
    {
      question: "How do I list my room?",
      answer:
        "Create an account, go to your dashboard, and click 'Add Listing' to post your room details.",
    },
    {
      question: "Are the listings verified?",
      answer:
        "We verify all listings to ensure safety and accuracy for our users.",
    },
    {
      question: "Can I contact landlords directly?",
      answer:
        "Yes, once you find a suitable room, you can message the landlord or roommate through our platform.",
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % RoomImg.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + RoomImg.length) % RoomImg.length,
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const StatesRef = React.useRef(null);
  const TextRef = React.useRef(null);
  const TextRef_2 = React.useRef(null);
  const SearchRef = React.useRef(null);
  const SearchItems = React.useRef(null);

  const FeatureHeading = React.useRef(null);
  const FeatureRooms = React.useRef([]);
  const FaqRef = React.useRef(null);

  useGSAP(() => {
    const obj1 = { value: 4800 };
    const obj2 = { value: 1000 };
    const obj3 = { value: 100 };

    gsap.to(obj1, {
      value: 4999,
      duration: 1,
      ease: "jump-start",
      onUpdate: () => {
        setCount1(Math.floor(obj1.value));
      },
    });

    gsap.to(obj2, {
      value: 1200,
      duration: 1,
      ease: "jump-start",
      onUpdate: () => {
        setCount2(Math.floor(obj2.value));
      },
    });

    gsap.to(obj3, {
      value: 120,
      duration: 1,
      ease: "jump-start",
      onUpdate: () => {
        setCount3(Math.floor(obj3.value));
      },
    });

    const tl = gsap.timeline();

    tl.from(TextRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });

    tl.from(TextRef_2.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: TextRef_2.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
    tl.from(SearchRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: SearchRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
    tl.from(SearchItems.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: SearchItems.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    tl.from(FeatureHeading.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: FeatureHeading.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    tl.from(FeatureRooms.current.children, {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      ease: "none",
    });

    tl.from(FaqRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: FaqRef.current,
        start: "top 80%",
        scrub: true,
      },
    });

    gsap.from(StatesRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      partnerRef.current,
      {
        x: 100,
        opacity: 0,
        scale: 0.5,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1.15,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: partnerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      },
    );

    gsap.from(partnerBox.current, {
      y: 100,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: partnerBox.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    gsap.from(partnerText.current, {
      opacity: 0,
      scale: 0.8,
      delay: 0.5,
      duration: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: partnerBox.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  });

  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div ref={TextRef} className="mt-10 sm:mt-16 lg:mt-20">
            <h1 className="text-5xl sm:text-3xl w-[150%] mt-8 sm:mt-2 md:text-5xl lg:text-5xl font-bold mb-3 text-black leading-tight">
              Welcome to <span className="hidden sm:inline-block">the</span>{" "}
              <span className="text-[40px] sm:text-5xl block sm:inline-block sm:text-black text-blue-800 ml-1 ">
                RoomMate!
              </span>
            </h1>

            <div className="text-base sm:text-base md:text-lg mt-5 ml-2 text-[#111827]">
              Find your perfect room and roommate with
              <p className="text-sm sm:text-sm">
                shared living space with ease.
              </p>
            </div>

            {/* Stats */}
            <div
              ref={StatesRef}
              className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5"
            >
              <div className="sm:w-[50%] w-full flex items-center gap-4 bg-white/40 backdrop-blur-xl border border-white/30 px-6 sm:px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition">
                <HomeIcon className="text-blue-500 shrink-0" size={32} />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
                    {count1}+
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Rooms Listed
                  </p>
                </div>
              </div>

              <div className="sm:w-[70%] w-full hidden sm:flex items-center gap-4 bg-white/40 backdrop-blur-xl border border-white/30 px-6 sm:px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition">
                <Users className="text-purple-500 shrink-0" size={32} />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-purple-600">
                    {count2}+
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Happy Users
                  </p>
                </div>
              </div>

              <div className="sm:w-[80%] w-full flex items-center gap-4 bg-white/40 backdrop-blur-xl border border-white/30 px-6 sm:px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition sm:col-span-2 lg:col-span-1">
                <MapPin className="text-cyan-500 shrink-0" size={32} />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-cyan-600">
                    {count3}+
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">Cities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:relative mt-5 sm:mt-1 sm:left-10 sm:top-30 w-full">
            <Images />
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-30 sm:mt-30">
        <h1
          ref={TextRef_2}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-20 text-black"
        >
          Discover Your Ideal Rooms!
        </h1>

        <form
          ref={SearchRef}
          onSubmit={handleSearch}
          className="text-black w-full rounded-2xl shadow-md p-4 sm:p-6 mb-6 hover:border-t-2 hover:border-purple-500/30"
        >
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 sm:gap-5 items-stretch lg:items-center">
            <input
              type="number"
              placeholder="Max Price"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full sm:w-full md:w-full lg:w-auto min-w-45 border outline-none rounded-lg px-4 py-3"
            />

            <select
              value={Type}
              onChange={(e) => setType(e.target.value)}
              className="w-full sm:w-full md:w-full lg:w-auto min-w-45 border rounded-lg px-4 bg-transparent outline-none py-3"
            >
              <option value="">Type</option>
              <option>1Rk</option>
              <option>2Rk</option>
              <option>1BHK</option>
              <option>2BHK</option>
              <option>Flat</option>
            </select>

            <div className="w-full lg:flex-1 bg-green-400 flex items-center gap-2 text-white px-4 sm:px-6 py-3 rounded-full">
              <Search size={20} className="text-black shrink-0" />
              <input
                value={City}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Search city .."
                className="w-full bg-transparent outline-none border-none text-black font-medium"
              />
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="text-blue-500 text-base sm:text-lg active:scale-95 transition px-2 py-2"
            >
              Clear
            </button>

            <button
              type="submit"
              className="text-white bg-black px-8 py-3 w-full sm:w-full md:w-full lg:w-auto active:scale-95 transition rounded-full"
            >
              Search
            </button>
          </div>

          <div className="w-full my-8 sm:my-10">
            <Cities />
          </div>
        </form>

        {/* Listings Grid */}
        {Loading ? (
          <p>Loading....</p>
        ) : (
          <div
            ref={SearchItems}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {FilteredData.length > 0 && FilteredData.length < 6 ? (
              FilteredData.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/room/${item._id}`)}
                  className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
                >
                  <div className="relative">
                    <img
                      src={item.thumbnail}
                      alt="listing"
                      className="h-48 w-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-purple-800">
                      {item.rent} <span className="text-sm">/ month</span>
                    </h3>
                    <p className="text-gray-600">{item.nearestCity}</p>
                    <p className="text-gray-500 text-sm">
                      {item.type} • {item.connectivity}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div
                ref={SearchItems}
                className="col-span-full flex justify-center items-center mt-10"
              >
                <div className="bg-white/70 border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-10 flex flex-col items-center gap-4 w-full text-center">
                  <HomeIcon size={40} className="text-purple-500" />

                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Search Listing
                  </h2>

                  <p className="text-gray-500 text-sm sm:text-base max-w-xl">
                    you can find any rooms matching your search. Try adjusting
                    the filters or searching a different city.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Featured Listed */}
        <div ref={FeatureHeading} className="w-full pt-0 mt-16 sm:mt-24">
          <h1 className="text-amber-700 font-extrabold text-xl sm:text-2xl md:text-3xl">
            Featured listed
          </h1>
          <p className="text-gray-900 font-normal mb-6 sm:mb-10 text-sm sm:text-base mt-2">
            Explore our handpicked selection of top-rated rooms, curated for
            comfort and style.
          </p>

          <div
            ref={FeatureRooms}
            className="flex flex-wrap justify-between gap-3 sm:gap-4"
          >
            <Rooms />
          </div>
        </div>

        {/* Partner Section */}
        <div
          ref={partnerBox}
          className="w-full pt-4 p-4 sm:p-8 md:p-10 mt-20 bg-transparent border-2 border-black rounded-2xl"
        >
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div
              ref={partnerText}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <h1 className="text-black font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
                Find Your Perfect Roommate!
              </h1>
              <p className="mt-4 text-purple-900 font-normal mb-6 sm:mb-10 text-sm sm:text-base md:w-[70%]">
                Connect with many individuals.
              </p>
              <Link
                to="/create-profile"
                className="inline-block bg-transparent border-2 text-black border-black py-2 px-4 rounded-full font-medium active:scale-95 hover:bg-black hover:text-white transition"
              >
                Get Started
              </Link>
            </div>

            <div className="w-full md:w-1/2 flex justify-center md:justify-end p-2 sm:p-4 md:p-6">
              <img
                ref={partnerRef}
                className="w-36 sm:w-44 md:w-56 lg:w-64"
                src={roommateImage}
                alt="Roommate"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-20">
        <div className="relative w-full h-64 sm:h-80 md:h-112.5 lg:h-130 flex items-center justify-center">
          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-4 z-10 text-xl sm:text-2xl md:text-3xl bg-black/50 text-white p-2 rounded-full hover:scale-90 active:-translate-x-3 transition-all"
          >
            ‹
          </button>

          <img
            className="sliding-img w-full h-full object-cover rounded-2xl transition-opacity duration-500 ease-in-out"
            src={RoomImg[currentImageIndex]}
            alt="Room Image"
          />

          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-4 z-10 text-xl sm:text-2xl md:text-3xl bg-black/50 text-white p-2 rounded-full hover:scale-90 active:translate-x-3 transition"
          >
            ›
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div
        ref={FaqRef}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div className="bg-transparent border-2 border-black rounded-2xl p-4 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-10 text-black text-center">
            Frequently Asked Questions
          </h1>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300">
                <button
                  className="w-full text-left py-3 sm:py-4 px-3 sm:px-6 bg-transparent hover:bg-gray-100 rounded-lg transition flex justify-between items-center"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-sm sm:text-base md:text-lg font-medium text-black pr-3">
                    {faq.question}
                  </span>
                  <span className="text-xl sm:text-2xl text-black shrink-0 ml-2">
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </button>

                {openFAQ === index && (
                  <div className="px-3 sm:px-6 pb-4 text-sm sm:text-base text-gray-700 mt-3 sm:mt-5">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full overflow-hidden">
        <Footer />
      </div>
    </div>
  );
};
